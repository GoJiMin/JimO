import { Component } from "./components/component.js";
import { ImageComponent } from "./components/item/image.js";
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
  }
}

new App(qs(".document"));
