import winston from 'winston';

const { combine, timestamp, prettyPrint, colorize, json } = winston.format;

export const logger = winston.createLogger({
  format: combine(
    colorize(),
    timestamp(),
    json()
  ),
  transports: [
    // new winston.transports.Console({
    //   level: 'error'
    // }),
    new winston.transports.Console({
      level: 'info'
    })
  ],
});
