import React from 'react';
import { motion } from 'framer-motion';
import {
    Calendar,
    Users,
    Plane,
    TrendingUp
} from 'lucide-react';




const Dashboard = ({ students = [] }) => {
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
