import { focusInput, qs } from "../../../utils/helper.js";
import { BaseComponent } from "../../component.js";
import { TextData, ValidateState } from "../dialog.js";

export class TextSectionInput
  extends BaseComponent<HTMLDivElement>
  implements TextData
{
  constructor() {
    super(`
       <div class="input__section">
         <p class="input__title">Add Note</p>
         <label>
           Title
           <input type="text" name="title" placeholder="please enter a title..." autofocus />
         </label>
         <label>
           Content
           <input type="text" placeholder="please enter the contents..." name="body" />
         </label>
       </div>
    `);

    this.bindEvents();
  }

  private bindEvents() {
    focusInput(this.element);
  }

  get title() {
    const element = qs<HTMLInputElement>("[name=title]", this.element);

    return element.value;
  }

  get body() {
    const element = qs<HTMLTextAreaElement>("[name=body]", this.element);

    return element.value;
  }

  validate(): ValidateState {
    if (!this.title.trim()) {
      return { status: "error", reason: "제목을 입력해주세요." };
    }

    if (!this.body.trim()) {
      return { status: "error", reason: "내용을 입력해주세요." };
    }

    return { status: "success" };
  }
}
