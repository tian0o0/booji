/**
 * 队列节点
 * @public
 */
export class QueueNode<T = any> {
  val: T;
  next: QueueNode<T> | null;
  constructor(val: T) {
    this.val = val;
    this.next = null;
  }
}

/**
 * 链表队列
 * @public
 */
export class Queue<T> {
  head: QueueNode<T> | null;
  tail: QueueNode<T> | null;
  size: number;
  maxSize: number;
  constructor(size: number) {
    this.head = null;
    this.tail = null;
    this.size = 0;
    this.maxSize = size;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  peak(): QueueNode<T> | null {
    return this.tail;
  }

  clear(): void {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  enqueue(item: T): void {
    if (this.size >= this.maxSize) return;

    // 新建节点
    const node = new QueueNode(item);

    // 入列其实就是改变Queue类的3个属性，如果队列为空时head即为新节点
    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail && (this.tail.next = node);
      this.tail = node;
    }
    this.size++;
  }

  dequeue(): QueueNode<T> | null {
    if (this.isEmpty()) return null;
    const nodeToBeRemoved = this.head;

    if (this.head === this.tail) {
      this.tail = null;
    }

    this.head = this.head ? this.head.next : null;
    this.size--;
    return nodeToBeRemoved;
  }
}

export function linkedList2array(head: QueueNode | null) {
  if (!head) {
    return [];
  }

  let result = [];

  while (head) {
    result.push(head.val);
    head = head.next;
  }

  return result;
}
