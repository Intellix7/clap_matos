import { PayloadRequest } from 'payload';

export default async function populateCreatedBy({
  req,
  data,
}: {
  req: PayloadRequest;
  data: any;
}) {
  if (!req.user) {
    throw new Error('User not authenticated');
  }

  data.createdBy = req.user.id;

  return data;
}
