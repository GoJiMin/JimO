export function qs<T extends HTMLElement>(
  selector: string,
  scope: Document | HTMLElement = document
): T {
  const element = scope.querySelector<T>(selector);

  if (!element) throw new Error(`Element not found in ${selector}`);

  return element;
}
