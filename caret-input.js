const inputs = document.querySelectorAll(".input-wrapper input");

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

const CARET_GAP = 4;

// força cursor lógico sempre no final
inputs.forEach((input) => {
  const wrapper = input.closest(".input-wrapper");
  const caret = wrapper.querySelector(".fake-caret");

  function forceCursorToEnd() {
    const end = input.value.length;
    input.setSelectionRange(end, end);
  }

  function updateCaret() {
    const styles = getComputedStyle(input);
    ctx.font = styles.font;

    const paddingLeft = parseFloat(styles.paddingLeft);
    const paddingRight = parseFloat(styles.paddingRight);

    const usableWidth = input.clientWidth - paddingLeft - paddingRight;

    // campo vazio → caret no centro
    if (!input.value) {
      caret.style.left = `${input.clientWidth / 2}px`;
      return;
    }

    const textWidth = ctx.measureText(input.value).width;
    const centerOffset = (usableWidth - textWidth) / 2;

    caret.style.left = `${
      paddingLeft + centerOffset + textWidth + CARET_GAP
    }px`;
  }

  // ======= TRAVAS DE INTERAÇÃO =======

  // foco
  input.addEventListener("focus", () => {
    forceCursorToEnd();
    updateCaret();
  });

  // digitação
  input.addEventListener("input", () => {
    forceCursorToEnd();
    updateCaret();
  });

  // clique do mouse
  input.addEventListener("mousedown", (e) => {
    e.preventDefault();
    input.focus();
    forceCursorToEnd();
    updateCaret();
  });

  // setas ← →
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      forceCursorToEnd();
      updateCaret();
    }
  });

  // mobile / seleção
  input.addEventListener("select", () => {
    forceCursorToEnd();
    updateCaret();
  });
});
