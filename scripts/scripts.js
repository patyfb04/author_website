
var canva;
var canvasContext;
var canvaImage;

  document.addEventListener('DOMContentLoaded', function() {
    const icon  = document.getElementById('icon-cancel');
    icon.style.display ='none';
    const menu = document.getElementById('menu');
    menu.style.display = 'none';

    /* build anchors */
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(function(anchor) {
      anchor.addEventListener('click', function(event) {
        event.preventDefault();
        const target = anchor.getAttribute('href').substring(1);
        const isMobile = (window.innerWidth <= 1024);
        if(!isMobile){
          smoothScroll(target);
        } else {
          smoothScrollMobile(target, 1);
        }
      });
    });

      /* draw canva */
    canvas = document.getElementById('animationCanvas');
    canvasContext = canvas.getContext('2d');
    canvaImage = new Image();
    canvaImage.src = '../assets/leaf.png';
    var hRatio = canvas.width / canvaImage.width    ;
    var vRatio = canvas.height / canvaImage.height  ;
    var ratio  = Math.min ( hRatio, vRatio );

    canvaImage.width = 100;
    canvaImage.height = 63;

    canvaImage.addEventListener('load', function (){
      var interval = setInterval(function() {
        var x = 0, y = 0;
        return function (){
          canvasContext.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
          //canvasContext.drawImage(canvaImage, x, y);
         canvasContext.drawImage(canvaImage, x,y,canvaImage.width, canvaImage.height);
  
          x += 1;
          if (x > canvasContext.canvas.width) {
            x = 0;
          }
        }
      }(), 1000/40);
    },false);

  });

  function smoothScroll(target) {
    const element = document.getElementById(target);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  }

  function smoothScrollMobile(target, factor) {
    const element = document.getElementById(target);
    if (element) {
      window.scrollTo({
        top: window.innerHeight * factor,
        behavior: 'smooth'
      });
    }
  }
  
  function toggleMenu(isActive) {
    const iconMenu  = document.getElementById('icon-menu');
    const iconCancel  = document.getElementById('icon-cancel');
    const menu = document.getElementById('menu');

    if(isActive){ // is cancel
      iconMenu.style.display ='inline-block';
      iconCancel.style.display ='none';
      menu.style.display = 'none';
    } else {
      iconMenu.style.display ='none';
      iconCancel.style.display ='inline-block';
      menu.style.display = 'inline-block';
    }
  }
