class Node<T> {
    public value: T;
    public next: Node<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}
export default class SinglyLinkedList<T> {
    public length: number;
    private head: Node<T> | null = null;
    private tail: Node<T> | null = null;

    constructor() {
        this.length = 0;
    }

    public isEmpty(): boolean {
        return this.length === 0;
    }

    public getHead(): Node<T> | null {
        return this.head;
    }

    public getTail(): Node<T> | null {
        return this.tail;
    }

    prepend(item: T): void {
        const newNode = new Node(item);

        if (this.isEmpty()) {
            // If the list is empty, set both head and tail to the new node
            this.head = newNode;
            this.tail = newNode;
        } else {
            // If the list is not empty, set the new node's next to the current head
            newNode.next = this.head;
            this.head = newNode;
        }

        this.length++;
    }

    insertAt(item: T, idx: number): void {
        if (idx < 0 || idx > this.length) {
            throw new Error("Index out of bounds");
        }

        const newNode = new Node(item);

        if (idx === 0) {
            // If inserting at the head, prepend the item
            this.prepend(item);
            return;
        }

        // If inserting at a position other than the head
        let current = this.head;

        // Traverse to the node just before the index
        for (let i = 0; i < idx - 1; i++) {
            if (current) {
                // Move to the next node
                current = current.next;
            }
        }

        if (current) {
            // Insert the new node after the current node
            newNode.next = current.next;
            // Update the current node's next to point to the new node
            current.next = newNode;
        } else {
            // If current is null, it means we are trying to insert at the end
            this.tail = newNode;
        }

        this.length++;
    }

    append(item: T): void {
        const newNode = new Node(item);

        if (this.isEmpty()) {
            // If the list is empty, set both head and tail to the new node
            this.head = newNode;
            this.tail = newNode;
        } else {
            if (this.tail) {
                // If the list is not empty, set the current tail's next to the new node
                this.tail.next = newNode;
            }

            // Update the tail to be the new node
            this.tail = newNode;
        }

        this.length++;
    }

    remove(item: T): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }

        let current = this.head;
        let previous: Node<T> | null = null;

        while (current) {
            if (current.value === item) {
                // If the item is found, remove it
                if (previous) {
                    // If it's not the head, update the previous node's next
                    previous.next = current.next;
                } else {
                    // If it is the head, update the head
                    this.head = current.next;
                }

                if (current === this.tail) {
                    // If it is the tail, update the tail
                    this.tail = previous;
                }

                this.length--;
                return current.value;
            }

            // Move to the next node
            previous = current;
            current = current.next;
        }

        // If the item was not found, return undefined
        return undefined;
    }

    get(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            return undefined;
        }

        if (this.isEmpty()) {
            return undefined;
        }

        // Start from the head and traverse to the index
        let current = this.head;

        for (let i = 0; i < idx; i++) {
            // If current is null, it means the index is out of bounds
            if (current) {
                // Move to the next node
                current = current.next;
            }
        }

        return current ? current.value : undefined;
    }

    indexOf(item: T): number {
        let current = this.head;
        let index = 0;

        while (current) {
            // If the current node's value matches the item, return the index
            if (current.value === item) {
                return index;
            }
            current = current.next;
            index++;
        }

        return -1; // Item not found
    }

    removeAt(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            return undefined;
        }

        if (this.isEmpty()) {
            return undefined;
        }

        // If the index is 0, remove the head
        if (idx === 0) {
            const removedValue = this.head?.value;
            this.head = this.head?.next || null;

            if (this.length === 1) {
                this.tail = null; // If it was the only node, set tail to null
            }

            this.length--;
            return removedValue;
        }

        let current = this.head;
        let previous: Node<T> | null = null;

        // Traverse to the node just before the index
        for (let i = 0; i < idx; i++) {
            if (current) {
                // Move to the next node
                previous = current;
                current = current.next;
            }
        }

        if (!current) {
            return undefined;
        }

        // If we found the node to remove, update the previous node's next
        if (previous) {
            previous.next = current.next;
        }

        // If the current node is the tail, update the tail
        if (current === this.tail) {
            this.tail = previous;
        }

        this.length--;
        return current.value;
    }
}
