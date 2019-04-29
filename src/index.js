import server from './server';
import { runDaily } from '~/cronjobs';
import { fetchBulkData } from '~/cronjobs/fetchBulkData';

fetchBulkData();
runDaily(fetchBulkData);

export default server;
