export interface PresetTheme {
  name: string;
  colors: string[];
  gradient: string;
}

export const presets: PresetTheme[] = [
  {
    name: "Gray Scale",
    colors: ['#1a1a1a', '#333333', '#555555', '#888888', '#bbbbbb'],
    gradient: 'linear-gradient(135deg, #0a0a0a, #0a0a0a)',
  },
  {
    name: "Midnight Green",
    colors: ['#141414', '#1e3a2f', '#2d6a4f', '#40916c', '#52b788'],
    gradient: 'linear-gradient(135deg, #0a0a0a, #0a0a0a)',
  },
  {
    name: "Neon Cyber",
    colors: ['#0d1f17', '#064e3b', '#059669', '#10b981', '#34d399'],
    gradient: 'linear-gradient(135deg, #050505, #050505)',
  },
  {
    name: "Warm Ember",
    colors: ['#431407', '#9a3412', '#c2410c', '#ea580c', '#fb923c'],
    gradient: 'linear-gradient(135deg, #1c0a00 0%, #7c2d12 40%, #c2410c 100%)',
  },
  {
    name: "Royal Purple",
    colors: ['#2e1065', '#5b21b6', '#7c3aed', '#a855f7', '#d8b4fe'],
    gradient: 'linear-gradient(135deg, #0a0a0a, #0a0a0a)',
  },
  {
    name: "Sun Light",
    colors: ['#fef9c3', '#fde047', '#facc15', '#eab308', '#ca8a04'],
    gradient: 'linear-gradient(135deg, #fef3c7, #fde68a)',
  },
  {
    name: "Moon Dark",
    colors: ['#0f172a', '#1e293b', '#334155', '#475569', '#64748b'],
    gradient: 'linear-gradient(135deg, #020617, #0f172a)',
  },
  {
    name: "White Frost",
    colors: ['#e2e8f0', '#cbd5e1', '#94a3b8', '#64748b', '#475569'],
    gradient: 'linear-gradient(135deg, #ffffff, #f1f5f9)',
  },
  {
    name: "Fiery Red Sunset",
    colors: ['#03071e','#370617','#6a040f','#9d0208','#d00000'],
    gradient: 'linear-gradient(135deg, #03071e, #ffba08)',
  },
  {
    name: "Ocean Breeze",
    colors: ['#03045e','#0077b6','#00b4d8','#90e0ef','#caf0f8'],
    gradient: 'linear-gradient(135deg, #03045e, #caf0f8)',
  },
  {
    name: "Soft Sand",
    colors: ['#2c1810','#4a3020','#6b4c3a','#9c7860','#d4bc9e'],
    gradient: 'linear-gradient(135deg, #edede9, #d5bdaf)',
  },
  {
    name: "Fresh Greens",
    colors: ['#081c15','#2d6a4f','#52b788','#95d5b2','#d8f3dc'],
    gradient: 'linear-gradient(135deg, #d8f3dc, #081c15)',
  },
  {
    name: "Sunset Gradient",
    colors: ['#583101','#6f4518','#a47148','#d4a276','#ffedd8'],
    gradient: 'linear-gradient(135deg, #ffedd8, #583101)',
  },
  {
    name: "Pastel Lavender",
    colors: ['#6247aa','#7251b5','#9163cb','#b185db','#dec9e9'],
    gradient: 'linear-gradient(135deg, #dec9e9, #6247aa)',
  },
  {
    name: "Bright Green",
    colors: ['#004b23','#006400','#007200','#008000','#38b000'],
    gradient: 'linear-gradient(135deg, #004b23, #ccff33)',
  },
  {
    name: "Warm Earth Tones",
    colors: ['#260701','#38160d','#532c1e','#653a2a','#774936'],
    gradient: 'linear-gradient(135deg, #774936, #260701)',
  },
  {
    name: "Silver Lining",
    colors: ['#595959','#7f7f7f','#a5a5a5','#cccccc','#f2f2f2'],
    gradient: 'linear-gradient(135deg, #595959, #f2f2f2)',
  },
];
