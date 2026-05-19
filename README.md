# Construction Platform — Process Documentation & Tools

**Swift Designz** · Full BPMN process hierarchy for the South African construction industry, with embedded AI tools.

**Live:** https://construction-platform-docs.vercel.app

---

## What's in here

### Process Documentation (L0 → L4)

281 HTML documents covering the full construction lifecycle across 8 professional domains.

| Level | Description | Count |
|---|---|---|
| L0 | Enterprise Value Chain | 1 |
| L1 | Professional Domains | 8 |
| L2 | Process Areas | 52 |
| L3 | Sub-Processes | 109 |
| L4 | Task Definitions | 109 |

**Domains:**

| Code | Domain |
|---|---|
| D1 | QS & Cost Management |
| D2 | Project Management |
| D3 | Architecture & Design |
| D4 | Engineering |
| D5 | Construction Management |
| D6 | Contract Administration |
| D7 | Compliance & Regulatory |
| D8 | Procurement & Supply Chain |

### AI Tools

| Tool | Process | URL |
|---|---|---|
| Feasibility Cost Estimator | D1.1-SP-001 · ASAQS Class 4/5 · ±15–25% | [/tools/feasibility](https://construction-platform-docs.vercel.app/tools/feasibility) |

The Feasibility tool connects to a live backend API. The API URL is pre-configured — open the tool and run an estimate.

---

## Repo structure

```
/
├── index.html                    # Homepage — process index + AI tools section
├── vercel.json                   # Vercel deployment config
├── nav.js                        # Shared navigation
├── domain-interaction-map.html   # Interactive domain map
├── L0_Enterprise_Value_Chain/
├── L1_Professional_Domains/
├── L2_Process_Areas/             # 8 domain folders
├── L3_Sub_Processes/             # 8 domain folders
├── L4_Tasks/                     # 8 domain folders
└── tools/
    └── feasibility/              # Feasibility Cost Estimator frontend
        └── index.html
```

---

## Deploy

```powershell
# Preview
cd 01_Construction_Platform_Docs
vercel --yes

# Production
vercel --prod --yes
```

Requires [Vercel CLI](https://vercel.com/docs/cli): `npm i -g vercel`

---

## Related repos

| Repo | Description |
|---|---|
| [feasibility-agent](https://github.com/KeenanHusselmannX4O/feasibility-agent) | Python backend powering the Feasibility Cost Estimator |

---

## Monitoring

The Feasibility API is monitored by a Claude Code scheduled routine that runs daily at **06:00 WAT**:

- Hits `/health` + all 4 golden scenarios against the live Railway API
- Emails a PASS/FAIL accuracy report to the team
- Flags any result outside the ASAQS ±25% band with the failing accuracy layer

Manage the routine: [claude.ai/code/routines/trig_01KVdVZyu92oWPLnBTmdVG9J](https://claude.ai/code/routines/trig_01KVdVZyu92oWPLnBTmdVG9J)
