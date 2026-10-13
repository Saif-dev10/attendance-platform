import { OnboardingProvider } from "@/components/admin/platform/onboarding/OnboardingProvider";
import OnboardingShell from "@/components/admin/platform/onboarding/OnboardingShell";

export default function OnboardingLayout({ children }) {
  return (
    <OnboardingProvider>
      <OnboardingShell>{children}</OnboardingShell>
    </OnboardingProvider>
  );
}
