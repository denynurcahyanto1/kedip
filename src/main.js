import './styles.css';
import { initScrollReveals } from './animations.js';
import { getGallerySelection } from './gallery-state.js';
import { renderGallery } from './gallery-view.js';

const root = document.documentElement;
root.classList.add('js-enabled');

const brandLogo = document.querySelector('.brand-logo');
const brandFallback = document.querySelector('.brand-fallback');
brandLogo.addEventListener(
  'error',
  () => {
    brandLogo.hidden = true;
    brandFallback.hidden = false;
  },
  { once: true },
);

const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');

function setMenuOpen(isOpen) {
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi');
  siteNav.classList.toggle('is-open', isOpen);
}

menuToggle.addEventListener('click', () => {
  setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
});

siteNav.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    setMenuOpen(false);
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

const gallery = document.querySelector('#gallery-content');
let selection = getGallerySelection('2r', '2r-1');

function renderCurrentGallery(focusSelector = null) {
  gallery.innerHTML = renderGallery(selection);
  if (focusSelector) {
    gallery.querySelector(focusSelector)?.focus();
  }
}

gallery.addEventListener('click', (event) => {
  const formatButton = event.target.closest('button[data-format]');
  if (formatButton) {
    selection = getGallerySelection(formatButton.dataset.format, selection.selectedTemplate.id);
    renderCurrentGallery(`[data-format="${selection.format}"]`);
    return;
  }

  const templateButton = event.target.closest('button[data-template-id]');
  if (templateButton) {
    selection = getGallerySelection(selection.format, templateButton.dataset.templateId);
    renderCurrentGallery(`[data-template-id="${selection.selectedTemplate.id}"]`);
  }
});

renderCurrentGallery();
initScrollReveals();
