import { Component } from "./components/component.js";
import { ImageComponent } from "./components/item/image.js";
import { NoteComponent } from "./components/item/note.js";
import { TodoComponent } from "./components/item/todo.js";
import { VideoComponent } from "./components/item/video.js";
import { PageComponent } from "./components/page/page.js";
import { qs } from "./utils/helper.js";

class App {
  private readonly page: Component;
  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent();

    this.page.attachTo(appRoot);

    const image = new ImageComponent(
      "Image Title",
      "https://picsum.photos/600/300"
    );

    image.attachTo(appRoot);

    const note = new NoteComponent("Note Title", "Note Body");

    note.attachTo(appRoot);

    const todo = new TodoComponent("Todo Title", [
      "점심먹기",
      "저녁먹기",
      "공부하기",
    ]);

    todo.attachTo(appRoot);

    const video = new VideoComponent(
      "Video Title",
      "https://www.youtube.com/embed/F_89_VYZGFc"
    );

    video.attachTo(appRoot);
  }
}

new App(qs(".document"));
