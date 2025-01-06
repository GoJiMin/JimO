import { on, qs } from "../../utils/helper.js";
import { BaseComponent, Component } from "../component.js";

export interface Composable {
  addChild(child: Component): void;
}

class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements Composable
{
  private removeButton: HTMLButtonElement;

  constructor() {
    super(
      `
      <li class="page-item">
        <section class="page-item__body"></section>
        <div class="page-item__controls">
          <button class="close">X</button>
        </div>
      </li>
    `
    );

    this.removeButton = qs<HTMLButtonElement>(".close", this.element);

    this.bindEvents();
  }

  bindEvents() {
    on<HTMLButtonElement>(this.removeButton, "click", () => this.remove());
  }

  addChild(child: Component): void {
    const container = qs<HTMLElement>(".page-item__body", this.element);
    child.attachTo(container, "beforeend");
  }

  remove() {
    this.element.remove();
  }
}

export class PageComponent
  extends BaseComponent<HTMLUListElement>
  implements Composable
{
  constructor() {
    super(`<ul class="page"></ul>`);
  }

  addChild(child: Component): void {
    const item = new PageItemComponent();
    item.addChild(child);
    item.attachTo(this.element, "beforeend");
  }
}
