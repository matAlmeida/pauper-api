import dotenv from 'dotenv';

dotenv.config();

const environment = ['PORT'];

environment.forEach((name) => {
  if (!process.env[name]) {
    if (name === 'PORT') {
      process.env.PORT = 3000;
      return;
    }
    throw new Error(`${name}: ${process.env[name]}`);
  }
});

export default {
  BASE_URL: 'https://api.scryfall.com',
  PORT: process.env.PORT
};
