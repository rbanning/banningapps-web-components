const config = {
  btn_size: '30px',
};

const template = document.createElement('template');
template.innerHTML = `
  <style>
    .btn {
      position: relative;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: ${config.btn_size};
      height: ${config.btn_size};
      overflow: hidden;
      font-size: 2em;

      border: none;
      border-radius: 50%;
      background: rgba(0,0,0, 0.1);
      margin: 0 0.5em;
      box-sizing: border-box;
      cursor: pointer;
    }
    .btn-icon {
      border-radius: 0;
      background: transparent;
    }
    .btn-icon img {
      display: block;
      width: 100%;
      height: auto;
    }
    .btn-black {
      color: #000000;
    }
    .popup-menu {
      position: fixed;
      display: none;
      padding-bottom: 1em;
      background: #ffffff;
      border: solid 1px rgba(0,0,0, 0.2);
      overflow: hidden;
    }
    .popup-menu.open {
      display: block;
      z-index: 1000;
    }
    .popup-menu > .heading {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 0.4em;
      margin-bottom: 0.4em;
      box-shadow: 0px 2px 4px rgba(0,0,0, 0.2);
    }
    .popup-menu > .heading > .title {
      font-weight: bold;
      flex: 1;
    }
    .popup-menu > .menu-items {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    .popup-menu > .menu-items > * {
      margin: 0.3em 0.5em;
    }
  </style>
  <button type="button" class="btn btn-icon trigger-open">
    <img src="./icons/menu.png" alt="popup menu trigger" />
  </button>
  <div class="popup-menu">
    <div class="heading">
      <span class="title">Menu</span>
      <button type="button" class="btn btn-black trigger-close">
        <span>
        &times;
        </span>
      </button>
    </div>
    <div class="menu-items">
    </div>
  </div>
`;

export type Location = { [key: string]: string };
export type LocationX = {
  left?: string;
  right?: string;
}
export type LocationY = {
  top?: string;
  bottom?: string;
}

const test = (key: string, arg: string): LocationX => {
  const x: Location = {};
  x[key] = arg;
  return x;
}

export class PopupMenuComponent extends HTMLElement {
  get locationX(): LocationX { return this.getLocationX() || {}; }
  set locationX(value: LocationX) { this.setLocationX(value); }
  get locationY(): LocationY { return this.getLocationY() || {}; }
  set locationY(value: LocationY) { this.setLocationY(value); }
  get menuIcon() { return this.getMenuIcon(); }
  set menuIcon(value: string) { this.setMenuIcon(value); }
  
  get isOpen(): boolean {
    const menu = this.getPopupMenu();
    return menu?.classList.contains('open');
  }

  //in order for attributeChangedCallback to be fired, 
  //we need to include which attributes should be monitored
  static get observedAttributes() { return ['location_x', 'location_y', 'menu_icon']; }


  constructor() {
    super();
    this.attachShadow({mode: 'open'});  //create the shadow root
    this.shadowRoot?.appendChild(template.content.cloneNode(true)); //add the content    
  }

  connectedCallback() {
    //setup the defaults
    this.setLocationX(null);
    this.setLocationY(null);
    this.setMenuIcon('');
    this.setMenuItems();

    //setup the event listeners
    const triggerOpen = this.getTriggerOpenElement();
    if (triggerOpen) {
      triggerOpen.addEventListener('click', () => this.toggleMenu(true));
    }
    const triggerClose = this.getTriggerCloseElement();
    if (triggerClose) {
      triggerClose.addEventListener('click', () => this.toggleMenu(false));
    }
  }

