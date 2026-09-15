"use client";

import { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import {
  Camera,
  ScanLine,
  ShieldAlert,
  VideoOff,
} from "lucide-react";

import Button from "@/components/ui/Button";

const cameraErrorCopy = {
  unavailable: "SKUL can't find a camera on this device.",
  in_use: "Your camera is currently being used by another app.",
  unsupported:
    "Your browser doesn't support camera access. Try Chrome or Safari.",
};

export default function QRScanner({
  stage,
  errorReason = "unavailable",
  onAllowCamera,
  onManualEntry,
  onRetryCamera,
  onQRDetected,
  onCameraReady,
  onCameraError,
}) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const initializationStartedRef = useRef(false);
  const detectionStartedRef = useRef(false);

  const [streamError, setStreamError] = useState(false);

  /*
   * CAMERA INITIALIZATION
   */
  useEffect(() => {
    const shouldInitialize = [
      "requesting_permission",
      "active",
      "detecting",
    ].includes(stage);

    if (!shouldInitialize) {
      initializationStartedRef.current = false;
      return;
    }

    if (initializationStartedRef.current) return;

    initializationStartedRef.current = true;

    let cancelled = false;

    async function initializeCamera() {
      setStreamError(false);

      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          const error = new Error(
            "Camera access is unsupported."
          );

          error.name = "NotSupportedError";

          throw error;
        }

        const stream =
          await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: {
                ideal: "environment",
              },
            },
            audio: false,
          });

        if (cancelled) {
          stream
            .getTracks()
            .forEach((track) => track.stop());

          return;
        }

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          await videoRef.current.play();
        }

        onCameraReady?.();
      } catch (error) {
        if (cancelled) return;

        const reason = getCameraErrorReason(error);

        setStreamError(true);

        onCameraError?.(reason);
      }
    }

    initializeCamera();

    return () => {
      cancelled = true;
    };
  }, [onCameraError, onCameraReady, stage]);

  /*
   * STOP CAMERA WHEN COMPONENT UNMOUNTS
   */
  useEffect(() => {
    return () => {
      streamRef.current
        ?.getTracks()
        .forEach((track) => track.stop());

      streamRef.current = null;
    };
  }, []);

  /*
   * QR DETECTION
   */
  useEffect(() => {
    const shouldScan =
      stage === "active" || stage === "detecting";

    if (!shouldScan) {
      detectionStartedRef.current = false;
      return;
    }

    if (detectionStartedRef.current) return;

    detectionStartedRef.current = true;

    let animationFrameId;
    let cancelled = false;
    let detected = false;

    const scan = () => {
      if (cancelled || detected) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (!video || !canvas) {
        animationFrameId =
          requestAnimationFrame(scan);

        return;
      }

      if (
        video.readyState >=
        HTMLMediaElement.HAVE_ENOUGH_DATA
      ) {
        const context = canvas.getContext("2d", {
          willReadFrequently: true,
        });

        if (!context) return;

        const width = video.videoWidth;
        const height = video.videoHeight;

        if (width > 0 && height > 0) {
          canvas.width = width;
          canvas.height = height;

          context.drawImage(
            video,
            0,
            0,
            width,
            height
          );

          const imageData =
            context.getImageData(
              0,
              0,
              width,
              height
            );

          const code = jsQR(
            imageData.data,
            imageData.width,
            imageData.height,
            {
              inversionAttempts: "attemptBoth",
            }
          );

          if (code?.data) {
            detected = true;

            console.log(
              "QR code detected:",
              code.data
            );

            onQRDetected?.(code.data);

            return;
          }
        }
      }

      animationFrameId =
        requestAnimationFrame(scan);
    };

    scan();

    return () => {
      cancelled = true;

      if (animationFrameId) {
        cancelAnimationFrame(
          animationFrameId
        );
      }

      detectionStartedRef.current = false;
    };
  }, [stage, onQRDetected]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-3xl bg-charcoal">
        {(stage === "requesting_permission" ||
          stage === "active" ||
          stage === "detecting") &&
          !streamError && (
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className={
                stage === "requesting_permission"
                  ? "hidden"
                  : "absolute inset-0 h-full w-full object-cover"
              }
            />
          )}

        {/* Hidden canvas used by jsQR to analyze camera frames */}
        <canvas
          ref={canvasRef}
          className="hidden"
        />

        {(stage === "active" ||
          stage === "detecting") && (
          <div className="absolute inset-0 bg-charcoal/25" />
        )}

        {(stage === "active" ||
          stage === "detecting") && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative h-56 w-56">
              <Corner className="left-0 top-0 rounded-tl-xl border-l-2 border-t-2" />

              <Corner className="right-0 top-0 rounded-tr-xl border-r-2 border-t-2" />

              <Corner className="bottom-0 left-0 rounded-bl-xl border-b-2 border-l-2" />

              <Corner className="bottom-0 right-0 rounded-br-xl border-b-2 border-r-2" />

              <div className="absolute inset-x-2 top-1/2 h-0.5 animate-scan-line bg-bronze-deep shadow-[0_0_12px_2px_rgba(180,120,60,0.6)]" />
            </div>
          </div>
        )}

        {stage === "requesting_permission" && (
          <StatusPanel
            icon={
              <Camera className="h-7 w-7 text-cream" />
            }
            title="Starting camera…"
            body="Give SKUL a moment to access your camera."
          />
        )}

        {stage === "permission_denied" && (
          <StatusPanel
            icon={
              <ShieldAlert className="h-7 w-7 text-cream" />
            }
            title="Camera Access Required"
            body="Allow camera access in your browser settings to scan attendance QR codes."
            actions={
              <>
                <Button
                  size="md"
                  onClick={onAllowCamera}
                  className="w-full"
                >
                  Allow Camera Access
                </Button>

                <button
                  type="button"
                  onClick={onManualEntry}
                  className="text-xs uppercase tracking-wide text-cream/70 transition-colors hover:text-cream"
                >
                  Enter Code Manually
                </button>
              </>
            }
          />
        )}

        {(stage === "camera_error" ||
          streamError) && (
          <StatusPanel
            icon={
              <VideoOff className="h-7 w-7 text-cream" />
            }
            title="Camera Unavailable"
            body={
              cameraErrorCopy[errorReason] ||
              cameraErrorCopy.unavailable
            }
            actions={
              <>
                <Button
                  size="md"
                  onClick={onRetryCamera}
                  className="w-full"
                >
                  Try Again
                </Button>

                <button
                  type="button"
                  onClick={onManualEntry}
                  className="text-xs uppercase tracking-wide text-cream/70 transition-colors hover:text-cream"
                >
                  Enter Code Manually
                </button>
              </>
            }
          />
        )}
      </div>

      <p className="mt-5 flex items-center gap-2 text-sm text-graphite-soft">
        <ScanLine className="h-4 w-4 text-bronze-deep" />

        {stage === "detecting"
          ? "QR code found — reading…"
          : "Point your camera at a SKUL QR code"}
      </p>
    </div>
  );
}

function Corner({ className }) {
  return (
    <div
      className={`absolute h-8 w-8 border-cream ${className}`}
    />
  );
}

function StatusPanel({
  icon,
  title,
  body,
  actions,
}) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
        {icon}
      </div>

      <div className="space-y-1.5">
        <p className="text-base font-semibold text-cream">
          {title}
        </p>

        <p className="text-sm leading-relaxed text-cream/70">
          {body}
        </p>
      </div>

      {actions && (
        <div className="mt-2 flex w-full max-w-[240px] flex-col items-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
}

function getCameraErrorReason(error) {
  switch (error?.name) {
    case "NotAllowedError":
    case "PermissionDeniedError":
      return "permission_denied";

    case "NotReadableError":
    case "TrackStartError":
      return "in_use";

    case "NotFoundError":
      return "unavailable";

    case "OverconstrainedError":
    case "NotSupportedError":
    case "TypeError":
      return "unsupported";

    default:
      return "unavailable";
  }
}