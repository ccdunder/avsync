
Number.prototype.pad = function(n) {
  for (var r = this.toString(); r.length < n; r = 0 + r);
  return r;
};

function lpad(value, padding) {
    var zeroes = new Array(padding+1).join("0");
    return (zeroes + value).slice(-padding);
}

// Globals.

const inputField = document.getElementById('offsetMs');

let offsetMs = undefined;

// Output.

function updateClock() {
  var curr = parseInt(document.getElementById("curr").firstChild.nodeValue);

  if (curr==10) curr = 1;
  else curr += 1; 
  let now = new Date();
  // Add offset
  now.setTime(now.getTime() + offsetMs);
  
  var milli = now.getMilliseconds(),
    sec = now.getSeconds(),
    min = now.getMinutes(),
    hou = now.getHours(),
    mo = now.getMonth(),
    dy = now.getDate(),
    yr = now.getFullYear();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var tags = ["mon", "d", "y", "h", "m", "s", "mi", "curr"],
    corr = [months[mo], dy, yr, hou.pad(2), min.pad(2), sec.pad(2), milli.pad(3), curr];
  for (var i = 0; i < tags.length; i++)
    document.getElementById(tags[i]).firstChild.nodeValue = corr[i];
  document.getElementById("miold" + curr).firstChild.nodeValue = lpad(milli, 3)
}
window.updateClock = updateClock;

function init() {
  updateOffset();
  updateClock();
  window.setInterval("updateClock()", 1);
}
window.init = init;


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


