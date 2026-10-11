import { timetable } from "@/lib/mock/admin/timetable";
export async function getAll() { return [...timetable]; }
export async function getById(id) {
  const record = timetable.find((item) => String(item.id) === String(id));
  if (!record) throw new Error(`Timetable entry ${id} was not found.`);
  return record;
}
const service = { getAll, getById };
export default service;
