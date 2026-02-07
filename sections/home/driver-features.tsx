"use client";

import { HiOutlineSearch } from "react-icons/hi";
import { MdOutlineCompareArrows, MdOutlinePriceChange } from "react-icons/md";
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
            ...DRIVER_FEATURES_ITEMS[1],
            icon: <TbNavigation {...iconProps} />,
        },
        {
            ...DRIVER_FEATURES_ITEMS[2],
            icon: <MdOutlineCompareArrows {...iconProps} />,
        },
        {
            ...DRIVER_FEATURES_ITEMS[3],
            icon: <MdOutlinePriceChange {...iconProps} />,
        },
        {
            ...DRIVER_FEATURES_ITEMS[4],
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
            illustrationClassName=""
            className="overflow-hidden"
        />
    );
};

export default DriverFeatures;
