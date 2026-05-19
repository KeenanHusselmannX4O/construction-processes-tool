/**
 * Construction Platform — Shared Sidebar Navigation
 * Self-contained script: detects depth, injects sidebar CSS + HTML, handles state.
 * Add to any page with: <script src="[relative_path_to_root]/nav.js"></script>
 */
(function () {
  'use strict';

  // ─── Root prefix detection ────────────────────────────────────────────────
  var me = document.currentScript;
  var srcAttr = me ? (me.getAttribute('src') || '') : '';
  var depth = (srcAttr.match(/\.\.\//g) || []).length;
  var R = '../'.repeat(depth); // root prefix, e.g. '../../'

  // ─── Navigation data ─────────────────────────────────────────────────────
  var DOMAINS = [
    {
      id: 'D1', label: 'QS & Cost Management', accent: '#3b82f6', rgba: '59,130,246',
      l1: 'L1_Professional_Domains/L1_D1_QS_Cost_Management.html',
      pas: [
        { id: 'D1.1', name: 'Cost Planning & Estimation',
          l2: 'L2_Process_Areas/D1_QS_Cost_Management/L2_D1.1_Cost_Planning_Estimation.html',
          l3d: 'L3_Sub_Processes/D1_QS_Cost_Management/D1.1_Cost_Planning_Estimation',
          l4d: 'L4_Tasks/D1_QS_Cost_Management/D1.1_Cost_Planning_Estimation',
          sps: [
            { n: 'Feasibility Cost Estimate',      f: 'SP_Feasibility_Cost_Estimate' },
            { n: 'Elemental Cost Plan',             f: 'SP_Elemental_Cost_Plan' },
            { n: 'Cost Plan Revision',              f: 'SP_Cost_Plan_Revision' }
          ]
        },
        { id: 'D1.2', name: 'BoQ Production',
          l2: 'L2_Process_Areas/D1_QS_Cost_Management/L2_D1.2_BoQ_Production.html',
          l3d: 'L3_Sub_Processes/D1_QS_Cost_Management/D1.2_BoQ_Production',
          l4d: 'L4_Tasks/D1_QS_Cost_Management/D1.2_BoQ_Production',
          sps: [
            { n: 'BoQ Compilation',         f: 'SP_BoQ_Compilation' },
            { n: 'Measurement Takeoff',     f: 'SP_Measurement_Takeoff' },
            { n: 'Preambles & Prelims',     f: 'SP_Preambles_Preliminaries' }
          ]
        },
        { id: 'D1.3', name: 'Tender Documentation & Evaluation',
          l2: 'L2_Process_Areas/D1_QS_Cost_Management/L2_D1.3_Tender_Documentation_Evaluation.html',
          l3d: 'L3_Sub_Processes/D1_QS_Cost_Management/D1.3_Tender_Documentation_Evaluation',
          l4d: 'L4_Tasks/D1_QS_Cost_Management/D1.3_Tender_Documentation_Evaluation',
          sps: [
            { n: 'Tender Document Compilation',       f: 'SP_Tender_Document_Compilation' },
            { n: 'Arithmetic Check & Qualification',  f: 'SP_Arithmetic_Check_Qualification' },
            { n: 'Comparative Analysis',              f: 'SP_Comparative_Analysis' }
          ]
        },
        { id: 'D1.4', name: 'Contract Financial Administration',
          l2: 'L2_Process_Areas/D1_QS_Cost_Management/L2_D1.4_Contract_Financial_Administration.html',
          l3d: 'L3_Sub_Processes/D1_QS_Cost_Management/D1.4_Contract_Financial_Administration',
          l4d: 'L4_Tasks/D1_QS_Cost_Management/D1.4_Contract_Financial_Administration',
          sps: [
            { n: 'Contract Price Schedule', f: 'SP_Contract_Price_Schedule' },
            { n: 'CPA Adjustments',         f: 'SP_CPA_Adjustments' },
            { n: 'Provisional Sum Admin',   f: 'SP_Provisional_Sum_Admin' },
            { n: 'Retention Management',    f: 'SP_Retention_Management' }
          ]
        },
        { id: 'D1.5', name: 'Monthly Valuations & Payment',
          l2: 'L2_Process_Areas/D1_QS_Cost_Management/L2_D1.5_Monthly_Valuations_Payment.html',
          l3d: 'L3_Sub_Processes/D1_QS_Cost_Management/D1.5_Monthly_Valuations_Payment',
          l4d: 'L4_Tasks/D1_QS_Cost_Management/D1.5_Monthly_Valuations_Payment',
          sps: [
            { n: 'Site Measurement',                  f: 'SP_Site_Measurement' },
            { n: 'Valuation & Payment Certificate',   f: 'SP_Valuation_Payment_Certificate' }
          ]
        },
        { id: 'D1.6', name: 'Variation Assessment & Management',
          l2: 'L2_Process_Areas/D1_QS_Cost_Management/L2_D1.6_Variation_Assessment_Management.html',
          l3d: 'L3_Sub_Processes/D1_QS_Cost_Management/D1.6_Variation_Assessment_Management',
          l4d: 'L4_Tasks/D1_QS_Cost_Management/D1.6_Variation_Assessment_Management',
          sps: [
            { n: 'Variation Registration & Cost Assessment', f: 'SP_Variation_Registration_Cost_Assessment' }
          ]
        },
        { id: 'D1.7', name: 'Budget Tracking & Cost Control',
          l2: 'L2_Process_Areas/D1_QS_Cost_Management/L2_D1.7_Budget_Tracking_Cost_Control.html',
          l3d: 'L3_Sub_Processes/D1_QS_Cost_Management/D1.7_Budget_Tracking_Cost_Control',
          l4d: 'L4_Tasks/D1_QS_Cost_Management/D1.7_Budget_Tracking_Cost_Control',
          sps: [
            { n: 'Budget Monitoring & PFC',  f: 'SP_Budget_Monitoring_PFC' },
            { n: 'Contingency & Cash Flow',  f: 'SP_Contingency_Cash_Flow' }
          ]
        },
        { id: 'D1.8', name: 'Final Account & Close-out',
          l2: 'L2_Process_Areas/D1_QS_Cost_Management/L2_D1.8_Final_Account_Closeout.html',
          l3d: 'L3_Sub_Processes/D1_QS_Cost_Management/D1.8_Final_Account_Closeout',
          l4d: 'L4_Tasks/D1_QS_Cost_Management/D1.8_Final_Account_Closeout',
          sps: [
            { n: 'Final Measurement & Account',  f: 'SP_Final_Measurement_Account' },
            { n: 'Defects Liability Close-out',  f: 'SP_Defects_Liability_Closeout' }
          ]
        },
        { id: 'D1.9', name: 'Funder Reporting & Drawdowns',
          l2: 'L2_Process_Areas/D1_QS_Cost_Management/L2_D1.9_Funder_Reporting_Drawdowns.html',
          l3d: 'L3_Sub_Processes/D1_QS_Cost_Management/D1.9_Funder_Reporting_Drawdowns',
          l4d: 'L4_Tasks/D1_QS_Cost_Management/D1.9_Funder_Reporting_Drawdowns',
          sps: [
            { n: 'Drawdown Request',            f: 'SP_Drawdown_Request' },
            { n: 'Monthly Cost Report',         f: 'SP_Monthly_Cost_Report' },
            { n: 'Subsidy Claim Documentation', f: 'SP_Subsidy_Claim_Documentation' }
          ]
        }
      ]
    },
    {
      id: 'D2', label: 'Project Management', accent: '#10b981', rgba: '16,185,129',
      l1: 'L1_Professional_Domains/L1_D2_Project_Management.html',
      pas: [
        { id: 'D2.1', name: 'Project Initiation & Charter',
          l2: 'L2_Process_Areas/D2_Project_Management/L2_D2_1_Project_Initiation.html',
          l3d: 'L3_Sub_Processes/D2_Project_Management/D21',
          l4d: 'L4_Tasks/D2_Project_Management/D21',
          sps: [
            { n: 'Project Charter Development',  f: 'SP_Project_Charter' },
            { n: 'Project Execution Strategy',   f: 'SP_Execution_Strategy' }
          ]
        },
        { id: 'D2.2', name: 'Stakeholder Management',
          l2: 'L2_Process_Areas/D2_Project_Management/L2_D2_2_Stakeholder_Mgmt.html',
          l3d: 'L3_Sub_Processes/D2_Project_Management/D22',
          l4d: 'L4_Tasks/D2_Project_Management/D22',
          sps: [
            { n: 'Stakeholder Register & Analysis', f: 'SP_Stakeholder_Register' },
            { n: 'Communication Plan',              f: 'SP_Communication_Plan' }
          ]
        },
        { id: 'D2.3', name: 'Programme & Scheduling',
          l2: 'L2_Process_Areas/D2_Project_Management/L2_D2_3_Programme_Scheduling.html',
          l3d: 'L3_Sub_Processes/D2_Project_Management/D23',
          l4d: 'L4_Tasks/D2_Project_Management/D23',
          sps: [
            { n: 'Master Programme Development', f: 'SP_Master_Programme' },
            { n: 'Critical Path Monitoring',     f: 'SP_Critical_Path_Monitoring' }
          ]
        },
        { id: 'D2.4', name: 'Risk Management',
          l2: 'L2_Process_Areas/D2_Project_Management/L2_D2_4_Risk_Management.html',
          l3d: 'L3_Sub_Processes/D2_Project_Management/D24',
          l4d: 'L4_Tasks/D2_Project_Management/D24',
          sps: [
            { n: 'Risk Register & Assessment',     f: 'SP_Risk_Register_Assessment' },
            { n: 'Risk Mitigation & Monitoring',   f: 'SP_Risk_Mitigation_Monitoring' }
          ]
        },
        { id: 'D2.5', name: 'Quality Management',
          l2: 'L2_Process_Areas/D2_Project_Management/L2_D2_5_Quality_Management.html',
          l3d: 'L3_Sub_Processes/D2_Project_Management/D25',
          l4d: 'L4_Tasks/D2_Project_Management/D25',
          sps: [
            { n: 'QA/QC Plan Development',      f: 'SP_QA_QC_Plan' },
            { n: 'Inspection & Non-Conformance', f: 'SP_Inspection_Non_Conformance' }
          ]
        },
        { id: 'D2.6', name: 'Communication & Reporting',
          l2: 'L2_Process_Areas/D2_Project_Management/L2_D2_6_Communication_Reporting.html',
          l3d: 'L3_Sub_Processes/D2_Project_Management/D26',
          l4d: 'L4_Tasks/D2_Project_Management/D26',
          sps: [
            { n: 'Progress Report Production', f: 'SP_Progress_Reporting' },
            { n: 'Meeting Management & Minutes', f: 'SP_Meeting_Management' }
          ]
        },
        { id: 'D2.7', name: 'Project Close-out & Handover',
          l2: 'L2_Process_Areas/D2_Project_Management/L2_D2_7_Close_out_Handover.html',
          l3d: 'L3_Sub_Processes/D2_Project_Management/D27',
          l4d: 'L4_Tasks/D2_Project_Management/D27',
          sps: [
            { n: 'Project Close-out Report', f: 'SP_Closeout_Report' },
            { n: 'Lessons Learned & Archive', f: 'SP_Lessons_Learned' }
          ]
        }
      ]
    },
    {
      id: 'D3', label: 'Architecture & Design', accent: '#a855f7', rgba: '168,85,247',
      l1: 'L1_Professional_Domains/L1_D3_Architecture_Design.html',
      pas: [
        { id: 'D3.1', name: 'Briefing & Site Analysis',
          l2: 'L2_Process_Areas/D3_Architecture_Design/L2_D3_1_Briefing_Site_Analysis.html',
          l3d: 'L3_Sub_Processes/D3_Architecture_Design/D31',
          l4d: 'L4_Tasks/D3_Architecture_Design/D31',
          sps: [
            { n: 'Client Brief Capture',     f: 'SP_Client_Brief_Capture' },
            { n: 'Site Analysis & Zoning',   f: 'SP_Site_Analysis_Zoning' }
          ]
        },
        { id: 'D3.2', name: 'Concept & Scheme Design',
          l2: 'L2_Process_Areas/D3_Architecture_Design/L2_D3_2_Concept_Scheme_Design.html',
          l3d: 'L3_Sub_Processes/D3_Architecture_Design/D32',
          l4d: 'L4_Tasks/D3_Architecture_Design/D32',
          sps: [
            { n: 'Concept Design Generation',    f: 'SP_Concept_Generation' },
            { n: 'Scheme Design & Approval',     f: 'SP_Scheme_Design_Approval' }
          ]
        },
        { id: 'D3.3', name: 'Design Development',
          l2: 'L2_Process_Areas/D3_Architecture_Design/L2_D3_3_Design_Development.html',
          l3d: 'L3_Sub_Processes/D3_Architecture_Design/D33',
          l4d: 'L4_Tasks/D3_Architecture_Design/D33',
          sps: [
            { n: 'Design Development Drawings', f: 'SP_Design_Development_Drawings' },
            { n: 'Material & Specifications',   f: 'SP_Material_Specifications' }
          ]
        },
        { id: 'D3.4', name: 'Construction Documentation',
          l2: 'L2_Process_Areas/D3_Architecture_Design/L2_D3_4_Construction_Documentation.html',
          l3d: 'L3_Sub_Processes/D3_Architecture_Design/D34',
          l4d: 'L4_Tasks/D3_Architecture_Design/D34',
          sps: [
            { n: 'Working Drawings Production',     f: 'SP_Working_Drawings_Production' },
            { n: 'Tender Drawings & Specification', f: 'SP_Tender_Drawings' }
          ]
        },
        { id: 'D3.5', name: 'Building Plan Approval',
          l2: 'L2_Process_Areas/D3_Architecture_Design/L2_D3_5_Building_Plan_Approval.html',
          l3d: 'L3_Sub_Processes/D3_Architecture_Design/D35',
          l4d: 'L4_Tasks/D3_Architecture_Design/D35',
          sps: [
            { n: 'Municipal Plan Submission',         f: 'SP_Municipal_Submission' },
            { n: 'Plan Approval Response & Amendments', f: 'SP_Plan_Approval_Response' }
          ]
        },
        { id: 'D3.6', name: 'Construction Stage Services',
          l2: 'L2_Process_Areas/D3_Architecture_Design/L2_D3_6_Construction_Stage_Services.html',
          l3d: 'L3_Sub_Processes/D3_Architecture_Design/D36',
          l4d: 'L4_Tasks/D3_Architecture_Design/D36',
          sps: [
            { n: 'Site Inspections & RFI Management', f: 'SP_Site_Inspection_RFI' },
            { n: 'Design Change Control',             f: 'SP_Design_Change_Control' }
          ]
        }
      ]
    },
    {
      id: 'D4', label: 'Engineering', accent: '#f97316', rgba: '249,115,22',
      l1: 'L1_Professional_Domains/L1_D4_Engineering.html',
      pas: [
        { id: 'D4.1', name: 'Geotechnical Investigation',
          l2: 'L2_Process_Areas/D4_Engineering/L2_D4_1_Geotechnical_Investigation.html',
          l3d: 'L3_Sub_Processes/D4_Engineering/D41',
          l4d: 'L4_Tasks/D4_Engineering/D41',
          sps: [
            { n: 'Site Investigation & Testing',       f: 'SP_Site_Investigation' },
            { n: 'Foundation Recommendation Report',   f: 'SP_Foundation_Recommendation' }
          ]
        },
        { id: 'D4.2', name: 'Structural Design',
          l2: 'L2_Process_Areas/D4_Engineering/L2_D4_2_Structural_Design.html',
          l3d: 'L3_Sub_Processes/D4_Engineering/D42',
          l4d: 'L4_Tasks/D4_Engineering/D42',
          sps: [
            { n: 'Structural Analysis & Design',    f: 'SP_Structural_Analysis_Design' },
            { n: 'Structural Drawing Production',   f: 'SP_Structural_Drawing_Production' }
          ]
        },
        { id: 'D4.3', name: 'Civil & Infrastructure Design',
          l2: 'L2_Process_Areas/D4_Engineering/L2_D4_3_Civil_Infrastructure.html',
          l3d: 'L3_Sub_Processes/D4_Engineering/D43',
          l4d: 'L4_Tasks/D4_Engineering/D43',
          sps: [
            { n: 'Stormwater & Road Design',   f: 'SP_Stormwater_Road_Design' },
            { n: 'Services Reticulation',      f: 'SP_Services_Reticulation' }
          ]
        },
        { id: 'D4.4', name: 'Mechanical & HVAC Design',
          l2: 'L2_Process_Areas/D4_Engineering/L2_D4_4_Mechanical_HVAC.html',
          l3d: 'L3_Sub_Processes/D4_Engineering/D44',
          l4d: 'L4_Tasks/D4_Engineering/D44',
          sps: [
            { n: 'HVAC & Fire Suppression Design',      f: 'SP_HVAC_Fire_Design' },
            { n: 'Mechanical Specification & Schedules', f: 'SP_Mechanical_Specification' }
          ]
        },
        { id: 'D4.5', name: 'Electrical & Plumbing Design',
          l2: 'L2_Process_Areas/D4_Engineering/L2_D4_5_Electrical_Plumbing.html',
          l3d: 'L3_Sub_Processes/D4_Engineering/D45',
          l4d: 'L4_Tasks/D4_Engineering/D45',
          sps: [
            { n: 'Electrical Design & Distribution', f: 'SP_Electrical_Design_Distrib' },
            { n: 'Plumbing & Solar Design',          f: 'SP_Plumbing_Solar_Design' }
          ]
        },
        { id: 'D4.6', name: 'Construction Supervision & Testing',
          l2: 'L2_Process_Areas/D4_Engineering/L2_D4_6_Construction_Supervision.html',
          l3d: 'L3_Sub_Processes/D4_Engineering/D46',
          l4d: 'L4_Tasks/D4_Engineering/D46',
          sps: [
            { n: 'Site Inspection & Testing', f: 'SP_Site_Inspection_Testing' },
            { n: 'MEP Commissioning',         f: 'SP_MEP_Commissioning' }
          ]
        }
      ]
    },
    {
      id: 'D5', label: 'Construction Management', accent: '#14b8a6', rgba: '20,184,166',
      l1: 'L1_Professional_Domains/L1_D5_Construction_Management.html',
      pas: [
        { id: 'D5.1', name: 'Site Establishment & Mobilisation',
          l2: 'L2_Process_Areas/D5_Construction_Management/L2_D5_1_Site_Establishment.html',
          l3d: 'L3_Sub_Processes/D5_Construction_Management/D51',
          l4d: 'L4_Tasks/D5_Construction_Management/D51',
          sps: [
            { n: 'Site Setup & Camp Establishment',     f: 'SP_Site_Setup_Camp' },
            { n: 'Plant & Enabling Works Mobilisation', f: 'SP_Plant_Mobilisation' }
          ]
        },
        { id: 'D5.2', name: 'Construction Programme Execution',
          l2: 'L2_Process_Areas/D5_Construction_Management/L2_D5_2_Programme_Execution.html',
          l3d: 'L3_Sub_Processes/D5_Construction_Management/D52',
          l4d: 'L4_Tasks/D5_Construction_Management/D52',
          sps: [
            { n: 'Activity Scheduling & Sequencing', f: 'SP_Activity_Scheduling' },
            { n: 'Look-Ahead Planning',              f: 'SP_Look_Ahead_Planning' }
          ]
        },
        { id: 'D5.3', name: 'Quality Assurance & Control',
          l2: 'L2_Process_Areas/D5_Construction_Management/L2_D5_3_Quality_Assurance.html',
          l3d: 'L3_Sub_Processes/D5_Construction_Management/D53',
          l4d: 'L4_Tasks/D5_Construction_Management/D53',
          sps: [
            { n: 'Inspection & Test Plan',       f: 'SP_Inspection_Test_Plan' },
            { n: 'Non-Conformance Management',   f: 'SP_Non_Conformance_Management' }
          ]
        },
        { id: 'D5.4', name: 'Health, Safety & Environment',
          l2: 'L2_Process_Areas/D5_Construction_Management/L2_D5_4_Health_Safety_Env.html',
          l3d: 'L3_Sub_Processes/D5_Construction_Management/D54',
          l4d: 'L4_Tasks/D5_Construction_Management/D54',
          sps: [
            { n: 'H&S Plan & Safety File',           f: 'SP_HS_Plan_File' },
            { n: 'Incident Management & Reporting',  f: 'SP_Incident_Management' }
          ]
        },
        { id: 'D5.5', name: 'Subcontractor Management',
          l2: 'L2_Process_Areas/D5_Construction_Management/L2_D5_5_Subcontractor_Mgmt.html',
          l3d: 'L3_Sub_Processes/D5_Construction_Management/D55',
          l4d: 'L4_Tasks/D5_Construction_Management/D55',
          sps: [
            { n: 'Subcontract Administration',           f: 'SP_Subcontract_Administration' },
            { n: 'Subcontractor Performance Monitoring', f: 'SP_Subcontractor_Performance' }
          ]
        },
        { id: 'D5.6', name: 'Resource & Plant Management',
          l2: 'L2_Process_Areas/D5_Construction_Management/L2_D5_6_Resource_Plant.html',
          l3d: 'L3_Sub_Processes/D5_Construction_Management/D56',
          l4d: 'L4_Tasks/D5_Construction_Management/D56',
          sps: [
            { n: 'Labour Allocation & Tracking',  f: 'SP_Labour_Allocation' },
            { n: 'Plant & Material Logistics',    f: 'SP_Plant_Material_Logistics' }
          ]
        },
        { id: 'D5.7', name: 'Practical Completion & Handover',
          l2: 'L2_Process_Areas/D5_Construction_Management/L2_D5_7_Practical_Completion.html',
          l3d: 'L3_Sub_Processes/D5_Construction_Management/D57',
          l4d: 'L4_Tasks/D5_Construction_Management/D57',
          sps: [
            { n: 'Snag List Resolution',        f: 'SP_Snag_List_Resolution' },
            { n: 'O&M Manual & Handover Package', f: 'SP_OM_Manual_Handover' }
          ]
        }
      ]
    },
    {
      id: 'D6', label: 'Contract Administration', accent: '#f43f5e', rgba: '244,63,94',
      l1: 'L1_Professional_Domains/L1_D6_Contract_Administration.html',
      pas: [
        { id: 'D6.1', name: 'Contract Formation & Execution',
          l2: 'L2_Process_Areas/D6_Contract_Administration/L2_D6_1_Contract_Formation.html',
          l3d: 'L3_Sub_Processes/D6_Contract_Administration/D61',
          l4d: 'L4_Tasks/D6_Contract_Administration/D61',
          sps: [
            { n: 'Contract Selection & Formation', f: 'SP_Contract_Selection_Formation' },
            { n: 'Contract Execution & Commencement', f: 'SP_Contract_Execution' }
          ]
        },
        { id: 'D6.2', name: 'Site Instructions & Correspondence',
          l2: 'L2_Process_Areas/D6_Contract_Administration/L2_D6_2_Site_Instructions.html',
          l3d: 'L3_Sub_Processes/D6_Contract_Administration/D62',
          l4d: 'L4_Tasks/D6_Contract_Administration/D62',
          sps: [
            { n: 'Principal Agent Site Instructions', f: 'SP_PA_Site_Instructions' },
            { n: 'RFI & Official Correspondence',     f: 'SP_RFI_Correspondence' }
          ]
        },
        { id: 'D6.3', name: 'Claims & Time Management',
          l2: 'L2_Process_Areas/D6_Contract_Administration/L2_D6_3_Claims_Time_Mgmt.html',
          l3d: 'L3_Sub_Processes/D6_Contract_Administration/D63',
          l4d: 'L4_Tasks/D6_Contract_Administration/D63',
          sps: [
            { n: 'Extension of Time & Delay Analysis', f: 'SP_EOT_Delay_Analysis' },
            { n: 'Penalty & Bonus Management',         f: 'SP_Penalty_Management' }
          ]
        },
        { id: 'D6.4', name: 'Dispute Resolution',
          l2: 'L2_Process_Areas/D6_Contract_Administration/L2_D6_4_Dispute_Resolution.html',
          l3d: 'L3_Sub_Processes/D6_Contract_Administration/D64',
          l4d: 'L4_Tasks/D6_Contract_Administration/D64',
          sps: [
            { n: 'Dispute Notice & Register',    f: 'SP_Dispute_Notice_Register' },
            { n: 'Mediation & Adjudication',     f: 'SP_Mediation_Adjudication' }
          ]
        },
        { id: 'D6.5', name: 'Completion & Certification',
          l2: 'L2_Process_Areas/D6_Contract_Administration/L2_D6_5_Completion_Certification.html',
          l3d: 'L3_Sub_Processes/D6_Contract_Administration/D65',
          l4d: 'L4_Tasks/D6_Contract_Administration/D65',
          sps: [
            { n: 'Practical Completion Certificate', f: 'SP_Practical_Completion_Cert' },
            { n: 'Final Completion Certificate',     f: 'SP_Final_Completion_Cert' }
          ]
        }
      ]
    },
    {
      id: 'D7', label: 'Compliance & Regulatory', accent: '#f59e0b', rgba: '245,158,11',
      l1: 'L1_Professional_Domains/L1_D7_Compliance_Regulatory.html',
      pas: [
        { id: 'D7.1', name: 'Building Plan & Zoning Approval',
          l2: 'L2_Process_Areas/D7_Compliance_Regulatory/L2_D7_1_Building_Plan_Approval.html',
          l3d: 'L3_Sub_Processes/D7_Compliance_Regulatory/D71',
          l4d: 'L4_Tasks/D7_Compliance_Regulatory/D71',
          sps: [
            { n: 'Building Plan Submission Process', f: 'SP_Plan_Submission_Process' },
            { n: 'Zoning & Land-Use Rights',         f: 'SP_Zoning_Land_Use' }
          ]
        },
        { id: 'D7.2', name: 'NHBRC Enrolment & Inspection',
          l2: 'L2_Process_Areas/D7_Compliance_Regulatory/L2_D7_2_NHBRC_Enrolment.html',
          l3d: 'L3_Sub_Processes/D7_Compliance_Regulatory/D72',
          l4d: 'L4_Tasks/D7_Compliance_Regulatory/D72',
          sps: [
            { n: 'NHBRC Project Enrolment', f: 'SP_Project_Enrolment' },
            { n: 'NHBRC Stage Inspections', f: 'SP_Stage_Inspections' }
          ]
        },
        { id: 'D7.3', name: 'Environmental Compliance',
          l2: 'L2_Process_Areas/D7_Compliance_Regulatory/L2_D7_3_Environmental_Compliance.html',
          l3d: 'L3_Sub_Processes/D7_Compliance_Regulatory/D73',
          l4d: 'L4_Tasks/D7_Compliance_Regulatory/D73',
          sps: [
            { n: 'EIA Screening & Scoping',      f: 'SP_EIA_Screening' },
            { n: 'EMPr Implementation',          f: 'SP_EMPr_Implementation' }
          ]
        },
        { id: 'D7.4', name: 'OHS Act Compliance',
          l2: 'L2_Process_Areas/D7_Compliance_Regulatory/L2_D7_4_OHS_Act_Compliance.html',
          l3d: 'L3_Sub_Processes/D7_Compliance_Regulatory/D74',
          l4d: 'L4_Tasks/D7_Compliance_Regulatory/D74',
          sps: [
            { n: 'OHS Plan & Safety File',      f: 'SP_OHS_Plan_File' },
            { n: 'Safety Audit & Reporting',    f: 'SP_Safety_Audit_Reporting' }
          ]
        },
        { id: 'D7.5', name: 'B-BBEE & Transformation',
          l2: 'L2_Process_Areas/D7_Compliance_Regulatory/L2_D7_5_B_BBEE_Transformation.html',
          l3d: 'L3_Sub_Processes/D7_Compliance_Regulatory/D75',
          l4d: 'L4_Tasks/D7_Compliance_Regulatory/D75',
          sps: [
            { n: 'B-BBEE Verification & Scorecard',    f: 'SP_BBBEE_Verification' },
            { n: 'Enterprise & Skills Development',    f: 'SP_Enterprise_Skills_Dev' }
          ]
        },
        { id: 'D7.6', name: 'Municipal Services & Certificates',
          l2: 'L2_Process_Areas/D7_Compliance_Regulatory/L2_D7_6_Municipal_Services.html',
          l3d: 'L3_Sub_Processes/D7_Compliance_Regulatory/D76',
          l4d: 'L4_Tasks/D7_Compliance_Regulatory/D76',
          sps: [
            { n: 'Municipal Service Connections', f: 'SP_Service_Connections' },
            { n: 'Occupancy Certificate',         f: 'SP_Occupancy_Certificate' }
          ]
        },
        { id: 'D7.7', name: 'National Building Regulations',
          l2: 'L2_Process_Areas/D7_Compliance_Regulatory/L2_D7_7_Nat_Building_Regulations.html',
          l3d: 'L3_Sub_Processes/D7_Compliance_Regulatory/D77',
          l4d: 'L4_Tasks/D7_Compliance_Regulatory/D77',
          sps: [
            { n: 'SANS 10400 Compliance Review', f: 'SP_SANS10400_Review' },
            { n: 'Rational Design Process',      f: 'SP_Rational_Design_Process' }
          ]
        }
      ]
    },
    {
      id: 'D8', label: 'Procurement & Supply Chain', accent: '#8b5cf6', rgba: '139,92,246',
      l1: 'L1_Professional_Domains/L1_D8_Procurement_Supply_Chain.html',
      pas: [
        { id: 'D8.1', name: 'Procurement Strategy & Planning',
          l2: 'L2_Process_Areas/D8_Procurement_Supply_Chain/L2_D8_1_Procurement_Strategy.html',
          l3d: 'L3_Sub_Processes/D8_Procurement_Supply_Chain/D81',
          l4d: 'L4_Tasks/D8_Procurement_Supply_Chain/D81',
          sps: [
            { n: 'Procurement Strategy & Plan', f: 'SP_Procurement_Strategy_Plan' },
            { n: 'Market Analysis & Benchmarking', f: 'SP_Market_Analysis' }
          ]
        },
        { id: 'D8.2', name: 'Supplier Pre-qualification',
          l2: 'L2_Process_Areas/D8_Procurement_Supply_Chain/L2_D8_2_Supplier_Pre_qualification.html',
          l3d: 'L3_Sub_Processes/D8_Procurement_Supply_Chain/D82',
          l4d: 'L4_Tasks/D8_Procurement_Supply_Chain/D82',
          sps: [
            { n: 'Vendor Database & Registration', f: 'SP_Vendor_Database_Registration' },
            { n: 'CIDB & B-BBEE Verification',     f: 'SP_CIDB_BBBEE_Verification' }
          ]
        },
        { id: 'D8.3', name: 'Tender & Bid Administration',
          l2: 'L2_Process_Areas/D8_Procurement_Supply_Chain/L2_D8_3_Tender_Bid_Admin.html',
          l3d: 'L3_Sub_Processes/D8_Procurement_Supply_Chain/D83',
          l4d: 'L4_Tasks/D8_Procurement_Supply_Chain/D83',
          sps: [
            { n: 'RFQ & RFP Issue & Management', f: 'SP_RFQ_RFP_Issue' },
            { n: 'Bid Evaluation & Award',        f: 'SP_Bid_Evaluation_Award' }
          ]
        },
        { id: 'D8.4', name: 'Material Procurement & Logistics',
          l2: 'L2_Process_Areas/D8_Procurement_Supply_Chain/L2_D8_4_Material_Procurement.html',
          l3d: 'L3_Sub_Processes/D8_Procurement_Supply_Chain/D84',
          l4d: 'L4_Tasks/D8_Procurement_Supply_Chain/D84',
          sps: [
            { n: 'Purchase Orders & Delivery',   f: 'SP_Purchase_Orders_Delivery' },
            { n: 'Site Receiving & Warehousing', f: 'SP_Site_Receiving_Warehousing' }
          ]
        },
        { id: 'D8.5', name: 'Subcontractor Procurement',
          l2: 'L2_Process_Areas/D8_Procurement_Supply_Chain/L2_D8_5_Subcontractor_Procurement.html',
          l3d: 'L3_Sub_Processes/D8_Procurement_Supply_Chain/D85',
          l4d: 'L4_Tasks/D8_Procurement_Supply_Chain/D85',
          sps: [
            { n: 'Specialist Subcontractor Sourcing',   f: 'SP_Specialist_Sourcing' },
            { n: 'Subcontractor Performance Mgmt',      f: 'SP_Subcontractor_Performance_Mgmt' }
          ]
        }
      ]
    }
  ];

  // ─── Detect current location ──────────────────────────────────────────────
  var href = window.location.href.replace(/\\/g, '/');
  var activeDomain = null, activePa = null, activeSp = null;
  var isL4 = false;

  function urlMatches(rel) {
    return href.endsWith('/' + rel) || href.endsWith('/' + rel.replace(/\//g, '/'));
  }

  DOMAINS.forEach(function (dom) {
    if (urlMatches(dom.l1)) { activeDomain = dom; return; }
    dom.pas.forEach(function (pa) {
      if (urlMatches(pa.l2)) { activeDomain = dom; activePa = pa; return; }
      pa.sps.forEach(function (sp) {
        var l3url = pa.l3d + '/' + sp.f + '.html';
        var l4url = pa.l4d + '/L4_T_' + sp.f + '.html';
        if (urlMatches(l3url)) { activeDomain = dom; activePa = pa; activeSp = sp; }
        if (urlMatches(l4url)) { activeDomain = dom; activePa = pa; activeSp = sp; isL4 = true; }
      });
    });
  });

  // ─── CSS ──────────────────────────────────────────────────────────────────
  var CSS = [
    '@media screen{',
    'body{padding-left:240px}',
    '@media(max-width:900px){body{padding-left:0}}',
    '}',
    '@media print{#cp-nav,#cp-toggle-float{display:none!important}body{padding-left:0!important}}',

    '#cp-nav{',
    'position:fixed;left:0;top:0;width:240px;height:100vh;',
    'background:#fff;border-right:1px solid #c8c8c8;',
    'display:flex;flex-direction:column;z-index:9999;',
    'font-family:Segoe UI,Arial,sans-serif;',
    'transition:transform .25s ease;',
    '}',
    '#cp-nav.cp-collapsed{transform:translateX(-240px)}',

    '#cp-nav-header{',
    'padding:10px 12px;border-bottom:1px solid #d4d4d4;',
    'display:flex;align-items:center;gap:8px;flex-shrink:0;background:#1e1e1e',
    '}',
    '#cp-nav-title{flex:1;min-width:0}',
    '#cp-nav-title .t1{font-size:12px;font-weight:600;color:#f0f0f0;line-height:1.2}',
    '#cp-nav-title .t2{font-size:9px;font-weight:400;color:#999;text-transform:uppercase;letter-spacing:1.2px}',
    '#cp-close-btn{width:22px;height:22px;border:none;background:transparent;color:#999;',
    'cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;',
    'border-radius:2px;transition:all .1s;flex-shrink:0}',
    '#cp-close-btn:hover{background:#333;color:#fff}',

    '#cp-nav-scroll{overflow-y:auto;flex:1;padding:4px 0}',
    '#cp-nav-scroll::-webkit-scrollbar{width:4px}',
    '#cp-nav-scroll::-webkit-scrollbar-track{background:#f5f5f5}',
    '#cp-nav-scroll::-webkit-scrollbar-thumb{background:#c8c8c8;border-radius:2px}',

    '.cp-top-link{display:block;padding:6px 12px;font-size:11px;font-weight:500;',
    'color:#444;text-decoration:none;transition:background .1s}',
    '.cp-top-link:hover{background:#f0f0f0;color:#1c1c1c}',
    '.cp-top-link.active{background:#e8e8e8;color:#1c1c1c;font-weight:600}',
    '.cp-top-link .cp-badge{font-size:8px;font-weight:700;letter-spacing:.5px;padding:1px 4px;',
    'border:1px solid #c8c8c8;background:#ececec;color:#555;border-radius:2px;',
    'margin-right:5px;font-family:Courier New,monospace;text-transform:uppercase}',
    '.cp-badge-l0{background:#ececec;color:#555}',

    '.cp-sep{height:1px;background:#e4e4e4;margin:4px 0}',

    '.cp-domain{border-bottom:1px solid #e4e4e4}',
    '.cp-domain-hdr{display:flex;align-items:center;gap:8px;padding:7px 12px;',
    'cursor:pointer;transition:background .1s;user-select:none;background:#f7f7f7}',
    '.cp-domain-hdr:hover{background:#efefef}',
    '.cp-domain.open > .cp-domain-hdr{background:#e8e8e8}',
    '.cp-domain-dot{display:none}',
    '.cp-domain-lbl{flex:1;font-size:11px;font-weight:600;color:#1c1c1c;line-height:1.3}',
    '.cp-domain-arr{font-size:8px;color:#888;transition:transform .15s;flex-shrink:0}',
    '.cp-domain.open > .cp-domain-hdr .cp-domain-arr{transform:rotate(90deg)}',
    '.cp-domain-body{display:none;border-top:1px solid #e4e4e4;background:#fdfdfd}',
    '.cp-domain.open > .cp-domain-body{display:block}',

    '.cp-l1-link{display:block;padding:5px 12px 5px 28px;font-size:10px;font-weight:600;',
    'color:#555;text-decoration:none;transition:background .1s;',
    'border-left:none}',
    '.cp-l1-link:hover{background:#f0f0f0;color:#1c1c1c}',
    '.cp-l1-link.active{background:#e8e8e8;color:#1c1c1c}',

    '.cp-pa{border-top:1px solid #ebebeb}',
    '.cp-pa-hdr{display:flex;align-items:center;gap:5px;padding:5px 12px 5px 20px;',
    'cursor:pointer;transition:background .1s;user-select:none}',
    '.cp-pa-hdr:hover{background:#f0f0f0}',
    '.cp-pa-id{font-size:9px;font-weight:700;font-family:Courier New,monospace;letter-spacing:.3px;flex-shrink:0;min-width:32px;color:#555;',
    'background:#e8e8e8;border:1px solid #d0d0d0;padding:1px 4px;border-radius:2px}',
    '.cp-pa-name{flex:1;font-size:10px;font-weight:500;color:#444;line-height:1.3}',
    '.cp-pa-arr{font-size:8px;color:#aaa;transition:transform .15s;flex-shrink:0}',
    '.cp-pa.open > .cp-pa-hdr .cp-pa-arr{transform:rotate(90deg)}',
    '.cp-pa-body{display:none;background:#fafafa}',
    '.cp-pa.open > .cp-pa-body{display:block}',
    '.cp-pa-hdr.active-pa .cp-pa-name{color:#1c1c1c;font-weight:600}',

    '.cp-l2-link{display:flex;align-items:center;gap:4px;padding:5px 12px 5px 30px;',
    'font-size:10px;font-weight:600;color:#555;text-decoration:none;transition:background .1s;border-bottom:1px solid #ebebeb}',
    '.cp-l2-link:hover{background:#f0f0f0;color:#1c1c1c}',
    '.cp-l2-link.active{background:#e8e8e8;color:#1c1c1c}',
    '.cp-l2-link::before{content:"L2";font-size:7px;font-weight:700;font-family:Courier New,monospace;',
    'padding:1px 3px;border:1px solid #c8c8c8;background:#ececec;color:#666;border-radius:2px;flex-shrink:0}',

    '.cp-sp-link{display:block;padding:4px 12px 4px 30px;',
    'font-size:10px;color:#666;text-decoration:none;transition:background .1s;line-height:1.4}',
    '.cp-sp-link:hover{background:#f0f0f0;color:#1c1c1c}',
    '.cp-sp-link.active{background:#e8e8e8;color:#1c1c1c;font-weight:500}',
    '.cp-sp-link::before{content:">";margin-right:5px;font-size:10px;color:#aaa}',

    '.cp-l4-link{display:flex;align-items:center;gap:4px;padding:4px 12px 4px 38px;',
    'font-size:9px;color:#888;text-decoration:none;transition:background .1s}',
    '.cp-l4-link:hover{background:#f0f0f0;color:#1c1c1c}',
    '.cp-l4-link.active{background:#e8e8e8;color:#1c1c1c}',
    '.cp-l4-link::before{content:"L4";font-size:7px;font-weight:700;font-family:Courier New,monospace;',
    'padding:1px 3px;border:1px solid #c8c8c8;background:#ececec;color:#666;border-radius:2px;flex-shrink:0}',

    '.cp-pa-body .cp-sp-last{padding-bottom:5px}',

    '#cp-toggle-float{',
    'display:none;position:fixed;top:10px;left:10px;z-index:10000;',
    'width:32px;height:32px;border-radius:2px;border:1px solid #c8c8c8;',
    'background:#fff;color:#444;font-size:16px;cursor:pointer;',
    'align-items:center;justify-content:center;transition:all .1s;',
    '}',
    '#cp-toggle-float:hover{background:#f0f0f0;color:#1c1c1c;border-color:#aaa}',
    '@media(max-width:900px){',
    '#cp-nav{transform:translateX(-240px)}',
    '#cp-nav.cp-open{transform:translateX(0)}',
    '#cp-toggle-float{display:flex}',
    '}'
  ].join('');

  // ─── Build sidebar HTML ────────────────────────────────────────────────────
  function a(href, cls, text) {
    return '<a href="' + R + href + '" class="' + cls + '">' + text + '</a>';
  }
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  var html = '';
  html += '<div id="cp-nav-header">';
  html += '<div id="cp-nav-title"><div class="t1">Construction</div><div class="t2">Platform · BPMN Docs</div></div>';
  html += '<button id="cp-close-btn" title="Close sidebar">&#10005;</button>';
  html += '</div>';
  html += '<div id="cp-nav-scroll">';

  var isHome = href.endsWith('/') || href.endsWith('index.html');
  var isMap = href.endsWith('domain-interaction-map.html');
  var isL0 = href.endsWith('L0_Construction_Value_Chain.html');

  html += '<a href="' + R + 'index.html" class="cp-top-link' + (isHome ? ' active' : '') + '">Home</a>';
  html += '<a href="' + R + 'L0_Enterprise_Value_Chain/L0_Construction_Value_Chain.html" class="cp-top-link' + (isL0 ? ' active' : '') + '"><span class="cp-badge cp-badge-l0">L0</span>Enterprise Value Chain</a>';
  html += '<div class="cp-sep"></div>';

  DOMAINS.forEach(function (dom) {
    var isDomActive = activeDomain && activeDomain.id === dom.id;
    html += '<div class="cp-domain' + (isDomActive ? ' open' : '') + '" data-d="' + dom.id + '">';
    html += '<div class="cp-domain-hdr">';
    html += '<div class="cp-domain-dot"></div>';
    html += '<span class="cp-domain-lbl">' + dom.id + ' &mdash; ' + esc(dom.label) + '</span>';
    html += '<span class="cp-domain-arr">&#9658;</span>';
    html += '</div>';
    html += '<div class="cp-domain-body">';

    // L1 link
    var l1Active = activeDomain && activeDomain.id === dom.id && !activePa;
    html += '<a href="' + R + dom.l1 + '" class="cp-l1-link' + (l1Active ? ' active' : '') + '">' + dom.id + ' Domain Overview</a>';

    dom.pas.forEach(function (pa) {
      var isPaActive = activePa && activePa.id === pa.id;
      html += '<div class="cp-pa' + (isPaActive ? ' open' : '') + '" data-pa="' + pa.id + '">';
      html += '<div class="cp-pa-hdr' + (isPaActive ? ' active-pa' : '') + '">';
      html += '<span class="cp-pa-id">' + esc(pa.id) + '</span>';
      html += '<span class="cp-pa-name">' + esc(pa.name) + '</span>';
      html += '<span class="cp-pa-arr">&#9658;</span>';
      html += '</div>';
      html += '<div class="cp-pa-body">';

      // L2 link
      var l2Active = activePa && activePa.id === pa.id && !activeSp;
      html += '<a href="' + R + pa.l2 + '" class="cp-l2-link' + (l2Active ? ' active' : '') + '">' + esc(pa.name) + '</a>';

      // L3 SP links
      pa.sps.forEach(function (sp, si) {
        var l3url = pa.l3d + '/' + sp.f + '.html';
        var l4url = pa.l4d + '/L4_T_' + sp.f + '.html';
        var spActive = activeSp && activeSp.f === sp.f;
        var isLast = si === pa.sps.length - 1;
        html += '<a href="' + R + l3url + '" class="cp-sp-link' + (spActive && !isL4 ? ' active' : '') + (isLast ? ' cp-sp-last' : '') + '">' + esc(sp.n) + '</a>';
        if (spActive) {
          html += '<a href="' + R + l4url + '" class="cp-l4-link' + (isL4 ? ' active' : '') + '">Tasks (L4)</a>';
        }
      });
      html += '</div></div>';
    });
    html += '</div></div>';
  });

  html += '</div>';

  // ─── Inject into DOM ──────────────────────────────────────────────────────
  var styleEl = document.createElement('style');
  styleEl.textContent = CSS;
  document.head.appendChild(styleEl);

  var nav = document.createElement('aside');
  nav.id = 'cp-nav';
  nav.innerHTML = html;
  document.body.insertBefore(nav, document.body.firstChild);

  var floatBtn = document.createElement('button');
  floatBtn.id = 'cp-toggle-float';
  floatBtn.setAttribute('title', 'Toggle navigation');
  floatBtn.innerHTML = '&#9776;';
  document.body.appendChild(floatBtn);

  // ─── Event handling ───────────────────────────────────────────────────────
  // Domain expand/collapse
  nav.addEventListener('click', function (e) {
    var domHdr = e.target.closest('.cp-domain-hdr');
    if (domHdr) {
      e.stopPropagation();
      var domain = domHdr.closest('.cp-domain');
      domain.classList.toggle('open');
      return;
    }
    var paHdr = e.target.closest('.cp-pa-hdr');
    if (paHdr) {
      e.stopPropagation();
      var pa = paHdr.closest('.cp-pa');
      pa.classList.toggle('open');
      return;
    }
  });

  // Close button
  document.getElementById('cp-close-btn').addEventListener('click', function () {
    nav.classList.toggle('cp-collapsed');
    nav.classList.toggle('cp-open');
    document.body.style.paddingLeft = nav.classList.contains('cp-collapsed') ? '0' : '';
  });

  // Float toggle (mobile)
  floatBtn.addEventListener('click', function () {
    nav.classList.toggle('cp-open');
  });

  // Close nav on mobile when a link is clicked
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 900) nav.classList.remove('cp-open');
    });
  });

  // Scroll active item into view
  setTimeout(function () {
    var active = nav.querySelector('.active, .active-pa');
    if (active) active.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, 100);

})();
