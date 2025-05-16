'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminPage() {
    const [visitors, setVisitors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVisitors = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/reviewpost');
                console.log(res);
                setVisitors(res.data.posts);
            } catch (err) {
                console.error('Failed to fetch visitors:', err);
                alert('Error fetching visitor data');
            } finally {
                setLoading(false);
            }
        };

        fetchVisitors();
    }, []);

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 z-0 animate-gradient bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-[length:300%_300%]" />

            {/* Overlay for content */}
            <div className="relative z-10 p-8">
                <h1 className="text-4xl font-extrabold text-center text-white drop-shadow-lg mb-10">
                    Admin Dashboard
                </h1>

                {loading ? (
                    <p className="text-center text-lg text-white drop-shadow-md">Loading visitors...</p>
                ) : (
                    <div className="overflow-x-auto bg-white bg-opacity-90 rounded-xl shadow-2xl p-4">
                        <table className="w-full border-collapse rounded-xl">
                            <thead className="bg-slate-800 text-white">
                                <tr>
                                    <th className="p-4">#</th>
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Flat No</th>
                                    <th className="p-4">Purpose</th>
                                    <th className="p-4">Mobile</th>
                                    <th className="p-4">Visit Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {visitors.map((v, idx) => (
                                    <tr
                                        key={v.id}
                                        className="text-center border-b border-slate-300 hover:bg-slate-100 transition"
                                    >
                                        <td className="p-4 text-slate-800 font-semibold">{idx + 1}</td>
                                        <td className="p-4 text-slate-800">{v.Name}</td>
                                        <td className="p-4 text-slate-800">{v.Flat_no}</td>
                                        <td className="p-4 text-slate-800">{v.Purpose}</td>
                                        <td className="p-4 text-slate-800">{v.Mobile}</td>
                                        <td className="p-4 text-slate-800">
                                            {new Date(v.createdAt).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
