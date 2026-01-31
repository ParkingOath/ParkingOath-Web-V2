"use client";

import { HiOutlineSearch, HiOutlineMicrophone } from "react-icons/hi";
import { MdOutlinePriceChange, MdOutlineCompareArrows } from "react-icons/md";
import { TbNavigation } from "react-icons/tb";

import { AnimatedFeatureSection } from "@/components";
import functionsBackground from "@/assets/landing_page/functions/background.png";
import driverIllustration from "@/assets/landing_page/driver/illustration.png";

const iconProps = { size: 20, className: "block" };

const items = [
    {
        title: "See Parking Near Your Destination",
        description:
            "Find parking options close to where you're going instead of circling nearby streets.",
        icon: <HiOutlineSearch {...iconProps} />,
    },
    {
        title: "Compare Options Before You Arrive",
        description:
            "View different parking choices - private spaces and nearby car parks - in one place.",
        icon: <MdOutlineCompareArrows {...iconProps} />,
    },
    {
        title: "Clear Pricing Upfront",
        description:
            "See pricing information before you decide, so there are no surprises when you arrive.",
        icon: <MdOutlinePriceChange {...iconProps} />,
    },
    {
        title: "Voice Search",
        description:
            "Use voice commands to find parking naturally while driving.",
        icon: <HiOutlineMicrophone {...iconProps} />,
    },
    {
        title: "Navigate straight to your spot",
        description:
            "Use in-app navigation to drive directly to your chosen parking location.",
        icon: <TbNavigation {...iconProps} />,
    },
];

const DriverFeatures = () => {
    return (
        <AnimatedFeatureSection
            id="driver-features"
            backgroundImage={functionsBackground}
            title={
                <>
                    Built to Make <span className="text-brand">Parking Easier</span>
                </>
            }
            description="Everything drivers need to find parking with less stress and less guessing."
            items={items}
            illustration={driverIllustration}
            className="overflow-hidden"
        />
    );
};

export default DriverFeatures;
