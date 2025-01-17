import { qs } from "../../utils/helper.js";
import { BaseComponent } from "../component.js";
export class ImageComponent extends BaseComponent {
    constructor(title, url) {
        super(`
      <section class="image">
        <h2 class="image__title"></h2>
        <div class="image__holder">
            <img class="image__thumbnail">
        </div>
      </section>
    `);
        const imageElement = qs(".image__thumbnail", this.element);
        imageElement.src = url;
        imageElement.alt = title;
        const titleElement = qs(".image__title", this.element);
        titleElement.textContent = title;
    }
}
