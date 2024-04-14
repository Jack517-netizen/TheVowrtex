export class Stack<T> {
  private items: T[]

  constructor() {
    this.items = []
  }

  push(item: T): void {
    this.items.push(item)
  }

  pop(): T | undefined {
    return this.items.pop()
  }

  // Undefined return removed
  // because the Home state is safely always initialized
  peek(): T {
    return this.items[this.items.length - 1]
  }

  isEmpty(): boolean {
    return this.items.length === 0
  }

  size(): number {
    return this.items.length
  }

  clear() {
    return (this.items = [])
  }
}
