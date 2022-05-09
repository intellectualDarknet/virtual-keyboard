import { Observer } from './observer';

export class Watcher {
  public observer: Observer;

  public fn: (...args: any[]) => void;

  constructor(observer: Observer, fn: (...args: any[]) => void) {
    this.observer = observer;
    this.fn = fn;
  }

  public observe(): void {
    this.observer.observe(this.fn);
  }

  public unobserve(): void {
    this.observer.unobserve(this.fn);
  }

  public static createAndObserve(observer: Observer, fn: (...args: any[]) => void): Watcher {
    const instance: Watcher = new Watcher(observer, fn);
    instance.observer.observe(instance.fn);
    return instance;
  }
}
