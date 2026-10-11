import { attendance } from "@/lib/mock/admin/attendance";
export async function getAll() { return [...attendance]; }
export async function getById(id) {
  const record = attendance.find((item) => String(item.id) === String(id));
  if (!record) throw new Error(`Attendance record ${id} was not found.`);
  return record;
}
const service = { getAll, getById };
export default service;
