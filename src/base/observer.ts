export class Observer {
  private callbacks: ((...args: any[]) => void)[];

  constructor() {
    this.callbacks = [];
  }

  public observe(fn: (...args: any[]) => void): void {
    this.callbacks.push(fn);
  }

  public unobserve(fn: (...args: any[]) => void): void {
    this.callbacks = this.callbacks.filter((callback: () => void) => callback !== fn);
  }

  public broadcast(...args: any[]): void {
    this.callbacks.forEach((a) => a(...args));
  }
}
