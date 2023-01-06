import { asyncFn } from "./example";

describe("비동기 테스트", () => {
  test("done", (done) => {
    asyncFn().then((res) => {
      expect(res).toBe("Done!");
      done();
    });
  });

  test("then", () => {
    return asyncFn().then((res) => {
      expect(res).toBe("Done!");
    });
  });

  test("resolves", () => {
    return expect(asyncFn()).resolves.toBe("Done!");
  });
});
