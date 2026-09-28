import type { CaseStudy } from "@/types/case-study";

export const englishServices = [
  {
    slug: "semiconductor",
    title: "Legacy Semiconductor Equipment Retrofit & Life Extension",
    eyebrow: "Legacy Equipment Modernization",
    desc: "Retrofit, refurbishment and control upgrades for aging WET process equipment, including FSI Mercury systems. We assess what can remain in service and what needs replacement.",
    target: "Semiconductor manufacturers and equipment service companies operating aging process equipment",
    problems: [
      "Obsolete parts make repairs and spare-part planning difficult.",
      "Controls, sensors or operator interfaces need upgrades without changing the established process.",
      "Chemical supply, flow monitoring or door operation must be integrated with the equipment controls.",
    ],
    scope: [
      "FSI Mercury MP and other WET process equipment refurbishment and troubleshooting",
      "PLC/HMI control upgrades and replacement assessment for obsolete components",
      "Chemical supply, flow monitoring and interlock logic review",
      "Program backup, agreed change scope and commissioning checks",
    ],
    deliver: ["Assessment and retrofit scope", "Program/settings backup and change record", "Agreed commissioning checklist and results"],
    limit: "The final scope depends on the equipment model, available drawings and programs, parts availability and permitted downtime.",
  },
  {
    slug: "automation",
    title: "Industrial Control System Assessment & Preventive Diagnostics",
    eyebrow: "Condition-Based Maintenance",
    desc: "Assessment of PLC, SCADA, sensors, communications and alarm history to identify practical maintenance priorities and phased improvements.",
    target: "Manufacturing sites and utility operators with limited in-house control engineering resources",
    problems: [
      "Program and PC backups are incomplete or their locations are unclear.",
      "The same alarms repeat without a clear cause or action history.",
      "Pump runtime and sensor data are not connected to maintenance planning.",
    ],
    scope: ["PLC/HMI/SCADA architecture and backup readiness", "Alarm, communication and data collection review", "Runtime and sensor-based inspection items", "Prioritized improvement plan"],
    deliver: ["Assessment findings", "Backup, obsolescence, communication and alarm checklist", "Priority actions and next-step options"],
    limit: "Inspection intervals and thresholds are agreed using equipment manuals, operating conditions and available site records.",
  },
  {
    slug: "scada",
    title: "SCADA, Alarm, Trend & Reporting Improvements",
    eyebrow: "Operational Data Utilization",
    desc: "CIMON SCADA screens, alarms, trends, reports and communications improved so operating data can support troubleshooting and maintenance.",
    target: "Water treatment, industrial facilities and their existing automation or maintenance partners",
    problems: ["Alarm causes and action history are difficult to trace.", "Operators repeatedly prepare reports from dispersed data.", "New meters and sensors must be integrated into existing screens."],
    scope: ["CIMON SCADA screen and tag improvements", "Alarm history, trends, logging and reporting", "PLC and instrument communication checks", "Runtime and maintenance monitoring"],
    deliver: ["Screen, tag and alarm change record", "Communication and display verification", "Backup and handover material"],
    limit: "Scope and cost depend on the existing version, licenses, communication protocols, tag count and retention requirements.",
  },
  {
    slug: "plc",
    title: "PLC / HMI Modernization & Migration",
    eyebrow: "Control System Modernization",
    desc: "PLC and operator interface improvements for aging equipment, communication issues and undocumented changes, using a controlled backup and recovery plan.",
    target: "Manufacturers with aging control equipment and automation/electrical service partners",
    problems: ["Existing PLCs or HMIs are obsolete.", "Change history is missing, making troubleshooting difficult.", "New instruments must communicate with existing PLCs."],
    scope: ["Program, I/O, communication and sequence review", "Omron and LS Electric PLC modifications", "Pro-face and EasyView HMI configuration", "Backup, migration and recovery planning"],
    deliver: ["Defined change scope and I/O/communication findings", "Agreed program backup and change record", "Migration and commissioning record"],
    limit: "Passwords, source programs and hardware compatibility are checked before any change. Downtime and recovery steps are agreed in advance.",
  },
] as const;

