import cron from 'node-cron';

const waterfall = async (tasks) => {
  for (const fn of tasks) {
    await fn();
  }
};

// Everyday at 12:00 AM
const runDaily = async (scheduledFunctions) => {
  await waterfall(scheduledFunctions);

  return cron.schedule(
    '0 12 */1 * *',
    async () => {
      await waterfall(scheduledFunctions);
    },
    {
      scheduled: true,
      timezone: 'America/Sao_Paulo'
    }
  );
};

export { runDaily };
