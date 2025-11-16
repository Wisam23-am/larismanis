import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { Navbar } from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { RoleProtectedRoute } from "./components/RoleProtectedRoute";
import { LandingPage } from "./pages/LandingPage";
const RefineApp = React.lazy(() => import("./admin/RefineApp").then(m => ({ default: m.RefineApp })));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const HomeBuyer = lazy(() => import("./pages/HomeBuyer").then(m => ({ default: m.HomeBuyer })));
const ProductDetail = lazy(() => import("./pages/ProductDetail").then(m => ({ default: m.ProductDetail })));
const StoreDetail = lazy(() => import("./pages/StoreDetail").then(m => ({ default: m.StoreDetail })));
const DashboardSeller = lazy(() => import("./pages/DashboardSeller").then(m => ({ default: m.DashboardSeller })));
const Maps = lazy(() => import("./pages/Maps").then(m => ({ default: m.Maps })));
const Favorites = lazy(() => import("./pages/Favorites").then(m => ({ default: m.Favorites })));
import { useAuth } from "./contexts/AuthContext";
import { initializeDummyAccounts } from "./data/dummyAccounts";
// Orders removed

// Initialize dummy accounts on app load
initializeDummyAccounts();

function App() {
  const Root: React.FC = () => {
    const { isAuthenticated, isBuyer, isSeller } = useAuth();
    // If logged in, send to the correct home
    if (isAuthenticated) {
      if (isBuyer) return <Navigate to="/home" replace />;
      if (isSeller) return <Navigate to="/dashboard-seller" replace />;
    }
    // Default root shows LandingPage
    return <LandingPage />;
  };

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <main id="main-content" className="pt-20" role="main" aria-live="polite">
            <Suspense fallback={<div className="p-8 text-center text-neutral-700">Memuat...</div>}>
            <Routes>
          {/* Root: show HomeBuyer when not logged-in; redirect when logged-in */}
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Buyer Routes - Only for buyers */}
          <Route
            path="/home"
            element={
              <RoleProtectedRoute allowedRole="buyer">
                <HomeBuyer />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <RoleProtectedRoute allowedRole="buyer">
                <ProductDetail />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/store/:id"
            element={
              <RoleProtectedRoute allowedRole="buyer">
                <StoreDetail />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/maps"
            element={
              <ProtectedRoute>
                <Maps />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <RoleProtectedRoute allowedRole="buyer">
                <Favorites />
              </RoleProtectedRoute>
            }
          />

          {/* Seller Routes - Only for sellers */}
          <Route
            path="/dashboard-seller"
            element={
              <RoleProtectedRoute allowedRole="seller">
                <DashboardSeller />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <RoleProtectedRoute allowedRole="seller">
                <DashboardSeller />
              </RoleProtectedRoute>
            }
          />
          {/* Cart route removed - ordering via WhatsApp */}
          {/* Orders route removed */}
          {/* Admin (Refine) */}
          <Route path="/admin/*" element={<RefineApp />} />
            </Routes>
            </Suspense>
          </main>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
