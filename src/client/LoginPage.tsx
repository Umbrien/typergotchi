import { Link } from 'react-router-dom';
import { LoginForm } from '@wasp/auth/forms/Login';

export function LoginPage() {
  return (
    <main>
      <LoginForm />
      <br />
      <span>
        I don't have an account yet (<Link to='/signup'>go to signup</Link>).
      </span>
    </main>
  );
};
