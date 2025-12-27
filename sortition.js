const form = document.querySelector(".content-form form");
const drawElement = document.getElementById("number-draw");
const initialElement = document.getElementById("number-initial");
const finalElement = document.getElementById("number-final");
const repeatElement = document.getElementById("number-repeat");

const contentForm = document.querySelector(".content-form");
const contentSortition = document.querySelector(".content-sortition");

const resultSortition = document.querySelector(".result-sortition");

const drawAgain = document.getElementById("draw-again");
const btnDrawAgain = document.querySelector("#draw-again button");

const txtOverlineContentSortition = document.querySelector(
  ".content-sortition header .txt-overline-result"
);

const questionContentMobile = document.querySelector(
  ".question-content.mobile"
);

form.addEventListener("input", (event) => {
  if (event.target.tagName !== "INPUT") return;

  function defaultInput(input) {
    return input.value.replace(/\D/g, "");
  }

  const target = event.target;
  target.setCustomValidity("");

  drawElement.value = defaultInput(drawElement);
  initialElement.value = defaultInput(initialElement);
  finalElement.value = defaultInput(finalElement);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const drawValue = Number(drawElement.value);
  const initialValue = Number(initialElement.value);
  const finalValue = Number(finalElement.value);
  const noRepeatNumbers = repeatElement.checked;

  if (!verifyForm(drawValue, initialValue, finalValue, noRepeatNumbers)) {
    form.reportValidity();
    return;
  }

  clearInputsForm();

  contentForm.classList.add("hidden");
  contentSortition.classList.remove("hidden");

  const drawNumbers = sortitionNumbers(
    drawValue,
    initialValue,
    finalValue,
    noRepeatNumbers
  );

  playDraw(drawNumbers);
});

function verifyForm(drawValue, initialValue, finalValue, noRepeatNumbers) {
  drawElement.setCustomValidity("");
  initialElement.setCustomValidity("");
  finalElement.setCustomValidity("");

  const interval = finalValue - initialValue + 1;

  if (drawValue < 1 || drawValue > 4) {
    drawElement.setCustomValidity(
      "Digite a quantidade entre 1 a 4 de números a ser sorteados!"
    );
    return false;
  }

  if (initialValue < 1 || initialValue > 98) {
    initialElement.setCustomValidity(
      "Digite o número inicial entre 1 a 98 a ser sorteados!"
    );
    return false;
  }

  if (finalValue < 2 || finalValue > 99) {
    finalElement.setCustomValidity(
      "Digite o número final entre 2 a 99 a ser sorteados!"
    );
    return false;
  }

  if (initialValue >= finalValue) {
    finalElement.setCustomValidity(
      "Digite um número final maior que o valor inicial!"
    );
    return false;
  }

  if (noRepeatNumbers && interval < drawValue) {
    finalElement.setCustomValidity(
      "Digite um intervalo maior que a quantidade de números a ser sorteados!"
    );
    return false;
  }

  return true;
}

function clearInputsForm() {
  drawElement.value = "";
  initialElement.value = "";
  finalElement.value = "";
}

function sortitionNumbers(
  drawValue,
  initialValue,
  finalValue,
  noRepeatNumbers
) {
  const drawNumbers = [];

  let i = 0;

  while (i < drawValue) {
    const random = Math.floor(
      Math.random() * (finalValue - initialValue + 1) + initialValue
    );

    if (!noRepeatNumbers || !drawNumbers.includes(random)) {
      drawNumbers.push(random);
      i++;
    }
  }

  return drawNumbers;
}

function createElementDrawNumber(drawNumber) {
  const resultNumber = document.createElement("div");
  resultNumber.classList.add("result-number");

  const resultNumberAnimation = document.createElement("div");
  resultNumberAnimation.classList.add("result-number-animation");

  const txtResultNumber = document.createElement("span");
  txtResultNumber.classList.add("txt-result-number");
  txtResultNumber.textContent = drawNumber;

  resultNumber.append(resultNumberAnimation, txtResultNumber);
  resultSortition.append(resultNumber);

  return { resultNumber, resultNumberAnimation, txtResultNumber };
}

async function playDraw(drawNumbers) {
  if (window.innerWidth < 1280) {
    questionContentMobile.style.marginBottom = "5.687rem";
  }

  for (const [index, number] of drawNumbers.entries()) {
    txtOverlineContentSortition.textContent = `${index + 1}° RESULTADO`;
    const elementResultNumbers = createElementDrawNumber(number);
    await animationDrawNumber(elementResultNumbers);
    smoothCenterReflow();
  }

  drawAgain.classList.add("visible");

  if (window.innerWidth >= 768) {
    contentSortition.style.transition = "transform 1s";
    contentSortition.style.transform = "translateY(3.687rem)";
  }
}

function animationDrawNumber(el) {
  return new Promise((resolve) => {
    const resultNumberAnimation = el.resultNumberAnimation;
    const txtResultNumber = el.txtResultNumber;

    resultNumberAnimation.classList.add("animate-result-number-animation");
    txtResultNumber.classList.add("animate-txt-result-number");

    resultNumberAnimation.addEventListener(
      "animationend",
      () => {
        resolve();
      },
      { once: true }
    );
  });
}

btnDrawAgain.addEventListener("click", (event) => {
  event.preventDefault();

  resultSortition.innerHTML = "";

  contentForm.classList.remove("hidden");
  contentSortition.classList.add("hidden");
  drawAgain.classList.remove("visible");
  contentSortition.style.transform = "";
});

document.addEventListener("DOMContentLoaded", () => {
  resultSortition.innerHTML = "";

  contentForm.classList.remove("hidden");
  contentSortition.classList.add("hidden");
  drawAgain.classList.remove("visible");

  if (window.innerWidth >= 768) {
    contentSortition.style.transform = "translateY(6.687rem)";
  }

  drawElement.value = "";
  initialElement.value = "";
  finalElement.value = "";
});

function smoothCenterReflow() {
  const items = [...resultSortition.children];

  const firstRects = items.map((el) => el.getBoundingClientRect());

  requestAnimationFrame(() => {
    const lastRects = items.map((el) => el.getBoundingClientRect());

    items.forEach((item, i) => {
      const dx = firstRects[i].left - lastRects[i].left;

      if (dx === 0) return;

      item.style.transform = `translateX(${dx}px)`;
      item.style.transition = "transform 0s";

      requestAnimationFrame(() => {
        item.style.transition = "transform 250ms ease";
        item.style.transform = "translateX(0)";
      });
    });
  });
}
