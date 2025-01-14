import { focus, qs } from "../../../utils/helper.js";
import { BaseComponent } from "../../component.js";
import { TextData } from "../dialog.js";

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
    focus("[name=title]", this.element);
  }

  get title() {
    const element = qs<HTMLInputElement>("[name=title]", this.element);

    return element.value;
  }

  get body() {
    const element = qs<HTMLTextAreaElement>("[name=body]", this.element);

    return element.value;
  }
}
