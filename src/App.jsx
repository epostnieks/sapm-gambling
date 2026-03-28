// PSTGambling.jsx
// Postnieks Impossibility Program — SAPM Companion Dashboard
// Bloomberg terminal aesthetic: JetBrains Mono + Newsreader, navy/gold/crimson/green
// Drop into Next.js: pages/dashboards/PSTGambling.jsx  (or app/dashboards/PSTGambling/page.jsx)
// Dependencies: none (pure React + inline styles)

import { useState } from 'react';
import SAPMNav from "./SAPMNav";
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';

// ─── Data ─────────────────────────────────────────────────────────────────
const META = {
  title: "Commercial Gambling",
  subtitle: "System Welfare Cost of Predatory Extraction",
  beta: "7.19",
  ci: "5.64–9.09",
  pi: "$44.2B",
  psa: "-$278.5B/yr",
  mu: "0.16 (16%)",
  kappa: "0.69",
  type: "Institutional PST — No Impossibility Theorem | Predatory Design Choice",
  companion: "",
};

const CHANNELS = [
        { id:1, name:"Direct financial extraction from problem gamblers", beta:"~2.5", value:"dominant", weight:"~40%" },
        { id:2, name:"Mental health and suicidality", beta:"~1.3", value:"significant", weight:"~20%" },
        { id:3, name:"Family and relational destruction", beta:"~1.0", value:"significant", weight:"~16%" },
        { id:4, name:"Criminal justice burden", beta:"~0.7", value:"significant", weight:"~11%" },
        { id:5, name:"Regressive wealth transfer", beta:"~0.5", value:"significant", weight:"~8%" },
        { id:6, name:"Governance failure and regulatory capture", beta:"~0.3", value:"significant", weight:"~5%" },
];

const CROSS_DOMAIN = [
        { domain:"ERCOT (Texas Grid)", beta:"2,053", type:"Institutional", pi:"$2.3B" },
        { domain:"PFAS (Forever Chemicals)", beta:"35.2", type:"Impossibility", pi:"$4.1B" },
        { domain:"Monoculture Agriculture", beta:"8.6", type:"Impossibility", pi:"$52B" },
        { domain:"Opioid Ecosystem", beta:"10.2", type:"Institutional", pi:"~$35B" },
        { domain:"Commercial Real Estate", beta:"8.4", type:"Institutional", pi:"$12-15B" },
        { domain:"Persistent Org. Pollutants", beta:"8.4", type:"Institutional", pi:"$44.2B" },
        { domain:"Gene Drives", beta:"12.4", type:"Impossibility", pi:"$44.2B" },
        { domain:"Big Tech / Platform", beta:"7.4", type:"Institutional", pi:"$158B" },
        { domain:"Frontier AI", beta:"7.4", type:"Impossibility", pi:"" },
        { domain:"Palm Oil", beta:"6.2", type:"Institutional", pi:"$67B" },
        { domain:"Oil & Gas Extraction", beta:"6.2", type:"Institutional", pi:"$3.5T" },
        { domain:"Gambling (Commercial)", beta:"6.3", type:"Institutional", pi:"$44.2B" },
        { domain:"PBM Rebate System", beta:"6.3", type:"Institutional", pi:"$27.6B" },
        { domain:"Coal Combustion", beta:"6.1", type:"Institutional", pi:"" },
        { domain:"Aviation Emissions", beta:"4.6", type:"Institutional", pi:"$1.007T" },
        { domain:"Algorithmic Pricing", beta:"4.2", type:"Institutional", pi:"$39.5B" },
        { domain:"Gig Economy Platforms", beta:"4.2", type:"Institutional", pi:"" },
        { domain:"Global Fisheries", beta:"4.72", type:"Institutional", pi:"" },
        { domain:"UPF / Ultra-Processed Food", beta:"6.2", type:"Institutional", pi:"" },
        { domain:"Deep-Sea Mining", beta:"4.7", type:"Impossibility", pi:"" },
        { domain:"Arms Exports", beta:"2.4", type:"Institutional", pi:"$293B" },
        { domain:"Antimicrobial Resistance", beta:"2.1", type:"Impossibility", pi:"" },
        { domain:"Nuclear Energy", beta:"0.7", type:"Impossibility", pi:"" },
        { domain:"Orbital Debris (LEO)", beta:"2,053", type:"Impossibility", pi:"$293B" },
        { domain:"WMD Capability Diffusion", beta:"—", type:"Impossibility", pi:"" },
        { domain:"Bitcoin (PoW)", beta:"5.0", type:"Impossibility", pi:"" },
];

const HIGHLIGHTS = [
        "β_W = 6.3. Π = $44.2B/yr predatory extraction premium above cooperative baseline. W = $277B/yr. System-adjusted payoff deeply negative.",
        "Π_C = $27.8B: what industry would earn as pure casual recreation without addictive mechanics or problem-gambler dependence.",
        "Norway 2007 slot ban: documented deep structural reduction in population-level gambling harm — clearest case of product prohibition achieving welfare improvement.",
        "Problem gamblers (3–5% of participants) generate 40–60% of industry revenue. β_W not contingent on how one defines \"problem\" gambling.",
        "μ* = 0.16: industry would need to convert 16% of welfare cost to welfare benefit. Current conversion: ~2.4%. System destroys $5.27 per $1 in net tax revenue.",
        "κ = $233B Kaldor-Hicks gap: annual surplus destruction no feasible transfer scheme could offset. Not a distributional problem — a production problem.",
];

const PSF_PARAMS = {pi_c:9.5,pi_p:44.2,w_c:278.5,kappa:0.91};
const PSF_DATA = [{pi:0.95,w:263.11},{pi:2.83,w:269.14},{pi:4.72,w:273.69},{pi:6.6,w:276.73},{pi:8.48,w:278.28},{pi:10.37,w:278.34},{pi:12.25,w:276.91},{pi:14.14,w:273.97},{pi:16.02,w:269.55},{pi:17.9,w:263.65},{pi:19.79,w:256.21},{pi:21.67,w:247.33},{pi:23.55,w:236.95},{pi:25.44,w:225.02},{pi:27.32,w:211.66},{pi:29.21,w:196.73},{pi:31.09,w:180.39},{pi:32.97,w:162.56},{pi:34.86,w:143.14},{pi:36.74,w:122.32},{pi:38.62,w:100.02},{pi:40.51,w:76.1},{pi:42.39,w:50.81},{pi:44.27,w:24.04},{pi:46.16,w:-4.37},{pi:48.04,w:-34.13},{pi:49.93,w:-65.54},{pi:51.81,w:-98.29},{pi:53.69,w:-132.51},{pi:55.58,w:-168.42},{pi:57.46,w:-205.63}];

