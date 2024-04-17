var file;

document.addEventListener("DOMContentLoaded", function () {
  const icon = document.getElementById("icon-cancel");
  icon.style.display = "none";
  const menu = document.getElementById("menu");
  menu.style.display = "none";

  var leafContainer = document.querySelector(".falling-leaves"),
    leaves = new LeafScene(leafContainer);
  leaves.init();
  leaves.render();

  const isMobile = window.innerWidth <= 1024;
  assignFormsActions(isMobile);
  addHoverEffectToBooks();
  addHoverEffectToExtra();
  addDownloadFileClick();
  addHoverEffectToContact();
  notificationsDisplayNone(isMobile);
  addFormsNotificationClick(isMobile);

  if (!isMobile) {
    toggleModal();
  } else {
    toggleModalMobile();
  }

  file = readJsonFile("../data/data.json");

  /* build anchors */
  const anchors = document.querySelectorAll('a[href^="#"]');
  anchors.forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
      event.preventDefault();
      const target = anchor.getAttribute("href").substring(1);
      if (!isMobile) {
        smoothScroll(target);
      } else {
        smoothScrollMobile(target, 1);
      }
    });
  });
});

function smoothScroll(target) {
  const element = document.getElementById(target);
  if (element) {
    window.scrollTo({
      top: element.offsetTop,
      behavior: "smooth",
    });
  }
}

function smoothScrollMobile(target) {
  const element = document.getElementById(target);
  const allelements = document.querySelectorAll(".menu-item a");
  let point = 0;

  for (i = 0; i < allelements.length; i++) {
    let element = allelements[i];
    let content = document.getElementById(element.id + "_content");
    if (element.id == target) {
      break;
    }
    if (content) {
      point += content.getBoundingClientRect().height;
    }
  }
  if (element) {
    const elementHeight = element.getBoundingClientRect().height;
    window.scrollTo({
      top: point,
      behavior: "smooth",
    });
    point = 0;
  }
}

function toggleMenu(isActive) {
  const iconMenu = document.getElementById("icon-menu");
  const iconCancel = document.getElementById("icon-cancel");
  const menu = document.getElementById("menu");
  if (isActive) {
    // is cancel
    iconMenu.style.display = "inline-block";
    iconCancel.style.display = "none";
    menu.style.display = "none";
  } else {
    iconMenu.style.display = "none";
    iconCancel.style.display = "inline-block";
    menu.style.display = "inline-block";
  }
}

function addHoverEffectToBooks() {
  const allelements = document.querySelectorAll(".book");
  for (i = 0; i < allelements.length; i++) {
    let element = document.getElementById(allelements[i].id);
    element.addEventListener("mouseover", function () {
      var image = element.getElementsByTagName("div")[0];
      image.classList.add("overlay");
      var title = element.getElementsByTagName("div")[1];
      title.classList.add("overlay");
      var button = element.getElementsByTagName("div")[2];
      button.classList.add("overlay");
    });
    element.addEventListener("mouseout", function () {
      var image = element.getElementsByTagName("div")[0];
      image.classList.remove("overlay");
      var title = element.getElementsByTagName("div")[1];
      title.classList.remove("overlay");
      var button = element.getElementsByTagName("div")[2];
      button.classList.remove("overlay");
    });
  }
}

function addHoverEffectToExtra() {
  const allelements = document.querySelectorAll(".coloring .file");
  for (i = 0; i < allelements.length; i++) {
    let element = allelements[i];
    element.addEventListener("mouseover", function () {
      var image = element.getElementsByTagName("div")[0];
      image.classList.add("overlay");
      var button = element.getElementsByTagName("div")[1];
      button.classList.add("overlay");
    });
    element.addEventListener("mouseout", function () {
      var image = element.getElementsByTagName("div")[0];
      image.classList.remove("overlay");
      var button = element.getElementsByTagName("div")[1];
      button.classList.remove("overlay");
    });
  }

  const signUpBt = document.querySelectorAll(
    ".container .news .news_box .signup .form button"
  );
  if (signUpBt.length > 0) {
    let element = signUpBt[0];
    element.addEventListener("mouseover", function () {
      element.classList.add("overlay");
    });
    element.addEventListener("mouseout", function () {
      element.classList.remove("overlay");
    });
  }
}

