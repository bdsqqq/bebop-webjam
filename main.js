import { animate } from "motion";

const wrapperElement = document.querySelector("#boxWrapper");

let width = wrapperElement.clientWidth;
let height = wrapperElement.clientHeight;

animate(
  "#swordfish",
  { y: -height * 2.5 },
  {
    duration: 25,
    easing: "linear",
    repeat: Infinity,
  }
);

animate(
  "#pulse",
  {
    y: [-1, 1],
    scale: 1.02,
  },
  {
    duration: 1,
    easing: "ease-in-out",
    repeat: Infinity,
    direction: "alternate",
  }
);

animate(
  "#smokesvg",
  {
    scale: 1.02,
    rotate: [0.4, 0],
  },
  {
    duration: 2,
    easing: "ease-in-out",
    repeat: Infinity,
    direction: "alternate",
  }
);