const MC_HIST = [{bin:"5.14",lo:5.1392,hi:5.2361,count:34},{bin:"5.24",lo:5.2361,hi:5.3330,count:51},{bin:"5.33",lo:5.3330,hi:5.4299,count:77},{bin:"5.43",lo:5.4299,hi:5.5268,count:124},{bin:"5.53",lo:5.5268,hi:5.6237,count:133},{bin:"5.62",lo:5.6237,hi:5.7206,count:151},{bin:"5.72",lo:5.7206,hi:5.8175,count:225},{bin:"5.82",lo:5.8175,hi:5.9144,count:256},{bin:"5.91",lo:5.9144,hi:6.0113,count:269},{bin:"6.01",lo:6.0113,hi:6.1082,count:295},{bin:"6.11",lo:6.1082,hi:6.2051,count:291},{bin:"6.21",lo:6.2051,hi:6.3020,count:330},{bin:"6.30",lo:6.3020,hi:6.3989,count:366},{bin:"6.40",lo:6.3989,hi:6.4958,count:338},{bin:"6.50",lo:6.4958,hi:6.5927,count:325},{bin:"6.59",lo:6.5927,hi:6.6896,count:340},{bin:"6.69",lo:6.6896,hi:6.7865,count:384},{bin:"6.79",lo:6.7865,hi:6.8834,count:343},{bin:"6.88",lo:6.8834,hi:6.9803,count:319},{bin:"6.98",lo:6.9803,hi:7.0772,count:306},{bin:"7.08",lo:7.0772,hi:7.1741,count:283},{bin:"7.17",lo:7.1741,hi:7.2710,count:321},{bin:"7.27",lo:7.2710,hi:7.3679,count:289},{bin:"7.37",lo:7.3679,hi:7.4648,count:279},{bin:"7.46",lo:7.4648,hi:7.5617,count:279},{bin:"7.56",lo:7.5617,hi:7.6586,count:244},{bin:"7.66",lo:7.6586,hi:7.7555,count:266},{bin:"7.76",lo:7.7555,hi:7.8524,count:281},{bin:"7.85",lo:7.8524,hi:7.9493,count:267},{bin:"7.95",lo:7.9493,hi:8.0462,count:215},{bin:"8.05",lo:8.0462,hi:8.1431,count:227},{bin:"8.14",lo:8.1431,hi:8.2400,count:197},{bin:"8.24",lo:8.2400,hi:8.3369,count:198},{bin:"8.34",lo:8.3369,hi:8.4338,count:170},{bin:"8.43",lo:8.4338,hi:8.5306,count:197},{bin:"8.53",lo:8.5306,hi:8.6275,count:151},{bin:"8.63",lo:8.6275,hi:8.7244,count:164},{bin:"8.72",lo:8.7244,hi:8.8213,count:137},{bin:"8.82",lo:8.8213,hi:8.9182,count:122},{bin:"8.92",lo:8.9182,hi:9.0151,count:113},{bin:"9.02",lo:9.0151,hi:9.1120,count:119},{bin:"9.11",lo:9.1120,hi:9.2089,count:108},{bin:"9.21",lo:9.2089,hi:9.3058,count:72},{bin:"9.31",lo:9.3058,hi:9.4027,count:60},{bin:"9.40",lo:9.4027,hi:9.4996,count:55},{bin:"9.50",lo:9.4996,hi:9.5965,count:36},{bin:"9.60",lo:9.5965,hi:9.6934,count:34},{bin:"9.69",lo:9.6934,hi:9.7903,count:25},{bin:"9.79",lo:9.7903,hi:9.8872,count:22},{bin:"9.89",lo:9.8872,hi:9.9841,count:12}];
const MC_STATS = {mean:7.1944,median:7.0728,ci_lo:5.6439,ci_hi:9.0875,pct_hw:100.0,pct_above_3:100.0,pct_above_5:99.7,min:4.5592,max:11.0113,n_draws:10000,seed:42};
const MC_CHANNELS = [{name:"Problem gambling health",mean:121.04,p5:95.97,p50:120.20,p95:147.24,share:0.3801},{name:"Bankruptcy & financial",mean:64.04,p5:47.44,p50:63.48,p95:81.74,share:0.2011},{name:"Family & domestic harm",mean:65.88,p5:50.37,p50:65.11,p95:84.31,share:0.2069},{name:"Crime & fraud",mean:31.97,p5:22.28,p50:31.53,p95:42.62,share:0.1004},{name:"Youth initiation",mean:24.01,p5:15.70,p50:23.56,p95:33.39,share:0.0754},{name:"Governance capture",mean:11.49,p5:5.64,p50:11.50,p95:17.31,share:0.0361}];
const MC_WELFARE = {mean:318.42,ci_lo:281.66,ci_hi:356.76};

const THRESHOLDS = [{domain:"Online gambling penetration >30% of adults",year:2025,confidence:"High",status:"42 U.S. states with legal sports betting; online penetration ~35%",crossed:true},{domain:"Problem gambling prevalence >3% (U.S.)",year:2024,confidence:"High",status:"NCPG estimates 2-3% clinical, 4-6% subclinical; rising with mobile betting",crossed:true},{domain:"Federal online gambling regulation",year:2028,confidence:"Low",status:"Wire Act interpretation in flux; no federal framework",crossed:false},{domain:"Sports betting advertising saturation threshold",year:2025,confidence:"High",status:"NFL broadcast gambling ad saturation already drawing FTC attention",crossed:true}];

