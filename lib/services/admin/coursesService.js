import { courses } from "@/lib/mock/admin/courses";
export async function getAll() { return [...courses]; }
export async function getById(id) {
  const record = courses.find((item) => String(item.id) === String(id));
  if (!record) throw new Error(`Course ${id} was not found.`);
  return record;
}
const service = { getAll, getById };
export default service;
