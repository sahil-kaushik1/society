'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
export default function VisitorPage() {
  const [name, setName] = useState('');
  const [flat, setFlat] = useState('');
  const [purpose, setPurpose] = useState('');
  const [mobile, setMobile] = useState('');
  const [visits, setVisits] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminName, setAdminName] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const router = useRouter();
  const handleSubmit = async () => {
    if (!/^\d{10}$/.test(mobile)) {
      alert("Mobile number must be exactly 10 digits.");
      return;
    }

    setLoading(true);

    try {
      await axios.post('/api/postreview', {
        Name: name,
        Flat_no: flat,
        Purpose: purpose,
        Mobile: mobile,
      });

      setName('');
      setFlat('');
      setPurpose('');
      setMobile('');

      const res = await axios.post('/api/getpost', { mobile });
      setVisits(res.data.visits || []);
    } catch (err) {
      console.error("Error submitting form", err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = () => {
    if (adminName === 'admin' && adminPass === 'password') {
      router.push("/pages/visits");
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 animate-gradient bg-[linear-gradient(270deg,_#ffafbd,_#ffc3a0,_#2193b0,_#6dd5ed)] bg-[length:600%_600%]"></div>

      {/* Main Form Container */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="max-w-2xl w-full bg-white bg-opacity-90 rounded-2xl shadow-2xl p-8 space-y-6 backdrop-blur-md">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 animate-fade-in-down">
            Visitor Registration
          </h1>

          <div className="space-y-4">
            <div>
              <label className="font-semibold text-lg text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full mt-1 p-3 text-gray-800 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="font-semibold text-lg text-gray-700">Flat Number</label>
              <input
                type="text"
                value={flat}
                onChange={(e) => setFlat(e.target.value)}
                placeholder="Flat No. (e.g. A-101)"
                className="w-full mt-1 p-3 text-gray-800 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="font-semibold text-lg text-gray-700">Purpose</label>
              <input
                type="text"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="Visiting for?"
                className="w-full mt-1 p-3 text-gray-800 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="font-semibold text-lg text-gray-700">Mobile Number</label>
              <input
                type="text"
                value={mobile}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 10 && /^\d*$/.test(value)) {
                    setMobile(value);
                  }
                }}
                placeholder="10-digit mobile number"
                className="w-full mt-1 p-3 text-gray-800 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {(mobile.length != 0 && mobile.length != 10) && (
                <p className="text-red-500 text-sm mt-1">Mobile number must be 10 digits</p>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition duration-200"
            >
              {loading ? 'Submitting...' : 'Submit Visit'}
            </button>
          </div>
        </div>

        {visits.length > 0 && (
          <div className="max-w-3xl w-full mt-10 bg-white bg-opacity-90 p-6 rounded-xl shadow-xl backdrop-blur-md animate-fade-in-up">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Previous Visits</h2>
            <ul className="space-y-3">
              {visits.map((v, idx) => (
                <li key={idx} className="bg-gray-100 rounded-md p-4 shadow-sm text-slate-950">
                  <p><strong>Date:</strong> {new Date(v.createdAt).toLocaleString()}</p>
                  <p><strong>Flat:</strong> {v.Flat_no}</p>
                  <p><strong>Purpose:</strong> {v.Purpose}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Admin Button */}
        <button
          onClick={() => setAdminOpen(true)}
          className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-full shadow-lg hover:bg-gray-800 transition duration-200 z-20"
        >
          Admin
        </button>

        {/* Admin Dialog */}
        {adminOpen && (
          <div className="fixed inset-0 z-30 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm space-y-4 animate-fade-in-up">
              <h3 className="text-xl font-bold text-gray-800 text-center">Admin Login</h3>
              <input
                type="text"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                placeholder="Admin name"
                className="w-full p-2 border border-gray-300 rounded text-slate-950"
              />
              <input
                type="password"
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
                placeholder="Password"
                className="w-full p-2 border border-gray-300 rounded text-slate-950"
              />
              <div className="flex justify-between">
                <button
                  onClick={() => setAdminOpen(false)}
                  className="text-gray-600 hover:underline"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAdminLogin}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-gradient {
          animation: gradient 20s ease infinite;
        }

        .animate-fade-in-down {
          animation: fadeInDown 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
