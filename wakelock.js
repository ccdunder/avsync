import NoSleep from "https://esm.sh/nosleep.js";

var noSleep = new NoSleep();

var toggleEl = document.querySelector("#toggle");
toggleEl.addEventListener(
  "click",
  function () {
      noSleep.enable(); // keep the screen on!
      setTimeout(() => {
        if (noSleep.isEnabled) {
          toggleEl.style.backgroundColor = "green";
        } else {
          toggleEl.style.backgroundColor = "red";
        }
      }, 1000);
  },
  false
);
