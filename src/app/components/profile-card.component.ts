import { buildProfileCardTemplate } from "./profile-card.component-template";

const colors = {
  red: '#EC4E20',
  green: '#A8C256',
  blue: '#016FB9',
  purple: '#5603AD',
  orange: '#FF9505',
  black: '#333333'
}
//profile card web component

const template = buildProfileCardTemplate(colors);

let counter = 0;

export class ProfileCardComponent extends HTMLElement {
  
  get theme() { return this.getTheme(); }
  set theme(value: string) { this.setTheme(value); }

  get fullName() { return this.getFullName(); }
  set fullName(value: string) { this.setFullName(value); }
  
  get profileImage() { return this.getProfileImage(); }
  set profileImage(value: string) { this.setProfileImage(value); }

  private _isDetailView = false;
  get isDetailView() { return this._isDetailView; }
  set isDetailView(value: boolean) { this.toggleDetailView(value); }

  constructor() {
    super();
    this.attachShadow({mode: 'open'});  //create the shadow root
    this.shadowRoot?.appendChild(template.content.cloneNode(true)); //add the content    
  }

  connectedCallback() {
    //setup detail button
    const btn = this.getBtnInfoElement();
    if (btn) {
      btn.addEventListener('click', () => {
        this.toggleDetailView();
      });
    } else {
      console.warn("Unable to setup profile-card's detail toggle button");
    }


    //look for attributes
    this.setTheme(this.getAttribute('theme'));
    this.setFullName(this.getAttribute('name'));
    this.setProfileImage(this.getAttribute('image'));
    
    //content
    this.setContent();
  }

  //Invoked when an attribute is added, removed, or changed 
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case "theme":
        this.setTheme(newValue);
        break;
      case "name":
        this.setFullName(newValue);
        break;
      case "image":
        this.setProfileImage(newValue);
        break;
    }
  }

  getTheme(): string {
    let ret: string | null = "";

    const classList = this.getWrapperElement()?.classList;
    if (classList) {
      const keys = Object.getOwnPropertyNames(colors);
      for (let i=0; i<keys.length && !ret; i++) {
        if (classList.contains(keys[i])) {
          ret = keys[i];
        }
      }
    }

    return ret;
  }
  setTheme(name: string | null) {
    name = name || 'black'; //default
    const wrapper = this.getWrapperElement();
    if (wrapper) {
      const keys = Object.getOwnPropertyNames(colors);
      Object.getOwnPropertyNames(colors).forEach(key => {
        wrapper.classList.remove(key);
      });
      if (keys.includes(name)) {
        wrapper.classList.add(name);
      }
    }
  }

  getFullName(): string {
    return this.getFullNameElement()?.innerText;
  }
  setFullName(name: string | null) {
    name = name || '';
    const span = this.getFullNameElement();
    if (span) {
      span.innerText = name;
    }
  }
  private getFullNameElement(): HTMLElement {
    return this.shadowRoot?.querySelector('.full-name') as HTMLElement;
  }

  getProfileImage(): string {
    return this.getProfileImageElement()?.src;
  }
  setProfileImage(src: string | null) {
    src = src || '';
    const img = this.getProfileImageElement();
    if (img) {
      img.src = src;
      img.alt = `Profile Image for ${this.fullName}`;
    } else {
      console.warn("ProfileCardComponent - setProfileImage could not locate image element", {img});
    }
  }
  private getProfileImageElement(): HTMLImageElement {
    return this.shadowRoot?.querySelector('img.profile-image') as HTMLImageElement;
  }

  setContent() {
    const content = this.getContentElement();
    if (content) {
      const template = this.querySelector('template');
      content.innerHTML = template?.innerHTML || this.innerHTML;
    }
  }

  //public method to show the profile information.
  //if showProfile is not provided (or null), then the 
  //component's  is 
  toggleDetailView(showProfile: boolean | null = null) {
    this._isDetailView = typeof(showProfile) === 'boolean' ? showProfile : !this.isDetailView;

    const wrapper = this.getWrapperElement();
    wrapper?.classList.toggle("detail", this._isDetailView);
  }

  private getBtnInfoElement(): HTMLElement {
    return this.shadowRoot?.querySelector('.btn-info') as HTMLElement;
  }
  private getContentElement(): HTMLElement {
    return this.shadowRoot?.querySelector('.content') as HTMLElement;
  }
  private getWrapperElement(): HTMLElement {
    return this.shadowRoot?.querySelector('.wrapper') as HTMLElement;
  }
}

export const defineProfileCardComponent = () => {
  window.customElements.define('ba-profile-card', ProfileCardComponent);
}