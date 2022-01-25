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



  constructor() {
    super();
    this.attachShadow({mode: 'open'});  //create the shadow root
    this.shadowRoot?.appendChild(template.content.cloneNode(true)); //add the content    
  }

  connectedCallback() {
    counter++;
    this.setProfileImage(`https://picsum.photos/seed/v-${counter}/400`);

    this.setTheme('blue');
    

    let index = 0;
    const colorKeys = Object.getOwnPropertyNames(colors);
    const setNextTheme = () => {
      index = (index + 1) % colorKeys.length;
      this.setTheme(colorKeys[index]);
    }  

    setInterval(() => setNextTheme(), 2000);
    setNextTheme();
  }

  




  getTheme(): string {
    let ret: string | null = "";

    const classList = this.getHeadingElement()?.classList;
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
  setTheme(name: string) {
    const span = this.getHeadingElement();
    if (span) {
      const keys = Object.getOwnPropertyNames(colors);
      Object.getOwnPropertyNames(colors).forEach(key => {
        span.classList.remove(key);
      });
      if (keys.includes(name)) {
        span.classList.add(name);
      }
    }
  }
  private getHeadingElement(): HTMLElement {
    return this.shadowRoot?.querySelector('.heading') as HTMLElement;
  }

  getFullName(): string {
    return this.getFullNameElement()?.innerText;
  }
  setFullName(name: string) {
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
  setProfileImage(src: string) {
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
}

export const defineProfileCardComponent = () => {
  window.customElements.define('ba-profile-card', ProfileCardComponent);
}