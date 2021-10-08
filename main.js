import { animate } from "motion";

const wrapperElement = document.querySelector("#boxWrapper");

let width = wrapperElement.clientWidth;
let height = wrapperElement.clientHeight;

animate(
  "#swordfish",
  { x: -((width / 100) * 30), y: -height },
  {
    duration: 20,
    easing: "linear",
    repeat: Infinity,
  }
);

animate(
  "#smokesvg",
  {
    scale: 1.01,
    rotate: [0.1, -0.1],
  },
  {
    duration: 2,
    easing: "ease-in-out",
    repeat: Infinity,
    direction: "alternate",
  }
);
