import { OnboardingProvider } from "@/components/admin/platform/onboarding/OnboardingProvider";
import OnboardingShell from "@/components/admin/platform/onboarding/OnboardingShell";

// Lives OUTSIDE the (main) route group: onboarding has its own step sidebar.
// The provider stays mounted across steps, which is what preserves entered values.
export default function OnboardingLayout({ children }) {
  return (
    <OnboardingProvider>
      <OnboardingShell>{children}</OnboardingShell>
    </OnboardingProvider>
  );
}