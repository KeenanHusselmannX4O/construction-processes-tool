/**
 * Fix L1 pa-cards for D2, D3, D5, D6, D7, D8
 * Converts <div class="pa-card"> → <a class="pa-card" href="...">
 */
const fs = require('fs');
const path = require('path');
const BASE = path.join(__dirname,'L1_Professional_Domains');

function san(s){ return s.replace(/[^a-zA-Z0-9]/g,'_').replace(/_+/g,'_').replace(/^_|_$/g,''); }

const PAGES = [
  {
    file: 'L1_D2_Project_Management.html',
    folder: 'D2_Project_Management',
    accent:'#10b981', accentLight:'#34d399', accentRgba:'16,185,129',
    pas:[
      {id:'D2.1', short:'Project Initiation',        name:'Project Initiation &amp; Charter',            desc:'Feasibility assessment, project charter, execution strategy'},
      {id:'D2.2', short:'Stakeholder_Mgmt',           name:'Stakeholder Management',                      desc:'Identification, engagement, communication planning'},
      {id:'D2.3', short:'Programme_Scheduling',       name:'Programme &amp; Scheduling',                  desc:'Master programme, critical path, milestone tracking'},
      {id:'D2.4', short:'Risk_Management',            name:'Risk Management',                             desc:'Risk identification, assessment, mitigation, monitoring'},
      {id:'D2.5', short:'Quality_Management',         name:'Quality Management',                          desc:'QA/QC plans, inspection protocols, non-conformance'},
      {id:'D2.6', short:'Communication_Reporting',    name:'Communication &amp; Reporting',               desc:'Progress reporting, meeting management, information flow'},
      {id:'D2.7', short:'Close_out_Handover',         name:'Project Close-out &amp; Handover',            desc:'Practical completion, handover, lessons learned, archive'},
    ]
  },
  {
    file: 'L1_D3_Architecture_Design.html',
    folder: 'D3_Architecture_Design',
    accent:'#a855f7', accentLight:'#c084fc', accentRgba:'168,85,247',
    pas:[
      {id:'D3.1', short:'Briefing_Site_Analysis',     name:'Briefing &amp; Site Analysis',                desc:'Client brief capture, site assessment, zoning, bulk analysis'},
      {id:'D3.2', short:'Concept_Scheme_Design',      name:'Concept &amp; Scheme Design',                 desc:'Concept generation, massing, spatial planning, client approval'},
      {id:'D3.3', short:'Design_Development',         name:'Design Development',                          desc:'Detailed design, material selection, consultant coordination'},
      {id:'D3.4', short:'Construction_Documentation', name:'Construction Documentation',                  desc:'Working drawings, specifications, building plan submission'},
      {id:'D3.5', short:'Building_Plan_Approval',     name:'Building Plan Approval',                      desc:'Municipal submission, SANS 10400 compliance, plan approval'},
      {id:'D3.6', short:'Construction_Stage_Services',name:'Construction Stage Services',                 desc:'Site inspections, RFI management, design change control'},
    ]
  },
  {
    file: 'L1_D5_Construction_Management.html',
    folder: 'D5_Construction_Management',
    accent:'#14b8a6', accentLight:'#2dd4bf', accentRgba:'20,184,166',
    pas:[
      {id:'D5.1', short:'Site_Establishment',         name:'Site Establishment &amp; Mobilisation',      desc:'Site setup, camp, plant mobilisation, enabling works'},
      {id:'D5.2', short:'Programme_Execution',        name:'Construction Programme Execution',            desc:'Activity scheduling, sequencing, look-ahead planning'},
      {id:'D5.3', short:'Quality_Assurance',          name:'Quality Assurance &amp; Control',             desc:'ITP, inspection records, non-conformance, testing'},
      {id:'D5.4', short:'Health_Safety_Env',          name:'Health, Safety &amp; Environment',            desc:'H&amp;S plan, toolbox talks, incident management, environmental'},
      {id:'D5.5', short:'Subcontractor_Mgmt',         name:'Subcontractor Management',                    desc:'Subcontract administration, coordination, performance'},
      {id:'D5.6', short:'Resource_Plant',             name:'Resource &amp; Plant Management',             desc:'Labour allocation, plant scheduling, material logistics'},
      {id:'D5.7', short:'Practical_Completion',       name:'Practical Completion &amp; Handover',         desc:'Snag lists, defects resolution, O&amp;M compilation, handover'},
    ]
  },
  {
    file: 'L1_D6_Contract_Administration.html',
    folder: 'D6_Contract_Administration',
    accent:'#f43f5e', accentLight:'#fb7185', accentRgba:'244,63,94',
    pas:[
      {id:'D6.1', short:'Contract_Formation',         name:'Contract Formation &amp; Execution',          desc:'Contract selection, formation, signing, commencement'},
      {id:'D6.2', short:'Site_Instructions',          name:'Site Instructions &amp; Correspondence',      desc:'PA instructions, RFIs, official correspondence, minute taking'},
      {id:'D6.3', short:'Claims_Time_Mgmt',           name:'Claims &amp; Time Management',                desc:'Extension of time, delay analysis, penalty management'},
      {id:'D6.4', short:'Dispute_Resolution',         name:'Dispute Resolution',                          desc:'Mediation, adjudication, arbitration procedures'},
      {id:'D6.5', short:'Completion_Certification',   name:'Completion &amp; Certification',              desc:'Practical completion, final completion, certificate issuance'},
    ]
  },
  {
    file: 'L1_D7_Compliance_Regulatory.html',
    folder: 'D7_Compliance_Regulatory',
    accent:'#f59e0b', accentLight:'#fbbf24', accentRgba:'245,158,11',
    pas:[
      {id:'D7.1', short:'Building_Plan_Approval',     name:'Building Plan &amp; Zoning Approval',         desc:'Municipal plan submission, zoning applications, land-use rights'},
      {id:'D7.2', short:'NHBRC_Enrolment',            name:'NHBRC Enrolment &amp; Inspection',            desc:'Project enrolment, stage inspections, enrolment certificates'},
      {id:'D7.3', short:'Environmental_Compliance',   name:'Environmental Compliance',                    desc:'EIA screening, environmental authorisation, EMPr monitoring'},
      {id:'D7.4', short:'OHS_Act_Compliance',         name:'OHS Act Compliance',                          desc:'OHS plan, construction health &amp; safety file, incident reporting'},
      {id:'D7.5', short:'B_BBEE_Transformation',      name:'B-BBEE &amp; Transformation',                 desc:'Enterprise development, skills development, ownership compliance'},
      {id:'D7.6', short:'Municipal_Services',         name:'Municipal Services &amp; Certificates',       desc:'Service connections, occupancy certificates, compliance certificates'},
      {id:'D7.7', short:'Nat_Building_Regulations',   name:'National Building Regulations',               desc:'SANS 10400 compliance, rational designs, deemed-to-satisfy'},
    ]
  },
  {
    file: 'L1_D8_Procurement_Supply_Chain.html',
    folder: 'D8_Procurement_Supply_Chain',
    accent:'#8b5cf6', accentLight:'#a78bfa', accentRgba:'139,92,246',
    pas:[
      {id:'D8.1', short:'Procurement_Strategy',       name:'Procurement Strategy &amp; Planning',         desc:'Procurement method selection, packaging strategy, market analysis'},
      {id:'D8.2', short:'Supplier_Pre_qualification', name:'Supplier Pre-qualification',                  desc:'Vendor database, CIDB grading verification, B-BBEE validation'},
      {id:'D8.3', short:'Tender_Bid_Admin',           name:'Tender &amp; Bid Administration',             desc:'RFQ/RFP issue, bid evaluation, recommendation, award'},
      {id:'D8.4', short:'Material_Procurement',       name:'Material Procurement &amp; Logistics',        desc:'Purchase orders, delivery scheduling, site receiving, warehousing'},
      {id:'D8.5', short:'Subcontractor_Procurement',  name:'Subcontractor Procurement',                   desc:'Specialist subcontractor sourcing, nomination, performance management'},
    ]
  },
];

