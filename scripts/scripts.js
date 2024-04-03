  document.addEventListener('DOMContentLoaded', function() {
    const icon  = document.getElementById('icon-cancel');
    icon.style.display ='none';
    const menu = document.getElementById('menu');
    menu.style.display = 'none';

    var leafContainer = document.querySelector('.falling-leaves'),
    leaves = new LeafScene(leafContainer);
    leaves.init();
    leaves.render();

    addHoverEffectToBooks();

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

  function smoothScrollMobile(target) {
   const element = document.getElementById(target);
   const allelements = document.querySelectorAll('.menu-item a');
   let point = 0;

   for( i =0; i< allelements.length; i++){
    let element = allelements[i];
    let content = document.getElementById(element.id+'_content');
    if(element.id == target){
      break;
    }
    if(content){
      point += content.getBoundingClientRect().height;
    }
   }
    if (element) {
      const elementHeight = element.getBoundingClientRect().height;
      window.scrollTo({
        top: point,
        behavior: 'smooth'
      });
      point = 0;
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

  function addHoverEffectToBooks(){
   const allelements = document.querySelectorAll('.book');

   for( i =0; i< allelements.length; i++){
    let element = document.getElementById(allelements[i].id);
        element.addEventListener('mouseover', function(){
            var image = element.getElementsByTagName('div')[0];
            image.classList.add('overlay');
            var title = element.getElementsByTagName('div')[1];
            title.classList.add('overlay');
            var button = element.getElementsByTagName('div')[2];
            button.classList.add('overlay');
        });
        element.addEventListener('mouseout', function(){
          var image = element.getElementsByTagName('div')[0];
          image.classList.remove('overlay');
          var title = element.getElementsByTagName('div')[1];
          title.classList.remove('overlay');
          var button = element.getElementsByTagName('div')[2];
          button.classList.remove('overlay');
      });
   }
  }

  /******************************Leaf Animation ************************************ */
  var LeafScene = function(el) {
    this.viewport = el;
    this.world = document.createElement('div');
    this.leaves = [];

    this.options = {
      numLeaves: 20,
      wind: {
        magnitude: 1.2,
        maxSpeed: 12,
        duration: 300,
        start: 0,
        speed: 0
      },
    };

    this.width = this.viewport.offsetWidth;
    this.height = this.viewport.offsetHeight;

    // animation helper
    this.timer = 0;

    this._resetLeaf = function(leaf) {

      // place leaf towards the top left
      leaf.x = this.width * 2 - Math.random()*this.width*1.75;
      leaf.y = -10;
      leaf.z = Math.random()*200;
      if (leaf.x > this.width) {
        leaf.x = this.width + 10;
        leaf.y = Math.random()*this.height/2;
      }
      // at the start, the leaf can be anywhere
      if (this.timer == 0) {
        leaf.y = Math.random()*this.height;
      }

      // Choose axis of rotation.
      // If axis is not X, chose a random static x-rotation for greater variability
      leaf.rotation.speed = Math.random()*10;
      var randomAxis = Math.random();
      if (randomAxis > 0.5) {
        leaf.rotation.axis = 'X';
      } else if (randomAxis > 0.25) {
        leaf.rotation.axis = 'Y';
        leaf.rotation.x = Math.random()*180 + 90;
      } else {
        leaf.rotation.axis = 'Z';
        leaf.rotation.x = Math.random()*360 - 180;
        // looks weird if the rotation is too fast around this axis
        leaf.rotation.speed = Math.random()*3;
      }

      // random speed
      leaf.xSpeedVariation = Math.random() * 0.8 - 0.4;
      leaf.ySpeed = Math.random() + 1.5;

      return leaf;
    }

    this._updateLeaf = function(leaf) {
      var leafWindSpeed = this.options.wind.speed(this.timer - this.options.wind.start, leaf.y);

      var xSpeed = leafWindSpeed + leaf.xSpeedVariation;
      leaf.x -= xSpeed;
      leaf.y += leaf.ySpeed;
      leaf.rotation.value += leaf.rotation.speed;

      var t = 'translateX( ' + leaf.x + 'px ) translateY( ' + leaf.y + 'px ) translateZ( ' + leaf.z + 'px )  rotate' + leaf.rotation.axis + '( ' + leaf.rotation.value + 'deg )';
      if (leaf.rotation.axis !== 'X') {
        t += ' rotateX(' + leaf.rotation.x + 'deg)';
      }
      leaf.el.style.webkitTransform = t;
      leaf.el.style.MozTransform = t;
      leaf.el.style.oTransform = t;
      leaf.el.style.transform = t;

      // reset if out of view
      if (leaf.x < -10 || leaf.y > this.height + 10) {
        this._resetLeaf(leaf);
      }
    }

    this._updateWind = function() {
      // wind follows a sine curve: asin(b*time + c) + a
      // where a = wind magnitude as a function of leaf position, b = wind.duration, c = offset
      // wind duration should be related to wind magnitude, e.g. higher windspeed means longer gust duration

      if (this.timer === 0 || this.timer > (this.options.wind.start + this.options.wind.duration)) {

        this.options.wind.magnitude = Math.random() * this.options.wind.maxSpeed;
        this.options.wind.duration = this.options.wind.magnitude * 50 + (Math.random() * 20 - 10);
        this.options.wind.start = this.timer;

        var screenHeight = this.height;

        this.options.wind.speed = function(t, y) {
          // should go from full wind speed at the top, to 1/2 speed at the bottom, using leaf Y
          var a = this.magnitude/2 * (screenHeight - 2*y/3)/screenHeight;
          return a * Math.sin(2*Math.PI/this.duration * t + (3 * Math.PI/2)) + a;
        }
      }
    }
  }

  LeafScene.prototype.init = function() {

    for (var i = 0; i < this.options.numLeaves; i++) {
      var leaf = {
        el: document.createElement('div'),
        x: 0,
        y: 0,
        z: 0,
        rotation: {
          axis: 'X',
          value: 0,
          speed: 0,
          x: 0
        },
        xSpeedVariation: 0,
        ySpeed: 0,
        path: {
          type: 1,
          start: 0,

        },
        image: 1
      };
      this._resetLeaf(leaf);
      this.leaves.push(leaf);
      this.world.appendChild(leaf.el);
    }

    this.world.className = 'leaf-scene';
    this.viewport.appendChild(this.world);

    // set perspective
    this.world.style.webkitPerspective = "400px";
    this.world.style.MozPerspective = "400px";
    this.world.style.oPerspective = "400px";
    this.world.style.perspective = "400px";
    
    // reset window height/width on resize
    var self = this;
    window.onresize = function(event) {
      self.width = self.viewport.offsetWidth;
      self.height = self.viewport.offsetHeight;
    };
  }

  LeafScene.prototype.render = function() {
    this._updateWind();
    for (var i = 0; i < this.leaves.length; i++) {
      this._updateLeaf(this.leaves[i]);
    }

    this.timer++;

    requestAnimationFrame(this.render.bind(this));
  }
