const API_BASE_URL = 'http://localhost:9004/api';

export const api = {
    // Auth endpoints
    async login(email, password) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            if (!response.ok) {
                const error = await response.text();
                throw new Error(error || 'Invalid credentials');
            }
            return response.json();
        } catch (error) {
            console.error('Login error:', error);
            if (error.message === 'Failed to fetch') {
                throw new Error('Backend server is unreachable. Please ensure the Spring Boot application is running on port 9004.');
            }
            throw error;
        }
    },

    async forgotPassword(email) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            if (!response.ok) {
                const errorMsg = await response.text();
                throw new Error(errorMsg || 'Recovery request failed');
            }
            return response.json();
        } catch (error) {
            console.error('Forgot password error:', error);
            throw error;
        }
    },

    async register(userData) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            if (!response.ok) {
                const error = await response.text();
                throw new Error(error || 'Registration failed');
            }
            return response.json();
        } catch (error) {
            console.error('Registration error:', error);
            if (error.message === 'Failed to fetch') {
                throw new Error('Backend server is unreachable. Please ensure the Spring Boot application is running on port 9004.');
            }
            throw error;
        }
    },

    async deleteAccount(userId) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/delete/${userId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to delete account: ${response.status} - ${errorText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Delete account error:', error);
            throw error;
        }
    },

    async getUsers() {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/users`);
            if (!response.ok) throw new Error('Failed to fetch users');
            return response.json();
        } catch (error) {
            console.error('Fetch users error:', error);
            throw error;
        }
    },

    // Student endpoints
    async getStudents() {
        try {
            const response = await fetch(`${API_BASE_URL}/students`);
            if (!response.ok) throw new Error('Failed to fetch students');
            return response.json();
        } catch (error) {
            console.error('Fetch students error:', error);
            throw error;
        }
    },

    async updateStudentStatus(id, status, time) {
        try {
            const response = await fetch(`${API_BASE_URL}/students/${id}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status, time })
            });
            if (!response.ok) throw new Error('Failed to update status');
            return response.json();
        } catch (error) {
            console.error('Update status error:', error);
            throw error;
        }
    },

    async updateStudent(id, studentData) {
        try {
            const response = await fetch(`${API_BASE_URL}/students/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(studentData)
            });
            if (!response.ok) throw new Error('Failed to update student');
            return response.json();
        } catch (error) {
            console.error('Update student error:', error);
            throw error;
        }
    },
    async searchStudents(query) {
        try {
            const response = await fetch(`${API_BASE_URL}/students/search?query=${query}`);
            if (!response.ok) throw new Error('Search failed');
            return response.json();
        } catch (error) {
            console.error('Search students error:', error);
            throw error;
        }
    },
    async sendIndividualSms(student) {
        try {
            const response = await fetch(`${API_BASE_URL}/sms/send-individual`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(student)
            });
            // Safely read body as text first to avoid crash on empty/non-JSON responses
            const text = await response.text();
            let data = {};
            try {
                data = text ? JSON.parse(text) : {};
            } catch {
                // Backend returned non-JSON (e.g. HTML error page)
                throw new Error('Server error: ' + (text.substring(0, 120) || 'Empty response'));
            }
            if (!response.ok) throw new Error(data.message || 'Failed to send SMS');
            return data;
        } catch (error) {
            console.error('Send individual SMS error:', error);
            throw error;
        }
    },
    async sendSmsToParents(students) {
        try {
            const response = await fetch(`${API_BASE_URL}/sms/send-bulk`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(students)
            });
            const text = await response.text();
            let data = {};
            try {
                data = text ? JSON.parse(text) : {};
            } catch {
                throw new Error('Server error: ' + (text.substring(0, 120) || 'Empty response'));
            }
            if (!response.ok) throw new Error(data.message || 'Failed to send bulk SMS');
            return data;
        } catch (error) {
            console.error('Send bulk SMS error:', error);
            throw error;
        }
    },
    async addStudent(studentData) {
        try {
            const response = await fetch(`${API_BASE_URL}/students`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(studentData)
            });
            if (!response.ok) throw new Error('Failed to add student');
            return response.json();
        } catch (error) {
            console.error('Add student error:', error);
            throw error;
        }
    }
};

