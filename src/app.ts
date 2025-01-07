import { Component } from "./components/component.js";
import { InputDialog } from "./components/dialog/dialog.js";
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

class App {
  private readonly page: Component & Composable;
  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);

    this.page.attachTo(appRoot, "beforeend");

    const image = new ImageComponent(
      "Image Title",
      "https://picsum.photos/600/300"
    );
    this.page.addChild(image);

    const note = new NoteComponent("Note Title", "Note Body");
    this.page.addChild(note);

    const todo = new TodoComponent("Todo Title", [
      "점심먹기",
      "저녁먹기",
      "공부하기",
    ]);
    this.page.addChild(todo);

    const video = new VideoComponent(
      "Video Title",
      "https://youtu.be/Xc8Or-B2sTE"
    );
    this.page.addChild(video);

    const addImageBtn = qs<HTMLButtonElement>("#new-image");
    on(addImageBtn, "click", () => {
      const dialog = new InputDialog();

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(document.body);
      });

      dialog.setOnSubmitListener(() => {
        // Todo : 추가 버튼을 클릭하면 아이템 요소를 생성해 페이지 컴포넌트에 추가한다.

        dialog.removeFrom(document.body);
      });

      dialog.attachTo(document.body, "beforeend");
    });
  }
}

new App(qs(".document"));
