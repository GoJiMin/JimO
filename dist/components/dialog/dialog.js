import { on, qs } from "../../utils/helper.js";
import { BaseComponent } from "../component.js";
export class InputDialog extends BaseComponent {
    constructor() {
        super(`
        <section class="dialog">
          <div class="dialog__backdrop"></div>
          <div class="dialog__container">
            <button class="close">&times;</button>
            <form class="dialog__form" id="dialog__form"></form>
            <button class="dialog__submit" form="dialog__form">ADD</button>
          </div>
        </section>
      `);
        this.closeBtn = qs(".close", this.element);
        this.backDrop = qs(".dialog__backdrop", this.element);
        this.formElement = qs(".dialog__form", this.element);
        this.bindEvents();
    }
    bindEvents() {
        const closeHandler = () => this.closeListener && this.closeListener();
        on(this.closeBtn, "click", closeHandler);
        on(this.backDrop, "click", closeHandler);
        on(this.formElement, "submit", (event) => this.handleSubmit(event));
    }
    addChild(child) {
        child.attachTo(this.formElement, "beforeend");
    }
    handleSubmit(event) {
        event.preventDefault();
        this.submitListener && this.submitListener();
    }
    setOnCloseListener(listener) {
        this.closeListener = listener;
    }
    setOnSubmitListener(listener) {
        this.submitListener = listener;
    }
}
