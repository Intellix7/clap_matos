import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { nodemailerAdapter } from '@payloadcms/email-nodemailer';

import { Users } from './collections/Users';
import { Games } from './collections/Games';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    components: {
      header: ['./components/payload/Header/index.tsx'],
    },
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    dateFormat: 'dd/mm/yyyy hh:mm',
  },
  collections: [Users, Games],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  email: nodemailerAdapter({
    defaultFromAddress: 'cag@rezoleo.fr',
    defaultFromName: 'CAG',
    transportOptions: {
      host: process.env.SMTP_HOST || '',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      // auth: {
      //   user: process.env.SMTP_USER || '',
      //   pass: process.env.SMTP_PASSWORD || '',
      // },
    },
  }),
});
