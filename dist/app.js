import { InputDialog } from "./components/dialog/dialog.js";
import { ImageSectionInput } from "./components/dialog/input/image-input.js";
import { MediaSectionInput } from "./components/dialog/input/media-input.js";
import { TextSectionInput } from "./components/dialog/input/text-input.js";
import { TodoSectionInput } from "./components/dialog/input/todo-input.js";
import { ImageComponent } from "./components/item/image.js";
import { NoteComponent } from "./components/item/note.js";
import { TodoComponent } from "./components/item/todo.js";
import { VideoComponent } from "./components/item/video.js";
import { PageComponent, PageItemComponent } from "./components/page/page.js";
import { on, qs } from "./utils/helper.js";
class App {
  constructor(appRoot, dialogRoot) {
    this.dialogRoot = dialogRoot;
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot, "beforeend");
    this.bindElementToDialog(
      "#new-image",
      ImageSectionInput,
      (input) => new ImageComponent(input.title, input.url)
    );
    this.bindElementToDialog(
      "#new-video",
      MediaSectionInput,
      (input) => new VideoComponent(input.title, input.url)
    );
    this.bindElementToDialog(
      "#new-note",
      TextSectionInput,
      (input) => new NoteComponent(input.title, input.body)
    );
    this.bindElementToDialog(
      "#new-todo",
      TodoSectionInput,
      (input) => new TodoComponent(input.title, input.tasks)
    );
  }
  bindElementToDialog(selector, inputComponent, makeSection) {
    const addBtn = qs(selector);
    on(addBtn, "click", () => {
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
