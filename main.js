
import {animate, scroll, inView, stagger } from 'https://cdn.skypack.dev/motion';


document.querySelectorAll("section").forEach((item, index) => {
  // some really cute code that adds fade-in and fade-out effect for every section
  scroll(animate(item, { opacity: [0, 1, 1, 0] }), {
    target: item,
    offset: ["start end", "center end", "center start", "end start"]
  });

  const text = item.querySelector(".content");

  // more cute and simple code to change the color of the text in section when it comes into view <3
  if (index !== 0 && text) {
    console.log(text);
    scroll(animate(text, { color: ["rgb(33,23,31)", "rgb(51, 51, 0)", "rgb(51, 51, 0)", "rgb(33,23,31)"] }), {
      target: text,
      offset: ["center end", "end end", "start start", "center start"],
    });
}

  

  // // changes the font color of the section when more than 80% of it is in the view
  // function checkView(isInView) {
  //   if (isInView) {
  //     console.log("Here");
  //     const text = item.querySelectorAll("p");
      
  //     if (index !== 0) {
  //       text.forEach((text) => {
  //       text.style.color = "rgb(51, 51, 0)";
  //       });
  //     }
  //   } else {
  //     console.log("huh");
  //     const text = item.querySelectorAll("p");
  //     text.forEach((text) => {
  //       text.style.color = ""; // Reset to the original color or remove inline style
  //     });
  //   }
  // }

  // console.log(item);
  
  // inView(item, checkView, { amount: 0.9 })
  
});

animate("#id_profile", {opacity: [0, 1]}, {duration: 1, easing: "ease-in"});

// animate("#id_major", {y: -10}, {delay: stagger(0.1),
//   duration: 0.5,
//   easing: "ease-in"})