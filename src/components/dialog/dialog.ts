import { on, qs } from "../../utils/helper.js";
import { BaseComponent, Component } from "../component.js";
import { Composable } from "../page/page.js";

type OnCloseListener = () => void;
type OnSubmitListener = () => void;

export interface MediaData {
  title: string;
  url: string;
}

export interface TextData {
  title: string;
  body: string;
}

export class InputDialog
  extends BaseComponent<HTMLElement>
  implements Composable
{
  private closeBtn: HTMLButtonElement;
  private backDrop: HTMLDivElement;
  private formElement: HTMLFormElement;

  private closeListener?: OnCloseListener;
  private submitListener?: OnSubmitListener;

  constructor() {
    super(
      `
        <section class="dialog">
          <div class="dialog__backdrop"></div>
          <div class="dialog__container">
            <button class="close">X</button>
            <form class="dialog__form" id="dialog__form"></form>
            <button class="dialog__submit" form="dialog__form">추가</button>
          </div>
        </section>
      `
    );

    this.closeBtn = qs<HTMLButtonElement>(".close", this.element);
    this.backDrop = qs<HTMLDivElement>(".dialog__backdrop", this.element);
    this.formElement = qs<HTMLFormElement>(".dialog__form", this.element);

    this.bindEvents();
  }

  private bindEvents() {
    const closeHandler = () => this.closeListener && this.closeListener();

    on<HTMLButtonElement, MouseEvent>(this.closeBtn, "click", closeHandler);
    on<HTMLDivElement, MouseEvent>(this.backDrop, "click", closeHandler);

    on<HTMLFormElement, SubmitEvent>(this.formElement, "submit", (event) =>
      this.handleSubmit(event)
    );
  }

  addChild(child: Component): void {
    child.attachTo(this.formElement, "beforeend");
  }

  private handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    this.submitListener && this.submitListener();
  }

  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }

  setOnSubmitListener(listener: OnSubmitListener) {
    this.submitListener = listener;
  }
}
