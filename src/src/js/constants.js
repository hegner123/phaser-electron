const GameWindow = {
  width: window.visualViewport?.width,
  height: window.visualViewport?.height,
  xCenter: window.visualViewport?.width ? window.visualViewport?.width / 2 : 0,
  yCenter: window.visualViewport?.height
    ? window.visualViewport?.height / 2
    : 0,
};

const leftCode = 37;
const upCode = 38;
const rightCode = 39;
const downCode = 40;

export const keyCodes = {
  left: leftCode,
  up: upCode,
  right: rightCode,
  down: downCode,
};

export const physicsConfig = {
  gravity: { y: 200 },
  speed: 2,
};
export function animationFrame(rowName, frameIndex) {
  const row = 56;
  const frameArray = Array.apply(null, Array(row)).map(function (y, i) {
    return i;
  });
  const spriteSheetConstants = {
    idle: 0,
    idleBounce: row,
    walking: row * 2,
  };
  return spriteSheetConstants[rowName] + frameIndex;
}

let placeholderImageElement = document.createElement("img");
placeholderImageElement.src = "https://via.placeholder.com/150";
placeholderImageElement.id = "placeholder";
placeholderImageElement.style.display = "none";
document.body.appendChild(placeholderImageElement);

export { placeholderImageElement };


export default GameWindow;
