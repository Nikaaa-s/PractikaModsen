var modal = document.getElementById('myModal');

function showMessage(message) {
  var messageElement = document.getElementById('message');
  messageElement.textContent = message;

  modal.style.display = "none";
  modal.style.opacity = "0";
  
  setTimeout(function() {
    modal.style.display = "block";
    modal.style.opacity = "1";
  }, 200);
}

// close when outside
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.opacity = "0";
    setTimeout(function() {
      modal.style.display = "none";
    }, 1500);
  }
}