"use client";

import Link from "next/link";
import { Wallet } from "lucide-react";
import { useCampusRide } from "@/lib/campus-ride/CampusRideContext";

export default function RideWallet() {
  const { walletBalance, topUpWallet } = useCampusRide();

  return (
    <section className="bg-white rounded-xl border border-line p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[11px] font-bold tracking-wider text-graphite-soft uppercase">Wallet Balance</p>
        <Wallet size={16} className="text-graphite-soft" />
      </div>
      <p className="text-2xl font-bold text-charcoal mb-4">
        ₦{walletBalance.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
      </p>
      <button
        type="button"
        onClick={() => topUpWallet(1000)}
        className="w-full bg-charcoal hover:bg-charcoal/90 text-cream text-sm font-semibold py-2.5 rounded-lg mb-2"
      >
        Quick Top Up
      </button>
      <Link href="/campus-ride/wallet" className="block text-center text-sm font-semibold text-bronze-deep py-1">
        Transaction History
      </Link>
    </section>
  );
}