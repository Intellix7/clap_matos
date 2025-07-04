import { Access } from "payload";

export const isUser: Access = ({ req: { user } }) => {
  return !!user;
};

export const isAdmin: Access = ({ req: { user } }) => {
  return !!user && user.role === "admin";
};

export const isMe: Access = ({ req: { user }, id }) => {
  return !!user && user.id === id;
};

export const isNotUser: Access = ({ req: { user } }) => {
  return !user;
};
