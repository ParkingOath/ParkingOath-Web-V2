export interface FaqItemData {
    question: string;
    answer: string;
}

export const hostFaqs: FaqItemData[] = [
    {
        question: "How are fees charged when someone parks in my driveway?",
    answer: "Each time a driver parks, we deduct a small percentage from the payment before you receive your earnings. You'll see all transactions in your dashboard.",
    },
    {
        question: "Will I pay any fees if no one parks in my space?",
    answer: "No, you only pay when a parking transaction happens. If your space isn't used, there's no fee.",
    },
    {
        question: "What's the difference between the early access fee and the standard fee?",
    answer: "Early adopters pay no fees for two months and then only 10% afterward. Standard hosts pay a competitive 15%.",
    },
    {
        question: "How do I know the person parking is safe?",
    answer: "We verify all drivers and secure their payment details. You control when your space is available, your safety is important to us.",
    },
    {
        question: "How long can I list my parking space for?",
    answer: "It's fully flexible! You decide your availability, daily, hourly, or whenever suits you.",
    },
    {
        question: "How quickly can I list my parking space?",
        answer: "You can list it in just minutes, add your details, set availability, and you're ready for bookings at launch!",
    },
];

export const driverFaqs: FaqItemData[] = [
    {
        question: "How does ParkingOath help me find parking?",
        answer: "ParkingOath shows parking as it becomes available near your destination. Set your preferences, say where you're going, and the app guides you to parking without circling or guessing."
    },
    {
        question: "Do I need to book parking in advance?",
        answer: "ParkingOath is built for real-time parking. It's designed for busy conditions where timing matters. Advance booking is available as you require it"
    },
    {
        question: "Can I use ParkingOath while on the move?",
        answer: "ParkingOath supports voice-led search, so you can find parking hands-free stay focused on the road."
    },
    {
        question: "What happens if the parking spot is no longer available?",
        answer: "ParkingOath reflects live parking availability. If a space is no longer available, the app directs you to the next closest option so you can keep moving."
    },
];
