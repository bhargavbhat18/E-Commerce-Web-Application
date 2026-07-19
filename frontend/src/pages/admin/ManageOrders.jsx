import React, { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { toast } from 'react-toastify';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await apiClient.get('/admin/orders');
      setOrders(response.data);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const response = await apiClient.put(`/admin/orders/${id}/status?status=${status}`);
      setOrders(orders.map(o => o.id === id ? response.data : o));
      toast.success('Order status updated');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Manage Orders</h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
              <th className="p-4 font-medium">Order ID</th>
              <th className="p-4 font-medium">User</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Payment</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} className="border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="p-4 font-medium text-gray-900 dark:text-white">{o.orderid}</td>
                <td className="p-4 text-gray-600 dark:text-gray-300">{o.user?.name || 'Unknown'}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    o.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                    o.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {o.status || 'Pending'}
                  </span>
                </td>
                <td className="p-4 text-gray-600 dark:text-gray-300">{o.paymentType}</td>
                <td className="p-4 text-right">
                  <select 
                    value={o.status || 'Pending'} 
                    onChange={(e) => updateStatus(o.id, e.target.value)}
                    className="bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 inline-block ml-auto"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;
