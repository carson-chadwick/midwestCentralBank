import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X,
  Activity,
  ClipboardList,
  AlertTriangle,
  History,
  Radar,
  UserCheck,
  KeyRound,
  EyeOff,
  ShieldAlert
} from 'lucide-react';
import { complianceChecklist } from './data';
import './App.css';

// 1. Consolidated Compliance Categories
const complianceGroups = [
  {
    id: 'core',
    name: 'Core Banking System',
    icon: <Radar size={22} />,
    section: 'roof',
    x: 400, y: 55,
    requirements: ['CORE-SYSTEM']
  },
  {
    id: 'endpoints',
    name: 'Endpoints & Directory',
    icon: <UserCheck size={22} />,
    section: 'pillars',
    x: 620, y: 290,
    requirements: ['ENDPOINTS-DIR']
  },
  {
    id: 'encryption',
    name: 'Data & Encryption',
    icon: <KeyRound size={24} />,
    section: 'vault',
    x: 400, y: 305,
    requirements: ['DATA-ENCRYPTION']
  },
  {
    id: 'backups',
    name: 'Backups',
    icon: <ShieldAlert size={22} />,
    section: 'foundation',
    x: 400, y: 420,
    requirements: ['BACKUPS']
  },
  {
    id: 'monitoring',
    name: 'Monitoring',
    icon: <EyeOff size={22}  />,
    section: 'archive',
    x: 120, y: 340,
    requirements: ['MONITORING']
  }
];

