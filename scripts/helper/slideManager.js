import { triggerAction } from "../helper/eventDelegator.js";

const DEV_MODE = false;
const DEV_SLIDE = 16;

let currentSlideId = 1;

export function getCurrentSlide() {
  return currentSlideId;
}

export function showSlide(slideNumber, totalSlides) {
  if (slideNumber < 1 || slideNumber > totalSlides) {
    console.warn(`Incorrect slide number: ${slideNumber}`);
    return;
  }

  const currentSlide = document.querySelector('.slide.active');
  if (currentSlide) {
    currentSlide.classList.remove('active');
  }

  const nextSlide = document.getElementById(`slide-${slideNumber}`);
  if (nextSlide) {
    nextSlide.classList.add('active');
    currentSlideId = slideNumber;

    triggerAction('slide-changed', slideNumber, totalSlides);
  }
}

export function restoreSlide(totalSlides) {
  let startSlide;
  
  if (DEV_MODE) {
    startSlide = DEV_SLIDE;
    console.log(`Dev mode: Starting with slide ${DEV_SLIDE}`);
  } else {
    const savedSlide = localStorage.getItem('currentSlide');
    startSlide = savedSlide ? parseInt(savedSlide, 10) : 1;
  }
  
  // Проверка на валидность номера слайда
  const validSlide = Math.min(Math.max(1, startSlide), totalSlides);
  
  // Показываем выбранный слайд
  showSlide(validSlide, totalSlides);
}

