export async function getAllUserIds() {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RAILSAPI_URL}/users`)
  );
  const response = await res.json();

  const usersArr = response.users;

  return usersArr.map((user) => {
    return {
      params: {
        id: String(user.id),
      },
    };
  });
}

export async function fetchUser(id) {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RAILSAPI_URL}/users/${id}`)
  );
  const user = await res.json();
  return {
    user,
  };
}
