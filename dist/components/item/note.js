import { qs } from "../../utils/helper.js";
import { BaseComponent } from "../component.js";
export class NoteComponent extends BaseComponent {
    constructor(title, body) {
        super(`
      <section class="note">
        <h2 class="note__title"></h2>
        <p class="note__body"></p>
      </section>            
      `);
        const titleElement = qs(".note__title", this.element);
        titleElement.textContent = title;
        const bodyElement = qs(".note__body", this.element);
        bodyElement.textContent = body;
    }
}