function addHoverEffectToContact() {
  const bt = document.querySelectorAll(
    ".container .contact .contact_box .contact_form .form button"
  );
  if (bt.length > 0) {
    let element = bt[0];
    element.addEventListener("mouseover", function () {
      element.classList.add("overlay");
    });
    element.addEventListener("mouseout", function () {
      element.classList.remove("overlay");
    });
  }
}

function addDownloadFileClick() {
  const allelements = document.querySelectorAll(".coloring .file");
  for (i = 0; i < allelements.length; i++) {
    const file = allelements[i].id + ".pdf";
    allelements[i].addEventListener("click", function () {
      window.open("../pdf/" + file, "_blank");
    });
  }
}

function addFormsNotificationClick(isMobile) {
  let notification = isMobile
    ? "#contact_notification1"
    : "#contact_notification";
  let signupNotification = isMobile
    ? "#signup_notification1"
    : "#signup_notification";

  const contactFormNot = document.querySelectorAll(notification);
  if (contactFormNot.length > 0) {
    contactFormNot[0].addEventListener("click", function () {
      closeNotification(contactFormNot[0]);
    });
  }

  const signupFormNot = document.querySelectorAll(signupNotification);
  if (signupFormNot.length > 0) {
    signupFormNot[0].addEventListener("click", function () {
      closeNotification(signupFormNot[0]);
    });
  }
}

function toggleModal(element) {
  const modal = document.querySelectorAll(".desktop .modal");
  modal[0].style.display = "none";
  const closeBt = modal[0].querySelector(".close");

  closeBt.addEventListener("click", function (event) {
    modal[0].style.display = "none";
  });

  const books = document.querySelectorAll(".book");
  books.forEach(function (book) {
    book.addEventListener("click", function (event) {
      mapModalFields(event.currentTarget.id);
      modal[0].style.display = "block";
    });
  });

  const bookHome = document.querySelectorAll("#home_book");
  bookHome.forEach(function (book) {
    book.addEventListener("click", function (event) {
      mapModalFields("book_tales");
      modal[0].style.display = "block";
    });
  });
}

function toggleModalMobile(element) {
  const modal = document.querySelectorAll(".mobile .modal");
  modal[0].style.display = "none";
  const closeBt = modal[0].querySelector(".close");

  closeBt.addEventListener("click", function (event) {
    modal[0].style.display = "none";
  });

  const books = document.querySelectorAll("#books1_content .book");
  books.forEach(function (book) {
    book.addEventListener("click", function (event) {
      mapModalFieldsMobile(event.currentTarget.id.replace("1", ""));
      modal[0].style.display = "block";
    });
  });

  const bookHome = document.querySelectorAll("#home_book1");
  bookHome.forEach(function (book) {
    book.addEventListener("click", function (event) {
      mapModalFieldsMobile("book_tales");
      modal[0].style.display = "block";
    });
  });
}

function mapModalFields(id) {
  const books = JSON.parse(file);
  const book = books.filter(function (data) {
    return data.id == id;
  });
  if (book) {
    const title = document.querySelectorAll(".modal .box .template .title")[0];
    const description = document.querySelectorAll(
      ".modal .box .template .description"
    )[0];
    const img = document.querySelectorAll(".modal .box .template .img")[0];
    const button = document.querySelectorAll(
      ".modal .box .template .button"
    )[0];
    title.innerHTML = book[0].title;
    description.innerHTML = book[0].description;
    button.setAttribute("href", book[0].link);
    img.style.backgroundImage = "url('" + book[0].img + "')";
  }
}

function mapModalFieldsMobile(id) {
  const books = JSON.parse(file);
  const book = books.filter(function (data) {
    return data.id == id;
  });
  if (book) {
    const title = document.querySelectorAll(
      ".mobile .modal .box .template .title"
    )[0];
    const description = document.querySelectorAll(
      ".mobile .modal .box .template .description"
    )[0];
    const img = document.querySelectorAll(
      ".mobile .modal .box .template .img"
    )[0];
    const button = document.querySelectorAll(
      ".mobile .modal .box .template .button"
    )[0];
    title.innerHTML = book[0].title;
    description.innerHTML = book[0].short_description;
    button.setAttribute("href", book[0].link);
    img.style.backgroundImage = "url('" + book[0].img + "')";
  }
}

function readJsonFile(path) {
  var request = new XMLHttpRequest();
  request.open("GET", path, false);
  request.send(null);
  var my_JSON_object = JSON.parse(JSON.stringify(request.responseText));
  return my_JSON_object;
}

