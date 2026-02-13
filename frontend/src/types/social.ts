export interface SocialUser {
    id: string;
    username: string;
    avatar?: string;
    isFollowing: boolean; // Computed for current user
}

export interface PlanItem {
    id: string;
    name: string; // "Big Tasty"
    price: number; // 120
    currency: string; // "EGP"
}

export interface PlanPlace {
    id: string;
    name: string; // "McDonalds"
    items: PlanItem[];
    votes: number;
    userVote: 'up' | 'down' | null; // Current user's vote
}

export interface SocialPlan {
    id: string;
    title: string;
    description?: string;
    creator: SocialUser;
    isPublic: boolean;
    places: PlanPlace[];
    votes: number;
    userVote: 'up' | 'down' | null;
    createdAt: string;
}
