import { userInterface } from "@/typeInterfaces/users.interface";

const PERMISSIONS = {
    user: ["view:post"],
    admin: ["view:post", "create:post", "edit:post", "update:post", "delete:post"],
    editor: [''],
    super_admin: [''],
    moderator: [''],
    support: [''],
}

export const checkPermission = (user: userInterface, action: string, resource: string) => {
    const permissions = PERMISSIONS[user.role];
    if (!permissions) return false;

    return permissions.includes(`${action}:${resource}`);
}