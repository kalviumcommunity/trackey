export const roles = {
  admin: ["create", "read", "update", "delete"],
  editor: ["read", "update"],
  viewer: ["read"],
};

export type Role = keyof typeof roles;