function notificationsDisplayNone(isMobile) {
  let contact = document.getElementById(
    isMobile ? "contact_notification1" : "contact_notification"
  );
  if (contact) {
    contact.style.display = "none";
  }
  let signup = document.getElementById(
    isMobile ? "signup_notification1" : "signup_notification"
  );
  if (signup) {
    signup.style.display = "none";
  }
}

function closeNotification(element) {
  element.style.display = "none";
}

/* send emails */
function assignFormsActions(isMobile) {
  if (isMobile) {
    let signupMobile = document.querySelectorAll("#signup_form1")[0];
    let contactMobile = document.querySelectorAll("#contact_form1")[0];
    signupMobile.addEventListener("submit", submitSignUp);
    contactMobile.addEventListener("submit", submitContactForm);
  } else {
    let signup = document.querySelectorAll("#signup_form")[0];
    let contact = document.querySelectorAll("#contact_form")[0];
    signup.addEventListener("submit", submitSignUp);
    contact.addEventListener("submit", submitContactForm);
  }
}


function submitSignUp(event) {
  event.preventDefault();

  if (event.target.id.indexOf("signup") > -1) {
    const isMobile = window.innerWidth <= 1024;

    let input = isMobile ? "signup_email1" : "signup_email";
    let notification = isMobile
      ? "signup_notification1"
      : "signup_notification";
    let email = document.getElementById(input).value;
    let element = document.getElementById(notification);
    var span = element.getElementsByTagName("span")[0];

    if (email.trim() == "") {
      element.style.display = "block";
      element.classList.add("required");
      span.innerHTML = "There are required fields missing.";
    } else {
      const handleSubmit = (event) => {
        event.preventDefault();

        const myForm = event.target;
        const formData = new FormData(myForm);

        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formData).toString(),
        })
          .then(() => {
            element.style.display = "block";
            element.classList.remove("required");
            span.innerHTML = "Your subscription was sent successfully!";
          })
          .catch((error) => {
            element.style.display = "block";
            element.classList.add("required");
            span.innerHTML = "Error: your subscription was not sent.";
          });
      };
    }
  }
}

function submitContactForm(event) {
  event.preventDefault();

  if (event.target.id.indexOf("signup") <= -1) {
    
    const isMobile = window.innerWidth <= 1024;
    let nameField = isMobile ? "contact_name1" : "contact_name";
    let emailField = isMobile ? "contact_email1" : "contact_email";
    let messageField = isMobile ? "contact_message1" : "contact_message";
    let notification = isMobile
      ? "contact_notification1"
      : "contact_notification";

    let name = document.getElementById(nameField).value;
    let email = document.getElementById(emailField).value;
    let message = document.getElementById(messageField).value;
    let element = document.getElementById(notification);
    var span = element.getElementsByTagName("span")[0];

    if (name.trim() == "" || email.trim() == "" || message.trim() == "") {
      element.style.display = "block";
      element.classList.add("required");
      span.innerHTML = "There are required fields missing.";
    } else {
      const handleSubmit = (event) => {
        event.preventDefault();

        const myForm = event.target;
        const formData = new FormData(myForm);

        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formData).toString(),
        })
          .then(() => {
            element.style.display = "block";
            element.classList.remove("required");
            span.innerHTML = "Your message was sent successfully!";
          })
          .catch((error) => {
            element.style.display = "block";
            element.classList.add("required");
            span.innerHTML = "Error: your message was not sent.";
          });
      };
    }
  }
}

