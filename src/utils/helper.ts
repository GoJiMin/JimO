export function qs<T extends HTMLElement>(
  selector: string,
  scope: Document | HTMLElement = document
): T {
  const element = scope.querySelector<T>(selector);

  if (!element) throw new Error(`Element not found in ${selector}`);

  return element;
}

export function on<T extends HTMLElement, E extends Event>(
  target: T,
  eventName: keyof GlobalEventHandlersEventMap & keyof T,
  handler: (this: T, ev: E) => void
) {
  const listener: EventListener = (event) => handler.call(target, event as E);

  target.addEventListener(eventName, listener);
}