const Bank2DMap = ({ 
  hoveredGroup, 
  onHover, 
  onSelect 
}: { 
  hoveredGroup: string | null, 
  onHover: (id: string | null) => void,
  onSelect: (id: string) => void
}) => {
  const activeSection = hoveredGroup ? complianceGroups.find(g => g.id === hoveredGroup)?.section : null;

  return (
    <div className="bank-blueprint-container">
      <div className="blueprint-grid" />
      
      <svg viewBox="20 -20 860 480" className="bank-svg-map">
        {/* 1. System Lifecycle (Roof + Signal Tower) */}
        <g className={`arch-group ${activeSection === 'roof' ? 'highlight' : ''}`}>
          <polygon points="400,50 100,150 700,150" className="arch-part" />
          <rect x="120" y="150" width="560" height="40" className="arch-part" />
          {/* Building Label */}
          <text x="400" y="176" textAnchor="middle" fill="currentColor" style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '4px', opacity: 0.9 }} className="arch-part">MIDWEST CENTRAL BANK</text>
          
          {/* Signal Tower Mast */}
          <line x1="400" y1="50" x2="400" y2="5" className="arch-part" />
          {/* Signal Bars (Horizontal) */}
          {[12, 22, 32, 42].map((yOffset, i) => (
            <line 
              key={i}
              x1={400 - (6 + i * 4)} y1={50 - yOffset} 
              x2={400 + (6 + i * 4)} y2={50 - yOffset} 
              className={`arch-part signal-bar`}
              style={{ animationDelay: `${i * 0.2}s` } as any}
            />
          ))}
          {/* Tower Tip and Signal Arcs */}
          <circle cx="400" cy="5" r="2" className="arch-part" />
          {[1, 2, 3].map((i) => (
            <path 
              key={i}
              d={`M ${400 - i*6},${5 - i*2} A ${i*6},${i*6} 0 0 1 ${400 + i*6},${5 - i*2}`}
              className="arch-part signal-arc"
              style={{ animationDelay: `${i * 0.4}s` } as any}
              fill="none"
            />
          ))}
        </g>

        {/* 2. Identity & Access (Pillars + Scanning Lasers) */}
        <g className={`arch-group ${activeSection === 'pillars' ? 'highlight' : ''}`}>
          {[180, 320, 480, 620].map((x, i) => (
            <g key={i}>
              <rect x={x-15} y="190" width="30" height="200" className="arch-part" />
              {/* Keypads on pillars */}
              <rect x={x-10} y="250" width="20" height="30" className="arch-part" fill="rgba(0,0,0,0.5)" />
              <circle cx={x} cy="265" r="2" className="arch-part" />
            </g>
          ))}
          {/* Scanning Lasers between central pillars */}
          {[230, 270, 310, 350].map((y, i) => (
            <line 
              key={i} 
              x1="335" y1={y} x2="465" y2={y} 
              className={`arch-part laser-line ${activeSection === 'pillars' ? 'active' : ''}`}
              strokeDasharray="4 4"
            />
          ))}
        </g>

        {/* 3. Vault Door (Encryption & Cryptography) */}
        <g className={`arch-group ${activeSection === 'vault' ? 'highlight' : ''}`}>
          <rect x="330" y="235" width="140" height="140" className="arch-part" opacity="0.1" fill="currentColor" />
          <rect x="320" y="260" width="10" height="90" className="arch-part" />
          <g className="vault-door-group">
            <circle cx="400" cy="305" r="70" className="arch-part" fill="rgba(0,0,0,0.8)" />
            <circle cx="400" cy="305" r="60" className="arch-part" />
            <g className="vault-wheel">
              <circle cx="400" cy="305" r="15" className="arch-part" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
                <line 
                  key={angle}
                  x1="400" y1="305" 
                  x2={400 + 45 * Math.cos(angle * Math.PI / 180)} 
                  y2={305 + 45 * Math.sin(angle * Math.PI / 180)} 
                  className="arch-part"
                />
              ))}
            </g>
          </g>
        </g>

        {/* 4. Operational Resilience (Foundation + Server Racks) */}
        <g className={`arch-group ${activeSection === 'foundation' ? 'highlight' : ''}`}>
          <rect x="80" y="390" width="640" height="20" className="arch-part" />
          <rect x="60" y="410" width="680" height="20" className="arch-part" />
          <rect x="40" y="430" width="720" height="20" className="arch-part" />
          {[120, 240, 360, 480, 600].map((x, i) => (
            <g key={i}>
              <circle cx={x} cy="400" r="1.5" className="arch-part LED-dot" />
              <circle cx={x+20} cy="400" r="1.5" className="arch-part LED-dot" />
              <line x1={x-40} y1="420" x2={x+40} y2="420" className="arch-part" strokeDasharray="2 2" />
            </g>
          ))}
        </g>

        {/* 5. Data Privacy (ATM outside bank) */}
        <g className={`arch-group ${activeSection === 'archive' ? 'highlight' : ''}`}>
          <text x="120" y="270" textAnchor="middle" fill="currentColor" style={{ fontSize: '14px', fontWeight: 'bold', opacity: 0.8 }} className="arch-part">ATM</text>
          <rect x="90" y="280" width="60" height="110" className="arch-part" />
          <rect x="98" y="295" width="44" height="30" className="arch-part" />
          <rect x="102" y="335" width="36" height="15" className="arch-part" />
          <line x1="102" y1="365" x2="138" y2="365" className="arch-part" />
          <rect x="110" y="362" width="20" height="6" className="arch-part" />
          
          {/* Leaking Data (PII, SSN, PIN) */}
          {[
            { label: '[PII]', delay: 0 },
            { label: '[SSN]', delay: 1 },
            { label: '[PIN]', delay: 2 }
          ].map((item, i) => (
            <g key={i} className="data-record" style={{ animationDelay: `${item.delay}s` } as any}>
              <rect x="102" y="365" width="36" height="10" rx="1" className="arch-part" />
              <text x="120" y="372" textAnchor="middle" style={{ fontSize: '6px', fill: 'currentColor', fontWeight: 'bold' }}>{item.label}</text>
            </g>
          ))}
        </g>

        {/* Interactive Primary Nodes */}
        {complianceGroups.map(group => {
          const isHovered = hoveredGroup === group.id;
          return (
            <g 
              key={group.id}
              className={`vuln-node-2d ${isHovered ? 'active' : ''}`}
              onMouseEnter={() => onHover(group.id)}
              onMouseLeave={() => onHover(null)}
              onClick={() => onSelect(group.id)}
              style={{ '--node-color': 'var(--neon-blue)' } as any}
            >
              <circle cx={group.x} cy={group.y} r="25" className="node-bg" />
              <foreignObject x={group.x-11} y={group.y-11} width="22" height="22">
                <div className="node-icon-wrapper">
                  {group.icon}
                </div>
              </foreignObject>
              {isHovered && (
                <foreignObject x={group.x + 35} y={group.y - 25} width="240" height="50">
                  <div className="node-label-2d">
                    <div className="label-title">{group.name}</div>
                  </div>
                </foreignObject>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const App: React.FC = () => {
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);
  const [showCompliance, setShowCompliance] = useState(false);
  const [scanProgress, setScanProgress] = useState(92);
  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const timer = setInterval(() => {
      setScanProgress(p => p > 98.8 ? 92.4 : p + 0.1);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const handleMapSelect = (id: string) => {
    setShowCompliance(true);
    setTimeout(() => {
      scrollRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  return (
    <div className="container cyber-theme">
      <div className="scanline" />
      <div className="noise" />
      <div className="grid-overlay" />

      <header className="cyber-header">
        <div className="glitch-wrapper">
          <h1 className="glitch" data-text="MIDWEST CENTRAL BANK">MIDWEST CENTRAL BANK</h1>
        </div>
        <div className="header-actions">
          <button className="hud-btn" onClick={() => setShowCompliance(!showCompliance)}>
            <ClipboardList size={18} /> REGULATORY_SCORECARD
          </button>
          <div className="system-status">
            <Activity size={16} className="blink-fast" />
            <span>THREAT_DETECTION: <span className="red">ACTIVE</span></span>
          </div>
        </div>
      </header>

      <main className="stage-wrapper">
        <div className="map-stage">
          <div className="bank-diagram-2d">
            <Bank2DMap 
              hoveredGroup={hoveredGroup} 
              onHover={setHoveredGroup} 
              onSelect={handleMapSelect} 
            />
          </div>
          <div className="instruction">SELECT AN ARCHITECTURAL SECTOR TO VIEW CONSOLIDATED COMPLIANCE GAPS</div>
        </div>
      </main>

      <AnimatePresence>
        {showCompliance && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="compliance-sidebar"
          >
            <div className="sidebar-header">
              <h3>REGULATORY_SCORECARD</h3>
              <button onClick={() => setShowCompliance(false)}><X size={20}/></button>
            </div>
            <div className="checklist">
              {complianceGroups.map(group => (
                <div 
                  key={group.id} 
                  ref={el => scrollRefs.current[group.id] = el}
                  className={`checklist-item failed group-card ${hoveredGroup === group.id ? 'active' : ''}`}
                  onMouseEnter={() => setHoveredGroup(group.id)}
                  onMouseLeave={() => setHoveredGroup(null)}
                >
                  <div className="group-header">
                    <div className="group-icon-title">
                      {group.icon}
                      <h4>{group.name}</h4>
                    </div>
                  </div>
                  
                  <div className="nested-requirements">
                    {group.requirements.map(reqId => {
                      const req = complianceChecklist.find(r => r.id === reqId);
                      return req ? (
                        <div key={reqId} className="requirement-detail">
                          <p className="req-desc">{req.description}</p>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default App;
