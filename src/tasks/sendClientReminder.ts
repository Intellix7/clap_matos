import clientMailTemplate from '@/service/email/clientMailTemplate';
import { TaskConfig, TaskHandler } from 'payload';

export const sendClientReminder: TaskHandler<'sendClientReminder'> = async ({
  input,
  req,
}) => {
  const { email, name, gamesName } = input;

  await req.payload.sendEmail({
    to: email,
    subject: 'Emprunt Jeux de Société - Rappel',
    html: clientMailTemplate(name, gamesName),
  });

  return {
    output: {},
  };
};

export const sendClientReminderTask: TaskConfig<'sendClientReminder'> = {
  slug: 'sendClientReminder',
  inputSchema: [
    {
      type: 'text',
      name: 'email',
      required: true,
    },
    {
      type: 'text',
      name: 'name',
      required: true,
    },
    {
      type: 'text',
      name: 'gamesName',
      required: true,
      hasMany: true,
    },
  ],
  handler: sendClientReminder,
};
