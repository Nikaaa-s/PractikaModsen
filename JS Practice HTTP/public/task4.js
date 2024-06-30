const apiKey = 'live_gFaNVJl2vegEyLf6znyDrQ3OvoYqP6W4xJfHHFKGnB1oxwbfxeNFB3CxePY1vabG';
async function GetSomeCats(limit, isBreed, breedType) { 
  var url = `https://api.thecatapi.com/v1/images/search?limit=${limit}`;

  if(isBreed)
  {
    url = url + "&has_breeds=1";
  }

  if(breedType != "none")
  {
    url = url + `&breed_ids=${breedType}`;
  }

  const response = await fetch(url, {
      method: "GET",
      headers: { "Accept": "application/json", 'x-api-key' : apiKey }
  });
  if (response.ok === true) {
      const cats = await response.json();
      cats.forEach(cat => {
        GetCatInfo(cat);
      });
  }
}

async function GetCatInfo(cat) { 
  const response = await fetch("https://api.thecatapi.com/v1/images/" + cat.id, {
      method: "GET",
      headers: { "Accept": "application/json", 'x-api-key' : apiKey }
  });
  if (response.ok === true) {
      const cat = await response.json();
      MakePost(cat);
  }
}

function MakePost(cat) {
  var post = document.createElement('div');
  var oldPost = document.getElementById("footer");
  var parentDiv = oldPost.parentNode;

  post.id ='newPost';
  post.className = 'post';

  if(cat.breeds == undefined)
  {
    var htmlText = `
      <img src="${cat.url}">
      <div class="text">
        <h1>Cat</h1>
        <hr>
      </div>`;
    }
    else
    {
    var htmlText = `
      <img src="${cat.url}">
      <div class="text">
        <h1>${cat.breeds[0].name}</h1>
        <hr>
        <p class="catDesc"><b>Origin:</b> ${cat.breeds[0].origin}</p>
        <hr>
        <p class="catDesc"><b>Temperament:</b> ${cat.breeds[0].temperament}</p>
        <hr>
        <p class="catDesc"><b>Desciption:</b> ${cat.breeds[0].description}</p>
        <hr>
        <p class="catDesc"><b>Life-Span:</b> ${cat.breeds[0].life_span} years</p>
        <hr>
        <p class="catDesc"><b>Weight:</b> ${cat.breeds[0].weight.metric} kg</p>
        <hr>
        <a href="${cat.breeds[0].wikipedia_url}" class="wikiLink"><b>Wikipedia</b></a>
      </div>`;
    }
  
  post.innerHTML = htmlText;

  parentDiv.insertBefore(post, oldPost);
}

document.forms["filter"].addEventListener("submit",  e => {
  e.preventDefault();
  const form = document.forms["filter"];

  const limit = form.elements["limit"].value;

  const breedCheckbox = form.elements["breed"];
  const isBreed = breedCheckbox.checked;

  const breedType = form.elements["breedType"].value;

  GetSomeCats(limit, isBreed, breedType);
});

if(localStorage.getItem('userToken') != null && localStorage.getItem('userNickname') != null)
{
  var loggedDiv = document.createElement('div');
  var filterForm = document.getElementById("filterForm");
  var parentDiv = filterForm.parentNode;

  loggedDiv.id ='loggedDiv';

  var htmlText = "<a title=\"Account Settings\" id=\"getAllUsers\" class=\"loggedText\">Glad to see you: " + localStorage.getItem('userNickname') + "</a>";
  
  loggedDiv.innerHTML = htmlText;

  parentDiv.insertBefore(loggedDiv, filterForm);
}
else
{
  var notLoggedDiv = document.createElement('div');
  var filterForm = document.getElementById("filterForm");
  var formButton = document.getElementById("submit");
  formButton.disabled = "true";
  formButton.style.opacity = "0.6";
  filterForm.style.cursor = "default";
  var parentDiv = filterForm.parentNode;

  notLoggedDiv.id ='notLoggedDiv';

  var htmlText = "<a class=\"notLogged\" href=\"logIn.html\">Login</a><a class=\"notLogged\" href=\"signUp.html\">Sign Up</a>";
  
  notLoggedDiv.innerHTML = htmlText;

  parentDiv.insertBefore(notLoggedDiv, filterForm);
}

getAllUsers = document.querySelector(".loggedText");
getAllUsers.addEventListener("click", () => {
  GetAllUsers();
})

async function GetAllUsers() { 
  const response = await fetch("/api/v1/users", {
      method: "GET",
      headers: { "Accept": "application/json"}
  });
}

