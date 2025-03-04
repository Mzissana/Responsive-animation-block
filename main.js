const textBlocks = document.getElementsByClassName('block__text');
const svgBlock = document.querySelector('.block__svg');

const textCoordinates = [
  "5 28",
  "5 58",
  "140 58",
  "44 88",
  "138 88",
  "5 118",
  "130 118",
  "5 148",
  "80 148",
  "5 178"
];

function setTextPosition(textElement, x, y) {
  textElement.setAttribute('x', x);
  textElement.setAttribute('y', y);
}

function getCurrentDevice() {
  return window.matchMedia('(min-width: 768px)').matches ? 'desktop' : 'tablet';
}

function updateTextPositions() {
  const currentDevice = getCurrentDevice();
  const textArray = Array.from(textBlocks);
  
  svgBlock.setAttribute("viewBox", currentDevice === 'desktop' ? "0 0 400 210" : "0 0 210 400");

  textArray.forEach((block, i) => {
    if (currentDevice === 'desktop') {
      const originalX = block.getAttribute('data-original-x');
      const originalY = block.getAttribute('data-original-y');
      setTextPosition(block, originalX, originalY);
    } else {
      const [x, y] = textCoordinates[i].split(' ');
      setTextPosition(block, x, y);
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const textArray = Array.from(textBlocks);
  textArray.forEach((block) => {
    const x = block.getAttribute('x');
    const y = block.getAttribute('y');
    block.setAttribute('data-original-x', x);
    block.setAttribute('data-original-y', y);
  });

  updateTextPositions();
});

window.addEventListener('resize', updateTextPositions);