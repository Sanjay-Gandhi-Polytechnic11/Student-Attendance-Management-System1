import React from 'react';
import { motion } from 'framer-motion';
import {
    CalendarDays,
    Users,
    BadgeCheck,
    Activity,
    PlayCircle,
    FileText,
    Download
} from 'lucide-react';

import { generateCSV, downloadFile } from '../utils/reportUtils';

const StaffDashboard = ({ onNavigateToAttendance, students = [] }) => {
    // Analytics Extraction from live registry
    const totalCount = students.length || 0;
    const presentToday = students.filter(s => s.status === 'Present').length || 0;
    const absentToday = students.filter(s => s.status === 'Absent').length || 0;
    const onLeaveCount = students.filter(s => s.status === 'Late' || s.status === 'Leave').length || 0;
    


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
            className="space-y-8"
            style={{ paddingBottom: '48px' }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* 1. TOP STATS GRID */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
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
                    icon={<Activity className="text-indigo-600" size={24} />}
                    label="Total Enrollment"
                    value={totalCount}
                    trend="+12"
                    trendColor="text-emerald-500"
                    variants={itemVariants}
                />
            </div>



            {/* 3. LIVE FEED SECTION */}
            <motion.div variants={itemVariants} className="px-2" style={{ marginTop: '48px' }}>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-8">Live Feed</h3>
                
                {/* 4. ACTION PROTOCOLS */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                    <ActionCard
                        title="Start Ledger"
                        desc="Open entry"
                        icon={<PlayCircle size={22} />}
                        onClick={() => onNavigateToAttendance('attendance')}
                        color="indigo"
                    />
                    <ActionCard
                        title="Review Leaves"
                        desc="Applications"
                        icon={<BadgeCheck size={22} />}
                        onClick={() => onNavigateToAttendance('leave')}
                        color="amber"
                    />
                    <ActionCard
                        title="Reports"
                        desc="Generate"
                        icon={<FileText size={22} />}
                        onClick={() => onNavigateToAttendance('reports')}
                        color="rose"
                    />
                    <ActionCard
                        title="Export"
                        desc="Download CSV"
                        icon={<Download size={22} />}
                        onClick={() => downloadFile(generateCSV(students), 'Registry_Report.csv')}
                        color="emerald"
                    />

                    <ActionCard
                        title="Profile"
                        desc="Credentials"
                        icon={<Users size={22} />}
                        onClick={() => onNavigateToAttendance('profile')}
                        color="slate"
                    />
                </div>
            </motion.div>
        </motion.div>
    );
};

const OperationalCard = ({ icon, label, value, trend, trendColor, variants }) => (
    <motion.div
        variants={variants}
        className="bg-white border-slate-100 shadow-sm p-6 flex items-center gap-4"
        style={{ borderRadius: '24px', borderStyle: 'solid', borderWidth: '1px' }}
    >
        <div 
            className="flex items-center justify-center bg-blue-50"
            style={{ width: '56px', height: '56px', borderRadius: '16px' }}
        >
            {icon}
        </div>
        <div>
            <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-800 tracking-tighter">{value}</span>
                <span className={`text-[11px] font-black ${trendColor}`}>{trend}</span>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 leading-none">{label}</p>
        </div>
    </motion.div>
);

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
            className={`flex flex-col items-start p-6 border transition-all duration-500 text-left group ${colors[color]}`}
            style={{ borderRadius: '24px', cursor: 'pointer' }}
        >
            <div className="p-3 bg-white rounded-2xl mb-4 group-hover:bg-opacity-20 transition-colors shadow-sm">
                {icon}
            </div>
            <h4 className="font-black text-base tracking-tight mb-1">{title}</h4>
            <p className="text-[11px] font-bold opacity-60 uppercase tracking-widest">{desc}</p>
        </button>
    );
};

export default StaffDashboard;
