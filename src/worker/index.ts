import { EmailWorker } from "@/worker/worker/email.worker";
import { EmailCron } from "./cron/email.cron";
const main = () => {
  EmailWorker();
  EmailCron();
};

main();
