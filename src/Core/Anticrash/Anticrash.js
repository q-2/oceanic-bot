export class Anticrash {
  start() {
    process.on("uncaughtException", () => {
      return;
    });
    process.on("uncaughtExceptionMonitor", () => {
      return;
    });
    process.on("multipleResolves", () => {
      return;
    });
    process.on("unhandledRejection", (r, p) => {
      console.log(r, p);
    });
  }
}
