import { Access } from 'payload';

export const isUser: Access = ({ req: { user } }) => {
  return !!user;
};

export const isBureau: Access = ({ req: { user } }) => {
  return !!user && user.role === 'bureau';
};

export const isBureauOrMe: Access = ({ req: { user }, id }) => {
  return !!user && (user.role === 'bureau' || user.id === id);
};

export const isMe: Access = ({ req: { user }, id }) => {
  return !!user && user.id === id;
};

export const isBureauOrNotUser: Access = ({ req: { user } }) => {
  if (!user) return true;
  return user.role === 'bureau';
};
