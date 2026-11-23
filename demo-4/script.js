(function () {
  // 1. Parallax effect on Themis SVG card
  const themisCard = document.getElementById('themis-card');
  const layers = themisCard ? themisCard.querySelectorAll('.p-layer') : [];

  if (themisCard && layers.length) {
    themisCard.addEventListener('mousemove', function (e) {
      const rect = themisCard.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      layers.forEach(function (layer) {
        const depth = parseFloat(layer.getAttribute('data-depth')) || 1;
        const moveX = relX * 18 * depth;
        const moveY = relY * 14 * depth;
        layer.style.transform = 'translate3d(' + moveX.toFixed(1) + 'px, ' + moveY.toFixed(1) + 'px, 0)';
      });
    });

    themisCard.addEventListener('mouseleave', function () {
      layers.forEach(function (layer) {
        layer.style.transform = 'translate3d(0, 0, 0)';
      });
    });
  }

  // 2. Interactive Flip Cards for both lawyers
  const flipCards = document.querySelectorAll('[data-flip-card]');
  flipCards.forEach(function (card) {
    card.addEventListener('click', function (e) {
      if (e.target.closest('[data-no-flip]')) return;
      card.classList.toggle('is-flipped');
    });
  });

  // 3. Services live filter by tag + quick search
  const tagButtons = document.querySelectorAll('.tag-btn');
  const searchInput = document.getElementById('service-search');
  const serviceItems = document.querySelectorAll('.srv-item');
  const emptyState = document.getElementById('services-empty');

  let activeTag = 'all';

  function filterServices() {
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    let visibleCount = 0;

    serviceItems.forEach(function (item) {
      const tags = (item.getAttribute('data-tags') || '').split(' ');
      const text = item.textContent.toLowerCase();
      const matchesTag = activeTag === 'all' || tags.includes(activeTag);
      const matchesQuery = !query || text.includes(query);
      const show = matchesTag && matchesQuery;
      item.hidden = !show;
      if (show) visibleCount += 1;
    });

    if (emptyState) {
      emptyState.hidden = visibleCount > 0;
    }
  }

  tagButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      activeTag = btn.getAttribute('data-tag') || 'all';
      tagButtons.forEach(function (other) {
        other.classList.toggle('is-active', other === btn);
      });
      filterServices();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', filterServices);
  }

  // 4. One-click copy with cream-and-gold toast notification
  const toastEl = document.getElementById('toast');
  let toastTimer = null;

  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove('show');
    }, 2600);
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showToast('Скопійовано: ' + text);
      }).catch(function () {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showToast('Скопійовано: ' + text);
    } catch (e) {
      showToast('Не вдалося скопіювати автоматично');
    }
    document.body.removeChild(textarea);
  }

  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const val = btn.getAttribute('data-copy');
      if (val) copyText(val);
    });
  });

  // 5. Exit Demo button
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
