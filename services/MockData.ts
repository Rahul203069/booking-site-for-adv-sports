import { Activity, Difficulty, Review } from '../types';

export const CATEGORIES = [
  { name: 'Water Sports', icon: '🌊' },
  { name: 'Trekking', icon: '🥾' },
  { name: 'Flying', icon: '🪂' },
  { name: 'Camping', icon: '⛺' },
  { name: 'Safari', icon: '🦁' },
  { name: 'Snow', icon: '❄️' }
];

export const ACTIVITIES: Activity[] = [
  {
    id: '1',
    title: 'White Water Rafting',
    location: 'Rishikesh, Uttarakhand',
    category: 'Water Sports',
    description: 'Navigate the thrilling rapids of the Ganges River. This 16km stretch offers grade III and IV rapids like "Roller Coaster" and "Golf Course". Perfect for adrenaline junkies.',
    price: 35,
    rating: 4.9,
    reviewCount: 2450,
    images: [
      'https://picsum.photos/seed/rafting1/800/600',
      'https://picsum.photos/seed/rafting2/800/600',
      'https://picsum.photos/seed/rafting3/800/600'
    ],
    difficulty: Difficulty.MODERATE,
    duration: '4 hours',
    vendor: {
      id: 'v1',
      name: 'Ganga Rapids',
      avatarUrl: 'https://i.pravatar.cc/150?img=32',
      joinedDate: '2016',
      rating: 4.8
    },
    coordinates: { lat: 30.0869, lng: 78.2676 },
    amenities: ['Safety Gear', 'Guide', 'Transport', 'GoPro Footage'],
    maxGuests: 8
  },
  {
    id: '2',
    title: 'Paragliding at Bir Billing',
    location: 'Bir, Himachal Pradesh',
    category: 'Flying',
    description: 'Experience the world\'s second-highest paragliding site. Take off from Billing (2400m) and land in Bir, enjoying a 20-30 minute tandem flight with panoramic views of the Dhauladhar range.',
    price: 75,
    rating: 4.9,
    reviewCount: 1890,
    images: [
      'https://picsum.photos/seed/paragliding1/800/600',
      'https://picsum.photos/seed/paragliding2/800/600',
      'https://picsum.photos/seed/paragliding3/800/600'
    ],
    difficulty: Difficulty.MODERATE,
    duration: '45 mins',
    vendor: {
      id: 'v2',
      name: 'Sky High Aero',
      avatarUrl: 'https://i.pravatar.cc/150?img=44',
      joinedDate: '2018',
      rating: 4.9
    },
    coordinates: { lat: 32.0436, lng: 76.7320 },
    amenities: ['Video Recording', 'Insurance', 'Hotel Pickup'],
    maxGuests: 1
  },
  {
    id: '3',
    title: 'Scuba Diving in Havelock',
    location: 'Andaman Islands',
    category: 'Water Sports',
    description: 'Dive into the crystal clear waters of Nemo Reef. Witness vibrant coral gardens, clownfish, and sea turtles. Includes training session for beginners.',
    price: 95,
    rating: 4.8,
    reviewCount: 1200,
    images: [
      'https://picsum.photos/seed/scuba1/800/600',
      'https://picsum.photos/seed/scuba2/800/600',
      'https://picsum.photos/seed/scuba3/800/600'
    ],
    difficulty: Difficulty.EASY,
    duration: '3 hours',
    vendor: {
      id: 'v3',
      name: 'Blue Planet Divers',
      avatarUrl: 'https://i.pravatar.cc/150?img=12',
      joinedDate: '2015',
      rating: 4.9
    },
    coordinates: { lat: 11.9761, lng: 92.9876 },
    amenities: ['Equipment', 'Photos', 'Snacks', 'Certificate'],
    maxGuests: 4
  },
  {
    id: '4',
    title: 'Chadar Trek - Frozen River',
    location: 'Leh, Ladakh',
    category: 'Trekking',
    description: 'The ultimate winter trek on the frozen Zanskar river. Walk on a sheet of ice surrounded by dramatic vertical cliffs. A challenging but life-changing expedition.',
    price: 450,
    rating: 4.7,
    reviewCount: 560,
    images: [
      'https://picsum.photos/seed/chadar1/800/600',
      'https://picsum.photos/seed/chadar2/800/600',
      'https://picsum.photos/seed/chadar3/800/600'
    ],
    difficulty: Difficulty.EXTREME,
    duration: '9 days',
    vendor: {
      id: 'v4',
      name: 'Himalayan Explorers',
      avatarUrl: 'https://i.pravatar.cc/150?img=22',
      joinedDate: '2012',
      rating: 4.6
    },
    coordinates: { lat: 34.1526, lng: 77.5770 },
    amenities: ['All Meals', 'Camping Gear', 'Permits', 'Porter'],
    maxGuests: 12
  },
  {
    id: '5',
    title: 'Skiing in Gulmarg',
    location: 'Gulmarg, Kashmir',
    category: 'Snow',
    description: 'Ride the famous Gulmarg Gondola to Mt. Apharwat and ski down powder slopes. Includes equipment rental and a basic instructor for beginners.',
    price: 120,
    rating: 4.8,
    reviewCount: 930,
    images: [
      'https://picsum.photos/seed/skiing1/800/600',
      'https://picsum.photos/seed/skiing2/800/600',
      'https://picsum.photos/seed/skiing3/800/600'
    ],
    difficulty: Difficulty.MODERATE,
    duration: '6 hours',
    vendor: {
      id: 'v5',
      name: 'Kashmir Alpine',
      avatarUrl: 'https://i.pravatar.cc/150?img=33',
      joinedDate: '2019',
      rating: 4.7
    },
    coordinates: { lat: 34.0484, lng: 74.3805 },
    amenities: ['Ski Gear', 'Instructor', 'Lift Pass', 'Lunch'],
    maxGuests: 6
  },
  {
    id: '6',
    title: 'Camel Safari in Dunes',
    location: 'Jaisalmer, Rajasthan',
    category: 'Safari',
    description: 'Ride camels into the sunset at the Sam Sand Dunes. Enjoy a cultural evening with folk music, dance, and a traditional Rajasthani dinner under the stars.',
    price: 45,
    rating: 4.6,
    reviewCount: 3100,
    images: [
      'https://picsum.photos/seed/camel1/800/600',
      'https://picsum.photos/seed/camel2/800/600',
      'https://picsum.photos/seed/camel3/800/600'
    ],
    difficulty: Difficulty.EASY,
    duration: '5 hours',
    vendor: {
      id: 'v6',
      name: 'Desert Royal',
      avatarUrl: 'https://i.pravatar.cc/150?img=55',
      joinedDate: '2014',
      rating: 4.5
    },
    coordinates: { lat: 26.9157, lng: 70.9083 },
    amenities: ['Dinner', 'Cultural Show', 'Jeep Transfer'],
    maxGuests: 20
  },
  {
    id: '7',
    title: 'Bamboo Rafting in Periyar',
    location: 'Thekkady, Kerala',
    category: 'Safari',
    description: 'A dawn-to-dusk trekking and rafting program through the richest forest tracts of Periyar Tiger Reserve. Spot elephants, bison, and exotic birds.',
    price: 55,
    rating: 4.7,
    reviewCount: 850,
    images: [
      'https://picsum.photos/seed/bamboo1/800/600',
      'https://picsum.photos/seed/bamboo2/800/600',
      'https://picsum.photos/seed/bamboo3/800/600'
    ],
    difficulty: Difficulty.MODERATE,
    duration: '8 hours',
    vendor: {
      id: 'v7',
      name: 'Eco Kerala',
      avatarUrl: 'https://i.pravatar.cc/150?img=68',
      joinedDate: '2017',
      rating: 4.8
    },
    coordinates: { lat: 9.6031, lng: 77.1615 },
    amenities: ['Breakfast', 'Lunch', 'Armed Guard', 'Guide'],
    maxGuests: 10
  },
  {
    id: '8',
    title: 'Rock Climbing at Hampi',
    location: 'Hampi, Karnataka',
    category: 'Trekking',
    description: 'Bouldering capital of India. Navigate the unique granite landscape of Hampi with expert climbers. Suitable for all skill levels.',
    price: 40,
    rating: 4.8,
    reviewCount: 620,
    images: [
      'https://picsum.photos/seed/climbing1/800/600',
      'https://picsum.photos/seed/climbing2/800/600',
      'https://picsum.photos/seed/climbing3/800/600'
    ],
    difficulty: Difficulty.HARD,
    duration: '3 hours',
    vendor: {
      id: 'v8',
      name: 'Hampi Boulders',
      avatarUrl: 'https://i.pravatar.cc/150?img=15',
      joinedDate: '2016',
      rating: 4.9
    },
    coordinates: { lat: 15.3350, lng: 76.4600 },
    amenities: ['Climbing Shoes', 'Chalk', 'Crash Pads', 'Instructor'],
    maxGuests: 5
  },
  {
    id: '9',
    title: 'Surfing in Varkala',
    location: 'Varkala, Kerala',
    category: 'Water Sports',
    description: 'Catch the waves at the beautiful Black Sand Beach. 90-minute beginner surf lesson including board rental and theory.',
    price: 30,
    rating: 4.7,
    reviewCount: 440,
    images: [
      'https://picsum.photos/seed/surfing1/800/600',
      'https://picsum.photos/seed/surfing2/800/600',
      'https://picsum.photos/seed/surfing3/800/600'
    ],
    difficulty: Difficulty.MODERATE,
    duration: '1.5 hours',
    vendor: {
      id: 'v9',
      name: 'Soul & Surf',
      avatarUrl: 'https://i.pravatar.cc/150?img=28',
      joinedDate: '2015',
      rating: 4.6
    },
    coordinates: { lat: 8.7379, lng: 76.6972 },
    amenities: ['Surfboard', 'Rash Vest', 'Shower'],
    maxGuests: 6
  },
  {
    id: '10',
    title: 'Dudhsagar Falls Trek',
    location: 'Goa',
    category: 'Trekking',
    description: 'Trek through the Bhagwan Mahaveer Sanctuary to reach the majestic four-tiered Dudhsagar waterfall on the Mandovi River.',
    price: 25,
    rating: 4.5,
    reviewCount: 1100,
    images: [
      'https://picsum.photos/seed/waterfall1/800/600',
      'https://picsum.photos/seed/waterfall2/800/600',
      'https://picsum.photos/seed/waterfall3/800/600'
    ],
    difficulty: Difficulty.MODERATE,
    duration: '6 hours',
    vendor: {
      id: 'v10',
      name: 'Goa Jungle Treks',
      avatarUrl: 'https://i.pravatar.cc/150?img=65',
      joinedDate: '2018',
      rating: 4.4
    },
    coordinates: { lat: 15.3144, lng: 74.3143 },
    amenities: ['Life Jacket', 'Lunch', 'Guide', 'Forest Entry Fee'],
    maxGuests: 15
  }
];

