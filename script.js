// REALTIME CLOCK IN PRIMARY SECTION
window.addEventListener("load", () => {
  clock();
  function clock() {
    const today = new Date();

    // get time components
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();

    //add '0' to hour, minute & second when they are less 10
    const hour = hours < 10 ? "0" + hours : hours;
    const minute = minutes < 10 ? "0" + minutes : minutes;
    const second = seconds < 10 ? "0" + seconds : seconds;

    //make clock a 12-hour time clock
    const hourTime = hour > 12 ? hour - 12 : hour;

    // if (hour === 0) {
    //   hour = 12;
    // }
    //assigning 'am' or 'pm' to indicate time of the day
    const ampm = hour < 12 ? "AM" : "PM";

    // get date components
    const month = today.getMonth();
    const year = today.getFullYear();
    const day = today.getDate();

    //declaring a list of all months in  a year
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

    //get current date and time
    const date = monthList[month] + " " + day + ", " + year;
    const time = hourTime + ":" + minute + ":" + second + " " + ampm;

    //combine current date and time
    // const dateTime = date + " - " + time; THIS IS THE CORRECT SYNTAKS
    const dateTime = time;

    //print current date and time to the DOM
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
  setInterval(changeImage, 4500); // Change the interval to 4.5 seconds (4500 milliseconds)
}, 4500);

// END OF HERO SECTION FOR IMG

console.log("Image element: ", imgElement);
console.log("Current image index: ", currentImageIndex);
console.log("Image source: ", images[currentImageIndex]);

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".contact-form form");
  const emailInput = document.getElementById("email");

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  form.addEventListener("submit", function (event) {
    const email = emailInput.value.trim();
    if (!validateEmail(email)) {
      event.preventDefault();
      alert("Please enter a valid email address.");
    }
  });
});


