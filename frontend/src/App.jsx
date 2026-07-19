import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AiGiftFinder from './pages/AiGiftFinder';
import AiChatWidget from './components/AiChatWidget';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageProducts from './pages/admin/ManageProducts';
import ManageUsers from './pages/admin/ManageUsers';
import { ProtectedRoute } from './components/ProtectedRoute';
import Cart from './pages/Cart';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Navbar />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gift-finder" element={<AiGiftFinder />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/cart" element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              } />
              <Route 
                path="/admin/dashboard"  
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/products"  
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <ManageProducts />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/users"  
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <ManageUsers />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <AiChatWidget />
        </div>
        <ToastContainer position="bottom-right" />
      </Router>
    </AuthProvider>
  );
}

export default App;
