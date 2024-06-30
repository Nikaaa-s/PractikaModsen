    async function CreateUser(userNickname, userLogin, userPassword) {
    const response = await fetch("/api/v1/users", {
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({
                nickname: userNickname,
                login: userLogin,
                password: userPassword
            })
        });
        if (response.ok === true) {
            const userTokenAndNickname = await response.json();
            localStorage.setItem('userNickname', userTokenAndNickname.nickname);
            localStorage.setItem('userToken', userTokenAndNickname.token);
        }
        return response.ok;
    }
    async function GetUserLogin(login) {
        const response = await fetch(`/api/v1/users/isLoginExist/${login}`, {
            method: "GET",
            headers: { "Accept": "application/json" }
        });
    
        return response.ok;
    }
    async function GetUserNickname(nickname) {
        const response = await fetch(`/api/v1/users/isNicknameExist/${nickname}`, {
            method: "GET",
            headers: { "Accept": "application/json" }
        });
        return response.ok;
    }
    
    document.forms["userForm"].addEventListener("submit", async e => {
        e.preventDefault();
        const form = document.forms["userForm"];
    
        try {
            const nickname = form.elements["nickname"].value;
            const login = form.elements["login"].value;
            const password = form.elements["password"].value;
    
            const nicknameExists = await GetUserNickname(nickname);
            console.log("nicknameExists:" + nicknameExists);
            if (nicknameExists) 
            {
                showMessage("User with this nickname already exists!");
                return;
            }
    
            const loginExists = await GetUserLogin(login);
            console.log("loginExists:" + loginExists);
            if (loginExists) 
            {
                showMessage("User with this login already exists!");
                return;
            }
    
            const result = await CreateUser(nickname, login, password);
            if (result) 
            {
                reset();
                showMessage("Account was successfully created! Redirecting!");
                setTimeout(function() {
                    window.location.href = 'http://localhost:8080/logIn.html';
                }, 4000);
            } 
            else 
            {
                showMessage("The entered data is not valid!");
            }
        } 
        catch (error) {
            console.error("Error while getting data: ", error);
        }
    });

    function reset() {
        const form = document.forms["userForm"];
        form.reset();
        form.elements["id"].value = 0;
    }
    
    function Hello(){
        showMessage("The minimum length of input fields is 3 characters! Сreate a strong password! (you can not listen to me, because im just a modal window)");
    }