export function asyncFn() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Done!");
    }, 2000);
  });
}
