import useAuth from "@wasp/auth/useAuth";

export function Profile() {
  const { data: user } = useAuth();

  if (!user) {
    return <div>You are not logged in!</div>;
  }

  return <div>Hello, {user.nickname}!</div>;
}
