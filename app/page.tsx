'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Copy, Check } from 'lucide-react';
import { presets } from '@/lib/registry';
import { generateCode, type CalendarConfig } from '@/lib/codegen';

const GitHubCalendar = dynamic(
  () => import('react-github-calendar').then(m => m.GitHubCalendar),
  { ssr: false },
);

const SHAPES = ['square', 'circle', 'pill', 'diamond', 'star', 'hexagon', 'triangle', 'egg', 'github'] as const;
const MONTHS = [
  { label: 'All', value: 0 },
  { label: '3mo', value: 3 },
  { label: '6mo', value: 6 },
  { label: '12mo', value: 12 },
];

const KEYWORDS = new Set([
  'import','export','from','return','const','let','var','function','default',
  'if','else','for','while','do','switch','case','break','continue','new','this',
  'typeof','instanceof','void','delete','in','of','class','extends','super',
  'yield','await','async','try','catch','finally','throw','interface','type',
  'as','enum','implements','abstract','private','protected','public','static',
  'readonly','declare','namespace','module','global','undefined','null','true','false','keyof',
]);

function highlightCode(code: string): string {
  const html = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const parts: string[] = [];
  const kinds: string[] = [];
  let last = 0;
  const re = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|'[^'\\]*(?:\\.[^'\\]*)*'|"[^"\\]*(?:\\.[^"\\]*)*"|`[^`\\]*(?:\\.[^`\\]*)*`)/g;
  for (let m; (m = re.exec(html)) !== null; ) {
    parts.push(html.slice(last, m.index));
    parts.push(m[0]);
    kinds.push(m[0].startsWith('//') || m[0].startsWith('/*') ? 'comment' : 'string');
    last = m.index + m[0].length;
  }
  parts.push(html.slice(last));
  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) {
      const kind = kinds[(i - 1) / 2];
      parts[i] = kind === 'comment'
        ? `<span style="color:#5c6370;font-style:italic">${parts[i]}</span>`
        : `<span style="color:#98c379">${parts[i]}</span>`;
    } else {
      parts[i] = parts[i]
        .replace(/(&lt;\/?)([A-Za-z]\w*)/g, '$1<span style="color:#c678dd">$2</span>')
        .replace(/\b(\d+\.?\d*)\b/g, '<span style="color:#d19a66">$1</span>')
        .replace(/\b([a-zA-Z_]\w*)\b/g, m => KEYWORDS.has(m) ? `<span style="color:#c678dd">${m}</span>` : m);
    }
  }
  return parts.join('');
}

