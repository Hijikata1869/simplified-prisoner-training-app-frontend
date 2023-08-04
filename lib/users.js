export async function getAllUserIds() {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RAILSAPI_URL}/users`),
    {
      credentials: "include",
    }
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
    new URL(`${process.env.NEXT_PUBLIC_RAILSAPI_URL}/users/${id}`),
    {
      credentials: "include",
    }
  );
  const user = await res.json();
  return {
    user,
  };
}

export async function fetchCurrentUser() {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RAILSAPI_URL}current_user`),
    {
      credentials: "include",
    }
  );
  const currentUser = await res.json();
  return {
    currentUser,
  };
}
