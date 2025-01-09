import { qs } from "../../../utils/helper.js";
import { BaseComponent } from "../../component.js";
import { TextData } from "../dialog.js";

export class TextSectionInput
  extends BaseComponent<HTMLDivElement>
  implements TextData
{
  constructor() {
    super(`
       <div>
         <label>
           Title
           <input type="text" name="title" autofocus />
         </label>
         <label>
           Body
           <input type="text" name="body" />
         </label>
       </div>
    `);

    requestAnimationFrame(() => {
      const titleInput = qs<HTMLInputElement>("[name=title]", this.element);
      titleInput.focus();
    });
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
