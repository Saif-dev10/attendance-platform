"use client";

import { useState } from "react";
import QRCode from "qrcode";
import Image from "next/image";

const QRGeneratorPage = () => {
  const [qrCode, setQrCode] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generate = async () => {
    setIsGenerating(true);

    try {
      // Temporary test URL.
      // Later, this token will come from your backend.
      const scanUrl =
        "http://localhost:3000/scan?token=test123";

      const url = await QRCode.toDataURL(scanUrl, {
        width: 512,
        margin: 2,
        errorCorrectionLevel: "M",
      });

      setQrCode(url);
    } catch (error) {
      console.error("QR generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <h1 className="mb-4 text-3xl font-bold">
          QR Code Generator
        </h1>

        <div className="mb-4">
          {qrCode ? (
            <Image
              src={qrCode}
              alt="Generated QR Code"
              width={256}
              height={256}
              className="h-64 w-64"
            />
          ) : (
            <div className="flex h-64 w-64 items-center justify-center rounded-lg bg-white shadow">
              <p className="text-gray-500">
                No QR code generated yet
              </p>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={generate}
          disabled={isGenerating}
          className="cursor-pointer rounded-lg bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isGenerating ? "Generating..." : "Generate QR Code"}
        </button>

        {qrCode && (
          <p className="mt-4 max-w-sm text-center text-xs text-gray-500">
            This QR currently contains a temporary test attendance
            token.
          </p>
        )}
      </div>
    </main>
  );
};

export default QRGeneratorPage;