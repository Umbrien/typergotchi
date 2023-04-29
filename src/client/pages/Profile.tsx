import useAuth from '@wasp/auth'

export function Profile() {
  const { data: user } = useAuth()

  if (!user) {
    return <div>You are not logged in!</div>
  }

  return (
    <div>
      Hello, {user.email}!
    </div>
  )
}
