export const delay = (
  ms: number = 100,
  status: "res" | "rej" | "random" = "res"
): Promise<string> => {
  return new Promise((res, reject) => {
    setTimeout(() => {
      if (status === "res") res("Success");
      if (status === "rej") reject("Oops!!!");
      if (Math.random() > 0.5) {
        res("Success");
      } else {
        reject("Oops!!!");
      }
    }, ms);
  });
};
