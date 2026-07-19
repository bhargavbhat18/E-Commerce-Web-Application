import { useState } from 'react';
import apiClient from '../api/apiClient';
import { Gift, Loader2 } from 'lucide-react';

export default function AiGiftFinder() {
  const [formData, setFormData] = useState({
    budget: '',
    recipientAge: '',
    gender: 'Any',
    interests: '',
    occasion: 'Birthday'
  });
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        budget: parseFloat(formData.budget),
        recipientAge: parseInt(formData.recipientAge),
        interests: formData.interests.split(',').map(i => i.trim())
      };
      const res = await apiClient.post('/ai/gift-finder', payload);
      setResult(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-full mb-4">
          <Gift className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">AI Gift Finder</h1>
        <p className="text-lg text-gray-600">Tell us a bit about the recipient, and our AI will recommend the perfect gifts.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Occasion</label>
              <select 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={formData.occasion} onChange={e => setFormData({...formData, occasion: e.target.value})}
              >
                <option>Birthday</option>
                <option>Anniversary</option>
                <option>Wedding</option>
                <option>Graduation</option>
                <option>Just Because</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Age</label>
                <input 
                  type="number" required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={formData.recipientAge} onChange={e => setFormData({...formData, recipientAge: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Budget (₹)</label>
                <input 
                  type="number" required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Interests (comma separated)</label>
              <input 
                type="text" placeholder="Gaming, Reading, Fitness..." required
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={formData.interests} onChange={e => setFormData({...formData, interests: e.target.value})}
              />
            </div>

            <button 
              type="submit" disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex justify-center items-center gap-2"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Sparkles className="w-5 h-5" /> Find Magic Gifts</>}
            </button>
          </form>
        </div>

        {/* Results */}
        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200 h-full min-h-[400px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full text-purple-600 space-y-4">
              <Loader2 className="w-12 h-12 animate-spin" />
              <p className="font-medium animate-pulse">Our AI is brewing the perfect gift ideas...</p>
            </div>
          ) : result ? (
            <div className="prose prose-purple max-w-none">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Gift className="text-purple-500" /> Recommendations
              </h3>
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                {result}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <Gift className="w-16 h-16 mb-4 opacity-20" />
              <p>Fill the form to see AI recommendations</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
