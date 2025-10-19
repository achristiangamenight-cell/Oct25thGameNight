const flowState = {
  agendaVisible: false,
  surveyVisible: false,
  teamVisible: false,
};

document.addEventListener("DOMContentLoaded", () => {
  setupFloatingGallery();
  setupForm();
  setupLightbox();
  setupCTAButtons();
  setupNav();
});

const galleryImages = [
  "IMG-20251011-WA0011.jpg",
  "IMG-20251011-WA0014.jpg",
  "IMG-20251011-WA0017.jpg",
  "IMG-20251011-WA0018.jpg",
  "IMG-20251011-WA0019.jpg",
  "IMG-20251011-WA0020.jpg",
  "IMG-20251011-WA0021.jpg",
  "IMG-20251011-WA0022.jpg",
  "IMG-20251011-WA0023.jpg",
  "IMG-20251011-WA0024.jpg",
  "IMG-20251011-WA0025.jpg",
  "IMG-20251011-WA0026.jpg",
  "IMG-20251011-WA0027.jpg",
  "IMG-20251011-WA0028.jpg",
  "IMG-20251011-WA0029.jpg",
  "IMG-20251011-WA0030.jpg",
  "IMG-20251011-WA0031.jpg",
  "IMG-20251011-WA0032.jpg",
  "IMG-20251011-WA0033.jpg",
  "IMG-20251011-WA0034.jpg",
  "IMG-20251011-WA0035.jpg",
  "IMG-20251011-WA0036.jpg",
  "IMG-20251011-WA0037.jpg",
  "IMG-20251011-WA0038.jpg",
  "IMG-20251011-WA0039.jpg",
  "IMG-20251011-WA0040.jpg",
];

function setupFloatingGallery() {
  const gallery = document.getElementById("floatingGallery");
  if (!gallery) return;

  galleryImages.forEach((src) => {
    const button = document.createElement("button");
    button.type = "button";
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Game night moment";
    button.appendChild(img);
    button.addEventListener("click", () => openLightbox(src));
    gallery.appendChild(button);
  });
}

function setupForm() {
  const form = document.getElementById("checkInForm");
  const churchSelect = document.getElementById("churchSelect");
  const otherChurchField = document.getElementById("otherChurchField");
  const formStatus = document.getElementById("formStatus");
  const agendaSection = document.getElementById("agenda");
  const agendaTrigger = document.getElementById("agendaTrigger");

  if (!form || !churchSelect || !otherChurchField) return;

  const toggleOtherField = () => {
    if (churchSelect.value === "other") {
      otherChurchField.classList.add("visible");
      otherChurchField.querySelector("input").setAttribute("required", "");
    } else {
      otherChurchField.classList.remove("visible");
      otherChurchField.querySelector("input").removeAttribute("required");
    }
  };

  churchSelect.addEventListener("change", toggleOtherField);
  toggleOtherField();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    formStatus.textContent = "Thanks! Scroll to see tonight's agenda.";
    agendaSection.classList.remove("hidden");
    agendaSection.setAttribute("aria-hidden", "false");
    flowState.agendaVisible = true;

    agendaSection.scrollIntoView({ behavior: "smooth" });

    if (agendaTrigger) agendaTrigger.hidden = false;

    setTimeout(() => {
      form.reset();
      toggleOtherField();
    }, 400);
  });
}

function setupCTAButtons() {
  const agendaTrigger = document.getElementById("agendaTrigger");
  const surveyTrigger = document.getElementById("surveyTrigger");
  const surveySection = document.getElementById("survey");
  const teamSection = document.getElementById("team");

  if (agendaTrigger) {
    agendaTrigger.hidden = true;
    agendaTrigger.addEventListener("click", () => {
      surveySection.classList.remove("hidden");
      surveySection.setAttribute("aria-hidden", "false");
      flowState.surveyVisible = true;
      if (surveyTrigger) surveyTrigger.hidden = false;
      surveySection.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (surveyTrigger) {
    surveyTrigger.hidden = true;
    surveyTrigger.addEventListener("click", () => {
      teamSection.classList.remove("hidden");
      teamSection.setAttribute("aria-hidden", "false");
      flowState.teamVisible = true;
      teamSection.scrollIntoView({ behavior: "smooth" });
    });
  }
}

function setupNav() {
  const navLinks = document.querySelectorAll(".site-nav a");
  const formStatus = document.getElementById("formStatus");
  const checkInSection = document.getElementById("check-in");
  const agendaSection = document.getElementById("agenda");
  const surveySection = document.getElementById("survey");
  const teamSection = document.getElementById("team");
  const agendaTrigger = document.getElementById("agendaTrigger");
  const surveyTrigger = document.getElementById("surveyTrigger");

  if (!navLinks.length) return;

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href").replace("#", "");

      if (!targetId) return;

      if (targetId === "check-in") {
        event.preventDefault();
        checkInSection.scrollIntoView({ behavior: "smooth" });
        return;
      }

      if (targetId === "agenda" && !flowState.agendaVisible) {
        event.preventDefault();
        if (formStatus) {
          formStatus.textContent = "Submit the form to unlock tonight's agenda.";
        }
        checkInSection.scrollIntoView({ behavior: "smooth" });
        return;
      }

      if (targetId === "survey" && !flowState.surveyVisible) {
        event.preventDefault();
        agendaSection.scrollIntoView({ behavior: "smooth" });
        nudgeElement(agendaTrigger);
        return;
      }

      if (targetId === "team" && !flowState.teamVisible) {
        event.preventDefault();
        surveySection.scrollIntoView({ behavior: "smooth" });
        nudgeElement(surveyTrigger);
        return;
      }

      event.preventDefault();
      const destination =
        targetId === "agenda"
          ? agendaSection
          : targetId === "survey"
          ? surveySection
          : teamSection;
      if (destination) {
        destination.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

function nudgeElement(element) {
  if (!element) return;
  element.classList.add("pulse");
  setTimeout(() => {
    element.classList.remove("pulse");
  }, 2400);
}

function setupLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  const img = lightbox.querySelector("img");
  const closeBtn = lightbox.querySelector(".lightbox-close");

  const close = () => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    img.src = "";
  };

  closeBtn.addEventListener("click", close);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      close();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("open")) {
      close();
    }
  });
}

function openLightbox(src) {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;
  const img = lightbox.querySelector("img");
  img.src = src;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}

