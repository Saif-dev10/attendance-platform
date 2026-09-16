'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  AlertCircle,
  ArrowRight,
  Bell,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Info,
} from 'lucide-react';

const iconByType = {
  academic: BookOpen,
  attendance: ClipboardCheck,
  examination: AlertCircle,
  support: Info,
};

const toneByType = {
  academic: 'bg-cream text-graphite',
  attendance: 'bg-moss-soft text-moss',
  examination: 'bg-bronze-deep/10 text-bronze-deep',
  support: 'bg-paper text-graphite-soft',
};

export default function NotificationCenter({ notifications, role }) {
  const [items, setItems] = useState(notifications);
  const [filter, setFilter] = useState('all');

  const visibleItems = useMemo(
    () => (filter === 'unread' ? items.filter((item) => item.unread) : items),
    [filter, items],
  );
  const unreadCount = items.filter((item) => item.unread).length;
  const roleLabel = role === 'lecturer' ? 'lecturer' : 'student';

  function markAllRead() {
    setItems((current) => current.map((item) => ({ ...item, unread: false })));
  }

  function markRead(id) {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, unread: false } : item)));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-bronze-deep">{roleLabel} workspace</p>
          <h1 className="mt-1 font-display text-2xl font-semibold text-charcoal sm:text-3xl">Notifications</h1>
          <p className="mt-1 text-sm text-graphite-soft">Updates that need your attention, kept in one place.</p>
        </div>
        <button type="button" onClick={markAllRead} disabled={!unreadCount} className="cursor-pointer self-start text-sm font-bold text-bronze-deep transition-colors hover:text-charcoal disabled:cursor-not-allowed disabled:text-graphite-soft sm:self-auto">
          Mark all as read
        </button>
      </div>

      <div className="flex items-center gap-2" role="tablist" aria-label="Notification filter">
        {['all', 'unread'].map((option) => (
          <button key={option} type="button" role="tab" aria-selected={filter === option} onClick={() => setFilter(option)} className={`cursor-pointer rounded-lg px-3 py-2 text-xs font-bold capitalize transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze ${filter === option ? 'bg-charcoal text-cream' : 'text-graphite-soft hover:bg-cream hover:text-charcoal'}`}>
            {option}{option === 'unread' && unreadCount > 0 ? ` (${unreadCount})` : ''}
          </button>
        ))}
      </div>

      {visibleItems.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-line bg-white">
          {visibleItems.map((notification, index) => {
            const Icon = iconByType[notification.type] || Bell;
            return (
              <article key={notification.id} className={`group flex gap-3 p-4 transition-colors hover:bg-paper sm:gap-4 sm:p-5 ${index !== visibleItems.length - 1 ? 'border-b border-line' : ''} ${notification.unread ? 'bg-paper/50' : ''}`}>
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${toneByType[notification.type] || toneByType.support}`}><Icon size={18} /></span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex items-center gap-2"><h2 className="text-sm font-bold text-charcoal">{notification.title}</h2>{notification.unread && <span className="h-1.5 w-1.5 rounded-full bg-bronze-deep" aria-label="Unread" />}</div>
                    <time className="shrink-0 text-xs text-graphite-soft">{notification.time}</time>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-graphite">{notification.message}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <Link href={notification.href} onClick={() => markRead(notification.id)} className="inline-flex items-center gap-1 text-xs font-bold text-bronze-deep transition-colors hover:text-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze">
                      {notification.action}<ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                    {notification.unread && <button type="button" onClick={() => markRead(notification.id)} className="cursor-pointer text-xs font-semibold text-graphite-soft hover:text-charcoal">Mark read</button>}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-line bg-white px-5 py-12 text-center">
          <CheckCircle2 className="mx-auto text-moss" size={24} />
          <h2 className="mt-3 text-sm font-bold text-charcoal">You are all caught up</h2>
          <p className="mt-1 text-sm text-graphite-soft">There are no unread notifications right now.</p>
        </div>
      )}
    </div>
  );
}
