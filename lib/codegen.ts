export interface CalendarConfig {
  themeColors: string[];
  blockShape: string;
  showTotalCount: boolean;
  showColorLegend: boolean;
  showTooltip: boolean;
  months: number;
  labelText: string;
  totalLabel: string;
}

export function defaultConfig(): CalendarConfig {
  return {
    themeColors: ['#141414', '#1e3a2f', '#2d6a4f', '#40916c', '#52b788'],
    blockShape: 'square',
    showTotalCount: true,
    showColorLegend: true,
    showTooltip: true,
    months: 0,
    labelText: '',
    totalLabel: '',
  };
}

function monthsTransform(months: number): string {
  if (months <= 0) return '';
  return `
        transformData={data => {
          const cutoff = new Date();
          cutoff.setMonth(cutoff.getMonth() - ${months});
          return data.filter(day => new Date(day.date) >= cutoff);
        }}`;
}

function labelBlock(label: string): string {
  if (!label) return '';
  return `
        <p style={{
          color: 'rgba(255,255,255,0.7)',
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '16px',
        }}>
          ${label}
        </p>`;
}

const shapeFns: Record<string, string> = {
  star: `
function starPath(cx, cy, size) {
  const o = size / 2, i = size / 5;
  const p = [];
  for (let n = 0; n < 5; n++) {
    const a = (n * 2 * Math.PI) / 5 - Math.PI / 2;
    const b = a + Math.PI / 5;
    p.push((cx + o * Math.cos(a)) + ',' + (cy + o * Math.sin(a)));
    p.push((cx + i * Math.cos(b)) + ',' + (cy + i * Math.sin(b)));
  }
  return 'M' + p.join('L') + 'Z';
}
`,
  hexagon: `
function hexPath(cx, cy, size) {
  const r = size / 2;
  const p = [];
  for (let n = 0; n < 6; n++) {
    const a = (n * 2 * Math.PI) / 6 - Math.PI / 2;
    p.push((cx + r * Math.cos(a)) + ',' + (cy + r * Math.sin(a)));
  }
  return 'M' + p.join('L') + 'Z';
}
`,
  triangle: `
function triPath(cx, cy, size) {
  const r = size / 2;
  return 'M' + cx + ',' + (cy - r) + 'L' + (cx + r) + ',' + (cy + r) + 'L' + (cx - r) + ',' + (cy + r) + 'Z';
}
`,
  egg: '',
  github: '',
};

function shapeEl(shape: string, withTooltip: boolean): string {
  const inner: Record<string, string> = {
    circle: `<circle cx={block.props.x + block.props.width / 2} cy={block.props.y + block.props.height / 2} r={block.props.width / 2} fill={block.props.fill} />`,
    pill: `<rect x={block.props.x} y={block.props.y} width={block.props.width} height={block.props.height} rx={3} ry={3} fill={block.props.fill} />`,
    diamond: `<rect x={block.props.x} y={block.props.y} width={block.props.width} height={block.props.height} fill={block.props.fill} transform={'rotate(45 ' + (block.props.x + block.props.width / 2) + ' ' + (block.props.y + block.props.height / 2) + ')'} />`,
    star: `<path d={starPath(block.props.x + block.props.width / 2, block.props.y + block.props.height / 2, block.props.width)} fill={block.props.fill} />`,
    hexagon: `<path d={hexPath(block.props.x + block.props.width / 2, block.props.y + block.props.height / 2, block.props.width)} fill={block.props.fill} />`,
    triangle: `<path d={triPath(block.props.x + block.props.width / 2, block.props.y + block.props.height / 2, block.props.width)} fill={block.props.fill} />`,
    egg: `<ellipse cx={block.props.x + block.props.width / 2} cy={block.props.y + block.props.height / 2} rx={block.props.width * 0.35} ry={block.props.width / 2} fill={block.props.fill} />`,
    github: `<g transform={'translate(' + block.props.x + ', ' + block.props.y + ') scale(' + (block.props.width / 24) + ')'}><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" fill={block.props.fill} /></g>`,
  };
  const el = inner[shape] || `<rect x={block.props.x} y={block.props.y} width={block.props.width} height={block.props.height} fill={block.props.fill} />`;
  if (!withTooltip) return `          return <g>${el}</g>;`;
  return `          const handleEnter = (e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setTip({ x: r.left + r.width / 2, y: r.top - 8, content: activity.count + ' contribution' + (activity.count !== 1 ? 's' : '') });
          };
          return <g onMouseEnter={handleEnter} onMouseLeave={() => setTip(null)} style={{ cursor: 'pointer' }}>${el}</g>;`;
}

export function generateCode(config: CalendarConfig): string {
  const shape = config.blockShape;
  const tip = config.showTooltip;

  const totalLabelProp = config.totalLabel
    ? `\n        labels={{ totalCount: '${config.totalLabel}' }}`
    : '';

  if (shape === 'square' && !tip) {
    return `import GitHubCalendar from 'react-github-calendar';

export default function Component() {
  return (
    <div style={{ padding: '32px', background: '#0a0a0a', borderRadius: '8px' }}>
      ${labelBlock(config.labelText)}<GitHubCalendar
        username="torvalds"
        colorScheme="dark"
        theme={{ dark: ${JSON.stringify(config.themeColors)} }}
        hideTotalCount={${!config.showTotalCount}}
        hideColorLegend={${!config.showColorLegend}}${monthsTransform(config.months)}${totalLabelProp}
      />
    </div>
  );
}`;
  }

  const stateImport = tip ? `\nimport { useState } from 'react';` : '';
  const stateHook = tip ? `\n  const [tip, setTip] = useState(null);` : '';
  const tipDiv = tip ? `\n      {tip && <div style={{ position: 'fixed', left: tip.x + 'px', top: tip.y + 'px', transform: 'translate(-50%, -100%)', background: '#383838', color: '#fff', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 1000 }}>{tip.content}</div>}` : '';

  const renderBlock = `\n        renderBlock={(block, activity) => {\n${shapeEl(shape, tip)}\n        }}`;

  return `import GitHubCalendar from 'react-github-calendar';${stateImport}
${shapeFns[shape] || ''}
export default function Component() {${stateHook}
  return (
    <div style={{ padding: '32px', background: '#0a0a0a', borderRadius: '8px' }}>
      ${labelBlock(config.labelText)}<GitHubCalendar
        username="torvalds"
        colorScheme="dark"
        theme={{ dark: ${JSON.stringify(config.themeColors)} }}${renderBlock}
        hideTotalCount={${!config.showTotalCount}}
        hideColorLegend={${!config.showColorLegend}}${monthsTransform(config.months)}${totalLabelProp}
      />${tipDiv}
    </div>
  );
}`;
}
