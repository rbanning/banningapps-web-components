export const buildProfileCardTemplate = (colors: any): HTMLTemplateElement => {
  //build the profile heading color based styles
  const headingColorStyles = Object.getOwnPropertyNames(colors)
    .map(color => `
      .wrapper.${color} > .heading > .full-name {
        border-left: solid 1em ${colors[color]};
        background: ${colors[color]};
      }
      .wrapper.${color} > .heading > .full-name::before {
        border-right-color: ${colors[color]};
        border-bottom-color: ${colors[color]};
      }
      .wrapper.${color} > .btn-info {
        background: ${colors[color]};
      }
    `).join(' ');

    const sizes = {
      width: '400px',
      minWidth: '150px',
      height: '400px',
      ribbon: '1em'
    };

    const styleSection = `
      <style>
        .wrapper {
          position: relative;
          
          width: 100%;
          max-width: ${sizes.width};
          min-width: ${sizes.minWidth};
          height: auto;
          max-height: ${sizes.height};

          margin: 1em;
          padding: 0;
        }
        
        .heading {
          position: relative;
          display: block;
          width: 100%;
          height: 100%;
          z-index: 5;
        }
        .heading > .profile-image {
          display: block;
          width: 100%;
          height: auto;
          opacity: 1;
          transition: opacity 0.5s ease;
        }
        .heading > .full-name {
          position: absolute;
          left: -${sizes.ribbon};
          border-left: solid ${sizes.ribbon} transparent;
          
          width: 100%;
          padding: 0.5em 0;
          background: transparent;
          color: rgba(255,255,255, 0.8);
          box-shadow: 3px 3px 6px rgba(0,0,0, 0.2);

          animation: animateRibbonDown 0.5s forwards;
        }
        .heading > .full-name::before {
          content: ' ';
          position: absolute;
          top: -${sizes.ribbon};
          left: -${sizes.ribbon};
          width: 0; 
          height: 0; 
          border: solid 0.5em; 

          border-top-color: transparent;
          border-left-color: transparent;

          opacity: 0.8;
          filter: brightness(0.8);
          transition: opacity 0.3s ease;
        }

        .btn-info {
          position: absolute;
          top: 0.2em;
          right: 0.2em;
          margin: 2px;
          padding: 2px;
          width: 40px;
          height: 40px;
          overflow: hidden;
          border-radius: 50%;
          border: solid 2px #ffffff;
          cursor: pointer;
          z-index: 15;
        }

        .btn-info > img {
          display: block;
          width: 100%;
          height: auto;
          box-sizing: border-box;
        }
        img.info { display: block }
        img.close { display: none; }

        ${headingColorStyles}

        .content {
          position: absolute;
          top: 0; left: 0;
          display: block;
          z-index: 10;
          width: 100%; height: 100%;
          padding: 3em 0.5em 0.5em 0.5em;
          box-sizing: border-box;
          background: rgba(0,0,0, 0.1);
          font-size: 0.85em;
          overflow: auto;
          
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .content p {
          margin: 0 0 1em 0;
        }

        .detail > .heading > .profile-image {
          opacity: 0;
        }
        .detail > .heading > .full-name {
          color: #ffffff;
          animation: animateRibbonUp 0.5s forwards;
        }
        .detail > .heading > .full-name::before {
          opacity: 0;
        }
        .detail > .content {
          opacity: 1;
        }

        .detail > .btn-info {
          border-width: 3px;
          top: 2em;
        }
        .detail > .btn-info > img.info { display: none; }
        .detail > .btn-info > img.close { display: block; }
                
        @keyframes animateRibbonUp {
          0% {
            top: 100%;
            bottom: 0;
          }
          99% {
            top: 0;
            bottom: 90%;
          }
          100% {
            top: 0;
            bottom: auto;
          }
        }

        @keyframes animateRibbonDown {
          0% {
            top: 0;
            bottom: auto;
          }
          1% {
            top: auto;
            bottom: 99%;
          }
          100% {
            bottom: 0;
          }
        }
      </style>
    `;  //end style

    const htmlSection = `
    <div class="wrapper">
      <div class="heading">
        <span class="full-name"></span>
        <img class="profile-image" src="https://picsum.photos/200" alt="placeholder" />
      </div>
      <button type="button" class="btn-info">
        <img class="info" src="/icons/profile-card-icon.info.png" alt="information icon" />
        <img class="close" src="/icons/profile-card-icon.close.png" alt="close icon" />
      </button>
      <div class="content"></div>
    </div>
    `;  //end html

    const template = document.createElement('template');
    template.innerHTML = `
        ${styleSection}
        ${htmlSection}
    `;

    return template;
}

