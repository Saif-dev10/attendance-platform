'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Button from '@/components/ui/Button';
import SettingsField from './SettingsField';
import { changePassword } from '@/lib/services/settings';

const requirements = [
  'At least 8 characters',
  'A mix of letters and numbers',
  'Avoid easily guessed information',
];

export default function PasswordForm() {
  const [values, setValues] = useState({ current: '', next: '', confirm: '' });
  const [visible, setVisible] = useState({ current: false, next: false, confirm: false });
  const [state, setState] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateValue = (field) => (event) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setState({ type: '', message: '' });
  };

  const toggleVisibility = (field) => {
    setVisible((current) => ({ ...current, [field]: !current[field] }));
  };

  async function handleSubmit(event) {
    event.preventDefault();

    if (!values.current || !values.next || !values.confirm) {
      setState({ type: 'error', message: 'Enter your current password and both new password fields.' });
      return;
    }

    if (values.next.length < 8 || !/[A-Za-z]/.test(values.next) || !/[0-9]/.test(values.next)) {
      setState({ type: 'error', message: 'Your new password does not meet the requirements.' });
      return;
    }

    if (values.next !== values.confirm) {
      setState({ type: 'error', message: 'The new passwords do not match.' });
      return;
    }

    setIsSubmitting(true);
    const result = await changePassword({
      currentPassword: values.current,
      newPassword: values.next,
    });
    setIsSubmitting(false);
    setState({ type: result.success ? 'success' : 'error', message: result.message });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-line bg-white p-5 sm:p-7">
      <div className="space-y-4">
        <PasswordField 
          label="Current password" 
          value={values.current} 
          visible={visible.current} 
          onChange={updateValue('current')} 
          onToggle={() => toggleVisibility('current')}
        />
        <PasswordField 
          label="New password" 
          value={values.next} 
          visible={visible.next} 
          onChange={updateValue('next')} 
          onToggle={() => toggleVisibility('next')}
        />
        <PasswordField 
          label="Confirm new password" 
          value={values.confirm} 
          visible={visible.confirm} 
          onChange={updateValue('confirm')} 
          onToggle={() => toggleVisibility('confirm')}
        />
      </div>

      <div className="rounded-xl border border-line bg-cream px-4 py-4">
        <p className="text-xs font-bold uppercase tracking-wider text-charcoal">Password guidance</p>
        <ul className="mt-2 space-y-1 text-sm text-graphite">
          {requirements.map((requirement) => <li key={requirement}>• {requirement}</li>)}
        </ul>
        <p className="mt-2 text-xs text-graphite-soft">These are interface guidelines until the authentication service supplies its final validation rules.</p>
      </div>

      {state.message && (
        <p role="status" className={`rounded-xl px-4 py-3 text-sm font-medium ${state.type === 'success' ? 'bg-bronze-deep/10 text-bronze-deep' : 'bg-red-50 text-red-600'}`}>
          {state.message}
        </p>
      )}

      <Button 
        type="submit" 
        disabled={isSubmitting} 
        className="w-full sm:w-auto">
        {isSubmitting ? 'Updating...' : 'Update Password'}
      </Button>
    </form>
  );
}

function PasswordField({ label, value, visible, onChange, onToggle }) {
  return (
    <div className="relative">
      <SettingsField 
        label={label} 
        type={visible ? 'text' : 'password'}
        value={value} 
        onChange={onChange} 
        autoComplete="new-password"
      />

      <button 
        type="button" 
        onClick={onToggle} 
        aria-label={`${visible ? 'Hide' : 'Show'} ${label.toLowerCase()}`} 
        className="
          absolute right-3 top-8 flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-graphite-soft transition-colors hover:bg-cream hover:text-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze"
        >
        {visible ? <EyeOff size={17} /> : <Eye size={17} />}
      </button>
    </div>
  );
}
