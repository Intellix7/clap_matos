import { isBureau, isUser } from '@/service/accessControl';
import { CollectionConfig, Field } from 'payload';
import { Emprunts } from './Emprunts';

// Remove filterOptions from fields
const fieldsWithoutFilterOptions = Emprunts.fields.map((field) => {
  const f = { ...(field as any) };
  delete f.filterOptions;
  return f as Field;
});

export const HistoriqueEmprunt: CollectionConfig = {
  slug: 'historiqueEmprunt',
  access: {
    read: isUser,
    update: () => false,
    delete: isBureau,
    create: () => false,
  },
  labels: {
    singular: "Historique d'emprunt",
    plural: "Historique d'emprunts",
  },
  fields: fieldsWithoutFilterOptions,
};
