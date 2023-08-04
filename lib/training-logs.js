export async function fetchUserTrainingLogs(userId) {
  const res = await fetch(
    new URL(
      `${process.env.NEXT_PUBLIC_RAILSAPI_URL}users/${userId}/training_logs`
    ),
    {
      credentials: "include",
    }
  );
  const userTrainingLogs = await res.json();
  return {
    userTrainingLogs,
  };
}
