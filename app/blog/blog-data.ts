import { IconType } from "react-icons";
import { FaCar, FaParking, FaRoad, FaCity, FaChargingStation, FaMobileAlt } from "react-icons/fa";

export interface BlogSection {
  title: string;
  content: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  icon: IconType;
  category: string;
  image: string;
  sections: BlogSection[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Top 10 Parking Tips for City Drivers",
    excerpt: "Navigating the urban jungle can be tough. Here are our top tips for finding the perfect spot every time without the stress.",
    date: "Oct 24, 2025",
    readTime: "5 min read",
    author: "Alex Driver",
    icon: FaCity,
    category: "Guides",
    image: "/assets/blog/city-parking.png",
    sections: [
      {
        title: "Plan Ahead",
        content: "Before you even start your engine, know where you're going. Use maps and parking apps to identify potential parking garages or street parking zones near your destination. Many apps now allow you to reserve spots in advance, saving you both time and anxiety."
      },
      {
        title: "Know the Signs",
        content: "City parking signs can be notoriously confusing. \"No Parking 8-10 AM except Sundays\"? It pays to take a moment to read them carefully. A quick double-check can save you from a costly ticket or the nightmare of getting towed."
      },
      {
        title: "Embrace Technology",
        content: "Smart parking solutions are popping up everywhere. From sensors that indicate open spots to apps that handle payment without coins, technology is your friend. Make sure you have the relevant apps downloaded and set up before you drive."
      },
      {
        title: "Parallel Parking Practice",
        content: "It's the maneuver everyone dreads, but it's essential for city driving. Practice makes perfect. Find a quiet street to practice your parallel parking skills so you can slide into that tight spot with confidence when it counts."
      },
      {
        title: "Consider Off-Peak Times",
        content: "If your schedule allows, try to visit busy areas during off-peak hours. Early mornings or later evenings often offer more available street parking compared to the midday rush."
      }
    ]
  },
  {
    id: "2",
    title: "How Smart Parking Saves You Time",
    excerpt: "Discover the technology behind smart parking systems and how they are revolutionizing the way we park in modern cities.",
    date: "Nov 02, 2025",
    readTime: "4 min read",
    author: "Sarah Tech",
    icon: FaParking,
    category: "Technology",
    image: "/assets/blog/smart-parking.png",
    sections: [
      {
        title: "Real-Time Availability",
        content: "The core of smart parking is real-time data. Sensors embedded in the ground or mounted on light poles detect whether a spot is occupied. This data is instantly transmitted to a central cloud system and then to your smartphone app, guiding you directly to an open space."
      },
      {
        title: "Reduced Traffic Congestion",
        content: "Did you know that a significant portion of city traffic is actually caused by drivers looking for parking? By directing cars efficiently to available spots, smart parking systems reduce circling, which in turn lowers traffic congestion and emissions. It's a win for drivers and the environment."
      },
      {
        title: "Seamless Payments",
        content: "Fumbling for change or waiting in line at a pay station is a thing of the past. Smart parking integrates mobile payments, allowing you to pay for your session with a tap on your phone. You can even extend your session remotely if your meeting runs late."
      }
    ]
  },
  {
    id: "3",
    title: "The Future of Automated Parking Garages",
    excerpt: "Imagine a world where your car parks itself. Automated parking garages are closer than you think. Let's explore the future.",
    date: "Nov 15, 2025",
    readTime: "6 min read",
    author: "Mike Future",
    icon: FaCar,
    category: "Innovation",
    image: "/assets/blog/automated-garage.png",
    sections: [
      {
        title: "How It Works",
        content: "You drive your car onto a pallet at the entrance bay. You get out, lock your car, and walk away. The system arguably does the rest. Robotic lifts and shuttles transport your vehicle to a secure storage rack, stacking cars more densely than any human could achieve."
      },
      {
        title: "Space Efficiency",
        content: "Without the need for ramps, driving lanes, or space for doors to open, automated garages can fit 30-50% more cars in the same volume as a traditional garage. This is a game-changer for dense urban developments where real estate is at a premium."
      },
      {
        title: "Safety and Security",
        content: "Since no humans enter the storage area, the risk of theft, vandalism, or dinged doors is virtually eliminated. Your car stays safe and secure until you're ready to retrieve it."
      }
    ]
  },
  {
    id: "4",
    title: "Understanding Parking Signs: A Comprehensive Guide",
    excerpt: "Confused by complex parking signs? We break down the most common signs so you can avoid those pesky tickets.",
    date: "Nov 28, 2025",
    readTime: "8 min read",
    author: "Jenny Rules",
    icon: FaRoad,
    category: "Education",
    image: "/assets/blog/city-parking.png", // Reusing image for now
    sections: [
      {
        title: "Colors Matter",
        content: "Red usually means prohibition—no parking, no stopping, or no standing. Green typically indicates permission, often with restrictions like time limits."
      },
      {
        title: "Arrows",
        content: "Pay close attention to the arrows. A sign with an arrow pointing left applies only to the space to the left of the sign. A double-headed arrow means the rule applies to both sides."
      },
      {
        title: "Time Limits",
        content: "\"2 Hour Parking\" means exactly that. And moving your car a few inches usually doesn't reset the clock. Enforcers often mark tires to track vehicles. To be safe, move your car to a different block if you need more time."
      }
    ]
  },
  {
    id: "5",
    title: "Electric Vehicle Charging Stations: What You Need to Know",
    excerpt: "As EVs become more popular, finding charging stations is crucial. Here's a guide to using and finding them in parking lots.",
    date: "Dec 05, 2025",
    readTime: "5 min read",
    author: "Tom Green",
    icon: FaChargingStation,
    category: "EVs",
    image: "/assets/blog/smart-parking.png", // Reusing image
    sections: [
      {
        title: "Types of Chargers",
        content: "Know your connector. Level 2 chargers are common for longer stays (like at a mall or workplace), adding about 25 miles of range per hour. DC Fast Chargers are for quick top-ups, filling a battery to 80% in 20-30 minutes."
      },
      {
        title: "Charging Etiquette",
        content: "EV spots are for charging, not just parking. If your battery is full or you aren't plugged in, move your car. Blocking a charger prevents others from getting the power they need."
      }
    ]
  },
  {
    id: "6",
    title: "Mobile Parking Apps: The Ultimate Convenience",
    excerpt: "Why carry cash? Mobile parking apps are making payments easier and faster. Learn which apps are the best for your needs.",
    date: "Dec 12, 2025",
    readTime: "4 min read",
    author: "Lisa App",
    icon: FaMobileAlt,
    category: "Apps",
    image: "/assets/blog/smart-parking.png", // Reusing image
    sections: [
      {
        title: "Key Features",
        content: "Look for apps that offer remote extension. Being able to add time to your meter from the restaurant table is a huge convenience. Also, check for notification features that alert you when your time is running out."
      },
      {
        title: "Integration",
        content: "Some apps integrate with navigation systems, guiding you not just to a destination, but to a guaranteed parking spot nearby. This seamless integration is the future of urban mobility."
      }
    ]
  },
];
