'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Compass, Calendar, MapPin, Clock, 
  BookOpen, Heart, ArrowRight, Plane, Hotel, 
  Train, Bus, Car, Users, Sparkles, ChevronLeft, ChevronRight,
  Star, Play, X
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Travel Stories static structure
const TRAVEL_STORIES = [
  {
    id: 'story-1',
    duration: '0:15',
    location: 'HAMPI',
    image: 'https://images.unsplash.com/photo-1600100397608-f010e42ec1ab?auto=format&fit=crop&w=400&h=700&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-waterfall-in-forest-2213-large.mp4'
  },
  {
    id: 'story-2',
    duration: '0:12',
    location: 'ALLEPPEY',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=400&h=700&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-driving-in-a-canyon-of-rocks-and-sand-40242-large.mp4'
  },
  {
    id: 'story-3',
    duration: '0:18',
    location: 'LADAKH',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=400&h=700&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-drone-view-of-a-winding-mountain-road-41617-large.mp4'
  },
  {
    id: 'story-4',
    duration: '0:14',
    location: 'RAJASTHAN',
    image: 'https://images.unsplash.com/photo-1477587458883-471a5ed94245?auto=format&fit=crop&w=400&h=700&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-camel-caravan-in-the-desert-41584-large.mp4'
  },
  {
    id: 'story-5',
    duration: '0:10',
    location: 'VARANASI',
    image: 'https://images.unsplash.com/photo-1561361531-99f2a6a9715e?auto=format&fit=crop&w=400&h=700&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hindu-temple-ceremony-on-the-ganges-river-42867-large.mp4'
  }
];

// Interests categories static structure
const INTERESTS = [
  { name: 'Honeymoon', emoji: '❤️', bgColor: 'bg-rose-50 border-rose-100 hover:bg-rose-100' },
  { name: 'Adventure', emoji: '🏔️', bgColor: 'bg-emerald-50 border-emerald-100 hover:bg-emerald-100' },
  { name: 'Wildlife', emoji: '🐘', bgColor: 'bg-amber-50 border-amber-100 hover:bg-amber-100' },
  { name: 'Pilgrimage', emoji: '🪔', bgColor: 'bg-yellow-50 border-yellow-100 hover:bg-yellow-100' },
  { name: 'Beach', emoji: '🏖️', bgColor: 'bg-sky-50 border-sky-100 hover:bg-sky-100' },
  { name: 'Hill Stations', emoji: '🌲', bgColor: 'bg-green-50 border-green-100 hover:bg-green-100' },
  { name: 'Luxury', emoji: '✨', bgColor: 'bg-purple-50 border-purple-100 hover:bg-purple-100' },
  { name: 'Family', emoji: '👨‍👩‍👧‍👦', bgColor: 'bg-slate-50 border-slate-100 hover:bg-slate-100' }
];

// Testimonials static structure
const TESTIMONIALS = [
  {
    id: 1,
    rating: 5,
    quote: "Everything about our Kerala honeymoon was perfect. The houseboat stay in Alleppey was a dream come true. Thank you for this beautiful memory!",
    name: "Emma Wilson",
    origin: "AUSTRALIA • KERALA BACKWATERS & HILLS",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: 2,
    rating: 5,
    quote: "A very well-planned adventure in Leh Ladakh. The team was professional and ensured our safety throughout the high-altitude trek. Highly recommended!",
    name: "Hans Schmidt",
    origin: "GERMANY • LEH LADAKH EXPEDITION",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: 3,
    rating: 5,
    quote: "The food tour in Delhi and Jaipur was the highlight of our trip. We discovered layers of Indian culture through its amazing cuisines. Incredible experience!",
    name: "Sophie Laurent",
    origin: "FRANCE • NORTH INDIA CULINARY TOUR",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80"
  }
];

