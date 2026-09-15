"use client";

import { useState } from "react";
import QRCode from "qrcode";
import Image from "next/image";

const QRGeneratorPage = () => {
  const [qrCode, setQrCode] = useState(null);

  const generate = () => {
    QRCode.toDataURL(`https://github.com/Saif-dev10`).then(setQrCode);
  }

  return (
    <main>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <h1 className="mb-4 text-3xl font-bold">
          QR Code Generator
        </h1>

        <div className="mb-4">
          {/* QR code will be displayed here */}
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
          onClick={() => {
            // QR generation will be added here
            generate();
          }}
          className="rounded-lg bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800 cursor-pointer active:scale-95"
        >
          Generate QR Code
        </button>
      </div>
    </main>
  );
};

export default QRGeneratorPage;