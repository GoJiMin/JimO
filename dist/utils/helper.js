export function qs(selector, scope = document) {
    const element = scope.querySelector(selector);
    if (!element)
        throw new Error(`Element not found in ${selector}`);
    return element;
}
export function qsAll(selector, scope = document) {
    const elements = scope.querySelectorAll(selector);
    if (elements.length === 0)
        throw new Error(`Elements not found in ${selector}`);
    return Array.from(elements);
}
export function on(target, eventName, handler) {
    const listener = (event) => handler.call(target, event);
    target.addEventListener(eventName, listener);
}
export function focusInput(parent, selector = "[name=title]") {
    requestAnimationFrame(() => {
        const input = qs(selector, parent);
        input.focus();
    });
}
