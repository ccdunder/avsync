
Number.prototype.pad = function(n) {
  for (var r = this.toString(); r.length < n; r = 0 + r);
  return r;
};

function lpad(value, padding) {
    var zeroes = new Array(padding+1).join("0");
    return (zeroes + value).slice(-padding);
}

// Get the current time, avoiding system clock changes or skew.
const loadTime = performance.timing.navigationStart;
function getTime(timestamp) {
  return /*performance.now()*/ timestamp + loadTime + offsetMs;
}

// Globals.

const inputField = document.getElementById('offsetMs');

let offsetMs = undefined;
let prevFrameTs = undefined;
let prev = 10;
let curr = 1;
let frameOffset = null;

// Output.

function updateClock(ts) {
  if (ts == null) {
    return;
  }
  let time = getTime(ts);

  const frameNumber = Math.floor((time % 1000) / (1000 / 60)) + 1;

  curr = frameNumber;
  prev = curr == 1 ? 60 : curr - 1;

  const now = new Date();
  now.setTime(time);
  
  console.log(`Frame: ${frameNumber}, Time: ${time % 1000}, ${now.getMilliseconds()}`);

  var milli = now.getMilliseconds(),
    sec = now.getSeconds(),
    min = now.getMinutes(),
    hou = now.getHours();
  var tags = ["h", "m", "s", "mi", "curr"],
    corr = [hou.pad(2), min.pad(2), sec.pad(2), milli.pad(3), curr];
  for (var i = 0; i < tags.length; i++)
    document.getElementById(tags[i]).firstChild.nodeValue = corr[i];
  document.getElementById("miold" + curr).firstChild.nodeValue = lpad(milli, 3);
  document.getElementById("miold" + curr).style.backgroundColor = "red";
  document.getElementById("miold" + prev).style.backgroundColor = "";
}

function updateSubframe(ts) {
  const frameDuration = 1000; // Assuming 60 FPS

  //document.getElementById(`progress-miold${prev}`).value = 0;
  const progressBarEl = document.getElementById(`progress-bar`);
  const elapsedTime = ts - prevFrameTs;
  const progress = Math.min(elapsedTime / frameDuration, 1) * 100;
  progressBarEl.value = progress;
}

// Input.

function updateOffset() {
  offsetMs = parseInt(inputField.value, 10);

  if (isNaN(offsetMs)) {
    alert('Please enter a valid number of milliseconds.');
    return;
  }

  inputField.classList.remove('not-saved');
  inputField.classList.add('saved');
}

// Update on pressing Enter
inputField.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    updateOffset();
  }
});

// Reset the saved state when the input changes
inputField.addEventListener('input', function() {
  inputField.classList.remove('saved');
  inputField.classList.add('not-saved');
});


(function init() {
  updateOffset();
  updateClock();
  function tick(ts) {
    updateClock(ts);
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
  //setInterval("updateSubframe(performance.now())", 1);
})();