// Craft details static structure
const CRAFTS = [
  { name: 'Kathputli', state: 'Rajasthan', desc: 'Handcrafted wooden puppets draped in colorful traditional fabrics.', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=400&q=80' },
  { name: 'Phulkari', state: 'Punjab', desc: 'Vibrant flower-motif embroidery on handspun cotton fabric.', image: 'https://images.unsplash.com/photo-1588414734732-660b07304ddb?auto=format&fit=crop&w=400&q=80' },
  { name: 'Patola', state: 'Gujarat', desc: 'Double ikat silk sarees featuring highly complex geometric shapes.', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=400&q=80' },
  { name: 'Channapatna Toys', state: 'Karnataka', desc: 'Wooden toys colored with organic vegetable dyes.', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=400&q=80' },
  { name: 'Warli Painting', state: 'Maharashtra', desc: 'Monochromatic tribal wall art depicting social life and nature.', image: 'https://images.unsplash.com/photo-1566837015445-3e6e0730d662?auto=format&fit=crop&w=400&q=80' },
  { name: 'Aipan', state: 'Uttarakhand', desc: 'Sacred red-and-white folk art drawn on entryways.', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=400&q=80' },
  { name: 'Dhokra Art', state: 'Odisha', desc: 'Non-ferrous metal casting using lost-wax technique.', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=400&q=80' },
];

// Experiences static structure
const EXPERIENCES = [
  { name: 'Heritage', count: '120+ Sites', desc: 'Ancient forts, Mughal architecture, and royal palaces.', icon: 'Landmark' },
  { name: 'Wildlife', count: '45 Parks', desc: 'Asiatic lions, Bengal tigers, and bird sanctuaries.', icon: 'Bird' },
  { name: 'Spiritual', count: '80 Retreats', desc: 'Ganges aartis, yoga ashrams, and temple circuits.', icon: 'Sparkles' },
  { name: 'Adventure', count: '30 Valleys', desc: 'Himalayan trekking, river rafting, and desert safaris.', icon: 'Compass' },
  { name: 'Gastronomy', count: '50 Trails', desc: 'Rich curries, street food bazaars, and organic tea gardens.', icon: 'Utensils' },
  { name: 'Wellness', count: '60 Spas', desc: 'Traditional Ayurvedic treatments and mental healing.', icon: 'Heart' },
  { name: 'Arts', count: '25 Villages', desc: 'Handloom weaving, folk dances, and pottery workshops.', icon: 'Palette' },
  { name: 'Nature', count: '90 Valleys', desc: 'Hill stations, pristine backwaters, and pristine beaches.', icon: 'Mountain' },
  { name: 'Rural Tourism', count: '15 Hamlets', desc: 'Eco-friendly homestays, crop farming, and tribal living.', icon: 'Home' },
];

// Wonders static structure
const WONDERS = [
  { name: 'Sarmoli', state: 'Uttarakhand', desc: 'An alpine village leading community-based conservation and organic farming.', image: 'https://images.unsplash.com/photo-1588414734732-660b07304ddb?auto=format&fit=crop&w=600&q=80' },
  { name: 'Reiek', state: 'Mizoram', desc: 'A lush green high peak offering panoramic vistas of Mizoram hills.', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80' },
  { name: 'Kanthalloor', state: 'Kerala', desc: 'A cold-climate farm hamlet famous for apple, strawberry, and orange terraced orchards.', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80' },
  { name: 'Dawar', state: 'Kashmir', desc: 'A hidden borderland valley in Gurez, surrounded by timber houses and roaring rivers.', image: 'https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?auto=format&fit=crop&w=600&q=80' },
  { name: 'Madla', state: 'Madhya Pradesh', desc: 'A pristine riverside village bordering Panna Tiger Reserve, filled with stone craft houses.', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80' },
];

// Explore zones static structure
const EXPLORE_ZONES = [
  {
    zone: 'North India',
    desc: 'Golden history, royal forts, and soaring snow-covered Himalayan peaks.',
    states: ['Delhi', 'Rajasthan', 'Punjab', 'Himachal Pradesh', 'Uttarakhand'],
    image: 'https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&w=600&q=80'
  },
  {
    zone: 'South India',
    desc: 'Vibrant temples, calm coconut-lined backwaters, and Ayurvedic hill stations.',
    states: ['Kerala', 'Karnataka', 'Tamil Nadu', 'Telangana'],
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80'
  },
  {
    zone: 'East India',
    desc: 'Mystical monasteries, terracotta architecture, and tea gardens.',
    states: ['Odisha', 'West Bengal', 'Bihar'],
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=80'
  },
  {
    zone: 'West India',
    desc: 'Sun-drenched beaches, white salt deserts, and historic Maratha forts.',
    states: ['Goa', 'Gujarat', 'Maharashtra'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80'
  },
  {
    zone: 'North East',
    desc: 'Untamed wildlife, living root bridges, and rolling green cloud forests.',
    states: ['Assam', 'Meghalaya', 'Nagaland', 'Arunachal Pradesh'],
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=600&q=80'
  }
];

// Sample static Itineraries
const ITINERARIES = [
  { id: '1', title: 'Golden Triangle Quick Express', duration: '2 Days', region: 'North', interest: 'Culture', price: 9500, desc: 'Covers major historic sights of Delhi, Taj Mahal in Agra, and back.' },
  { id: '2', title: 'Goa Beachside Surf & Dine', duration: '5 Days', region: 'West', interest: 'Adventure', price: 16500, desc: 'Dolphin cruising, windsurfing training, and historic Portuguese walks.' },
  { id: '3', title: 'Munnar & Alleppey Luxury Cruise', duration: '7 Days', region: 'South', interest: 'Nature', price: 29000, desc: 'Tea processing estates walk, birdwatching, and backwater houseboat stays.' },
  { id: '4', title: 'Himalayan High Altitude Trekking', duration: '14 Days', region: 'North', interest: 'Adventure', price: 54000, desc: 'High pass crossing, basecamp tents stay, and local Sherpa village dining.' }
];

interface HomeClientProps {
  destinations: any[];
  packages: any[];
  events: any[];
  blogs: any[];
}

export default function HomeClient({ destinations, packages, events, blogs }: HomeClientProps) {
  // Hero search
  const [searchQuery, setSearchQuery] = useState('');
  
  // Itinerary filters
  const [itiRegion, setItiRegion] = useState('All');
  const [itiInterest, setItiInterest] = useState('All');
  const [itiDuration, setItiDuration] = useState('All');

  // Event filters
  const [evtMonth, setEvtMonth] = useState('All');
  const [evtCategory, setEvtCategory] = useState('All');

  // Wonders Carousel Index
  const [wonderIndex, setWonderIndex] = useState(0);

  // Travel Stories active video
  const [activeStoryVideo, setActiveStoryVideo] = useState<string | null>(null);

  // Plan trip tabs
  const [activeTripTab, setActiveTripTab] = useState('flights');

  // Itinerary filtered list
  const filteredItineraries = ITINERARIES.filter(iti => {
    if (itiRegion !== 'All' && iti.region !== itiRegion) return false;
    if (itiInterest !== 'All' && iti.interest !== itiInterest) return false;
    if (itiDuration !== 'All' && iti.duration !== itiDuration) return false;
    return true;
  });

  // Events filtered list
  const filteredEvents = events.filter(evt => {
    if (evtMonth !== 'All' && evt.month !== evtMonth) return false;
    if (evtCategory !== 'All' && evt.category !== evtCategory) return false;
    return true;
  });

  const nextWonder = () => {
    setWonderIndex((prev) => (prev + 1) % WONDERS.length);
  };
  const prevWonder = () => {
    setWonderIndex((prev) => (prev - 1 + WONDERS.length) % WONDERS.length);
  };

  return (
    <div className="flex-grow flex flex-col">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Image overlay (production backup for video) */}
        <div className="absolute inset-0 bg-navy/60 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1920&q=80" 
          alt="Taj Mahal Taj Sunset"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center flex flex-col items-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold tracking-wider text-primary">LUXURY TOURISM REDEFINED</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight"
          >
            Discover the Golden Heritage <br/>
            <span className="bg-gradient-to-r from-orange-400 via-yellow-200 to-primary bg-clip-text text-transparent italic font-serif">
              of Incredible India
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-300 max-w-2xl text-base sm:text-lg font-medium"
          >
            Vibrant deserts, misty hill sanctuaries, serene backwater cruises, and historic temple structures await you. Start your handcrafted custom journey.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full max-w-xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-full p-2 flex items-center shadow-lg"
          >
            <div className="flex items-center gap-2 pl-4 flex-grow">
              <Search className="h-5 w-5 text-gray-400" />
              <input 
                type="text"
                placeholder="Where do you want to explore? (e.g. Rajasthan, Goa, Kerala...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-white w-full placeholder-gray-400 text-sm font-medium"
              />
            </div>
            <Link 
              href={`/packages?search=${encodeURIComponent(searchQuery)}`}
              className="bg-primary hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-full text-sm transition-all"
            >
              Search
            </Link>
          </motion.div>

          {/* Quick CTA */}
          <div className="flex gap-4 mt-2">
            <Link href="/packages" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold px-6 py-2.5 rounded-full border border-white/20 transition-all text-sm">
              View Packages
            </Link>
            <Link href="/plan" className="bg-primary hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-full transition-all text-sm">
              Book Custom Tour
            </Link>
          </div>
        </div>
      </section>

      {/* 2. TRAVEL STORIES IN MOTION 🎥 */}
      <section className="py-20 bg-white text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
                Travel Stories
              </h2>
              <span className="text-amber-500 italic font-serif text-3xl sm:text-4xl mt-2 flex items-center gap-2">
                In Motion <span className="not-italic">🎥</span>
              </span>
            </div>
            <p className="text-gray-500 max-w-md text-sm sm:text-base font-medium">
              Short glimpses of journeys across Incredible India. Experience the movement, the sounds, and the soul.
            </p>
          </div>

          <div className="relative w-full overflow-hidden py-4">
            {/* Fade gradients on edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />
            
            <div className="flex gap-6 animate-marquee-right">
              {[...TRAVEL_STORIES, ...TRAVEL_STORIES, ...TRAVEL_STORIES].map((story, idx) => (
                <div
                  key={`${story.id}-${idx}`}
                  onClick={() => setActiveStoryVideo(story.videoUrl)}
                  className="group relative aspect-[9/16] w-[200px] sm:w-[240px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300 shrink-0"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/30 backdrop-blur-md p-4 rounded-full text-white border border-white/40 scale-90 group-hover:scale-100 transition-transform duration-300">
                      <Play className="h-6 w-6 fill-white" />
                    </div>
                  </div>

                  <img 
                    src={story.image} 
                    alt={story.location}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Duration Badge */}
                  <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 z-20">
                    <Clock className="h-3 w-3" />
                    <span>{story.duration}</span>
                  </div>

                  {/* Location Name */}
                  <div className="absolute bottom-6 left-6 flex items-center gap-1.5 z-20">
                    <MapPin className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                    <span className="text-white text-xs font-bold tracking-widest uppercase">
                      {story.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal Player */}
      <AnimatePresence>
        {activeStoryVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="relative w-full max-w-sm aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl bg-black border border-white/10"
            >
              <button 
                onClick={() => setActiveStoryVideo(null)}
                className="absolute top-4 right-4 z-10 bg-black/60 text-white p-2 rounded-full hover:bg-black transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              
              <video 
                src={activeStoryVideo} 
                autoPlay 
                loop 
                controls 
                playsInline
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. RECOMMENDED PACKAGES */}
      <section className="py-20 bg-white text-left border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10 gap-4">
            <div>
              <span className="text-blue-600 tracking-[0.2em] font-bold text-xs uppercase block">
                BEST SELECTION
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mt-2">
                Recommended <span className="text-blue-600">Packages</span>
              </h2>
            </div>
            <Link 
              href="/packages" 
              className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1 shrink-0"
            >
              View All Packages <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.slice(0, 4).map((pkg, idx) => {
              // Parse highlights from the description lines
              const descLines = pkg.description.split('\n');
              const highlights = descLines.length > 2 ? descLines.slice(0, 2) : ['Heritage Stays', 'Guided Tours'];
              
              return (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-300 p-4 min-h-[460px]"
                >
                  <div className="flex flex-col gap-4">
                    {/* Image Area */}
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden w-full">
                      {/* Featured Overlay Badge */}
                      <div className="absolute top-4 left-4 bg-orange-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-md uppercase tracking-wider z-10 shadow-sm">
                        FEATURED
                      </div>
                      <img 
                        src={pkg.images || 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=80'} 
                        alt={pkg.packageName}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    {/* Title & Price */}
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-base font-extrabold text-slate-900 leading-snug line-clamp-2 hover:text-blue-600 transition-colors">
                        <Link href={`/packages/${pkg.id}`}>{pkg.packageName}</Link>
                      </h3>
                      <span className="text-blue-600 font-black text-lg shrink-0">
                        ₹{pkg.price.toLocaleString()}
                      </span>
                    </div>

                    {/* Subtitle / Duration */}
                    <p className="text-gray-400 text-xs font-semibold -mt-1">
                      {pkg.duration}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-col gap-1.5 mt-1">
                      {highlights.map((hl: string, hidx: number) => (
                        <div key={hidx} className="flex items-center gap-2 text-blue-600 text-xs font-bold">
                          <span className="text-lg leading-none select-none">•</span>
                          <span className="text-slate-700 font-medium text-[11px]">{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link 
                    href={`/packages/${pkg.id}`}
                    className="mt-6 bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold py-2.5 rounded-xl text-xs transition-all text-center w-full block"
                  >
                    View Details
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. FIND TOURS BY INTEREST */}
      <section className="py-20 bg-white text-left border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
              Find Tours by <span className="text-amber-500">Interest</span>
            </h2>
            <p className="text-gray-500 mt-3 text-sm sm:text-base font-medium">
              Whatever your travel style, we have the perfect itinerary waiting for you.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {INTERESTS.map((interest, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.03 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <Link 
                  href={`/packages?search=${encodeURIComponent(interest.name)}`}
                  className={`${interest.bgColor} w-16 h-16 sm:w-20 sm:h-20 rounded-[1.5rem] border flex items-center justify-center text-3xl sm:text-4xl shadow-sm hover:scale-105 hover:shadow-md transition-all duration-300`}
                >
                  <span className="select-none">{interest.emoji}</span>
                </Link>
                <span className="text-xs font-extrabold text-slate-800 mt-3 tracking-wide">
                  {interest.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LOVED BY TRAVELLERS WORLDWIDE ❤️ */}
      <section className="py-20 bg-white text-left border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
              Loved by Travellers Worldwide <span className="text-red-500">❤️</span>
            </h2>
            <p className="text-gray-500 mt-3 text-sm sm:text-base font-medium">
              Thousands of happy travellers have explored India with us. Here's what some of them have to say.
            </p>
          </div>

          <div className="relative w-full overflow-hidden py-4">
            {/* Fade gradients on edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

            <div className="flex gap-8 animate-marquee-left">
              {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((test, idx) => (
                <div
                  key={`${test.id}-${idx}`}
                  className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 flex flex-col justify-between h-[280px] w-[300px] sm:w-[360px] relative text-left hover:shadow-md transition-all duration-300 shrink-0"
                >
                  {/* Quotation Mark Watermark */}
                  <div className="absolute top-4 right-8 text-[#e0f0ff] text-7xl font-serif select-none pointer-events-none opacity-40">
                    ”
                  </div>

                  <div className="flex flex-col gap-4">
                    {/* Stars */}
                    <div className="flex gap-1">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    
                    {/* Quote */}
                    <p className="text-gray-600 text-xs sm:text-sm font-medium leading-relaxed italic line-clamp-4">
                      "{test.quote}"
                    </p>
                  </div>

                  {/* Profile row */}
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-50">
                    <img 
                      src={test.avatar} 
                      alt={test.name}
                      className="w-10 h-10 object-cover rounded-full shadow-sm border border-slate-100"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-800 leading-none">
                        {test.name}
                      </span>
                      <span className="text-[9px] font-bold text-gray-400 tracking-wider uppercase mt-1 leading-none">
                        {test.origin}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. EXPLORE INDIA BY REGION */}
      <section className="py-20 bg-slate-50 text-left border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-blue-600 font-bold tracking-widest text-xs uppercase block">
              GEOGRAPHIC ZONES
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mt-2">
              Explore India by Region
            </h2>
            <p className="text-gray-500 mt-4 text-sm sm:text-base font-medium">
              India is geographically massive. View our structured state lists for each zone.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {EXPLORE_ZONES.map((zone, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="group relative h-[360px] rounded-3xl overflow-hidden border border-slate-150 flex flex-col justify-end p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-955 via-slate-950/70 to-slate-955/20 z-10" />
                <img 
                  src={zone.image} 
                  alt={zone.zone}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="relative z-20 flex flex-col gap-3">
                  <h3 className="text-xl font-bold text-white leading-none">
                    {zone.zone}
                  </h3>
                  <p className="text-slate-300 text-[10px] leading-relaxed font-semibold">
                    {zone.desc}
                  </p>
                  
                  <div className="border-t border-white/15 pt-2 flex flex-col gap-1.5">
                    <span className="text-[9px] text-amber-400 uppercase font-bold tracking-wider">
                      Featured States:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {zone.states.map((st, sidx) => (
                        <span key={sidx} className="bg-white/10 border border-white/15 px-2 py-0.5 rounded-full text-[9px] font-bold text-slate-100">
                          {st}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. PLAN YOUR TRIP SEARCH UI */}
      <section id="enquiry" className="py-20 bg-slate-50 text-left border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-md">
            <div className="text-center mb-8">
              <span className="text-blue-600 font-bold tracking-widest text-xs uppercase block">PLAN YOUR RIDE</span>
              <h2 className="text-3xl font-black text-slate-900 mt-2">Plan Your Custom Journey</h2>
              <p className="text-gray-500 mt-2 text-xs font-semibold">Compare schedules and book travel services direct with local tour operators.</p>
            </div>

            {/* Tabs header */}
            <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-4 justify-center mb-8">
              {[
                { id: 'flights', label: 'Flights', icon: Plane },
                { id: 'hotels', label: 'Hotels', icon: Hotel },
                { id: 'trains', label: 'Trains', icon: Train },
                { id: 'buses', label: 'Buses', icon: Bus },
                { id: 'cabs', label: 'Cabs', icon: Car },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTripTab(tab.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                      activeTripTab === tab.id
                        ? 'bg-blue-600 text-white scale-105 shadow-sm'
                        : 'bg-slate-50 border border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tabs search forms */}
            <div className="flex flex-col gap-6">
              {activeTripTab === 'flights' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-gray-400 uppercase font-bold">From City</label>
                    <input type="text" placeholder="Delhi (DEL)" className="bg-slate-55 border border-slate-200 px-4 py-2.5 rounded-xl outline-none text-xs text-slate-800 placeholder-slate-400" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-gray-400 uppercase font-bold">To Destination</label>
                    <input type="text" placeholder="Goa (GOI)" className="bg-slate-55 border border-slate-200 px-4 py-2.5 rounded-xl outline-none text-xs text-slate-800 placeholder-slate-400" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-gray-400 uppercase font-bold">Departure Date</label>
                    <input type="date" className="bg-slate-55 border border-slate-200 px-4 py-2.5 rounded-xl outline-none text-xs text-slate-800" />
                  </div>
                </div>
              )}

              {activeTripTab === 'hotels' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-gray-400 uppercase font-bold">State / Location</label>
                    <input type="text" placeholder="Munnar, Kerala" className="bg-slate-55 border border-slate-200 px-4 py-2.5 rounded-xl outline-none text-xs text-slate-800 placeholder-slate-400" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-gray-400 uppercase font-bold">Check-In Date</label>
                    <input type="date" className="bg-slate-55 border border-slate-200 px-4 py-2.5 rounded-xl outline-none text-xs text-slate-800" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-gray-400 uppercase font-bold">Guests & Rooms</label>
                    <select className="bg-slate-55 border border-slate-200 px-4 py-2.5 rounded-xl outline-none text-xs text-slate-800 cursor-pointer">
                      <option>2 Adults, 1 Room</option>
                      <option>1 Adult, 1 Room</option>
                      <option>4 Adults, 2 Rooms</option>
                    </select>
                  </div>
                </div>
              )}

              {activeTripTab === 'trains' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-gray-400 uppercase font-bold">Source Station</label>
                    <input type="text" placeholder="Mumbai Central (MMCT)" className="bg-slate-55 border border-slate-200 px-4 py-2.5 rounded-xl outline-none text-xs text-slate-800 placeholder-slate-400" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-gray-400 uppercase font-bold">Destination Station</label>
                    <input type="text" placeholder="Jaipur (JP)" className="bg-slate-55 border border-slate-200 px-4 py-2.5 rounded-xl outline-none text-xs text-slate-800 placeholder-slate-400" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-gray-400 uppercase font-bold">Travel Date</label>
                    <input type="date" className="bg-slate-55 border border-slate-200 px-4 py-2.5 rounded-xl outline-none text-xs text-slate-800" />
                  </div>
                </div>
              )}

              {activeTripTab === 'buses' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-gray-400 uppercase font-bold">From</label>
                    <input type="text" placeholder="Pune Bus Stand" className="bg-slate-55 border border-slate-200 px-4 py-2.5 rounded-xl outline-none text-xs text-slate-800 placeholder-slate-400" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-gray-400 uppercase font-bold">To</label>
                    <input type="text" placeholder="Panaji Beach, Goa" className="bg-slate-55 border border-slate-200 px-4 py-2.5 rounded-xl outline-none text-xs text-slate-800 placeholder-slate-400" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-gray-400 uppercase font-bold">Journey Date</label>
                    <input type="date" className="bg-slate-55 border border-slate-200 px-4 py-2.5 rounded-xl outline-none text-xs text-slate-800" />
                  </div>
                </div>
              )}

              {activeTripTab === 'cabs' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-gray-400 uppercase font-bold">Pickup Location</label>
                    <input type="text" placeholder="Dehradun Airport" className="bg-slate-55 border border-slate-200 px-4 py-2.5 rounded-xl outline-none text-xs text-slate-800 placeholder-slate-400" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-gray-400 uppercase font-bold">Dropoff Location</label>
                    <input type="text" placeholder="Mussoorie Mall Road" className="bg-slate-55 border border-slate-200 px-4 py-2.5 rounded-xl outline-none text-xs text-slate-800 placeholder-slate-400" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-gray-400 uppercase font-bold">Pickup Time</label>
                    <input type="datetime-local" className="bg-slate-55 border border-slate-200 px-4 py-2.5 rounded-xl outline-none text-xs text-slate-800" />
                  </div>
                </div>
              )}

              <button 
                onClick={() => alert('Search parameters simulated. Search API results will list matching items.')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-sm transition-all text-center mt-4 shadow-sm"
              >
                Search Offers & Availability
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
