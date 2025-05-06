setTimeout(() => {
  let count = 0;

  function increment() {
    count++;
    document.getElementById("count").innerText = count;
  }

  function reset() {
    count = 0;
    document.getElementById("count").innerText = count;
    document.getElementById("count").style.color = "#3498db";
  }

  document.getElementById("incrementBtn").addEventListener("click", increment);
  document.getElementById("resetBtn").addEventListener("click", reset);
}, 200);