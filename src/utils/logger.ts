import logger from "pino";
import dayjs from "dayjs";
import pinoPretty from "pino-pretty";

const log = logger({
  prettifier: pinoPretty,
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;
