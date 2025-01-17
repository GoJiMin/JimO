import { focusInput, on, qs, qsAll } from "../../../utils/helper.js";
import { BaseComponent } from "../../component.js";
export class TodoSectionInput extends BaseComponent {
    constructor() {
        super(`
       <div class="input__section">
         <p class="input__title">Add To-Do</p>
         <label>
           Title
           <input type="text" placeholder="please enter a title..." name="title" autofocus />
         </label>
         <ul class="todo__inputContainer">
           <li class="todo__inputItem">
             <input type="text" placeholder="please enter something to-do..." />
             <button type="button" class="todo-remove">🗑</button>
           </li>
         </ul>
         <button type="button" class="todo-add">+</button>
       </div>
    `);
        this.todoList = qs(".todo__inputContainer", this.element);
        this.addBtn = qs(".todo-add", this.element);
        this.bindEvents();
    }
    bindEvents() {
        focusInput(this.element);
        on(this.addBtn, "click", () => {
            this.createTask();
        });
    }
    createTask() {
        const newItem = document.createElement("template");
        newItem.innerHTML = `
      <li class="todo__inputItem">
        <input type="text" placeholder="please enter something to-do..." />
        <button type="button" class="todo-remove">🗑</button>
      </li>
    `;
        const element = newItem.content.firstElementChild;
        focusInput(element, "input");
        on(qs(".todo-remove", element), "click", () => element.remove());
        this.todoList.insertAdjacentElement("beforeend", element);
    }
    get title() {
        const element = qs("[name=title]", this.element);
        return element.value;
    }
    get tasks() {
        const tasks = qsAll(".todo__inputItem input", this.todoList);
        return tasks.map((input) => input.value).filter(Boolean);
    }
    validate() {
        if (!this.title.trim()) {
            return { status: "error", reason: "제목을 입력해주세요." };
        }
        if (this.tasks.length === 0) {
            return { status: "error", reason: "리스트를 입력해주세요." };
        }
        return { status: "success" };
    }
}
