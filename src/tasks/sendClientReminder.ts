import clientMailTemplate from '@/service/email/clientMailTemplate';
import { TaskConfig, TaskHandler } from 'payload';

export const sendClientReminder: TaskHandler<'sendClientReminder'> = async ({
  input,
  job,
  req,
}) => {
  const { email, name, gameName } = input;

  await req.payload.sendEmail({
    to: email,
    subject: 'Emprunt Jeux de Société - Rappel',
    html: clientMailTemplate(name, gameName),
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
      name: 'gameName',
      required: true,
    },
  ],
  handler: sendClientReminder,
};
