import React from 'react';
import { motion } from 'framer-motion';
import {
    ShieldCheck,
    Users,
    School,
    Lock,
    UserPlus,
    ArrowUpRight,
    Database,
    Activity,
    Zap,
    Cpu,
    Search,
    AlertTriangle,
    MoreHorizontal,
    Download,
    LogOut
} from 'lucide-react';

const AdminDashboard = ({ users = [], students = [] }) => {
    const totalFaculty = users.length;
    const totalStudents = students.length;
    const uniqueClasses = [...new Set(students.map(s => s.studentClass || s.class))].filter(Boolean).length || 1;

    return (
        <div className="space-y-8 relative">
            {/* Header with quick logout for admin */}
            <div className="flex items-center justify-between px-2">
                <p className="text-[13px] font-black text-slate-500 uppercase tracking-[0.2em]">Institutional Infrastructure Control</p>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Core Status: Optimal</span>
                </div>
            </div>

            {/* Admin Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <AdminStatCard
                    title="Active Classes/Sectors"
                    value={uniqueClasses.toString()}
                    icon={<School size={20} />}
                    trend="Operational"
                    color="#6366f1"
                />
                <AdminStatCard
                    title="Total Faculty"
                    value={totalFaculty.toString()}
                    icon={<Users size={20} />}
                    trend={`${totalFaculty > 0 ? 'Verified' : 'Initializing'}`}
                    color="#0ea5e9"
                />
                <AdminStatCard
                    title="Total Students"
                    value={totalStudents.toString()}
                    icon={<Database size={20} />}
                    trend="In Registry"
                    color="#10b981"
                />
                <AdminStatCard
                    title="Infrastructure Load"
                    value="Stable"
                    icon={<Lock size={20} />}
                    trend="Secure"
                    color="#f43f5e"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Faculty Management */}
                <div className="lg:col-span-2 glass-panel p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Faculty Registry</h3>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Operational Personnel Status</p>
                        </div>
                        <button className="btn-primary flex items-center gap-2 h-12">
                            <UserPlus size={18} /> Provision Faculty
                        </button>
                    </div>

                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {users.length > 0 ? (
                            users.map((u, i) => (
                                <StaffRow
                                    key={u.id || i}
                                    name={u.username || u.name || 'Unknown User'}
                                    role={u.role || 'Member'}
                                    status="Active"
                                />
                            ))
                        ) : (
                            <p className="text-center py-8 text-slate-400 font-bold uppercase tracking-widest text-[10px]">No Faculty Found</p>
                        )}
                    </div>

                    <button className="w-full mt-8 py-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-500 font-black text-[12px] uppercase tracking-widest hover:bg-slate-100 transition-all">
                        View Complete Directory
                    </button>
                </div>

                {/* Audit Logs */}
                <div className="glass-panel p-8">
                    <div className="mb-10">
                        <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Audit Protocol</h3>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Real-time System Logs</p>
                    </div>

                    <div className="space-y-6">
                        <LogEntry time="2m ago" action="Registry Backup" user="Kernel" status="Verified" />
                        <LogEntry time="15m ago" action="Access Attempt" user="IP: 192.168.1.4" status="Threat" />
                        <LogEntry time="1h ago" action="Privilege Escalation" user="M. Garcia" status="Audit" />
                        <LogEntry time="3h ago" action="Sector Initialization" user="S. Wilson" status="Verified" />
                    </div>
                </div>
            </div>

            {/* Infrastructure Health */}
            <div className="glass-panel p-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 border border-indigo-100 shadow-sm">
                            <Database size={40} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Institutional Integrity</h3>
                            <div className="flex items-center gap-4 mt-2">
                                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                                <span className="text-[14px] font-bold text-slate-500 uppercase tracking-widest">Node: SGPB-CLUSTER-01 • Status: Operational</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-16">
                        <HealthMetric label="Inbound" value="128k/h" icon={<Zap size={24} className="text-amber-500" />} />
                        <HealthMetric label="Latency" value="24ms" icon={<Activity size={24} className="text-emerald-500" />} />
                        <HealthMetric label="Storage" value="65%" icon={<Cpu size={24} className="text-indigo-500" />} />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center mt-10 pt-8 border-t border-slate-100 gap-6">
                    <p className="text-[14px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">Institutional integrity protocols are within optimal parameters.</p>
                    <button
                        onClick={() => {
                            const data = "Node,Status,Latency,Memory\n" +
                                "SGPB-CLUSTER-01,Operational,24ms,65%\n" +
                                "SGPB-CLUSTER-02,Standby,12ms,22%";
                            const blob = new Blob([data], { type: 'text/csv' });
                            const url = window.URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `System_Health_${new Date().toISOString().split('T')[0]}.csv`;
                            a.click();
                            window.URL.revokeObjectURL(url);
                        }}
                        className="btn-primary px-8"
                    >
                        <Download size={18} /> Generate Infrastructure Report
                    </button>
                </div>
            </div>
        </div>
    );
};

const AdminStatCard = ({ title, value, icon, trend, color }) => (
    <div className="premium-card group">
        <div className="flex items-center justify-between mb-4">
            <div style={{ background: `${color}10`, color: color }} className="w-12 h-12 rounded-xl flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <div className="text-[11px] font-black text-slate-400 bg-slate-50 px-2 py-1 rounded uppercase tracking-tighter">
                {trend}
            </div>
        </div>
        <div>
            <p className="text-[14px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{title}</p>
            <p className="text-5xl font-black text-slate-800 tracking-tight">{value}</p>
        </div>
        <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500" style={{ backgroundColor: color }}></div>
    </div>
);

const StaffRow = ({ name, role, status }) => (
    <div className="flex items-center justify-between p-4 bg-slate-50/50 border border-slate-100 rounded-2xl hover:bg-white hover:shadow-md transition-all group">
        <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-white border border-slate-200 rounded-xl flex items-center justify-center font-black text-indigo-500 text-sm shadow-sm">
                {name.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </div>
            <div>
                <h5 className="font-black text-slate-700 text-base">{name}</h5>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">{role}</p>
            </div>
        </div>
        <span className={`text-[11px] font-black uppercase px-3 py-1 rounded-lg ${status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
            status === 'In Session' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' :
                'bg-slate-100 text-slate-500 border border-slate-200'
            }`}>
            {status}
        </span>
    </div>
);

const LogEntry = ({ time, action, user, status }) => (
    <div className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0 pb-4">
        <div className="flex items-start gap-4">
            <span className="text-[11px] font-black text-slate-300 uppercase mt-1 w-12">{time}</span>
            <div>
                <p className="text-sm font-black text-slate-700 uppercase tracking-tight">{action}</p>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Executor: {user}</p>
            </div>
        </div>
        <span className={`text-[10px] font-black tracking-widest ${status === 'Threat' ? 'text-rose-500' : 'text-indigo-500'}`}>
            {status.toUpperCase()}
        </span>
    </div>
);

const HealthMetric = ({ label, value, icon }) => (
    <div className="text-center group">
        <div className="flex items-center justify-center gap-3 mb-3 group-hover:scale-110 transition-transform">
            {icon}
            <span className="text-[14px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
        </div>
        <p className="text-4xl font-black text-slate-800 tracking-tighter">{value}</p>
    </div>
);

export default AdminDashboard;
