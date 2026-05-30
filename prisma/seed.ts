import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Clear existing data
  await prisma.package.deleteMany();
  await prisma.destination.deleteMany();
  await prisma.event.deleteMany();
  await prisma.blog.deleteMany();
  await prisma.media.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create Users
  const adminPassword = await bcrypt.hash('admin123', 10);
  const editorPassword = await bcrypt.hash('editor123', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@incredibleindia.com',
      password: adminPassword,
      name: 'Ananya Sharma',
      role: 'ADMIN',
    },
  });

  const editor = await prisma.user.create({
    data: {
      email: 'editor@incredibleindia.com',
      password: editorPassword,
      name: 'Kabir Verma',
      role: 'EDITOR',
    },
  });

  console.log('Users seeded:', { admin: admin.email, editor: editor.email });

  // 3. Create Destinations
  const destinationsData = [
    {
      title: 'Rajasthan',
      description: 'The Land of Kings, featuring grand palaces, majestic forts, sand dunes, and vibrant heritage festivals.',
      state: 'Rajasthan',
      region: 'North',
      images: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Goa',
      description: 'Famous for sandy beaches, vibrant nightlife, historic 17th-century Portuguese churches, and spice plantations.',
      state: 'Goa',
      region: 'West',
      images: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Kerala',
      description: 'God\'s Own Country, known for serene palm-lined backwaters, Ayurvedic treatments, tropical beaches, and spice hill stations.',
      state: 'Kerala',
      region: 'South',
      images: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Jammu & Kashmir',
      description: 'Paradise on Earth, featuring snow-capped peaks, houseboats on Dal Lake, alpine valleys, and spiritual temples.',
      state: 'Jammu & Kashmir',
      region: 'North',
      images: 'https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Himachal Pradesh',
      description: 'Dotted with scenic hill stations, snow trekking routes, monasteries, and adventure valleys like Solang and Spiti.',
      state: 'Himachal Pradesh',
      region: 'North',
      images: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Uttarakhand',
      description: 'Land of the Gods, featuring sacred Ganges rivers, yoga retreats in Rishikesh, high-altitude meadows, and wildlife sanctuaries.',
      state: 'Uttarakhand',
      region: 'North',
      images: 'https://images.unsplash.com/photo-1588414734732-660b07304ddb?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Gujarat',
      description: 'Home to the white desert salt flats of Rann of Kutch, Asiatic Lions in Gir, and rich heritage sites.',
      state: 'Gujarat',
      region: 'West',
      images: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Maharashtra',
      description: 'A blend of modern cities, ancient cave architecture (Ajanta-Ellora), pristine Western Ghats, and historic Maratha forts.',
      state: 'Maharashtra',
      region: 'West',
      images: 'https://images.unsplash.com/photo-1566837015445-3e6e0730d662?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const destinations: any[] = [];
  for (const data of destinationsData) {
    const dest = await prisma.destination.create({ data });
    destinations.push(dest);
  }

  console.log(`${destinations.length} Destinations seeded.`);

  // 4. Create Packages
  const packagesData = [
    {
      packageName: 'Majestic Rajasthan: Forts & Palaces',
      duration: '7 Days / 6 Nights | Culture',
      price: 38000,
      images: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
      description: "Heritage Hotels\nFort Visits\nExplore the majestic palaces, royal courts, and heritage sites of historic Rajasthan.",
      destinationTitle: 'Rajasthan',
    },
    {
      packageName: 'Kerala Backwaters & Hill Stations',
      duration: '6 Days / 5 Nights | Nature',
      price: 28500,
      images: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
      description: "Houseboat Stay\nTea Gardens\nExperience the calm backwaters, lush green tea fields, and pristine nature of Kerala.",
      destinationTitle: 'Kerala',
    },
    {
      packageName: 'Kashmir: Paradise on Earth',
      duration: '5 Days / 4 Nights | Adventure',
      price: 32000,
      images: 'https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?auto=format&fit=crop&w=800&q=80',
      description: "Shikara Ride\nGulmarg Cable Car\nBreathe in the snow-capped Himalayan peaks, wooden chalets, and roaring rivers of Kashmir.",
      destinationTitle: 'Jammu & Kashmir',
    },
    {
      packageName: 'Golden Triangle Special',
      duration: '4 Days / 3 Nights | Culture',
      price: 21000,
      images: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80',
      description: "Taj Mahal Visit\nJaipur Forts\nExplore the golden triangle covering historic landmarks, Mughal architecture, and Jaipur heritage sites.",
      destinationTitle: 'Rajasthan',
    },
  ];

  for (const pkgData of packagesData) {
    const destination = destinations.find(d => d.title === pkgData.destinationTitle);
    if (destination) {
      await prisma.package.create({
        data: {
          packageName: pkgData.packageName,
          duration: pkgData.duration,
          price: pkgData.price,
          images: pkgData.images,
          description: pkgData.description,
          destinationId: destination.id,
        }
      });
    }
  }

  console.log('Packages seeded.');

  // 5. Create Events
  const eventsData = [
    {
      name: 'Pushkar Camel Fair',
      month: 'November',
      state: 'Rajasthan',
      category: 'Cultural',
      image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
      description: 'One of the world\'s largest camel and livestock fairs, featuring folk dances, competitions, and music.',
    },
    {
      name: 'Sunburn Festival',
      month: 'December',
      state: 'Goa',
      category: 'Music',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
      description: 'Asia\'s largest electronic dance music festival set against the sunny beaches of Vagator, Goa.',
    },
    {
      name: 'Thrissur Pooram',
      month: 'April',
      state: 'Kerala',
      category: 'Spiritual',
      image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80',
      description: 'A spectacular temple festival featuring decorated elephants, traditional orchestra, and massive fireworks.',
    },
    {
      name: 'Rann Utsav',
      month: 'October',
      state: 'Gujarat',
      category: 'Harvest',
      image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80',
      description: 'A three-month-long celebration of music, dance, and arts in the breathtaking white salt desert of Kutch.',
    },
    {
      name: 'Hornbill Festival',
      month: 'December',
      state: 'Nagaland',
      category: 'Cultural',
      image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80',
      description: 'The Festival of Festivals, celebrating rich Naga tribal heritage with traditional dances, crafts, and food stalls.',
    },
  ];

  for (const event of eventsData) {
    await prisma.event.create({ data: event });
  }

  console.log('Events seeded.');

  // 6. Create Blogs
  const blogsData = [
    {
      title: 'Chasing Sunsets in the Golden Sand Dunes of Jaisalmer',
      content: 'Jaisalmer, the Golden City, rises like a sandcastle from the Thar Desert. Our camel caravan trotted slowly as the sun began its descent. The sky exploded into colors of crimson, gold, and deep indigo. Walking through Jaisalmer Fort, we met local musicians singing tales of kings. Rajasthan is not just a destination; it is an unforgettable melody.',
      state: 'Rajasthan',
      category: 'Heritage',
      image: 'https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&w=800&q=80',
      readTime: '6 mins',
      author: 'Aarav Malhotra',
    },
    {
      title: 'A Silent Escape: Floating on Kerala\'s Emerald Backwaters',
      content: 'Gliding along the backwaters of Alleppey in a handcrafted cedar houseboat is like entering another dimension. Palm trees bend gently over calm waters, and children wave from shorelines where life moves at a peaceful whisper. Feasting on spicy Karimeen Pollichathu cooked fresh by our onboard chef, we felt the true spirit of slow travel.',
      state: 'Kerala',
      category: 'Nature',
      image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
      readTime: '5 mins',
      author: 'Meera Nair',
    },
    {
      title: 'Monastery Trails and Alpine Lakes of Ladakh',
      content: 'Trekking through Ladakh at 11,000 feet challenges your senses and rewards your soul. The fluttering prayer flags at Thiksey Monastery carry blessings on the wind. Pangong Lake, stretching across borders, changes color from turquoise to deep royal blue under the afternoon sun. Ladakh is raw, rugged, and profoundly holy.',
      state: 'Jammu & Kashmir',
      category: 'Adventure',
      image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80',
      readTime: '8 mins',
      author: 'Devendra Negi',
    },
  ];

  for (const blog of blogsData) {
    await prisma.blog.create({ data: blog });
  }

  console.log('Blogs seeded.');
  console.log('Database seeding successfully completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
