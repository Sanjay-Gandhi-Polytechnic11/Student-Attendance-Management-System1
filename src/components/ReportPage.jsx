import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileText,
    Download,
    Filter,
    Calendar,
    PieChart,
    BarChart3,
    Search,
    ChevronDown,
    ExternalLink,
    Printer,
    TrendingUp,
    CheckCircle2,
    XCircle,
    Clock,
    ShieldCheck
} from 'lucide-react';

import { generateCSV, generateTextReport, downloadFile } from '../utils/reportUtils';

const ReportPage = ({ records = [] }) => {
    const [reportType, setReportType] = useState('Daily');

    const handleDownloadRegistry = () => {
        if (records.length === 0) {
            alert("No data available to export.");
            return;
        }
        const csvContent = generateCSV(records);
        downloadFile(csvContent, `Institutional_Registry_${new Date().toISOString().split('T')[0]}.csv`, 'text/csv;charset=utf-8;');
    };

    const handleGenerateReport = () => {
        if (records.length === 0) {
            alert("No data available to generate report.");
            return;
        }

        const reportText = generateTextReport(records, reportType);
        downloadFile(reportText, `SGPB_Report_${new Date().toISOString().split('T')[0]}.txt`, 'text/plain');
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
            {/* Report Controls */}
            <motion.div
                className="bg-white border border-slate-100 rounded-[32px] p-6 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm"
                variants={itemVariants}
            >
                <div className="flex bg-slate-50 p-1 rounded-2xl w-full md:w-auto border border-slate-100">
                    {['Daily', 'Weekly', 'Monthly', 'Annual'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setReportType(type)}
                            className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex-1 md:flex-none ${reportType === type
                                ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200'
                                : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <button className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-2.5 rounded-xl text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition-all uppercase tracking-widest outline-none">
                        <Calendar size={16} className="text-indigo-600" />
                        Range Selection
                        <ChevronDown size={14} />
                    </button>
                    <button className="btn-primary py-2.5 px-6 gap-3 text-[11px] shadow-indigo-100">
                        <Filter size={18} />
                        Apply Protocol
                    </button>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Statistics Widgets */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <ReportWidget
                        title="Agg. Attendance"
                        value={records.length > 0 ? `${((records.filter(s => s.status === 'Present').length / records.length) * 100).toFixed(1)}%` : "0%"}
                        sub="Real-time reliability rating"
                        icon={<TrendingUp className="text-indigo-600" size={24} />}
                        variants={itemVariants}
                    />
                    <ReportWidget
                        title="Active Sessions"
                        value={records.filter(s => s.status === 'Present').length}
                        sub="Verified student encounters"
                        icon={<PieChart className="text-emerald-600" size={24} />}
                        variants={itemVariants}
                    />
                    <ReportWidget
                        title="Identified Units"
                        value={[...new Set(records.map(s => s.studentClass))].length}
                        sub="Active organizational sectors"
                        icon={<BarChart3 className="text-purple-600" size={24} />}
                        variants={itemVariants}
                    />
                    <ReportWidget
                        title="Void Records"
                        value={records.filter(s => s.status === 'Absent').length}
                        sub="Punctuality deviation"
                        icon={<Clock className="text-rose-600" size={24} />}
                        variants={itemVariants}
                    />
                </div>

                {/* Export Sidebar */}
                <motion.div className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm" variants={itemVariants}>
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em]">Data Archives</h3>
                        <ShieldCheck size={18} className="text-indigo-600/50" />
                    </div>
                    <div className="space-y-3">
                        <ReportFile name="Registry_Jan24.pdf" date="Jan 15, 2024" size="1.2 MB" />
                        <ReportFile name="Core_Analysis_Q1.xlsx" date="Jan 10, 2024" size="845 KB" />
                        <ReportFile name="Security_Audit.pdf" date="Jan 02, 2024" size="2.4 MB" />
                    </div>

                    <div className="mt-8 space-y-4">
                        <button
                            onClick={handleDownloadRegistry}
                            className="w-full btn h-14 justify-center gap-3 bg-slate-50 border border-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all font-black uppercase tracking-widest text-[11px]"
                        >
                            <FileText size={18} /> Download Registry
                        </button>

                        <button
                            onClick={handleGenerateReport}
                            className="w-full btn-primary justify-center h-14 gap-3 shadow-xl shadow-indigo-200"
                        >
                            <Download size={18} /> Generate Report
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Main Report Table */}
            <motion.div className="bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-sm" variants={itemVariants}>
                <div className="p-8 flex justify-between items-center border-b border-slate-50">
                    <div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">Granular Intelligence Summary</h3>
                        <div className="flex items-center gap-3 mt-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Archive Generation: {new Date().toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="p-3 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 transition-all text-slate-400 hover:text-slate-600">
                            <Printer size={18} />
                        </button>
                        <button className="p-3 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 transition-all text-slate-400 hover:text-slate-600">
                            <ExternalLink size={18} />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="data-table">
                        <thead>
                            <tr className="border-b border-slate-50 text-slate-400">
                                <th className="py-6 px-8 text-left text-[10px] font-black uppercase tracking-widest">Unit / Sector Identification</th>
                                <th className="py-6 text-left text-[10px] font-black uppercase tracking-widest">Registry Total</th>
                                <th className="py-6 text-left text-[10px] font-black uppercase tracking-widest">Active</th>
                                <th className="py-6 text-left text-[10px] font-black uppercase tracking-widest">Void</th>
                                <th className="py-6 text-left text-[10px] font-black uppercase tracking-widest">Delayed</th>
                                <th className="py-6 px-8 text-right text-[10px] font-black uppercase tracking-widest">Operational Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(() => {
                                const classData = {};
                                records.forEach(s => {
                                    if (!classData[s.studentClass]) {
                                        classData[s.studentClass] = { total: 0, present: 0, absent: 0, late: 0 };
                                    }
                                    classData[s.studentClass].total++;
                                    if (s.status === 'Present') classData[s.studentClass].present++;
                                    else if (s.status === 'Absent') classData[s.studentClass].absent++;
                                    else if (s.status === 'Late') classData[s.studentClass].late++;
                                });

                                const colors = ['bg-indigo-600', 'bg-emerald-600', 'bg-rose-600', 'bg-purple-600', 'bg-amber-600'];

                                return Object.entries(classData).map(([className, stats], idx) => {
                                    const rate = stats.total > 0 ? ((stats.present / stats.total) * 100).toFixed(0) + '%' : '0%';
                                    return (
                                        <SummaryRow
                                            key={className}
                                            sector={className}
                                            total={stats.total}
                                            present={stats.present}
                                            absent={stats.absent}
                                            late={stats.late}
                                            rate={rate}
                                            color={colors[idx % colors.length]}
                                        />
                                    );
                                });
                            })()}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </motion.div>
    );
};

