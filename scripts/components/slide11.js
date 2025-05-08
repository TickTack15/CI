setTimeout(() => {
  document.getElementById("myButton").onclick = function() {
    document.getElementById("myText").innerHTML = "Sie haben den Knopf gedrückt!";
  };
}, 100);