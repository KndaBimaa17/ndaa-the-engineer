document.addEventListener("DOMContentLoaded", function () {
  // Navbar Logic
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".navbar-nav a");

  function updateNavbar() {
    const top = window.scrollY;
    sections.forEach((sec) => {
      const offset = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute("id");

      if (top >= offset && top < offset + height) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          document
            .querySelector(`.navbar-nav a[href*='${id}']`)
            .classList.add("active");
        });
      }
    });
  }

  // Realtime Clock
  function clock() {
    const today = new Date();
    let hours = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();
    const hour = hours < 10 ? "0" + hours : hours;
    const minute = minutes < 10 ? "0" + minutes : minutes;
    const second = seconds < 10 ? "0" + seconds : seconds;
    const hourTime = hour > 12 ? hour - 12 : hour;
    const ampm = hour < 12 ? "AM" : "PM";
    const month = today.getMonth();
    const year = today.getFullYear();
    const day = today.getDate();
    const monthList = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const date = `${monthList[month]} ${day}, ${year}`;
    const time = `${hourTime}:${minute}:${second} ${ampm}`;
    document.getElementById("date-time").innerHTML = time;
    setTimeout(clock, 1000);
  }

  // Image Carousel
  const images = [
    "./assets/img/kanda5.png",
    "./assets/img/kanda1.png",
    "./assets/img/kanda6.png",
  ];
  const imgElement = document.getElementById("hero-img");
  let currentImageIndex = 0;

  function changeImage() {
    imgElement.classList.remove("fade-animation");
    imgElement.style.opacity = 0;
    setTimeout(() => {
      imgElement.src = images[currentImageIndex];
      imgElement.classList.add("fade-animation");
      imgElement.style.opacity = 1;
      currentImageIndex = (currentImageIndex + 1) % images.length;
    }, 500);
  }

  imgElement.src = images[currentImageIndex];
  currentImageIndex = (currentImageIndex + 1) % images.length;
  setTimeout(() => {
    changeImage();
    setInterval(changeImage, 4500);
  }, 4500);

  // Scroll Button
  const scrollButton = document.getElementById("scrollButton");
  function updateScrollButton() {
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      scrollButton.style.display = "block";
    } else {
      scrollButton.style.display = "none";
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  scrollButton.addEventListener("click", scrollToTop);

  // Form Validation and Submission
  const form = document.getElementById("my-form");
  const emailInput = document.getElementById("email");
  const submitButton = document.getElementById("submit");
  const loadingIndicator = document.createElement("span");

  loadingIndicator.classList.add("loading");
  submitButton.appendChild(loadingIndicator);

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const email = emailInput.value.trim();

    if (!validateEmail(email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
      return;
    }

    submitButton.disabled = true;
    loadingIndicator.classList.add("active");

    const data = new FormData(form);
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Thanks for your submission!",
        });
        form.reset();
      } else {
        const responseData = await response.json();
        const errorMessages = responseData.errors
          ? responseData.errors.map((error) => error.message).join(", ")
          : "Oops! There was a problem submitting your form.";
        Swal.fire({
          icon: "error",
          title: "Submission Error",
          text: errorMessages,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Error",
        text: "Oops! There was a problem submitting your form.",
      });
    } finally {
      submitButton.disabled = false;
      loadingIndicator.classList.remove("active");
    }
  });

  // Popup
  const authorSpan = document.getElementById("author");
  const popup = document.getElementById("popup");
  const closeBtn = document.getElementById("closeBtn");

  authorSpan.addEventListener("click", () => {
    popup.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  // NAVBAR FOR MOBILE
  const navbar = document.querySelector(".navbar-phone");
  const toggleNav = document.querySelector("#toggle-nav");

  toggleNav.addEventListener("click", () => {
    navbar.classList.toggle("show");
  });

  // Close navbar when clicking anywhere on the screen
  document.addEventListener("click", function (event) {
    if (!navbar.contains(event.target) && !toggleNav.contains(event.target)) {
      navbar.classList.remove("show");
    }
  });

  // Combined Scroll Event
  window.onscroll = function () {
    updateNavbar();
    updateScrollButton();
  };

  // Initialize clock
  clock();
});
