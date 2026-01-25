import { HiOutlineClock, HiOutlinePlus } from "react-icons/hi2";
import { MdOutlinePriceChange } from "react-icons/md";
import { TbAdjustmentsHorizontal } from "react-icons/tb";

import { AnimatedFeatureSection } from "@/components";
import functionsBackground from "@/assets/landing_page/functions/background.png";
import functionsIcon from "@/assets/landing_page/functions/icon.png";

const iconProps = { size: 20, className: "block" };

const items = [
    {
        title: "Quick Space Listing",
        description:
            "List your driveway or off-street parking in minutes with just the essentials.",
        icon: <HiOutlinePlus {...iconProps} />,
    },
    {
        title: "Simple Availability Control",
        description:
            "Choose when your space is available using broad time windows. Pause or update anytime.",
        icon: <TbAdjustmentsHorizontal {...iconProps} />,
    },
    {
        title: "Flexible Pricing",
        description:
            "Set an hourly rate or a full-day price. Drivers pay only for the time they use.",
        icon: <MdOutlinePriceChange {...iconProps} />,
    },
    {
        title: "Smart Use of Time",
        description:
            "If a driver leaves early, your space can become available again for the remaining time.",
        icon: <HiOutlineClock {...iconProps} />,
    },
];

const Functions = () => {
    return (
        <AnimatedFeatureSection
            id="features"
            backgroundImage={functionsBackground}
            title={
                <>
                    Built to be{" "}
                    <span className="text-[#1b3cc4]">simple</span> for{" "}
                    <span className="text-[#1b3cc4]">hosts</span>
                </>
            }
            description="Parking Oath is designed to make hosting easy, flexible, and low effort. You stay in control while the platform handles discovery and navigation for drivers."
            items={items}
            illustration={functionsIcon}
            className="overflow-hidden"
        />
    );
};

export default Functions;
