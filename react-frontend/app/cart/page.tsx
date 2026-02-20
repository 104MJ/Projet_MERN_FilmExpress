"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import cartService from "@/services/cart.service";
import orderService from "@/services/order.service";
import CartItem from "@/components/cartItem";
import Link from "next/link";

export default function CartPage() {
    const router = useRouter();
    const [cart, setCart] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [checkingOut, setCheckingOut] = useState(false);

    const fetchCart = async () => {
        try {
            setLoading(true);
            const data = await cartService.getCart();
            // Le backend renvoie { success: true, message: "...", data: { user: "...", movies: [...] } }
            setCart(data.data);
        } catch (err: any) {
            setError("Impossible de charger votre panier");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const handleRemove = async (movieId: string) => {
        try {
            await cartService.removeFromCart(movieId);
            // Refresh cart after removal
            fetchCart();
        } catch (err) {
            console.error("Erreur lors de la suppression du film", err);
        }
    };

    const handleCheckout = async () => {
        try {
            setCheckingOut(true);
            await orderService.checkout();
            alert("Commande validée avec succès !");
            router.push("/orders");
        } catch (err: any) {
            setError(err.response?.data?.message || "Erreur lors de la validation de la commande");
        } finally {
            setCheckingOut(false);
        }
    };

    const totalPrice = cart?.movies?.reduce((acc: number, movie: any) => acc + movie.prix, 0) || 0;

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff4b2b]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8 font-sans">
            <div className="max-w-4xl mx-auto">
                <header className="flex items-center justify-between mb-12">
                    <h1 className="text-4xl font-black text-[#ff4b2b] tracking-tighter uppercase">Mon Panier</h1>
                    <Link href="/" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        <span>Continuer mes achats</span>
                    </Link>
                </header>

                {error && (
                    <div className="bg-red-900/30 border border-red-500 text-red-200 p-4 rounded-xl mb-8">
                        {error}
                    </div>
                )}

                {cart?.movies?.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-4">
                            {cart.movies.map((movie: any) => (
                                <CartItem key={movie._id} movie={movie} onRemove={handleRemove} />
                            ))}
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-[#1a1a1a] p-8 rounded-3xl border border-gray-800 sticky top-8">
                                <h2 className="text-xl font-bold mb-6 border-b border-gray-800 pb-4">Résumé</h2>
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-gray-400">
                                        <span>Articles ({cart.movies.length})</span>
                                        <span>{totalPrice.toFixed(2)} €</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400">
                                        <span>Livraison</span>
                                        <span className="text-green-500">Gratuite</span>
                                    </div>
                                    <div className="border-t border-gray-800 pt-4 flex justify-between items-end">
                                        <span className="text-lg font-bold">Total</span>
                                        <span className="text-3xl font-black text-[#ff4b2b]">{totalPrice.toFixed(2)} €</span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    disabled={checkingOut}
                                    className="w-full bg-[#ff4b2b] text-white font-bold py-4 rounded-full hover:scale-105 transition transform active:scale-95 disabled:bg-gray-600 shadow-[0_0_20px_rgba(255,75,43,0.3)]"
                                >
                                    {checkingOut ? "Traitement..." : "Valider la commande"}
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-24 bg-[#1a1a1a] rounded-3xl border border-gray-800 border-dashed">
                        <div className="mb-6 flex justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-400 mb-4">Votre panier est vide</h2>
                        <Link href="/" className="inline-block bg-[#ff4b2b] text-white font-bold px-8 py-3 rounded-full hover:bg-[#ff3b1b] transition-colors">
                            Découvrir les films
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