/******************************Leaf Animation ************************************ */
var LeafScene = function (el) {
  this.viewport = el;
  this.world = document.createElement("div");
  this.leaves = [];

  this.options = {
    numLeaves: 20,
    wind: {
      magnitude: 1.2,
      maxSpeed: 12,
      duration: 300,
      start: 0,
      speed: 0,
    },
  };

  this.width = this.viewport.offsetWidth;
  this.height = this.viewport.offsetHeight;

  // animation helper
  this.timer = 0;

  this._resetLeaf = function (leaf) {
    // place leaf towards the top left
    leaf.x = this.width * 2 - Math.random() * this.width * 1.75;
    leaf.y = -10;
    leaf.z = Math.random() * 200;
    if (leaf.x > this.width) {
      leaf.x = this.width + 10;
      leaf.y = (Math.random() * this.height) / 2;
    }
    // at the start, the leaf can be anywhere
    if (this.timer == 0) {
      leaf.y = Math.random() * this.height;
    }

    // Choose axis of rotation.
    // If axis is not X, chose a random static x-rotation for greater variability
    leaf.rotation.speed = Math.random() * 10;
    var randomAxis = Math.random();
    if (randomAxis > 0.5) {
      leaf.rotation.axis = "X";
    } else if (randomAxis > 0.25) {
      leaf.rotation.axis = "Y";
      leaf.rotation.x = Math.random() * 180 + 90;
    } else {
      leaf.rotation.axis = "Z";
      leaf.rotation.x = Math.random() * 360 - 180;
      // looks weird if the rotation is too fast around this axis
      leaf.rotation.speed = Math.random() * 3;
    }

    // random speed
    leaf.xSpeedVariation = Math.random() * 0.8 - 0.4;
    leaf.ySpeed = Math.random() + 1.5;

    return leaf;
  };

  this._updateLeaf = function (leaf) {
    var leafWindSpeed = this.options.wind.speed(
      this.timer - this.options.wind.start,
      leaf.y
    );

    var xSpeed = leafWindSpeed + leaf.xSpeedVariation;
    leaf.x -= xSpeed;
    leaf.y += leaf.ySpeed;
    leaf.rotation.value += leaf.rotation.speed;

    var t =
      "translateX( " +
      leaf.x +
      "px ) translateY( " +
      leaf.y +
      "px ) translateZ( " +
      leaf.z +
      "px )  rotate" +
      leaf.rotation.axis +
      "( " +
      leaf.rotation.value +
      "deg )";
    if (leaf.rotation.axis !== "X") {
      t += " rotateX(" + leaf.rotation.x + "deg)";
    }
    leaf.el.style.webkitTransform = t;
    leaf.el.style.MozTransform = t;
    leaf.el.style.oTransform = t;
    leaf.el.style.transform = t;

    // reset if out of view
    if (leaf.x < -10 || leaf.y > this.height + 10) {
      this._resetLeaf(leaf);
    }
  };

  this._updateWind = function () {
    // wind follows a sine curve: asin(b*time + c) + a
    // where a = wind magnitude as a function of leaf position, b = wind.duration, c = offset
    // wind duration should be related to wind magnitude, e.g. higher windspeed means longer gust duration

    if (
      this.timer === 0 ||
      this.timer > this.options.wind.start + this.options.wind.duration
    ) {
      this.options.wind.magnitude = Math.random() * this.options.wind.maxSpeed;
      this.options.wind.duration =
        this.options.wind.magnitude * 50 + (Math.random() * 20 - 10);
      this.options.wind.start = this.timer;

      var screenHeight = this.height;

      this.options.wind.speed = function (t, y) {
        // should go from full wind speed at the top, to 1/2 speed at the bottom, using leaf Y
        var a =
          ((this.magnitude / 2) * (screenHeight - (2 * y) / 3)) / screenHeight;
        return (
          a *
            Math.sin(((2 * Math.PI) / this.duration) * t + (3 * Math.PI) / 2) +
          a
        );
      };
    }
  };
};

LeafScene.prototype.init = function () {
  for (var i = 0; i < this.options.numLeaves; i++) {
    var leaf = {
      el: document.createElement("div"),
      x: 0,
      y: 0,
      z: 0,
      rotation: {
        axis: "X",
        value: 0,
        speed: 0,
        x: 0,
      },
      xSpeedVariation: 0,
      ySpeed: 0,
      path: {
        type: 1,
        start: 0,
      },
      image: 1,
    };
    this._resetLeaf(leaf);
    this.leaves.push(leaf);
    this.world.appendChild(leaf.el);
  }

  this.world.className = "leaf-scene";
  this.viewport.appendChild(this.world);

  // set perspective
  this.world.style.webkitPerspective = "400px";
  this.world.style.MozPerspective = "400px";
  this.world.style.oPerspective = "400px";
  this.world.style.perspective = "400px";

  // reset window height/width on resize
  var self = this;
  window.onresize = function (event) {
    self.width = self.viewport.offsetWidth;
    self.height = self.viewport.offsetHeight;
  };
};

LeafScene.prototype.render = function () {
  this._updateWind();
  for (var i = 0; i < this.leaves.length; i++) {
    this._updateLeaf(this.leaves[i]);
  }

  this.timer++;

  requestAnimationFrame(this.render.bind(this));
};
