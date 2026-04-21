export interface FaqItemData {
    question: string;
    answer: string;
}

export const hostFaqs: FaqItemData[] = [
    {
        question: "What kind of parking spaces can I list?",
        answer: "You can list a driveway or private off-street parking space that is legally available and accessible to drivers."
    },
    {
        question: "Do I have to commit to hosting my parking space?",
        answer: "No. You are always in control. List your parking space when it suits you, pause it at any time, and stop whenever you want."
    },
    {
        question: "How do I get paid for my parking space?",
        answer: "When a driver parks in your space, payment is processed through the app and deposited to you. No cash handling and no admin."
    },
    {
        question: "Can I choose who parks in my space?",
        answer: "You control how your space is used by setting clear access instructions and rules. Drivers are expected to follow the details you provide."
    },
    {
        question: "What if my space is only available for short periods?",
        answer: "Short availability works well. ParkingOath is designed for high-turnover parking, so even brief windows can be listed and used."
    }
];

export const driverFaqs: FaqItemData[] = [
    {
        question: "How does ParkingOath help me find parking?",
        answer: "ParkingOath shows parking as it becomes available near your destination. Set your preferences, say where you're going, and the app guides you to parking without circling or guessing."
    },
    {
        question: "Do I need to book parking in advance?",
        answer: "No. ParkingOath is built for real-time parking, not advance bookings. It's designed for busy conditions where timing matters."
    },
    {
        question: "Can I use ParkingOath while driving?",
        answer: "Yes. ParkingOath supports voice-led search, so you can find parking hands-free while driving and stay focused on the road."
    },
    {
        question: "What happens if the parking spot is no longer available?",
        answer: "ParkingOath reflects live parking availability. If a space is no longer available, the app directs you to the next closest option so you can keep moving."
    },
];