const MOCK_REVIEWS_TEXT = [
  "Absolutely incredible experience! The guides were professional and the views were breathtaking. Highly recommended.",
  "Great value for money. A bit crowded but the organization was top notch.",
  "Once in a lifetime adventure. I was scared at first but the instructor made me feel so safe.",
  "The food provided was delicious and the equipment was brand new. Will definitely come back.",
  "A must-do if you are in the area. The sunset views were the highlight of my trip.",
  "Good experience overall, but the wait time was a bit longer than expected.",
  "Magical. Just magical. Words cannot describe how beautiful the scenery was.",
  "Professional team, great vibes, and an unforgettable memory."
];

export const getReviewsForActivity = (activityId: string): Review[] => {
  // Generate 4-8 reviews deterministically based on ID length or similar
  const count = 4 + (activityId.charCodeAt(0) % 4); 
  const reviews: Review[] = [];

  for (let i = 0; i < count; i++) {
    reviews.push({
      id: `review-${activityId}-${i}`,
      authorName: i % 2 === 0 ? `Alex ${String.fromCharCode(65+i)}.` : `Sarah ${String.fromCharCode(75+i)}.`,
      authorAvatar: i % 2 === 0 
        ? `https://randomuser.me/api/portraits/men/${20+i}.jpg`
        : `https://randomuser.me/api/portraits/women/${20+i}.jpg`,
      rating: i === 0 ? 5 : 4 + Math.random(), // Mostly high ratings
      date: new Date(Date.now() - (i * 86400000 * 15)).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      comment: MOCK_REVIEWS_TEXT[(parseInt(activityId) + i) % MOCK_REVIEWS_TEXT.length],
      helpfulCount: Math.floor(Math.random() * 20)
    });
  }
  return reviews;
};