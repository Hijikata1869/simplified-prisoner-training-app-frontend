export async function loggedIn() {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RAILSAPI_URL}login`),
    {
      credentials: "include",
    }
  );
  const result = res.json();
  return result;
}
