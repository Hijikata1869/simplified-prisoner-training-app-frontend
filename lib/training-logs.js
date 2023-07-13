export async function getAllTrainingLogsData() {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RAILSAPI_URL}/training_logs`)
  );
  const trainingLogs = await res.json();
  return trainingLogs;
}
