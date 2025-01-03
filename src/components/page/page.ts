import { qs } from "../../utils/helper.js";
import { BaseComponent, Component } from "../component.js";

export interface Composable {
  addChild(child: Component): void;
}

class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements Composable
{
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
  }

  addChild(child: Component): void {
    const container = qs<HTMLElement>(".page-item__body", this.element);
    child.attachTo(container, "beforeend");
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
