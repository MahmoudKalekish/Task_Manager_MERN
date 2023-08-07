import express from 'express';

const errorMiddleware: express.ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
};

export default errorMiddleware;
