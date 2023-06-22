
import {animate, scroll, inView } from 'https://cdn.skypack.dev/motion';


document.querySelectorAll("section").forEach((item, index) => {
  
  // some really cute code that adds fade-in and fade-out effect for every section
  scroll(animate(item, { opacity: [0, 1, 1, 0] }), {
    target: item,
    offset: ["start end", "center end", "center start", "end start"]
  });

  // changes the font color of the section when more than 80% of it is in the view
  function checkView(isInView) {
    if (isInView) {
      console.log("Here");
      const text = item.querySelectorAll("p");
      if (index !== 0) {
        text.forEach((text) => {
        text.style.color = "rgb(51, 51, 0)";
        });
      }
    } else {
      text.forEach((text) => {
        text.style.color = ""; // Reset to the original color or remove inline style
      });
    }
  }
  inView(item, checkView, { amount: 0.8 })
  
});