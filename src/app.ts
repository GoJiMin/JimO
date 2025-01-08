import { Component } from "./components/component.js";
import { InputDialog } from "./components/dialog/dialog.js";
import { MediaSectionInput } from "./components/dialog/input/media-input.js";
import { TextSectionInput } from "./components/dialog/input/text-input.js";
import { NoteComponent } from "./components/item/note.js";
import { VideoComponent } from "./components/item/video.js";
import {
  Composable,
  PageComponent,
  PageItemComponent,
} from "./components/page/page.js";
import { on, qs } from "./utils/helper.js";

class App {
  private readonly page: Component & Composable;
  constructor(appRoot: HTMLElement, dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);

    this.page.attachTo(appRoot, "beforeend");

    const addVideoBtn = qs<HTMLButtonElement>("#new-video");
    on(addVideoBtn, "click", () => {
      const dialog = new InputDialog();
      const mediaSection = new MediaSectionInput();

      dialog.addChild(mediaSection);

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(dialogRoot);
      });

      dialog.setOnSubmitListener(() => {
        const video = new VideoComponent(mediaSection.title, mediaSection.url);
        this.page.addChild(video);

        dialog.removeFrom(dialogRoot);
      });

      dialog.attachTo(dialogRoot, "beforeend");
    });

    const addNoteBtn = qs<HTMLButtonElement>("#new-note");
    on(addNoteBtn, "click", () => {
      const dialog = new InputDialog();
      const inputSection = new TextSectionInput();

      dialog.addChild(inputSection);

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(dialogRoot);
      });

      dialog.setOnSubmitListener(() => {
        const note = new NoteComponent(inputSection.title, inputSection.body);
        this.page.addChild(note);

        dialog.removeFrom(dialogRoot);
      });

      dialog.attachTo(dialogRoot, "beforeend");
    });
  }
}

new App(qs(".document"), document.body);
