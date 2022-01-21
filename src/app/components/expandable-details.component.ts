//expandable details web component
const template = document.createElement('template');
template.innerHTML = `
  <style>
    details > summary {
      padding: 0.5em;
      border: none;
      box-shadow: 3px 3px 6px rgba(0,0,0, 0.5);
      cursor: pointer;
    }
    details > .content {
      border-radius: 0 0 10px 10px;
      background-color: rgba(0,0,0, 0.1);
      padding: 0.5em 1.5em;
      margin: 0;
      box-shadow: 3px 3px 6px rgba(0,0,0, 0.5);
      transform: scale(0);
      transform-origin: bottom left
      transition: transform 1.5s cubic-bezier(0.65, 0, 0.70, 1);
    }
    details[open] > summary {
      color: rgba(0,0,0, 0.5);
      box-shadow: 0 3px 6px #ffffff, 3px 0 6px rgba(0,0,0, 0.5);
    }
    details[open] > .content {
      transform: scale(1);
    }
  </style>
  <details>
    <summary><slot name="heading">Heading</slot></summary>
    <div class="content">
      <slot name="content">The details go here...</slot>
    </div>
  </details>
`;  //end template

export class ExpandableDetailsComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});  //create the shadow root
    this.shadowRoot?.appendChild(template.content.cloneNode(true)); //add the content    
  }
}

export const defineExpandableDetailsComponent = () => {
  window.customElements.define('ba-expandable-details', ExpandableDetailsComponent);
}