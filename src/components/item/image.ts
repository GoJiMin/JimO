import { qs } from "../../utils/helper.js";
import { BaseComponent } from "../component.js";

export class ImageComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(
      `
      <section class="image">
        <div class="image__holder">
            <img class="image__thumbnail">
        </div>
        <p class="image__title"></p>
      </section>
    `
    );

    const imageElement = qs<HTMLImageElement>(
      ".image__thumbnail",
      this.element
    );

    imageElement.src = url;
    imageElement.alt = title;

    const titleElement = qs<HTMLParagraphElement>(
      ".image__title",
      this.element
    );

    titleElement.textContent = title;
  }
}
