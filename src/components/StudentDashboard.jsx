import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    User,
    BookOpen,
    Calendar,
    Clock,
    TrendingUp,
    ShieldCheck,
    Cpu,
    GitBranch,
    FileText,
    Activity,
    UserCheck,
    AlertTriangle,
    Download,
    Mail,
    CheckCircle2,
    XCircle,
    Info,
    Layout
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
    Cell,
    LineChart,
    Line
} from 'recharts';

const StudentDashboard = ({ user, students = [], onStatusChange }) => {
    // Find own record from the students prop
    const myRecord = students.find(s => 
        s.name.toLowerCase().includes(user?.username?.toLowerCase() || '') || 
        s.roll.toLowerCase().includes(user?.username?.toLowerCase() || '')
    );

    // If record found, use its real status, else demo data
    const currentStatus = myRecord?.status || 'Unknown';
    // In a real app, we would filter 'students' to find the record matching the current user's roll/ID
    // For now, we simulate personal student data
    const myAttendance = {
        totalClasses: 45,
        present: 38,
        absent: 5,
        late: 2,
        percentage: 84
    };

    const distributionData = [
        { name: 'Present', value: myAttendance.present, color: '#4f46e5' },
        { name: 'Absent', value: myAttendance.absent, color: '#f43f5e' },
        { name: 'Late', value: myAttendance.late, color: '#f59e0b' },
    ];

    const weeklyTrend = [
        { day: 'Mon', status: 1 },
        { day: 'Tue', status: 1 },
        { day: 'Wed', status: 0 },
        { day: 'Thu', status: 1 },
        { day: 'Fri', status: 1 },
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
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <motion.div
            className="space-y-8 pb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* 1. STUDENT PROFILE HEADER */}
            <motion.div variants={itemVariants} className="px-2 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-5xl font-black text-slate-800 tracking-tight">
                        Student <span className="text-indigo-600 italic">Portal</span>
                    </h1>
                    <p className="text-slate-400 font-medium text-lg mt-2 flex items-center gap-2">
                        <User size={18} className="text-indigo-500" />
                        Welcome back, <span className="text-slate-700 font-bold">{user?.username || 'Learner'}</span>
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                        <ShieldCheck size={14} className="text-emerald-500" />
                        Identity Verified
                    </span>
                </div>
            </motion.div>

            {/* 2. INSTITUTIONAL FILTERS (Mirroring HOD) */}
            <motion.div className="glass-panel p-8 relative overflow-hidden group" variants={itemVariants}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <FilterSelect label="Department" icon={<Cpu size={14} />} options={['CS', 'Electrical', 'Mechanical']} />
                    <FilterSelect label="Branch" icon={<GitBranch size={14} />} options={['CSE', 'ECE', 'EEE']} />
                    <FilterSelect label="Semester" icon={<Calendar size={14} />} options={['Sem I', 'Sem II', 'Sem III', 'Sem IV', 'Sem V']} />
                    <FilterSelect label="Filter Subject" icon={<BookOpen size={14} />} options={['Algorithms', 'Web Dev', 'IoT']} />
                </div>
            </motion.div>

            {/* 3. PERFORMANCE GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2">
                <PerformanceCard
                    label="Attendance Quota"
                    value={`${myAttendance.percentage}%`}
                    subLabel="Total Efficiency"
                    color="indigo"
                    icon={<Activity size={24} />}
                    variants={itemVariants}
                />
                <PerformanceCard
                    label="Sessions Present"
                    value={myAttendance.present.toString()}
                    subLabel="Validated Entries"
                    color="emerald"
                    icon={<UserCheck size={24} />}
                    variants={itemVariants}
                />
                <PerformanceCard
                    label="Pending / Absent"
                    value={myAttendance.absent.toString()}
                    subLabel="Requires Review"
                    color="rose"
                    icon={<AlertTriangle size={24} />}
                    variants={itemVariants}
                />
            </div>

            {/* 4. ANALYTICS HUB */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-2">
                {/* 4.1 Stats Distribution */}
                <motion.div className="lg:col-span-5 glass-panel p-10" variants={itemVariants}>
                    <h3 className="text-base font-black text-slate-800 uppercase tracking-[0.2em] mb-10 flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                        Metric Distribution
                    </h3>
                    
                    <div className="flex flex-col items-center">
                        <div className="w-64 h-64 relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={distributionData}
                                        innerRadius={75}
                                        outerRadius={100}
                                        paddingAngle={8}
                                        dataKey="value"
                                        startAngle={90}
                                        endAngle={450}
                                        stroke="none"
                                    >
                                        {distributionData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-5xl font-black text-slate-800 italic">{myAttendance.percentage}%</span>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Overall</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 w-full mt-10">
                            {distributionData.map(entry => (
                                <div key={entry.name} className="flex flex-col items-center p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                    <div className="w-2 h-2 rounded-full mb-2" style={{ backgroundColor: entry.color }}></div>
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{entry.name}</span>
                                    <span className="text-xl font-black text-slate-800 mt-1">{entry.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* 4.2 Weekly Performance */}
                <motion.div className="lg:col-span-7 glass-panel p-10" variants={itemVariants}>
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-base font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
                            Activity Timeline
                        </h3>
                        <span className="text-[11px] font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-widest">Live Flow</span>
                    </div>

                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={weeklyTrend}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis 
                                    dataKey="day" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 800 }} 
                                    dy={10}
                                />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                    cursor={{ stroke: '#4f46e5', strokeWidth: 1 }}
                                />
                                <Line 
                                    type="stepAfter" 
                                    dataKey="status" 
                                    stroke="#4f46e5" 
                                    strokeWidth={4} 
                                    dot={{ fill: '#4f46e5', strokeWidth: 2, r: 6 }} 
                                    activeDot={{ r: 8, strokeWidth: 0 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mt-8 p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100/50 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-sm">
                            <Info size={24} />
                        </div>
                        <p className="text-sm text-slate-600 font-medium leading-relaxed">
                            Your institutional presence is currently <span className="font-black text-indigo-600 uppercase">Optimal</span>. 
                            Maintain this trajectory to ensure compliance with SGPB protocols.
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* 5. ATTENDANCE MARKING PROTOCOL */}
            <motion.div className="px-2" variants={itemVariants}>
                <div className="bg-white rounded-[32px] p-10 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <div className={`w-16 h-16 rounded-[20px] flex items-center justify-center border-2 ${
                            currentStatus === 'Present' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-slate-50 border-slate-100 text-slate-400'
                        }`}>
                            <UserCheck size={32} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-800 tracking-tight mb-1">Mark Attendance</h3>
                            <p className="text-sm text-slate-500 font-medium tracking-tight">
                                Current Protocol Status: <span className={`font-black uppercase ${currentStatus === 'Present' ? 'text-emerald-500' : 'text-slate-400'}`}>
                                    {currentStatus}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button 
                            disabled={currentStatus === 'Present' || !myRecord}
                            onClick={() => onStatusChange(myRecord.id, 'Present')}
                            className={`flex items-center gap-3 px-10 py-5 rounded-2xl font-black transition-all shadow-xl uppercase tracking-widest text-[13px] ${
                                currentStatus === 'Present' 
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200 shadow-none' 
                                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
                            }`}
                        >
                            <CheckCircle2 size={20} />
                            {currentStatus === 'Present' ? 'Registry Logged' : 'Verify My Presence'}
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const FilterSelect = ({ label, icon, options }) => (
    <div className="space-y-3">
        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
            {icon} {label}
        </label>
        <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-4 text-xs font-bold text-slate-700 outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer">
            <option value="">All {label}s</option>
            {options.map(o => <option key={o}>{o}</option>)}
        </select>
    </div>
);

const PerformanceCard = ({ label, value, subLabel, color, icon, variants }) => {
    const colors = {
        indigo: "from-indigo-600 to-indigo-800 shadow-indigo-200",
        emerald: "from-emerald-500 to-emerald-700 shadow-emerald-200",
        rose: "from-rose-500 to-rose-700 shadow-rose-200"
    };

    return (
        <motion.div
            variants={variants}
            whileHover={{ y: -6 }}
            className={`bg-gradient-to-br ${colors[color]} p-8 rounded-[32px] text-white shadow-xl relative overflow-hidden group`}
        >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                {React.cloneElement(icon, { size: 100 })}
            </div>
            <div className="relative z-10 flex flex-col h-full space-y-4 text-left">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-white/20 backdrop-blur-md rounded-xl font-bold">
                        {React.cloneElement(icon, { size: 18 })}
                    </div>
                    <span className="text-[12px] font-black uppercase tracking-[0.2em] opacity-80">{label}</span>
                </div>
                <div>
                    <h3 className="text-6xl font-black tracking-tight italic tabular-nums">{value}</h3>
                    <p className="text-[13px] font-bold opacity-70 mt-2 uppercase tracking-widest">{subLabel}</p>
                </div>
            </div>
        </motion.div>
    );
};

export default StudentDashboard;