const AXIOMS = {type:"institutional",items:[{id:"I1",name:"Addiction-by-design extraction",description:"Variable ratio reinforcement schedules, near-miss engineering, and loss-chasing UX design exploit neurobiological vulnerabilities to generate revenue concentrated among the ~15% of users with gambling disorder."},{id:"I2",name:"Regulatory capture through tax revenue dependency",description:"States that legalize gambling become financially dependent on gambling tax revenue, creating structural incentives to avoid regulation that would reduce volume."},{id:"I3",name:"Harm externalization",description:"Gambling costs (bankruptcy, family dissolution, mental health, crime) fall on healthcare, social services, and courts while profits accrue to operators — a textbook externality with no Pigouvian correction in any U.S. jurisdiction."}]};

const METHODS_DATA = {
  welfare_function: "W measured as problem gambling health costs (VSL-weighted suicide risk, mental health treatment), financial destruction (bankruptcy rates above baseline), family harm (divorce, child welfare costs), and criminal justice costs.",
  cooperative_baseline: "Gambling limited to low-stakes recreational venues with no mobile access, no algorithmic personalization, and mandatory harm-minimization tools, generating $9.5B in legitimate entertainment value.",
  falsification: ["F1: Demonstrate that expanded gambling access in a U.S. state does not increase problem gambling prevalence in a well-powered difference-in-differences study.","F2: Show that gambling revenue multiplier effects on state economies exceed the fiscal cost of gambling-related social services, healthcare, and criminal justice.","F3: Demonstrate that responsible gambling tools (deposit limits, self-exclusion) reduce problem gambling harm at scale without reducing total gambling revenue."],
  key_sources: ["National Council on Problem Gambling, Annual Report (2024)","American Gaming Association, State of the States (2024)","Calado & Griffiths, Problem gambling worldwide (2016) Journal of Behavioral Addictions","SAMHSA, National Survey on Drug Use and Health (2023)"]
};

// ─── Color palette ───────────────────────────────────────────────────────────
const C = {
  bg:      '#0D0D0D',
  panel:   '#1A1A1A',
  border:  'rgba(255,255,255,0.08)',
  navy:    '#1A1A1A',
  gold:    '#F59E0B',
  crimson: '#EF4444',
  green:   '#22C55E',
  text:    '#F5F0E8',
  muted:   'rgba(255,255,255,0.4)',
  thead:   '#141414',
  mono:    "'JetBrains Mono', 'Fira Code', monospace",
  serif:   "'Newsreader', 'Georgia', serif",
};

// ─── Sub-components ──────────────────────────────────────────────────────────
function Metric({ label, value, sub, color }) {
  return (
    <div style={{flex:1,minWidth:140,background:C.panel,border:`1px solid ${C.border}`,borderRadius:3,padding:'12px 16px'}}>
      <div style={{fontFamily:C.mono,fontSize:11,color:C.muted,letterSpacing:1,marginBottom:4}}>{label}</div>
      <div style={{fontFamily:C.mono,fontSize:28,fontWeight:700,color:color||C.gold,lineHeight:1}}>{value}</div>
      {sub && <div style={{fontFamily:C.mono,fontSize:11,color:C.muted,marginTop:4}}>{sub}</div>}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div style={{fontFamily:C.mono,fontSize:12,color:C.muted,letterSpacing:2,borderBottom:`1px solid ${C.border}`,paddingBottom:6,marginBottom:12,marginTop:20,textTransform:'uppercase'}}>
      {children}
    </div>
  );
}

function BetaBar({ beta, max }) {
  const pct = Math.min(100, (parseFloat(beta)||0) / (max||15) * 100);
  const color = pct > 80 ? C.crimson : pct > 50 ? '#D97706' : C.gold;
  return (
    <div style={{background:'rgba(255,255,255,0.04)',borderRadius:2,height:8,flex:1,margin:'0 8px'}}>
      <div style={{width:`${pct}%`,height:'100%',background:color,borderRadius:2,transition:'width 0.4s'}} />
    </div>
  );
}

