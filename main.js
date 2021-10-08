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
