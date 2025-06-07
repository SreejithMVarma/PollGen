import pino from "pino";

const logger = pino({
  level: "info",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard", 
      ignore: "pid,hostname",
    },
  },
});

export default logger;
