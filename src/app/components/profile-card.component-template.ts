export const buildProfileCardTemplate = (colors: any): HTMLTemplateElement => {
  //build the profile heading color based styles
  const headingColorStyles = Object.getOwnPropertyNames(colors)
    .map(color => `
      .heading.${color} > .full-name {
        border-left: solid 1em ${colors[color]};
        background: ${colors[color]};
      }
      .heading.${color} > .full-name::before {
        border-right-color: ${colors[color]};
        border-bottom-color: ${colors[color]};
      }
      .heading.${color} > .btn-info {
        background: ${colors[color]};
      }
    `).join(' ');

    const styleSection = `
      <style>
        :host {
          margin: 1em;
          padding: 0;
        }
        
        .heading {
          position: relative;
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        .heading > .profile-image {
          order: 1;
          display: block;
          width: 100%;
          height: auto;
        }
        .heading > .full-name {
          position: relative;
          order: 2;
          width: 100%;
          padding: 0.5em 0;
          border-left: solid 1em transparent;
          margin-left: -1em;
          background: transparent;
          color: rgba(255,255,255, 0.8);
        }
        .heading > .full-name::before {
          content: ' ';
          position: absolute;
          top: -1em;
          left: -1em;
          width: 0; 
          height: 0; 
          border: solid 0.5em; 

          border-top-color: transparent;
          border-left-color: transparent;

          opacity: 0.8;
          filter: brightness(0.8);
        }

        .heading > .btn-info {
          position: absolute;
          top: 0;
          right: 0;
          margin: 2px;
          padding: 2px;
          width: 32px;
          height: 32px;
          overflow: hidden;
          border-radius: 50%;
          border: solid 2px #ffffff;
          cursor pointer;
          z-index: 10;
        }

        .heading > .btn-info > img {
          display: block;
          width: 100%;
          height: auto;
        }
        
        ${headingColorStyles}
      </style>
    `;  //end style

    const htmlSection = `
      <div class="heading">
        <span class="full-name">Full Name</span>
        <img class="profile-image" src="https://picsum.photos/200" alt="placeholder" />
        <button type="button" class="btn-info">
          <img src="/icons/profile-card-icon.info.png" alt="information icon" />
        </button>
      </div>
      <div class="content">
        This is where the content will live!
      </div>
    `;  //end html

    const template = document.createElement('template');
    template.innerHTML = `
        ${styleSection}
        ${htmlSection}
    `;

    return template;
}

