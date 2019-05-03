import server from './server';
import { runDaily } from '~/cronjobs';
import { fetchBulkData } from '~/cronjobs/fetchBulkData';
import { savePauperToBulk } from '~/cronjobs/sanitizeOnlyPauper';

runDaily([fetchBulkData, savePauperToBulk]);

export default server;
