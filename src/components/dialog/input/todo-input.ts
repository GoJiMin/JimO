import { focusInput, on, qs, qsAll } from "../../../utils/helper.js";
import { BaseComponent } from "../../component.js";
import { TextData, ValidateState } from "../dialog.js";

export class TodoSectionInput
  extends BaseComponent<HTMLDivElement>
  implements TextData
{
  private todoList: HTMLUListElement;
  private addBtn: HTMLButtonElement;

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

    this.todoList = qs<HTMLUListElement>(".todo__inputContainer", this.element);
    this.addBtn = qs<HTMLButtonElement>(".todo-add", this.element);

    this.bindEvents();
  }

  private bindEvents() {
    focusInput(this.element);

    on<HTMLButtonElement, MouseEvent>(this.addBtn, "click", () => {
      this.createTask();
    });
  }

  private createTask() {
    const newItem = document.createElement("template");

    newItem.innerHTML = `
      <li class="todo__inputItem">
        <input type="text" placeholder="please enter something to-do..." />
        <button type="button" class="todo-remove">🗑</button>
      </li>
    `;

    const element = newItem.content.firstElementChild as HTMLLIElement;

    focusInput(element, "input");

    on<HTMLButtonElement, MouseEvent>(
      qs<HTMLButtonElement>(".todo-remove", element),
      "click",
      () => element.remove()
    );

    this.todoList.insertAdjacentElement("beforeend", element);
  }

  get title() {
    const element = qs<HTMLInputElement>("[name=title]", this.element);

    return element.value;
  }

  get tasks() {
    const tasks = qsAll<HTMLInputElement>(
      ".todo__inputItem input",
      this.todoList
    );

    return tasks.map((input) => input.value).filter(Boolean);
  }

  validate(): ValidateState {
    if (!this.title.trim()) {
      return { status: "error", reason: "제목을 입력해주세요." };
    }

    if (this.tasks.length === 0) {
      return { status: "error", reason: "리스트를 입력해주세요." };
    }

    return { status: "success" };
  }
}
