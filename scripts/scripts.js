  document.addEventListener('DOMContentLoaded', function() {
    const icon  = document.getElementById('icon-cancel');
    icon.style.display ='none';
    const menu = document.getElementById('menu');
    menu.style.display = 'none';

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
