import SettingsPageShell from '@/components/features/settings/SettingsPageShell';
import PasswordForm from '@/components/features/settings/PasswordForm';

export default function PasswordPage() {
  return (
    <SettingsPageShell
      title="Password"
      subtitle="Account security"
      description="Update your SKUL password securely from one place."
    >
      <PasswordForm />
    </SettingsPageShell>
  );
}
