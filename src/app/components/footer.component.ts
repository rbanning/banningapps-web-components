const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      min-width: 400px;
      width: 50%;
      margin: 3em auto 1em auto;
      font-size: 0.8;
      font-family: monospace;
      color: rgba(0,0,0, 0.2);
    }
    .f-line {
      width: 100%;
      text-align: center;
    }
    a {
      color: rgba(200,0,0, 0.5);
    }
  </style>
  <div class="f-line">
  &copy; 
    <span class="copyright-yr"></span>
    -
    <span class="copyright-owner"></span>
    = all rights reserved
  </div>
  <div class="f-line content"></div>
`;

export class FooterComponent extends HTMLElement {
  get copyrightYr() { return this.getCopyrightYr(); }
  set copyrightYr(value: string) { this.setCopyrightYr(value); }
  get copyrightOwner() { return this.getCopyrightOwner(); }
  set copyrightOwner(value: string) { this.setCopyrightOwner(value); }

  //in order for attributeChangedCallback to be fired, 
  //we need to include which attributes should be monitored
  static get observedAttributes() { return ['copyright_yr', 'copyright_owner']; }


  constructor() {
    super();
    this.attachShadow({mode: 'open'});  //create the shadow root
    this.shadowRoot?.appendChild(template.content.cloneNode(true)); //add the content    
  }

  connectedCallback() {
    this.setCopyrightYr(null);
    this.setCopyrightOwner(null);
    this.setContent();
  }

  //Invoked when an attribute is added, removed, or changed 
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case "copyright_yr":
        this.setCopyrightYr(newValue);
        break;
      case "copyright_owner":
        this.setCopyrightOwner(newValue);
        break;
    }
  }
  
  
  setContent(html?: string) {
    const content = this.getContentElement();
    const template = this.querySelector('template');
    content.innerHTML = html || template?.innerHTML || this.innerHTML;
  }

  getCopyrightYr(): string {
    return this.getCopyrightYrElement()?.innerText;
  }
  setCopyrightYr(yr: string | null) {
    yr = yr || `${new Date().getFullYear()}`;
    const span = this.getCopyrightYrElement();
    if (span) {
      span.innerText = yr;
    }
  }
  
  private getCopyrightYrElement(): HTMLElement {
    return this.shadowRoot?.querySelector('.copyright-yr') as HTMLElement;
  }

  getCopyrightOwner(): string {
    return this.getCopyrightOwnerElement()?.innerText;
  }
  setCopyrightOwner(owner: string | null) {
    owner = owner || 'Banning Applications';
    const span = this.getCopyrightOwnerElement();
    if (span) {
      span.innerText = owner;
    }
  }

  private getCopyrightOwnerElement(): HTMLElement {
    return this.shadowRoot?.querySelector('.copyright-owner') as HTMLElement;
  }


  private getContentElement(): HTMLElement {
    return this.shadowRoot?.querySelector('.content') as HTMLElement;
  }
}

export const defineFooterComponent = () => {
  window.customElements.define('ba-footer', FooterComponent);
}
