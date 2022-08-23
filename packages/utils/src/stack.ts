/**
 * 栈
 * @public
 */
export class Stack<T> {
  stacks: T[];
  maxSize: number;
  constructor(size: number) {
    this.stacks = [];
    this.maxSize = size;
  }

  get size(): number {
    return this.stacks.length;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  peak(): T | undefined {
    return this.stacks[this.size - 1];
  }

  clear(): void {
    this.stacks = [];
  }

  push(item: T): void {
    if (this.size >= this.maxSize) return;
    this.stacks.push(item);
  }

  pop(): T | undefined {
    return this.stacks.pop();
  }
}
