import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Calendar,
    Clock,
    BookOpen,
    CheckCircle2,
    Users,
    ArrowRight,
    PlayCircle,
    BadgeCheck,
    ChevronRight,
    Download,
    FileText,
    Cpu,
    LogOut,
    LogIn,
    CalendarDays,
    Timer,
    CheckCircle,
    Clock4,
    AlertCircle,
    RefreshCw,
    Mail
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { generateCSV, generateTextReport, downloadFile } from '../utils/reportUtils';

const StaffDashboard = ({ onNavigateToAttendance, students = [], onSendSMS }) => {
    // Analytics Extraction from live registry
    const totalCount = students.length || 0;
    const presentToday = students.filter(s => s.status === 'Present').length || 0;
    const absentToday = students.filter(s => s.status === 'Absent').length || 0;
    const onLeaveCount = students.filter(s => s.status === 'Late' || s.status === 'Leave').length || 0;
    const attendancePercentage = totalCount > 0 ? Math.round((presentToday / totalCount) * 100) : 0;

    // Simulated wave data for the area chart
    const trendData = [
        { name: 'Mon', value: 45 },
        { name: 'Tue', value: 72 },
        { name: 'Wed', value: 68 },
        { name: 'Thu', value: 85 },
        { name: 'Fri', value: 82 },
        { name: 'Sat', value: 55 },
        { name: 'Sun', value: 75 },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <motion.div
            className="space-y-8 pb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* 1. TOP STATS GRID - Horizontal Design */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
                <OperationalCard
                    icon={<CalendarDays className="text-blue-600" size={24} />}
                    label="Verified Present"
                    value={presentToday}
                    trend="+2.4%"
                    trendColor="text-emerald-500"
                    variants={itemVariants}
                />
                <OperationalCard
                    icon={<Users className="text-indigo-600" size={24} />}
                    label="Absent Records"
                    value={absentToday}
                    trend="-1.2%"
                    trendColor="text-rose-500"
                    variants={itemVariants}
                />
                <OperationalCard
                    icon={<BadgeCheck className="text-sky-600" size={24} />}
                    label="Faculty on Leave"
                    value={onLeaveCount}
                    trend="Stable"
                    trendColor="text-slate-400"
                    variants={itemVariants}
                />
                <OperationalCard
                    icon={<Activity className="text-blue-500" size={24} />}
                    label="Total Enrollment"
                    value={totalCount}
                    trend="+12"
                    trendColor="text-emerald-500"
                    variants={itemVariants}
                />
            </div>

            {/* 2. MAIN ANALYTICS HUB - Area Chart */}
            <motion.div className="bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-sm" variants={itemVariants}>
                <div className="p-8 border-b border-slate-50 flex flex-col gap-1 items-start">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Operational Attendance Analytics</h3>
                    <div className="flex items-center gap-1">
                         <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                         <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                         <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                    </div>
                </div>

                <div className="p-8">
                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trendData}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                                <XAxis 
                                    dataKey="name" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} 
                                    dy={10}
                                />
                                <YAxis 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} 
                                    dx={-10}
                                    ticks={[0, 25, 50, 75, 100]}
                                />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="value" 
                                    stroke="#4f46e5" 
                                    strokeWidth={3}
                                    fillOpacity={1} 
                                    fill="url(#colorValue)" 
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </motion.div>

            {/* 3. LIVE FEED SECTION */}
            <motion.div variants={itemVariants} className="px-2">
                <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-6">Live Feed</h3>
            </motion.div>

            {/* 4. ACTION PROTOCOLS */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 px-2">
                <ActionCard
                    title="Start Ledger"
                    desc="Open entry"
                    icon={<PlayCircle size={20} />}
                    onClick={() => onNavigateToAttendance('attendance')}
                    color="indigo"
                />
                <ActionCard
                    title="Review Leaves"
                    desc="Applications"
                    icon={<BadgeCheck size={20} />}
                    onClick={() => onNavigateToAttendance('leave')}
                    color="amber"
                />
                <ActionCard
                    title="Reports"
                    desc="Generate"
                    icon={<FileText size={20} />}
                    onClick={() => onNavigateToAttendance('reports')}
                    color="rose"
                />
                <ActionCard
                    title="Export"
                    desc="Download CSV"
                    icon={<Download size={20} />}
                    onClick={() => downloadFile(generateCSV(students), 'Registry_Report.csv')}
                    color="emerald"
                />
                <ActionCard
                    title="Send SMS"
                    desc="Notify"
                    icon={<Mail size={20} />}
                    onClick={onSendSMS}
                    color="amber"
                />
                <ActionCard
                    title="Profile"
                    desc="Credentials"
                    icon={<Users size={20} />}
                    onClick={() => onNavigateToAttendance('profile')}
                    color="slate"
                />
            </div>
        </motion.div>
    );
};

