"use client";
import DropdownMenu from "@/components/admin/shared/DropdownMenu";
import AdminButton from "@/components/admin/shared/AdminButton";
import { downloadText } from "@/lib/admin/csv";
import { IMPORT_TEMPLATES, buildTemplateCsv } from "@/lib/services/admin/importsService";
import { useToast } from "@/components/ui/Toast";

const ITEMS = [
  { type: "students", label: "Students template" },
  { type: "lecturers", label: "Lecturers template" },
  { type: "academic_structure", label: "Academic structure template" },
];

export default function TemplatesMenu() {
  const toast = useToast();
  const items = ITEMS.map((i) => ({
    label: i.label,
    icon: "download",
    onClick: () => {
      downloadText(IMPORT_TEMPLATES[i.type].fileName, buildTemplateCsv(i.type));
      toast.push({ title: "Template downloaded", message: IMPORT_TEMPLATES[i.type].fileName });
    },
  }));
  return (
    <DropdownMenu
      items={items}
      width={260}
      renderTrigger={({ open, toggle }) => (
        <AdminButton icon="download" onClick={toggle} aria-haspopup="menu" aria-expanded={open}>Templates</AdminButton>
      )}
    />
  );
}