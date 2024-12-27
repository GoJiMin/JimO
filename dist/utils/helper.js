export function qs(selector, scope = document) {
    const element = scope.querySelector(selector);
    if (!element)
        throw new Error(`Element not found in ${selector}`);
    return element;
}
