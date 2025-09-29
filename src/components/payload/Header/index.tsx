import { redirect } from 'next/navigation';
import { ServerProps } from 'payload';

export default function Header(props: ServerProps) {
  if (!props.user) {
    redirect('/'); // Redirect to home if not logged in
  }
  return <></>;
}
