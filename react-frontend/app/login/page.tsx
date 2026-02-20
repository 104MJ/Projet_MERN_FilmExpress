"use client";

import React, { useState } from "react";
import authService from "@/services/auth.service";
import { useAuth } from "@/context/authContext";
import Link from "next/link";

export default function LoginPage() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const data = await authService.login({ email, password });
            login(data.data.user, data.data.token);
        } catch (err: any) {
            setError(err.response?.data?.message || "Identifiants incorrects");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-4 font-sans">
            <div className="bg-[#1a1a1a] p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-gray-800">
                <h1 className="text-4xl font-black mb-8 text-center text-[#ff4b2b] tracking-tighter">
                    FILMEXPRESS
                </h1>

                <p className="text-gray-400 text-center mb-6 text-sm">
                    Connectez-vous pour accéder à vos films préférés.
                </p>

                {error && (
                    <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full bg-[#2a2a2a] border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-[#ff4b2b] focus:border-transparent outline-none transition"
                            placeholder="votre@email.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Mot de passe</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full bg-[#2a2a2a] border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-[#ff4b2b] focus:border-transparent outline-none transition"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#ff4b2b] text-white font-bold p-3 rounded-full hover:scale-105 transition transform active:scale-95 disabled:bg-gray-600 disabled:scale-100"
                    >
                        {loading ? "Connexion..." : "Se connecter"}
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-400">
                    Pas encore de compte ?{" "}
                    <Link href="/register" className="text-[#ff4b2b] font-semibold hover:underline">
                        S'inscrire
                    </Link>
                </p>
            </div>
        </div>
    );
}

