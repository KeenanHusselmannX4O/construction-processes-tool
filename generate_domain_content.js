/**
 * Construction Platform — Domain Content Generator
 * Generates L2, L3, L4 HTML pages for D2–D8
 * Run: node generate_domain_content.js
 */
const fs = require('fs');
const path = require('path');

const BASE = __dirname;

// ─── Domain data ──────────────────────────────────────────────────────────────
const DOMAINS = [
  {
    id:'D2', name:'Project Management', shortName:'Project Mgmt',
    accent:'#10b981', accentLight:'#34d399', accentRgba:'16,185,129',
    prev:'L1_D1_QS_Cost_Management.html', next:'L1_D3_Architecture_Design.html',
    prevLabel:'D1 QS', nextLabel:'D3 Architecture',
    folder:'D2_Project_Management',
    processAreas:[
      { id:'D2.1', name:'Project Initiation & Charter', short:'Project Initiation',
        desc:'Feasibility assessment, project charter, execution strategy', spCount:2,
        subs:[
          {file:'SP_Project_Charter',             name:'Project Charter Development',       desc:'Mandate definition, stakeholder alignment, charter sign-off workflow'},
          {file:'SP_Execution_Strategy',           name:'Project Execution Strategy',        desc:'Delivery methodology, contract strategy, team mobilisation plan'}
        ]
      },
      { id:'D2.2', name:'Stakeholder Management', short:'Stakeholder Mgmt',
        desc:'Identification, engagement, communication planning', spCount:2,
        subs:[
          {file:'SP_Stakeholder_Register',         name:'Stakeholder Register & Analysis',   desc:'Identification, interest/influence mapping, engagement classification'},
          {file:'SP_Communication_Plan',           name:'Communication Plan',                desc:'Channel selection, frequency, escalation protocols, information matrix'}
        ]
      },
      { id:'D2.3', name:'Programme & Scheduling', short:'Programme & Scheduling',
        desc:'Master programme, critical path, milestone tracking', spCount:2,
        subs:[
          {file:'SP_Master_Programme',             name:'Master Programme Development',      desc:'WBS creation, activity sequencing, resource loading, baseline approval'},
          {file:'SP_Critical_Path_Monitoring',     name:'Critical Path Monitoring',          desc:'Progress tracking, float analysis, look-ahead updates, recovery plans'}
        ]
      },
      { id:'D2.4', name:'Risk Management', short:'Risk Management',
        desc:'Risk identification, assessment, mitigation, monitoring', spCount:2,
        subs:[
          {file:'SP_Risk_Register_Assessment',     name:'Risk Register & Assessment',        desc:'Risk identification workshops, probability-impact scoring, risk heatmap'},
          {file:'SP_Risk_Mitigation_Monitoring',   name:'Risk Mitigation & Monitoring',      desc:'Mitigation action plans, risk owner assignment, monthly review cycle'}
        ]
      },
      { id:'D2.5', name:'Quality Management', short:'Quality Management',
        desc:'QA/QC plans, inspection protocols, non-conformance', spCount:2,
        subs:[
          {file:'SP_QA_QC_Plan',                   name:'QA/QC Plan Development',            desc:'Quality objectives, ITP framework, hold points, acceptance criteria'},
          {file:'SP_Inspection_Non_Conformance',   name:'Inspection & Non-Conformance',      desc:'Inspection records, NCR issuance, corrective actions, close-out'}
        ]
      },
      { id:'D2.6', name:'Communication & Reporting', short:'Communication & Reporting',
        desc:'Progress reporting, meeting management, information flow', spCount:2,
        subs:[
          {file:'SP_Progress_Reporting',           name:'Progress Report Production',        desc:'Monthly progress report compilation, KPI dashboards, funder reporting'},
          {file:'SP_Meeting_Management',           name:'Meeting Management & Minutes',      desc:'Agenda preparation, meeting facilitation, minutes, action tracking'}
        ]
      },
      { id:'D2.7', name:'Project Close-out & Handover', short:'Close-out & Handover',
        desc:'Practical completion, handover, lessons learned, archive', spCount:2,
        subs:[
          {file:'SP_Closeout_Report',              name:'Project Close-out Report',          desc:'Final performance analysis, cost vs budget, programme vs actual, KPIs'},
          {file:'SP_Lessons_Learned',              name:'Lessons Learned & Archive',         desc:'Lessons learned register, knowledge base update, project archive'}
        ]
      }
    ]
  },
  {
    id:'D3', name:'Architecture & Design', shortName:'Architecture',
    accent:'#a855f7', accentLight:'#c084fc', accentRgba:'168,85,247',
    prev:'L1_D2_Project_Management.html', next:'L1_D4_Engineering.html',
    prevLabel:'D2 PM', nextLabel:'D4 Engineering',
    folder:'D3_Architecture_Design',
    processAreas:[
      { id:'D3.1', name:'Briefing & Site Analysis', short:'Briefing & Site Analysis',
        desc:'Client brief capture, site assessment, zoning, bulk analysis', spCount:2,
        subs:[
          {file:'SP_Client_Brief_Capture',         name:'Client Brief Capture',              desc:'Brief documentation, functional requirements, spatial schedule, aspirations'},
          {file:'SP_Site_Analysis_Zoning',         name:'Site Analysis & Zoning',            desc:'Site survey, zoning certificate, bulk calculations, site potential report'}
        ]
      },
      { id:'D3.2', name:'Concept & Scheme Design', short:'Concept & Scheme Design',
        desc:'Concept generation, massing, spatial planning, client approval', spCount:2,
        subs:[
          {file:'SP_Concept_Generation',           name:'Concept Design Generation',         desc:'Design options, massing studies, precedent research, concept presentation'},
          {file:'SP_Scheme_Design_Approval',       name:'Scheme Design & Approval',          desc:'Refined scheme, section drawings, area schedule, client sign-off'}
        ]
      },
      { id:'D3.3', name:'Design Development', short:'Design Development',
        desc:'Detailed design, material selection, consultant coordination', spCount:2,
        subs:[
          {file:'SP_Design_Development_Drawings',  name:'Design Development Drawings',       desc:'Detailed GA, sections, elevations, consultant coordination drawings'},
          {file:'SP_Material_Specifications',      name:'Material & Specifications',         desc:'Material schedules, finishes specifications, product selection, SANS compliance'}
        ]
      },
      { id:'D3.4', name:'Construction Documentation', short:'Construction Documentation',
        desc:'Working drawings, specifications, building plan submission', spCount:2,
        subs:[
          {file:'SP_Working_Drawings_Production',  name:'Working Drawings Production',       desc:'Full working drawing set: plans, sections, details, schedules, dimensions'},
          {file:'SP_Tender_Drawings',              name:'Tender Drawings & Specification',   desc:'Tender drawing set, NBS specification, drawing schedule, addenda management'}
        ]
      },
      { id:'D3.5', name:'Building Plan Approval', short:'Building Plan Approval',
        desc:'Municipal submission, SANS 10400 compliance, plan approval', spCount:2,
        subs:[
          {file:'SP_Municipal_Submission',         name:'Municipal Plan Submission',         desc:'Application preparation, submission package, fees, acknowledgement tracking'},
          {file:'SP_Plan_Approval_Response',       name:'Plan Approval Response & Amendments', desc:'Comment resolution, amendment drawings, compliance motivation letters'}
        ]
      },
      { id:'D3.6', name:'Construction Stage Services', short:'Construction Stage Services',
        desc:'Site inspections, RFI management, design change control', spCount:2,
        subs:[
          {file:'SP_Site_Inspection_RFI',          name:'Site Inspections & RFI Management', desc:'Periodic site inspections, RFI log, technical query responses, site reports'},
          {file:'SP_Design_Change_Control',        name:'Design Change Control',             desc:'Design change register, impact assessment, revised drawing issue, QS notification'}
        ]
      }
    ]
  },
  {
    id:'D4', name:'Engineering (Civil, Structural, MEP)', shortName:'Engineering',
    accent:'#f97316', accentLight:'#fb923c', accentRgba:'249,115,22',
    prev:'L1_D3_Architecture_Design.html', next:'L1_D5_Construction_Management.html',
    prevLabel:'D3 Architecture', nextLabel:'D5 Construction',
    folder:'D4_Engineering',
    processAreas:[
      { id:'D4.1', name:'Geotechnical Investigation', short:'Geotechnical Investigation',
        desc:'Soil testing, foundation recommendations, bearing capacity', spCount:2,
        subs:[
          {file:'SP_Site_Investigation',           name:'Site Investigation & Testing',      desc:'Trial pit/borehole layout, soil sampling, lab testing, bearing capacity'},
          {file:'SP_Foundation_Recommendation',    name:'Foundation Recommendation Report',  desc:'Foundation typology selection, design parameters, settlement analysis'}
        ]
      },
      { id:'D4.2', name:'Structural Design', short:'Structural Design',
        desc:'Structural analysis, reinforcement design, structural drawings', spCount:2,
        subs:[
          {file:'SP_Structural_Analysis_Design',   name:'Structural Analysis & Design',      desc:'Load analysis per SANS 10160, RC/steel/masonry design, connection details'},
          {file:'SP_Structural_Drawing_Production','name':'Structural Drawing Production',    desc:'Structural GAs, reinforcement drawings, schedules, specifications'}
        ]
      },
      { id:'D4.3', name:'Civil & Infrastructure Design', short:'Civil & Infrastructure',
        desc:'Stormwater, roads, sewer, water reticulation, earthworks', spCount:2,
        subs:[
          {file:'SP_Stormwater_Road_Design',       name:'Stormwater & Road Design',          desc:'Catchment analysis, pipe sizing, road geometry, kerbs, paving layout'},
          {file:'SP_Services_Reticulation',        name:'Services Reticulation Design',      desc:'Water, sewer, electrical reticulation layout, bulk connection design'}
        ]
      },
      { id:'D4.4', name:'Mechanical & HVAC Design', short:'Mechanical & HVAC',
        desc:'HVAC, fire suppression, lifts, mechanical ventilation', spCount:2,
        subs:[
          {file:'SP_HVAC_Fire_Design',             name:'HVAC & Fire Suppression Design',    desc:'Cooling/heating loads, duct layout, fire sprinkler and detection systems'},
          {file:'SP_Mechanical_Specification',     name:'Mechanical Specification & Schedules', desc:'Equipment schedules, performance specifications, maintenance requirements'}
        ]
      },
      { id:'D4.5', name:'Electrical & Plumbing Design', short:'Electrical & Plumbing',
        desc:'Electrical distribution, lighting, plumbing, solar', spCount:2,
        subs:[
          {file:'SP_Electrical_Design_Distrib',    name:'Electrical Design & Distribution',  desc:'Load schedule, DB layouts, cable sizing, earthing, SANS 10142 compliance'},
          {file:'SP_Plumbing_Solar_Design',        name:'Plumbing & Solar Design',            desc:'Hot/cold water layout, sanitary fittings, solar geyser/PV system design'}
        ]
      },
      { id:'D4.6', name:'Construction Supervision & Testing', short:'Construction Supervision',
        desc:'Site inspection, concrete testing, MEP commissioning', spCount:2,
        subs:[
          {file:'SP_Site_Inspection_Testing',      name:'Site Inspection & Testing',         desc:'Periodic structural inspections, concrete cube tests, steel weld inspection'},
          {file:'SP_MEP_Commissioning',            name:'MEP Commissioning',                 desc:'MEP system testing, commissioning records, SANS compliance sign-off'}
        ]
      }
    ]
  },
  {
    id:'D5', name:'Construction Management', shortName:'Construction Mgmt',
    accent:'#14b8a6', accentLight:'#2dd4bf', accentRgba:'20,184,166',
    prev:'L1_D4_Engineering.html', next:'L1_D6_Contract_Administration.html',
    prevLabel:'D4 Engineering', nextLabel:'D6 Contract Admin',
    folder:'D5_Construction_Management',
    processAreas:[
      { id:'D5.1', name:'Site Establishment & Mobilisation', short:'Site Establishment',
        desc:'Site setup, camp, plant mobilisation, enabling works', spCount:2,
        subs:[
          {file:'SP_Site_Setup_Camp',              name:'Site Setup & Camp Establishment',   desc:'Site office, ablutions, security, hoardings, signage, temporary services'},
          {file:'SP_Plant_Mobilisation',           name:'Plant & Enabling Works Mobilisation', desc:'Plant register, delivery schedule, enabling works (demolition, bulk earthworks)'}
        ]
      },
      { id:'D5.2', name:'Construction Programme Execution', short:'Programme Execution',
        desc:'Activity scheduling, sequencing, look-ahead planning', spCount:2,
        subs:[
          {file:'SP_Activity_Scheduling',          name:'Activity Scheduling & Sequencing',  desc:'Short-term programme, crew allocation, sequencing logic, draw-off schedules'},
          {file:'SP_Look_Ahead_Planning',          name:'Look-Ahead Planning',               desc:'3-week look-ahead, constraint identification, coordinator notifications'}
        ]
      },
      { id:'D5.3', name:'Quality Assurance & Control', short:'Quality Assurance',
        desc:'ITP, inspection records, non-conformance, testing', spCount:2,
        subs:[
          {file:'SP_Inspection_Test_Plan',         name:'Inspection & Test Plan Execution',  desc:'ITP hold points, witness points, sign-off records, photo documentation'},
          {file:'SP_Non_Conformance_Management',   name:'Non-Conformance Management',        desc:'NCR issue, rework instruction, re-inspection, NCR close-out register'}
        ]
      },
      { id:'D5.4', name:'Health, Safety & Environment', short:'Health, Safety & Env',
        desc:'H&S plan, toolbox talks, incident management, environmental', spCount:2,
        subs:[
          {file:'SP_HS_Plan_File',                 name:'H&S Plan & Safety File',            desc:'Construction H&S plan, safety file compilation, Section 16.2 appointment'},
          {file:'SP_Incident_Management',          name:'Incident Management & Reporting',   desc:'Near-miss/incident reporting, COID Act compliance, remediation, DoEL notification'}
        ]
      },
      { id:'D5.5', name:'Subcontractor Management', short:'Subcontractor Mgmt',
        desc:'Subcontract administration, coordination, performance', spCount:2,
        subs:[
          {file:'SP_Subcontract_Administration',   name:'Subcontract Administration',        desc:'Subcontract agreement, programme, access, payment application processing'},
          {file:'SP_Subcontractor_Performance',    name:'Subcontractor Performance Monitoring', desc:'KPI tracking, deficiency notices, programme compliance, payment recommendation'}
        ]
      },
      { id:'D5.6', name:'Resource & Plant Management', short:'Resource & Plant',
        desc:'Labour allocation, plant scheduling, material logistics', spCount:2,
        subs:[
          {file:'SP_Labour_Allocation',            name:'Labour Allocation & Tracking',      desc:'Gang allocation, daily labour returns, productivity monitoring, EPWP compliance'},
          {file:'SP_Plant_Material_Logistics',     name:'Plant & Material Logistics',        desc:'Plant utilisation records, delivery scheduling, site storage, wastage control'}
        ]
      },
      { id:'D5.7', name:'Practical Completion & Handover', short:'Practical Completion',
        desc:'Snag lists, defects resolution, O&M compilation, handover', spCount:2,
        subs:[
          {file:'SP_Snag_List_Resolution',         name:'Snag List Resolution',              desc:'Snag inspection, defect log, contractor remediation tracking, re-inspection'},
          {file:'SP_OM_Manual_Handover',           name:'O&M Manual & Handover Package',     desc:'O&M manual compilation, as-built drawings, commissioning certs, key handover'}
        ]
      }
    ]
  },
  {
    id:'D6', name:'Contract Administration', shortName:'Contract Admin',
    accent:'#f43f5e', accentLight:'#fb7185', accentRgba:'244,63,94',
    prev:'L1_D5_Construction_Management.html', next:'L1_D7_Compliance_Regulatory.html',
    prevLabel:'D5 Construction', nextLabel:'D7 Compliance',
    folder:'D6_Contract_Administration',
    processAreas:[
      { id:'D6.1', name:'Contract Formation & Execution', short:'Contract Formation',
        desc:'Contract selection, formation, signing, commencement', spCount:2,
        subs:[
          {file:'SP_Contract_Selection_Formation', name:'Contract Selection & Formation',    desc:'Contract form selection (JBCC/NEC/FIDIC), conditions drafting, schedule compilation'},
          {file:'SP_Contract_Execution',           name:'Contract Execution & Commencement', desc:'Signing ceremony, letter of acceptance, site handover, commencement notice'}
        ]
      },
      { id:'D6.2', name:'Site Instructions & Correspondence', short:'Site Instructions',
        desc:'PA instructions, RFIs, official correspondence, minute taking', spCount:2,
        subs:[
          {file:'SP_PA_Site_Instructions',         name:'Principal Agent Site Instructions', desc:'SI issuance, instruction register, scope/programme/cost impact assessment'},
          {file:'SP_RFI_Correspondence',           name:'RFI & Official Correspondence',     desc:'RFI log, response management, official letter register, meeting minutes'}
        ]
      },
      { id:'D6.3', name:'Claims & Time Management', short:'Claims & Time Mgmt',
        desc:'Extension of time, delay analysis, penalty management', spCount:2,
        subs:[
          {file:'SP_EOT_Delay_Analysis',           name:'Extension of Time & Delay Analysis', desc:'EOT claim receipt, delay analysis, concurrent delay assessment, determination'},
          {file:'SP_Penalty_Management',           name:'Penalty & Bonus Management',        desc:'Liquidated damages calculation, penalty imposition, bonus entitlement assessment'}
        ]
      },
      { id:'D6.4', name:'Dispute Resolution', short:'Dispute Resolution',
        desc:'Mediation, adjudication, arbitration procedures', spCount:2,
        subs:[
          {file:'SP_Dispute_Notice_Register',      name:'Dispute Notice & Register',         desc:'Dispute log, notice procedures (JBCC Clause 40), dispute classification'},
          {file:'SP_Mediation_Adjudication',       name:'Mediation & Adjudication Process',  desc:'Mediator/adjudicator appointment, hearing preparation, determination management'}
        ]
      },
      { id:'D6.5', name:'Completion & Certification', short:'Completion & Certification',
        desc:'Practical completion, final completion, certificate issuance', spCount:2,
        subs:[
          {file:'SP_Practical_Completion_Cert',    name:'Practical Completion Certificate',  desc:'Inspection, defects list, PC conditions, certificate issuance, DLP commencement'},
          {file:'SP_Final_Completion_Cert',        name:'Final Completion Certificate',       desc:'DLP expiry, all defects rectified, retention release, final certificate issuance'}
        ]
      }
    ]
  },
  {
    id:'D7', name:'Compliance & Regulatory', shortName:'Compliance',
    accent:'#f59e0b', accentLight:'#fbbf24', accentRgba:'245,158,11',
    prev:'L1_D6_Contract_Administration.html', next:'L1_D8_Procurement_Supply_Chain.html',
    prevLabel:'D6 Contracts', nextLabel:'D8 Procurement',
    folder:'D7_Compliance_Regulatory',
    processAreas:[
      { id:'D7.1', name:'Building Plan & Zoning Approval', short:'Building Plan Approval',
        desc:'Municipal plan submission, zoning applications, land-use rights', spCount:2,
        subs:[
          {file:'SP_Plan_Submission_Process',      name:'Building Plan Submission Process',  desc:'Application forms, submission checklist, professional certificates, fee payment'},
          {file:'SP_Zoning_Land_Use',              name:'Zoning & Land-Use Rights',          desc:'Zoning certificate, departure/rezoning applications, land-use management'}
        ]
      },
      { id:'D7.2', name:'NHBRC Enrolment & Inspection', short:'NHBRC Enrolment',
        desc:'Project enrolment, stage inspections, enrolment certificates', spCount:2,
        subs:[
          {file:'SP_Project_Enrolment',            name:'NHBRC Project Enrolment',           desc:'Online enrolment submission, fee payment, enrolment certificate management'},
          {file:'SP_Stage_Inspections',            name:'NHBRC Stage Inspections',           desc:'Inspection request triggering, stage completion signoff, certificate tracking'}
        ]
      },
      { id:'D7.3', name:'Environmental Compliance', short:'Environmental Compliance',
        desc:'EIA screening, environmental authorisation, EMPr monitoring', spCount:2,
        subs:[
          {file:'SP_EIA_Screening',                name:'EIA Screening & Scoping',           desc:'Listed activity assessment, basic assessment vs full EIA determination, scoping'},
          {file:'SP_EMPr_Implementation',          name:'EMPr Implementation & Monitoring',  desc:'Environmental management plan execution, audit reports, corrective actions'}
        ]
      },
      { id:'D7.4', name:'OHS Act Compliance', short:'OHS Act Compliance',
        desc:'OHS plan, construction health & safety file, incident reporting', spCount:2,
        subs:[
          {file:'SP_OHS_Plan_File',                name:'OHS Plan & Construction Safety File', desc:'Baseline risk assessment, fall protection plan, safety file content per CR 2014'},
          {file:'SP_Safety_Audit_Reporting',       name:'Safety Audit & Incident Reporting', desc:'Monthly safety audits, DoEL 24-hour notification, COID Act compliance claims'}
        ]
      },
      { id:'D7.5', name:'B-BBEE & Transformation', short:'B-BBEE & Transformation',
        desc:'Enterprise development, skills development, ownership compliance', spCount:2,
        subs:[
          {file:'SP_BBBEE_Verification',           name:'B-BBEE Verification & Scorecard',   desc:'SANAS-accredited verification, scorecard compilation, certificate management'},
          {file:'SP_Enterprise_Skills_Dev',        name:'Enterprise & Skills Development',   desc:'ED spend tracking, learnership agreements, skills development plans, reporting'}
        ]
      },
      { id:'D7.6', name:'Municipal Services & Certificates', short:'Municipal Services',
        desc:'Service connections, occupancy certificates, compliance certificates', spCount:2,
        subs:[
          {file:'SP_Service_Connections',          name:'Municipal Service Connections',      desc:'Water, sewer, electricity connection applications, bulk contribution payments'},
          {file:'SP_Occupancy_Certificate',        name:'Occupancy Certificate Application',  desc:'CoO application, inspector sign-off, electrical CoC, plumbing CoC, gas CoC'}
        ]
      },
      { id:'D7.7', name:'National Building Regulations', short:'Nat. Building Regulations',
        desc:'SANS 10400 compliance, rational designs, deemed-to-satisfy', spCount:2,
        subs:[
          {file:'SP_SANS10400_Review',             name:'SANS 10400 Compliance Review',      desc:'Regulation-by-regulation compliance check, fire escape routes, accessibility'},
          {file:'SP_Rational_Design_Process',      name:'Rational Design Process',           desc:'Rational design motivation, independent reviewer appointment, approval tracking'}
        ]
      }
    ]
  },
  {
    id:'D8', name:'Procurement & Supply Chain', shortName:'Procurement',
    accent:'#8b5cf6', accentLight:'#a78bfa', accentRgba:'139,92,246',
    prev:'L1_D7_Compliance_Regulatory.html', next:null,
    prevLabel:'D7 Compliance', nextLabel:null,
    folder:'D8_Procurement_Supply_Chain',
    processAreas:[
      { id:'D8.1', name:'Procurement Strategy & Planning', short:'Procurement Strategy',
        desc:'Procurement method selection, packaging strategy, market analysis', spCount:2,
        subs:[
          {file:'SP_Procurement_Strategy_Plan',    name:'Procurement Strategy & Plan',       desc:'Strategy selection, packaging logic, long-lead items, PPPFA compliance planning'},
          {file:'SP_Market_Analysis',              name:'Market Analysis & Benchmarking',    desc:'Supplier market mapping, benchmark pricing, capacity assessment, preferred list'}
        ]
      },
      { id:'D8.2', name:'Supplier Pre-qualification', short:'Supplier Pre-qualification',
        desc:'Vendor database, CIDB grading verification, B-BBEE validation', spCount:2,
        subs:[
          {file:'SP_Vendor_Database_Registration','name':'Vendor Database & Registration',   desc:'Supplier application, CIDB grading check, tax clearance, capability assessment'},
          {file:'SP_CIDB_BBBEE_Verification',      name:'CIDB & B-BBEE Verification',        desc:'CIDB register verification, B-BBEE certificate validation, disqualification checks'}
        ]
      },
      { id:'D8.3', name:'Tender & Bid Administration', short:'Tender & Bid Admin',
        desc:'RFQ/RFP issue, bid evaluation, recommendation, award', spCount:2,
        subs:[
          {file:'SP_RFQ_RFP_Issue',                name:'RFQ & RFP Issue & Management',      desc:'Tender document issue, briefing session, addenda management, return schedule'},
          {file:'SP_Bid_Evaluation_Award',         name:'Bid Evaluation & Award',            desc:'Responsiveness check, price/functionality evaluation, recommendation, award letter'}
        ]
      },
      { id:'D8.4', name:'Material Procurement & Logistics', short:'Material Procurement',
        desc:'Purchase orders, delivery scheduling, site receiving, warehousing', spCount:2,
        subs:[
          {file:'SP_Purchase_Orders_Delivery',     name:'Purchase Orders & Delivery',        desc:'PO issuance, supplier confirmation, delivery tracking, expediting late orders'},
          {file:'SP_Site_Receiving_Warehousing',   name:'Site Receiving & Warehousing',      desc:'Delivery inspection, GRN issue, storage management, inventory control'}
        ]
      },
      { id:'D8.5', name:'Subcontractor Procurement', short:'Subcontractor Procurement',
        desc:'Specialist subcontractor sourcing, nomination, performance management', spCount:2,
        subs:[
          {file:'SP_Specialist_Sourcing',          name:'Specialist Subcontractor Sourcing',  desc:'Specialist identification, pre-qualification, pricing negotiation, nomination'},
          {file:'SP_Subcontractor_Performance_Mgmt','name':'Subcontractor Performance Management', desc:'Performance scorecards, payment recommendation, disputes, blacklisting process'}
        ]
      }
    ]
  }
];

