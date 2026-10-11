export function hasPermission(permissions = [], required) {
  return permissions.includes("*") || permissions.includes(required);
}
export function canAccess(permissions = [], required = []) {
  return required.every((permission) => hasPermission(permissions, permission));
}
export const adminRoles = {
  platform: ["platform:read", "platform:manage"],
  university: ["university:read", "university:manage"],
};
