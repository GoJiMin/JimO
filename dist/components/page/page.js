import { on, qs } from "../../utils/helper.js";
import { BaseComponent } from "../component.js";
export class PageItemComponent extends BaseComponent {
    constructor() {
        super(`
      <li class="page-item" draggable="true" >
        <section class="page-item__body"></section>
        <div class="page-item__controls">
          <button class="item__close">&times;</button>
        </div>
      </li>
    `);
        this.closeButton = qs(".item__close", this.element);
        this.bindEvents();
    }
    bindEvents() {
        on(this.closeButton, "click", () => {
            this.onCloseListener && this.onCloseListener();
        });
        on(this.element, "dragstart", (event) => {
            this.onDragStart(event);
        });
        on(this.element, "dragend", (event) => {
            this.onDragEnd(event);
        });
        on(this.element, "dragenter", (event) => {
            this.onDragEnter(event);
        });
        on(this.element, "dragleave", (event) => {
            this.onDragLeave(event);
        });
    }
    addChild(child) {
        const container = qs(".page-item__body", this.element);
        child.attachTo(container, "beforeend");
    }
    setOnCloseListener(listener) {
        this.onCloseListener = listener;
    }
    setOnDragStateListener(listener) {
        this.dragStateListener = listener;
    }
    muteChildren(state) {
        if (state === "mute") {
            this.element.classList.add("mute-children");
        }
        else {
            this.element.classList.remove("mute-children");
        }
    }
    getBoundingRect() {
        return this.element.getBoundingClientRect();
    }
    onDropped() {
        this.element.classList.remove("drop-area");
    }
    onDragStart(_) {
        this.notifyDragObservers("start");
        this.element.classList.add("dragging");
    }
    onDragEnd(_) {
        this.notifyDragObservers("end");
        this.element.classList.remove("dragging");
    }
    onDragEnter(_) {
        this.notifyDragObservers("enter");
        if (!this.element.classList.contains("dragging")) {
            this.element.classList.add("drop-area");
        }
    }
    onDragLeave(_) {
        this.notifyDragObservers("leave");
        this.element.classList.remove("drop-area");
    }
    notifyDragObservers(state) {
        this.dragStateListener && this.dragStateListener(this, state);
    }
}
export class PageComponent extends BaseComponent {
    constructor(pageItemConstructor) {
        super(`<ul class="page"></ul>`);
        this.pageItemConstructor = pageItemConstructor;
        this.children = new Set();
        this.bindEvents();
    }
    bindEvents() {
        on(this.element, "dragover", (event) => {
            this.onDragOver(event);
        });
        on(this.element, "drop", (event) => {
            this.onDrop(event);
        });
    }
    onDragOver(event) {
        event.preventDefault();
        const scrollZone = 50;
        const scrollSpeed = 5;
        const { clientY } = event;
        if (clientY < scrollZone) {
            this.element.scrollBy({ top: -scrollSpeed, behavior: "smooth" });
        }
        if (clientY > window.innerHeight - scrollZone) {
            this.element.scrollBy({ top: scrollSpeed, behavior: "smooth" });
        }
    }
    onDrop(event) {
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
            }
            else {
                this.dropTarget.attach(this.dragTarget, "afterend");
            }
        }
        this.dropTarget.onDropped();
    }
    addChild(child) {
        const item = new this.pageItemConstructor();
        item.addChild(child);
        item.attachTo(this.element, "beforeend");
        item.setOnCloseListener(() => {
            item.removeFrom(this.element);
            this.children.delete(item);
        });
        this.children.add(item);
        item.setOnDragStateListener((target, state) => {
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
        });
    }
    updateSections(state) {
        this.children.forEach((section) => {
            section.muteChildren(state);
        });
    }
}
