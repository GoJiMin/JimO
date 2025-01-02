import { qs } from "../../utils/helper.js";
import { BaseComponent } from "../component.js";

export class TodoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, list: string[]) {
    super(
      `
       <section class="todo">
         <h2 class="todo__title"></h2>
       </section>
      `
    );

    const titleElement = qs<HTMLHeadElement>(".todo__title", this.element);
    titleElement.textContent = title;

    const listTemplate = new Template();

    this.element.insertAdjacentHTML("beforeend", listTemplate.getList(list));
  }
}

class Template {
  getList(list: string[]) {
    const timestamp = Date.now();

    return `
      <ul class="todo__list">
        ${list
          .map((item, idx) => this._getItem(item, idx, timestamp).outerHTML)
          .join("")}
      </ul>
    `;
  }

  private _getItem(item: string, idx: number, timestamp: number) {
    const uniqueId = `todo-${timestamp}-${idx}`;

    const itemTemplate = document.createElement("template");

    itemTemplate.innerHTML = `
      <li class="todo__item">
        <input id=${uniqueId} class="todo-checkbox" type="checkbox" />
        <label for=${uniqueId} class="todo-label"></label>
      </li>
    `;

    const element = itemTemplate.content.firstElementChild! as HTMLLIElement;
    const labelElement = qs<HTMLLabelElement>(".todo-label", element);

    labelElement.textContent = item;

    return element;
  }
}
