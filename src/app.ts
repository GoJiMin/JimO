import { ImageComponent } from "./components/ImageComponent.js";
import { PageComponent } from "./components/PageComponent.js";
import { qs } from "./utils/helper.js";

class App {
  private readonly page: PageComponent;
  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent();

    this.page.attachTo(appRoot);
    console.log("test");

    const image = new ImageComponent(
      "Image Title",
      "https://picsum.photos/600/300"
    );

    image.attachTo(appRoot);
  }
}

new App(qs(".document"));
