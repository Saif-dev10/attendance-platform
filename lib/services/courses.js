import { apiRequest } from "@/lib/api/client";

export async function getStudentCourses() {
  return apiRequest("/student/courses");
}

export async function getStudentCourse(courseId) {
  return apiRequest(`/student/courses/${courseId}`);
}

export async function getCourseMaterials(courseId) {
  return apiRequest(`/student/courses/${courseId}/materials`);
}

export async function getCourseMaterial(courseId, materialId) {
  return apiRequest(
    `/student/courses/${courseId}/materials/${materialId}`
  );
}