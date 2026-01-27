import { roles, Role } from "./roles";

export function hasPermission(role: Role, action: string) {
  return roles[role]?.includes(action);
}
