import { qs } from "../../../utils/helper.js";
import { BaseComponent } from "../../component.js";

export class MediaSectionInput extends BaseComponent<HTMLDivElement> {
  constructor() {
    super(`
       <div>
         <label>
           Title
           <input type="text" name="title" />
         </label>
         <label>
           Url
           <input type="text" name="url" />
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

  get url() {
    const element = qs<HTMLInputElement>("[name=url]", this.element);

    return element.value;
  }
}
