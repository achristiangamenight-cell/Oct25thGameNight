const demoMode = false;

const flowState = {
  agendaVisible: false,
  surveyVisible: false,
  teamVisible: true,
  precheckComplete: false,
  checkinComplete: false,
};

const unlockDate = new Date("2025-10-25T18:00:00-04:00");

document.addEventListener("DOMContentLoaded", () => {
  setupFloatingGallery();
  setupForm();
  setupPreForm();
  setupLightbox();
  setupCTAButtons();
  setupNav();
  setupPastMedia();
  forceHeadcountActive();
  checkTimeUnlocks();
  setupAgendaAccordion();
  if (demoMode) {
    enableDemoMode();
  }
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

const pastMedia = [
  { type: "image", src: "IMG-20251011-WA0011.jpg" },
  { type: "image", src: "IMG-20251011-WA0014.jpg" },
  { type: "image", src: "IMG-20251011-WA0017.jpg" },
  { type: "image", src: "IMG-20251011-WA0018.jpg" },
  { type: "image", src: "IMG-20251011-WA0021.jpg" },
  { type: "image", src: "IMG-20251011-WA0022.jpg" },
  { type: "image", src: "IMG-20251011-WA0025.jpg" },
  { type: "image", src: "IMG-20251011-WA0026.jpg" },
  { type: "image", src: "IMG-20251011-WA0027.jpg" },
  { type: "image", src: "IMG-20251011-WA0028.jpg" },
  { type: "image", src: "IMG-20251011-WA0029.jpg" },
  { type: "image", src: "IMG-20251011-WA0033.jpg" },
  { type: "image", src: "IMG-20251011-WA0034.jpg" },
  { type: "image", src: "IMG-20251011-WA0035.jpg" },
  { type: "image", src: "IMG-20251011-WA0036.jpg" },
  { type: "image", src: "IMG-20251011-WA0037.jpg" },
  { type: "image", src: "IMG-20251011-WA0038.jpg" },
  { type: "image", src: "IMG-20251011-WA0039.jpg" },
  { type: "image", src: "IMG-20251011-WA0040.jpg" },
  { type: "video", src: "VID-20251011-WA0003.mp4" },
  { type: "video", src: "VID-20251011-WA0004.mp4" },
  { type: "video", src: "VID-20251011-WA0005.mp4" },
  { type: "video", src: "VID-20251011-WA0006.mp4" },
  { type: "video", src: "VID-20251011-WA0007.mp4" },
  { type: "video", src: "VID-20251011-WA0008.mp4" },
  { type: "video", src: "VID-20251011-WA0009.mp4" },
  { type: "video", src: "VID-20251011-WA0010.mp4" },
  { type: "video", src: "VID-20251011-WA0011.mp4" },
  { type: "video", src: "VID-20251011-WA0012.mp4" },
  { type: "video", src: "VID-20251011-WA0013.mp4" },
  { type: "video", src: "VID-20251011-WA0014.mp4" },
  { type: "video", src: "VID-20251011-WA0015.mp4" },
  { type: "video", src: "VID-20251011-WA0016.mp4" },
  { type: "video", src: "VID-20251011-WA0017.mp4" },
  { type: "image", src: "Walk picture.jpg" },
];

let pastMediaItems = [];
let currentMediaIndex = 0;

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
  const surveySection = document.getElementById("survey");

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

    lockSection(agendaSection, "Unlocks at 6:00 PM on Oct 25");
    lockSection(surveySection, "Unlocks at 6:00 PM on Oct 25");

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
    agendaTrigger.hidden = false;
    agendaTrigger.addEventListener("click", () => {
      surveySection.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (surveyTrigger) {
    surveyTrigger.hidden = false;
    surveyTrigger.addEventListener("click", () => {
      teamSection.classList.remove("hidden");
      teamSection.setAttribute("aria-hidden", "false");
      teamSection.scrollIntoView({ behavior: "smooth" });
    });
  }
}

function setupNav() {
  const navLinks = document.querySelectorAll(".site-nav a");

  if (!navLinks.length) return;

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href").replace("#", "");

      if (!targetId) return;
      const destination = document.getElementById(targetId);
      if (!destination) return;
      event.preventDefault();
      destination.scrollIntoView({ behavior: "smooth" });
    });
  });
}

