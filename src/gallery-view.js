import { getTemplatesByFormat } from './templates.js';

const formatLabels = {
  '2r': '2R',
  '4r': '4R',
  polaroid: 'Polaroid',
  '6x2': '6×2',
  '6x4': '6×4',
};

function renderFormatButtons(selectedFormat) {
  return Object.entries(formatLabels)
    .map(
      ([format, label]) => `
        <button class="format-button" type="button" data-format="${format}" aria-pressed="${format === selectedFormat}">
          ${label}
        </button>
      `,
    )
    .join('');
}

function renderTemplateButtons(templates, selectedId) {
  return templates
    .map(
      (template, index) => `
        <button class="template-button" type="button" data-template-id="${template.id}" aria-pressed="${template.id === selectedId}">
          <span class="template-number" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
          <span>${template.name}</span>
        </button>
      `,
    )
    .join('');
}

function renderPhotoFrames(template) {
  return Array.from({ length: template.photoCount }, (_, index) => `
    <div class="photo-frame" aria-hidden="true">
      <span class="photo-frame-mark"></span>
      <span class="photo-frame-label">Foto ${index + 1}</span>
    </div>
  `).join('');
}

function renderStripPreview(template, label) {
  const previewLabel = `Pratinjau ${label} ${template.name}, ${template.photoCount} foto placeholder`;
  if (template.format === '2r') {
    return `
      <div
        class="strip-preview strip-preview--2r ${template.style}"
        role="img"
        aria-label="${previewLabel}"
      >
        <img class="strip-art" src="${template.asset}" alt="" aria-hidden="true" width="600" height="1800">
      </div>
    `;
  }

  return `
    <div
      class="strip-preview strip-preview--${template.format} ${template.style}"
      data-orientation="${template.orientation}"
      role="img"
      aria-label="${previewLabel}"
    >
      ${renderPhotoFrames(template)}
      <span class="strip-signature">
        <img src="/assets/kedip-mark.svg" alt="" aria-hidden="true" width="32" height="32">
        <span aria-hidden="true">kedip</span>
      </span>
    </div>
  `;
}

export function renderGallery(selection) {
  const { format, templates, selectedTemplate } = selection;
  const label = formatLabels[format];
  if (!label || !templates.includes(selectedTemplate)) {
    throw new RangeError('Gallery selection must include a supported format and template.');
  }

  return `
    <div class="format-switcher" role="group" aria-label="Pilih format strip">
      ${renderFormatButtons(format)}
    </div>
    <div class="gallery-layout">
      <div class="template-picker" role="group" aria-label="Pilih desain ${label}">
        ${renderTemplateButtons(templates, selectedTemplate.id)}
      </div>
      <div class="gallery-stage" aria-live="polite">
        <div class="strip-stage">${renderStripPreview(selectedTemplate, label)}</div>
        <div class="gallery-caption">
          <p class="gallery-format">${label} / ${selectedTemplate.photoCount} foto</p>
          <h3>${selectedTemplate.name}</h3>
          <p>Contoh tata letak dengan ruang untuk foto kalian.</p>
        </div>
      </div>
    </div>
  `;
}