const OperationalCard = ({ icon, label, value, trend, trendColor, variants }) => {
    return (
        <motion.div
            variants={variants}
            className="bg-white border border-slate-100 rounded-[28px] p-6 flex items-center gap-5 shadow-sm"
        >
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
                {icon}
            </div>
            <div>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-slate-900">{value}</span>
                    <span className={`text-[11px] font-black ${trendColor}`}>{trend}</span>
                </div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{label}</p>
            </div>
        </motion.div>
    );
};

            {/* 4. ACTION PROTOCOLS */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 px-2">
                <ActionCard
                    title="Start Ledger"
                    desc="Open attendance entry portal"
                    icon={<PlayCircle size={20} />}
                    onClick={() => onNavigateToAttendance('attendance')}
                    color="indigo"
                />
                <ActionCard
                    title="Review Leaves"
                    desc="Process pending applications"
                    icon={<BadgeCheck size={20} />}
                    onClick={() => onNavigateToAttendance('leave')}
                    color="amber"
                />
                <ActionCard
                    title="Generate Reports"
                    desc="Open custom reporting tool"
                    icon={<FileText size={20} />}
                    onClick={() => onNavigateToAttendance('reports')}
                    color="rose"
                />
                <ActionCard
                    title="Export Intel"
                    desc="Download CSV registry data"
                    icon={<Download size={20} />}
                    onClick={() => downloadFile(generateCSV(students), 'Registry_Report.csv')}
                    color="emerald"
                />
                <ActionCard
                    title="Send SMS"
                    desc="Notify parents of attendance"
                    icon={<Mail size={20} />}
                    onClick={onSendSMS}
                    color="amber"
                />
                <ActionCard
                    title="System Profile"
                    desc="Manage faculty credentials"
                    icon={<Users size={20} />}
                    onClick={() => onNavigateToAttendance('profile')}
                    color="slate"
                />
            </div>
        </motion.div>
    );
};

const OperationalCard = ({ icon, label, value, subLabel, variants }) => {
    return (
        <motion.div
            variants={variants}
            className="flex flex-col items-start gap-1 px-4"
        >
            <div className="text-slate-900/90 mb-4">
                {icon}
            </div>
            <div className="flex items-center gap-3 text-slate-500 mb-2">
                <div className="w-6 h-6 border-2 border-slate-200 rounded-full flex items-center justify-center">
                    {React.cloneElement(icon, { size: 12, strokeWidth: 2.5 })}
                </div>
                <span className="text-[12px] font-black uppercase tracking-[0.15em] leading-none">{label}</span>
            </div>
            <h3 className="text-5xl font-black text-slate-900 leading-tight tracking-tight">{value}</h3>
            <p className="text-[13px] font-bold text-slate-400 mt-2 uppercase tracking-widest">{subLabel}</p>
        </motion.div>
    );
};

const ActionCard = ({ title, desc, icon, onClick, color }) => {
    const colors = {
        indigo: "text-indigo-600 bg-indigo-50 border-indigo-100 hover:bg-indigo-600 hover:text-white",
        amber: "text-amber-600 bg-amber-50 border-amber-100 hover:bg-amber-600 hover:text-white",
        emerald: "text-emerald-600 bg-emerald-50 border-emerald-100 hover:bg-emerald-600 hover:text-white",
        slate: "text-slate-600 bg-slate-50 border-slate-100 hover:bg-slate-600 hover:text-white",
        rose: "text-rose-600 bg-rose-50 border-rose-100 hover:bg-rose-600 hover:text-white"
    };

    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-start p-6 rounded-[24px] border transition-all duration-300 text-left group ${colors[color]}`}
        >
            <div className={`p-3 rounded-2xl mb-4 transition-colors ${color === 'indigo' ? 'bg-indigo-100 group-hover:bg-indigo-500' :
                color === 'amber' ? 'bg-amber-100 group-hover:bg-amber-500' :
                    color === 'emerald' ? 'bg-emerald-100 group-hover:bg-emerald-500' :
                        color === 'rose' ? 'bg-rose-100 group-hover:bg-rose-500' : 'bg-slate-200 group-hover:bg-slate-500'}`}>
                {icon}
            </div>
            <h4 className="font-black text-lg tracking-tight mb-1">{title}</h4>
            <p className="text-[13px] font-bold opacity-60 uppercase tracking-widest leading-relaxed">{desc}</p>
        </button>
    );
};

export default StaffDashboard;