  //Invoked when an attribute is added, removed, or changed 
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case "location_x":
        this.setLocationX(this.parseLocationX(newValue));
        break;
      case "location_y":
        this.setLocationY(this.parseLocationY(newValue));
        break;
      case "menu_icon":
        this.setMenuIcon(newValue);
        break;
    }
  }
  
  toggleMenu(open?: boolean) {
    open = typeof(open) === 'boolean' ? open : !this.isOpen;
    const menu = this.getPopupMenu();
    if (menu) {
      menu.classList.toggle('open', open);
    }
  }

  getLocationX(): LocationX | null {
    const menu = this.getPopupMenu();
    if (menu) {
      return {
        left: menu.style.left,
        right: menu.style.right
      };
    }
    //else
    return null;
  }

  setLocationX(value: LocationX | null) {
    //setup the default location
    value = value || this.getLocationX();
    if (!value?.left && !value?.right) {
      value = { left: '0' };
    }
    const menu = this.getPopupMenu();
    if (menu) {
      menu.style.left = value?.left || '';
      menu.style.right = value?.right || '';
      console.log("DEBUG: setLocationX", {value, styles: menu.style});
    }
  }


  getLocationY(): LocationY | null {
    const menu = this.getPopupMenu();
    if (menu) {
      return {
        top: menu.style.top,
        bottom: menu.style.bottom
      };
    }
    //else
    return null;
  }

  setLocationY(value: LocationY | null) {
    //setup the default location
    value = value || this.getLocationY();
    if (!value?.top && !value?.bottom) {
      value = { top: '0' };
    }
    const menu = this.getPopupMenu();
    if (menu) {
      menu.style.top = value?.top || '';
      menu.style.bottom = value?.bottom || '';
    }
  }

  getMenuIcon(): string {
    const icon = this.getMenuIconElement();
    return icon?.src;
  }

  setMenuIcon(value: string) {
    //setup the default location
    value = value || '/icons/menu.png';
    const icon = this.getMenuIconElement();
    if (icon) {
      icon.src = value;
    }
  }


  private getShadowElement(selector: string) {
    return this.shadowRoot?.querySelector(selector) as HTMLElement;
  }
  private getPopupMenu() {
    return this.getShadowElement('.popup-menu');
  }
  private getPopupMenuItems() {
    return this.getShadowElement('.popup-menu .menu-items');
  }
  private getTriggerOpenElement() {
    return this.getShadowElement('.trigger-open');
  }
  private getTriggerCloseElement() {
    return this.getShadowElement('.trigger-close');
  }
  private getMenuIconElement(): HTMLImageElement {
    return this.getShadowElement('.trigger-open img') as HTMLImageElement;
  }

  setMenuItems(html?: string) {
    const content = this.getPopupMenuItems();
    const template = this.querySelector('template');
    content.innerHTML = html || template?.innerHTML || this.innerHTML;
  }

  private parseLocationX(value: string): LocationX {
    return this.parseLocation<LocationX>(value, ['left', 'right']);
  }
  private parseLocationY(value: string): LocationY {
    return this.parseLocation<LocationY>(value, ['top', 'bottom']);
  }

  private parseLocation<T extends Location>(value: string, props: string[]): T {
    const ret: Location = {};
    
    if (typeof(value) === 'string') {
      if (value.indexOf('{') >= 0) {
        //looks like a serialized LocationX object
        try {
          return JSON.parse(value) as T;          
        } catch (error) {
          console.warn("Unable to deserialize Location value", {value, error});
        }
      } else {
        
        //check to see if the value is in the form of a key:value pair.
        const parts = value.split(':').map(m => m.trim()).filter(Boolean);
        switch (parts.length) {
          case 0:
            console.warn("Could not parse location");
            break;
          case 1:
            //no key:value pair so assume first element in props
            ret[props[0]] = parts[1];
            break;;
          default:

            if (props.some(m => m === parts[0])) {
              //found valid key:value pair
              ret[parts[0]] = parts[1];
              return ret as T;
            } else {
              console.warn("Invalid Location property", {key: parts[0], value: parts[1], raw: value});
            }
        } //end switch
      } //end else if
    }

    //else
    return ret as T;
  }
  
}

export const definePopupMenuComponent = () => {
  window.customElements.define('ba-popup-menu', PopupMenuComponent);
}
