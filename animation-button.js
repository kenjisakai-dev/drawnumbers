const buttonsWrapper = document.querySelectorAll(".button-wrapper");

buttonsWrapper.forEach((buttonWrapper) => {
  let runningAnimationGradientFade = false;

  buttonWrapper.addEventListener("mouseenter", () => {
    if (!runningAnimationGradientFade) {
      buttonWrapper.style.setProperty("--before-gradient", "-1");
      buttonWrapper.style.setProperty("--border-inset", "-1.6px");

      buttonWrapper.classList.add("is-animating");

      runningAnimationGradientFade = true;
    }
  });

  buttonWrapper.addEventListener("animationend", (event) => {
    if (event.animationName === "gradientFade") {
      buttonWrapper.style.setProperty("--before-gradient", "1");
      buttonWrapper.style.setProperty("--border-inset", "0");

      buttonWrapper.classList.remove("is-animating");
      void buttonWrapper.offsetWidth;

      runningAnimationGradientFade = false;
    }
  });
});
