'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import SettingsField from './SettingsField';
import { submitFeedback } from '@/lib/services/settings';

const categories = ['Bug Report', 'Account & Security', 'Academic', 'Attendance', 'Examinations', 'Campus Ride', 'Documents', 'General Feedback'];

export default function FeedbackForm() {
  const [form, setForm] = useState({ subject: '', category: categories[0], message: '', feature: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    setStatus({ type: '', message: '' });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    if (!form.subject.trim() || !form.message.trim()) {
      setStatus({ type: 'error', message: 'Add a subject and message before sending your feedback.' });
      return;
    }

    setSubmitting(true);
    const result = await submitFeedback(form);
    setSubmitting(false);
    setStatus({ type: result.success ? 'success' : 'error', message: result.message });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-line bg-white p-5 sm:p-7">

      <SettingsField 
        label="Subject" 
        value={form.subject} 
        onChange={update('subject')} 
        placeholder="Briefly describe the issue or idea"
      />

      <label className="block">
        <span 
          className="mb-1.5 block text-xs font-bold text-charcoal"
        >
          Category
        </span>

        <select 
          value={form.category} 
          onChange={update('category')} 
          className="
            w-full rounded-xl border border-line bg-white px-3.5 py-3 text-sm text-charcoal outline-none transition-colors focus:border-bronze-deep focus:ring-2 focus:ring-bronze-deep/10"
          >
          {categories.map((category) => <option key={category}>{category}</option>)}
        </select>
      </label>

      <label className="block">
        <span 
          className="mb-1.5 block text-xs font-bold text-charcoal"
        >
          Page or feature (optional)
        </span>

        <input 
          value={form.feature} 
          onChange={update('feature')} 
          placeholder="For example, timetable or assignments" 
          className="w-full rounded-xl border border-line bg-white px-3.5 py-3 text-sm text-charcoal outline-none transition-colors placeholder:text-graphite-soft focus:border-bronze-deep focus:ring-2 focus:ring-bronze-deep/10"
        />

      </label>

      <label className="block">
        <span 
          className="
            mb-1.5 block text-xs font-bold text-charcoal"
          >
            Message
          </span>

        <textarea 
          value={form.message} 
          onChange={update('message')} 
          rows={5} 
          placeholder="
            Tell us what happened or what you would like to see improved" 
              className="w-full resize-none rounded-xl border border-line bg-white px-3.5 py-3 text-sm text-charcoal outline-none transition-colors placeholder:text-graphite-soft focus:border-bronze-deep focus:ring-2 focus:ring-bronze-deep/10"
          />
      </label>

      {status.message && <p role="status" 
        className={`rounded-xl px-4 py-3 text-sm font-medium ${status.type === 'success' ? 'bg-bronze-deep/10 text-bronze-deep' : 'bg-red-50 text-red-600'}`}
      >
        {status.message}
        </p>
      }

      <Button 
        type="submit" 
        disabled={submitting} 
        className="w-full sm:w-auto">
          {submitting ? 'Sending...' : 'Send Feedback'}
        </Button>
    </form>
  );
}
