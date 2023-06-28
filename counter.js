import { Far } from "@endo/far";

export const endow = () => {
  let counter = 0;
  return Far("Counter", {
    incr() {
      counter += 1;
      return counter;
    },
    decr() {
      counter -= 1;
      return counter;
    },
  });
};
