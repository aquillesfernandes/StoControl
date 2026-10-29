document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     ELEMENTOS
     ========================================================= */

  const menuToggle =
    document.getElementById("menuToggle");

  const navLinks =
    document.getElementById("navLinks");

  const currentDate =
    document.getElementById("currentDate");

  const dateButton =
    document.getElementById("dateButton");

  const chartPeriod =
    document.getElementById("chartPeriod");

  const chartBars =
    document.getElementById("chartBars");

  const sidebarLinks =
    document.querySelectorAll(
      ".sidebar-link[data-section]"
    );

  const dashboard =
    document.getElementById("dashboard");

  const appSections =
    document.querySelectorAll(
      ".app-section"
    );

  const sectionButtons =
    document.querySelectorAll(
      "[data-open-section]"
    );

  const viewProducts =
    document.getElementById(
      "viewProducts"
    );


  /* =========================================================
     MENU MOBILE
     ========================================================= */

  if (
    menuToggle &&
    navLinks
  ) {

    menuToggle.addEventListener(
      "click",
      () => {

        const isOpen =
          navLinks.classList.toggle(
            "active"
          );


        menuToggle.setAttribute(
          "aria-expanded",
          String(isOpen)
        );


        menuToggle.textContent =
          isOpen
            ? "✕"
            : "☰";

      }
    );


    navLinks
      .querySelectorAll("a")
      .forEach(link => {

        link.addEventListener(
          "click",
          () => {

            navLinks.classList.remove(
              "active"
            );


            menuToggle.setAttribute(
              "aria-expanded",
              "false"
            );


            menuToggle.textContent =
              "☰";

          }
        );

      });

  }


  /* =========================================================
     FAQ
     ========================================================= */

  const faqButtons =
    document.querySelectorAll(
      ".faq-question"
    );


  faqButtons.forEach(button => {

    button.setAttribute(
      "aria-expanded",
      "false"
    );


    button.addEventListener(
      "click",
      () => {

        const item =
          button.closest(
            ".faq-item"
          );


        if (!item) {
          return;
        }


        const wasOpen =
          item.classList.contains(
            "open"
          );


        document
          .querySelectorAll(
            ".faq-item"
          )
          .forEach(faq => {

            faq.classList.remove(
              "open"
            );


            const faqButton =
              faq.querySelector(
                ".faq-question"
              );


            if (faqButton) {

              faqButton.setAttribute(
                "aria-expanded",
                "false"
              );

            }

          });


        if (!wasOpen) {

          item.classList.add(
            "open"
          );


          button.setAttribute(
            "aria-expanded",
            "true"
          );

        }

      }
    );

  });


  /* =========================================================
     DATA
     ========================================================= */

  if (currentDate) {

    const date =
      new Date();


    currentDate.textContent =
      date.toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "short",
          year: "numeric"
        }
      );

  }


  if (dateButton) {

    dateButton.addEventListener(
      "click",
      () => {

        dateButton.classList.toggle(
          "selected"
        );

      }
    );

  }


  /* =========================================================
     GRÁFICO
     ========================================================= */

  const monthData = [

    [35, 22],
    [55, 36],
    [42, 30],
    [80, 52],
    [62, 45],
    [90, 60],
    [70, 50]

  ];


  const quarterData = [

    [60, 45],
    [78, 50],
    [48, 32],
    [92, 70],
    [65, 48],
    [84, 57],
    [75, 54]

  ];


  function updateChart(data) {

    if (!chartBars) {
      return;
    }


    chartBars.innerHTML =
      "";


    data.forEach(
      ([entry, exit]) => {

        const group =
          document.createElement(
            "div"
          );


        group.className =
          "chart-group";


        const entryBar =
          document.createElement(
            "i"
          );


        entryBar.className =
          "bar-entry";


        entryBar.style.height =
          `${entry}%`;


        const exitBar =
          document.createElement(
            "i"
          );


        exitBar.className =
          "bar-exit";


        exitBar.style.height =
          `${exit}%`;


        group.append(
          entryBar,
          exitBar
        );


        chartBars.appendChild(
          group
        );

      }
    );

  }


  if (chartPeriod) {

    chartPeriod.addEventListener(
      "change",
      () => {

        updateChart(
          chartPeriod.value ===
            "quarter"
            ? quarterData
            : monthData
        );

      }
    );

  }


  /* =========================================================
     NAVEGAÇÃO DO DASHBOARD
     ========================================================= */

  function showSection(
    sectionId
  ) {

    if (!dashboard) {
      return;
    }


    dashboard.classList.remove(
      "active"
    );


    appSections.forEach(
      section => {

        section.classList.remove(
          "active"
        );

      }
    );


    if (
      sectionId ===
      "dashboard"
    ) {

      dashboard.classList.add(
        "active"
      );

    } else {

      const selectedSection =
        document.getElementById(
          sectionId
        );


      if (selectedSection) {

        selectedSection.classList.add(
          "active"
        );

      } else {

        console.warn(
          `A seção "${sectionId}" não foi encontrada.`
        );


        dashboard.classList.add(
          "active"
        );


        sectionId =
          "dashboard";

      }

    }


    sidebarLinks.forEach(
      link => {

        link.classList.toggle(
          "active",
          link.dataset.section ===
            sectionId
        );

      }
    );

  }


  /* =========================================================
     LINKS DA SIDEBAR
     ========================================================= */

  sidebarLinks.forEach(
    link => {

      link.addEventListener(
        "click",
        event => {

          event.preventDefault();


          const sectionId =
            link.dataset.section;


          if (sectionId) {

            showSection(
              sectionId
            );

          }

        }
      );

    }
  );


  /* =========================================================
     BOTÕES PARA ABRIR TELAS
     ========================================================= */

  sectionButtons.forEach(
    button => {

      button.addEventListener(
        "click",
        event => {

          if (
            button.tagName
              .toLowerCase() ===
            "a"
          ) {

            event.preventDefault();

          }


          const sectionId =
            button.dataset
              .openSection;


          if (sectionId) {

            showSection(
              sectionId
            );

          }

        }
      );

    }
  );


  /* Compatibilidade */

  if (
    viewProducts &&
    !viewProducts.dataset
      .openSection
  ) {

    viewProducts.addEventListener(
      "click",
      () => {

        showSection(
          "produtos"
        );

      }
    );

  }


  /* =========================================================
     BUSCA DE PRODUTOS
     ========================================================= */

  const productSearch =
    document.querySelector(
      '#produtos input[type="search"]'
    );


  if (productSearch) {

    productSearch.addEventListener(
      "input",
      () => {

        const searchTerm =
          productSearch.value
            .trim()
            .toLowerCase();


        const productRows =
          document.querySelectorAll(
            "#produtos .product-table-row"
          );


        productRows.forEach(
          row => {

            const rowText =
              row.textContent
                .toLowerCase()
                .trim();


            row.style.display =
              rowText.includes(
                searchTerm
              )
                ? "grid"
                : "none";

          }
        );

      }
    );

  }


  /* =========================================================
     SALVAR CONFIGURAÇÕES
     ========================================================= */

  const settingsSaveButton =
    document.querySelector(
      "#configuracoes .btn-primary"
    );


  if (settingsSaveButton) {

    const originalText =
      settingsSaveButton
        .textContent
        .trim();


    settingsSaveButton.addEventListener(
      "click",
      () => {

        settingsSaveButton.textContent =
          "✓ Alterações salvas";


        settingsSaveButton.disabled =
          true;


        setTimeout(
          () => {

            settingsSaveButton.textContent =
              originalText;


            settingsSaveButton.disabled =
              false;

          },
          1800
        );

      }
    );

  }


  /* =========================================================
     ANIMAÇÃO INICIAL DO HERO
     ========================================================= */

  requestAnimationFrame(
    () => {

      requestAnimationFrame(
        () => {

          document.body.classList.add(
            "page-loaded"
          );

        }
      );

    }
  );


  /* =========================================================
     SCROLL REVEAL
     ========================================================= */

  const revealElements =
    document.querySelectorAll(`
      .dashboard-section,
      .simple-section-heading,
      .value-card,
      .product-highlight-text,
      .highlight-point,
      .price-card,
      .faq-item,
      .final-cta-new
    `);


  revealElements.forEach(
    element => {

      element.classList.add(
        "scroll-reveal"
      );

    }
  );


  /* =========================================================
     ATRASO EM CASCATA
     ========================================================= */

  document
    .querySelectorAll(
      ".value-card"
    )
    .forEach(
      (card, index) => {

        card.dataset.revealDelay =
          String(
            index * 100
          );

      }
    );


  document
    .querySelectorAll(
      ".price-card"
    )
    .forEach(
      (card, index) => {

        card.dataset.revealDelay =
          String(
            index * 120
          );

      }
    );


  document
    .querySelectorAll(
      ".highlight-point"
    )
    .forEach(
      (point, index) => {

        point.dataset.revealDelay =
          String(
            index * 100
          );

      }
    );


  /* =========================================================
     INTERSECTION OBSERVER
     ========================================================= */

  if (
    "IntersectionObserver"
    in window
  ) {

    const revealObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(
            entry => {

              if (
                !entry.isIntersecting
              ) {

                return;

              }


              const element =
                entry.target;


              const delay =
                Number(
                  element.dataset
                    .revealDelay ||
                  0
                );


              element.style
                .transitionDelay =
                `${delay}ms`;


              element.classList.add(
                "visible"
              );


              revealObserver.unobserve(
                element
              );


              /*
                Remove o delay depois
                que a animação terminou.

                Isso impede que o hover
                dos cards fique atrasado.
              */

              window.setTimeout(
                () => {

                  element.style
                    .transitionDelay =
                    "";

                },
                850 + delay
              );

            }
          );

        },
        {

          threshold:
            0.12,

          rootMargin:
            "0px 0px -35px 0px"

        }
      );


    /*
      Dois frames permitem que
      o navegador renderize primeiro
      o estado oculto e depois execute
      a animação.
    */

    requestAnimationFrame(
      () => {

        requestAnimationFrame(
          () => {

            revealElements.forEach(
              element => {

                revealObserver.observe(
                  element
                );

              }
            );

          }
        );

      }
    );

  } else {

    revealElements.forEach(
      element => {

        element.classList.add(
          "visible"
        );

      }
    );

  }


  /* =========================================================
     EFEITO 3D DO DASHBOARD
     ========================================================= */

  const dashboardWindow =
    document.querySelector(
      ".dashboard-window"
    );


  const desktopMode =
    window.matchMedia(
      "(min-width: 701px)"
    );


  const finePointer =
    window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );


  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );


  if (
    dashboardWindow &&
    desktopMode.matches &&
    finePointer.matches &&
    !reducedMotion.matches
  ) {

    dashboardWindow.addEventListener(
      "mousemove",
      event => {

        const rect =
          dashboardWindow
            .getBoundingClientRect();


        const mouseX =
          event.clientX -
          rect.left;


        const mouseY =
          event.clientY -
          rect.top;


        const centerX =
          rect.width / 2;


        const centerY =
          rect.height / 2;


        const rotateY =
          (
            (
              mouseX -
              centerX
            ) /
            centerX
          ) * 1.3;


        const rotateX =
          (
            (
              centerY -
              mouseY
            ) /
            centerY
          ) * 1.3;


        dashboardWindow.style
          .setProperty(
            "--rotate-x",
            `${rotateX}deg`
          );


        dashboardWindow.style
          .setProperty(
            "--rotate-y",
            `${rotateY}deg`
          );


        dashboardWindow.classList.add(
          "dashboard-hover"
        );

      }
    );


    dashboardWindow.addEventListener(
      "mouseleave",
      () => {

        dashboardWindow.style
          .setProperty(
            "--rotate-x",
            "0deg"
          );


        dashboardWindow.style
          .setProperty(
            "--rotate-y",
            "0deg"
          );


        dashboardWindow.classList.remove(
          "dashboard-hover"
        );

      }
    );

  }


  /* =========================================================
     NAVBAR AO ROLAR
     ========================================================= */

  const navbar =
    document.querySelector(
      ".navbar"
    );


  function updateNavbarOnScroll() {

    if (!navbar) {
      return;
    }


    navbar.classList.toggle(
      "navbar-scrolled",
      window.scrollY > 20
    );

  }


  window.addEventListener(
    "scroll",
    updateNavbarOnScroll,
    {
      passive: true
    }
  );


  updateNavbarOnScroll();


  /* =========================================================
     ESTADO INICIAL
     ========================================================= */

  if (dashboard) {

    showSection(
      "dashboard"
    );

  }

});