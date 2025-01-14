import { focusInput, on, qs } from "../../../utils/helper.js";
import { BaseComponent } from "../../component.js";
import { MediaData } from "../dialog.js";

export class ImageSectionInput
  extends BaseComponent<HTMLDivElement>
  implements MediaData
{
  private fileInput: HTMLInputElement;
  private imageSelector: HTMLLabelElement;
  private previewImage: HTMLImageElement;
  private imageFile?: File;
  private fileURL?: string;

  constructor() {
    super(`
       <div class="input__section">
         <p class="input__title">Add Image</p>
         <label>
           Title
           <input type="text" placeholder="please enter a title..." name="title" />
         </label>
         <label class="image-selector">
           Select a picture..
           <input type="file" accept="image/*" name="file" style="display: none" id="file" />
         </label>
         <label for="file">
           <img class="image-preview" style="display: none;" />
         </label>
       </div>
    `);

    this.fileInput = qs<HTMLInputElement>("[name=file]", this.element);
    this.imageSelector = qs<HTMLLabelElement>(".image-selector", this.element);
    this.previewImage = qs<HTMLImageElement>(".image-preview", this.element);

    this.bindEvents();
  }

  bindEvents() {
    focusInput(this.element);

    on<HTMLInputElement, InputEvent>(this.fileInput, "change", () => {
      this.imageFile = this.fileInput.files?.[0];

      this.updatePreview();
    });
  }

  private updatePreview() {
    if (this.imageFile) {
      if (this.fileURL) {
        URL.revokeObjectURL(this.fileURL);
      }

      this.fileURL = URL.createObjectURL(this.imageFile);

      this.previewImage.src = this.fileURL;
      this.previewImage.style.display = "block";
      this.imageSelector.style.display = "none";
    } else {
      this.imageSelector.style.display = "block";
      this.previewImage.style.display = "none";
    }
  }

  get title() {
    const element = qs<HTMLInputElement>("[name=title]", this.element);

    return element.value;
  }

  get url() {
    return this.fileURL || "";
  }
}
