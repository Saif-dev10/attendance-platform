"use client";

import { useCallback, useState } from "react";

import Topbar from "@/components/layout/Topbar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

import QRScanner from "@/components/qr/QRScanner";
import QRValidationCard from "@/components/qr/QRValidationCard";
import QRResultScreen from "@/components/qr/QRResultScreen";
import ManualCodeEntry from "@/components/qr/ManualCodeEntry";
import QRImageUpload from "@/components/qr/QRImageUpload";

import {
  confirmAttendance,
  validateQRCode,
} from "@/components/qr/qr-types";

export default function ScanPage() {
  const [mode, setMode] = useState("camera");

  const [cameraStage, setCameraStage] = useState(
    "requesting_permission"
  );

  const [cameraErrorReason, setCameraErrorReason] =
    useState("unavailable");

  const [flowStage, setFlowStage] = useState("input");

  const [validation, setValidation] = useState(null);

  const [confirmed, setConfirmed] = useState(null);

  const [isConfirming, setIsConfirming] = useState(false);

  const resetToScanning = useCallback(() => {
    setFlowStage("input");
    setMode("camera");
    setCameraStage("requesting_permission");
    setCameraErrorReason("unavailable");
    setValidation(null);
    setConfirmed(null);
  }, []);

  const runValidation = useCallback(async (rawPayload) => {
    setFlowStage("validating");

    const result = await validateQRCode(rawPayload);

    setValidation(result);

    setFlowStage(
      result.status === "valid"
        ? "review"
        : "result"
    );
  }, []);

  function handleQRDetected(rawPayload) {
    setCameraStage("detecting");

    // Brief pause so the "detecting" sweep is visible
    // before moving on.
    setTimeout(
      () => runValidation(rawPayload),
      500
    );
  }

  async function handleConfirmAttendance() {
    setIsConfirming(true);

    const result = await confirmAttendance({
      qrToken: "demo-token",
      studentId: "demo-student",
      attendanceSessionId: "demo-session",
      timestamp: new Date().toISOString(),
      location: null,
    });

    setConfirmed(result);
    setIsConfirming(false);
    setFlowStage("result");
  }

  return (
    <div className="min-h-screen bg-paper">

      <main className="mx-auto flex min-h-[calc(100vh-72px)] max-w-lg flex-col items-center justify-center px-5 pb-28 pt-8 sm:pb-10">
        {flowStage === "input" &&
          mode === "camera" && (
            <ScanIntro
              cameraStage={cameraStage}
              errorReason={cameraErrorReason}
              onAllowCamera={() =>
                setCameraStage("requesting_permission")
              }
              onManualEntry={() =>
                setMode("manual")
              }
              onRetryCamera={() =>
                setCameraStage("requesting_permission")
              }
              onCameraReady={() =>
                setCameraStage("active")
              }
              onCameraError={(reason) => {
                setCameraErrorReason(reason);
                setCameraStage(
                  reason === "permission_denied"
                    ? "permission_denied"
                    : "camera_error"
                );
              }}
              onQRDetected={handleQRDetected}
              onUpload={() =>
                setMode("upload")
              }
            />
          )}

        {flowStage === "input" &&
          mode === "manual" && (
            <ManualCodeEntry
              isSubmitting={false}
              onSubmit={(code) =>
                runValidation(code)
              }
              onCancel={() =>
                setMode("camera")
              }
            />
          )}

        {flowStage === "input" &&
          mode === "upload" && (
            <QRImageUpload
              isScanning={false}
              onScan={() =>
                runValidation("UPLOAD_DEMO")
              }
              onCancel={() =>
                setMode("camera")
              }
            />
          )}

        {flowStage === "validating" && (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-line border-t-bronze-deep" />

            <p className="text-sm text-graphite-soft">
              Validating QR code…
            </p>
          </div>
        )}

        {flowStage === "review" &&
          validation?.session && (
            <QRValidationCard
              session={validation.session}
              isConfirming={isConfirming}
              onConfirm={
                handleConfirmAttendance
              }
              onCancel={resetToScanning}
            />
          )}

        {flowStage === "result" && (
          <ResultRouter
            validation={validation}
            confirmed={confirmed}
            onScanAgain={resetToScanning}
            onDone={() =>
              (window.location.href =
                "/dashboard")
            }
          />
        )}
      </main>

      <MobileBottomNav />
    </div>
  );
}

