const template = document.createElement('template');
template.innerHTML = `
  <style>
    span.brand {
      font-weight: bold;
      color: red;  
    }
  </style>
  <span class="brand"></span>
`;

export class BrandComponent extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({mode: 'open'});  //create the shadow root
    this.shadowRoot?.appendChild(template.content.cloneNode(true)); //add the content    
  }

  connectedCallback() {
    this.setContent();
  }

  setContent(html?: string) {
    const { span } = this.getShadowElements();
    const template = this.querySelector('template');
    span.innerHTML = html || template?.innerHTML || this.innerHTML;
  }

  private getShadowElements() {
    const span = this.shadowRoot?.querySelector('span.brand') as HTMLElement;
    return {span};
  }
}

export const defineBrandComponent = () => {
  window.customElements.define('ba-brand', BrandComponent);
}
