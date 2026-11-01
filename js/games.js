// Shrinks embedded games to fit narrow windows. The games keep their real size,
// and only the iframe is scaled down. It never scales up past 100%.

function scaleGames() {
  const wrappers = document.querySelectorAll(".game-scale");

  wrappers.forEach((wrapper) => {
    const gameWidth = Number(wrapper.dataset.width);
    const gameHeight = Number(wrapper.dataset.height);
    const frame = wrapper.querySelector("iframe");

    // The space available is the content width of the page container.
    const container = wrapper.closest(".container");
    const style = getComputedStyle(container);
    const padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    const availableWidth = container.clientWidth - padding;

    // Never scale above 1, so the game doesn't get blurry.
    let scale = availableWidth / gameWidth;
    if (scale > 1) {
      scale = 1;
    }

    frame.style.transform = "scale(" + scale + ")";
    wrapper.style.width = gameWidth * scale + "px";
    wrapper.style.height = gameHeight * scale + "px";
  });
}

scaleGames();
window.addEventListener("resize", scaleGames);
