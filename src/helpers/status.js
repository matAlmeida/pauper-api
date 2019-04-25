export const success = (res, result) => res.send(result).status(200);
export const internalError = (res, err) =>
  res.send({ errorMessage: `${err}` }).status(500);
export const badRequest = (res, errorMessage = 'Bad Request') =>
  res.status(400).send({ message: errorMessage });
