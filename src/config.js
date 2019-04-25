import dotenv from 'dotenv';

dotenv.config();

const environment = ['PORT'];

environment.forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`${name}: ${process.env[name]}`);
  }
});

export default {
  BASE_URL: 'https://api.scryfall.com',
  PORT: process.env.PORT
};
