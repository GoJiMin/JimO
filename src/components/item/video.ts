import { qs } from "../../utils/helper.js";
import { BaseComponent } from "../component.js";

export class VideoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(
      `
       <section class="video">
         <div class="video__player"><iframe class="video__iframe"></iframe></div>
         <h2 class="video__title"></h2>
       </section>            
        `
    );

    const iframe = qs<HTMLIFrameElement>(".video__iframe", this.element);
    iframe.src = url;

    const titleElement = qs<HTMLHeadingElement>(".video__title", this.element);
    titleElement.textContent = title;
  }
}
