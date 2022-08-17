import { Queue, QueueNode, linkedList2array } from "..";

describe("queue", () => {
  it("should init correctly", () => {
    const queue = new Queue(10);
    expect(queue.head).toBe(null);
    expect(queue.tail).toBe(null);
    expect(queue.size).toBe(0);
    expect(queue.maxSize).toBe(10);
    expect(queue.isEmpty()).toBe(true);
  });

  it("should enqueue correctly", () => {
    const queue = new Queue<string>(2);
    const node = new QueueNode("a");
    const node2 = new QueueNode("a2");

    queue.enqueue("a");
    expect(queue.head).toStrictEqual(node);
    expect(queue.tail).toStrictEqual(node);
    expect(queue.size).toBe(1);
    expect(queue.maxSize).toBe(2);
    expect(queue.isEmpty()).toBe(false);
    expect(queue.peak()).toStrictEqual(node);

    queue.enqueue("a2");
    expect(queue.head!.val).toBe("a");
    expect(queue.head!.next).toStrictEqual(node2);
    expect(queue.tail).toStrictEqual(node2);
    expect(queue.size).toBe(2);
    expect(queue.maxSize).toBe(2);
    expect(queue.isEmpty()).toBe(false);
    expect(queue.peak()).toStrictEqual(node2);

    queue.enqueue("a3");
    expect(queue.head!.val).toBe("a");
    expect(queue.head!.next).toStrictEqual(node2);
    expect(queue.tail).toStrictEqual(node2);
    expect(queue.size).toBe(2);
    expect(queue.maxSize).toBe(2);
    expect(queue.isEmpty()).toBe(false);
    expect(queue.peak()).toStrictEqual(node2);
  });

  it("should dequeue correctly", () => {
    const queue = new Queue(10);
    const node = new QueueNode("a");
    queue.enqueue(node);
    const deletedQueue = queue.dequeue();

    expect(deletedQueue!.val).toStrictEqual(node);
    expect(queue.head).toBe(null);
    expect(queue.tail).toBe(null);
    expect(queue.size).toBe(0);
    expect(queue.maxSize).toBe(10);
    expect(queue.isEmpty()).toBe(true);

    const deletedQueue2 = queue.dequeue();
    expect(deletedQueue2).toBe(null);
  });

  it("should clear correctly", () => {
    const queue = new Queue(10);
    const node = new QueueNode("a");
    queue.enqueue(node);
    queue.clear();
    expect(queue.head).toBe(null);
    expect(queue.tail).toBe(null);
    expect(queue.size).toBe(0);
    expect(queue.maxSize).toBe(10);
    expect(queue.isEmpty()).toBe(true);
  });

  it("should linkedList2array work correctly", () => {
    const queue = new Queue(10);
    queue.enqueue("a");
    queue.enqueue("b");
    queue.enqueue("c");
    const array = linkedList2array(queue.head);
    expect(array).toStrictEqual(["a", "b", "c"]);
  });

  it("should linkedList2array work correctly when head is null", () => {
    const queue = new Queue(10);
    const array = linkedList2array(queue.head);
    expect(array).toStrictEqual([]);
  });
});
