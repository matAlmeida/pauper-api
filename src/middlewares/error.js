/* eslint no-unused-vars: 0 */

export const catchAll = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something broke!';

  res.status(status).json({ error: { message } });
};

export const notFound = (req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;

  next(error);
};
