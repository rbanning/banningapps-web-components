
/// tooltip web component
const template = document.createElement('template');
template.innerHTML = `
  <style>
    .container {
      position: relative;
      display: inline-block;
      font-family: Sans-Serif;
      z-index: 2;
    }
    .icon {
      display: inline-block;
      width: 1em;
      height: 1em;
      padding: 0.2em;
      box-sizing: content-box;
      text-align: center;
      border-radius: 100%;
      color: #f0ffff;
      background-color: #5f9ea0;
      cursor: pointer;
      transform: translateY(-0.1em);
      transition: 
    }
    .icon.off {
    
    }
    .icon.on {
      display: none;
    }
    
    
    .tip { 
      position: absolute;
      bottom: 125%;
      z-index: 10;
      width: 300px;
      padding: 0.4em;
      border-radius: 0.5em;
      background: white;
      box-shadow: 5px 5px 10px rgba(0,0,0, 0.1);
      font-size: 0.8em;
      transform: scale(0);
      transform-origin: bottom left;
      transition: transform .5s cubic-bezier(0.860, 0.000, 0.070, 1.000);
     }
  </style>
  
  <div class="container">
    <span class="icon off">?</span>
    <span class="icon on">x</span>
    <div class="tip"></div>
  </div>
`;

export class TooltipComponent extends HTMLElement {
  expanded: boolean = false;
  background: string = "#ffffff"; //default background
  color: string = "#000000";      //default foreground
  
  //in order for attributeChangedCallback to be fired, 
  //we need to include which attributes should be monitored
  static get observedAttributes() { return ['tip_background', 'tip_color']; }
  
  
  constructor() {
    super();
    this.attachShadow({mode: 'open'});  //create the shadow root
    this.shadowRoot?.appendChild(template.content.cloneNode(true)); //add the content
  }


  //Invoked each time the custom element is appended into a document
  connectedCallback() {
    
    const {tip, iconOff, iconOn} = this.getShadowElements();
    
    //add the tip
    if (tip) {
      const template = this.querySelector('template');
      tip.innerHTML = template?.innerHTML || this.innerHTML;  
    }
    
    //setup the open/close triggers
    if (iconOff?.addEventListener) {
      iconOff.addEventListener('click', () => this.toggle(true));
    }
    if (iconOn?.addEventListener) {
      iconOn.addEventListener('click', () => this.toggle(false));
    }
    
    
    //look for attributes
    this.styleTip(this.getAttribute('tip_color'), this.getAttribute('tip_background'));
    
  }

  //Invoked when an attribute is added, removed, or changed 
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case "tip_color":
        this.color = newValue;
        break;
      case "tip_background":
        this.background = newValue;
        break;
    }

    this.styleTip(this.color, this.background);
  }
  
  toggle(expand: boolean) {
    const {tip, iconOff, iconOn} = this.getShadowElements();
    if (expand) {
      this.setStyle(tip, "transform", 'scale(1)');
      this.setStyle(iconOff, "display", 'none');
      this.setStyle(iconOn, "display", 'inline-block');
    } else {
      this.setStyle(tip, "transform", 'scale(0)');
      this.setStyle(iconOff, "display", 'inline-block');
      this.setStyle(iconOn, "display", 'none');
    }
    
    this.expanded = expand;
  }
  
  
  styleTip(color: string | null, background: string | null) {
    this.color = color || this.color;
    this.background = background || this.background;
    
    const {tip} = this.getShadowElements();
    tip.style.color = this.color;
    tip.style.backgroundColor = this.background;
  }
  
  private getShadowElements() {
    const tip = this.shadowRoot?.querySelector('.tip') as HTMLElement;
    const iconOff = this.shadowRoot?.querySelector('.off') as HTMLElement;
    const iconOn = this.shadowRoot?.querySelector('.on') as HTMLElement;
    return {tip, iconOff, iconOn};
  }

  private setStyle(element: HTMLElement, prop: string, value: string) {
    if (element) {
      element.style.setProperty(prop, value);
    }
  }
}

export const defineTooltipComponent = () => {
  window.customElements.define('ba-tooltip', TooltipComponent);
}