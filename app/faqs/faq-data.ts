export interface FaqItemData {
    question: string;
    answer: string;
}

export const hostFaqs: FaqItemData[] = [
    {
        question: "Do I have to host all the time?",
        answer: "No. You choose when your space is available and can pause or stop hosting anytime. You have full control over your schedule."
    },
    {
        question: "How do I get paid?",
        answer: "Payments are processed securely through our platform and deposited directly into your linked bank account. You can track your earnings in real-time."
    },
    {
        question: "What kind of parking spaces can I list?",
        answer: "You can list driveways, garages, empty lots, or even commercial spaces. As long as you have the legal right to rent out the space, you can list it."
    },
    {
        question: "Is my property protected?",
        answer: "We have verify drivers and provide terms of service that protect hosts. For added peace of mind, we recommend checking your homeowner's or business insurance."
    },
    {
        question: "What if a driver stays longer than booked?",
        answer: "Our system tracks booking times. If a driver overstays, they are charged an additional fee, portion of which goes to you as compensation."
    }
];

export const driverFaqs: FaqItemData[] = [
    {
        question: "How do I book a parking space?",
        answer: "Simply search for your destination, browse available spaces, select the time you need, and book instantly through the app."
    },
    {
        question: "Is my booking guaranteed?",
        answer: "Yes, once you receive a confirmation, the space is reserved exclusively for you during the booked time slot."
    },
    {
        question: "Can I cancel my booking?",
        answer: "Yes, you can cancel your booking according to the host's cancellation policy. Details are provided for each listing before you book."
    },
    {
        question: "How do I access the parking space?",
        answer: "Access instructions are provided in the app once your booking is confirmed. This may include a gate code, specific instructions on where to park, or a digital key."
    },
    {
        question: "What if the space is occupied when I arrive?",
        answer: "In the rare event that the space is unavailable, contact our 24/7 support immediately. We will help you find an alternative or process a full refund."
    }
];
