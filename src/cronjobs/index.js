import cron from 'node-cron';

// Everyday at 12:00 AM
const runDaily = (scheduledFunction) =>
  cron.schedule(
    '0 12 */1 * *',
    () => {
      scheduledFunction();
    },
    {
      scheduled: true,
      timezone: 'America/Sao_Paulo'
    }
  );

export { runDaily };
