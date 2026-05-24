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
];
