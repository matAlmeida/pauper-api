/* eslint no-console: 0 */
/* eslint no-unused-vars: 0 */

import fs from 'fs';
import util from 'util';
import request from 'request';
import download from 'download';
import { Spinner } from 'cli-spinner';

import config from '~/config';

const fetchedIsNew = (path, newFileDate) => {
  try {
    const stats = fs.statSync(`${path}/scryfall-all-cards.json`);
    const mtime = new Date(util.inspect(stats.mtime));

    return newFileDate > mtime;
  } catch (error) {
    return true;
  }
};

const deleteFolderRecursive = (path) => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file, index) => {
      const curPath = path + '/' + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

const fetchBulkData = () =>
  new Promise((resolve, reject) => {
    request.get(`${config.BASE_URL}/bulk-data`, (error, r, body) => {
      if (error) {
        console.error(error);
      }

      const { data } = JSON.parse(body);
      const allCardsBulk = data.filter((bulk) => bulk.type === 'all_cards');
      const dirPrefix = 'bulk';

      if (fetchedIsNew(dirPrefix, allCardsBulk.updated_at)) {
        const spinner = new Spinner('> Fetching new Bulk...');
        spinner.setSpinnerString(14);
        spinner.start();
        deleteFolderRecursive(dirPrefix);

        const downloadURL =
          'https://archive.scryfall.com/json/scryfall-all-cards.json';
        const downloadOptions = {
          decompress: true
        };

        download(downloadURL, dirPrefix, downloadOptions).then(() => {
          spinner.stop();
          resolve();
        });
      } else {
        console.log('info: Bulk already updated');
        reject();
      }
    });
  });

export { fetchBulkData };
