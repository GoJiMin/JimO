import { PageComponent } from "./components/PageComponent.js";
import { qs } from "./utils/helper.js";

class App {
  private readonly page: PageComponent;
  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent();

    this.page.attachTo(appRoot);
  }
}

new App(qs(".document"));
