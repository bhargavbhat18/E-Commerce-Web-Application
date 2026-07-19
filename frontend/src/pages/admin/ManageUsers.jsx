import React, { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';
import { Ban, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await apiClient.get('/admin/users');
      setUsers(response.data);
    } catch (error) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (id) => {
    try {
      const response = await apiClient.put(`/admin/users/${id}/toggle-status`);
      setUsers(users.map(u => u.userid === id ? response.data : u));
      toast.success(`User ${response.data.active ? 'unblocked' : 'blocked'} successfully`);
    } catch (error) {
      toast.error('Failed to update user status');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Manage Users</h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium">Role</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.userid} className="border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="p-4 font-medium text-gray-900 dark:text-white">{u.name}</td>
                <td className="p-4 text-gray-600 dark:text-gray-300">{u.email}</td>
                <td className="p-4 text-gray-600 dark:text-gray-300">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${u.role === 'ROLE_ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                    {u.role.replace('ROLE_', '')}
                  </span>
                </td>
                <td className="p-4 text-gray-600 dark:text-gray-300">
                  {u.active ? (
                    <span className="text-green-600 flex items-center gap-1"><CheckCircle className="w-4 h-4"/> Active</span>
                  ) : (
                    <span className="text-red-600 flex items-center gap-1"><Ban className="w-4 h-4"/> Blocked</span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => toggleUserStatus(u.userid)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${u.active ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}
                  >
                    {u.active ? 'Block' : 'Unblock'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
