import { userInterface } from "@/typeInterfaces/users.interface";

const PERMISSIONS = {
    super_admin: [
        'view:release', "create:release", "edit:release", "update:release", "delete:release",
        "view:post", "create:post", "edit:post", "update:post", "delete:post"
    ],

    admin: [
        'view:release', "create:release", "edit:release", "update:release", "delete:release",
        "view:post", "create:post", "edit:post", "update:post", "delete:post"
    ],

    editor: [
        'view:release',
        "view:post", "create:post", "edit:post", "update:post", "delete:post"
    ],


    moderator: [
        'view:release',  "edit:release", "update:release", "delete:release",
        "view:post", "create:post", "edit:post", "update:post", "delete:post"
    ],

    support: [
        'view:release',  "edit:release", "update:release", "delete:release",
        "view:post", // "edit:post", "update:post", 

    ],

    user: [
        "view:release"
    ],
}

export const checkPermission = (user: userInterface, action: string, resource: string) => {
    const permissions = PERMISSIONS[user.role];
    if (!permissions) return false;

    return permissions.includes(`${action}:${resource}`);
}