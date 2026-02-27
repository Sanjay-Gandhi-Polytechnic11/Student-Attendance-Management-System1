import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowRight, ShieldCheck, KeyRound, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import { api } from '../api';
import SgpLogo from '../assets/logo.png';

const LoginPage = ({ onLogin, onSwitchToRegister, onBackToHome }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showForgot, setShowForgot] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');
    const [forgotStatus, setForgotStatus] = useState({ type: '', message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const user = await api.login(email, password);
            onLogin(user);
        } catch (err) {
            setError(err.message || 'Invalid credentials. Please verify your email and password.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotSubmit = async (e) => {
        e.preventDefault();
        setForgotStatus({ type: 'loading', message: 'Verifying protocol...' });
        try {
            await api.forgotPassword(forgotEmail);
            setForgotStatus({ type: 'success', message: 'Access link sent! Please check your Gmail inbox.' });
            setTimeout(() => {
                setShowForgot(false);
                setForgotStatus({ type: '', message: '' });
                setForgotEmail('');
            }, 3000);
        } catch (err) {
            setForgotStatus({
                type: 'error',
                message: err.message.includes('not found') || err.message === 'Recovery request failed'
                    ? 'This email ID does not match any registered user account.'
                    : err.message || 'System linkage failed. Please try again later.'
            });
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
            
            <motion.button
                onClick={onBackToHome}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ position: 'fixed', top: '24px', left: '24px', background: 'white', border: '1px solid #e2e8f0', padding: '10px 20px', borderRadius: '12px', fontSize: '13px', fontWeight: 700, color: '#64748b', cursor: 'pointer', zIndex: 100, display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}
            >
                <ArrowRight size={16} style={{ transform: 'rotate(180deg)' }} /> Return Home
            </motion.button>

            <motion.div
                className="login-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                style={{ width: '450px' }}
            >
                <AnimatePresence mode="wait">
                    {!showForgot ? (
                        <motion.div
                            key="login-form"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            <div className="text-center mb-medium">
                                <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>Portal Access</h2>
                                <p style={{ color: '#64748b', marginTop: '8px', fontSize: '14px' }}>Establish a secure institutional session</p>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="input-group">
                                    <label className="input-label">Institutional Email</label>
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

                                <div className="input-group">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                        <label className="input-label" style={{ marginBottom: 0 }}>Access Key</label>
                                        <button
                                            type="button"
                                            onClick={() => setShowForgot(true)}
                                            style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                                        >
                                            Forgot Key?
                                        </button>
                                    </div>
                                    <div style={{ position: 'relative' }}>
                                        <KeyRound size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                        <input
                                            type="password"
                                            className="input-field"
                                            style={{ paddingLeft: '48px' }}
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div style={{ padding: '12px', background: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '8px', marginBottom: '20px' }}>
                                        <p style={{ color: '#991b1b', fontSize: '13px', textAlign: 'center', fontWeight: 600 }}>{error}</p>
                                    </div>
                                )}

                                <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
                                    {isLoading ? 'Authenticating...' : (
                                        <>Establish Session <ArrowRight size={18} /></>
                                    )}
                                </button>
                            </form>

                            <div className="text-center mt-large" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '24px' }}>
                                <p style={{ fontSize: '14px', color: '#64748b' }}>
                                    New to the portal? {' '}
                                    <button
                                        onClick={onSwitchToRegister}
                                        style={{ color: '#2563eb', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}
                                    >
                                        Register Identity
                                    </button>
                                </p>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="forgot-form"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <div className="text-center mb-medium">
                                <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>Recover Access</h2>
                                <p style={{ color: '#64748b', marginTop: '8px', fontSize: '14px' }}>Initiate identity verification protocol</p>
                            </div>

                            <form onSubmit={handleForgotSubmit}>
                                <div className="input-group">
                                    <label className="input-label">Verified Email</label>
                                    <div style={{ position: 'relative' }}>
                                        <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                        <input
                                            type="email"
                                            className="input-field"
                                            style={{ paddingLeft: '48px' }}
                                            placeholder="Enter your registered email"
                                            value={forgotEmail}
                                            onChange={(e) => setForgotEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                {forgotStatus.message && (
                                    <div style={{
                                        padding: '12px',
                                        background: forgotStatus.type === 'success' ? '#f0fdf4' : (forgotStatus.type === 'error' ? '#fef2f2' : '#eff6ff'),
                                        border: `1px solid ${forgotStatus.type === 'success' ? '#dcfce7' : (forgotStatus.type === 'error' ? '#fee2e2' : '#dbeafe')}`,
                                        borderRadius: '8px',
                                        marginBottom: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px'
                                    }}>
                                        {forgotStatus.type === 'success' ? <CheckCircle2 size={16} color="#16a34a" /> : (forgotStatus.type === 'error' ? <AlertCircle size={16} color="#991b1b" /> : <RefreshCw className="animate-spin" size={16} color="#2563eb" />)}
                                        <p style={{
                                            color: forgotStatus.type === 'success' ? '#166534' : (forgotStatus.type === 'error' ? '#991b1b' : '#1e40af'),
                                            fontSize: '13px',
                                            fontWeight: 600
                                        }}>{forgotStatus.message}</p>
                                    </div>
                                )}

                                <button type="submit" className="btn btn-primary w-full" disabled={forgotStatus.type === 'loading'}>
                                    {forgotStatus.type === 'loading' ? 'Verifying...' : 'Reset Access Key'}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setShowForgot(false)}
                                    className="btn w-full"
                                    style={{ marginTop: '12px', background: 'white', color: '#64748b', border: '1px solid #e2e8f0' }}
                                >
                                    Return to Login
                                </button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <div style={{ marginTop: '40px', opacity: 0.5, display: 'flex', gap: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 700, color: '#475569' }}>
                    <ShieldCheck size={14} /> FIPS SECURE
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 700, color: '#475569' }}>
                    <ShieldCheck size={14} /> INSTITUTIONAL GRADE
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
