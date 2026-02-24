import React from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    BarChart3,
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
    UserPlus,
    CheckCircle2,
    XCircle,
    Info,
    BookOpen
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
    Legend
} from 'recharts';
import { generateCSV, generateTextReport, downloadFile } from '../utils/reportUtils';

const HodDashboard = ({ onNavigate, students = [], onSendSMS }) => {
    // Live calculated data from students prop
    const totalStudentsCount = students.length || 120;
    const presentCount = students.filter(s => s.status === 'Present').length || 100;
    const absentCount = students.filter(s => s.status === 'Absent').length || 12;
    const onLeaveCount = students.filter(s => s.status === 'Late' || s.status === 'Leave').length || 8;

    const overallPercentage = Math.round((presentCount / totalStudentsCount) * 100);

    const distributionData = [
        { name: 'Present', value: presentCount, color: '#2563eb' },
        { name: 'Absent', value: absentCount, color: '#f43f5e' },
        { name: 'On Leave', value: onLeaveCount, color: '#f59e0b' },
    ];

    const monthlyAttendanceData = [
        { name: 'J', value: 45 },
        { name: 'F', value: 52 },
        { name: 'M', value: 61 },
        { name: 'A', value: 75 },
        { name: 'M', value: 82 },
        { name: 'J', value: 78 },
        { name: 'J', value: 95 },
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
            {/* Title Section */}
            <motion.div variants={itemVariants} className="px-2 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <h1 className="text-5xl font-bold text-slate-900">
                    HOD Dashboard
                </h1>

                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                        <ShieldCheck size={12} className="text-indigo-600" />
                        Institutional Sync Active
                    </span>
                </div>
            </motion.div>

            {/* Institutional Filters */}
            <motion.div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 mx-2" variants={itemVariants}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="space-y-3">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                            <Cpu size={14} className="text-indigo-500" /> Department
                        </label>
                        <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-4 text-xs font-bold text-slate-700 outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer">
                            <option value="">All Departments</option>
                            <option>Computer Science</option>
                            <option>Electrical Eng</option>
                            <option>Mechanical Eng</option>
                        </select>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                            <GitBranch size={14} className="text-indigo-500" /> Branch
                        </label>
                        <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-4 text-xs font-bold text-slate-700 outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer">
                            <option value="">All Branches</option>
                            <option>CSE</option>
                            <option>ECE</option>
                            <option>EEE</option>
                        </select>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                            <Calendar size={14} className="text-indigo-500" /> Semester
                        </label>
                        <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-4 text-xs font-bold text-slate-700 outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer">
                            <option value="">All Semesters</option>
                            <option>Semester I</option>
                            <option>Semester II</option>
                            <option>Semester III</option>
                            <option>Semester IV</option>
                        </select>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
                            <BookOpen size={14} className="text-indigo-500" /> Subject
                        </label>
                        <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-4 text-xs font-bold text-slate-700 outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer">
                            <option value="">All Subjects</option>
                            <option>Advanced Algorithms</option>
                            <option>Full Stack Web Dev</option>
                            <option>Internet of Things</option>
                        </select>
                    </div>
                </div>
            </motion.div>

            {/* 2. TOP STATS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2">
                <StatCard
                    label="Total"
                    value={totalStudentsCount.toString()}
                    bgColor="#EEF2FF"
                    textColor="#1e293b"
                    variants={itemVariants}
                />
                <StatCard
                    label="On Leave"
                    value={onLeaveCount.toString()}
                    bgColor="#F8FAFC"
                    textColor="#1e293b"
                    variants={itemVariants}
                />
                <StatCard
                    label="Present"
                    value={presentCount.toString()}
                    bgColor="#EEF2FF"
                    textColor="#1e293b"
                    variants={itemVariants}
                />
            </div>

            {/* 3. CHARTS SECTIONS */}
            <div className="grid grid-cols-1 gap-8 px-2">
                {/* 3.1 ATTENDANCE OVERVIEW */}
                <motion.div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100" variants={itemVariants}>
                    <h2 className="text-2xl font-bold text-slate-900 mb-10">
                        Attendance Overview
                    </h2>

                    <div className="flex flex-col md:flex-row items-center justify-start gap-16">
                        <div className="w-56 h-56 relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={distributionData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={95}
                                        paddingAngle={0}
                                        dataKey="value"
                                        startAngle={90}
                                        endAngle={450}
                                    >
                                        {distributionData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="text-5xl font-bold text-slate-900">{overallPercentage}%</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6 min-w-[200px]">
                            {distributionData.map(entry => (
                                <div key={entry.name} className="flex items-center justify-between gap-12">
                                    <div className="flex items-center gap-4">
                                        <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: entry.color }}></div>
                                        <span className="text-xl font-medium text-slate-700">{entry.name}</span>
                                    </div>
                                    <span className="text-xl font-bold text-slate-900">
                                        {totalStudentsCount > 0 ? Math.round((entry.value / totalStudentsCount) * 100) : 0}%
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* 3.2 MONTHLY ATTENDANCE */}
                <motion.div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100" variants={itemVariants}>
                    <h2 className="text-2xl font-bold text-slate-900 mb-10">
                        Monthly Attendance
                    </h2>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyAttendanceData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    stroke="#94a3b8"
                                    fontSize={14}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    stroke="#94a3b8"
                                    fontSize={14}
                                    ticks={[0, 1, 2]}
                                />
                                <Tooltip cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>

            {/* 4. STRATEGIC ACTIONS */}
            <motion.div className="px-2" variants={itemVariants}>
                <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-1">Institutional Notifications</h3>
                        <p className="text-sm text-slate-500 font-medium">Broadcast attendance status to all registered parent contact nodes.</p>
                    </div>

                    <button 
                        onClick={onSendSMS}
                        className="flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-indigo-200 group"
                    >
                        <Mail size={20} className="group-hover:scale-110 transition-transform" />
                        Send SMS Notifications
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

const StatCard = ({ label, value, bgColor, textColor, variants }) => (
    <motion.div
        className="rounded-3xl p-8 flex flex-col gap-4"
        style={{ backgroundColor: bgColor }}
        variants={variants}
        whileHover={{ y: -5 }}
    >
        <p className="text-slate-600 text-xl font-bold">{label}</p>
        <h3 className="text-7xl font-bold" style={{ color: textColor }}>{value}</h3>
    </motion.div>
);

export default HodDashboard;
