import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X,
  Radio,
  Scan,
  Activity,
  Cpu,
  Database,
  ClipboardList,
  Wrench,
  AlertTriangle,
  Lock,
  Shield,
  History,
  Terminal,
  Server,
  Radar,
  UserCheck,
  KeyRound
} from 'lucide-react';
import { vulnerabilities, complianceChecklist } from './data';
import type { Vulnerability } from './data';
import './App.css';

const Bank2DMap = ({ onSelect, hoveredNode, onHover }: { 
  onSelect: (v: Vulnerability) => void,
  hoveredNode: string | null,
  onHover: (id: string | null) => void
}) => {
  return (
    <div className="bank-blueprint-container">
      <div className="blueprint-grid" />
      
      {/* 2D Bank Architecture SVG */}
      <svg viewBox="0 0 800 500" className="bank-svg-map">
        {/* Background Pediment */}
        <polygon 
          points="400,50 100,150 700,150" 
          className={`arch-part ${hoveredNode === 'perimeter-1' ? 'highlight' : ''}`}
        />
        {/* Entablature */}
        <rect 
          x="120" y="150" width="560" height="40" 
          className={`arch-part ${hoveredNode === 'perimeter-1' ? 'highlight' : ''}`}
        />

        {/* Vault Core (Data Protection) */}
        <rect 
          x="330" y="220" width="140" height="170" 
          className={`arch-part ${hoveredNode === 'vault-1' ? 'highlight' : ''}`}
        />
        
        {/* Pillars */}
        {[180, 320, 480, 620].map((x, i) => (
          <rect 
            key={i} x={x-15} y="190" width="30" height="200" 
            className={`arch-part ${hoveredNode === 'terminal-1' ? 'highlight' : ''}`}
          />
        ))}

        {/* Foundation / Steps (Recovery Readiness) */}
        <rect x="80" y="390" width="640" height="20" className={`arch-part ${hoveredNode === 'archive-1' ? 'highlight' : ''}`} />
        <rect x="60" y="410" width="680" height="20" className={`arch-part ${hoveredNode === 'archive-1' ? 'highlight' : ''}`} />
        <rect x="40" y="430" width="720" height="20" className={`arch-part ${hoveredNode === 'archive-1' ? 'highlight' : ''}`} />

        {/* Interactive Nodes */}
        {vulnerabilities.map(v => {
          const color = v.severity === 'CRITICAL' ? 'var(--neon-red)' : (v.severity === 'HIGH' ? 'var(--neon-orange)' : 'var(--neon-yellow)');
          
          // Map vulnerability IDs to specific SVG coordinates
          const getCoords = (id: string) => {
            switch(id) {
              case 'perimeter-1': return { x: 400, y: 110, icon: <Radar size={24} /> };
              case 'terminal-1': return { x: 620, y: 290, icon: <UserCheck size={24} /> };
              case 'vault-1': return { x: 400, y: 300, icon: <KeyRound size={26} /> };
              case 'archive-1': return { x: 180, y: 290, icon: <History size={24} /> };
              default: return { x: 0, y: 0, icon: <Activity size={24} /> };
            }
          };

          const { x, y, icon } = getCoords(v.id);

          return (
            <g 
              key={v.id}
              className={`vuln-node-2d ${hoveredNode === v.id ? 'active' : ''}`}
              onMouseEnter={() => onHover(v.id)}
              onMouseLeave={() => onHover(null)}
              onClick={() => onSelect(v)}
              style={{ '--node-color': color } as any}
            >
              <circle cx={x} cy={y} r="25" className="node-bg" />
              <foreignObject x={x-12} y={y-12} width="24" height="24">
                <div className="node-icon-wrapper" style={{ color }}>
                  {icon}
                </div>
              </foreignObject>
              
              {hoveredNode === v.id && (
                <foreignObject x={x + 35} y={y - 40} width="200" height="80">
                  <div className="node-label-2d" style={{ borderLeftColor: color }}>
                    <div className="label-domain">{v.domain}</div>
                    <div className="label-title">{v.title}</div>
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
  const [selectedVuln, setSelectedVuln] = useState<Vulnerability | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [scanProgress, setScanProgress] = useState(92);
  const [showCompliance, setShowCompliance] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setScanProgress(p => p > 98.8 ? 92.4 : p + 0.1);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  const transition = { type: 'spring' as const, stiffness: 200, damping: 25 };

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
            <ClipboardList size={18} /> COMPLIANCE_SCORECARD
          </button>
          <div className="system-status">
            <Activity size={16} className="blink-fast" />
            <span>THREAT_DETECTION: <span className="red">ACTIVE</span></span>
          </div>
        </div>
      </header>

      {/* Main Stage */}
      <main className="stage-wrapper">
        <AnimatePresence mode="wait">
          {!selectedVuln ? (
            <motion.div 
              key="map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="map-stage"
            >
              <div className="risk-hud">
                <h3>DOMAIN_RISK_DISTRIBUTION</h3>
                {vulnerabilities.map(v => (
                  <div key={v.id} className={`hud-item ${hoveredNode === v.id ? 'active' : ''}`}>
                    <div className="hud-label">
                      <span>{v.domain}</span>
                      <span>{v.score}</span>
                    </div>
                    <div className="hud-bar">
                      <div className="hud-fill" style={{ width: `${v.weight}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="bank-diagram-2d">
                <Bank2DMap 
                  onSelect={setSelectedVuln} 
                  hoveredNode={hoveredNode} 
                  onHover={setHoveredNode} 
                />
              </div>

              <div className="instruction">SELECT ARCHITECTURAL SECTORS TO AUDIT VULNERABILITIES</div>
            </motion.div>
          ) : (
            <motion.div 
              key="detail"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={transition}
              className="detail-stage"
            >
              <div className={`vuln-report ${selectedVuln.severity.toLowerCase()}`}>
                <div className="report-header">
                  <div className="header-top">
                    <span className={`tag ${selectedVuln.severity.toLowerCase()}`}>
                      {selectedVuln.severity === 'CRITICAL' ? 'CRITICAL_FINDING' : (selectedVuln.severity === 'HIGH' ? 'HIGH_PRIORITY' : 'MEDIUM_RISK')}
                    </span>
                    <button className="close-btn" onClick={() => setSelectedVuln(null)}>
                      <X size={24} />
                    </button>
                  </div>
                  <h2>{selectedVuln.title}</h2>
                  <div className="codename-bar">
                    <Radio size={16} /> DOMAIN: {selectedVuln.domain.toUpperCase()} | SCORE: {selectedVuln.score}
                  </div>
                </div>

                <div className="report-grid">
                  <div className="report-section">
                    <h3><Scan size={18} /> OBSERVATION</h3>
                    <p>{selectedVuln.description}</p>
                  </div>
                  <div className="report-section highlight">
                    <h3><Wrench size={18} /> REMEDIATION_PLAN</h3>
                    <p>{selectedVuln.remediation}</p>
                  </div>
                </div>

                <div className="report-footer">
                  <div className="severity-meter">
                    <span>THREAT LEVEL:</span>
                    <div className="blocks">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div 
                          key={i} 
                          className={`block ${i <= (selectedVuln.severity === 'CRITICAL' ? 5 : (selectedVuln.severity === 'HIGH' ? 4 : 3)) ? 'active' : ''} ${i === 5 && selectedVuln.severity === 'CRITICAL' ? 'critical' : (selectedVuln.severity === 'HIGH' ? 'high' : 'medium')}`} 
                        />
                      ))}
                    </div>
                  </div>
                  <div className="node-info">
                    LINKED_REG: {selectedVuln.complianceID.join(' / ')}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
              {complianceChecklist.map(req => (
                <div key={req.id} className="checklist-item failed">
                  <div className="check-icon"><AlertTriangle size={18} /></div>
                  <div className="check-content">
                    <div className="check-title">{req.id}: {req.name}</div>
                    <div className="check-std">{req.standard}</div>
                    <p>{req.description}</p>
                    <div className="status-badge">NON-COMPLIANT</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="cyber-footer">
        <div className="footer-section log-section">
          <div className="terminal-log">
            <div className="log-line">{'>'} {hoveredNode ? `ANALYZING: ${vulnerabilities.find(v => v.id === hoveredNode)?.domain.toUpperCase()}` : 'SCANNING_ALL_SECTORS...'}</div>
            <div className="log-line">{'>'} ENCRYPTION_INTEGRITY: [FAILED]</div>
          </div>
        </div>

        <div className="footer-section progress-section">
          <div className="scan-progress-container">
            <div className="progress-text">AUDIT_COMPLETION: {scanProgress.toFixed(1)}%</div>
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
            <div className="stream-item"><Cpu size={14} /> CPU: <span className="green">14%</span></div>
            <div className="stream-item"><Database size={14} /> LINK: <span className="green">UP</span></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
