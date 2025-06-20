import { StatsD } from "node-statsd";

export const metrics = new StatsD({
  host: process.env.STATSD_HOST ?? "127.0.0.1",
  port: Number(process.env.STATSD_PORT) || 8125,
  prefix: "etl.",    // o "ayida.etl." si prefieres
}); 