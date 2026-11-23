(function () {
  // Header shadow on scroll
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 16);
    }, { passive: true });
  }

  // Mobile navigation toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function () {
      const isOpen = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Interactive FAQ accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;
    trigger.addEventListener('click', function () {
      const wasOpen = item.classList.contains('is-open');
      faqItems.forEach(function (other) {
        other.classList.remove('is-open');
        const otherBtn = other.querySelector('.faq-trigger');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

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
          // Cross-origin fallback via postMessage
        }
        window.parent.postMessage('EXIT_DEMO', '*');
      } else {
        window.location.href = '../index.html';
      }
    });
  }
})();
