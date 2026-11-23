const twoRDesigns = [
  { name: 'Klasik', asset: 'klasik' },
  { name: 'Coral Pop', asset: 'coral-pop' },
  { name: 'Malam Kedip', asset: 'malam-kedip' },
  { name: 'Hati Mungil', asset: 'hati-mungil' },
  { name: 'Gingham', asset: 'gingham' },
  { name: 'Neo Brutal', asset: 'neo-brutal' },
  { name: 'Langit Senja', asset: 'langit-senja' },
  { name: 'Film', asset: 'film' },
];

const fourRLayouts = [
  { name: 'Potret Tunggal', photoCount: 1, style: 'single-wide', orientation: 'landscape' },
  { name: 'Empat Kenangan', photoCount: 4, style: 'four-grid', orientation: 'landscape' },
  { name: 'Tiga Cerita', photoCount: 3, style: 'three-mix', orientation: 'landscape' },
  { name: 'Jalur Panjang', photoCount: 3, style: 'three-vertical', orientation: 'landscape' },
  { name: 'Foto Utama', photoCount: 1, style: 'single-portrait', orientation: 'portrait' },
  { name: 'Dua Bingkai', photoCount: 2, style: 'two-horizontal', orientation: 'landscape' },
  { name: 'Dua Potret', photoCount: 2, style: 'two-vertical', orientation: 'portrait' },
  { name: 'Kolase Cerita', photoCount: 4, style: 'feature-and-three', orientation: 'landscape' },
];

const polaroidLayouts = [
  { name: 'Polaroid Klasik', photoCount: 1, style: 'classic', orientation: 'portrait' },
  { name: 'Bingkai Tebal', photoCount: 1, style: 'thick-frame', orientation: 'portrait' },
  { name: 'Tepi Berombak', photoCount: 1, style: 'scalloped', orientation: 'portrait' },
  { name: 'Sudut Lembut', photoCount: 1, style: 'soft-corner', orientation: 'portrait' },
  { name: 'Album Mini', photoCount: 2, style: 'double-vertical', orientation: 'portrait' },
  { name: 'Potret Miring', photoCount: 1, style: 'tilted', orientation: 'portrait' },
  { name: 'Kartu Kenangan', photoCount: 1, style: 'wide-caption', orientation: 'landscape' },
];

const sixByTwoLayouts = [
  { id: '6x2-a', name: 'Layout A', photoCount: 6, style: 'layout-a', orientation: 'portrait' },
  { id: '6x2-b', name: 'Layout B', photoCount: 6, style: 'layout-b', orientation: 'portrait' },
  { id: '6x2-c', name: 'Layout C', photoCount: 6, style: 'layout-c', orientation: 'portrait' },
  { id: '6x2-d', name: 'Layout D', photoCount: 6, style: 'layout-d', orientation: 'portrait' },
  { id: '6x2-e', name: 'Layout E', photoCount: 6, style: 'layout-e', orientation: 'portrait' },
  { id: '6x2-f', name: 'Layout F', photoCount: 6, style: 'layout-f', orientation: 'portrait' },
  { id: '6x2-g', name: 'Layout G', photoCount: 6, style: 'layout-g', orientation: 'portrait' },
  { id: '6x2-h', name: 'Layout H', photoCount: 2, style: 'layout-h', orientation: 'landscape' },
];

const sixByFourLayouts = [
  { id: '6x4-i', name: 'Layout I', photoCount: 1, style: 'layout-i', orientation: 'landscape' },
  { id: '6x4-j', name: 'Layout J', photoCount: 4, style: 'layout-j', orientation: 'landscape' },
  { id: '6x4-k', name: 'Layout K', photoCount: 3, style: 'layout-k', orientation: 'landscape' },
  { id: '6x4-l', name: 'Layout L', photoCount: 3, style: 'layout-l', orientation: 'landscape' },
  { id: '6x4-m', name: 'Layout M', photoCount: 2, style: 'layout-m', orientation: 'landscape' },
  { id: '6x4-n', name: 'Layout N', photoCount: 4, style: 'layout-n', orientation: 'landscape' },
  { id: '6x4-o', name: 'Layout O', photoCount: 2, style: 'layout-o', orientation: 'portrait' },
];

export const TEMPLATE_CATALOG = [
  ...twoRDesigns.map((design, index) => ({
    id: `2r-${index + 1}`,
    format: '2r',
    name: design.name,
    photoCount: 4,
    style: `strip-${index + 1}`,
    asset: `/assets/strips/2r/${design.asset}.svg`,
  })),
  ...fourRLayouts.map((layout, index) => ({
    id: `4r-${index + 1}`,
    format: '4r',
    ...layout,
  })),
  ...polaroidLayouts.map((layout, index) => ({
    id: `polaroid-${index + 1}`,
    format: 'polaroid',
    ...layout,
  })),
  ...sixByTwoLayouts.map((layout) => ({
    format: '6x2',
    ...layout,
  })),
  ...sixByFourLayouts.map((layout) => ({
    format: '6x4',
    ...layout,
  })),
];

export function getTemplatesByFormat(format) {
  return TEMPLATE_CATALOG.filter((template) => template.format === format);
}
