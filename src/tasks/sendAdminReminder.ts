import adminMailTemplate from '@/service/email/adminMailTemplate';
import { TaskConfig, TaskHandler } from 'payload';

export const sendAdminReminder: TaskHandler<'sendAdminReminder'> = async ({
  input,
  job,
  req,
}) => {
  const { email, name, gameName } = input;

  await req.payload.sendEmail({
    to: email,
    subject: 'Emprunt Jeux de Société - Rappel',
    html: adminMailTemplate(name, gameName),
  });

  return {
    output: {},
  };
};

export const sendAdminReminderTask: TaskConfig<'sendAdminReminder'> = {
  slug: 'sendAdminReminder',
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
  handler: sendAdminReminder,
};
