import { animate } from "motion";

const wrapperElement = document.querySelector("#boxWrapper");

let width = wrapperElement.clientWidth;
let height = wrapperElement.clientHeight;

animate(
  "#box",
  { x: -((width / 100) * 30), y: -height },
  {
    duration: 4,
    easing: "ease-in-out",
    repeat: Infinity,
  }
);

animate(
  "#smoke",
  {
    scale: 1.005,
    rotate: [0.1, -0.1],
  },
  {
    duration: 2,
    easing: "ease-in-out",
    repeat: Infinity,
    direction: "alternate",
  }
);
