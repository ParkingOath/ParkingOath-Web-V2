"use client";

import { HiOutlineSearch, HiOutlineMicrophone } from "react-icons/hi";
import { MdOutlinePriceChange, MdOutlineCompareArrows } from "react-icons/md";
import { TbNavigation } from "react-icons/tb";

import { AnimatedFeatureSection } from "@/components";
import { DRIVER_FEATURES_CONTENT, DRIVER_FEATURES_ITEMS } from "@/constants/driver-features";
import functionsBackground from "@/assets/landing_page/functions/background.png";
import driverIllustration from "@/assets/landing_page/driver/illustration.png";

const iconProps = { size: 20, className: "block" };

const DriverFeatures = () => {
    const items = [
        {
            ...DRIVER_FEATURES_ITEMS[0],
            icon: <HiOutlineSearch {...iconProps} />,
        },
        {
            ...DRIVER_FEATURES_ITEMS[3], // "Compare parking options..." is item 3 in DRIVER_FEATURES_ITEMS
            icon: <MdOutlineCompareArrows {...iconProps} />,
        },
        {
            ...DRIVER_FEATURES_ITEMS[4], // "Clear pricing upfront" is item 4
            icon: <MdOutlinePriceChange {...iconProps} />,
        },
        {
            ...DRIVER_FEATURES_ITEMS[1], // "Voice search..." is item 1
            icon: <HiOutlineMicrophone {...iconProps} />,
        },
        {
            ...DRIVER_FEATURES_ITEMS[2], // "Navigate straight..." is item 2
            icon: <TbNavigation {...iconProps} />,
        },
    ];

    return (
        <AnimatedFeatureSection
            id="driver-features"
            backgroundImage={functionsBackground}
            title={
                <>
                    {DRIVER_FEATURES_CONTENT.title.prefix} <span className="text-brand">{DRIVER_FEATURES_CONTENT.title.highlight}</span> {DRIVER_FEATURES_CONTENT.title.suffix}
                </>
            }
            description={DRIVER_FEATURES_CONTENT.description}
            items={items}
            illustration={driverIllustration}
            className="overflow-hidden"
        />
    );
};

export default DriverFeatures;
