import { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';
import { Sparkles, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [recommendations, setRecommendations] = useState('');
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products
    apiClient.get('/products').then(res => setProducts(res.data)).catch(console.error);
    // Fetch recommendations for mock user 1
    apiClient.get('/recommendations/1').then(res => setRecommendations(res.data)).catch(console.error);
  }, []);

  const handleAddToCart = async (productId) => {
    if (!isAuthenticated) {
      toast.info('Please sign in to add items to cart');
      navigate('/login');
      return;
    }
    try {
      await apiClient.post(`/cart/${user.userid}/add?productId=${productId}&quantity=1`);
      toast.success('Added to cart!');
      // We could trigger a global event or context update here to refresh navbar cart count
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  return (
    <div className="space-y-12">
      {/* AI Personalized Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 to-purple-800 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <h2 className="text-sm font-bold tracking-widest uppercase text-purple-200">AI Personalized For You</h2>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Discover What You Love
          </h1>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <p className="text-lg text-purple-100 leading-relaxed">
              {recommendations || "Analyzing your style and preferences to bring you the best matches..."}
            </p>
          </div>
        </div>
        
        {/* Abstract decorative shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute -bottom-8 right-40 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      </section>

      {/* Product Grid */}
      <section>
        <div className="flex items-center gap-2 mb-8">
          <TrendingUp className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Trending Now</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length === 0 ? (
             Array(8).fill(0).map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 h-80 rounded-2xl shadow-sm animate-pulse border border-gray-100 dark:border-gray-700"></div>
             ))
          ) : (
            products.map(p => (
              <div key={p.pid} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 dark:border-gray-700">
                <div className="h-48 bg-gray-100 dark:bg-gray-700 overflow-hidden relative">
                  <img src={p.image || `https://picsum.photos/400/300?random=${p.pid}`} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {p.discount > 0 && (
                    <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {p.discount}% OFF
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide font-semibold">{p.category?.name}</p>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2 line-clamp-1">{p.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-extrabold text-gray-900 dark:text-white">₹{p.price}</span>
                    <button 
                      onClick={() => handleAddToCart(p.pid)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
