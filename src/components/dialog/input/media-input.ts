import { qs } from "../../../utils/helper.js";
import { BaseComponent } from "../../component.js";
import { MediaData } from "../dialog.js";

export class MediaSectionInput
  extends BaseComponent<HTMLDivElement>
  implements MediaData
{
  constructor() {
    super(`
       <div class="input__section">
         <p class="input__title">Add Media</p>
         <label>
           Title
           <input type="text" placeholder="please enter a title..." name="title" />
         </label>
         <label>
           URL
           <input type="text" placeholder="please enter url..." name="url" />
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
