const API_BASE_URL = 'http://localhost:9000/api';

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
                throw new Error('Backend server is unreachable. Please ensure the Spring Boot application is running on port 9000.');
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
                throw new Error('Backend server is unreachable. Please ensure the Spring Boot application is running on port 9000.');
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
    async sendSmsToParents(students) {
        try {
            const response = await fetch(`${API_BASE_URL}/students/send-sms`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(students)
            });
            if (!response.ok) throw new Error('Failed to send SMS');
            return response.text();
        } catch (error) {
            console.error('Send SMS error:', error);
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

