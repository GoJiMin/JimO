import { Component } from "./components/component.js";
import {
  InputDialog,
  MediaData,
  TextData,
  Validator,
} from "./components/dialog/dialog.js";
import { ImageSectionInput } from "./components/dialog/input/image-input.js";
import { MediaSectionInput } from "./components/dialog/input/media-input.js";
import { TextSectionInput } from "./components/dialog/input/text-input.js";
import { TodoSectionInput } from "./components/dialog/input/todo-input.js";
import { ImageComponent } from "./components/item/image.js";
import { NoteComponent } from "./components/item/note.js";
import { TodoComponent } from "./components/item/todo.js";
import { VideoComponent } from "./components/item/video.js";
import {
  Composable,
  PageComponent,
  PageItemComponent,
} from "./components/page/page.js";
import { on, qs } from "./utils/helper.js";

type inputComponentConstructor<
  T = (MediaData | TextData) & Component & Validator
> = {
  new (): T;
};

class App {
  private readonly page: Component & Composable;
  constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);

    this.page.attachTo(appRoot, "beforeend");

    this.bindElementToDialog<ImageSectionInput>(
      "#new-image",
      ImageSectionInput,
      (input: ImageSectionInput) => new ImageComponent(input.title, input.url)
    );

    this.bindElementToDialog<MediaSectionInput>(
      "#new-video",
      MediaSectionInput,
      (input: MediaSectionInput) => new VideoComponent(input.title, input.url)
    );

    this.bindElementToDialog<TextSectionInput>(
      "#new-note",
      TextSectionInput,
      (input: TextSectionInput) => new NoteComponent(input.title, input.body)
    );

    this.bindElementToDialog<TodoSectionInput>(
      "#new-todo",
      TodoSectionInput,
      (input: TodoSectionInput) => new TodoComponent(input.title, input.tasks)
    );

    this.page.addChild(new NoteComponent("Note Title-1", "Note Content-1"));
    this.page.addChild(
      new TodoComponent("오늘 할 일", [
        "아침 먹기",
        "점심 먹기",
        "간식 먹기",
        "저녁 먹기",
      ])
    );
    this.page.addChild(
      new ImageComponent("Image Title", "https://picsum.photos/800/400")
    );
    this.page.addChild(new NoteComponent("Note Title-2", "Note Content-2"));
  }

  private bindElementToDialog<
    T extends (MediaData | TextData) & Component & Validator
  >(
    selector: string,
    inputComponent: inputComponentConstructor<T>,
    makeSection: (input: T) => Component
  ) {
    const addBtn = qs<HTMLButtonElement>(selector);

    on<HTMLButtonElement, MouseEvent>(addBtn, "click", () => {
      const dialog = new InputDialog();
      const input = new inputComponent();

      dialog.addChild(input);

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(this.dialogRoot);
      });

      dialog.setOnSubmitListener(() => {
        const state = input.validate();

        if (state.status === "error") {
          alert(state.reason);
          return;
        }

        const section = makeSection(input);
        this.page.addChild(section);

        dialog.removeFrom(this.dialogRoot);
      });

      dialog.attachTo(this.dialogRoot, "beforeend");
    });
  }
}

new App(qs(".document"), document.body);
