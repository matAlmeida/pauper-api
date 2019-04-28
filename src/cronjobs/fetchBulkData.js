/* eslint no-console: 0 */

import request from 'request';
import config from '~/config';

const fetchBulkData = () => {
  request.get(`${config.BASE_URL}/bulk-data`, (error, r, body) => {
    if (error) {
      console.error(error);
    }

    const { data } = JSON.parse(body);
    const allCardsBulk = data.filter((bulk) => bulk.type === 'all_cards');
    // A way to check if the current downloaded bulk is older than the fetched
    // Look at allCardsBulk.updated_at
    // If newer delete old file and download new
    // Check the downloaded file size is the same as allCardsBulk.compressed_size
    // Delete this comments
  });
};

export { fetchBulkData };