const CSS_OLD = '.pa-card{background:var(--navy-800);border:1px solid var(--navy-700);border-left:3px solid var(--accent);border-radius:8px;padding:12px}';
function cssNew(rgba){
  return `.pa-card{background:var(--navy-800);border:1px solid var(--navy-700);border-left:3px solid var(--accent);border-radius:8px;padding:12px;text-decoration:none;color:inherit;display:block;transition:all .2s}
        .pa-card:hover{border-color:var(--accent);transform:translateY(-2px);box-shadow:0 6px 20px rgba(${rgba},.25)}
        .pa-card .arrow-hint{margin-top:6px;font-size:10px;color:var(--accent-light);font-weight:600}`;
}

let fixed = 0;
PAGES.forEach(page => {
  const filePath = path.join(BASE, page.file);
  if(!fs.existsSync(filePath)){ console.warn('  SKIP (not found): '+page.file); return; }
  let html = fs.readFileSync(filePath,'utf8');

  // 1. Fix CSS
  if(html.includes(CSS_OLD)){
    html = html.replace(CSS_OLD, cssNew(page.accentRgba));
  } else if(!html.includes('.pa-card:hover')){
    // CSS pattern may vary slightly — try a regex
    html = html.replace(
      /\.pa-card\{background:var\(--navy-800\)[^}]+\}/,
      cssNew(page.accentRgba)
    );
  }

  // 2. Fix each pa-card div → anchor, using the pa-id to identify which card
  page.pas.forEach(pa => {
    const l2File = `L2_${pa.id.replace('.','_')}_${pa.short}.html`;
    const href = `../L2_Process_Areas/${page.folder}/${l2File}`;
    const paId = pa.id;
    // Match the old div block for this specific pa-id
    const oldOpen = `<div class="pa-card"><div class="pa-id">${paId}</div>`;
    const newOpen = `<a class="pa-card" href="${href}"><div class="pa-id">${paId}</div>`;
    html = html.replace(oldOpen, newOpen);
    // Also find and replace the closing </div> for this card by replacing last </div> after content
    // Strategy: replace </p></div> with </p><div class="arrow-hint">→ View Sub-Processes</div></a> for each pa card
  });

  // 3. Replace closing </p></div> pairs that were pa-cards (now have <a> opening)
  // After step 2, cards look like: <a class="pa-card" ...><div class="pa-id">D2.1</div><h4>...</h4><p>desc</p></div>
  // We need the </div> → </div><div class="arrow-hint">→ View Sub-Processes</div></a>
  // Match pattern: inside a pa-grid, each card ends with </p></div>
  // We'll do a targeted replacement on the pa-grid section
  html = html.replace(
    /(<a class="pa-card"[^>]+>[\s\S]*?<\/p>)<\/div>/g,
    '$1<div class="arrow-hint">→ View Sub-Processes</div></a>'
  );

  fs.writeFileSync(filePath, html, 'utf8');
  console.log('  ✓ Fixed: '+page.file);
  fixed++;
});

console.log(`\n  ✅ Fixed ${fixed} L1 pages\n`);
