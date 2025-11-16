import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Mail, Lock, User, Phone } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [step, setStep] = useState<"role" | "form">("role");
  const [selectedRole, setSelectedRole] = useState<"buyer" | "seller">("buyer");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      alert("Semua field harus diisi!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Password dan konfirmasi password tidak sama!");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password minimal 6 karakter!");
      return;
    }

    // Register
    const success = register(formData.name, formData.email, formData.phone, formData.password, selectedRole);
    
    if (success) {
      alert("Registrasi berhasil! Anda akan diarahkan ke halaman Anda.");
      // Wait for state to update before navigating
      setTimeout(() => {
        // Redirect based on role
        if (selectedRole === "seller") {
          navigate("/dashboard-seller");
        } else {
          navigate("/home");
        }
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-5xl w-full">
        {step === "role" ? (
          // Role Selection Screen
          <>
            {/* Logo/Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Pilih Role Anda</h1>
              <p className="text-gray-600">Daftar sebagai pembeli atau penjual?</p>
            </div>

            {/* Role Selection Cards - Kanan Kiri */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Pembeli Card */}
              <button
                onClick={() => setSelectedRole("buyer")}
                className={`group relative p-8 border-3 rounded-2xl transition-all transform hover:scale-105 bg-white ${
                  selectedRole === "buyer"
                    ? "border-blue-600 shadow-2xl ring-4 ring-blue-200"
                    : "border-gray-300 hover:border-blue-300 shadow-lg hover:shadow-xl"
                }`}
              >
                <div className="text-center">
                  <div className={`text-7xl mb-4 transform transition-transform ${
                    selectedRole === "buyer" ? "scale-110" : "group-hover:scale-110"
                  }`}>
                    🛒
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-3">Pembeli</div>
                  <div className="text-sm text-gray-600 mb-4">
                    Belanja produk UMKM lokal berkualitas
                  </div>
                  <div className="space-y-2 text-sm text-left bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <span className="text-blue-600 font-bold">✓</span>
                      Akses katalog produk lengkap
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <span className="text-blue-600 font-bold">✓</span>
                      Lihat peta toko interaktif
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <span className="text-blue-600 font-bold">✓</span>
                      Simpan produk favorit
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <span className="text-blue-600 font-bold">✓</span>
                      Hubungi penjual via WhatsApp
                    </div>
                  </div>
                </div>
                {selectedRole === "buyer" && (
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-2xl">✓</span>
                  </div>
                )}
              </button>

              {/* Penjual Card */}
              <button
                onClick={() => setSelectedRole("seller")}
                className={`group relative p-8 border-3 rounded-2xl transition-all transform hover:scale-105 bg-white ${
                  selectedRole === "seller"
                    ? "border-green-600 shadow-2xl ring-4 ring-green-200"
                    : "border-gray-300 hover:border-green-300 shadow-lg hover:shadow-xl"
                }`}
              >
                <div className="text-center">
                  <div className={`text-7xl mb-4 transform transition-transform ${
                    selectedRole === "seller" ? "scale-110" : "group-hover:scale-110"
                  }`}>
                    🏪
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-3">Penjual</div>
                  <div className="text-sm text-gray-600 mb-4">
                    Jual produk UMKM Anda secara online
                  </div>
                  <div className="space-y-2 text-sm text-left bg-green-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <span className="text-green-600 font-bold">✓</span>
                      Dashboard penjual lengkap
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <span className="text-green-600 font-bold">✓</span>
                      Kelola produk dengan mudah
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <span className="text-green-600 font-bold">✓</span>
                      Atur informasi toko
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <span className="text-green-600 font-bold">✓</span>
                      Jangkau lebih banyak pembeli
                    </div>
                  </div>
                </div>
                {selectedRole === "seller" && (
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-2xl">✓</span>
                  </div>
                )}
              </button>
            </div>

            {/* Continue Button */}
            <div className="max-w-md mx-auto">
              <button
                onClick={() => setStep("form")}
                className={`w-full py-4 rounded-xl font-bold text-white text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  selectedRole === "buyer"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                }`}
              >
                Lanjutkan sebagai {selectedRole === "buyer" ? "Pembeli" : "Penjual"} →
              </button>
            </div>

            {/* Back to Home */}
            <div className="mt-8 text-center space-y-2">
              <p className="text-sm text-gray-600">
                Sudah punya akun?{" "}
                <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Login di sini
                </Link>
              </p>
              <Link to="/" className="block text-sm text-gray-600 hover:text-gray-900">
                ← Kembali ke Beranda
              </Link>
            </div>
          </>
        ) : (
          // Registration Form
          <div className="max-w-md mx-auto">
            {/* Logo/Header */}
            <div className="text-center mb-8">
              <button
                onClick={() => setStep("role")}
                className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
              >
                ← Ganti Role
              </button>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4">
                {selectedRole === "buyer" ? (
                  <span className="text-3xl">🛒</span>
                ) : (
                  <span className="text-3xl">🏪</span>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Daftar sebagai {selectedRole === "buyer" ? "Pembeli" : "Penjual"}
              </h1>
              <p className="text-gray-600">Lengkapi data Anda</p>
            </div>

            {/* Register Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Masukkan nama lengkap"
                      required
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="nama@email.com"
                      required
                    />
                  </div>
                </div>

                {/* Phone Input */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Nomor WhatsApp
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+62812345678"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Minimal 6 karakter"
                      required
                    />
                  </div>
                </div>

                {/* Confirm Password Input */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Konfirmasi Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ulangi password"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Daftar Sekarang
                </button>
              </form>

              {/* Login Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Sudah punya akun?{" "}
                  <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                    Login di sini
                  </Link>
                </p>
              </div>
            </div>

            {/* Back to Home */}
            <div className="mt-6 text-center">
              <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
                ← Kembali ke Beranda
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
