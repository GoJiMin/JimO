import { BaseComponent } from "./component.js";
export class Dialog extends BaseComponent {
    constructor() {
        super(`
      <section class="dialog">
        <div class="dialog__backdrop" />
        <div class="dialog__input">
          <p>input ..</p>
        </div>
        <button class="add">Add</button>
      </section>
        `);
    }
}
