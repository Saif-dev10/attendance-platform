import { examinations } from "@/lib/mock/admin/examinations";
export async function getAll() { return [...examinations]; }
export async function getById(id) {
  const record = examinations.find((item) => String(item.id) === String(id));
  if (!record) throw new Error(`Examination ${id} was not found.`);
  return record;
}
const service = { getAll, getById };
export default service;
