"use client";

import React, { useEffect, useState } from "react";
import orderService from "@/services/order.service";
import OrderRow from "@/components/orderRow";
import Link from "next/link";

export default function OrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const data = await orderService.getOrders();
                // Le backend renvoie { success: true, message: "...", data: [...] }
                setOrders(data.data);
            } catch (err: any) {
                setError("Impossible de récupérer vos commandes");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

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
                    <div>
                        <h1 className="text-4xl font-black text-[#ff4b2b] tracking-tighter uppercase">Mes Commandes</h1>
                        <p className="text-gray-500 mt-1 uppercase text-xs tracking-[0.2em] font-bold">Historique de vos achats</p>
                    </div>
                    <Link href="/" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                        <span>Accueil</span>
                    </Link>
                </header>

                {error && (
                    <div className="bg-red-900/30 border border-red-500 text-red-200 p-4 rounded-xl mb-8">
                        {error}
                    </div>
                )}

                {orders.length > 0 ? (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <OrderRow key={order._id} order={order} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-[#1a1a1a] rounded-3xl border border-gray-800 border-dashed">
                        <div className="mb-6 flex justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-400 mb-4">Vous n'avez pas encore passé de commande</h2>
                        <Link href="/" className="inline-block bg-[#ff4b2b] text-white font-bold px-8 py-3 rounded-full hover:bg-[#ff3b1b] transition-colors">
                            Commencer mes achats
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
