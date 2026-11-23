(function () {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const navLinks = Array.from(document.querySelectorAll('.slide-link'));
  const currentNumEl = document.getElementById('current-num');
  const nextSlideBtn = document.getElementById('next-slide-btn');

  let currentIndex = 0;
  let isLocked = false;
  const LOCK_MS = 720;

  function goToSlide(index) {
    if (index < 0 || index >= slides.length || index === currentIndex || isLocked) {
      return;
    }
    isLocked = true;
    currentIndex = index;

    slides.forEach(function (slide, idx) {
      slide.classList.toggle('is-active', idx === currentIndex);
    });

    navLinks.forEach(function (link, idx) {
      link.classList.toggle('is-active', idx === currentIndex);
    });

    const theme = slides[currentIndex].getAttribute('data-theme') || 'dark';
    document.body.setAttribute('data-theme', theme);

    if (currentNumEl) {
      currentNumEl.textContent = String(currentIndex + 1).padStart(2, '0');
    }

    setTimeout(function () {
      isLocked = false;
    }, LOCK_MS);
  }

  // Anchor clicks
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetIdx = Number(link.getAttribute('data-slide'));
      goToSlide(targetIdx);
    });
  });

  if (nextSlideBtn) {
    nextSlideBtn.addEventListener('click', function () {
      goToSlide(1);
    });
  }

  // Wheel navigation
  window.addEventListener('wheel', function (e) {
    if (Math.abs(e.deltaY) < 25) return;
    if (e.deltaY > 0) {
      goToSlide(currentIndex + 1);
    } else {
      goToSlide(currentIndex - 1);
    }
  }, { passive: true });

  // Keyboard navigation
  window.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      goToSlide(currentIndex + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      goToSlide(currentIndex - 1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      goToSlide(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      goToSlide(slides.length - 1);
    }
  });

  // Touch swipe navigation
  let touchStartY = 0;
  let touchStartX = 0;

  window.addEventListener('touchstart', function (e) {
    touchStartY = e.touches[0].clientY;
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  window.addEventListener('touchend', function (e) {
    const dy = touchStartY - e.changedTouches[0].clientY;
    const dx = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(dy) > 55 && Math.abs(dy) > Math.abs(dx)) {
      if (dy > 0) {
        goToSlide(currentIndex + 1);
      } else {
        goToSlide(currentIndex - 1);
      }
    }
  }, { passive: true });

  // Exit Demo button
  const exitBtn = document.getElementById('exit-demo-btn');
  if (exitBtn) {
    exitBtn.addEventListener('click', function () {
      if (window.self !== window.top) {
        try {
          if (typeof window.parent.closeDemo === 'function') {
            window.parent.closeDemo();
            return;
          }
        } catch (e) {
          // Cross-origin fallback
        }
        window.parent.postMessage('EXIT_DEMO', '*');
      } else {
        window.location.href = '../index.html';
      }
    });
  }
})();
