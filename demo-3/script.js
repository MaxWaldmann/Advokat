(function () {
  const CASES = {
    military: {
      article: 'СТАТТЯ 01 · ВІЙСЬКОВЕ ПРАВО',
      title: 'Військові справи та захист військовослужбовців',
      lead: 'Оперативна правова допомога військовослужбовцям, мобілізованим та їхнім родинам — як особисто в м. Коломия, так і дистанційно по всій Україні.',
      lawyerId: 'bohdan',
      lawyerName: 'Лейб’юк Богдан Богданович',
      phoneDisplay: '+380 96 105 75 33',
      phoneHref: 'tel:+380961057533',
      tiltDeg: -10,
      status: 'Пріоритет: Військове право · Б. Б. Лейб’юк',
      steps: [
        'Правовий аналіз наказів, довідок ВЛК, рапортів та підстав для звільнення чи переведення.',
        'Підготовка адвокатських запитів до військових частин, ТЦК та СП, медичних комісій.',
        'Оскарження неправомірних рішень, стягнення належних виплат та соціальних гарантій.',
        'Представництво та захист військовослужбовця в судах та органах досудового розслідування.'
      ]
    },
    family: {
      article: 'СТАТТЯ 02 · СІМЕЙНІ ТА ЗЕМЕЛЬНІ СПОРИ',
      title: 'Сімейні, спадкові та земельні справи',
      lead: 'Делікатний та системний підхід до вирішення майнових, сімейних і земельних питань із захистом довгострокових інтересів клієнта.',
      lawyerId: 'oksana',
      lawyerName: 'Лейб’юк Оксана Василівна',
      phoneDisplay: '+380 96 555 79 35',
      phoneHref: 'tel:+380965557935',
      tiltDeg: 10,
      status: 'Пріоритет: Сімейне та земельне право · О. В. Лейб’юк',
      steps: [
        'Аудит правовстановлюючих документів на нерухомість, земельні ділянки або спільне майно.',
        'Переговори та підготовка мирових угод, шлюбних або майнових договорів.',
        'Судовий супровід розірвання шлюбу, поділу майна, стягнення аліментів та визначення місця проживання дітей.',
        'Захист прав власності на землю, вирішення межових, орендних та спадкових спорів.'
      ]
    },
    business: {
      article: 'СТАТТЯ 03 · БІЗНЕС ТА АУКЦІОНИ',
      title: 'Юридичний супровід підприємств і підготовка об’єктів до аукціонів',
      lead: 'Комплексна правова підтримка власників бізнесу та інвесторів: від реєстрації чи ліквідації компанії до безпечної участі в торгах.',
      lawyerId: 'oksana',
      lawyerName: 'Лейб’юк Оксана Василівна',
      phoneDisplay: '+380 96 555 79 35',
      phoneHref: 'tel:+380965557935',
      tiltDeg: 7,
      status: 'Пріоритет: Бізнес та аукціони · О. В. Лейб’юк',
      steps: [
        'Реєстрація, реорганізація або ліквідація підприємств із підготовкою повного пакета статутних документів.',
        'Правовий аудит об’єктів перед аукціонами: перевірка реєстрів, арештів, судових спорів і ризиків.',
        'Формування документації для допуску до торгів та юридичний супровід оформлення права власності.',
        'Постійний договірний та юридичний супровід поточної діяльності бізнесу (за потреби спільно з Б. Б. Лейб’юком у корпоративних спорах).'
      ]
    },
    criminal: {
      article: 'СТАТТЯ 04 · КРИМІНАЛЬНІ ТА ЦИВІЛЬНІ СПРАВИ',
      title: 'Ведення кримінальних, цивільних, господарських та корпоративних справ',
      lead: 'Побудова сильної доказової позиції та професійне представництво на кожній стадії процесу — від досудового слідства до касації.',
      lawyerId: 'bohdan',
      lawyerName: 'Лейб’юк Богдан Богданович',
      phoneDisplay: '+380 96 105 75 33',
      phoneHref: 'tel:+380961057533',
      tiltDeg: -7,
      status: 'Пріоритет: Кримінальні та судові справи · Б. Б. Лейб’юк',
      steps: [
        'Терміновий виїзд та захист під час обшуків, допитів, вручення підозри й обрання запобіжного заходу.',
        'Формування стратегії захисту у кримінальних, господарських та корпоративних спорах.',
        'Збір доказів, ініціювання експертиз, підготовка позовів, апеляційних та касаційних скарг.',
        'Представництво в цивільних справах спільно з О. В. Лейб’юк для максимальної ефективності захисту.'
      ]
    }
  };

  const tabs = document.querySelectorAll('.case-tab');
  const scalesBeam = document.getElementById('scales-beam');
  const panLeft = document.getElementById('pan-left');
  const panRight = document.getElementById('pan-right');
  const themisStatus = document.getElementById('themis-status');

  const lawyerBohdan = document.getElementById('lawyer-bohdan');
  const lawyerOksana = document.getElementById('lawyer-oksana');

  const planArticle = document.getElementById('plan-article');
  const planTitle = document.getElementById('plan-title');
  const planLead = document.getElementById('plan-lead');
  const planSteps = document.getElementById('plan-steps');
  const ctaLawyerName = document.getElementById('cta-lawyer-name');
  const ctaCallBtn = document.getElementById('cta-call-btn');

  let settleTimer = null;

  function swayScales(tiltDeg) {
    if (!scalesBeam || !panLeft || !panRight) return;
    clearTimeout(settleTimer);

    // Tilt beam and counter-rotate pans so they hang vertically
    scalesBeam.style.transform = 'rotate(' + tiltDeg + 'deg)';
    panLeft.style.transform = 'rotate(' + (-tiltDeg) + 'deg)';
    panRight.style.transform = 'rotate(' + (-tiltDeg) + 'deg)';

    // Gently settle closer to equilibrium after initial swing
    settleTimer = setTimeout(function () {
      const settled = tiltDeg * 0.25;
      scalesBeam.style.transform = 'rotate(' + settled + 'deg)';
      panLeft.style.transform = 'rotate(' + (-settled) + 'deg)';
      panRight.style.transform = 'rotate(' + (-settled) + 'deg)';
    }, 680);
  }

  function selectCase(caseKey) {
    const data = CASES[caseKey];
    if (!data) return;

    tabs.forEach(function (tab) {
      const active = tab.getAttribute('data-case') === caseKey;
      tab.classList.toggle('is-selected', active);
      tab.setAttribute('aria-selected', String(active));
    });

    if (lawyerBohdan && lawyerOksana) {
      lawyerBohdan.classList.toggle('is-highlighted', data.lawyerId === 'bohdan');
      lawyerOksana.classList.toggle('is-highlighted', data.lawyerId === 'oksana');
    }

    if (planArticle) planArticle.textContent = data.article;
    if (planTitle) planTitle.textContent = data.title;
    if (planLead) planLead.textContent = data.lead;
    if (themisStatus) themisStatus.textContent = data.status;

    if (planSteps) {
      planSteps.innerHTML = '';
      data.steps.forEach(function (stepText) {
        const li = document.createElement('li');
        li.textContent = stepText;
        planSteps.appendChild(li);
      });
    }

    if (ctaLawyerName) ctaLawyerName.textContent = data.lawyerName;
    if (ctaCallBtn) {
      ctaCallBtn.textContent = 'Зв’язатися: ' + data.phoneDisplay;
      ctaCallBtn.setAttribute('href', data.phoneHref);
    }

    swayScales(data.tiltDeg);
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      selectCase(tab.getAttribute('data-case'));
    });
  });

  // Initialize default selection
  selectCase('military');

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
