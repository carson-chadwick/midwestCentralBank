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
  standard: string;
  name: string;
  description: string;
}

export const vulnerabilities: Vulnerability[] = [
  {
    id: "vault-1",
    domain: "Data Protection",
    score: "1.6/5",
    title: "Cryptographic Core Failure",
    severity: "CRITICAL",
    description: "The bank's internal data flows and storage rely on deprecated 3DES encryption standards, which are susceptible to modern decryption attacks.",
    impact: "Potential unauthorized exposure of Non-Public Information (NPI) both in transit and at rest across the monolithic core.",
    remediation: "Upgrade to AES-256 modular encryption and transition to an API-based architecture for secure data handling.",
    weight: 30,
    complianceID: ["PCI-3.5", "GLBA-SAFEGUARD", "GLBA-PRIVACY"],
    location: { x: 75, y: 70 } // Moved from center to bottom-right corner
  },
  {
    id: "terminal-1",
    domain: "Identity Access Control",
    score: "2.0/5",
    title: "Privileged Access Vulnerability",
    severity: "HIGH",
    description: "Administrative accounts on the legacy core utilize shared, static credentials without Multi-Factor Authentication (MFA).",
    impact: "Unrestricted lateral movement and unauthorized privilege escalation across critical banking systems.",
    remediation: "Implement a centralized Identity Gateway (MFA) and enforce unique, rotating credentials for all privileged accounts.",
    weight: 15,
    complianceID: ["PCI-8.4", "GLBA-PRETEXT"],
    location: { x: 20, y: 70 }
  },
  {
    id: "perimeter-1",
    domain: "Threat Detection",
    score: "1.5/5",
    title: "Detection & Response Gap",
    severity: "CRITICAL",
    description: "Lack of behavioral analytics and endpoint visibility on legacy servers prevents timely identification of ransomware activity.",
    impact: "Increased risk of widespread operational disruption and failure to meet regulatory 30-day breach reporting mandates.",
    remediation: "Deploy endpoint detection systems and isolate legacy core components within a high-security network segment (VLAN).",
    weight: 35,
    complianceID: ["PCI-6.3"],
    location: { x: 80, y: 30 }
  },
  {
    id: "archive-1",
    domain: "Recovery Readiness",
    score: "3.0/5",
    title: "Backup Isolation Deficit",
    severity: "MEDIUM",
    description: "Backup systems are not physically or logically isolated from the production core, leaving them vulnerable to ransomware encryption.",
    impact: "Risk of unrecoverable data loss in a total-system compromise scenario, leading to prolonged service outages.",
    remediation: "Establish an air-gapped backup infrastructure and perform regular 'clean-room' restoration testing.",
    weight: 20,
    complianceID: ["NIST-RECOVERY"],
    location: { x: 25, y: 25 }
  }
];

export const complianceChecklist: ComplianceReq[] = [
  { id: "PCI-8.4", standard: "PCI DSS v4.0.1", name: "MFA Requirement", description: "MCB lacks MFA for the Cardholder Data Environment (CDE) due to legacy terminal architectural limitations, representing a critical control failure." },
  { id: "PCI-3.5", standard: "PCI DSS v4.0.1", name: "Strong Cryptography", description: "Legacy databases use outdated encryption standards (e.g., Triple-DES) that no longer meet the 'Strong Cryptography' definition." },
  { id: "PCI-6.3", standard: "PCI DSS v4.0.1", name: "Security Patching", description: "Since systems are 12+ years old, they are 'End-of-Life' (EOL). This violates the mandate to protect against known vulnerabilities, as no new patches exist for these servers." },
  { id: "GLBA-SAFEGUARD", standard: "GLBA", name: "Safeguards Rule", description: "The 2024/2025 updates require encryption of all Non-Public Information (NPI) both at rest (stored on disks) and in transit." },
  { id: "GLBA-PRIVACY", standard: "GLBA", name: "Privacy Rule", description: "Manual opt-out processing between modern and legacy systems creates a significant risk of non-compliant third-party data sharing." },
  { id: "GLBA-PRETEXT", standard: "GLBA", name: "Pretexting Provision", description: "Relying on 'Security Questions' (KBA), are easily defeated by social engineering groups like Fin7." },
  { id: "NIST-RECOVERY", standard: "NIST CSF 2.0", name: "Recovery Planning", description: "Recovery processes are tested and maintained to ensure timely restoration." },
  { id: "NIST-PR.AC", standard: "NIST CSF 2.0", name: "Access Control", description: "Access to physical and logical assets is limited and managed." },
  { id: "NIST-ID.RA", standard: "NIST CSF 2.0", name: "Risk Assessment", description: "Organizational risks are identified and assessed periodically." }
];
