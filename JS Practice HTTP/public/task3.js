async function GetAllItems() { 
  const response = await fetch("/api/v1/items", {
      method: "GET",
      headers: { "Accept": "application/json" }
  });
  if (response.ok === true) {
      const items = await response.json();
      MakeNewItems(items);
  }
}
async function CreateItem(itemName, itemPrice, itemDesc) {
  const response = await fetch("api/v1/items", {
          method: "POST",
          headers: { "Accept": "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({
              itemName: itemName,
              itemPrice: itemPrice,
              itemDesc: itemDesc
          })
      });
      if (response.ok === true) {
          reset();
          GetAllItems();
      }
}
async function DeleteItem(id) {
  const response = await fetch("/api/v1/items/" + id, {
      method: "DELETE",
      headers: { "Accept": "application/json" }
  });
  if (response.ok === true) 
  {
    reset();
    GetAllItems();
  }
}
async function EditItem(id, itemName, itemPrice, itemDesc) {
  const response = await fetch("api/v1/items/" + id, {
          method: "PUT",
          headers: { "Accept": "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({
              itemName: itemName,
              itemPrice: itemPrice,
              itemDesc: itemDesc
          })
      });
      if (response.ok === true) {
          reset();
          GetAllItems();
      }
}

function MakeNewItems(items)
{
  const table = document.querySelector(".itemsTable tbody");
  
  const rows = table.querySelectorAll("tr");
  for (let i = 1; i < rows.length; i++) {
    table.removeChild(rows[i]);
  }

  items.forEach(item => {   
    const row = document.createElement("tr");

    const idCell = document.createElement("td");
    idCell.textContent = item.id;
    row.appendChild(idCell);

    const nameCell = document.createElement("td");
    nameCell.textContent = item.itemName;
    row.appendChild(nameCell);

    const priceCell = document.createElement("td");
    priceCell.textContent = item.itemPrice;
    row.appendChild(priceCell);

    const descCell = document.createElement("td");
    descCell.textContent = item.itemDesc;
    row.appendChild(descCell);

    table.appendChild(row);
  });
}
  
document.forms["addForm"].addEventListener("submit",  e => {
e.preventDefault();
const form = document.forms["addForm"];
const nickname = form.elements["nickname"].value;
const login = form.elements["login"].value;
const password = form.elements["password"].value;
                            
CreateItem(nickname, login, password);  
});

document.forms["deleteForm"].addEventListener("submit",  e => {
  e.preventDefault();
  const form = document.forms["deleteForm"];
  const id = form.elements["id"].value;
                              
  DeleteItem(id);  
});

document.forms["editForm"].addEventListener("submit",  e => {
  e.preventDefault();
  const form = document.forms["editForm"];
  const id = form.elements["id"].value;
  const nickname = form.elements["nickname"].value;
  const login = form.elements["login"].value;
  const password = form.elements["password"].value;
                              
  EditItem(id, nickname, login, password);  
  });

function reset() {
    const form1 = document.forms["addForm"];
    const form2 = document.forms["editForm"];
    const form3 = document.forms["deleteForm"];
    form1.reset();
    form2.reset();
    form3.reset();
}

GetAllItems();