import { Access } from 'payload';

export const isUser: Access = ({ req: { user } }) => {
  return !!user;
};

export const isAdmin: Access = ({ req: { user } }) => {
  return !!user && user.role === 'admin';
};

export const isAdminOrMe: Access = ({ req: { user }, id }) => {
  return !!user && (user.role === 'admin' || user.id === id);
};

export const isMe: Access = ({ req: { user }, id }) => {
  return !!user && user.id === id;
};

export const isAdminOrNotUser: Access = ({ req: { user } }) => {
  if (!user) return true;
  return user.role === 'admin';
};
