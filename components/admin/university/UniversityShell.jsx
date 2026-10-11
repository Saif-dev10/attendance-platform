import AdminShell from "../shared/AdminShell";
import { universityNavigation } from "./nav";
export default function UniversityShell({ children, navigation = universityNavigation }) {
  return <AdminShell title="University administration" navigation={navigation}>{children}</AdminShell>;
}
