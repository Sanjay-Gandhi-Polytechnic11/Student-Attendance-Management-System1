import React from 'react';
import { motion } from 'framer-motion';
import {
    Calendar,
    Users,
    Plane,
    TrendingUp,
    MoreHorizontal
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const data = [
    { name: 'Mon', value: 42 },
    { name: 'Tue', value: 65 },
    { name: 'Wed', value: 78 },
    { name: 'Thu', value: 85 },
    { name: 'Fri', value: 68 },
    { name: 'Sat', value: 45 },
    { name: 'Sun', value: 72 },
];

const Dashboard = ({ students = [], onSendSMS }) => {
    const totalStudents = students.length || 108;
    const presentCount = students.filter(s => s.status === 'Present').length || 84;
    const absentCount = students.filter(s => s.status === 'Absent').length || 16;
    const leaveCount = 8;

    const recentAttendance = [
        { name: 'John Doe', date: '2024-04-24', status: 'Present' },
        { name: 'Jon Boster', date: '2024-04-24', status: 'Present' },
        { name: 'Claire Luder', date: '2024-04-23', status: 'Absent' },
        { name: 'John Hang', date: '2024-04-22', status: 'Present' },
        { name: 'Jon Davis', date: '2024-04-21', status: 'Present' },
        { name: 'Mart Johs', date: '2024-04-20', status: 'Absent' },
        { name: 'Alex Praiter', date: '2024-04-19', status: 'Present' },
        { name: 'Ava Davis', date: '2024-04-18', status: 'Present' },
    ];

    return (
        <div className="flex-col gap-medium">
            <div className="stats-grid">
                <StatCard icon={<Calendar />} value={presentCount} label="Verified Present" trend="+2.4%" />
                <StatCard icon={<Users />} value={absentCount} label="Absent Records" trend="-1.2%" />
                <StatCard icon={<Plane />} value={leaveCount} label="Faculty on Leave" trend="Stable" />
                <StatCard icon={<TrendingUp />} value={totalStudents} label="Total Enrollment" trend="+12" />
            </div>

            <div className="flex-row gap-medium" style={{ alignItems: 'flex-start' }}>
                <div className="card" style={{ flex: 2 }}>
                    <div className="flex-row justify-between items-center mb-medium">
                        <h3 style={{ fontWeight: 800, fontSize: '22px' }}>Operational Attendance Analytics</h3>
                        <button style={{ background: 'none', border: 'none', color: '#94a3b8' }}><MoreHorizontal /></button>
                    </div>

                    <div style={{ height: '350px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 14 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 14 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#2563eb"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorVal)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card" style={{ flex: 1 }}>
                    <h3 style={{ fontWeight: 800, fontSize: '20px' }} className="mb-medium">Live Feed</h3>
                    <table className="attendance-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentAttendance.slice(0, 6).map((item, i) => (
                                <tr key={i}>
                                    <td style={{ fontWeight: 600, fontSize: '16px' }}>{item.name}</td>
                                    <td>
                                        <span className={`status-tag ${item.status === 'Present' ? 'status-present' : 'status-absent'}`} style={{ fontSize: '13px' }}>
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button className="btn w-full mt-large" style={{ background: '#f8fafc', color: '#64748b', fontSize: '15px' }}>
                        View Detailed Records
                    </button>
                    <button 
                        onClick={onSendSMS}
                        className="btn w-full mt-small" 
                        style={{ background: '#4f46e5', color: '#ffffff', fontSize: '15px', fontWeight: '800' }}
                    >
                        Send Attendance SMS
                    </button>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon, value, label, trend }) => (
    <div className="stat-card">
        <div className="stat-icon">{icon}</div>
        <div>
            <div className="flex-row items-center gap-small">
                <span className="stat-value" style={{ fontSize: '32px' }}>{value}</span>
                <span style={{ fontSize: '13px', fontWeight: 800, color: trend.includes('+') ? '#10b981' : (trend === 'Stable' ? '#64748b' : '#ef4444') }}>
                    {trend}
                </span>
            </div>
            <p className="stat-label" style={{ fontSize: '16px' }}>{label}</p>
        </div>
    </div>
);

export default Dashboard;
