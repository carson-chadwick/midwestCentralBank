import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X,
  Activity,
  Cpu,
  Database,
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
    id: 'resilience',
    name: 'Operational Resilience',
    icon: <Radar size={22} />,
    section: 'roof',
    x: 400, y: 40,
    requirements: ['NIST-RECOVERY', 'NIST-ID.RA']
  },
  {
    id: 'identity',
    name: 'Identity Access Control',
    icon: <UserCheck size={22} />,
    section: 'pillars',
    x: 620, y: 290,
    requirements: ['PCI-8.4', 'GLBA-PRETEXT', 'NIST-PR.AC']
  },
  {
    id: 'encryption',
    name: 'Encryption & Cryptography',
    icon: <KeyRound size={24} />,
    section: 'vault',
    x: 400, y: 305,
    requirements: ['PCI-3.5', 'GLBA-SAFEGUARD']
  },
  {
    id: 'lifecycle',
    name: 'System Lifecycle Security',
    icon: <ShieldAlert size={22} />,
    section: 'foundation',
    x: 400, y: 420,
    requirements: ['PCI-6.3']
  },
  {
    id: 'privacy',
    name: 'Data Privacy Governance',
    icon: <EyeOff size={22} />,
    section: 'archive',
    x: 120, y: 340,
    requirements: ['GLBA-PRIVACY']
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
      
      <svg viewBox="0 0 800 500" className="bank-svg-map">
        {/* 1. Operational Resilience (Roof + Antenna) */}
        <g className={`arch-group ${activeSection === 'roof' ? 'highlight' : ''}`}>
          <polygon points="400,50 100,150 700,150" className="arch-part" />
          <rect x="120" y="150" width="560" height="40" className="arch-part" />
          {/* Building Label */}
          <text x="400" y="175" textAnchor="middle" fill="currentColor" style={{ fontSize: '14px', fontWeight: 'bold', letterSpacing: '2px', opacity: 0.8 }} className="arch-part">MIDWEST CENTRAL BANK</text>
          {/* Antenna */}
          <line x1="400" y1="50" x2="400" y2="10" className="arch-part" />
          <circle cx="400" cy="10" r="3" className="arch-part" />
          {/* Radar Waves */}
          {[20, 35, 50].map((r, i) => (
            <path 
              key={i}
              d={`M ${400-r},${10-r/2} A ${r},${r} 0 0 1 ${400+r},${10-r/2}`}
              className={`arch-part ${activeSection === 'roof' ? 'pulse-slow' : ''}`}
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
          <circle cx="400" cy="305" r="70" className="arch-part" />
          <circle cx="400" cy="305" r="60" className="arch-part" />
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
          <rect x="320" y="260" width="10" height="90" className="arch-part" />
        </g>

        {/* 4. System Lifecycle (Foundation + Server Racks) */}
        <g className={`arch-group ${activeSection === 'foundation' ? 'highlight' : ''}`}>
          <rect x="80" y="390" width="640" height="20" className="arch-part" />
          <rect x="60" y="410" width="680" height="20" className="arch-part" />
          <rect x="40" y="430" width="720" height="20" className="arch-part" />
          {/* Server LED Details */}
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
          {/* ATM Label */}
          <text x="120" y="270" textAnchor="middle" fill="currentColor" style={{ fontSize: '12px', fontWeight: 'bold', opacity: 0.6 }} className="arch-part">ATM</text>
          {/* ATM Body */}
          <rect x="90" y="280" width="60" height="110" className="arch-part" />
          {/* Screen */}
          <rect x="98" y="295" width="44" height="30" className="arch-part" />
          {/* Keypad area */}
          <rect x="102" y="335" width="36" height="15" className="arch-part" />
          {/* Cash Slot */}
          <line x1="102" y1="365" x2="138" y2="365" className="arch-part" />
          <rect x="110" y="362" width="20" height="6" className="arch-part" />
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

      {/* Header */}
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

      {/* Main Stage */}
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

      {/* Compliance Sidebar Overlay */}
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
                    <div className="status-badge">NON-COMPLIANT</div>
                  </div>
                  
                  <div className="nested-requirements">
                    {group.requirements.map(reqId => {
                      const req = complianceChecklist.find(r => r.id === reqId);
                      return req ? (
                        <div key={reqId} className="requirement-detail">
                          <div className="req-header">
                            <span className="req-id">{req.id}</span>
                            <span className="req-std">{req.standard}</span>
                          </div>
                          <div className="req-name">{req.name}</div>
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

      {/* Footer Interface */}
      <footer className="cyber-footer">
        <div className="footer-section log-section">
          <div className="terminal-log">
            <div className="log-line">{'>'} {hoveredGroup ? `AUDITING_SECTOR: ${complianceGroups.find(g => g.id === hoveredGroup)?.name}` : 'SCANNING_REGULATORY_ENVIRONMENT...'}</div>
            <div className="log-line">{'>'} COMPLIANCE_STATUS: [CRITICAL_FAILURE]</div>
          </div>
        </div>

        <div className="footer-section progress-section">
          <div className="scan-progress-container">
            <div className="progress-text">TOTAL_COMPLIANCE_GAP: {scanProgress.toFixed(1)}%</div>
            <div className="progress-track">
              <motion.div 
                className="progress-fill" 
                animate={{ width: `${scanProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        <div className="footer-section status-section">
          <div className="data-stream">
            <div className="stream-item"><Cpu size={14} /> SCANNER: <span className="green">UP</span></div>
            <div className="stream-item"><Database size={14} /> ARCHIVE: <span className="green">ONLINE</span></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
