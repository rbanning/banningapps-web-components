import { TooltipComponent } from "./components";

export const init = () => {

  window.onload = () => {
    const toggleAttr = document.getElementById("toggleFancyTooltipAttr");
    if (toggleAttr) {
      toggleAttr.addEventListener('click', () => {
        const colorEl = document.getElementById('v1-color') as HTMLInputElement;
        const bgEl = document.getElementById('v1-bg') as HTMLInputElement;
        const tip = document.getElementById("fancy-tooltip") as TooltipComponent;
        if (tip && colorEl && bgEl) {
          tip.setAttribute("tip_background", bgEl.value);
          tip.setAttribute("tip_color", colorEl.value); 
          tip.toggle(true); 
        }
      })
    }
  
    const toggleMeth = document.getElementById("toggleFancyTooltipMeth");
    if (toggleMeth) {
      toggleMeth.addEventListener('click', () => {
        const colorEl = document.getElementById('v2-color') as HTMLInputElement;
        const bgEl = document.getElementById('v2-bg') as HTMLInputElement;
        const tip = document.getElementById("fancy-tooltip") as TooltipComponent;
        if (tip) {
          tip.styleTip(colorEl.value, bgEl.value);  
          tip.toggle(true); 
        }
      })
    }
  
  }
}

init();
