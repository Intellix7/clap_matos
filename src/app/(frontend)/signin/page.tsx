import { useState } from "react";

const SignInPage = () => {
  const [error, setError] = useState<string | null>(null);
  return (
    <div>
      {error && <p className='text-red-500'>{decodeURIComponent(error)}</p>}
      {/* your sign-in form */}
    </div>
  );
};
export default SignInPage;
