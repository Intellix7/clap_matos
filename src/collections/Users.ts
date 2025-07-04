import { isAdmin, isMe, isNotUser } from "@/service/accessControl";
import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  access: {
    read: isMe,
    update: isAdmin,
    delete: isAdmin,
    create: isNotUser, // Allow creation only for non-authenticated users
  },
  fields: [
    {
      name: "role",
      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
      ],
      defaultValue: "user",
      required: true,
    },
    {
      name: "password",
      type: "text",
      required: true,
      admin: {
        hidden: true,
      },
    },
  ],
};
