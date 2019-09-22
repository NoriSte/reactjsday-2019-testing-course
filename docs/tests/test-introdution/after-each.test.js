const sum = (a, b) => a + b;
const subtract = (a, b) => a - b;

describe("Math operations", () => {
  let i = 0;
  afterEach(() => {
    i++;
    console.log(`${i} tests run`);
  });
  test("Should sum", () => {
    expect(sum(3, 7)).toEqual(10);
  });
  test("Should subtract", () => {
    expect(subtract(7, 3)).toEqual(4);
  });
});
