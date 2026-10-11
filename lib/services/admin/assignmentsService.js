import { assignments } from "@/lib/mock/admin/assignments";
export async function getAll() { return [...assignments]; }
export async function getById(id) {
  const record = assignments.find((item) => String(item.id) === String(id));
  if (!record) throw new Error(`Assignment ${id} was not found.`);
  return record;
}
const service = { getAll, getById };
export default service;
