import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Clock,
    BookOpen,
    MapPin,
    User,
    Calendar,
    ChevronLeft,
    ChevronRight,
    Search,
    Cpu,
    Zap,
    LayoutGrid,
    BookMarked
} from 'lucide-react';

const SchedulePage = () => {
    const [selectedDay, setSelectedDay] = useState('Monday');

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const scheduleData = {
        'Monday': [
            { time: '09:00 AM - 10:00 AM', subject: 'Java Programming', room: 'Lab 101', faculty: 'Prof. Shaik', code: 'CS301', color: '#6366f1' },
            { time: '10:00 AM - 11:00 AM', subject: 'Data Structures', room: 'Room 204', faculty: 'Dr. Wilson', code: 'CS302', color: '#10b981' },
            { time: '11:15 AM - 12:15 PM', subject: 'Computer Networks', room: 'Room 305', faculty: 'Ms. Garcia', code: 'CS303', color: '#f59e0b' },
            { time: '01:30 PM - 03:30 PM', subject: 'Web Technologies Lab', room: 'Project Lab', faculty: 'Prof. Shaik', code: 'CS304L', color: '#ec4899' },
        ],
        'Tuesday': [
            { time: '09:00 AM - 10:00 AM', subject: 'Operating Systems', room: 'Room 202', faculty: 'Mr. Chen', code: 'CS305', color: '#2563eb' },
            { time: '10:00 AM - 12:00 PM', subject: 'Software Engineering', room: 'Seminar Hall', faculty: 'Dr. Miller', code: 'CS306', color: '#8b5cf6' },
            { time: '01:30 PM - 02:30 PM', subject: 'Cloud Computing', room: 'Room 401', faculty: 'Ms. Davis', code: 'CS307', color: '#ef4444' },
        ],
        'Wednesday': [
            { time: '09:00 AM - 11:00 AM', subject: 'Java Project Work', room: 'Dev Labs', faculty: 'Prof. Shaik', code: 'PJ301', color: '#6366f1' },
            { time: '11:15 AM - 12:15 PM', subject: 'Data Structures', room: 'Room 204', faculty: 'Dr. Wilson', code: 'CS302', color: '#10b981' },
            { time: '01:30 PM - 03:30 PM', subject: 'Institutional Seminar', room: 'Main Auditorium', faculty: 'Guest Faculty', code: 'SEM01', color: '#94a3b8' },
        ],
        'Thursday': [
            { time: '09:00 AM - 10:00 AM', subject: 'Machine Learning', room: 'AI Hub', faculty: 'Dr. Sarah', code: 'CS401', color: '#f43f5e' },
            { time: '10:00 AM - 11:00 AM', subject: 'Computer Networks', room: 'Room 305', faculty: 'Ms. Garcia', code: 'CS303', color: '#f59e0b' },
            { time: '11:15 AM - 01:15 PM', subject: 'OS Lab', room: 'Lab 102', faculty: 'Mr. Chen', code: 'CS305L', color: '#2563eb' },
        ],
        'Friday': [
            { time: '09:00 AM - 11:00 AM', subject: 'Cyber Security', room: 'Security Lab', faculty: 'Mr. Robert', code: 'CS405', color: '#1e293b' },
            { time: '11:15 AM - 12:15 PM', subject: 'Cloud Computing', room: 'Room 401', faculty: 'Ms. Davis', code: 'CS407', color: '#ef4444' },
            { time: '01:30 PM - 02:30 PM', subject: 'Web Technologies', room: 'Room 202', faculty: 'Prof. Shaik', code: 'CS304', color: '#ec4899' },
        ],
        'Saturday': [
            { time: '09:00 AM - 11:00 AM', subject: 'Soft Skills', room: 'Language Lab', faculty: 'Dr. Maria', code: 'SKL01', color: '#fbbf24' },
            { time: '11:15 AM - 01:15 PM', subject: 'Project Review', room: 'Main Boardroom', faculty: 'HOD', code: 'PJ99', color: '#4f46e5' },
        ]
    };

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
            {/* Header Section */}
            <motion.div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2" variants={itemVariants}>
                <div>
                    <h1 className="text-5xl font-black text-slate-800 tracking-tight mb-1 flex items-center gap-3">
                        <Calendar className="text-indigo-600" size={40} />
                        My <span className="text-indigo-600 italic">Schedule</span>
                    </h1>
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-2 text-[13px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                            <Cpu size={14} className="text-indigo-500" />
                            Session: A-2024
                        </span>
                        <p className="text-[14px] font-medium text-slate-500 underline underline-offset-4 decoration-indigo-500/30">Computer Science Department</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 p-1 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    {days.map(day => (
                        <button
                            key={day}
                            onClick={() => setSelectedDay(day)}
                            className={`px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-[0.1em] transition-all ${selectedDay === day
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                                : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50'
                                }`}
                        >
                            {day.substring(0, 3)}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Main Schedule Grid */}
            <div className="grid grid-cols-1 gap-6">
                {scheduleData[selectedDay] ? scheduleData[selectedDay].map((item, index) => (
                    <motion.div
                        key={`${selectedDay}-${index}`}
                        variants={itemVariants}
                        whileHover={{ y: -4, scale: 1.005 }}
                        className="glass-panel group relative overflow-hidden flex flex-col md:flex-row items-center gap-8 p-1 px-8 min-h-[140px] border-l-[6px]"
                        style={{ borderLeftColor: item.color }}
                    >
                        {/* Time Slot */}
                        <div className="flex flex-col items-center justify-center min-w-[180px] py-6 border-b md:border-b-0 md:border-r border-slate-100">
                            <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:text-indigo-600 transition-colors">
                                <Clock size={24} />
                            </div>
                            <span className="text-[15px] font-black text-slate-800 mt-3 tracking-tight">{item.time}</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Scheduled Slot</span>
                        </div>

                        {/* Subject Details */}
                        <div className="flex-1 py-6">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200 uppercase tracking-widest">{item.code}</span>
                                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: item.color }} />
                            </div>
                            <h3 className="text-2xl font-black text-slate-800 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{item.subject}</h3>
                            <div className="flex flex-wrap items-center gap-6 mt-4">
                                <div className="flex items-center gap-2">
                                    <User size={16} className="text-slate-400" />
                                    <span className="text-sm font-bold text-slate-600">{item.faculty}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} className="text-slate-400" />
                                    <span className="text-sm font-bold text-slate-600">{item.room}</span>
                                </div>
                            </div>
                        </div>

                        {/* Action / Icon */}
                        <div className="hidden lg:flex items-center justify-center px-8">
                            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-200 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all duration-500 group-hover:rotate-12 border border-slate-100">
                                <BookMarked size={32} />
                            </div>
                        </div>
                    </motion.div>
                )) : (
                    <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
                        <p className="text-slate-400 font-black uppercase tracking-widest">No Sessions Assigned for {selectedDay}</p>
                    </div>
                )}
            </div>

            {/* Bottom Info Card */}
            <motion.div variants={itemVariants} className="glass-panel p-8 bg-indigo-50 border-indigo-100 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6 text-left">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100">
                        <LayoutGrid size={28} />
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-slate-800 uppercase tracking-tight">Institutional Protocol Sync</h4>
                        <p className="text-sm text-slate-500 font-medium">All sessions are synchronized with the Central Poly-Node database at 04:00 AM UTC.</p>
                    </div>
                </div>
                <button className="btn btn-primary h-14 px-10 gap-3 group">
                    <BookOpen size={20} className="group-hover:-rotate-12 transition-transform" />
                    <span className="font-black uppercase tracking-widest text-[11px]">Download Syllabus</span>
                </button>
            </motion.div>
        </motion.div>
    );
};

export default SchedulePage;
