import { Component } from "./components/component.js";
import {
  InputDialog,
  MediaData,
  TextData,
} from "./components/dialog/dialog.js";
import { MediaSectionInput } from "./components/dialog/input/media-input.js";
import { TextSectionInput } from "./components/dialog/input/text-input.js";
import { ImageComponent } from "./components/item/image.js";
import { NoteComponent } from "./components/item/note.js";
import { VideoComponent } from "./components/item/video.js";
import {
  Composable,
  PageComponent,
  PageItemComponent,
} from "./components/page/page.js";
import { on, qs } from "./utils/helper.js";

type inputComponentConstructor<T = (MediaData | TextData) & Component> = {
  new (): T;
};

class App {
  private readonly page: Component & Composable;
  constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);

    this.page.attachTo(appRoot, "beforeend");

    this.bindElementToDialog<MediaSectionInput>(
      "#new-image",
      MediaSectionInput,
      (input: MediaSectionInput) => new ImageComponent(input.title, input.url)
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

    // Todo: 투두를 추가하기 위한 input 구현.
    // this.bindElementToDialog<TextSectionInput>(
    //   "#new-todo",
    // );
  }

  private bindElementToDialog<T extends (MediaData | TextData) & Component>(
    selector: string,
    inputComponent: inputComponentConstructor<T>,
    makeSection: (input: T) => Component
  ) {
    const addBtn = qs<HTMLButtonElement>(selector);

    on(addBtn, "click", () => {
      const dialog = new InputDialog();
      const input = new inputComponent();

      dialog.addChild(input);

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(this.dialogRoot);
      });

      dialog.setOnSubmitListener(() => {
        const section = makeSection(input);
        this.page.addChild(section);

        dialog.removeFrom(this.dialogRoot);
      });

      dialog.attachTo(this.dialogRoot, "beforeend");
    });
  }
}

new App(qs(".document"), document.body);
