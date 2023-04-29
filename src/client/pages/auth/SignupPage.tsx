import { Link } from 'react-router-dom'
import { SignupForm } from '@wasp/auth/forms/Signup'

export function SignupPage () {
  return (
    <div className="w-full h-full bg-white">
      <div className="min-w-full min-h-[75vh] flex items-center justify-center">
        <div className="w-full h-full max-w-sm p-5 bg-white">
          <div>
            <SignupForm />
            <br />
            <span className="text-sm font-medium text-gray-900">
              I already have an account (<Link to="/login">go to login</Link>).
            </span>
            <br />
          </div>
        </div>
      </div>
    </div>
  )
}
