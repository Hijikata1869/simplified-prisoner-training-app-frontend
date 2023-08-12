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

export async function deleteTrainingLog(userId, trainingLogId) {
  const res = await fetch(
    new URL(
      `${process.env.NEXT_PUBLIC_RAILSAPI_URL}/users/${userId}/training_logs/${trainingLogId}`
    ),
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  // const result = await res.json();
  return res;
}