function setupAgendaAccordion() {
  const items = document.querySelectorAll(".agenda-item");
  if (!items.length) return;

  items.forEach((item, index) => {
    const summary = item.querySelector(".agenda-summary");
    if (!summary) return;

    summary.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      items.forEach((other) => other.classList.remove("active"));
      if (!isActive) {
        item.classList.add("active");
      }
    });

    if (index === 0) {
      item.classList.add("active");
    }
  });
}

function nudgeElement(element) {
  if (!element) return;
  element.classList.add("pulse");
  setTimeout(() => {
    element.classList.remove("pulse");
  }, 2400);
}

function enableDemoMode() {
  flowState.agendaVisible = true;
  flowState.surveyVisible = true;
  flowState.teamVisible = true;
  flowState.precheckComplete = true;
  flowState.checkinComplete = true;

  const formStatus = document.getElementById("formStatus");
  const preFormStatus = document.getElementById("preFormStatus");
  const preCheckSection = document.getElementById("pre-check");
  const agendaSection = document.getElementById("agenda");
  const surveySection = document.getElementById("survey");
  const teamSection = document.getElementById("team");
  const agendaTrigger = document.getElementById("agendaTrigger");
  const surveyTrigger = document.getElementById("surveyTrigger");

  unlockSection(preCheckSection);
  [agendaSection, surveySection, teamSection].forEach((section) => {
    if (!section) return;
    unlockSection(section);
  });

  if (agendaTrigger) agendaTrigger.hidden = false;
  if (surveyTrigger) surveyTrigger.hidden = false;
  if (preFormStatus) {
    preFormStatus.textContent = "Demo mode: sections unlocked for preview.";
  }
  if (formStatus) {
    formStatus.textContent = "Demo mode: all sections unlocked for preview.";
  }
}

function setupPreForm() {
  const preForm = document.getElementById("preCheckForm");
  const preStatus = document.getElementById("preFormStatus");
  const checkInSection = document.getElementById("check-in");
  const countdown = document.getElementById("eventCountdown");

  if (!preForm) return;

  startCountdown(countdown);

  preForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!preForm.checkValidity()) {
      preForm.reportValidity();
      return;
    }

    const payload = new FormData(preForm);

    fetch(
      "https://docs.google.com/forms/d/e/1FAIpQLScJrmJPsAhbVvI9aB312jEgprBz4IGrid7bIGaZBZuvF90PNQ/formResponse",
      {
        method: "POST",
        mode: "no-cors",
        body: payload,
      }
    )
      .then(() => {
        preForm.reset();
        flowState.precheckComplete = true;
        if (preStatus) {
          preStatus.textContent = "Thanks for pre-checking! Scroll down when you arrive.";
        }
      })
      .catch(() => {
        if (preStatus) {
          preStatus.textContent = "We couldn’t submit. Please try again.";
        }
      });
  });
}

function unlockSection(section) {
  if (!section) return;
  section.classList.remove("hidden");
  section.setAttribute("aria-hidden", "false");
  if (section.hasAttribute("data-gated")) {
    section.classList.remove("locked", "locked-active");
  }
}

const formReveal = (section) => {
  if (!section) return;
  section.classList.remove("locked");
};

const lockSection = (section, message) => {
  if (!section) return;
  if (message) {
    section.setAttribute("data-locked-message", message);
  }
  section.classList.add("locked", "locked-active");
  section.setAttribute("aria-hidden", "true");
};

function forceHeadcountActive() {
  const pre = document.getElementById("pre-check");
  if (!pre) return;
  pre.classList.remove("locked", "locked-active");
  pre.removeAttribute("data-locked-message");
  pre.setAttribute("aria-hidden", "false");
}

function checkTimeUnlocks() {
  if (localStorage.getItem("unlockTimeReached") === "true") {
    unlockAfterEvent();
    return;
  }
  const now = new Date();
  if (now >= unlockDate) {
    unlockAfterEvent();
    return;
  }

  const msUntilUnlock = unlockDate.getTime() - now.getTime();
  setTimeout(unlockAfterEvent, msUntilUnlock);

  const sections = [
    document.getElementById("check-in"),
    document.getElementById("agenda"),
    document.getElementById("survey"),
  ];

  sections.forEach((section) => {
    if (!section) return;
    lockSection(section, "Unlocks at 6:00 PM on Oct 25");
  });
}

