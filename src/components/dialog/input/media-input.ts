import { focusInput, qs } from "../../../utils/helper.js";
import { BaseComponent } from "../../component.js";
import { MediaData, ValidateState } from "../dialog.js";

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

    this.bindEvents();
  }

  private bindEvents() {
    focusInput(this.element);
  }

  get title() {
    const element = qs<HTMLInputElement>("[name=title]", this.element);

    return element.value;
  }

  get url() {
    const element = qs<HTMLInputElement>("[name=url]", this.element);

    return element.value;
  }

  validate(): ValidateState {
    if (!this.title.trim()) {
      return { status: "error", reason: "제목을 입력해주세요." };
    }

    if (!this.url.trim()) {
      return { status: "error", reason: "URL을 입력해주세요." };
    }

    return { status: "success" };
  }
}
