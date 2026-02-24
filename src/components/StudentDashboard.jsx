import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    User,
    BookOpen,
    Calendar,
    Clock,
    TrendingUp,
    ShieldCheck,
    LayoutGrid,
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
    Layout,
    Trash2,
    Edit3,
    Smartphone
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

const StudentDashboard = ({ user, students = [], onStatusChange, onSendSMS }) => {
    const [showStatusPicker, setShowStatusPicker] = useState(false);

    // Find own record from the students prop
    const myRecord = students.find(s => {
        if (!s) return false;
        const studentRoll = (s.roll || s.registerNumber || '').toString().toLowerCase();
        const userRoll = (user?.rollNumber || '').toString().toLowerCase();
        const studentName = (s.name || '').toString().toLowerCase();
        const userName = (user?.username || '').toString().toLowerCase();
        
        return (userRoll && studentRoll === userRoll) || 
               (userName && (studentName.includes(userName) || studentRoll.includes(userName)));
    });

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
                    <span className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-100 border border-slate-200 px-4 py-2 rounded-full">
                        <ShieldCheck size={14} className="text-emerald-500" />
                        ID: {user?.rollNumber || 'SGPB-VERIFIED'}
                    </span>
                </div>
            </motion.div>

            {/* 2. INSTITUTIONAL FILTERS (Mirroring HOD) */}
            <motion.div className="glass-panel p-8 relative overflow-hidden group" variants={itemVariants}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <FilterSelect label="Department" icon={<LayoutGrid size={14} />} options={['CS', 'Electrical', 'Mechanical']} />
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

            {/* 5. INSTITUTIONAL REGISTRY (Image-based redesign) */}
            <motion.div className="px-2" variants={itemVariants}>
                <div className="bg-white rounded-[40px] p-12 shadow-sm border border-slate-100 relative overflow-hidden group">
                    {/* Background Motif Removed for Clarity */}

                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
                        {/* Header Section */}
                        <div className="flex items-center gap-10">
                            <div className="w-28 h-28 rounded-[36px] bg-slate-50 flex items-center justify-center border border-slate-100 shadow-sm relative group/logo overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover/logo:opacity-100 transition-opacity" />
                                <Activity size={56} className="text-slate-300 relative z-10" />
                            </div>
                            
                            <div>
                                <h3 className="text-4xl font-black text-slate-800 tracking-tight mb-3">
                                    Institutional <br />
                                    <span className="text-indigo-600">Registry</span>
                                </h3>
                                <div className="flex flex-col gap-2">
                                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                        Current Node Status
                                    </span>
                                    <div className="flex items-center gap-3">
                                        <span className={`text-[12px] font-black uppercase tracking-[0.15em] px-5 py-2 rounded-full border ${
                                            currentStatus === 'Present' ? 'bg-emerald-500 text-white border-emerald-400 shadow-lg shadow-emerald-200' : 
                                            currentStatus === 'Absent' ? 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-200' : 
                                            'bg-slate-200 text-slate-600 border-slate-300'
                                        }`}>
                                            {currentStatus || 'UNKNOWN'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Control Grid */}
                        <div className="flex flex-wrap items-center justify-center gap-5">
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-4">
                                    {(showStatusPicker || currentStatus === 'Unknown') ? (
                                        <>
                                            {/* MARK PRESENT */}
                                            <button 
                                                onClick={() => {
                                                    onStatusChange(myRecord?.id || user, 'Present');
                                                    setShowStatusPicker(false);
                                                }}
                                                disabled={currentStatus === 'Present'}
                                                className={`flex items-center gap-3 px-8 py-4 rounded-xl font-black transition-all shadow-xl uppercase tracking-widest text-[11px] ${
                                                    currentStatus === 'Present' 
                                                    ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed' 
                                                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 hover:scale-105 active:scale-95'
                                                }`}
                                                style={{ pointerEvents: 'auto', position: 'relative', zIndex: 20 }}
                                            >
                                                <CheckCircle2 size={18} />
                                                Mark Present
                                            </button>

                                            {/* MARK ABSENT */}
                                            <button 
                                                onClick={() => {
                                                    onStatusChange(myRecord?.id || user, 'Absent');
                                                    setShowStatusPicker(false);
                                                }}
                                                disabled={currentStatus === 'Absent'}
                                                className={`flex items-center gap-3 px-8 py-4 rounded-xl font-black border-2 transition-all uppercase tracking-widest text-[11px] ${
                                                    currentStatus === 'Absent'
                                                    ? 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed'
                                                    : 'bg-white border-slate-200 text-slate-600 hover:border-rose-500 hover:text-rose-600 hover:scale-105 active:scale-95'
                                                }`}
                                                style={{ pointerEvents: 'auto', position: 'relative', zIndex: 20 }}
                                            >
                                                <XCircle size={18} />
                                                Mark Absent
                                            </button>
                                        </>
                                    ) : (
                                        <div className="flex items-center gap-4 bg-slate-50 px-8 py-4 rounded-xl border border-slate-200 shadow-inner">
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Entry Locked</span>
                                                <span className="text-[13px] font-bold text-slate-700">Status: {currentStatus}</span>
                                            </div>
                                            <Activity size={20} className={currentStatus === 'Present' ? 'text-emerald-500' : 'text-rose-500'} />
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center gap-4">
                                    {/* EDIT STATUS / CANCEL */}
                                    <button 
                                        onClick={() => setShowStatusPicker(!showStatusPicker)}
                                        disabled={!myRecord}
                                        className={`flex items-center gap-3 px-8 py-4 rounded-xl font-black transition-all uppercase tracking-widest text-[11px] flex-1 active:scale-95 ${
                                            showStatusPicker 
                                            ? 'bg-rose-50 text-rose-600 border-2 border-rose-200' 
                                            : 'bg-white border-2 border-slate-200 text-slate-600 hover:border-indigo-500 hover:text-indigo-600'
                                        }`}
                                        style={{ pointerEvents: 'auto', position: 'relative', zIndex: 20 }}
                                    >
                                        <Edit3 size={18} />
                                        {showStatusPicker ? 'Cancel Entry' : 'Edit status'}
                                    </button>

                                    {/* TRASH */}
                                    <button 
                                        onClick={() => {
                                            if(window.confirm('Clear institutional attendance record?')) {
                                                onStatusChange(myRecord?.id, 'Unknown');
                                                setShowStatusPicker(true);
                                            }
                                        }}
                                        disabled={!myRecord || currentStatus === 'Unknown'}
                                        className="h-14 w-14 rounded-xl bg-white border-2 border-slate-200 text-slate-400 hover:bg-rose-50 hover:border-rose-500 hover:text-rose-500 transition-all flex items-center justify-center group/trash active:scale-90"
                                        style={{ pointerEvents: 'auto', position: 'relative', zIndex: 20 }}
                                    >
                                        <Trash2 size={24} className="group-hover/trash:scale-110 transition-transform" />
                                    </button>

                                    {/* NOTIFY PARENTS */}
                                    <button 
                                        onClick={() => myRecord && onSendSMS(myRecord)}
                                        disabled={!myRecord}
                                        className="flex items-center gap-3 px-8 py-4 rounded-xl font-black bg-white border-2 border-indigo-200 text-indigo-500 hover:bg-indigo-600 hover:text-white transition-all uppercase tracking-widest text-[11px] active:scale-95"
                                        style={{ pointerEvents: 'auto', position: 'relative', zIndex: 20 }}
                                    >
                                        <Mail size={18} />
                                        Notify Parents
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Profile Summary Footer */}
                    <div className="mt-12 pt-8 border-t border-slate-50 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-slate-50 rounded-xl text-slate-400"><User size={20} /></div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Name of the Student</p>
                                <p className="text-sm font-black text-slate-700">{myRecord?.name || user?.username || 'Registering...'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-slate-50 rounded-xl text-slate-400"><ShieldCheck size={20} /></div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Register Number</p>
                                <p className="text-sm font-black text-slate-700 font-mono">{myRecord?.roll || myRecord?.registerNumber || user?.rollNumber || 'TBD'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-slate-50 rounded-xl text-slate-400"><Smartphone size={20} /></div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mobile Number</p>
                                <p className="text-sm font-black text-slate-700 font-mono">{myRecord?.parentPhoneNumber || user?.phoneNumber || 'Unlinked'}</p>
                            </div>
                        </div>
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
        indigo: "gradient-indigo shadow-premium-indigo",
        emerald: "gradient-emerald shadow-premium-emerald",
        rose: "gradient-rose shadow-premium-rose"
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
