// chec if there's local storage color
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {
  // console.log("local storage is not empty you can set it by rote now");
  // console.log(localStorage.getItem("color_option"));
  document.documentElement.style.setProperty("--main-color", mainColors);

  // remove active class from all list item
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    // add active class on element with data-color === local storage item
    if (element.dataset.color === mainColors) {
      //add active class
      element.classList.add("active");
    }
  });
}

// random background option
let backgroundOption = true;

// variable to control the background interval
let bacgroundInterval;

// chek if there's local storage random background item
let bacgroundLocalItem = localStorage.getItem("background_option");

// check if random background local storage is not empty
if (bacgroundLocalItem !== null) {
  if (bacgroundLocalItem === "true") {
    bacgroundLocalItem = true;
  } else {
    bacgroundLocalItem = false;
  }
  console.log(bacgroundLocalItem);

  //remove active class from all spans
  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active");
  });
  if (bacgroundLocalItem === true) {
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

//toggle spin calss on icon
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  //toggle class fa-spain rotation on self
  this.classList.toggle("fa-spin");
  //toggle clss open on main settings box
  document.querySelector(".settings-box").classList.toggle("open");
};

// switch colors
const colorsli = document.querySelectorAll(".colors-list li");
// loop on all list items
colorsli.forEach((li) => {
  // click on evry list items

  li.addEventListener("click", (e) => {
    console.log(e.target.dataset.color);

    // set color on root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color,
    );
    // set color in local storage
    localStorage.setItem("color_option", e.target.dataset.color);
    handelActive(e);
  });
});
// switch bacground option
const randomBackEl = document.querySelectorAll(".random-backgrounds span");
// loop on all spans
randomBackEl.forEach((li) => {
  // click on evry span

  li.addEventListener("click", (e) => {
    handelActive(e);
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(bacgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

// select landing bage element
let landingPage = document.querySelector(".landing-page");

// get Array of Imgs
let imgsArray = ["imag_1.jpg", "imag_2.jpg", "imag_3.jpg", "imag_4.jpg"];

// function to randomize imgs
function randomizeImgs() {
  if (backgroundOption === true) {
    bacgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      landingPage.style.backgroundImage =
        'url("../imags/' + imgsArray[randomNumber] + '")';
      // get random number

      // console.log(randomNumber);
    }, 10000);
  }
}
randomizeImgs();

// Select skills selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // skills offset top
  let skillsOffsetTop = ourSkills.offsetTop;
  // skills outer height
  let skillsOuterHeight = ourSkills.offsetHeight;

  let windowHight = this.innerHeight;

  // window ScrollTop
  let windowScrollTop = this.pageYOffset;

  //if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHight) it not working

  if (windowScrollTop > skillsOffsetTop - windowHight + 100) {
    let allSkills = this.document.querySelectorAll(
      ".skill-box .skill-progress span",
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

//  create popup whith image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // create oveerlay element
    let overlay = document.createElement("div");

    // add class to overlay
    overlay.className = "popup-overlay";
    // append overlay to th e body
    document.body.appendChild(overlay);

    // create the popup
    let popupBox = document.createElement("div");

    // class to thepopup box
    popupBox.className = "popup-box";
    if (img.alt !== null) {
      // creatate heding
      let imgHeading = document.createElement("h3");

      // create text for heading
      let imgText = document.createTextNode(img.alt);

      // append the text to the heading
      imgHeading.appendChild(imgText);
      // append the heading to the popup box
      popupBox.appendChild(imgHeading);
    }
    // create the image
    let popupImage = document.createElement("img");
    // set image source
    popupImage.src = img.src;

    // add image to popup box
    popupBox.appendChild(popupImage);
    // append the popup box to body
    document.body.appendChild(popupBox);

    // create the close span
    let closeButton = document.createElement("span");

    // create the class text button text
    let closebuttonText = document.createTextNode("X");
    // append text to close button
    closeButton.appendChild(closebuttonText);
    // add class to close button
    closeButton.className = "close-button";
    // add close button to the popup box
    popupBox.appendChild(closeButton);
  });
});
// close popup
document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    // remove the current popup
    e.target.parentNode.remove();
    // remove overlay
    document.querySelector(".popup-overlay").remove();
  }
});
// select all bullets
const allbullts = document.querySelectorAll(".nav-bullets .bullet");
console.log(allbullts);
allbullts.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// select all links
const allLinks = document.querySelectorAll(".links a");

allLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  });
});

function scrollToSomewhere(element) {
  element.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollToSomewhere(allbullts);
scrollToSomewhere(allLinks);

// handel active state
function handelActive(ev) {
  // remove active class from all childrens
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  // add active class on self{
  ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLoclaItem = localStorage.getItem("pullets_option");

if (bulletLoclaItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletLoclaItem === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";

      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
    handelActive(e);
  });
});

// reset button
document.querySelector(".reset-options").onclick = function () {
  // localStorage.removeItem("bullets_option");
  // localStorage.removeItem("color_option");
  // localStorage.removeItem("background_option");
  localStorage.clear();
  window.location.reload();
};

// toggle menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  // stop propaganda
  e.stopPropagation();
  // Toggle class "menu-active" on button
  this.classList.toggle("menu-active");

  // toggle class "open" on links
  tLinks.classList.toggle("open");
};

// click Anywhere outside menu toggle burtton
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    // check if menu is open
    if (tLinks.classList.contains("open")) {
      // Toggle class "menu-active" on button
      toggleBtn.classList.toggle("menu-active");

      // toggle class "open" on links
      tLinks.classList.toggle("open");
    }
  }
});

// stop propagation on menu
tLinks.onclick = function (e) {
  e.stopPropagation();
};
