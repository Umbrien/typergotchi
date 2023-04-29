import { Link } from 'react-router-dom';
import { SignupForm } from '@wasp/auth/forms/Signup';

export function SignupPage() {
  return (
    <main>
      <SignupForm />
      <br />
      <span>
        I already have an account (<Link to='/login'>go to login</Link>).
      </span>
    </main>
  );
};
