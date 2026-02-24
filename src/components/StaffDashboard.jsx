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
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import { generateCSV, generateTextReport, downloadFile } from '../utils/reportUtils';

const StaffDashboard = ({ onNavigateToAttendance, students = [], onSendSMS }) => {
    // Analytics Extraction from live registry
    const totalCount = students.length || 0;
    const presentToday = students.filter(s => s.status === 'Present').length || 0;
    const absentToday = students.filter(s => s.status === 'Absent').length || 0;
    const attendancePercentage = totalCount > 0 ? Math.round((presentToday / totalCount) * 100) : 0;

    // Monthly Trend Analysis (Simulated for high-fidelity visual)
    const trendData = [
        { day: 'Mon', value: 85 },
        { day: 'Tue', value: 92 },
        { day: 'Wed', value: 88 },
        { day: 'Thu', value: 95 },
        { day: 'Fri', value: 82 },
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
            className="space-y-10 pb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* 1. INSTITUTIONAL HEADER */}
            <motion.div variants={itemVariants} className="px-2 space-y-1">
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                    Staff Command Center
                </h1>
                <div className="flex flex-col gap-1 text-slate-500 font-bold">
                    <p className="flex items-center gap-2 text-sm">
                        <Cpu size={16} />
                        Operational analytics and personnel registry oversight.
                    </p>
                    <p className="text-sm">Real-time Sync Active</p>
                </div>
            </motion.div>

            {/* 2. INTELLIGENCE GRID - Vertical Minimalist Design */}
            <div className="flex flex-col gap-12 px-2">
                <OperationalCard
                    icon={<Users size={60} strokeWidth={1.5} />}
                    label="Active Registry"
                    value={totalCount}
                    subLabel="Total Students"
                    variants={itemVariants}
                />
                <OperationalCard
                    icon={<CheckCircle2 size={60} strokeWidth={1.5} />}
                    label="Attendance Quota"
                    value={presentToday}
                    subLabel="Present Personnel"
                    variants={itemVariants}
                />
                <OperationalCard
                    icon={<AlertCircle size={60} strokeWidth={1.5} />}
                    label="Missing Entries"
                    value={absentToday}
                    subLabel="Absent / Pending"
                    variants={itemVariants}
                />
            </div>

            {/* 3. ANALYTICS HUB */}
            <motion.div className="bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-sm" variants={itemVariants}>
                <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                    <div className="flex items-center gap-4">
                        <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                        <h3 className="text-lg font-black text-slate-800 uppercase tracking-[0.2em]">Institutional Stability Data</h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 text-slate-300 hover:text-indigo-600 transition-all"><RefreshCw size={18} /></button>
                    </div>
                </div>

                <div className="p-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Donut Analytics */}
                    <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-8 border-r border-slate-100 pr-12">
                        <div className="relative w-full aspect-square max-w-[280px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={[
                                            { name: 'Present', value: presentToday || 1 },
                                            { name: 'Absent', value: absentToday || 0 },
                                        ]}
                                        innerRadius={85}
                                        outerRadius={110}
                                        paddingAngle={8}
                                        dataKey="value"
                                        startAngle={90}
                                        endAngle={450}
                                        stroke="none"
                                    >
                                        <Cell fill="#4f46e5" />
                                        <Cell fill="#f43f5e" />
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                <span className="text-6xl font-black text-slate-800 tabular-nums">{attendancePercentage}%</span>
                                <span className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mt-1">Total Efficiency</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8 w-full">
                            <div className="text-center p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                <p className="text-[12px] font-black text-slate-400 uppercase tracking-widest mb-1">Present Status</p>
                                <p className="text-2xl font-black text-slate-800">{presentToday}</p>
                            </div>
                            <div className="text-center p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                <p className="text-[12px] font-black text-slate-400 uppercase tracking-widest mb-1">Absent Status</p>
                                <p className="text-2xl font-black text-slate-800">{absentToday}</p>
                            </div>
                        </div>
                    </div>

                    {/* Trend Analytics */}
                    <div className="lg:col-span-7 flex flex-col space-y-8">
                        <div>
                            <h4 className="text-base font-black text-slate-800 uppercase tracking-widest mb-2">Weekly Performance Trend</h4>
                            <p className="text-sm text-slate-400 font-medium">Historical data tracking for the current cycle.</p>
                        </div>

                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={trendData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="day"
                                        stroke="#94a3b8"
                                        fontSize={11}
                                        fontWeight={700}
                                        tickLine={false}
                                        axisLine={false}
                                        dy={10}
                                    />
                                    <YAxis
                                        stroke="#94a3b8"
                                        fontSize={11}
                                        fontWeight={700}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(79, 70, 229, 0.05)' }}
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
                                    />
                                    <Bar dataKey="value" fill="#4f46e5" radius={[8, 8, 8, 8]} barSize={45}>
                                        {trendData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={index === 3 ? '#4f46e5' : '#e2e8f0'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </motion.div>

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