function starPath(cx: number, cy: number, size: number) {
  const o = size / 2, i = size / 5;
  const p: string[] = [];
  for (let n = 0; n < 5; n++) {
    const a = (n * 2 * Math.PI) / 5 - Math.PI / 2;
    const b = a + Math.PI / 5;
    p.push(`${cx + o * Math.cos(a)},${cy + o * Math.sin(a)}`);
    p.push(`${cx + i * Math.cos(b)},${cy + i * Math.sin(b)}`);
  }
  return `M${p.join('L')}Z`;
}
function hexPath(cx: number, cy: number, size: number) {
  const r = size / 2;
  const p: string[] = [];
  for (let n = 0; n < 6; n++) {
    const a = (n * 2 * Math.PI) / 6 - Math.PI / 2;
    p.push(`${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`);
  }
  return `M${p.join('L')}Z`;
}
function triPath(cx: number, cy: number, size: number) {
  const r = size / 2;
  return `M${cx},${cy - r}L${cx + r},${cy + r}L${cx - r},${cy + r}Z`;
}
export default function HomePage() {
  const [config, setConfig] = useState<CalendarConfig>({
    themeColors: ['#141414', '#1e3a2f', '#2d6a4f', '#40916c', '#52b788'],
    blockShape: 'square',
    showTotalCount: true,
    showColorLegend: true,
    showTooltip: true,
    months: 0,
    labelText: '',
    totalLabel: '',
  });
  const [copied, setCopied] = useState(false);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; content: string } | null>(null);

  const code = useMemo(() => generateCode(config), [config]);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  const updateColor = (i: number, v: string) => {
    const next = [...config.themeColors];
    next[i] = v;
    setConfig({ ...config, themeColors: next });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderBlock = (block: any, activity: any) => {
    const { x, y, width: w, height: h, fill } = block.props;
    const cx = x + w / 2, cy = y + h / 2;
    const shape = config.blockShape;

    let shaped: React.ReactElement;
    switch (shape) {
      case 'circle':
        shaped = <circle cx={cx} cy={cy} r={w / 2} fill={fill} />; break;
      case 'pill':
        shaped = <rect x={x} y={y} width={w} height={h} rx={3} ry={3} fill={fill} />; break;
      case 'diamond':
        shaped = <rect x={x} y={y} width={w} height={h} fill={fill} transform={`rotate(45 ${cx} ${cy})`} />; break;
      case 'star':
        shaped = <path d={starPath(cx, cy, w)} fill={fill} />; break;
      case 'hexagon':
        shaped = <path d={hexPath(cx, cy, w)} fill={fill} />; break;
      case 'triangle':
        shaped = <path d={triPath(cx, cy, w)} fill={fill} />; break;
      case 'egg':
        shaped = <ellipse cx={cx} cy={cy} rx={w * 0.35} ry={w / 2} fill={fill} />; break;
      case 'github':
        shaped = (
          <g transform={`translate(${x}, ${y}) scale(${w / 24})`}>
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" fill={fill} />
          </g>
        ); break;
      default:
        shaped = block;
    }

    if (!config.showTooltip) return shaped;

    return (
      <g
        onMouseEnter={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setTooltip({
            x: r.left + r.width / 2,
            y: r.top - 8,
            content: `${activity.count} contribution${activity.count !== 1 ? 's' : ''} on ${new Date(activity.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
          });
        }}
        onMouseLeave={() => setTooltip(null)}
        style={{ cursor: 'pointer' }}
      >
        {shaped}
      </g>
    );
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    fontSize: '13px',
    borderRadius: '6px',
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.04)',
    color: '#ccc',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    color: '#888',
    fontSize: '12px',
    marginBottom: '8px',
  };

  const btnStyle = (active: boolean): React.CSSProperties => ({
    padding: '5px 10px',
    fontSize: '11px',
    borderRadius: '6px',
    border: `1px solid ${active ? 'rgba(168,85,247,0.5)' : 'rgba(255,255,255,0.1)'}`,
    background: active ? 'rgba(168,85,247,0.15)' : 'transparent',
    color: active ? '#a78bfa' : '#777',
    cursor: 'pointer',
    textAlign: 'center' as const,
  });

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px 96px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 56px)',
          fontWeight: 700,
          letterSpacing: '-1.5px',
          color: '#fff',
          marginBottom: '12px',
          lineHeight: 1.05,
        }}>
          GitHub Calendar
          <br />
          <span style={{
            background: 'linear-gradient(90deg, #a78bfa, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Builder
          </span>
        </h1>
        <p style={{ color: '#666', fontSize: '15px', maxWidth: '460px', margin: '0 auto', lineHeight: 1.6 }}>
          Customize your contribution graph. Copy the code. Drop it in your portfolio.
        </p>
      </div>

      {/* Main grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 300px',
        gap: '24px',
        alignItems: 'start',
      }}>
        {/* Preview + Code */}
        <div style={{ minWidth: 0 }}>
          {/* Preview */}
          <div style={{
            background: 'var(--canvas)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '8px',
            padding: '48px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '320px',
            overflow: 'hidden',
          }}>
            <div style={{ width: '100%', overflowX: 'auto' }}>
              {config.labelText && (
                <p style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}>
                  {config.labelText}
                </p>
              )}
              <GitHubCalendar
                username="torvalds"
                colorScheme="dark"
                theme={{ dark: config.themeColors }}
                renderBlock={config.blockShape !== 'square' || config.showTooltip ? renderBlock : undefined}
                showTotalCount={config.showTotalCount}
                labels={config.totalLabel ? { totalCount: config.totalLabel } : undefined}
                showColorLegend={config.showColorLegend}
                blockSize={12}
                blockMargin={4}
                transformData={config.months > 0 ? (data: any[]) => {
                  const cutoff = new Date();
                  cutoff.setMonth(cutoff.getMonth() - config.months);
                  return data.filter((day: any) => new Date(day.date) >= cutoff);
                } : undefined}
              />
            </div>
          </div>

          {/* Tooltip */}
          {tooltip && (
            <div style={{
              position: 'fixed',
              left: `${tooltip.x}px`,
              top: `${tooltip.y}px`,
              transform: 'translate(-50%, -100%)',
              background: '#383838',
              color: '#fff',
              padding: '6px 10px',
              borderRadius: '6px',
              fontSize: '11px',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              zIndex: 1000,
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}>
              {tooltip.content}
            </div>
          )}

          {/* Code snippet */}
          <div style={{ marginTop: '24px', overflow: 'hidden' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              background: '#111',
              border: '1px solid rgba(255,255,255,0.07)',
              borderBottom: 'none',
              borderRadius: '8px 8px 0 0',
            }}>
              <span style={{ color: '#666', fontSize: '12px', fontWeight: 600 }}>Code</span>
              <button
                onClick={copyCode}
                style={{
                  marginLeft: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  background: 'transparent',
                  border: 'none',
                  color: '#888',
                  fontSize: '12px',
                  cursor: 'pointer',
                  padding: '4px 8px',
                }}
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                {copied ? 'Copied!' : 'Copy code'}
              </button>
            </div>
            <pre style={{
              padding: '16px',
              margin: 0,
              background: '#111',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '0 0 8px 8px',
              overflowX: 'auto',
              fontSize: '13px',
              lineHeight: 1.7,
              whiteSpace: 'pre',
              fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
              maxWidth: '100%',
              boxSizing: 'border-box',
            }}>
              <code dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
            </pre>
          </div>
        </div>

        {/* Controls sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Presets */}
          <div style={{
            background: '#111',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '8px',
            padding: '20px',
          }}>
            <p style={{ color: '#555', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>Themes</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {presets.map(p => (
                <button
                  key={p.name}
                  onClick={() => setConfig({ ...config, themeColors: [...p.colors] })}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: `1px solid ${config.themeColors.join() === p.colors.join() ? 'rgba(168,85,247,0.4)' : 'rgba(255,255,255,0.06)'}`,
                    background: config.themeColors.join() === p.colors.join() ? 'rgba(168,85,247,0.1)' : 'transparent',
                    cursor: 'pointer',
                    width: '100%',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {p.colors.map((c, i) => (
                      <div key={i} style={{ width: '14px', height: '14px', background: c, borderRadius: '3px' }} />
                    ))}
                  </div>
                  <span style={{ color: '#ccc', fontSize: '12px' }}>{p.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Shape */}
          <div style={{
            background: '#111',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '8px',
            padding: '20px',
          }}>
            <p style={labelStyle}>Block shape</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {SHAPES.map(s => (
                <button
                  key={s}
                  onClick={() => setConfig({ ...config, blockShape: s })}
                  style={btnStyle(config.blockShape === s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Months */}
          <div style={{
            background: '#111',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '8px',
            padding: '20px',
          }}>
            <p style={labelStyle}>Show range</p>
            <div style={{ display: 'flex', gap: '4px' }}>
              {MONTHS.map(o => (
                <button
                  key={o.value}
                  onClick={() => setConfig({ ...config, months: o.value })}
                  style={{ ...btnStyle(config.months === o.value), flex: 1 }}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          {/* Label */}
          <div style={{
            background: '#111',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '8px',
            padding: '20px',
          }}>
            <p style={labelStyle}>Header label</p>
            <input
              value={config.labelText}
              onChange={e => setConfig({ ...config, labelText: e.target.value })}
              placeholder="e.g. Contributions"
              style={inputStyle}
            />
          </div>

          {/* Total label */}
          <div style={{
            background: '#111',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '8px',
            padding: '20px',
          }}>
            <p style={labelStyle}>Total count label</p>
            <input
              value={config.totalLabel}
              onChange={e => setConfig({ ...config, totalLabel: e.target.value })}
              placeholder={'{{count}} contributions in {{year}}'}
              style={inputStyle}
            />
          </div>

          {/* Colors */}
          <div style={{
            background: '#111',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '8px',
            padding: '20px',
          }}>
            <p style={labelStyle}>Theme colors</p>
            <div style={{ display: 'flex', gap: '6px' }}>
              {config.themeColors.map((c, i) => (
                <input
                  key={i}
                  type="color"
                  value={c}
                  onChange={e => updateColor(i, e.target.value)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    cursor: 'pointer',
                    padding: 0,
                    background: 'none',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div style={{
            background: '#111',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '8px',
            padding: '20px',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#999', fontSize: '13px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={config.showTotalCount}
                  onChange={e => setConfig({ ...config, showTotalCount: e.target.checked })}
                  style={{ accentColor: '#7c3aed' }}
                />
                Show total count
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#999', fontSize: '13px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={config.showColorLegend}
                  onChange={e => setConfig({ ...config, showColorLegend: e.target.checked })}
                  style={{ accentColor: '#7c3aed' }}
                />
                Show color legend
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#999', fontSize: '13px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={config.showTooltip}
                  onChange={e => setConfig({ ...config, showTooltip: e.target.checked })}
                  style={{ accentColor: '#7c3aed' }}
                />
                Show hover tooltip
              </label>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          main > div:nth-of-type(2) { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Footer */}
      <footer className="site-footer" style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: '32px 0',
        marginTop: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <div className="footer-brand" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '22px', height: '22px', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          </div>
          <span style={{ color: '#555', fontSize: '13px' }}>CalendarUI — MIT License</span>
        </div>
        <div className="footer-links" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <a href="https://www.npmjs.com/package/react-github-calendar" target="_blank" rel="noreferrer" style={{ color: '#555', fontSize: '13px', textDecoration: 'none' }}>npm</a>
          <a href="https://github.com/grubersjoe/react-github-calendar" target="_blank" rel="noreferrer" style={{ color: '#555', fontSize: '13px', textDecoration: 'none' }}>GitHub</a>
          <a href="https://grubersjoe.github.io/react-github-calendar/" target="_blank" rel="noreferrer" style={{ color: '#555', fontSize: '13px', textDecoration: 'none' }}>Docs</a>
        </div>
      </footer>
    </main>
  );
}
