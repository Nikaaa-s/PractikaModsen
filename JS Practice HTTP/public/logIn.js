async function GetUser(login, password) {
    const response = await fetch(`/api/v1/users/logging/${login},${password}`, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });

    if(response.ok)
    {
        const userTokenAndNickname = await response.json();
        localStorage.setItem('userNickname', userTokenAndNickname.nickname);
        localStorage.setItem('userToken', userTokenAndNickname.token);
    }
    return response.ok;
}

async function GetUserToken(nickname, token) {
    const response = await fetch(`/api/v1/users/token/${nickname},${token}`, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    return response.ok;
}

async function СheckUserToken() {
    if(localStorage.getItem('userToken') != null && localStorage.getItem('userNickname') != null)
    {
        const isUserTokenCool = await GetUserToken(localStorage.getItem('userNickname'), localStorage.getItem('userToken'));
        console.log(isUserTokenCool);
        if(isUserTokenCool)
        {
            showMessage("Login by token was successful! Redirecting!");

            setTimeout(function () {
                window.location.href = 'http://localhost:8080/task4.html';
            }, 4000);
        }
        else{
            showMessage("Token is not valid! Please, log in by your login and password!");
        }
    }
    else{
        console.log("No saved data");
    }
}

document.forms["userForm"].addEventListener("submit", async e => {
    e.preventDefault();
    const form = document.forms["userForm"];
    const login = form.elements["login"].value;
    const password = form.elements["password"].value;

    try {
        const result = await GetUser(login, password);
        if (result) 
        {
            showMessage("Login was successful! Redirecting!");

            setTimeout(function () {
                window.location.href = 'http://localhost:8080/task4.html';
            }, 3000);
        } 
        else
        {
            showMessage("Login or password entered incorrectly!");
        }
    } 
    catch (error) {
        console.error("Error while getting data: ", error);
    }
});

СheckUserToken();

