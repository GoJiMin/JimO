import { on, qs } from "../../utils/helper.js";
import { BaseComponent, Component } from "../component.js";
import { Composable } from "../page/page.js";

type OnCloseListener = () => void;
type OnSubmitListener = () => void;

export class InputDialog
  extends BaseComponent<HTMLElement>
  implements Composable
{
  private closeBtn: HTMLButtonElement;
  private addBtn: HTMLButtonElement;
  private backDrop: HTMLDivElement;

  private closeListener?: OnCloseListener;
  private submitListener?: OnSubmitListener;

  constructor() {
    super(
      `
        <section class="dialog">
          <div class="dialog__backdrop"></div>
          <div class="dialog__container">
            <button class="close">X</button>
            <div class="dialog__body"></div>
            <button class="dialog__submit">추가</button>
          </div>
        </section>
      `
    );

    this.closeBtn = qs<HTMLButtonElement>(".close", this.element);
    this.addBtn = qs<HTMLButtonElement>(".dialog__submit", this.element);
    this.backDrop = qs<HTMLDivElement>(".dialog__backdrop", this.element);

    this.bindEvents();
  }

  private bindEvents() {
    on<HTMLButtonElement>(this.closeBtn, "click", () => {
      this.closeListener && this.closeListener();
    });

    on<HTMLButtonElement>(this.addBtn, "click", () => {
      this.submitListener && this.submitListener();
    });

    on<HTMLDivElement>(this.backDrop, "click", () => {
      this.closeListener && this.closeListener();
    });
  }

  addChild(child: Component): void {
    const body = qs<HTMLDivElement>(".dialog__body", this.element);

    child.attachTo(body, "beforeend");
  }

  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }

  setOnSubmitListener(listener: OnSubmitListener) {
    this.submitListener = listener;
  }
}
