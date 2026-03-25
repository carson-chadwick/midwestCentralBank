export interface Vulnerability {
  id: string;
  title: string;
  domain: string;
  score: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  description: string;
  impact: string;
  remediation: string;
  weight: number; 
  complianceID: string[]; 
  location: { x: number; y: number };
}

export interface ComplianceReq {
  id: string;
  name: string;
  description: string;
}

export const vulnerabilities: Vulnerability[] = [
  {
    id: "core-1",
    domain: "Core Banking System",
    score: "1.0/5",
    title: "End-of-Life OS/400 Core",
    severity: "CRITICAL",
    description: "The infrastructure centers on an IBM iSeries (AS/400) running OS/400. This platform is End-of-Life, lacking security patches and support.",
    impact: "Architecturally incapable of running modern EDR agents, rendering behavioral ransomware detection impossible.",
    remediation: "Replace or modernize the legacy core to a supported platform capable of running contemporary security tooling.",
    weight: 35,
    complianceID: ["CORE-SYSTEM"],
    location: { x: 50, y: 15 }
  },
  {
    id: "endpoints-1",
    domain: "Endpoints & Directory",
    score: "1.2/5",
    title: "Legacy OS & Flat Directory",
    severity: "CRITICAL",
    description: "Branch workstations (Windows 7) and servers (Server 2008 R2) have been EOL since 2020. The Active Directory environment is entirely flat.",
    impact: "A single compromised service account allows unrestricted lateral movement across the entire domain without privilege boundaries.",
    remediation: "Upgrade all endpoints to supported OS versions and implement Organizational Unit (OU) segmentation with Tiered Administration.",
    weight: 25,
    complianceID: ["ENDPOINTS-DIR"],
    location: { x: 75, y: 55 }
  },
  {
    id: "encryption-1",
    domain: "Data & Encryption",
    score: "1.6/5",
    title: "Deprecated Cryptographic Standards",
    severity: "CRITICAL",
    description: "Customer data is encrypted at rest using Triple-DES (3DES), which is deprecated and no longer recognized as 'Strong Cryptography'.",
    impact: "Fundamental cryptographic failure inherent to the legacy architecture rather than a configuration oversight.",
    remediation: "Transition to AES-256 encryption standards for all Non-Public Information (NPI) at rest and in transit.",
    weight: 20,
    complianceID: ["DATA-ENCRYPTION"],
    location: { x: 50, y: 65 }
  },
  {
    id: "backups-1",
    domain: "Backups",
    score: "2.5/5",
    title: "Non-Isolated Backup Infrastructure",
    severity: "HIGH",
    description: "Backup systems utilize a network-attached NAS device situated on the same flat network segment as production.",
    impact: "No logical or physical air gap exists, making backup data susceptible to simultaneous encryption during a ransomware event.",
    remediation: "Implement an air-gapped backup solution and off-site immutable storage to ensure restoration capabilities.",
    weight: 15,
    complianceID: ["BACKUPS"],
    location: { x: 50, y: 85 }
  },
  {
    id: "monitoring-1",
    domain: "Monitoring",
    score: "1.0/5",
    title: "Absence of Behavioral Detection",
    severity: "CRITICAL",
    description: "The environment lacks SIEM and IDS capabilities, relying exclusively on legacy signature-based antivirus.",
    impact: "System cannot detect behavioral indicators of compromise, such as unusual file encryption rates or C2 callback patterns.",
    remediation: "Deploy a modern SIEM/SOC solution and transition to behavioral-based endpoint protection.",
    weight: 20,
    complianceID: ["MONITORING"],
    location: { x: 15, y: 75 }
  }
];

export const complianceChecklist: ComplianceReq[] = [
  { 
    id: "CORE-SYSTEM", 
    name: "Core Banking System", 
    description: "The core infrastructure is an IBM iSeries (AS/400) running OS/400. This platform is End-of-Life, lacking patches and support. It is architecturally incapable of running modern EDR agents like CrowdStrike Falcon, making behavioral ransomware detection impossible." 
  },
  { 
    id: "ENDPOINTS-DIR", 
    name: "Endpoints & Directory", 
    description: "Workstations and servers utilize Windows 7 and Server 2008 R2, both EOL since 2020. The Active Directory environment is flat, lacking segmentation. A single compromised service account allows unrestricted lateral movement across the entire domain." 
  },
  { 
    id: "DATA-ENCRYPTION", 
    name: "Data & Encryption", 
    description: "Customer data and cardholder information is encrypted at rest using Triple-DES — 3DES. NIST deprecated 3DES in 2023. PCI DSS v4.0.1 no longer recognizes it as 'Strong Cryptography' under Requirement 3.5. This isn't a configuration issue — it's a fundamental cryptographic failure baked into the legacy system." 
  },
  { 
    id: "BACKUPS", 
    name: "Backups", 
    description: "Backup systems run on a network-attached NAS device sitting on the same flat network segment as production. There is no air gap. In a ransomware scenario, the backup is encrypted alongside everything else — which is exactly what happened at BancoEstado. Only 6% of branches restored on Day 1." 
  },
  { 
    id: "MONITORING", 
    name: "Monitoring", 
    description: "No SIEM. No IDS. Endpoint protection is legacy signature-based AV. That means MCB cannot detect behavioral indicators of compromise — things like abnormal file encryption rates, unusual lateral movement between hosts, or C2 callback patterns. If REvil walked in today, MCB would not see it." 
  }
];
