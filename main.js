
import {animate, scroll, inView} from 'https://cdn.skypack.dev/motion';

window.onload = () => {
  // prevent FOUC (flash of unstyled content)
  const name = document.getElementById("id_name");
  name.style.visibility = "visible";
  // animate("#id_name", {opacity: [0, 1]}, {duration: 1, easing: "ease-in"});

  const job = document.getElementById("id_job");
  job.style.visibility = "visible";
  // animate("#id_job", {opacity: [0, 1]}, {duration: 1, easing: "ease-in"});

  const profile = document.getElementById("id_profile");
  profile.style.visibility = "visible";
  animate("#id_profile", {opacity: [0, 1]}, {duration: 0.8, easing: "ease-in"});
};



const selflink = document.getElementById("id_selflink");
const selfdesc = document.getElementById("id_selfdesc");
const proofdesc = document.getElementById("id_proofdesc");
const prooflink = document.getElementById("id_prooflink");
const interlink = document.getElementById("id_interlink");
const interdesc = document.getElementById("id_interdesc");
const obfudesc = document.getElementById("id_obfudesc");
const obfulink = document.getElementById("id_obfulink");

selflink.addEventListener("mouseenter", () => {
  animate("#id_selfdesc", {opacity: [0, 1]}, {duration: 0.5, easing: "ease-in"});
  selfdesc.style.display = "block";
});

selflink.addEventListener("mouseleave", () => {
  selfdesc.style.display = "none";
});

prooflink.addEventListener("mouseenter", () => {
  animate("#id_proofdesc", {opacity: [0, 1]}, {duration: 0.5, easing: "ease-in"});
  proofdesc.style.display = "block";
});

prooflink.addEventListener("mouseleave", () => {
  proofdesc.style.display = "none";
});

interlink.addEventListener("mouseenter", () => {
  console.log("huh");
  animate("#id_interdesc", {opacity: [0, 1]}, {duration: 0.5, easing: "ease-in"});
  interdesc.style.display = "block";
});

interlink.addEventListener("mouseleave", () => {
  interdesc.style.display = "none";
});

obfulink.addEventListener("mouseenter", () => {
  console.log("huh");
  animate("#id_obfudesc", {opacity: [0, 1]}, {duration: 0.5, easing: "ease-in"});
  obfudesc.style.display = "block";
});

obfulink.addEventListener("mouseleave", () => {
  obfudesc.style.display = "none";
});


document.querySelectorAll("section").forEach((item, index) => {
  // some really cute code that adds fade-in and fade-out effect for every section
  scroll(animate(item, { opacity: [0, 1, 1, 0] }), {
    target: item,
    offset: ["start end", "center end", "center start", "end start"]
  });

  // more fun code to check when the section comes into view and change the image accordingly
  scroll(() => {
    inView(item, () => {
      
        // console.log("ok");
        if (index == 0) { 
          const image = document.getElementById("id_profile");
          if (image) {
            // animate("#id_profile", {opacity: [0, 1]}, {duration: 1, easing: "ease-in"});
            image.src = "profile.jpeg";
            if (window.innerWidth > 1023) {
              image.style.height = "45vh";
            }
            // } else {
            //   image.style.height = "auto";
            // }
          }
        }
      
      if (index == 1) {
        // console.log("hmm");
        const image = document.getElementById("id_profile");
        if (image) {
            // console.log("here");
            image.src = "filter.gif";
            image.style.height = "auto";
        }
      }
    }, {amount: 1})
  });



  const text = item.querySelector(".content");

  // more cute and simple code to change the color of the text in section when it comes into view <3
  if (index !== 0 && text) {
    // console.log(text);
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


// animate("#id_major", {y: -10}, {delay: stagger(0.1),
//   duration: 0.5,
//   easing: "ease-in"})