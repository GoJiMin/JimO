export function qs<T extends HTMLElement>(
  selector: string,
  scope: Document | HTMLElement = document
): T {
  const element = scope.querySelector<T>(selector);

  if (!element) throw new Error(`Element not found in ${selector}`);

  return element;
}

export function on<T extends HTMLElement>(
  target: T,
  eventName: keyof GlobalEventHandlersEventMap & keyof T,
  handler: () => void
) {
  target.addEventListener(eventName, handler);
}