export const englishGuides = [
  {
    slug: "plc-communication",
    title: "What to prepare when PLC communication errors keep recurring",
    desc: "A practical checklist for recurring communication problems between Omron or LS PLCs, HMIs, SCADA and field instruments.",
    service: "plc",
    sections: [
      ["Separate the visible symptom from the suspected cause", "A frozen HMI value or a SCADA communication alarm does not automatically mean the PLC has failed. Record which screens, devices and communication segments are affected."],
      ["Useful information for an initial review", "Provide product models and versions, network or serial topology, the exact error message, when it started and whether all equipment or only one instrument is affected."],
      ["How the work scope is defined", "Existing backups, settings and update status are reviewed before agreeing on program changes, screen updates or communication work. Site changes are performed only after downtime and recovery conditions are agreed."],
    ],
  },
  {
    slug: "cimon-alarm-report",
    title: "Planning CIMON SCADA alarm, trend and report improvements",
    desc: "How to define improvements for CIMON alarm history, trend storage, automatic reports and meter data integration.",
    service: "scada",
    sections: [
      ["Turn screen data into maintenance information", "Existing versions and data structures are reviewed before deciding whether screens, alarms, trends or reports should be improved."],
      ["Describe the result you need", "Specify whether you need equipment-level alarm searches, time-based trends, daily energy reports or longer data retention."],
      ["Implementation conditions", "Protocol, license, tag count and site schedule determine the final scope. Changes, backups and handover material are documented."],
    ],
  },
  {
    slug: "legacy-plc-replacement",
    title: "What to check before replacing an obsolete PLC or HMI",
    desc: "A migration checklist covering source programs, I/O, communications, operating sequence, downtime and recovery planning.",
    service: "plc",
    sections: [
      ["A model number is not enough", "Replacement may involve the original program, I/O, connected drives and instruments, SCADA links and operator sequence—not just the controller hardware."],
      ["Collect the available material", "Share equipment labels, source program and settings availability, drawings, I/O lists, communication links and permitted downtime."],
      ["Agree on a phased scope", "Configuration review, PLC/HMI work, changeover checks and backup deliverables are defined before physical replacement."],
    ],
  },
  {
    slug: "equipment-preventive-check",
    title: "Where to start preventive control-system checks without an in-house PLC engineer",
    desc: "A practical starting point using program backups, recurring alarms, pump runtime, sensor trends and maintenance records.",
    service: "automation",
    sections: [
      ["Start with a small assessment", "Review existing backups, operating screens, alarm history and maintenance records before investing in a large new system."],
      ["Connect available data to maintenance", "Pump runtime, starts, recurring communication errors, sensor drift and replacement history can help define inspection items."],
      ["Move from one assessment to phased improvements", "Send the equipment model, current problem and available records. A limited paid assessment can be defined before larger improvement work."],
    ],
  },
] as const;

type EnglishCase = {
  projectName: string;
  summary: string;
  description: string;
  outcome?: string;
};

