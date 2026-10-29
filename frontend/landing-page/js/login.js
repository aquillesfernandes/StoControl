document.addEventListener("DOMContentLoaded", () => {

  const form =
    document.getElementById("loginForm");

  const email =
    document.getElementById("email");

  const password =
    document.getElementById("password");

  const emailError =
    document.getElementById("emailError");

  const passwordError =
    document.getElementById("passwordError");

  const passwordToggle =
    document.getElementById("passwordToggle");

  const loginButton =
    document.getElementById("loginButton");

  const formStatus =
    document.getElementById("formStatus");


  requestAnimationFrame(() => {
    document.body.classList.add("loaded");
  });


  function isValidEmail(value) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  }


  function clearErrors() {

    emailError.textContent = "";
    passwordError.textContent = "";

    email.classList.remove("input-error");
    password.classList.remove("input-error");

    formStatus.textContent = "";
    formStatus.className = "form-status";

  }


  passwordToggle.addEventListener("click", () => {

    const hidden =
      password.type === "password";


    password.type =
      hidden
        ? "text"
        : "password";


    passwordToggle.textContent =
      hidden
        ? "Ocultar"
        : "Mostrar";


    passwordToggle.setAttribute(
      "aria-label",
      hidden
        ? "Ocultar senha"
        : "Mostrar senha"
    );

  });


  form.addEventListener("submit", event => {

    event.preventDefault();

    clearErrors();

    let valid = true;


    if (!email.value.trim()) {

      emailError.textContent =
        "Informe seu e-mail.";

      email.classList.add("input-error");

      valid = false;

    } else if (
      !isValidEmail(
        email.value.trim()
      )
    ) {

      emailError.textContent =
        "Digite um e-mail válido.";

      email.classList.add("input-error");

      valid = false;

    }


    if (!password.value) {

      passwordError.textContent =
        "Informe sua senha.";

      password.classList.add("input-error");

      valid = false;

    } else if (
      password.value.length < 6
    ) {

      passwordError.textContent =
        "A senha deve possuir pelo menos 6 caracteres.";

      password.classList.add("input-error");

      valid = false;

    }


    if (!valid) {

      formStatus.textContent =
        "Verifique os campos acima.";

      formStatus.classList.add("error");

      return;

    }


    loginButton.disabled = true;

    loginButton.textContent =
      "Entrando...";


    /*
      Simulação de login.

      Quando você criar o backend,
      será aqui que enviaremos os dados
      para a API.
    */

    setTimeout(() => {

      formStatus.textContent =
        "Login validado com sucesso.";

      formStatus.classList.add("success");

      loginButton.textContent =
        "✓ Acesso liberado";


      setTimeout(() => {

        /*
          Futuramente você poderá
          redirecionar para:

          window.location.href =
            "dashboard.html";
        */

        loginButton.disabled = false;

        loginButton.textContent =
          "Entrar";

      }, 1600);

    }, 900);

  });

});