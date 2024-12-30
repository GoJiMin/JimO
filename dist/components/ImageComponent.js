import { qs } from "../utils/helper.js";
export class ImageComponent {
    constructor(title, url) {
        const template = document.createElement("template");
        template.innerHTML = `
      <section class="image">
        <div class="image__holder">
            <img class="image__thumbnail">
        </div>
        <p class="image__title"></p>
      </section>
    `;
        this.element = template.content.firstElementChild;
        const imageElement = qs(".image__thumbnail", this.element);
        imageElement.src = url;
        imageElement.alt = title;
        const titleElement = qs(".image__title", this.element);
        titleElement.textContent = title;
    }
    attachTo(parent, position = "afterbegin") {
        parent.insertAdjacentElement(position, this.element);
    }
}
