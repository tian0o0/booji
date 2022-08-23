import { Stack } from "..";

describe("stack", () => {
  it("should `stack` works correctly", () => {
    const stack = new Stack<number>(2);

    stack.push(1);
    stack.push(2);
    stack.push(3);

    expect(stack.stacks).toStrictEqual([1, 2]);
    expect(stack.peak()).toBe(2);

    stack.pop();
    expect(stack.stacks).toStrictEqual([1]);

    stack.clear();
    expect(stack.stacks).toStrictEqual([]);
    expect(stack.isEmpty()).toBe(true);
  });
});
