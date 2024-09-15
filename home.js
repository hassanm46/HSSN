// styles.css
.name {
    perspective: 1000px;
  }
  .name-letter {
    display: inline-block;
    will-change: transform;
  }
  
  // script.js
  "use strict";
  
  window.Webflow ||= [];
  window.Webflow.push(() => {
    // Wait for the DOM to be ready
    document.addEventListener('DOMContentLoaded', () => {
      // Select elements
      const preloader = document.querySelector('.pre-loader');
      const loadingText = document.querySelector('.loading-text');
      const dot = document.querySelector('.dot');
      const nameContainer = document.querySelector('.name');
      const nameLetters = document.querySelectorAll('.name-letter');
  
      // Set initial states
      gsap.set(nameLetters, { 
        autoAlpha: 0,
        scale: 2,
        x: (i) => (i - 3) * 120, // Spread letters horizontally
        y: (i) => (i % 2 === 0 ? -50 : 50), // Alternate up and down
        z: 400,
        rotationX: (i) => (i % 2 === 0 ? 45 : -45), // Alternate rotation
        force3D: true,
        filter: 'blur(10px)'
      });
  
      // Create the timeline
      const tl = gsap.timeline();
  
      // Animate the loading dot and text
      tl.to(dot, { duration: 0.5, opacity: 1 })
        .to(loadingText, { duration: 0.5, opacity: 1 }, "-=0.25")
        // Pause briefly
        .to({}, { duration: 0.5 })
        // Animate letters into place while fading them in
        .to(nameLetters, {
          duration: 1.2,
          autoAlpha: 1,
          scale: 1,
          x: 0,
          y: 0,
          z: 0,
          rotationX: 0,
          filter: 'blur(0px)',
          ease: "power2.out",
          stagger: {
            each: 0.05,
            from: "center"
          }
        })
        // Pause
        .to({}, { duration: 1 })
        // Shrink letters one by one
        .to(nameLetters, {
          duration: 0.5,
          scale: 0,
          opacity: 0,
          stagger: 0.05,
          ease: "back.in(1.7)"
        })
        // Slide away the preloader
        .to(preloader, {
          duration: 0.5,
          y: "-100%",
          ease: "power2.in"
        });
    });
  });