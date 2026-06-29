import Link from "next/link";
import { HiOutlineHome, HiOutlineMapPin, HiOutlineUserGroup } from "react-icons/hi2";

import { Container } from "@/components";

const cards = [
    {
        label: "Drivers",
        description: "Stop circling. Find a secure, verified space the moment you need it.",
        linkLabel: "For drivers",
        href: "/drivers",
        icon: <HiOutlineMapPin size={22} />,
    },
    {
        label: "Hosts",
        description: "Your driveway is worth more than you think. Earn on your terms.",
        linkLabel: "For hosts",
        href: "/hosts",
        icon: <HiOutlineHome size={22} />,
    },
    {
        label: "Ambassadors",
        description:
            "Help your community park, and earn for every host who joins through you. No joining fee.",
        linkLabel: "Become an Ambassador",
        href: "/ambassadors",
        icon: <HiOutlineUserGroup size={22} />,
    },
];

const AudiencePaths = () => {
    return (
        <section className="bg-white">
            <Container className="py-16 lg:py-20">
                <div className="grid gap-6 sm:grid-cols-3">
                    {cards.map((card) => (
                        <div
                            key={card.label}
                            className="flex flex-col gap-4 rounded-3xl border border-slate-200/60 bg-white p-8 shadow-sm"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
                                {card.icon}
                            </div>
                            <p className="text-lg font-bold text-black">{card.label}</p>
                            <p className="text-[#64748b]">{card.description}</p>
                            <Link
                                href={card.href}
                                className="mt-auto inline-flex items-center gap-1 font-semibold text-brand hover:text-brand-dark"
                            >
                                {card.linkLabel} <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default AudiencePaths;
