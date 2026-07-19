import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import apiClient from '../api/apiClient';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cart = () => {
  const { user } = useAuth();
  const [cartSummary, setCartSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      const response = await apiClient.get(`/cart/${user.userid}`);
      setCartSummary(response.data);
    } catch (error) {
      toast.error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (cartId, quantity) => {
    try {
      const response = await apiClient.put(`/cart/${user.userid}/update/${cartId}?quantity=${quantity}`);
      setCartSummary(response.data);
    } catch (error) {
      toast.error('Failed to update quantity');
    }
  };

  const removeItem = async (cartId) => {
    try {
      const response = await apiClient.delete(`/cart/${user.userid}/remove/${cartId}`);
      setCartSummary(response.data);
      toast.success('Item removed');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-[60vh]">Loading cart...</div>;
  }

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] space-y-4">
        <ShoppingBag className="w-16 h-16 text-gray-400" />
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <p className="text-gray-500">Sign in to view your cart</p>
        <Link to="/login" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Sign In</Link>
      </div>
    );
  }

  if (!cartSummary || !cartSummary.items || cartSummary.items.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] space-y-4">
        <ShoppingBag className="w-16 h-16 text-gray-400" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your cart is empty</h2>
        <p className="text-gray-500">Looks like you haven't added anything yet.</p>
        <Link to="/" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartSummary.items.map((item) => (
            <div key={item.id} className="flex gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <img src={item.product.image || 'https://via.placeholder.com/150'} alt={item.product.name} className="w-24 h-24 object-cover rounded-lg" />
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{item.product.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-1">{item.product.description}</p>
                  </div>
                  <p className="font-bold text-lg text-gray-900 dark:text-white">₹{item.product.price}</p>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center space-x-3 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded-md hover:bg-white dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-6 text-center font-medium dark:text-white">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-md hover:bg-white dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="flex items-center text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 sticky top-24">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Order Summary</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal ({cartSummary.items.length} items)</span>
                <span>₹{cartSummary.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discount (10%)</span>
                <span>-₹{cartSummary.discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Estimated Tax (18%)</span>
                <span>₹{cartSummary.tax.toFixed(2)}</span>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>₹{cartSummary.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
