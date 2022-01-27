/* NOTE: this component does not use Shadow DOM and it is only included to use with this sample site */

export interface IHeaderLink {
  id: string;
  url: string;
  label: string;
  css?: string[];
} 
const siteLinks: IHeaderLink[] = [
  {
    id: 'home',
    url: '/',
    label: 'Banning Applications',
    css: ['brand', 'flex-1']
  },
  {
    id: 'tooltip',
    url: "/tooltip",
    label: "Tooltip"
  },
  {
    id: 'expandable-details',
    url: '/expandable-details',
    label: 'Expandable Details'
  },
  {
    id: 'profile-card',
    url: '/profile-card',
    label: 'Profile Card'
  }
];


const template = `
  <header class="primary">
  <nav>
  </nav>
  </header>
`;


export class SiteHeaderComponent extends HTMLElement {

  //in order for attributeChangedCallback to be fired, 
  //we need to include which attributes should be monitored
  static get observedAttributes() { return ['active']; }

  constructor() {
    super();

    //do not use shadow DOM - just add base template
    this.innerHTML = template;

    this.loadLinks();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case "active":
        this.loadLinks(newValue);
        break;
    }
  }

  loadLinks(id?: string) {
    //add the links
    const linkHTML = siteLinks.map(link => {
      const css = [
        ...(link.css || []),
        (link.id === id ? 'active' : null)
      ].filter(Boolean);

      return `<a class="${css.join(' ')}" href="${link.url}">${link.label}</a>`
    }).join(' ');

    const nav = this.querySelector('nav');
    if (nav) {
      nav.innerHTML = linkHTML;
    } 
  }
}

export const defineSiteHeaderComponent = () => {
  window.customElements.define('ba-site-header', SiteHeaderComponent);
}
