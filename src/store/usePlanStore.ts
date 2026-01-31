import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Place, Plan } from '../data/mock';
import * as Crypto from 'expo-crypto';

export interface PlanItem extends Place {
    // Extended place if needed
}

export interface UserPlan extends Plan {
    places: Place[];
    totalBudget: number;
}

interface PlanState {
    plans: UserPlan[];
    addPlan: (name: string, date: string) => void;
    addPlaceToPlan: (planId: string, place: Place) => void;
    removePlaceFromPlan: (planId: string, placeId: string) => void;
    removePlan: (planId: string) => void;
    optimizePlan: (planId: string) => void;
}

const estimatePrice = (price: string): number => {
    switch (price) {
        case 'Free': return 0;
        case '$': return 20;
        case '$$': return 50;
        case '$$$': return 100;
        default: return 0;
    }
};

export const usePlanStore = create<PlanState>()(
    persist(
        (set, get) => ({
            plans: [
                {
                    id: 'p1',
                    name: 'Tokyo Weekend',
                    date: 'Oct 12 - 14',
                    placesCount: 0,
                    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2694&auto=format&fit=crop',
                    places: [],
                    totalBudget: 0,
                }
            ],
            addPlan: (name, date) => {
                const newPlan: UserPlan = {
                    id: Crypto.randomUUID(),
                    name,
                    date,
                    placesCount: 0,
                    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2621&auto=format&fit=crop', // Default image
                    places: [],
                    totalBudget: 0,
                };
                set((state) => ({ plans: [newPlan, ...state.plans] }));
            },
            addPlaceToPlan: (planId, place) => {
                set((state) => {
                    const plans = state.plans.map((plan) => {
                        if (plan.id === planId) {
                            // Check deduplication
                            if (plan.places.some(p => p.id === place.id)) return plan;

                            const updatedPlaces = [...plan.places, place];
                            return {
                                ...plan,
                                places: updatedPlaces,
                                placesCount: updatedPlaces.length,
                                totalBudget: plan.totalBudget + estimatePrice(place.price)
                            };
                        }
                        return plan;
                    });
                    return { plans };
                });
            },
            removePlaceFromPlan: (planId, placeId) => {
                set((state) => {
                    const plans = state.plans.map((plan) => {
                        if (plan.id === planId) {
                            const placeToRemove = plan.places.find(p => p.id === placeId);
                            const updatedPlaces = plan.places.filter(p => p.id !== placeId);
                            return {
                                ...plan,
                                places: updatedPlaces,
                                placesCount: updatedPlaces.length,
                                totalBudget: plan.totalBudget - (placeToRemove ? estimatePrice(placeToRemove.price) : 0)
                            };
                        }
                        return plan;
                    });
                    return { plans };
                });
            },
            removePlan: (planId) => {
                set((state) => ({ plans: state.plans.filter((p) => p.id !== planId) }));
            },
            optimizePlan: (planId) => {
                set((state) => {
                    const plans = state.plans.map((plan) => {
                        if (plan.id === planId) {
                            const categoryOrder = { 'Activity': 0, 'Culture': 1, 'Food': 2, 'Nightlife': 3 };
                            const sortedPlaces = [...plan.places].sort((a, b) => {
                                const orderA = categoryOrder[a.category as keyof typeof categoryOrder] ?? 99;
                                const orderB = categoryOrder[b.category as keyof typeof categoryOrder] ?? 99;
                                return orderA - orderB;
                            });

                            return {
                                ...plan,
                                places: sortedPlaces,
                            };
                        }
                        return plan;
                    });
                    return { plans };
                });
            },
        }),
        {
            name: 'plan-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
