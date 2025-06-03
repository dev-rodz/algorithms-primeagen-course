type Node<T> = {
    value: T;
    prev?: Node<T>;
};

export default class Stack<T> {
    public length: number;
    private head?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
    }

    push(item: T): void {
        const newNode: Node<T> = {
            value: item,
        };

        this.length++;

        if (!this.head) {
            this.head = newNode;
            this.head.prev = newNode;
            return;
        }

        const currentHead = this.head;

        this.head = newNode;
        this.head.prev = currentHead;
    }

    pop(): T | undefined {
        if (!this.head) {
            return undefined;
        }

        this.length = Math.max(0, this.length - 1);

        const currentHead = this.head;

        if (this.length === 0) {
            this.head = undefined;
            return currentHead?.value;
        }

        this.head = this.head.prev;

        return currentHead?.value;
    }

    peek(): T | undefined {
        return this.head?.value;
    }
}
