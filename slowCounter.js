import { E, Far } from "@endo/far";

export const endow = (outbox) => {
  const slowCounter = E(outbox).request("please give me a counter", "counter");
  return Far("Doubler", {
    async incr() {
      const n = await E(slowCounter).incr();
      return n * 2;
    },
    async decr() {
      const n = await E(slowCounter).decr();
      return n / 2;
    },
  });
};
