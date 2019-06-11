/* eslint no-console: 0 */
/* eslint no-unused-vars: 0 */

import fs from 'fs';
import path from 'path';
import StreamArray from 'stream-json/streamers/StreamArray';
import { Spinner } from 'cli-spinner';

const alreadySanitized = (path) => {
  if (process.env.BULK_UPDATED && fs.existsSync(path)) {
    return true;
  }

  return false;
};

const filterPauperFromBulk = () =>
  new Promise((resolve, reject) => {
    const jsonStream = StreamArray.withParser();
    let totalCards = 0;

    jsonStream.on('data', ({ key, value: card }) => {
      if (card.legalities.pauper === 'legal') {
        writeStream.write(`${JSON.stringify(card)},`, 'utf8');
        totalCards++;
      }
    });
    jsonStream.on('end', () => {
      writeStream.write(`"total_cards": "${totalCards}"]`, 'utf8');
      resolve();
    });
    jsonStream.on('error', reject);

    const allCardsPath = path.join(
      __dirname,
      '../../bulk/scryfall-all-cards.json'
    );

    const pauperCardsPath = path.join(
      __dirname,
      '../../bulk/pauper-cards.json'
    );

    const writeStream = fs.createWriteStream(pauperCardsPath, { flags: 'a+' });
    writeStream.write('[', 'utf8');
    fs.createReadStream(allCardsPath).pipe(jsonStream.input);
  });

const savePauperToBulk = async () => {
  const pauperCardsPath = path.join(__dirname, '../../bulk/pauper-cards.json');

  if (alreadySanitized(pauperCardsPath)) {
    console.log('info: Bulk already sanitized');
    return;
  }

  console.log('info: The sanitize may take several minutes to finish!');
  const spinner = new Spinner('> Starting sanitize...');
  spinner.setSpinnerString(14);
  spinner.start();
  await filterPauperFromBulk();
  spinner.stop();
  console.log('\ninfo: Finished sanitize...');
};

export { savePauperToBulk };
