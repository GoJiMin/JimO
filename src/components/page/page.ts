import { on, qs } from "../../utils/helper.js";
import { BaseComponent, Component } from "../component.js";

export interface Composable {
  addChild(child: Component): void;
}

type OnCloseListener = () => void;
type DragState = "start" | "end" | "enter" | "leave";
type OnDragStateListener<T extends Component> = (
  target: T,
  state: DragState
) => void;

interface SectionContainer extends Component, Composable {
  setOnCloseListener(listener: OnCloseListener): void;
  setOnDragStateListener(listener: OnDragStateListener<SectionContainer>): void;
  muteChildren(state: "mute" | "unmute"): void;
  getBoundingRect(): DOMRect;
}

type SectionContainerConstructor = {
  new (): SectionContainer;
};

export class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements SectionContainer
{
  private closeButton: HTMLButtonElement;
  private onCloseListener?: OnCloseListener;
  private dragStateListener?: OnDragStateListener<PageItemComponent>;

  constructor() {
    super(
      `
      <li class="page-item" draggable="true" >
        <section class="page-item__body"></section>
        <div class="page-item__controls">
          <button class="item__close">&times;</button>
        </div>
      </li>
    `
    );

    this.closeButton = qs<HTMLButtonElement>(".item__close", this.element);

    this.bindEvents();
  }

  private bindEvents() {
    on<HTMLButtonElement, MouseEvent>(this.closeButton, "click", () => {
      this.onCloseListener && this.onCloseListener();
    });
    on<HTMLElement, DragEvent>(this.element, "dragstart", (event) => {
      this.onDragStart(event);
    });

    on<HTMLElement, DragEvent>(this.element, "dragend", (event) => {
      this.onDragEnd(event);
    });

    on<HTMLElement, DragEvent>(this.element, "dragenter", (event) => {
      this.onDragEnter(event);
    });

    on<HTMLElement, DragEvent>(this.element, "dragleave", (event) => {
      this.onDragLeave(event);
    });
  }

  addChild(child: Component): void {
    const container = qs<HTMLElement>(".page-item__body", this.element);
    child.attachTo(container, "beforeend");
  }

  setOnCloseListener(listener: OnCloseListener) {
    this.onCloseListener = listener;
  }

  setOnDragStateListener(listener: OnDragStateListener<PageItemComponent>) {
    this.dragStateListener = listener;
  }

  muteChildren(state: "mute" | "unmute") {
    if (state === "mute") {
      this.element.classList.add("mute-children");
    } else {
      this.element.classList.remove("mute-children");
    }
  }

  getBoundingRect(): DOMRect {
    return this.element.getBoundingClientRect();
  }

  private onDragStart(_: DragEvent) {
    this.notifyDragObservers("start");
  }

  private onDragEnd(_: DragEvent) {
    this.notifyDragObservers("end");
  }

  private onDragEnter(_: DragEvent) {
    this.notifyDragObservers("enter");
  }

  private onDragLeave(_: DragEvent) {
    this.notifyDragObservers("leave");
  }

  private notifyDragObservers(state: DragState) {
    this.dragStateListener && this.dragStateListener(this, state);
  }
}

export class PageComponent
  extends BaseComponent<HTMLUListElement>
  implements Composable
{
  private children = new Set<SectionContainer>();
  private dropTarget?: SectionContainer;
  private dragTarget?: SectionContainer;

  constructor(private pageItemConstructor: SectionContainerConstructor) {
    super(`<ul class="page"></ul>`);

    this.bindEvents();
  }

  private bindEvents() {
    on<HTMLUListElement, DragEvent>(this.element, "dragover", (event) => {
      this.onDragOver(event);
    });

    on<HTMLUListElement, DragEvent>(this.element, "drop", (event) => {
      this.onDrop(event);
    });
  }

  private onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  private onDrop(event: DragEvent) {
    event.preventDefault();

    if (!this.dropTarget) {
      return;
    }

    if (this.dragTarget && this.dragTarget !== this.dropTarget) {
      const dropY = event.clientY;
      const srcElement = this.dragTarget.getBoundingRect();
      this.dragTarget.removeFrom(this.element);

      if (dropY < srcElement.y) {
        this.dropTarget.attach(this.dragTarget, "beforebegin");
      } else {
        this.dropTarget.attach(this.dragTarget, "afterend");
      }
    }
  }

  addChild(child: Component): void {
    const item = new this.pageItemConstructor();

    item.addChild(child);
    item.attachTo(this.element, "beforeend");
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
      this.children.delete(item);
    });
    this.children.add(item);
    item.setOnDragStateListener(
      (target: SectionContainer, state: DragState) => {
        switch (state) {
          case "start":
            this.dragTarget = target;
            this.updateSections("mute");
            break;
          case "end":
            this.dragTarget = undefined;
            this.updateSections("unmute");
            break;
          case "enter":
            this.dropTarget = target;
            break;
          case "leave":
            this.dropTarget = undefined;
            break;
          default:
            throw new Error(`Unsupported state: ${state}`);
        }
      }
    );
  }

  private updateSections(state: "mute" | "unmute") {
    this.children.forEach((section: SectionContainer) => {
      section.muteChildren(state);
    });
  }
}
