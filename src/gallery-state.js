import { getTemplatesByFormat } from './templates.js';

export function getGallerySelection(format, selectedId) {
  const templates = getTemplatesByFormat(format);
  if (templates.length === 0) {
    throw new RangeError(`Unsupported strip format: ${format}`);
  }

  const selectedTemplate = templates.find((template) => template.id === selectedId) ?? templates[0];

  return { format, templates, selectedTemplate };
}
