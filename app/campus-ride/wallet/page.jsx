"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useCampusRide } from "@/lib/campus-ride/CampusRideContext";

export default function WalletPage() {
  const { walletBalance, transactions, topUpWallet } = useCampusRide();

  return (
    <div>
      <header className="flex items-center gap-4 px-5 sm:px-8 py-5 bg-white border-b border-line">
        <Link
          href="/campus-ride"
          className="w-9 h-9 rounded-lg border border-line flex items-center justify-center hover:bg-paper shrink-0"
        >
          <ArrowLeft size={16} className="text-graphite-soft" />
        </Link>
        <h1 className="font-semibold text-charcoal">Ride Wallet</h1>
      </header>

      <div className="p-5 sm:p-8 max-w-xl space-y-6">
        <div className="bg-charcoal rounded-xl p-6">
          <p className="text-[10px] font-bold tracking-wider text-cream/60 uppercase mb-1">Balance</p>
          <p className="text-3xl font-bold text-cream mb-4">
            ₦{walletBalance.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
          </p>
          <button
            type="button"
            onClick={() => topUpWallet(1000)}
            className="bg-cream text-charcoal text-sm font-semibold px-4 py-2 rounded-lg hover:bg-cream/90"
          >
            Quick Top Up ₦1,000
          </button>
        </div>

        <div className="bg-white rounded-xl border border-line p-5">
          <p className="text-[11px] font-bold tracking-wider text-graphite-soft uppercase mb-4">
            Transaction History
          </p>
          <div className="divide-y divide-line">
            {transactions.map((txn) => (
              <div key={txn.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-semibold text-charcoal">{txn.description}</p>
                  <p className="text-xs text-graphite-soft">{txn.date}</p>
                </div>
                <p className={`text-sm font-bold ${txn.amount > 0 ? "text-green-600" : "text-red-500"}`}>
                  {txn.amount > 0 ? "+" : "-"}₦{Math.abs(txn.amount).toLocaleString("en-NG")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}