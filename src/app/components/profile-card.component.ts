//profile card web component
const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      margin: 1em;
      padding: 0;
      background-color: rgba(0,0,0, 0.1);
      color: black;
    }  
  </style>
  <div class="heading">
    Full Name
  </div>
  <div class="content">
    This is where the content will live!
  </div>
`;  //end template

export class ProfileCardComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});  //create the shadow root
    this.shadowRoot?.appendChild(template.content.cloneNode(true)); //add the content    
  }
}

export const defineProfileCardComponent = () => {
  window.customElements.define('ba-profile-card', ProfileCardComponent);
}