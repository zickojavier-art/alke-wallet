const signupForm = document.getElementById("signupForm");
const message = document.getElementById("message");

signupForm.addEventListener("submit", function(e){

    e.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if(password !== confirmPassword){
        message.textContent = "Las contraseñas no coinciden";
        message.className = "error-message";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let userExists = users.find(user => user.email === email);

    if(userExists){
        message.textContent = "Este correo ya está registrado";
        message.className = "error-message";
        return;
    }

    users.push({
        name,
        email,
        password,
        balance: 0
    });

    localStorage.setItem("users", JSON.stringify(users));

    message.textContent = "Registro exitoso";
    message.className = "success-message";

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1500);

});