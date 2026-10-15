import Link from "next/link";

export default function PlatformNotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-[520px] flex-col items-center justify-center px-6 text-center">
      <p className="skul-eyebrow">404</p>
      <h1 className="skul-heading mt-2 text-[24px] font-semibold text-[#0b1a30]">Page not found</h1>
      <p className="mt-2 text-[14px] text-[#6b7587]">This platform administration page does not exist or has moved.</p>
      <Link href="/admin/platform" className="mt-6 inline-flex h-10 items-center rounded-lg bg-[#071a33] px-4 text-[13.5px] font-semibold text-white hover:bg-[#0e2544]">
        Back to platform overview
      </Link>
    </main>
  );
}