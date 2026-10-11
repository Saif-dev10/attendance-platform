import DataTable from "./DataTable";
import EmptyState from "./EmptyState";
import AdminPageHeader from "./AdminPageHeader";
import PlatformShell from "../platform/PlatformShell";
import UniversityShell from "../university/UniversityShell";
export default function AdminResourcePage({ domain = "university", title, description = "Manage this area of your institution.", rows = [] }) {
  const content = <><AdminPageHeader title={title} description={description}/>{rows.length ? <DataTable columns={Object.keys(rows[0]).map((key) => ({ key, label: key.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase()) }))} rows={rows}/> : <EmptyState title={`No ${title.toLowerCase()} to show yet`} description="This workspace is ready. Connect your records or add your first item to get started."/>}</>;
  return domain === "platform" ? <PlatformShell>{content}</PlatformShell> : <UniversityShell>{content}</UniversityShell>;
}