function unlockAfterEvent() {
  const sectionsToUnlock = [
    document.getElementById("check-in"),
    document.getElementById("agenda"),
    document.getElementById("survey"),
  ];

  sectionsToUnlock.forEach((section) => {
    if (!section) return;
    section.classList.remove("locked", "locked-active");
    section.setAttribute("aria-hidden", "false");
    section.removeAttribute("data-locked-message");
  });

  flowState.agendaVisible = true;
  flowState.surveyVisible = true;
  flowState.precheckComplete = true;
  flowState.checkinComplete = true;

  localStorage.setItem("unlockTimeReached", "true");
}

function startCountdown(display) {
  if (!display) return;
  const eventDate = new Date("2025-10-25T18:00:00-04:00").getTime();
  const valueEl = display.querySelector(".countdown-value");

  const updateCountdown = () => {
    const now = Date.now();
    const distance = eventDate - now;

    if (distance <= 0) {
      if (valueEl) {
        valueEl.textContent = "It’s Game Night!";
      } else {
        display.textContent = "It’s Game Night!";
      }
      clearInterval(timer);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const formatted = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    if (valueEl) {
      valueEl.textContent = formatted;
    } else {
      display.textContent = formatted;
    }
  };

  updateCountdown();
  const timer = setInterval(updateCountdown, 1000);
}

function setupPastMedia() {
  const grid = document.getElementById("pastMediaGrid");
  if (!grid) return;

  pastMediaItems = pastMedia;

  pastMedia.forEach((item, index) => {
    if (item.type === "image") {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "media-item";
      button.setAttribute("aria-label", `View past event photo ${index + 1}`);

      const img = document.createElement("img");
      img.src = item.src;
      img.alt = "Past event highlight";
      button.appendChild(img);
      button.addEventListener("click", () => openMediaViewer(item, index));
      grid.appendChild(button);
    } else if (item.type === "video") {
      const wrapper = document.createElement("div");
      wrapper.className = "media-item media-item--video";

      const video = document.createElement("video");
      video.src = item.src;
      video.controls = true;
      video.preload = "metadata";
      video.setAttribute("playsinline", "");
      wrapper.appendChild(video);
      wrapper.addEventListener("click", () => openMediaViewer(item, index));
      grid.appendChild(wrapper);
    }
  });
}

function setupLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  const img = lightbox.querySelector("img");
  const video = lightbox.querySelector("video");
  const closeBtn = lightbox.querySelector(".lightbox-close");
  const prevBtn = lightbox.querySelector(".lightbox-prev");
  const nextBtn = lightbox.querySelector(".lightbox-next");

  const close = () => {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    img.src = "";
    video.pause();
    video.currentTime = 0;
    video.src = "";
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
    } else if (event.key === "ArrowRight" && lightbox.classList.contains("open")) {
      showNextMedia();
    } else if (event.key === "ArrowLeft" && lightbox.classList.contains("open")) {
      showPrevMedia();
    }
  });

  if (prevBtn) prevBtn.addEventListener("click", showPrevMedia);
  if (nextBtn) nextBtn.addEventListener("click", showNextMedia);
}

function openLightbox(src) {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;
  const img = lightbox.querySelector("img");
  img.src = src;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}

function openMediaViewer(item, index) {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  if (!pastMediaItems.length) {
    pastMediaItems = pastMedia;
  }

  currentMediaIndex = index;

  const img = lightbox.querySelector("img");
  const video = lightbox.querySelector("video");

  img.style.display = "none";
  video.style.display = "none";
  video.pause();
  video.currentTime = 0;

  if (item.type === "image") {
    img.src = item.src;
    img.style.display = "block";
  } else {
    video.src = item.src;
    video.style.display = "block";
    video.play();
  }

  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}

function showNextMedia() {
  if (!pastMediaItems.length) return;
  currentMediaIndex = (currentMediaIndex + 1) % pastMediaItems.length;
  openMediaViewer(pastMediaItems[currentMediaIndex], currentMediaIndex);
}

function showPrevMedia() {
  if (!pastMediaItems.length) return;
  currentMediaIndex = (currentMediaIndex - 1 + pastMediaItems.length) % pastMediaItems.length;
  openMediaViewer(pastMediaItems[currentMediaIndex], currentMediaIndex);
}

