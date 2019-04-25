import express from 'express';
import request from 'request';

import config from '~/config';
import { success, internalError } from '~/helpers/status';

const cards = express.Router();

cards.get('/', (req, res) => {
  const { page } = req.query;
  const query = page ? `?page=${query}` : '';

  request.get(`${config.BASE_URL}/cards${query}`, (error, r, body) => {
    if (error) {
      internalError(res, { error });
    }
    const { data, has_more, object, next_page } = JSON.parse(body);
    const cards = data;

    const pauperCards = cards.filter(({ legalities }) => {
      return legalities.pauper === 'legal';
    });

    success(res, {
      data: {
        object,
        has_more,
        next_page: next_page.split('=')[1],
        cards: pauperCards
      }
    });
  });
});

cards.get('/:name', (req, res) => {
  const { name } = req.params;

  request.get(
    `${config.BASE_URL}/cards/named?fuzzy=${name}`,
    (error, r, body) => {
      if (error) {
        internalError(res, { error });
      }
      const parsedBody = JSON.parse(body);
      const pauperLegal = parsedBody.legalities.pauper === 'legal';

      success(res, {
        data: {
          pauper_legal: pauperLegal,
          card: parsedBody
        }
      });
    }
  );
});

cards.get('/autocomplete/:q', (req, res) => {
  const { q } = req.params;

  request.get(
    `${config.BASE_URL}/cards/autocomplete?q=${q}`,
    (error, r, body) => {
      if (error) {
        internalError(res, { error });
      }
      const parsedBody = JSON.parse(body);

      success(res, {
        data: parsedBody.data
      });
    }
  );
});

export default cards;
