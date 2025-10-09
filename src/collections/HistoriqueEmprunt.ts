import { isBureau, isUser } from '@/service/accessControl';
import { CollectionConfig } from 'payload';
import { Emprunts } from './Emprunts';

// Remove filterOptions from fields
const fieldsWithoutFilterOptions = Emprunts.fields.map((field) => {
  const f = { ...field };
  if ('filterOptions' in f) delete f.filterOptions;
  return f;
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
