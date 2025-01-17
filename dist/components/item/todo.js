import { qs } from "../../utils/helper.js";
import { BaseComponent } from "../component.js";
export class TodoComponent extends BaseComponent {
    constructor(title, list) {
        super(`
       <section class="todo">
         <h2 class="todo__title"></h2>
       </section>
      `);
        const titleElement = qs(".todo__title", this.element);
        titleElement.textContent = title;
        const listTemplate = new Template();
        this.element.insertAdjacentHTML("beforeend", listTemplate.getList(list));
    }
}
class Template {
    getList(list) {
        const timestamp = Date.now();
        return `
      <ul class="todo__list">
        ${list
            .map((item, idx) => this._getItem(item, idx, timestamp).outerHTML)
            .join("")}
      </ul>
    `;
    }
    _getItem(item, idx, timestamp) {
        const uniqueId = `todo-${timestamp}-${idx}`;
        const itemTemplate = document.createElement("template");
        itemTemplate.innerHTML = `
      <li class="todo__item">
        <input id=${uniqueId} class="todo-checkbox" type="checkbox" />
        <label for=${uniqueId} class="todo-label"></label>
      </li>
    `;
        const element = itemTemplate.content.firstElementChild;
        const labelElement = qs(".todo-label", element);
        labelElement.textContent = item;
        return element;
    }
}
