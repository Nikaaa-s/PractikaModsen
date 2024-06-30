async function GetAllUsers() { 
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/", {
      method: "GET",
      headers: { "Accept": "application/json" }
  });
  if (response.ok === true) {
      const users = await response.json();
      users.forEach(user => {
      MakeLot(user);
      });
  }
}

async function MakeLot(user) {
  const post = document.createElement('div');
  const inventoryBottom = document.getElementById("inventoryBottom");
  const parentDiv = inventoryBottom.parentNode;

  post.id = 'inventoryBottom';
  post.className = 'itemLot';

  const htmlText = `
    <div class="text">
      <p class="itemName">UserId: ${user.userId}</p>
      <p class="itemName">Id: ${user.id}</p>
      <p class="itemName">Title: ${user.title}</p>
      <p class="itemName">Completed: ${user.completed}</p>
    </div>`;

  post.innerHTML = htmlText;

  parentDiv.insertBefore(post, inventoryBottom);
}

var userIdInput;
getItemsBtn = document.querySelector(".getItemsBtn");
getItemsBtn.addEventListener("click", () => {
  GetAllUsers();
})