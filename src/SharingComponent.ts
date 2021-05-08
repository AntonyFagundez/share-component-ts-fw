import { html, css, LitElement, property } from 'lit-element';
import ShareLink from './ShareLink.js';

export class SharingComponent extends LitElement {
  static styles = css`
  #container {
    height: 100px;
  }
  .span-icon {
    height: 30px;
    width: 30px;
    background-color: #007bb6;
    padding: 10px;
    border-radius: 20%;
    color: white;
  }
  .linked-in {
    background-color: #007bb6;
  }
  a {
    text-decoration: none;
    color: white;
    margin: 5px;
    height: 50px;
  }
  .twitter {
    background-color: #55acee;
  }
  .facebook {
    background-color: #3b5998;
  }
  .copy {
    background-color: #007bff;
  }
  .pinterest {
    background-color: rgb(230, 0, 35);  
  }
  svg {
    height: inherit;
    margin-bottom: -10px;
    margin-left: -7px;
    margin-right: -10px;
  }
  .svg-copy {
    
    margin-left: -5px;
    margin-right: -6px;
  }
  .svg-mail {
    margin-left: -5px;
    margin-right: -9px;
  }
  
  .svg-pinterest {
    margin-left: -2px;
    margin-right: -7px;
  }
  `;

  @property({ attribute: "label", type: String }) label;

  @property({attribute: "url", type: String}) 
  private url: string;

  @property({attribute: "text-selector", type: String}) 
  private textSelector: string | null;

  @property({type: String}) 
  private secureUrl: string;

  @property({type: String}) 
  private text: string;

  @property({type: ShareLink}) 
  public shareObject: ShareLink;

  @property({attribute: "title", type: String}) 
  private _title: string | null;

  @property({attribute: "mailto", type: String}) 
  private mailRecipient: string | null;

  @property({attribute: "subject", type: String}) 
  private mailSubject: string | null;

  @property({attribute: "body", type: String}) 
  private mailBody: string | null;

  @property({attribute: "pinterest-src-img"})
  private pinterestSrcImg: string | null;

  @property()
  private textElm: HTMLTextAreaElement | undefined;

  constructor(){
    super();


    this.url = this.getAttribute("url")  || window.location.href;
    this.secureUrl = encodeURI(this.url);
    this.textSelector = this.getAttribute("text-selector");
    const textElement =  document.querySelector(this.textSelector as string) as HTMLElement;
    this.text = textElement?.innerText || "";
    this.text = encodeURIComponent(this.text);
    
    this._title = this.getAttribute("title");
    this.label =  this.getAttribute("label") || "Compartir en";
    
    this.mailRecipient = this.getAttribute("mailto");
    this.mailSubject = this.getAttribute("subject") || encodeURIComponent(this.title);
    this.mailBody = this.getAttribute("body") || encodeURIComponent(this.text);
    
    this.pinterestSrcImg = this.getAttribute("pinterest-src-img");
    this.__init();
    this.shareObject = new ShareLink(this.url, this.title, this.text, this.mailRecipient, this.pinterestSrcImg);

  }

  __init() {    
    this.textElm = document.createElement("textarea");
    this.textElm.style.height="0px"; 
    this.textElm.style.width="0px"; 
    this.textElm.style.position= "fixed"; 
    this.textElm.style.bottom= "0"; 
    this.textElm.style.left= "0";
    document.body.append(this.textElm);
  }

  __copyToClipboard(ev: MouseEvent){

    const txt= this.textElm?.innerText;
    const permalink= window.location.href;

    if(this.textElm){

      this.textElm.textContent =  `De ${permalink}\n${txt}`;
      this.textElm.select();
      const state = document.execCommand("copy");
      
      // eslint-disable-next-line no-console
      console.log(`Copy ${state}`); 

      document.getSelection()?.removeAllRanges();
    }

    if (ev) { ev.preventDefault(); } // A: no navegar
    return false; //  A: no navegar
  
  };

  render() {
    const { LINKEDIN, FACEBOOK, EMAIL, PINTEREST, TWITTER } = this.shareObject;
    return html`
    <div id="container">
    ${this.label}
    <a id="a-linkedin" href="${LINKEDIN}" aria-label="Share in LinkedIn" >
    <span class="span-icon linkedin">
        <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path fill="currentColor" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
        </svg>
    </span>
    </a>
    <a id="a-twitter" href="${TWITTER}" aria-label="Share in Twitter" >
    <span class="span-icon twitter">
        <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
        </svg>
    </span>
    </a>
    <a id="a-facebook"  href="${FACEBOOK}"  aria-label="Share in Facebook" >
      <span class="span-icon facebook">
      <svg style="margin-left:-4px; margin-right: -3px;" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg>
      </span>
    </a>
    <a id="a-pinterest"  href="${PINTEREST}"  aria-label="Share in Pinterest" >
      <span class="span-icon pinterest">
      <svg aria-hidden="true" focusable="false" class="svg-pinterest"  role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z"></path></svg>
      </span>
    </a>
    <a id="a-mail" href="${EMAIL}"  aria-label="Share in Email" >
      <span class="span-icon mail">
      <svg class="svg-mail" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"></path></svg>
      </span>
    </a>
    <a  id="copy" href="#" @click=${this.__copyToClipboard}  aria-label="Copy to Clipboard"  >
      <span class="span-icon copy">
      <svg class="svg-copy" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"></path></svg>
      </span>
    </a>
    </div>
    
    `;
  }
}