function ScanIntro({
  cameraStage,
  errorReason,
  onAllowCamera,
  onManualEntry,
  onRetryCamera,
  onQRDetected,
  onUpload,
  onCameraReady,
  onCameraError,
}) {
  return (
    <div className="w-full max-w-sm">
      <div className="mb-6 text-center">
        <h1 className="text-xl font-semibold text-charcoal">
          Scan QR Code
        </h1>

        <p className="mt-1.5 text-sm leading-relaxed text-graphite-soft">
          Scan the QR code displayed by your
          lecturer to mark your attendance.
        </p>
      </div>

      <QRScanner
        stage={cameraStage}
        errorReason={errorReason}
        onAllowCamera={onAllowCamera}
        onManualEntry={onManualEntry}
        onRetryCamera={onRetryCamera}
        onQRDetected={onQRDetected}
        onCameraReady={onCameraReady}
        onCameraError={onCameraError}
      />

      {/* Demo trigger — simulates a QR being found
          in the camera frame.
          TODO: remove once real QR decoding is wired
          to the video stream. */}

      {cameraStage === "active" && (
        <button
          onClick={() =>
            onQRDetected("VALID_DEMO")
          }
          className="mt-4 text-xs text-graphite-soft/60 underline decoration-dotted underline-offset-4"
        >
          (Dev) Simulate QR detected
        </button>
      )}

      <div className="mt-6 flex items-center justify-center gap-6">
        <button
          onClick={onManualEntry}
          className="text-xs font-medium uppercase tracking-wide text-graphite-soft hover:text-bronze-deep transition-colors"
        >
          Enter Code Manually
        </button>

        <span className="h-3 w-px bg-line" />

        <button
          onClick={onUpload}
          className="text-xs font-medium uppercase tracking-wide text-graphite-soft hover:text-bronze-deep transition-colors"
        >
          Upload QR Image
        </button>
      </div>
    </div>
  );
}

function ResultRouter({
  validation,
  confirmed,
  onScanAgain,
  onDone,
}) {
  if (confirmed) {
    return (
      <QRResultScreen
        variant="success"
        title="Attendance Marked"
        description={
          <>
            Successfully verified for{" "}
            <span className="font-medium text-charcoal">
              {confirmed.courseCode}:{" "}
              {confirmed.courseTitle}
            </span>{" "}
            on {confirmed.date}.
          </>
        }
        details={[
          {
            label: "Time Registered",
            value: confirmed.timeRegistered,
          },
          {
            label: "Venue",
            value: confirmed.location,
          },
        ]}
        primaryLabel="Done"
        onPrimary={onDone}
        secondaryLabel="Back to Dashboard"
        onSecondary={onDone}
      />
    );
  }

  if (!validation) {
    return null;
  }

  if (validation.status === "invalid") {
    return (
      <QRResultScreen
        variant="invalid"
        title="Invalid QR Code"
        description="This QR code isn't recognized by SKUL. Make sure you're scanning the code your lecturer is currently displaying."
        primaryLabel="Scan Again"
        onPrimary={onScanAgain}
        secondaryLabel="Back"
        onSecondary={onDone}
      />
    );
  }

  if (validation.status === "expired") {
    return (
      <QRResultScreen
        variant="expired"
        title="QR Code Expired"
        description="This attendance session has ended. Ask your lecturer to display a new code if you're still in class."
        primaryLabel="Scan Again"
        onPrimary={onScanAgain}
        secondaryLabel="Back"
        onSecondary={onDone}
      />
    );
  }

  if (
    validation.status === "already_used" &&
    validation.alreadyMarked
  ) {
    const a = validation.alreadyMarked;

    return (
      <QRResultScreen
        variant="already_marked"
        title="Attendance Already Marked"
        description="You've already recorded attendance for this session."
        details={[
          {
            label: "Course",
            value: `${a.courseCode}: ${a.courseTitle}`,
          },
          {
            label: "Time Registered",
            value: a.timeRegistered,
          },
          {
            label: "Status",
            value: a.status,
          },
        ]}
        primaryLabel="Done"
        onPrimary={onDone}
      />
    );
  }

  if (
    validation.status === "not_eligible" &&
    validation.notEligible
  ) {
    return (
      <QRResultScreen
        variant="not_eligible"
        title="You Can't Mark Attendance"
        description={
          validation.notEligible.reason
        }
        details={[
          {
            label: "Course",
            value: `${validation.notEligible.courseCode}: ${validation.notEligible.courseTitle}`,
          },
        ]}
        primaryLabel="Back"
        onPrimary={onDone}
      />
    );
  }

  return (
    <QRResultScreen
      variant="invalid"
      title="Unsupported QR Code"
      description="This QR type isn't supported in SKUL yet."
      primaryLabel="Back"
      onPrimary={onDone}
    />
  );
}