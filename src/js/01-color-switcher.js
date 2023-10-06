let interval = null;
let changeColor = false;

const buttons = {
  startButton: document.querySelector('button[data-start]'),
  stopButton: document.querySelector('button[data-stop]'),
};

buttons.startButton.addEventListener('click', fnStartButton);
buttons.stopButton.addEventListener('click', fnStopButton);

function fnStartButton() {
  if (changeColor) return;
  changeColor = true;

  buttons.startButton.disabled = true;

  changeBodyColor();
  interval = setInterval(changeBodyColor, 1000);
}

function changeBodyColor() {
  document.body.style.backgroundColor = getColor();
}

function fnStopButton() {
  if (!changeColor) return;
  changeColor = false;

  clearInterval(interval);
  buttons.startButton.disabled = false;
}

function getColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
