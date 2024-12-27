import { PageComponent } from "./components/PageComponent.js";
import { qs } from "./utils/helper.js";
class App {
    constructor(appRoot) {
        this.page = new PageComponent();
        this.page.attachTo(appRoot);
    }
}
new App(qs(".document"));
