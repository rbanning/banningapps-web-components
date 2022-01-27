/* NOTE: this component does not use Shadow DOM and it is only included to use with this sample site */

import { PopupMenuComponent } from ".";

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
  <nav class="lg-screen">
  </nav>
  <nav class="sm-screen">
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
    const transformLink = (link: IHeaderLink) => {
      const css = [
        ...(link.css || []),
        (link.id === id ? 'active' : null)
      ].filter(Boolean);

      return `<a class="${css.join(' ')}" href="${link.url}">${link.label}</a>`
    };

    //build the link arrays
    const brandLinks = siteLinks.filter(link => link.css?.some(m => m ==='brand'))
                          .map(transformLink);
    const navLinks = siteLinks.filter(link => !link.css?.some(m => m ==='brand'))
                          .map(transformLink);

    const navArray = this.querySelectorAll('nav');
    if (navArray) {
      navArray.forEach(nav => {
        if (nav.classList.contains('lg-screen')) {
          nav.innerHTML = [
            ...brandLinks,
            ...navLinks
          ].join(' ');
        } else if (nav.classList.contains('sm-screen')) {
          nav.innerHTML = [
            ...brandLinks,
            `<ba-popup-menu location_x="right: 0">
              <template>
              ${navLinks.join(' ')}
              </template
            </ba-popup-menu>`
          ].join(' ');
        }
      });
    }
  }
}

export const defineSiteHeaderComponent = () => {
  window.customElements.define('ba-site-header', SiteHeaderComponent);
}
