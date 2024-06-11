// REALTIME CLOCK IN PRIMARY SECTION
window.addEventListener("load", () => {
  clock();
  function clock() {
    const today = new Date();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();
    const hour = hours < 10 ? "0" + hours : hours;
    const minute = minutes < 10 ? "0" + minutes : minutes;
    const second = seconds < 10 ? "0" + seconds : seconds;
    const hourTime = hour > 12 ? hour - 12 : hour;

    if (hour === 0) {
      hour = 12;
    }

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

    const date = monthList[month] + " " + day + ", " + year;
    const time = hourTime + ":" + minute + ":" + second + " " + ampm;
    // const dateTime = date + " - " + time; THIS IS THE CORRECT SYNTAKS
    const dateTime = time;
    document.getElementById("date-time").innerHTML = dateTime;
    setTimeout(clock, 1000);
  }
});
// END REALTIME CLOCK IN PRIMARY SECTION

// SCROLL BUTTON
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 1000 ||
    document.documentElement.scrollTop > 1000
  ) {
    document.getElementById("scrollButton").style.display = "block";
  } else {
    document.getElementById("scrollButton").style.display = "none";
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
// SCROLL BUTTON END

// POP UP START
const authorSpan = document.getElementById("author");
const popup = document.getElementById("popup");
const closeBtn = document.getElementById("closeBtn");

authorSpan.addEventListener("click", function () {
  popup.style.display = "block";
});

closeBtn.addEventListener("click", function () {
  popup.style.display = "none";
});
// POP UP END

// HERO SECTION FOR IMG
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
  setTimeout(function () {
    imgElement.src = images[currentImageIndex];
    imgElement.classList.add("fade-animation");
    imgElement.style.opacity = 1;
    currentImageIndex = (currentImageIndex + 1) % images.length;
  }, 500);
}

imgElement.src = images[currentImageIndex];
currentImageIndex = (currentImageIndex + 1) % images.length;

setTimeout(function () {
  changeImage();
  setInterval(changeImage, 4500); 
}, 4500);

console.log("Image element: ", imgElement);
console.log("Current image index: ", currentImageIndex);
console.log("Image source: ", images[currentImageIndex]);
// END OF HERO SECTION FOR IMG

// Form Logic Start
document.addEventListener("DOMContentLoaded", function () {
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
        headers: {
          Accept: "application/json",
        },
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
        if (responseData.errors) {
          Swal.fire({
            icon: "error",
            title: "Submission Error",
            text: responseData.errors.map((error) => error.message).join(", "),
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Submission Error",
            text: "Oops! There was a problem submitting your form.",
          });
        }
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
});
// Form Logic End

// Navbar Logic Start
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.navbar-nav a');

window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 100;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        document.querySelector(`.navbar-nav a[href*='${id}']`).classList.add('active');
      });
    }
  });
};
// Navbar Logic End
