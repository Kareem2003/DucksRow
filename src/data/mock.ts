export interface Place {
    id: string;
    name: string;
    description: string;
    image: string; // URL or require path
    price: string;
    rating: number;
    reviewsCount: number;
    category: 'Activity' | 'Food' | 'Nightlife' | 'Culture';
    location: string;
    activities: string[];
    images: string[];
    // Detailed Info
    address: string;
    phone: string;
    website: string;
    openingHours: string;
    features: string[];
    coordinates: {
        lat: number;
        lng: number;
    };
}

export interface Plan {
    id: string;
    name: string;
    date: string;
    placesCount: number;
    image: string;
}

export interface Review {
    id: string;
    userName: string;
    userAvatar: string;
    rating: number;
    text: string;
    date: string;
}

export const MOCK_PLACES: Place[] = [
    {
        id: '1',
        name: 'Neo Tokyo Arcade',
        description: 'A futuristic arcade experience with retro games and VR zones. Perfect for a night out with friends. Experience the latest in virtual reality technology alongside classic 80s and 90s arcade cabinets.',
        image: 'https://images.unsplash.com/photo-1511882150382-421056ac8d89?q=80&w=2670&auto=format&fit=crop',
        price: '$$',
        rating: 4.8,
        reviewsCount: 124,
        category: 'Activity',
        location: 'Shibuya District',
        activities: ['VR Gaming', 'Retro Arcade', 'Bar', 'Live DJ'],
        images: [
            'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2670&auto=format&fit=crop'
        ],
        address: '1-23-4 Jinnan, Shibuya-ku, Tokyo 150-0041',
        phone: '+81 3-1234-5678',
        website: 'www.neotokyoarcade.com',
        openingHours: '10:00 AM - 2:00 AM',
        features: ['Free Wi-Fi', 'Bar', 'Restrooms', 'Wheelchair Accessible'],
        coordinates: { lat: 35.6595, lng: 139.7005 }
    },
    {
        id: '2',
        name: 'Sakura Gardens',
        description: 'Peaceful walking paths surrounded by cherry blossoms and koi ponds. A serene escape from the city. Best visited during spring for the full hanami experience, but beautiful year-round.',
        image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=2676&auto=format&fit=crop',
        price: 'Free',
        rating: 4.9,
        reviewsCount: 89,
        category: 'Culture',
        location: 'Ueno Park',
        activities: ['Walking', 'Photography', 'Picnic', 'Tea House'],
        images: [
            'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=2670&auto=format&fit=crop'
        ],
        address: '5-20 Uenokoen, Taito City, Tokyo 110-0007',
        phone: '+81 3-9876-5432',
        website: 'www.sakuragardens.jp',
        openingHours: '6:00 AM - 8:00 PM',
        features: ['Public Restrooms', 'Picnic Areas', 'Vending Machines', 'Pet Friendly'],
        coordinates: { lat: 35.7141, lng: 139.7741 }
    },
    {
        id: '3',
        name: 'Midnight Ramen',
        description: 'Legendary tonkotsu ramen shop open until 4 AM. Expect a line, but it is worth it. Rich, creamy broth simmered for 24 hours served with hand-pulled noodles.',
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=2080&auto=format&fit=crop',
        price: '$',
        rating: 4.7,
        reviewsCount: 2056,
        category: 'Food',
        location: 'Shinjuku',
        activities: ['Dining', 'Late Night'],
        images: [
            'https://images.unsplash.com/photo-1552590635-27c2c2128abf?q=80&w=2670&auto=format&fit=crop'
        ],
        address: '3-17-7 Shinjuku, Shinjuku City, Tokyo 160-0022',
        phone: '+81 3-5555-4444',
        website: 'N/A',
        openingHours: '6:00 PM - 4:00 AM',
        features: ['Cash Only', 'Counter Seating', 'English Menu'],
        coordinates: { lat: 35.6915, lng: 139.7034 }
    },
    {
        id: '4',
        name: 'Skyline Lounge',
        description: 'Rooftop bar with panoramic views of the city skyline. Signature cocktails and jazz music. Dress code enforced. Reservations recommended for window seats.',
        image: 'https://images.unsplash.com/photo-1519671482502-9759101d4561?q=80&w=2670&auto=format&fit=crop',
        price: '$$$',
        rating: 4.6,
        reviewsCount: 340,
        category: 'Nightlife',
        location: 'Roppongi',
        activities: ['Cocktails', 'Live Music', 'Views', 'Date Night'],
        images: [
            'https://images.unsplash.com/photo-1574096079513-d82d23848030?q=80&w=2670&auto=format&fit=crop'
        ],
        address: '6-10-1 Roppongi, Minato City, Tokyo 106-6108',
        phone: '+81 3-7777-8888',
        website: 'www.skylinelounge.com',
        openingHours: '5:00 PM - 1:00 AM',
        features: ['Live Music', 'Outdoor Seating', 'Cocktails', 'Fine Dining'],
        coordinates: { lat: 35.6604, lng: 139.7292 }
    },
    {
        id: '5',
        name: 'Modern Art Museum',
        description: 'Contemporary art exhibitions featuring local and international artists. Rotating galleries every month. Home to the famous "Future World" installation.',
        image: 'https://images.unsplash.com/photo-1507643179173-61b07213387d?q=80&w=2670&auto=format&fit=crop',
        price: '$$',
        rating: 4.5,
        reviewsCount: 56,
        category: 'Culture',
        location: 'Roppongi Hills',
        activities: ['Art', 'Exhibitions', 'Gift Shop'],
        images: [
            'https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2670&auto=format&fit=crop'
        ],
        address: '6-10-1 Roppongi, Minato City, Tokyo 106-6150',
        phone: '+81 3-6666-9999',
        website: 'www.mori.art.museum',
        openingHours: '10:00 AM - 10:00 PM',
        features: ['Gift Shop', 'Audio Guide', 'Cafe', 'Lockers'],
        coordinates: { lat: 35.6604, lng: 139.7298 }
    },
];

export const MOCK_PLANS: Plan[] = [
    {
        id: 'p1',
        name: 'Tokyo Weekend',
        date: 'Oct 12 - 14',
        placesCount: 5,
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2694&auto=format&fit=crop',
    },
    {
        id: 'p2',
        name: 'Date Night',
        date: 'Nov 05',
        placesCount: 2,
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2670&auto=format&fit=crop',
    }
];

export const MOCK_REVIEWS: Review[] = [
    {
        id: 'r1',
        userName: 'Alex Chen',
        userAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        rating: 5,
        text: 'Absolutely insane experience! The VR setup is top-notch.',
        date: '2 days ago',
    },
    {
        id: 'r2',
        userName: 'Sarah Jenkins',
        userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        rating: 4,
        text: 'Great vibe, but a bit crowded on weekends.',
        date: '1 week ago',
    }
];
