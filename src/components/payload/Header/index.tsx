import { redirect } from 'next/navigation';
import { ServerProps } from 'payload';

export default function Header(props: ServerProps) {
  if (!props.user || props.user.role !== 'admin') {
    redirect('/'); // Redirect to home if not an admin
  }
  return <></>;
}
