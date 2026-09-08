"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, ScanLine, ShieldAlert, VideoOff } from "lucide-react";
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
  const streamRef = useRef(null);
  const initializationStartedRef = useRef(false);
  const [streamError, setStreamError] = useState(false);

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

    // The requesting state is a real initialization state, so permission can
    // be requested while the existing loading panel remains visible.
    if (initializationStartedRef.current) return;

    initializationStartedRef.current = true;
    let cancelled = false;

    async function initializeCamera() {
      setStreamError(false);

      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          const error = new Error("Camera access is unsupported.");
          error.name = "NotSupportedError";
          throw error;
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: "environment" },
          },
          audio: false,
        });

        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
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

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-sm aspect-square rounded-3xl overflow-hidden bg-charcoal">
        {/* Live camera feed */}
        {(stage === "requesting_permission" ||
          stage === "active" ||
          stage === "detecting") && !streamError && (
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

        {/* Dim overlay */}
        {(stage === "active" || stage === "detecting") && (
          <div className="absolute inset-0 bg-charcoal/25" />
        )}

        {/* Scan frame */}
        {(stage === "active" || stage === "detecting") && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative h-56 w-56">
              <Corner className="top-0 left-0 border-t-2 border-l-2 rounded-tl-xl" />

              <Corner className="top-0 right-0 border-t-2 border-r-2 rounded-tr-xl" />

              <Corner className="bottom-0 left-0 border-b-2 border-l-2 rounded-bl-xl" />

              <Corner className="bottom-0 right-0 border-b-2 border-r-2 rounded-br-xl" />

              {(stage === "active" || stage === "detecting") && (
                <div className="absolute inset-x-2 top-1/2 h-0.5 bg-bronze-deep shadow-[0_0_12px_2px_rgba(180,120,60,0.6)] animate-scan-line" />
              )}
            </div>
          </div>
        )}

        {/* Requesting permission */}
        {stage === "requesting_permission" && (
          <StatusPanel
            icon={<Camera className="h-7 w-7 text-cream" />}
            title="Starting camera…"
            body="Give SKUL a moment to access your camera."
          />
        )}

        {/* Permission denied */}
        {stage === "permission_denied" && (
          <StatusPanel
            icon={<ShieldAlert className="h-7 w-7 text-cream" />}
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
                  onClick={onManualEntry}
                  className="text-xs uppercase tracking-wide text-cream/70 hover:text-cream transition-colors"
                >
                  Enter Code Manually
                </button>
              </>
            }
          />
        )}

        {/* Camera error */}
        {(stage === "camera_error" || streamError) && (
          <StatusPanel
            icon={<VideoOff className="h-7 w-7 text-cream" />}
            title="Camera Unavailable"
            body={cameraErrorCopy[errorReason]}
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
                  onClick={onManualEntry}
                  className="text-xs uppercase tracking-wide text-cream/70 hover:text-cream transition-colors"
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

        <p className="text-sm text-cream/70 leading-relaxed">
          {body}
        </p>
      </div>

      {actions && (
        <div className="mt-2 w-full max-w-[240px] flex flex-col items-center gap-3">
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