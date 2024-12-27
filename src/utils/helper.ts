export function qs(
  selector: string,
  scope: Document | HTMLElement = document
): HTMLElement {
  const element = scope.querySelector<HTMLElement>(selector);

  if (!element) throw new Error(`Element not found in ${selector}`);

  return element;
}
