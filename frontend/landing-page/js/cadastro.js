document.addEventListener("DOMContentLoaded", () => {

  const form =
    document.getElementById("registerForm");

  const name =
    document.getElementById("name");

  const company =
    document.getElementById("company");

  const email =
    document.getElementById("email");

  const password =
    document.getElementById("password");

  const confirmPassword =
    document.getElementById("confirmPassword");

  const terms =
    document.getElementById("terms");

  const registerButton =
    document.getElementById("registerButton");

  const formStatus =
    document.getElementById("formStatus");

  const strengthBar =
    document.getElementById("strengthBar");

  const passwordHint =
    document.getElementById("passwordHint");


  const errors = {

    name:
      document.getElementById("nameError"),

    company:
      document.getElementById("companyError"),

    email:
      document.getElementById("emailError"),

    password:
      document.getElementById("passwordError"),

    confirmPassword:
      document.getElementById("confirmPasswordError"),

    terms:
      document.getElementById("termsError")

  };


  requestAnimationFrame(() => {
    document.body.classList.add("loaded");
  });


  function isValidEmail(value) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  }


  function clearErrors() {

    Object.values(errors).forEach(
      element => {

        element.textContent = "";

      }
    );


    document
      .querySelectorAll(
        ".input-error"
      )
      .forEach(input => {

        input.classList.remove(
          "input-error"
        );

      });


    formStatus.textContent = "";
    formStatus.className = "form-status";

  }


  function setError(
    field,
    errorElement,
    message
  ) {

    field.classList.add(
      "input-error"
    );

    errorElement.textContent =
      message;

  }


  /* MOSTRAR / OCULTAR SENHAS */

  document
    .querySelectorAll(
      ".password-toggle"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const targetId =
            button.dataset
              .passwordTarget;


          const input =
            document.getElementById(
              targetId
            );


          const hidden =
            input.type === "password";


          input.type =
            hidden
              ? "text"
              : "password";


          button.textContent =
            hidden
              ? "Ocultar"
              : "Mostrar";

        }
      );

    });


  /* FORÇA DA SENHA */

  password.addEventListener(
    "input",
    () => {

      const value =
        password.value;


      let score = 0;


      if (value.length >= 8) {
        score++;
      }


      if (
        /[A-Z]/.test(value)
      ) {
        score++;
      }


      if (
        /[0-9]/.test(value)
      ) {
        score++;
      }


      if (
        /[^A-Za-z0-9]/.test(value)
      ) {
        score++;
      }


      if (!value) {

        strengthBar.style.width =
          "0%";

        passwordHint.textContent =
          "Use pelo menos 8 caracteres.";

        return;

      }


      if (score === 1) {

        strengthBar.style.width =
          "25%";

        strengthBar.style.background =
          "#ff6b6b";

        passwordHint.textContent =
          "Senha fraca.";

      } else if (
        score === 2
      ) {

        strengthBar.style.width =
          "50%";

        strengthBar.style.background =
          "#f5a623";

        passwordHint.textContent =
          "Senha razoável.";

      } else if (
        score === 3
      ) {

        strengthBar.style.width =
          "75%";

        strengthBar.style.background =
          "#3b91ff";

        passwordHint.textContent =
          "Senha boa.";

      } else {

        strengthBar.style.width =
          "100%";

        strengthBar.style.background =
          "#18c98b";

        passwordHint.textContent =
          "Senha forte.";

      }

    }
  );


  /* ENVIO DO FORMULÁRIO */

  form.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      clearErrors();

      let valid = true;


      if (
        name.value
          .trim()
          .length < 2
      ) {

        setError(
          name,
          errors.name,
          "Informe seu nome."
        );

        valid = false;

      }


      if (
        company.value
          .trim()
          .length < 2
      ) {

        setError(
          company,
          errors.company,
          "Informe o nome da empresa."
        );

        valid = false;

      }


      if (
        !email.value.trim()
      ) {

        setError(
          email,
          errors.email,
          "Informe seu e-mail."
        );

        valid = false;

      } else if (
        !isValidEmail(
          email.value.trim()
        )
      ) {

        setError(
          email,
          errors.email,
          "Digite um e-mail válido."
        );

        valid = false;

      }


      if (
        password.value.length < 8
      ) {

        setError(
          password,
          errors.password,
          "A senha precisa possuir pelo menos 8 caracteres."
        );

        valid = false;

      }


      if (
        confirmPassword.value !==
        password.value
      ) {

        setError(
          confirmPassword,
          errors.confirmPassword,
          "As senhas não coincidem."
        );

        valid = false;

      }


      if (!terms.checked) {

        errors.terms.textContent =
          "Você precisa aceitar os termos.";

        valid = false;

      }


      if (!valid) {

        formStatus.textContent =
          "Revise os campos informados.";

        formStatus.classList.add(
          "error"
        );

        return;

      }


      registerButton.disabled =
        true;


      registerButton.textContent =
        "Criando conta...";


      /*
        Simulação de cadastro.

        Futuramente este trecho
        será substituído por uma
        requisição para o backend.
      */

      setTimeout(
        () => {

          formStatus.textContent =
            "Conta criada com sucesso!";


          formStatus.classList.add(
            "success"
          );


          registerButton.textContent =
            "✓ Conta criada";


          setTimeout(
            () => {

              window.location.href =
                "login.html";

            },
            1400
          );

        },
        1000
      );

    }
  );

});