const ReportWidget = ({ title, value, sub, icon, variants }) => (
    <motion.div
        className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm group"
        variants={variants}
        whileHover={{ y: -5 }}
    >
        <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 text-slate-600">
                {icon}
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100">
                <span className="w-1 h-1 rounded-full bg-indigo-600"></span>
                <span className="text-[8px] font-black text-indigo-600 uppercase tracking-widest">Operational</span>
            </div>
        </div>
        <h4 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">{title}</h4>
        <p className="text-3xl font-black mt-1 text-slate-900 tracking-tight">{value}</p>
        <p className="text-[10px] text-slate-500 mt-3 font-bold uppercase tracking-widest flex items-center gap-3">
            <CheckCircle2 size={12} className="text-indigo-600" />
            {sub}
        </p>
    </motion.div>
);

const ReportFile = ({ name, date, size }) => (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-100 hover:bg-indigo-50/30 transition-all cursor-pointer">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center group-hover:text-indigo-600 transition-colors">
                <FileText size={18} />
            </div>
            <div>
                <p className="text-[12px] font-bold text-slate-700 truncate w-32 tracking-tight">{name}</p>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{date} • {size}</p>
            </div>
        </div>
        <Download size={14} className="text-slate-300 group-hover:text-indigo-600 transition-all" />
    </div>
);

const SummaryRow = ({ sector, total, present, absent, late, rate, color }) => (
    <tr className="border-b border-slate-50 group hover:bg-slate-50 transition-colors">
        <td className="py-6 px-8">
            <div className="flex items-center gap-4">
                <div className={`w-2 h-6 rounded-full ${color}`}></div>
                <span className="font-bold text-slate-900 tracking-tight">{sector}</span>
            </div>
        </td>
        <td className="py-6 font-mono text-[11px] font-bold text-slate-500">{total} Units</td>
        <td className="py-6 font-mono text-[11px] font-bold text-emerald-600">+{present} Active</td>
        <td className="py-6 font-mono text-[11px] font-bold text-rose-600">-{absent} Void</td>
        <td className="py-6 font-mono text-[11px] font-bold text-amber-600">!{late} Sync</td>
        <td className="py-6 px-8">
            <div className="flex items-center justify-end gap-4">
                <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden border border-slate-50">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: rate }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full ${color}`}
                    ></motion.div>
                </div>
                <span className="font-black text-[12px] text-slate-900 w-10 text-right">{rate}</span>
            </div>
        </td>
    </tr>
);

export default ReportPage;
