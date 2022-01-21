import { defineComponents, TooltipComponent } from "./components";
import { User } from "./user";

//Define all the the components
defineComponents();

window.onload = () => {
  const message = document.getElementById("message");
  if (message) {
    const user = new User("Rob Banning", 50);
    message.innerHTML = user.hello();
  }

  const toggleAttr = document.getElementById("toggleFancyTooltipAttr");
  if (toggleAttr) {
    toggleAttr.addEventListener('click', () => {
      const tip = document.getElementById("fancy-tooltip");
      if (tip) {
        tip.setAttribute("tip_background", "#000000");
        tip.setAttribute("tip_color", "#ffffff");  
      }
    })
  }

  const toggleMeth = document.getElementById("toggleFancyTooltipMeth");
  if (toggleMeth) {
    toggleMeth.addEventListener('click', () => {
      const tip = document.getElementById("fancy-tooltip");
      if (tip) {
        (tip as TooltipComponent).styleTip("#0d2d6b", "#3378ff");  
      }
    })
  }


}