const caseTranslations: Record<string, EnglishCase> = {
  "aec06e00-e44f-4b78-a0de-f13f69bce13e": {
    projectName: "Front Sliding Door Retrofit with Equipment Interlock",
    summary: "Installed a front sliding door linked to the equipment gate to improve access control and reduce particle exposure.",
    description: "## Site Requirement\nThe existing equipment required a controlled front access solution connected to the gate sequence.\n## Work Performed\nDesigned and installed the sliding door mechanism and integrated its operation with the equipment interlock.\n## Verification\nDoor operation and the agreed interlock sequence were checked during commissioning.",
  },
  "2a837588-d6a8-43c4-9ce1-ebf3587532bf": {
    projectName: "Local Chemical Supply System for SAT Equipment",
    summary: "Delivered a local chemical supply system for SAT process equipment, including control integration and commissioning checks.",
    description: "## Scope\nBuilt and delivered a local chemical supply system matched to the existing SAT equipment.\n## Controls\nConfigured the required control and operating interfaces.\n## Handover\nVerified the agreed operating sequence and delivered the system for site use.",
  },
  "19af98d2-2a36-4688-8754-e2fa1d706ecb": {
    projectName: "AL Spin Etcher Flow Meter Retrofit",
    summary: "Retrofitted flow meters without major piping changes and added chemical, DIW and air monitoring with equipment interlocks.",
    description: "## Objective\nImprove process utility monitoring while retaining the existing piping configuration.\n## Work Performed\nInstalled compatible flow meters and added monitoring for chemical, DIW and air lines.\n## Controls\nIntegrated the new signals into the equipment interlock logic and verified operation.",
  },
  "8bb24c20-6472-4f93-9b0d-21562de48ea0": {
    projectName: "Chemical Circulation Flow Interlock Upgrade",
    summary: "Added flow measurement and interlock logic to a chemical circulation line to detect abnormal flow conditions.",
    description: "## Work Performed\nAdded a flow meter to the circulation line and connected the signal to the equipment controls.\n## Verification\nChecked the displayed value and agreed interlock behavior under site conditions.",
  },
  "bebac52c-ca71-4a73-9161-27c624538085": {
    projectName: "Water Treatment Plant SCADA & PLC Maintenance",
    summary: "Maintained and improved a CIMON SCADA, HMI and PLC control system at a water treatment facility.",
    description: "## Scope\nReviewed the existing CIMON SCADA screens, PLC controls and communication status.\n## Work Performed\nPerformed agreed maintenance and control-system corrections.\n## Handover\nRecorded the completed work and maintained the available backups for continued operation.",
  },
  "136dbd36-8da9-4265-b331-1fe00a3de31d": {
    projectName: "Diffusion Tube Dryer Electrical Control System",
    summary: "Electrical control design and implementation for a semiconductor diffusion tube dryer.",
    description: "## Scope\nDesigned and implemented the electrical control system for the tube dryer.\n## Verification\nChecked the agreed control sequence and field I/O during commissioning.",
  },
  "192e0012-d336-4a33-9e87-4cf6f0ef1c41": {
    projectName: "Auxiliary Equipment Monitoring System for CVD Tools",
    summary: "Built custom controllers and a SCADA monitoring system for temperature, pressure, level and leak conditions on auxiliary CVD equipment.",
    description: "## Site Requirement\nImportant auxiliary equipment data was not connected to the main CVD tool.\n## Work Performed\nBuilt equipment-specific controllers, connected field sensors and integrated the signals into a central monitoring system.\n## Result\nOperators can monitor current conditions, alarms and historical data from a unified SCADA interface.",
  },
  "59a30cea-7320-454a-948b-9c1f705527d5": {
    projectName: "Custom Load Lock Exhaust Controller",
    summary: "Developed a controller using an MKS 907 vacuum gauge and an additional pressure sensor to manage load-lock exhaust after vent completion.",
    description: "## Objective\nImprove vacuum and vent-state detection and safely discharge residual gas after venting.\n## Work Performed\nIntegrated the existing MKS vacuum signal with a new pressure sensor and added exhaust-valve control logic.\n## Verification\nChecked the agreed vacuum, vent and exhaust sequence under equipment operating conditions.",
  },
  "case-1": {
    projectName: "Chemical Center Supply System Monitoring with CIMON SCADA",
    summary: "Implemented centralized monitoring for a chemical supply system using CIMON SCADA.",
    description: "## Scope\nReviewed the existing chemical supply monitoring points and operating requirements.\n## Work Performed\nConfigured CIMON SCADA screens and data connections for centralized monitoring.\n## Handover\nVerified the agreed signals and provided the updated system for operation.",
  },
};

export function toEnglishCase(c: CaseStudy): EnglishCase & { clientName: string } {
  const known = caseTranslations[c.id];
  return {
    projectName: c.projectNameEn?.trim() || known?.projectName || c.projectName,
    clientName: c.clientNameEn?.trim() || c.clientName,
    summary:
      c.summaryEn?.trim() ||
      known?.summary ||
      "Industrial equipment and control-system engineering project. Contact us for an English scope summary.",
    description:
      c.descriptionEn?.trim() ||
      known?.description ||
      "## Project Overview\nThis case study covers an industrial equipment or control-system improvement completed by JUNgenius. Please contact us for the detailed English scope.",
    outcome: c.outcomeEn?.trim() || known?.outcome,
  };
}
