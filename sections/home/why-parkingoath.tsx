import {
    HiOutlineBolt,
    HiOutlineLockClosed,
    HiOutlineMapPin,
    HiOutlineMicrophone,
    HiOutlineShieldCheck,
    HiOutlineUserGroup,
} from "react-icons/hi2";

import { Container, H2, Text } from "@/components";

const items = [
    {
        title: "Park now, from your car.",
        description:
            "Find a space in real time, right where you are. No planning from home like the others.",
        icon: <HiOutlineMapPin size={20} />,
    },
    {
        title: "Hands-free voice search.",
        description: "Ask for a park by voice and keep your eyes on the road.",
        icon: <HiOutlineMicrophone size={20} />,
    },
    {
        title: "Every driver verified.",
        description: "Identity is checked before anyone can book.",
        icon: <HiOutlineShieldCheck size={20} />,
    },
    {
        title: "Paid the moment they park.",
        description: "Hosts are paid when a booking completes, not at month-end.",
        icon: <HiOutlineBolt size={20} />,
    },
    {
        title: "You stay in control.",
        description: "No tenant relationship, no lock-in, your space your rules.",
        icon: <HiOutlineLockClosed size={20} />,
    },
    {
        title: "Community-shaped.",
        description: "Built with locals who grow it and help shape what we build next.",
        icon: <HiOutlineUserGroup size={20} />,
    },
];

const WhyParkingOath = () => {
    return (
        <section id="features" className="bg-slate-50">
            <Container className="py-16 lg:py-20">
                <div className="mx-auto max-w-3xl text-center">
                    <H2>Built on a promise, not a transaction.</H2>
                </div>
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((item) => (
                        <div
                            key={item.title}
                            className="flex flex-col gap-4 rounded-3xl border border-slate-200/60 bg-white p-6 shadow-sm"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white">
                                {item.icon}
                            </div>
                            <p className="text-base font-semibold text-black">{item.title}</p>
                            <Text tone="muted">{item.description}</Text>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default WhyParkingOath;
