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
    iframe.src = this.covertToEmbeddedURL(url);

    const titleElement = qs<HTMLHeadingElement>(".video__title", this.element);
    titleElement.textContent = title;
  }

  private covertToEmbeddedURL(url: string): string {
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})|(?:youtu.be\/([a-zA-Z0-9_-]{11}))/;

    const match = url.match(regExp);
    const videoId = match ? match[1] || match[2] : undefined;

    console.log(videoId);

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return url;
  }
}
