import { focusInput, on, qs } from "../../../utils/helper.js";
import { BaseComponent } from "../../component.js";
export class ImageSectionInput extends BaseComponent {
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
        this.fileInput = qs("[name=file]", this.element);
        this.imageSelector = qs(".image-selector", this.element);
        this.previewImage = qs(".image-preview", this.element);
        this.bindEvents();
    }
    bindEvents() {
        focusInput(this.element);
        on(this.fileInput, "change", () => {
            var _a;
            this.imageFile = (_a = this.fileInput.files) === null || _a === void 0 ? void 0 : _a[0];
            this.updatePreview();
        });
    }
    updatePreview() {
        if (this.imageFile) {
            if (this.fileURL) {
                URL.revokeObjectURL(this.fileURL);
            }
            this.fileURL = URL.createObjectURL(this.imageFile);
            this.previewImage.src = this.fileURL;
            this.previewImage.style.display = "block";
            this.imageSelector.style.display = "none";
        }
        else {
            this.imageSelector.style.display = "block";
            this.previewImage.style.display = "none";
        }
    }
    get title() {
        const element = qs("[name=title]", this.element);
        return element.value;
    }
    get url() {
        return this.fileURL || "";
    }
    validate() {
        if (!this.title.trim()) {
            return { status: "error", reason: "제목을 입력해주세요." };
        }
        if (!this.url.trim()) {
            return { status: "error", reason: "이미지를 선택해주세요." };
        }
        return { status: "success" };
    }
}
