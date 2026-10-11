import { lecturers } from "@/lib/mock/admin/lecturers";
export async function getAll() { return [...lecturers]; }
export async function getById(id) {
  const record = lecturers.find((item) => String(item.id) === String(id));
  if (!record) throw new Error(`Lecturer ${id} was not found.`);
  return record;
}
const service = { getAll, getById };
export default service;
