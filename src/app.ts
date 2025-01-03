import { Component } from "./components/component.js";
import { ImageComponent } from "./components/item/image.js";
import { NoteComponent } from "./components/item/note.js";
import { TodoComponent } from "./components/item/todo.js";
import { VideoComponent } from "./components/item/video.js";
import { Composable, PageComponent } from "./components/page/page.js";
import { qs } from "./utils/helper.js";

class App {
  private readonly page: Component & Composable;
  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent();

    this.page.attachTo(appRoot);

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
  }
}

new App(qs(".document"));
