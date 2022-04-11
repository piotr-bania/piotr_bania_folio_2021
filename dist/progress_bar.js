// Progress bar
var progressSection = document.querySelector('.progressSection');
var progressBar = document.querySelector('.progressBar');
var progressNum = document.querySelector('.progressNum');
var x, y;

function updateProgressBar() {
  progressBar.style.height = "".concat(getScrollPercentage(), "%");
  progressNum.innerText = "".concat(Math.ceil(getScrollPercentage()), "%");
  requestAnimationFrame(updateProgressBar);
}

function getScrollPercentage() {
  return window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
}

updateProgressBar();