function Tab({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      fontFamily:C.mono, fontSize:12, letterSpacing:1,
      padding:'6px 14px', border:'none', cursor:'pointer',
      background: active ? C.gold : 'transparent',
      color: active ? '#000' : C.muted,
      borderBottom: active ? `2px solid ${C.gold}` : '2px solid transparent',
      textTransform:'uppercase',
    }}>{label}</button>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function PSTGamblingDashboard() {
  const [tab, setTab] = useState('overview');
  const maxBeta = Math.max(...CROSS_DOMAIN.map(d => parseFloat(d.beta)||0), parseFloat(META.beta)||0, 10);

  return (
    <div style={{background:C.bg,minHeight:'100vh',padding:'0',fontFamily:C.mono,color:C.text}}>

      {/* Header */}
      <div style={{background:C.panel,borderBottom:`2px solid ${C.gold}`,padding:'14px 24px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div>
          <div style={{fontFamily:C.mono,fontSize:11,color:C.muted,letterSpacing:2,marginBottom:4}}>POSTNIEKS IMPOSSIBILITY PROGRAM · SAPM</div>
          <div style={{fontFamily:C.serif,fontSize:24,fontWeight:700,color:C.text}}>{META.title}</div>
          {META.subtitle && <div style={{fontFamily:C.serif,fontSize:15,color:C.muted,marginTop:2,fontStyle:'italic'}}>{META.subtitle}</div>}
        </div>
        <div style={{textAlign:'right'}}>
          <div style={{fontFamily:C.mono,fontSize:11,color:C.muted,letterSpacing:1}}>SYSTEM BETA</div>
          <div style={{fontFamily:C.mono,fontSize:36,fontWeight:700,color:C.gold,lineHeight:1}}>β_W = {META.beta}</div>
          {META.ci && <div style={{fontFamily:C.mono,fontSize:11,color:C.muted}}>90% CI [{META.ci}]</div>}
        </div>
      </div>

      {/* PST badge + type */}
      <div style={{background:'rgba(245,158,11,0.06)',padding:'8px 24px',display:'flex',gap:10,alignItems:'center',borderBottom:`1px solid ${C.border}`}}>
        <span style={{background:'rgba(34,197,94,0.15)',color:'#22C55E',fontSize:12,padding:'4px 10px',borderRadius:2,fontFamily:'JetBrains Mono,monospace',letterSpacing:0.5}}>INSTITUTIONAL PST</span>
        <span style={{fontFamily:C.mono,fontSize:12,color:C.muted}}>{META.type}</span>
        {META.companion && <a href={META.companion} target="_blank" rel="noreferrer" style={{marginLeft:'auto',fontFamily:C.mono,fontSize:11,color:C.gold,textDecoration:'none'}}>↗ Companion Dashboard</a>}
      </div>

      {/* Tab bar */}
      <div style={{background:C.panel,borderBottom:`1px solid ${C.border}`,padding:'0 24px',display:'flex',gap:4}}>
        {['overview','channels','psf','monte-carlo','thresholds','cross-domain','methods','highlights'].map(t => (
          <Tab key={t} label={t} active={tab===t} onClick={()=>setTab(t)} />
        ))}
      </div>

      <div style={{padding:'20px 24px',maxWidth:1100}}>

        {/* OVERVIEW TAB */}
        {tab === 'overview' && (
          <div>
            {/* Key metrics row */}
            <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:16}}>
              <Metric label="β_W  (System Beta)" value={META.beta} sub={META.ci ? `90% CI [${META.ci}]` : 'Headline estimate'} color={C.gold} />
              {META.pi && <Metric label="Private Payoff Π" value={META.pi+'/yr'} sub="Private sector capture" color={C.text} />}
              {META.psa && <Metric label="System-Adj. Payoff Π_SA" value={META.psa} sub="β_W · Π − W" color={C.crimson} />}
              {META.mu && <Metric label="Break-Even μ*" value={META.mu} sub="Welfare neutrality threshold" color={'#22C55E'} />}
              {META.kappa && <Metric label="PSF Curvature κ" value={META.kappa} sub="Pareto shortfall index" color={C.muted} />}
            </div>

            

            {/* Channel waterfall */}
            {CHANNELS.length > 0 && (
              <div>
                <SectionTitle>Channel Decomposition — Welfare Cost Waterfall</SectionTitle>
                {CHANNELS.map((ch,i) => (
                  <div key={i} style={{display:'flex',alignItems:'center',marginBottom:8,gap:8}}>
                    <div style={{fontFamily:C.mono,fontSize:12,color:C.muted,width:22,textAlign:'right'}}>{ch.id}</div>
                    <div style={{fontFamily:C.serif,fontSize:15,color:C.text,width:300,flexShrink:0}}>{ch.name}</div>
                    <BetaBar beta={ch.beta} max={parseFloat(META.beta)||15} />
                    <div style={{fontFamily:C.mono,fontSize:13,color:C.gold,width:55,textAlign:'right'}}>{ch.beta}</div>
                    <div style={{fontFamily:C.mono,fontSize:13,color:C.text,width:110,textAlign:'right'}}>{ch.value}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CHANNELS TAB */}
        {tab === 'channels' && (
          <div>
            <SectionTitle>Channel-by-Channel Breakdown</SectionTitle>
            <table style={{width:'100%',borderCollapse:'collapse',fontFamily:C.mono,fontSize:13}}>
              <thead>
                <tr style={{background:C.thead}}>
                  <th style={{padding:'8px 12px',textAlign:'left',color:C.gold,borderBottom:`1px solid ${C.border}`}}>#</th>
                  <th style={{padding:'8px 12px',textAlign:'left',color:C.gold,borderBottom:`1px solid ${C.border}`}}>Channel</th>
                  <th style={{padding:'8px 12px',textAlign:'right',color:C.gold,borderBottom:`1px solid ${C.border}`}}>β_W(i)</th>
                  <th style={{padding:'8px 12px',textAlign:'right',color:C.gold,borderBottom:`1px solid ${C.border}`}}>δ_i ($/yr)</th>
                  <th style={{padding:'8px 12px',textAlign:'right',color:C.gold,borderBottom:`1px solid ${C.border}`}}>Weight</th>
                </tr>
              </thead>
              <tbody>
                {CHANNELS.map((ch,i) => (
                  <tr key={i} style={{background: i%2===0 ? C.panel : C.bg}}>
                    <td style={{padding:'8px 12px',color:C.muted,borderBottom:`1px solid ${C.border}`}}>{ch.id}</td>
                    <td style={{padding:'8px 12px',color:C.text,fontFamily:C.serif,fontSize:14,borderBottom:`1px solid ${C.border}`}}>{ch.name}</td>
                    <td style={{padding:'8px 12px',color:C.gold,textAlign:'right',borderBottom:`1px solid ${C.border}`}}>{ch.beta}</td>
                    <td style={{padding:'8px 12px',color:C.text,textAlign:'right',borderBottom:`1px solid ${C.border}`}}>{ch.value}</td>
                    <td style={{padding:'8px 12px',color:C.muted,textAlign:'right',borderBottom:`1px solid ${C.border}`}}>{ch.weight}</td>
                  </tr>
                ))}
                <tr style={{background:C.thead}}>
                  <td colSpan={2} style={{padding:'10px 12px',color:C.gold,fontWeight:700,fontSize:14}}>AGGREGATE β_W</td>
                  <td colSpan={3} style={{padding:'10px 12px',color:C.gold,fontWeight:700,fontSize:16,textAlign:'right'}}>{META.beta}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* CROSS-DOMAIN TAB */}
        {tab === 'cross-domain' && (
          <div>
            <SectionTitle>Cross-Domain SAPM Registry</SectionTitle>
            <div style={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:4,padding:16,marginBottom:16}}>
              <ResponsiveContainer width="100%" height={Math.min(500, CROSS_DOMAIN.filter(d => parseFloat(d.beta) > 0 && parseFloat(d.beta) <= 50).length * 28 + 60)}>
                <BarChart data={[...CROSS_DOMAIN].filter(d => parseFloat(d.beta) > 0 && parseFloat(d.beta) <= 50).sort((a,b) => parseFloat(a.beta) - parseFloat(b.beta)).map(d => ({...d, betaNum: parseFloat(d.beta)}))} layout="vertical" margin={{top:10,right:30,left:200,bottom:10}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis type="number" stroke={C.muted} tick={{fontFamily:C.mono,fontSize:11}} />
                  <YAxis type="category" dataKey="domain" stroke={C.muted} tick={{fontFamily:C.mono,fontSize:11}} width={190} />
                  <Tooltip contentStyle={{background:C.panel,border:`1px solid ${C.border}`,fontFamily:C.mono,fontSize:12,color:C.text}} />
                  <ReferenceLine x={1} stroke={C.crimson} strokeDasharray="3 3" label={{value:"β=1",fill:C.crimson,fontFamily:C.mono,fontSize:11}} />
                  <Bar dataKey="betaNum" fill={C.gold} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <table style={{width:'100%',borderCollapse:'collapse',fontFamily:C.mono,fontSize:13}}>
              <thead>
                <tr style={{background:C.thead}}>
                  <th style={{padding:'8px 12px',textAlign:'left',color:C.gold,borderBottom:`1px solid ${C.border}`}}>Domain</th>
                  <th style={{padding:'8px 12px',textAlign:'right',color:C.gold,borderBottom:`1px solid ${C.border}`}}>β_W</th>
                  <th style={{padding:'8px 12px',textAlign:'left',color:C.gold,borderBottom:`1px solid ${C.border}`}}>PST Type</th>
                  <th style={{padding:'8px 12px',textAlign:'right',color:C.gold,borderBottom:`1px solid ${C.border}`}}>Π ($/yr)</th>
                </tr>
              </thead>
              <tbody>
                {[...CROSS_DOMAIN].sort((a,b) => (parseFloat(b.beta)||0) - (parseFloat(a.beta)||0)).map((d,i) => (
                  <tr key={i} style={{background: d.domain===META.title ? 'rgba(34,197,94,0.08)' : i%2===0 ? C.panel : C.bg}}>
                    <td style={{padding:'8px 12px',color: d.domain===META.title ? '#22C55E' : C.text,fontFamily:C.serif,fontSize:14,borderBottom:`1px solid ${C.border}`}}>
                      {d.domain===META.title ? '▶ ' : ''}{d.domain}
                    </td>
                    <td style={{padding:'8px 12px',color: parseFloat(d.beta)>10 ? C.crimson : C.gold,textAlign:'right',fontWeight:700,borderBottom:`1px solid ${C.border}`}}>{d.beta}</td>
                    <td style={{padding:'8px 12px',color:C.muted,borderBottom:`1px solid ${C.border}`}}>{d.type}</td>
                    <td style={{padding:'8px 12px',color:C.text,textAlign:'right',borderBottom:`1px solid ${C.border}`}}>{d.pi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}


        {/* PSF TAB */}
        {tab === 'psf' && (
          <div>
            <SectionTitle>Private-Systemic Frontier</SectionTitle>
            <div style={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:4,padding:16,marginBottom:16}}>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={PSF_DATA} margin={{top:10,right:30,left:20,bottom:10}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="pi" stroke={C.muted} tick={{fontFamily:C.mono,fontSize:11}} label={{value:"Π (Private Payoff)",position:"bottom",fill:C.muted,fontFamily:C.mono,fontSize:11}} />
                  <YAxis stroke={C.muted} tick={{fontFamily:C.mono,fontSize:11}} label={{value:"W (System Welfare)",angle:-90,position:"insideLeft",fill:C.muted,fontFamily:C.mono,fontSize:11}} />
                  <Tooltip contentStyle={{background:C.panel,border:`1px solid ${C.border}`,fontFamily:C.mono,fontSize:12,color:C.text}} />
                  <Area type="monotone" dataKey="w" stroke={C.gold} fill="rgba(245,158,11,0.15)" strokeWidth={2} />
                  <ReferenceLine x={PSF_PARAMS.pi_c} stroke={C.green} strokeDasharray="5 5" label={{value:"Π_C",fill:C.green,fontFamily:C.mono,fontSize:11}} />
                  <ReferenceLine x={PSF_PARAMS.pi_p} stroke={C.crimson} strokeDasharray="5 5" label={{value:"Current",fill:C.crimson,fontFamily:C.mono,fontSize:11}} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
              <Metric label="COOPERATIVE PAYOFF Π_C" value={'$'+PSF_PARAMS.pi_c+'B'} sub="Welfare-maximizing extraction" color={C.green} />
              <Metric label="CURRENT PAYOFF Π_P" value={'$'+PSF_PARAMS.pi_p+'B'} sub="Actual private extraction" color={C.crimson} />
              <Metric label="OVER-EXTRACTION" value={'$'+(PSF_PARAMS.pi_p - PSF_PARAMS.pi_c)+'B'} sub="Gap driving welfare loss" color={C.gold} />
            </div>
            <div style={{marginTop:16,padding:16,background:C.panel,border:`1px solid ${C.border}`,borderRadius:4}}>
              <div style={{fontFamily:C.mono,fontSize:12,color:C.gold,marginBottom:8}}>SAPM ↔ CAPM CORRESPONDENCE</div>
              <table style={{width:'100%',borderCollapse:'collapse',fontFamily:C.mono,fontSize:13}}>
                <thead><tr style={{borderBottom:`1px solid ${C.border}`}}>
                  <th style={{padding:'8px 12px',textAlign:'left',color:C.gold}}>SAPM CONSTRUCT</th>
                  <th style={{padding:'8px 12px',textAlign:'left',color:C.gold}}>CAPM ANALOGUE</th>
                </tr></thead>
                <tbody>
                  {[['β_W (System Beta)','β (Market Beta)'],['PSF (Private-Systemic Frontier)','SML (Security Market Line)'],['μ* (Shadow Price)','r_f (Risk-Free Rate)'],['Πˢᵃ (System-Adjusted Payoff)','α (Jensen\'s Alpha)'],['W (System Welfare)','No equivalent — structurally invisible'],['𝒮_W (Welfare Efficiency)','Sharpe Ratio']].map(([s,c],i) => (
                    <tr key={i} style={{borderBottom:`1px solid rgba(255,255,255,0.04)`}}>
                      <td style={{padding:'8px 12px',color:C.text}}>{s}</td>
                      <td style={{padding:'8px 12px',color:C.muted,fontFamily:C.serif}}>{c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* MONTE CARLO TAB */}
        {tab === 'monte-carlo' && (
          <div>
            <SectionTitle>Monte Carlo Simulation — {MC_STATS.n_draws.toLocaleString()} Draws (seed={MC_STATS.seed})</SectionTitle>
            <div style={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:4,padding:16,marginBottom:16}}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={MC_HIST} margin={{top:10,right:30,left:20,bottom:30}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="bin" stroke={C.muted} tick={{fontFamily:C.mono,fontSize:9}} angle={-45} textAnchor="end" interval={4} />
                  <YAxis stroke={C.muted} tick={{fontFamily:C.mono,fontSize:11}} />
                  <Tooltip contentStyle={{background:C.panel,border:`1px solid ${C.border}`,fontFamily:C.mono,fontSize:12,color:C.text}} formatter={(v)=>[v,'Draws']} />
                  <Bar dataKey="count" fill={C.gold} />
                  <ReferenceLine x={MC_STATS.mean.toFixed(2)} stroke={C.crimson} strokeWidth={2} strokeDasharray="5 5" label={{value:'μ='+MC_STATS.mean.toFixed(2),fill:C.crimson,fontFamily:C.mono,fontSize:11,position:'top'}} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:16}}>
              <Metric label="MEAN β_W" value={MC_STATS.mean.toFixed(2)} sub={'Median: '+MC_STATS.median.toFixed(2)} color={C.gold} />
              <Metric label="90% CI" value={'['+MC_STATS.ci_lo.toFixed(2)+', '+MC_STATS.ci_hi.toFixed(2)+']'} sub={'Range: '+MC_STATS.min.toFixed(2)+'–'+MC_STATS.max.toFixed(2)} color={C.muted} />
              <Metric label="% HOLLOW WIN" value={MC_STATS.pct_hw.toFixed(1)+'%'} sub={'β_W > 1 in all draws'} color={MC_STATS.pct_hw > 95 ? C.crimson : C.gold} />
              <Metric label="% β_W > 3" value={MC_STATS.pct_above_3.toFixed(1)+'%'} color={MC_STATS.pct_above_3 > 90 ? C.crimson : C.gold} />
              <Metric label="% β_W > 5" value={MC_STATS.pct_above_5.toFixed(1)+'%'} color={MC_STATS.pct_above_5 > 50 ? '#D97706' : C.gold} />
            </div>
            <SectionTitle>Channel Welfare Contributions</SectionTitle>
            <table style={{width:'100%',borderCollapse:'collapse',fontFamily:C.mono,fontSize:13}}>
              <thead><tr style={{borderBottom:`1px solid ${C.border}`}}>
                <th style={{padding:'8px 12px',textAlign:'left',color:C.gold}}>CHANNEL</th>
                <th style={{padding:'8px 12px',textAlign:'right',color:C.gold}}>MEAN $B</th>
                <th style={{padding:'8px 12px',textAlign:'right',color:C.gold}}>P5</th>
                <th style={{padding:'8px 12px',textAlign:'right',color:C.gold}}>P50</th>
                <th style={{padding:'8px 12px',textAlign:'right',color:C.gold}}>P95</th>
                <th style={{padding:'8px 12px',textAlign:'right',color:C.gold}}>SHARE</th>
              </tr></thead>
              <tbody>
                {MC_CHANNELS.map((ch,i) => (
                  <tr key={i} style={{borderBottom:`1px solid rgba(255,255,255,0.04)`,background:i%2===0?C.panel:C.bg}}>
                    <td style={{padding:'8px 12px',color:C.text,fontFamily:C.serif,fontSize:14}}>{ch.name}</td>
                    <td style={{padding:'8px 12px',color:C.gold,textAlign:'right',fontWeight:600}}>{ch.mean.toFixed(1)}</td>
                    <td style={{padding:'8px 12px',color:C.muted,textAlign:'right'}}>{ch.p5.toFixed(1)}</td>
                    <td style={{padding:'8px 12px',color:C.muted,textAlign:'right'}}>{ch.p50.toFixed(1)}</td>
                    <td style={{padding:'8px 12px',color:C.muted,textAlign:'right'}}>{ch.p95.toFixed(1)}</td>
                    <td style={{padding:'8px 12px',color:C.muted,textAlign:'right'}}>{(ch.share*100).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{marginTop:16,padding:12,background:'rgba(245,158,11,0.06)',border:`1px solid rgba(245,158,11,0.15)`,borderRadius:4}}>
              <div style={{fontFamily:C.mono,fontSize:11,color:C.muted}}>Total welfare cost: <span style={{color:C.gold}}>${MC_WELFARE.mean.toFixed(1)}B</span> (90% CI: ${MC_WELFARE.ci_lo.toFixed(1)}B – ${MC_WELFARE.ci_hi.toFixed(1)}B) · Source: sapm_monte_carlo.py (seed=42)</div>
            </div>
          </div>
        )}

        {/* THRESHOLDS TAB */}
        {tab === 'thresholds' && (
          <div>
            <SectionTitle>Critical Thresholds & Predicted Crossover</SectionTitle>
            <div style={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:4,padding:16,marginBottom:16}}>
              <ResponsiveContainer width="100%" height={Math.max(200, THRESHOLDS.length * 44)}>
                <BarChart data={THRESHOLDS.map(t=>({...t,yearsFromNow:t.year-2026}))} layout="vertical" margin={{top:10,right:30,left:180,bottom:10}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis type="number" stroke={C.muted} tick={{fontFamily:C.mono,fontSize:11}} label={{value:"Years from 2026",position:"bottom",fill:C.muted,fontFamily:C.mono,fontSize:11}} />
                  <YAxis type="category" dataKey="domain" stroke={C.muted} tick={{fontFamily:C.mono,fontSize:11}} width={170} />
                  <Tooltip contentStyle={{background:C.panel,border:`1px solid ${C.border}`,fontFamily:C.mono,fontSize:12,color:C.text}} />
                  <ReferenceLine x={0} stroke={C.crimson} strokeDasharray="3 3" label={{value:"NOW",fill:C.crimson,fontFamily:C.mono,fontSize:11}} />
                  <Bar dataKey="yearsFromNow" fill={C.gold} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{display:'grid',gap:12}}>
              {THRESHOLDS.map((t,i) => (
                <div key={i} style={{display:'flex',alignItems:'center',gap:16,padding:'12px 16px',background:C.panel,border:`1px solid ${C.border}`,borderRadius:4,borderLeft:`3px solid ${t.crossed ? C.crimson : C.gold}`}}>
                  <div style={{fontFamily:C.mono,fontSize:14,color:t.crossed ? C.crimson : C.gold,fontWeight:700,minWidth:50}}>{t.year}</div>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:C.mono,fontSize:13,color:C.text}}>{t.domain}</div>
                    <div style={{fontFamily:C.serif,fontSize:13,color:C.muted,marginTop:2}}>{t.status}</div>
                  </div>
                  <div style={{fontFamily:C.mono,fontSize:11,color:C.muted,padding:'2px 8px',border:`1px solid ${C.border}`,borderRadius:2}}>{t.confidence}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* METHODS TAB */}
        {tab === 'methods' && (
          <div>
            <SectionTitle>{AXIOMS.type === 'impossibility' ? 'Impossibility Axioms' : 'Institutional Failure Mechanisms'}</SectionTitle>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:12,marginBottom:20}}>
              {AXIOMS.items.map((a,i) => (
                <div key={i} style={{padding:16,background:C.panel,border:`1px solid ${AXIOMS.type === 'impossibility' ? 'rgba(239,68,68,0.2)' : C.border}`,borderRadius:4}}>
                  <div style={{fontFamily:C.mono,fontSize:12,color:AXIOMS.type === 'impossibility' ? C.crimson : C.gold,letterSpacing:1,marginBottom:6}}>{a.id}</div>
                  <div style={{fontFamily:C.serif,fontSize:15,color:C.text,fontWeight:600,marginBottom:6}}>{a.name}</div>
                  <div style={{fontFamily:C.serif,fontSize:14,color:C.muted,lineHeight:1.6}}>{a.description}</div>
                </div>
              ))}
            </div>

            <SectionTitle>System Welfare Function</SectionTitle>
            <div style={{padding:16,background:C.panel,border:`1px solid ${C.border}`,borderRadius:4,marginBottom:20}}>
              <div style={{fontFamily:C.serif,fontSize:15,color:C.text,lineHeight:1.7}}>{METHODS_DATA.welfare_function}</div>
            </div>

            <SectionTitle>Cooperative Baseline</SectionTitle>
            <div style={{padding:16,background:C.panel,border:`1px solid ${C.border}`,borderRadius:4,marginBottom:20}}>
              <div style={{fontFamily:C.serif,fontSize:15,color:C.text,lineHeight:1.7}}>{METHODS_DATA.cooperative_baseline}</div>
            </div>

            <SectionTitle>Falsification Criteria</SectionTitle>
            <div style={{display:'grid',gap:8,marginBottom:20}}>
              {METHODS_DATA.falsification.map((f,i) => (
                <div key={i} style={{padding:'10px 16px',background:C.panel,border:`1px solid ${C.border}`,borderRadius:4,fontFamily:C.serif,fontSize:14,color:C.text,lineHeight:1.6}}>{f}</div>
              ))}
            </div>

            <SectionTitle>Key Sources</SectionTitle>
            <div style={{padding:16,background:C.panel,border:`1px solid ${C.border}`,borderRadius:4,marginBottom:20}}>
              {METHODS_DATA.key_sources.map((s,i) => (
                <div key={i} style={{fontFamily:C.mono,fontSize:12,color:C.muted,padding:'4px 0',borderBottom:`1px solid rgba(255,255,255,0.04)`}}>{s}</div>
              ))}
            </div>

            <div style={{padding:16,background:'rgba(245,158,11,0.06)',border:`1px solid rgba(245,158,11,0.15)`,borderRadius:4}}>
              <div style={{fontFamily:C.mono,fontSize:12,color:C.gold,marginBottom:8}}>CITATION</div>
              <div style={{fontFamily:C.serif,fontSize:14,color:C.text,lineHeight:1.6}}>
                Postnieks, E. (2026). System Asset Pricing Model: {META.title}. SAPM Working Paper. Wooster LLC.
              </div>
            </div>
          </div>
        )}

        {/* HIGHLIGHTS TAB */}
        {tab === 'highlights' && (
          <div>
            <SectionTitle>Key Findings</SectionTitle>
            {HIGHLIGHTS.map((h,i) => (
              <div key={i} style={{display:'flex',gap:12,marginBottom:12,background:C.panel,border:`1px solid ${C.border}`,borderRadius:3,padding:'12px 16px'}}>
                <div style={{fontFamily:C.mono,fontSize:16,color:C.gold,flexShrink:0}}>▸</div>
                <div style={{fontFamily:C.serif,fontSize:15,color:C.text,lineHeight:1.7}}>{h}</div>
              </div>
            ))}
          </div>
        )}

      </div>

      
      {/* 𝒮_W WELFARE EFFICIENCY RATIO */}
      <div style={{padding:"24px",background:C.panel,border:"2px solid #D9770640",borderRadius:4,margin:"24px 0"}}>
        <div style={{fontFamily:C.mono,fontSize:12,color:"#D97706",letterSpacing:2,marginBottom:16}}>WELFARE EFFICIENCY RATIO</div>
        <div style={{display:"flex",alignItems:"baseline",gap:12,marginBottom:12}}>
          <span style={{fontFamily:C.mono,fontSize:42,fontWeight:700,color:"#D97706"}}>𝒮_W = 0.16</span>
        </div>
        <div style={{fontFamily:C.mono,fontSize:13,color:C.muted,marginBottom:16}}>
          S&P 500 long-run Sharpe ≈ 0.40 &nbsp;|&nbsp; Acceptable ≥ 0.30 &nbsp;|&nbsp; Poor &lt; 0.10
        </div>
        <div style={{fontFamily:C.serif,fontSize:16,color:"#D97706",lineHeight:1.7,fontStyle:"italic"}}>
          A Sharpe ratio this low would cause any fund manager to liquidate the position immediately.
        </div>
      </div>

      {/* GREEK SYMBOL GLOSSARY */}
      <details style={{margin:"24px 0"}}>
        <summary style={{fontFamily:C.mono,fontSize:13,color:C.gold,cursor:"pointer",padding:"12px 16px",background:C.panel,border:"1px solid rgba(245,158,11,0.15)",borderRadius:4,letterSpacing:1,listStyle:"none",display:"flex",alignItems:"center",gap:8}}>
          <span style={{color:C.gold,fontSize:14}}>▸</span> WHAT THESE SYMBOLS MEAN — AND WHY THEY MATTER
        </summary>
        <div style={{background:C.panel,border:"1px solid rgba(245,158,11,0.15)",borderTop:"none",borderRadius:"0 0 4px 4px",padding:"16px",overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontFamily:C.mono,fontSize:13}}>
            <thead>
              <tr style={{borderBottom:"1px solid rgba(255,255,255,0.1)"}}>
                <th style={{textAlign:"left",padding:"8px 10px",color:C.gold,fontSize:12,letterSpacing:1}}>SYMBOL</th>
                <th style={{textAlign:"left",padding:"8px 10px",color:C.gold,fontSize:12,letterSpacing:1}}>PRONOUNCED</th>
                <th style={{textAlign:"left",padding:"8px 10px",color:C.gold,fontSize:12,letterSpacing:1}}>WHAT IT MEASURES</th>
                <th style={{textAlign:"left",padding:"8px 10px",color:C.gold,fontSize:12,letterSpacing:1}}>CAPM EQUIVALENT</th>
                <th style={{textAlign:"left",padding:"8px 10px",color:C.gold,fontSize:12,letterSpacing:1}}>WHY IT MATTERS</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
                <td style={{padding:"10px",color:C.gold,fontWeight:600}}>β_W</td>
                <td style={{padding:"10px",color:C.text}}>beta-W</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>How much social welfare this sector destroys per dollar of private gain. β_W = 5.0 means $5 of welfare destroyed per $1 earned.</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>β (market beta) — measures how much an asset moves with the market</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>In CAPM, high beta means high financial risk. In SAPM, high β_W means high welfare destruction per dollar of revenue.</td>
              </tr>
              <tr style={{borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
                <td style={{padding:"10px",color:C.gold,fontWeight:600}}>𝒮_W</td>
                <td style={{padding:"10px",color:C.text}}>S-W</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>Private gain per dollar of system welfare cost. Higher is better — but in PST domains it is always low.</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>Sharpe Ratio — return per unit of risk</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>S&P 500 long-run Sharpe ≈ 0.40. A Sharpe of 0.10 is poor. VW Dieselgate: 𝒮_W = 0.12. LIBOR: 𝒮_W ≈ 0. ERCOT: 𝒮_W = 0.0005. These are welfare efficiency ratios of industries that GDP calls productive.</td>
              </tr>
              <tr style={{borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
                <td style={{padding:"10px",color:C.gold,fontWeight:600}}>T*</td>
                <td style={{padding:"10px",color:C.text}}>T-star</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>The predicted time until a Hollow Win collapses into outright failure.</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>Closest to duration or time-to-default in credit analysis</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>VW: T* = 6.1 years predicted, ~6 years observed. LIBOR: T* ≤ 0 — the system was failing from day one. Seven years of concealment, not surplus.</td>
              </tr>
              <tr style={{borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
                <td style={{padding:"10px",color:C.gold,fontWeight:600}}>μ*</td>
                <td style={{padding:"10px",color:C.text}}>mu-star</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>The efficient price of system welfare — what it would cost to make the deal system-preserving. μ* = 1/β_W. Derived from frontier geometry, not assigned by an analyst.</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>Closest to the risk-free rate as a floor price for risk</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>β_W = 7.4 → μ* ≈ 0.135. β_W = 35.2 → μ* ≈ 0.028. Lower μ* means cheaper welfare preservation in theory — PST means it never happens without intervention.</td>
              </tr>
              <tr style={{borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
                <td style={{padding:"10px",color:C.gold,fontWeight:600}}>Πˢᵃ</td>
                <td style={{padding:"10px",color:C.text}}>pi-SA</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>The deal's true value after subtracting welfare cost. Πˢᵃ = Π − μ* · ΔW. If negative, the deal destroys more welfare than it creates.</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>Jensen's alpha — return above what risk justifies</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>A deal that looks like +$2.3M joint gain may be −$2.4M system-adjusted. Every GDSS deployed today shows only the first number.</td>
              </tr>
              <tr style={{borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
                <td style={{padding:"10px",color:C.gold,fontWeight:600}}>W</td>
                <td style={{padding:"10px",color:C.text}}>W</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>The health of the shared system both parties are embedded in. Not A's welfare. Not B's welfare. The system's.</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>No CAPM equivalent — this is the variable CAPM cannot see</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>The Private Pareto Theorem proves W cannot be computed from bilateral payoffs. It is structurally outside the payoff space. This is the impossibility.</td>
              </tr>
              <tr style={{borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
                <td style={{padding:"10px",color:C.gold,fontWeight:600}}>δ</td>
                <td style={{padding:"10px",color:C.text}}>delta</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>Total accumulated welfare cost at crossover — the damage done before the Hollow Win collapses.</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>No direct equivalent</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>VW: δ ≈ $3.7 billion in accumulated emissions damage before EPA notice of violation.</td>
              </tr>
              <tr style={{borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
                <td style={{padding:"10px",color:C.gold,fontWeight:600}}>η</td>
                <td style={{padding:"10px",color:C.text}}>eta</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>How quickly system damage feeds back into private costs. Low η means the Hollow Win persists longer before collapsing.</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>Closest to mean reversion speed in financial models</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>VW: η ≈ 0.3. ERCOT: η ≈ 0 — no feedback until catastrophic failure.</td>
              </tr>
              <tr>
                <td style={{padding:"10px",color:C.gold,fontWeight:600}}>λ</td>
                <td style={{padding:"10px",color:C.text}}>lambda</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>Rate of welfare cost accumulation per unit of private gain. Combined with η and δ determines T*.</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>No direct equivalent</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>Higher λ means faster damage accumulation.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>

      {/* Footer */}
      <div style={{background:C.panel,borderTop:`1px solid ${C.border}`,padding:'10px 24px',display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:40}}>
        <div style={{fontFamily:C.mono,fontSize:11,color:C.muted}}>Erik Postnieks · Wooster LLC · Postnieks Impossibility Program</div>
        <div style={{fontFamily:C.mono,fontSize:11,color:C.muted}}>SAPM Working Paper · 2026</div>
      </div>
    <SAPMNav />
      </div>
  );
}
