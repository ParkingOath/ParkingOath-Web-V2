export interface FaqItemData {
    question: string;
    answer: string;
}

export const hostFaqs: FaqItemData[] = [
    {
        question: "How does the founding host rate work?",
        answer: "Two months at 0%. Then 10% for as long as you host. Future hosts will pay 15%, but the rate you lock in on signup day stays with you.",
    },
    {
        question: "Who actually pays me?",
        answer: "The driver. They pay through the app. The moment the booking confirms, the money flows to your account.",
    },
    {
        question: "What if my space gets damaged?",
        answer: "Every driver is verified before they can book. If something happens to a vehicle during a booking, that's covered under the driver's own car insurance, the same as a parking incident on a public street. We don't duplicate insurance we can't substantiate. What we do is screen the people who can use the platform.",
    },
    {
        question: "Can I block certain drivers or times?",
        answer: "You control when your space is available. While the listing is live, any verified driver can book it. The moment they do, you get their details and can message them straight through the app, confirm exactly where to park, share access notes, whatever they need. Need the space back before a future booking lands? Toggle availability off and bookings stop instantly. Once a booking is confirmed though, it's locked in for that driver.",
    },
    {
        question: "Is there a contract?",
        answer: "No. List when you want it earning. Pull it down when you don't.",
    },
    {
        question: "How is this different from Spacer or Kerb?",
        answer: "Lower fees, stated up front. 10% against their 20%-plus combined take. Payout flows the moment a booking confirms, not at month-end. Built for the host, not the platform.",
    },
];

// Archived host FAQ items preserved for later re-enable if needed.
// export const archivedHostFaqs: FaqItemData[] = [
//     {
//         question: "How are fees charged when someone parks in my driveway?",
//         answer: "Each time a driver parks, we deduct a small percentage from the payment before you receive your earnings. You'll see all transactions in your dashboard.",
//     },
//     {
//         question: "Will I pay any fees if no one parks in my space?",
//         answer: "No, you only pay when a parking transaction happens. If your space isn't used, there's no fee.",
//     },
//     {
//         question: "What's the difference between the early access fee and the standard fee?",
//         answer: "Early adopters pay no fees for two months and then only 10% afterward. Standard hosts pay a competitive 15%.",
//     },
//     {
//         question: "How do I know the person parking is safe?",
//         answer: "We verify all drivers and secure their payment details. You control when your space is available, your safety is important to us.",
//     },
//     {
//         question: "How long can I list my parking space for?",
//         answer: "It's fully flexible! You decide your availability, daily, hourly, or whenever suits you.",
//     },
//     {
//         question: "How quickly can I list my parking space?",
//         answer: "You can list it in just minutes, add your details, set availability, and you're ready for bookings at launch!",
//     },
// ];

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
