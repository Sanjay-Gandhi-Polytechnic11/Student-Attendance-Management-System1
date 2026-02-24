import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, ArrowRight, ShieldCheck, BadgeCheck, ShieldAlert, ChevronDown, Mail } from 'lucide-react';
import { api } from '../api';
import SgpLogo from '../assets/logo.png';

const RegisterPage = ({ onRegister, onSwitchToLogin }) => {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('TEACHER');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Credential confirmation discrepancy: Pins do not match.');
            return;
        }

        setIsLoading(true);
        try {
            const user = await api.register({
                username,
                password,
                email,
                role: role
            });
            onRegister(user);
        } catch (err) {
            setError('Registration protocol failure: ' + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-bg">
            <motion.div
                className="login-header-banner"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <img src={SgpLogo} alt="Sanjay Gandhi Polytechnic" />
            </motion.div>

            <motion.div
                className="login-card"
                style={{ maxWidth: '550px' }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
            >
                <div className="text-center mb-medium">
                    <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>Portal Onboarding</h2>
                    <p style={{ color: '#64748b', marginTop: '8px', fontSize: '14px' }}>Institutional Access Provisioning</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="input-label">Full Legal Identification</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                            <input
                                type="text"
                                className="input-field"
                                style={{ paddingLeft: '48px' }}
                                placeholder="Surname Name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Institutional Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                            <input
                                type="email"
                                className="input-field"
                                style={{ paddingLeft: '48px' }}
                                placeholder="name@sgpb.edu.in"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '20px' }}>
                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label">Staff Identifier</label>
                            <div style={{ position: 'relative' }}>
                                <BadgeCheck size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                <input
                                    type="text"
                                    className="input-field"
                                    style={{ paddingLeft: '48px' }}
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label">Access Level</label>
                            <div style={{ position: 'relative' }}>
                                <ShieldAlert size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                <select
                                    className="input-field"
                                    style={{ paddingLeft: '48px', appearance: 'none', cursor: 'pointer' }}
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="TEACHER">Staff Member</option>
                                    <option value="HOD">Dept Head (HOD)</option>
                                    <option value="ADMIN">System Admin</option>
                                    <option value="STUDENT">Institutional Learner</option>
                                </select>
                                <ChevronDown size={16} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '20px' }}>
                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label">Security Pin</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                <input
                                    type="password"
                                    className="input-field"
                                    style={{ paddingLeft: '48px' }}
                                    placeholder="••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label">Confirm Pin</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                <input
                                    type="password"
                                    className="input-field"
                                    style={{ paddingLeft: '48px' }}
                                    placeholder="••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div style={{ padding: '12px', background: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '8px', marginBottom: '20px' }}>
                            <p style={{ color: '#991b1b', fontSize: '13px', textAlign: 'center', fontWeight: 600 }}>{error}</p>
                        </div>
                    )}

                    <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
                        {isLoading ? 'Verifying Protocols...' : (
                            <>Initialize Identity <ArrowRight size={18} /></>
                        )}
                    </button>
                </form>

                <div className="text-center mt-large" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '24px' }}>
                    <p style={{ fontSize: '14px', color: '#64748b' }}>
                        Already part of the faculty? {' '}
                        <button
                            onClick={onSwitchToLogin}
                            style={{ color: '#2563eb', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                            Access Portal
                        </button>
                    </p>
                </div>
            </motion.div>

            <div style={{ marginTop: '40px', opacity: 0.5, display: 'flex', gap: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 700, color: '#475569' }}>
                    <ShieldCheck size={14} /> INSTITUTIONAL GATEWAY
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
