"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import authService from "@/services/auth.service";
import Link from "next/link";
import { z } from "zod";

// Définition du schéma de validation
const registerSchema = z.object({
    nom: z.string().min(2, "Le nom est trop court"),
    prenom: z.string().min(2, "Le prénom est trop court"),
    email: z.string().email("Email invalide"),
    password: z.string().min(6, "Le mot de passe doit faire au moins 6 caractères"),
    adresse: z.object({
        rue: z.string().min(1, "La rue est requise"),
        ville: z.string().min(1, "La ville est requise"),
        codePostal: z.string().min(5, "Code postal invalide"),
    }),
});

// Type pour les données du formulaire
type FormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        nom: "",
        prenom: "",
        email: "",
        password: "",
        adresse: {
            rue: "",
            ville: "",
            codePostal: "",
        },
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Fonction pour mettre à jour les champs du formulaire
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name.includes(".")) {
            const [parent, child] = name.split(".");
            setFormData((prev) => ({
                ...prev,
                [parent]: {
                    ...(prev[parent as keyof FormData] as object),
                    [child]: value,
                },
            } as FormData));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            registerSchema.parse(formData);
            await authService.register(formData);
            alert("Inscription réussie ! Connectez-vous maintenant.");
            router.push("/login");
        } catch (err: any) {
            if (err instanceof z.ZodError) {
                setError(err.issues[0].message);
            } else {
                setError(err.response?.data?.message || "Une erreur est survenue lors de l'inscription");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-4 font-sans">
            <div className="bg-[#1a1a1a] p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-800">
                <h1 className="text-4xl font-black mb-6 text-center text-[#ff4b2b] tracking-tighter">
                    REJOINDRE FILMEXPRESS
                </h1>

                {error && (
                    <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Nom</label>
                            <input
                                type="text"
                                name="nom"
                                value={formData.nom}
                                onChange={handleChange}
                                className="block w-full bg-[#2a2a2a] border border-gray-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-[#ff4b2b] outline-none transition"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Prénom</label>
                            <input
                                type="text"
                                name="prenom"
                                value={formData.prenom}
                                onChange={handleChange}
                                className="block w-full bg-[#2a2a2a] border border-gray-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-[#ff4b2b] outline-none transition"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="block w-full bg-[#2a2a2a] border border-gray-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-[#ff4b2b] outline-none transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Mot de passe</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="block w-full bg-[#2a2a2a] border border-gray-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-[#ff4b2b] outline-none transition"
                            required
                        />
                    </div>

                    <div className="border-t border-gray-800 pt-4">
                        <h2 className="text-sm font-semibold mb-3 text-gray-200">Adresse de livraison</h2>
                        <div className="space-y-3">
                            <input
                                type="text"
                                name="adresse.rue"
                                placeholder="Rue et numéro"
                                value={formData.adresse.rue}
                                onChange={handleChange}
                                className="block w-full bg-[#2a2a2a] border border-gray-700 rounded-lg p-2.5 text-white text-sm focus:ring-2 focus:ring-[#ff4b2b] outline-none transition"
                                required
                            />
                            <div className="grid grid-cols-2 gap-2">
                                <input
                                    type="text"
                                    name="adresse.ville"
                                    placeholder="Ville"
                                    value={formData.adresse.ville}
                                    onChange={handleChange}
                                    className="block w-full bg-[#2a2a2a] border border-gray-700 rounded-lg p-2.5 text-white text-sm focus:ring-2 focus:ring-[#ff4b2b] outline-none transition"
                                    required
                                />
                                <input
                                    type="text"
                                    name="adresse.codePostal"
                                    placeholder="Code Postal"
                                    value={formData.adresse.codePostal}
                                    onChange={handleChange}
                                    className="block w-full bg-[#2a2a2a] border border-gray-700 rounded-lg p-2.5 text-white text-sm focus:ring-2 focus:ring-[#ff4b2b] outline-none transition"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#ff4b2b] text-white font-bold p-3 rounded-full hover:scale-105 transition transform active:scale-95 disabled:bg-gray-600 disabled:scale-100 mt-2"
                    >
                        {loading ? "Création du compte..." : "S'inscrire"}
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-400">
                    Déjà un compte ?{" "}
                    <Link href="/login" className="text-[#ff4b2b] font-semibold hover:underline">
                        Se connecter
                    </Link>
                </p>
            </div>
        </div>
    );
}

