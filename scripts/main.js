import { getCurrentSlide, showSlide, restoreSlide } from './helper/slideManager.js';
import { initNavigation } from './components/navigation.js'; 
import { registerAction, triggerAction } from './helper/eventDelegator.js';

const slidePaths = [
  './components/slide1.html',
  './components/slide2.html',
  './components/slide3.html',
  './components/slide4.html',
  './components/slide5.html',
  './components/slide6.html',
  './components/slide7.html',
  './components/slide8.html',
  './components/slide9.html',
  './components/slide10.html',
  './components/slide11.html',
  './components/slide12.html',
  './components/slide13.html',
  './components/slide14.html',
  './components/slide15.html',
  './components/slide16.html',
  './components/slide17.html',
  './components/slide18.html',
  './components/slide19.html',
  './components/slide20.html',
];

async function init() {
  const nav = await loadComponent('components/navigation.html');
  const progress = await loadComponent('components/progress-bar.html');

  document.getElementById('nav-container').appendChild(nav);
  document.getElementById('progress-container').appendChild(progress);

  await loadSlides();

  const totalSlides = document.querySelectorAll('.slide').length;
  console.log('Total slides:', totalSlides);
  initNavigation(totalSlides);

  restoreSlide(totalSlides);

  hangingOnHideButtons();

  setupNavigationActions(totalSlides);
  setupKeyboardNavigation();
  initializeSlide3Timeline();
}

async function loadSlides() {
  const container = document.querySelector('.slides-container');

  for (let i = 0; i < slidePaths.length; i++) {
    const content = await loadComponent(slidePaths[i]);
    const slide = content.querySelector('.slide');
    slide.id = `slide-${i + 1}`;
    container.appendChild(slide);

    document.querySelectorAll('pre code[data-highlight="true"]').forEach((el) => {
      hljs.highlightElement(el);
    });
  }
}

async function loadComponent(path) {
  const res = await fetch(path);
  const html = await res.text();

  const wrapper = document.createElement('div');
  wrapper.innerHTML = html.trim();

  const template = wrapper.querySelector('template');
  if (!template) throw new Error(`No <template> found in ${path}`);

  const componentName = path.split('/').pop().replace('.html', '')
  loadCSS(`styles/${componentName}.css`)
  await loadScript(`scripts/components/${componentName}.js`)

  return template.content.cloneNode(true);
}

function loadCSS(href) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.type = 'module';
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

function setupNavigationActions(totalSlides) {
  registerAction('next-slide', () => {
    const current = getCurrentSlide();
    if (current < totalSlides) {
      showSlide(current + 1, totalSlides);
    }
  });

  registerAction('prev-slide', () => {
    const current = getCurrentSlide();
    if (current > 1) {
      showSlide(current - 1, totalSlides);
    }
  });
}

function initializeSlide3Timeline() {
  // Инициализация первого timeline-item как активного
  const firstItem = document.getElementById('timeline-item-1');
  if (firstItem) {
    firstItem.classList.add('active');
  }

  // Скрытие всех timeline-item-info, кроме первого
  document.querySelectorAll('#slide-3 [class*="timeline-item-info-"]').forEach((info, index) => {
    if (index === 0) {
      info.classList.remove('hidden');
    } else {
      info.classList.add('hidden');
    }
  });
}

function setupKeyboardNavigation() {
  let currentTimelineItem = 1;
  const totalTimelineItems = 6;

  document.addEventListener('keydown', (event) => {
    const currentSlide = getCurrentSlide();

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      triggerAction('next-slide');
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      triggerAction('prev-slide');
    } else if (event.key === ' ' && currentSlide === 3) {
      event.preventDefault();
      currentTimelineItem = (currentTimelineItem % totalTimelineItems) + 1;
      
      // Сброс активного состояния
      document.querySelectorAll('#slide-3 .timeline-item').forEach(item => {
        item.classList.remove('active');
      });

      // Скрытие всех информационных блоков
      document.querySelectorAll('#slide-3 [class*="timeline-item-info-"]').forEach(info => {
        info.classList.add('hidden');
      });

      // Активация текущего timeline-item
      const activeItem = document.getElementById(`timeline-item-${currentTimelineItem}`);
      if (activeItem) {
        activeItem.classList.add('active');
      }

      // Показ соответствующего информационного блока
      const activeInfo = document.querySelector(`#slide-3 .timeline-item-info-${currentTimelineItem}`);
      if (activeInfo) {
        activeInfo.classList.remove('hidden');
      }
    }
  });
}

function hangingOnHideButtons() {
  const hideBtns = document.querySelectorAll('.hide-btn');
  hideBtns.forEach(function(btn) {
    const initialText = btn.textContent;
    btn.addEventListener('click', function() {
      const info = btn.nextElementSibling;
      info.classList.toggle('hidden');
      if (info.classList.contains('hidden')) {
        this.textContent = initialText;
      } else {
        this.textContent = 'Verstecken';
      }
    })
  })
}

document.addEventListener('DOMContentLoaded', function() {
  init().catch(error => console.error('Initialization error:', error));
});