// ===== Навигация по слайдам =====
import { triggerAction, registerAction } from '../helper/eventDelegator.js';
import { getCurrentSlide } from '../helper/slideManager.js';

export function initNavigation(totalSlides) {
  const nav = document.querySelector('#navigation');
  const counter = document.querySelector('#slide-counter');
  const progress = document.querySelector('#progress-indicator');

  nav.querySelector('[data-action="next-slide"]').addEventListener('click', () => {
    triggerAction('next-slide');
  });
  nav.querySelector('[data-action="prev-slide"]').addEventListener('click', () => {
    triggerAction('prev-slide');
  });

  registerAction('slide-changed', (slideNumber) => {
    counter.textContent = `${slideNumber} / ${totalSlides}`;
    if (progress) {
      progress.style.width = `${(slideNumber / totalSlides) * 100}%`;
    }
  });
}


