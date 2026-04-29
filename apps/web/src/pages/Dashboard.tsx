import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie } from 'recharts';
import { ShieldCheck, Activity, Database, TrendingUp, RefreshCcw, ExternalLink, Zap, Globe, AlertTriangle, Layers, Binary, Cpu, Wallet, Map, Compass, Network, Radio, Route as RouteIcon, Signal, Building2, UserCheck, FileCheck, FileSignature, Gavel } from 'lucide-react';

const governanceTrend = [
  { name: 'Jan', coverage: 82 },
  { name: 'Feb', coverage: 85 },
  { name: 'Mar', coverage: 88 },
  { name: 'Apr', coverage: 92 },
  { name: 'May', coverage: 95 },
  { name: 'Jun', coverage: 98 },
];

const riskDistribution = [
  { name: 'High Risk', value: 12, color: '#f43f5e' },
  { name: 'Medium Risk', value: 45, color: '#f59e0b' },
  { name: 'Low Risk', value: 120, color: '#10b981' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-end border-b border-slate-800 pb-8">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase">Institutional Assurance</h1>
          <p className="text-slate-400 mt-3 text-xl max-w-2xl font-medium">Standardized BAA governance, vendor risk scoring, and legal lifecycle automation.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-slate-900 border border-slate-800 text-slate-300 px-6 py-3 rounded-2xl font-bold hover:bg-slate-800 transition flex items-center gap-2">
             <RefreshCcw size={18} /> Sync Vendor Risk
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-2xl font-bold transition shadow-xl shadow-indigo-900/40 flex items-center gap-2">
             <FileSignature size={18} /> Generate New BAA
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Compliance Coverage" value="98%" change="Optimal" icon={<Activity className="text-emerald-400" />} />
        <StatCard title="Active BAAs" value="450" change="+14" icon={<FileCheck className="text-blue-400" />} />
        <StatCard title="High Risk Vendors" value="12" change="-2" icon={<AlertTriangle className="text-rose-400" />} />
        <StatCard title="Avg. Review Time" value="14d" change="-4d" icon={<TrendingUp className="text-indigo-400" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Governance Trend */}
        <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-2 h-8 bg-indigo-500 rounded-full"></span>
              Portfolio Coverage Trend
            </h2>
            <div className="text-[10px] font-black uppercase text-indigo-400 tracking-[0.2em] bg-indigo-900/20 px-4 py-2 rounded-full border border-indigo-800/50">Audit Benchmark</div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={governanceTrend}>
                <defs>
                  <linearGradient id="colorCoverage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                   contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '16px' }}
                />
                <Area type="monotone" dataKey="coverage" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorCoverage)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-2 h-8 bg-rose-500 rounded-full"></span>
              Vendor Risk Distribution
            </h2>
            <div className="flex items-center gap-2 text-rose-400 text-sm font-bold italic">
               <ShieldAlert size={20} />
               High Risk Identified
            </div>
          </div>
          <div className="h-[400px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={100}
                  outerRadius={140}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '16px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Active Negotiations */}
      <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] backdrop-blur-3xl shadow-2xl">
        <h2 className="text-2xl font-bold mb-10 text-white flex items-center gap-3 text-indigo-400 uppercase tracking-widest">
           <Workflow size={28} />
           Active BAA Negotiations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <NegotiationCard name="CloudHealth AI" status="Legal Review" risk="High" tier="Tier 1" icon={<Gavel size={20} />} />
           <NegotiationCard name="MedBill Pro" status="Redlining" risk="Medium" tier="Tier 2" icon={<FileSignature size={20} />} />
           <NegotiationCard name="SecureDocs" status="General Counsel" risk="Low" tier="Tier 3" icon={<ShieldCheck size={20} />} />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change, icon }: any) => (
  <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] hover:border-indigo-500/30 transition-all group overflow-hidden relative shadow-2xl">
    <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-10 transition-opacity transform group-hover:scale-150 duration-1000 rotate-12">
       {React.cloneElement(icon, { size: 160 })}
    </div>
    <div className="relative z-10">
      <div className="p-4 bg-slate-950 rounded-2xl w-fit mb-6 border border-slate-800/50 shadow-inner group-hover:scale-110 transition duration-500">{icon}</div>
      <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{title}</p>
      <div className="flex items-end gap-3">
        <p className="text-4xl font-black text-white tracking-tighter">{value}</p>
        <span className={`text-[11px] font-black pb-1.5 ${change.startsWith('+') || change.startsWith('-') || change === 'Optimal' || change === 'Stable' ? (change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400') : 'text-slate-400'}`}>{change}</span>
      </div>
    </div>
  </div>
);

const NegotiationCard = ({ name, status, risk, tier, icon }: any) => (
  <div className="p-6 bg-slate-950/50 border border-slate-800 rounded-3xl hover:bg-slate-800/50 transition cursor-pointer group">
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-slate-900 rounded-lg text-slate-400 group-hover:text-indigo-400 transition">{icon}</div>
        <h3 className="text-xl font-bold text-slate-100">{name}</h3>
      </div>
      <span className={`text-[10px] font-black px-3 py-1 rounded-full border border-slate-700 uppercase tracking-tighter ${risk === 'High' ? 'bg-rose-950/20 text-rose-400 border-rose-800/50' : (risk === 'Medium' ? 'bg-amber-950/20 text-amber-400 border-amber-800/50' : 'bg-emerald-950/20 text-emerald-400 border-emerald-800/50')}`}>{risk} Risk</span>
    </div>
    <div className="flex justify-between items-center mt-8">
       <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest italic">{status} | {tier}</span>
       <ExternalLink size={14} className="text-slate-700 group-hover:text-white transition" />
    </div>
  </div>
);

export default Dashboard;