// ─── Utilities ────────────────────────────────────────────────────────────────
function mkdirs(...parts){
  const p=path.join(...parts);
  fs.mkdirSync(p,{recursive:true});
  return p;
}
function write(filePath,content){
  fs.writeFileSync(filePath,content,'utf8');
  console.log('  ✓ '+path.relative(BASE,filePath));
}
function esc(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

// ─── L2 Template ─────────────────────────────────────────────────────────────
function buildL2(dom, pa, paIndex, allPAs){
  const prev = allPAs[paIndex-1];
  const next = allPAs[paIndex+1];
  const subCards = pa.subs.map((sp,i)=>`
        <a class="sp-card" href="../../L3_Sub_Processes/${dom.folder}/${pa.id.replace('.','')}/${sp.file}.html">
            <div class="sp-id">SP ${pa.id.replace('D','')}.${i+1}</div>
            <h4>${esc(sp.name)}</h4>
            <p>${esc(sp.desc)}</p>
        </a>`).join('');

  const prevLink = prev ? `<a class="nav-link" href="L2_${prev.id.replace('.','_')}_${sanitise(prev.short)}.html"><span class="arrow">←</span> ${esc(prev.id)} ${esc(prev.short)}</a>` : '';
  const nextLink = next ? `<a class="nav-link" href="L2_${next.id.replace('.','_')}_${sanitise(next.short)}.html"><span class="arrow">→</span> ${esc(next.id)} ${esc(next.short)}</a>` : '';

  const gridCols = pa.subs.length <= 2 ? 2 : 3;

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>L2 — ${esc(pa.id)}: ${esc(pa.name)}</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
    <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"><\/script>
    <style>
        :root{--navy-950:#0a0f1e;--navy-900:#0f172a;--navy-800:#1e293b;--navy-700:#334155;--navy-600:#475569;--slate-400:#94a3b8;--slate-300:#cbd5e1;--white:#f8fafc;--accent:${dom.accent};--accent-light:${dom.accentLight}}
        *{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:var(--navy-950);color:var(--slate-300);line-height:1.7;font-size:12px}
        @page{size:A4;margin:15mm}.page{max-width:210mm;margin:0 auto;padding:32px 40px;background:var(--navy-900)}
        .doc-header{border-bottom:3px solid var(--accent);padding-bottom:18px;margin-bottom:24px}
        .doc-header .level-badge{display:inline-block;padding:3px 12px;border-radius:4px;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;background:rgba(${dom.accentRgba},.15);color:var(--accent-light);margin-bottom:6px}
        .doc-header h1{font-size:22px;font-weight:800;color:var(--white);margin-bottom:4px}
        .doc-header .subtitle{font-size:13px;color:var(--slate-400)}
        .doc-header .meta{display:flex;gap:20px;margin-top:10px;font-size:10px;color:var(--slate-400)}
        h2{font-size:16px;font-weight:700;color:var(--white);margin:24px 0 10px;padding-bottom:5px;border-bottom:1px solid var(--navy-700)}
        h3{font-size:13px;font-weight:600;color:var(--accent-light);margin:14px 0 6px}
        p{margin-bottom:10px}
        .nav-bar{display:flex;gap:8px;margin:14px 0;flex-wrap:wrap}
        .nav-link{display:inline-flex;align-items:center;gap:4px;padding:5px 12px;border-radius:6px;font-size:10px;font-weight:600;text-decoration:none;border:1px solid var(--navy-700);color:var(--slate-300);background:var(--navy-800);transition:all .2s}
        .nav-link:hover{border-color:var(--accent);color:var(--accent-light)}
        .nav-link.active{border-color:var(--accent);color:var(--accent-light);background:rgba(${dom.accentRgba},.1)}
        .nav-link .arrow{font-size:12px}
        table{width:100%;border-collapse:collapse;margin:10px 0;font-size:11px}
        thead th{background:var(--navy-800);color:var(--accent-light);font-weight:600;text-align:left;padding:7px 10px;border-bottom:2px solid var(--accent);font-size:10px;text-transform:uppercase;letter-spacing:.5px}
        tbody td{padding:7px 10px;border-bottom:1px solid var(--navy-700);vertical-align:top}
        .sp-grid{display:grid;grid-template-columns:repeat(${gridCols},1fr);gap:10px;margin:14px 0}
        .sp-card{background:var(--navy-800);border:1px solid var(--navy-700);border-left:3px solid var(--accent);border-radius:8px;padding:12px;text-decoration:none;color:inherit;transition:all .2s;display:block}
        .sp-card:hover{border-color:var(--accent);transform:translateY(-1px)}
        .sp-card .sp-id{font-size:9px;font-weight:700;color:var(--accent-light);letter-spacing:1px;margin-bottom:3px}
        .sp-card h4{font-size:11px;font-weight:700;color:var(--white);margin-bottom:4px}
        .sp-card p{font-size:10px;color:var(--slate-400);margin:0}
        .io-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:10px 0}
        .io-box{background:var(--navy-800);border-radius:8px;padding:12px;border:1px solid var(--navy-700)}
        .io-box h4{font-size:10px;font-weight:700;color:var(--accent-light);margin-bottom:6px;text-transform:uppercase;letter-spacing:1px}
        .io-box ul{margin:0;padding-left:14px;font-size:10px;color:var(--slate-300)}
        .io-box li{margin-bottom:3px}
        .mermaid{background:transparent!important;margin:14px 0}
        .doc-footer{margin-top:28px;padding-top:10px;border-top:1px solid var(--navy-700);font-size:9px;color:var(--navy-600);display:flex;justify-content:space-between}
    </style>
</head>
<body>
<div class="page">
    <div class="doc-header">
        <div class="level-badge">Level 2 — Process Area</div>
        <h1>${esc(pa.id)}: ${esc(pa.name)}</h1>
        <div class="subtitle">L0 → L1: ${esc(dom.name)} → <strong>L2: ${esc(pa.name)}</strong></div>
        <div class="meta"><span>PA ID: ${esc(pa.id)}</span><span>BPMN Level: 2</span><span>${pa.subs.length} Sub-Processes</span><span>Version 2.0</span><span>April 2026</span></div>
    </div>

    <div class="nav-bar">
        <a class="nav-link" href="../../L1_Professional_Domains/L1_${dom.id}_${sanitise(dom.shortName)}.html"><span class="arrow">↑</span> L1 ${esc(dom.id)}: ${esc(dom.shortName)}</a>
        <span class="nav-link active"><span class="arrow">●</span> L2 ${esc(pa.id)}: ${esc(pa.short)}</span>
        ${prevLink}
        ${nextLink}
        <a class="nav-link" href="../../L3_Sub_Processes/${dom.folder}/${pa.id.replace('.','')}/${pa.subs[0].file}.html"><span class="arrow">↓</span> L3 Sub-Processes</a>
    </div>

    <h2>1. Process Area Purpose</h2>
    <p>${esc(pa.name)} covers the core activities within the ${esc(dom.name)} domain relating to ${esc(pa.desc.toLowerCase())}. This process area defines the structured workflow, responsibilities, and quality controls that ensure consistent, professional delivery in accordance with applicable South African standards and regulatory requirements.</p>

    <h2>2. Sub-Processes (→ L3)</h2>
    <div class="sp-grid">${subCards}
    </div>

    <h2>3. Inputs &amp; Outputs</h2>
    <div class="io-grid">
        <div class="io-box">
            <h4>Inputs</h4>
            <ul>
                <li>Project brief and stakeholder requirements</li>
                <li>Preceding process area outputs</li>
                <li>Applicable standards and regulations</li>
                <li>Site information and survey data</li>
                <li>Previous project data and benchmarks</li>
            </ul>
        </div>
        <div class="io-box">
            <h4>Outputs</h4>
            <ul>
                <li>Process deliverables as defined per sub-process</li>
                <li>Quality-reviewed and approved documentation</li>
                <li>Input to downstream process areas</li>
                <li>Regulatory submissions and approvals</li>
                <li>Stakeholder communication and reports</li>
            </ul>
        </div>
    </div>

    <h2>4. RACI Summary</h2>
    <table>
        <thead><tr><th>Sub-Process</th><th>${esc(dom.id)} Lead</th><th>Client/PM</th><th>Supporting Domains</th></tr></thead>
        <tbody>
${pa.subs.map((sp,i)=>`            <tr><td>${esc(sp.name)}</td><td>R/A</td><td>I</td><td>C</td></tr>`).join('\n')}
        </tbody>
    </table>

    <div class="doc-footer"><span>L2-${esc(pa.id)} ${esc(pa.name)} v2.0</span><span>Confidential — Swift Designz</span></div>
</div>
<script>mermaid.initialize({startOnLoad:true,theme:'dark',themeVariables:{primaryColor:'#1e3a5f',primaryTextColor:'#f8fafc',primaryBorderColor:'${dom.accent}',lineColor:'${dom.accentLight}',fontFamily:'Inter, sans-serif',fontSize:'11px'},flowchart:{useMaxWidth:true,htmlLabels:true,curve:'basis'}});<\/script>
</body>
</html>`;
}

// ─── L3 Template ─────────────────────────────────────────────────────────────
function buildL3(dom, pa, sp, spIndex, allSPs){
  const prev = allSPs[spIndex-1];
  const next = allSPs[spIndex+1];
  const spNum = `${pa.id.replace('D','')}.${spIndex+1}`;
  const l2File = `L2_${pa.id.replace('.','_')}_${sanitise(pa.short)}.html`;
  const l4File = `L4_T_${sp.file}.html`;
  const prevLink = prev ? `<a class="nav-link" href="${prev.file}.html"><span class="arrow">←</span> ${esc(prev.name)}</a>` : '';
  const nextLink = next ? `<a class="nav-link" href="${next.file}.html"><span class="arrow">→</span> ${esc(next.name)}</a>` : '';

  const steps = [
    ['Receive & scope the work request', `${dom.id} Lead`, 'Request documentation, prior process outputs', 'Scoped work order', '4 hrs'],
    ['Gather required inputs & data', `${dom.id} Lead`, 'Standards, regulations, site data, benchmarks', 'Data pack for execution', '1 day'],
    ['Perform core technical work', `${dom.id} Practitioner`, 'Data pack, applicable standards', 'Draft deliverable', '2–5 days'],
    ['Internal quality review', `Senior ${dom.id} Lead`, 'Draft deliverable, quality checklist', 'Reviewed and commented deliverable', '1 day'],
    ['Incorporate review comments & finalise', `${dom.id} Lead`, 'Review comments', 'Final deliverable', '1 day'],
    ['Issue deliverable to stakeholders', `${dom.id} Lead`, 'Final deliverable, distribution list', 'Distributed and acknowledged deliverable', '4 hrs'],
  ];

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>${esc(pa.id)} Sub-Process — ${esc(sp.name)}</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
    <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"><\/script>
    <style>
        :root{--navy-950:#0a0f1e;--navy-900:#0f172a;--navy-800:#1e293b;--navy-700:#334155;--navy-600:#475569;--slate-400:#94a3b8;--slate-300:#cbd5e1;--white:#f8fafc;--accent:${dom.accent};--accent-light:${dom.accentLight}}
        *{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:var(--navy-950);color:var(--slate-300);line-height:1.7;font-size:12px}
        @page{size:A4;margin:15mm}.page{max-width:210mm;margin:0 auto;padding:32px 40px;background:var(--navy-900)}
        .doc-header{border-bottom:3px solid var(--accent);padding-bottom:18px;margin-bottom:24px}
        .doc-header .label{font-size:10px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--accent-light);margin-bottom:4px}
        .doc-header h1{font-size:20px;font-weight:800;color:var(--white);margin-bottom:4px}
        .doc-header .subtitle{font-size:12px;color:var(--slate-400)}
        .doc-header .meta{display:flex;gap:20px;margin-top:10px;font-size:10px;color:var(--slate-400)}
        h2{font-size:16px;font-weight:700;color:var(--white);margin:22px 0 10px;padding-bottom:5px;border-bottom:1px solid var(--navy-700)}
        p{margin-bottom:8px;font-size:12px}
        .card{background:var(--navy-800);border:1px solid var(--navy-700);border-radius:8px;padding:14px;margin-bottom:10px}
        .card-accent{border-left:4px solid var(--accent)}
        table{width:100%;border-collapse:collapse;margin:10px 0;font-size:11px}
        thead th{background:var(--navy-800);color:var(--accent-light);font-weight:600;text-align:left;padding:7px 10px;border-bottom:2px solid var(--accent);font-size:10px;text-transform:uppercase;letter-spacing:.5px}
        tbody td{padding:7px 10px;border-bottom:1px solid var(--navy-700);vertical-align:top}
        .badge{display:inline-block;padding:2px 8px;border-radius:12px;font-size:9px;font-weight:600;text-transform:uppercase;letter-spacing:.5px}
        .badge-high{background:rgba(16,185,129,.15);color:#34d399}.badge-partial{background:rgba(245,158,11,.15);color:#fbbf24}.badge-low{background:rgba(239,68,68,.15);color:#f87171}
        ul{margin:6px 0 8px 16px;font-size:12px}li{margin-bottom:3px}
        .mermaid{background:transparent!important;margin:12px 0}
        .doc-footer{margin-top:28px;padding-top:10px;border-top:1px solid var(--navy-700);font-size:9px;color:var(--navy-600);display:flex;justify-content:space-between}
        .nav-bar{display:flex;gap:8px;margin:14px 0;flex-wrap:wrap}
        .nav-link{display:inline-flex;align-items:center;gap:4px;padding:5px 12px;border-radius:6px;font-size:10px;font-weight:600;text-decoration:none;border:1px solid var(--navy-700);color:var(--slate-300);background:var(--navy-800);transition:all .2s}
        .nav-link:hover{border-color:var(--accent);color:var(--accent-light)}
        .nav-link.active{border-color:var(--accent);color:var(--accent-light);background:rgba(${dom.accentRgba},.1)}
        .nav-link .arrow{font-size:12px}
        .info-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin:14px 0}
        .info-card{background:var(--navy-800);border:1px solid var(--navy-700);border-left:3px solid var(--accent);border-radius:6px;padding:10px}
        .info-card .label{font-size:9px;color:var(--accent-light);font-weight:600;text-transform:uppercase;letter-spacing:.5px;margin-bottom:3px}
        .info-card .value{font-size:11px;color:var(--white)}
    </style>
</head>
<body>
<div class="page">
    <div class="doc-header">
        <div class="label">${esc(pa.id)} — Sub-Process ${spNum}</div>
        <h1>${esc(sp.name)}</h1>
        <div class="subtitle">L1: ${esc(dom.name)} → L2: ${esc(pa.name)} → <strong>L3: ${esc(sp.name)}</strong></div>
        <div class="meta">
            <span>Process ID: ${esc(pa.id)}-SP-00${spIndex+1}</span>
            <span>Domain: ${esc(dom.id)} ${esc(dom.shortName)}</span>
            <span>Version 2.0</span>
            <span>April 2026</span>
        </div>
    </div>

    <div class="nav-bar">
        <a class="nav-link" href="../../../L2_Process_Areas/${dom.folder}/${l2File}"><span class="arrow">↑</span> L2 ${esc(pa.id)}: ${esc(pa.short)}</a>
        <span class="nav-link active"><span class="arrow">●</span> SP: ${esc(sp.name)}</span>
        ${prevLink}
        ${nextLink}
        <a class="nav-link" href="../../../L4_Tasks/${dom.folder}/${pa.id.replace('.','')}/${l4File}"><span class="arrow">↓</span> L4 Tasks</a>
    </div>

    <h2>1. Purpose</h2>
    <p>${esc(sp.desc)}. This sub-process defines the structured approach for delivering this component of ${esc(pa.name)} within the ${esc(dom.name)} domain, ensuring compliance with applicable South African standards, professional body requirements, and project quality expectations.</p>

    <div class="info-grid">
        <div class="info-card"><div class="label">Trigger</div><div class="value">Instruction or milestone from preceding process step</div></div>
        <div class="info-card"><div class="label">Primary Role</div><div class="value">${esc(dom.shortName)} professional / registered practitioner</div></div>
        <div class="info-card"><div class="label">Output</div><div class="value">Approved deliverable per quality assurance checklist</div></div>
    </div>

    <h2>2. Process Flow</h2>
    <div class="mermaid">
    flowchart TD
        A["Receive &amp; scope<br/>work request"] --> B["Gather required<br/>inputs &amp; data"]
        B --> C["Perform core<br/>technical work"]
        C --> D["Internal quality<br/>review"]
        D --> E{"Meets<br/>standard?"}
        E -->|No| C
        E -->|Yes| F["Finalise &amp; issue<br/>deliverable"]
        F --> G["Stakeholder<br/>acknowledgement"]
        style A fill:#1e293b,stroke:${dom.accent},color:#f8fafc
        style B fill:#1e293b,stroke:${dom.accent},color:#f8fafc
        style C fill:#1e293b,stroke:${dom.accent},color:#f8fafc
        style D fill:#1e293b,stroke:${dom.accent},color:#f8fafc
        style E fill:#334155,stroke:${dom.accentLight},color:#f8fafc
        style F fill:#1e293b,stroke:${dom.accent},color:#f8fafc
        style G fill:#1e293b,stroke:${dom.accent},color:#f8fafc
    </div>

    <h2>3. Detailed Steps</h2>
    <table>
        <thead><tr><th>Step</th><th>Activity</th><th>Role</th><th>Inputs</th><th>Outputs</th><th>SLA</th></tr></thead>
        <tbody>
${steps.map((s,i)=>`            <tr><td>${i+1}</td><td>${esc(s[0])}</td><td>${esc(s[1])}</td><td>${esc(s[2])}</td><td>${esc(s[3])}</td><td>${esc(s[4])}</td></tr>`).join('\n')}
        </tbody>
    </table>

    <h2>4. Automation Potential</h2>
    <table>
        <thead><tr><th>Step</th><th>Traditional Platform</th><th>Agentic AI Enhancement</th><th>Level</th></tr></thead>
        <tbody>
            <tr><td>Data gathering</td><td>Manual collection from multiple sources</td><td>Automated data pull from connected databases and APIs</td><td><span class="badge badge-high">HIGH</span></td></tr>
            <tr><td>Core technical work</td><td>Manual analysis and calculation</td><td>AI-assisted first-pass with practitioner review and sign-off</td><td><span class="badge badge-partial">PARTIAL</span></td></tr>
            <tr><td>Quality review</td><td>Manual peer review against checklist</td><td>Automated rules-based compliance check + human sign-off</td><td><span class="badge badge-high">HIGH</span></td></tr>
            <tr><td>Document issuance</td><td>Manual email with attachments</td><td>Auto-distributed via platform with read-receipt tracking</td><td><span class="badge badge-high">FULL</span></td></tr>
        </tbody>
    </table>

    <div class="doc-footer"><span>${esc(pa.id)}-SP-00${spIndex+1} ${esc(sp.name)} v2.0</span><span>Confidential — Swift Designz</span></div>
</div>
<script>mermaid.initialize({startOnLoad:true,theme:'dark',themeVariables:{primaryColor:'#1e3a5f',primaryTextColor:'#f8fafc',primaryBorderColor:'${dom.accent}',lineColor:'${dom.accentLight}',fontFamily:'Inter, sans-serif',fontSize:'11px'},flowchart:{useMaxWidth:true,htmlLabels:true,curve:'basis'}});<\/script>
</body>
</html>`;
}

// ─── L4 Template ─────────────────────────────────────────────────────────────
function buildL4(dom, pa, sp, spIndex){
  const spNum = `${pa.id.replace('D','')}.${spIndex+1}`;
  const l3File = `${sp.file}.html`;
  const tasks = [
    { tid:`TASK ${spNum}-01`, name:`Initiate & scope: ${sp.name}`, desc:`Log the request, confirm scope, assign reference number, notify relevant stakeholders. Verify all preconditions are met before commencing.`, role:`${dom.shortName} Lead`, inputs:'Work request, project register, preceding deliverables', outputs:'Scoped task order, reference number, stakeholder notification', tools:'Project management platform, task register', sla:'4 hours', qc:'All mandatory fields completed; reference number assigned' },
    { tid:`TASK ${spNum}-02`, name:'Gather & validate inputs', desc:`Collect all required input documents, data, and information. Validate completeness and currency. Confirm applicable standards version and regulatory requirements.`, role:`${dom.shortName} Practitioner`, inputs:'Standards, regulatory requirements, site data, benchmarks', outputs:'Validated input data pack', tools:'Document management system, standards library', sla:'1 working day', qc:'Input checklist 100% complete; standards confirmed current' },
    { tid:`TASK ${spNum}-03`, name:'Execute core technical work', desc:`Perform the primary technical work required for this sub-process. Apply professional judgement, applicable standards, and prescribed methodology. Document all assumptions and decisions.`, role:`${dom.shortName} Practitioner (Registered)`, inputs:'Validated data pack, applicable standards, methodology', outputs:'Draft technical deliverable with assumptions register', tools:'Domain-specific software tools, calculation templates', sla:'2–5 working days', qc:'Calculations checked; standards referenced; assumptions documented' },
    { tid:`TASK ${spNum}-04`, name:'Quality review & approval', desc:`Submit draft deliverable for senior review. Resolve all review comments. Obtain sign-off from responsible registered practitioner in accordance with professional body requirements.`, role:`Senior ${dom.shortName} (Registered)`, inputs:'Draft deliverable, quality checklist, review criteria', outputs:'Reviewed, approved, and signed deliverable', tools:'QA review checklist, digital signature platform', sla:'1 working day', qc:'All review points addressed; professional endorsement obtained' },
    { tid:`TASK ${spNum}-05`, name:'Issue & archive deliverable', desc:`Distribute the approved deliverable to all required stakeholders per the communication plan. Archive all supporting documents. Update the project register and notify downstream process triggers.`, role:`${dom.shortName} Lead`, inputs:'Approved deliverable, distribution list, document register', outputs:'Distributed deliverable, updated register, downstream triggers', tools:'Document management system, email/platform notification', sla:'4 hours', qc:'Distribution confirmed; archive reference assigned; downstream triggered' },
  ];

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>L4 — Tasks: ${esc(sp.name)}</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
    <style>
        :root{--navy-950:#0a0f1e;--navy-900:#0f172a;--navy-800:#1e293b;--navy-700:#334155;--navy-600:#475569;--slate-400:#94a3b8;--slate-300:#cbd5e1;--white:#f8fafc;--accent:${dom.accent};--accent-light:${dom.accentLight}}
        *{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:var(--navy-950);color:var(--slate-300);line-height:1.7;font-size:12px}
        @page{size:A4;margin:15mm}.page{max-width:210mm;margin:0 auto;padding:32px 40px;background:var(--navy-900)}
        .doc-header{border-bottom:3px solid var(--accent);padding-bottom:18px;margin-bottom:24px}
        .doc-header .level-badge{display:inline-block;padding:3px 12px;border-radius:4px;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;background:rgba(${dom.accentRgba},.15);color:var(--accent-light);margin-bottom:6px}
        .doc-header h1{font-size:22px;font-weight:800;color:var(--white);margin-bottom:4px}
        .doc-header .subtitle{font-size:13px;color:var(--slate-400)}
        .doc-header .meta{display:flex;gap:20px;margin-top:10px;font-size:10px;color:var(--slate-400)}
        h2{font-size:16px;font-weight:700;color:var(--white);margin:24px 0 10px;padding-bottom:5px;border-bottom:1px solid var(--navy-700)}
        p{margin-bottom:10px}
        .nav-bar{display:flex;gap:8px;margin:14px 0;flex-wrap:wrap}
        .nav-link{display:inline-flex;align-items:center;gap:4px;padding:5px 12px;border-radius:6px;font-size:10px;font-weight:600;text-decoration:none;border:1px solid var(--navy-700);color:var(--slate-300);background:var(--navy-800);transition:all .2s}
        .nav-link:hover{border-color:var(--accent);color:var(--accent-light)}
        .nav-link.active{border-color:var(--accent);color:var(--accent-light);background:rgba(${dom.accentRgba},.1)}
        .nav-link .arrow{font-size:12px}
        .task-block{background:var(--navy-800);border:1px solid var(--navy-700);border-left:3px solid var(--accent);border-radius:8px;padding:14px;margin:10px 0}
        .task-block .task-id{font-size:9px;font-weight:700;color:var(--accent-light);letter-spacing:1px;margin-bottom:3px}
        .task-block h4{font-size:12px;font-weight:700;color:var(--white);margin-bottom:6px}
        .task-block .detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:10px}
        .task-block .detail-label{font-weight:600;color:var(--accent-light);font-size:9px;text-transform:uppercase;letter-spacing:.5px}
        .task-block .detail-value{color:var(--slate-300)}
        .qc{color:#34d399;font-weight:600;font-size:10px;margin-top:8px}
        .doc-footer{margin-top:28px;padding-top:10px;border-top:1px solid var(--navy-700);font-size:9px;color:var(--navy-600);display:flex;justify-content:space-between}
    </style>
</head>
<body>
<div class="page">
    <div class="doc-header">
        <div class="level-badge">Level 4 — Tasks</div>
        <h1>Tasks: ${esc(sp.name)}</h1>
        <div class="subtitle">L1: ${esc(dom.id)} ${esc(dom.shortName)} → L2: ${esc(pa.id)} → L3: ${esc(sp.name)} → <strong>L4: Tasks</strong></div>
        <div class="meta"><span>Task Set: ${esc(pa.id)}-SP-00${spIndex+1}-T</span><span>BPMN Level: 4</span><span>${tasks.length} Tasks</span><span>Version 2.0</span><span>April 2026</span></div>
    </div>

    <div class="nav-bar">
        <a class="nav-link" href="../../../L3_Sub_Processes/${dom.folder}/${pa.id.replace('.','')}/${l3File}"><span class="arrow">↑</span> L3 ${esc(sp.name)}</a>
        <span class="nav-link active"><span class="arrow">●</span> L4 Tasks</span>
    </div>

    <h2>1. Task Overview</h2>
    <p>This document decomposes the <strong>${esc(sp.name)}</strong> sub-process into granular, executable tasks with specific data requirements, decision criteria, quality checks, and tools. Each task represents a discrete unit of work that can be assigned, tracked, and verified within the ${esc(dom.name)} domain.</p>

    <h2>2. Detailed Task Breakdown</h2>
${tasks.map(t=>`
    <div class="task-block">
        <div class="task-id">${esc(t.tid)}</div>
        <h4>${esc(t.name)}</h4>
        <div class="detail-grid">
            <div><div class="detail-label">Description</div><div class="detail-value">${esc(t.desc)}</div></div>
            <div><div class="detail-label">Role</div><div class="detail-value">${esc(t.role)}</div></div>
            <div><div class="detail-label">Inputs</div><div class="detail-value">${esc(t.inputs)}</div></div>
            <div><div class="detail-label">Outputs</div><div class="detail-value">${esc(t.outputs)}</div></div>
            <div><div class="detail-label">Tools / Templates</div><div class="detail-value">${esc(t.tools)}</div></div>
            <div><div class="detail-label">SLA</div><div class="detail-value">${esc(t.sla)}</div></div>
        </div>
        <p class="qc">✓ Quality Check: ${esc(t.qc)}</p>
    </div>`).join('')}

    <div class="doc-footer"><span>${esc(pa.id)}-SP-00${spIndex+1} ${esc(sp.name)} — L4 Tasks v2.0</span><span>Confidential — Swift Designz</span></div>
</div>
</body>
</html>`;
}

// ─── L1 page pa-card fix ──────────────────────────────────────────────────────
function fixL1Page(dom){
  const filePath = path.join(BASE,'L1_Professional_Domains',`L1_${dom.id}_${sanitise(dom.shortName)}.html`);
  if(!fs.existsSync(filePath)){ console.warn('  SKIP (not found): '+filePath); return; }
  let html = fs.readFileSync(filePath,'utf8');

  // 1. Update CSS: make pa-cards clickable links
  html = html.replace(
    /\.pa-card\{background:[^}]+\}/,
    `.pa-card{background:var(--navy-800);border:1px solid var(--navy-700);border-left:3px solid var(--accent);border-radius:8px;padding:12px;text-decoration:none;color:inherit;display:block;transition:all .2s}`
  );
  // Add hover effect after pa-card style if not present
  if(!html.includes('.pa-card:hover')){
    html = html.replace(
      /\.pa-card\{[^}]+\}/,
      m => m + '\n        .pa-card:hover{border-color:var(--accent);transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.3)}'
    );
  }
  // Remove old .pa-card p rule (it stops descriptions lining correctly on anchor)
  // Leave as-is since the desc will still be a <p>

  // 2. Replace each <div class="pa-card"> with <a class="pa-card" href="...">
  dom.processAreas.forEach((pa, i) => {
    const l2folder = `../L2_Process_Areas/${dom.folder}`;
    const l2file = `L2_${pa.id.replace('.','_')}_${sanitise(pa.short)}.html`;
    const href = `${l2folder}/${l2file}`;
    // Match the div tag for this PA
    const divRe = new RegExp(`<div class="pa-card"><div class="pa-id">${escRe(pa.id)}<\\/div>`,'g');
    html = html.replace(divRe, `<a class="pa-card" href="${href}"><div class="pa-id">${pa.id}</div>`);
  });

  // 3. Replace trailing </div> associated with pa-cards → </a>
  // We need to replace the closing div tags inside the pa-grid for pa-cards.
  // The pattern is each pa-card block ends </div> - change to </a>
  // After replacing opening divs with <a>, close divs become mismatched.
  // More robust: replace the entire pa-grid section.
  const paGridRe = /<div class="pa-grid">[\s\S]*?<\/div>\s*(?=\s*<h2)/;
  const paGridMatch = html.match(paGridRe);
  if(paGridMatch){
    let grid = '<div class="pa-grid">\n';
    dom.processAreas.forEach((pa,i)=>{
      const l2folder = `../L2_Process_Areas/${dom.folder}`;
      const l2file = `L2_${pa.id.replace('.','_')}_${sanitise(pa.short)}.html`;
      grid += `        <a class="pa-card" href="${l2folder}/${l2file}"><div class="pa-id">${pa.id}</div><h4>${pa.name}</h4><p>${pa.desc}</p><div style="margin-top:6px;font-size:10px;color:var(--accent-light);font-weight:600">→ View L2 Process Area</div></a>\n`;
    });
    grid += '    </div>';
    html = html.replace(paGridRe, grid);
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log('  ✓ Fixed L1: '+path.basename(filePath));
}

function sanitise(s){
  return s.replace(/[^a-zA-Z0-9]/g,'_').replace(/_+/g,'_').replace(/^_|_$/g,'');
}
function escRe(s){ return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); }

// ─── Main ─────────────────────────────────────────────────────────────────────
console.log('\n  Construction Platform — Content Generator');
console.log('  ==========================================\n');

let totalFiles = 0;

DOMAINS.forEach(dom => {
  console.log(`\n  Domain ${dom.id}: ${dom.name}`);

  // Fix L1 page
  fixL1Page(dom);

  // L2 directory
  const l2Dir = mkdirs(BASE, 'L2_Process_Areas', dom.folder);

  dom.processAreas.forEach((pa, paIdx) => {
    // L2 page
    const l2File = path.join(l2Dir, `L2_${pa.id.replace('.','_')}_${sanitise(pa.short)}.html`);
    write(l2File, buildL2(dom, pa, paIdx, dom.processAreas));
    totalFiles++;

    // L3 directory
    const l3Dir = mkdirs(BASE, 'L3_Sub_Processes', dom.folder, pa.id.replace('.',''));

    // L4 directory
    const l4Dir = mkdirs(BASE, 'L4_Tasks', dom.folder, pa.id.replace('.',''));

    pa.subs.forEach((sp, spIdx) => {
      // L3 page
      write(path.join(l3Dir, `${sp.file}.html`), buildL3(dom, pa, sp, spIdx, pa.subs));
      totalFiles++;

      // L4 page
      write(path.join(l4Dir, `L4_T_${sp.file}.html`), buildL4(dom, pa, sp, spIdx));
      totalFiles++;
    });
  });
});

console.log(`\n  ✅ Generated ${totalFiles} files across ${DOMAINS.length} domains\n  Done!\n`);
