import { HiOutlineClock, HiOutlinePlus } from "react-icons/hi2";
import { MdOutlinePriceChange } from "react-icons/md";
import { TbAdjustmentsHorizontal } from "react-icons/tb";

import { AnimatedFeatureSection } from "@/components";
import { FUNCTIONS_CONTENT, FUNCTIONS_ITEMS } from "@/constants/functions";
import functionsBackground from "@/assets/landing_page/functions/background.png";
import functionsIcon from "@/assets/landing_page/functions/icon.png";

const iconProps = { size: 20, className: "block" };

const Functions = () => {
    const items = [
        {
            ...FUNCTIONS_ITEMS[0],
            icon: <HiOutlinePlus {...iconProps} />,
        },
        {
            ...FUNCTIONS_ITEMS[1],
            icon: <TbAdjustmentsHorizontal {...iconProps} />,
        },
        {
            ...FUNCTIONS_ITEMS[2],
            icon: <MdOutlinePriceChange {...iconProps} />,
        },
        {
            ...FUNCTIONS_ITEMS[3],
            icon: <HiOutlineClock {...iconProps} />,
        },
    ];

    return (
        <AnimatedFeatureSection
            id="features"
            backgroundImage={functionsBackground}
            title={
                <>
                    {FUNCTIONS_CONTENT.title.prefix}{" "}
                    <span className="text-brand">{FUNCTIONS_CONTENT.title.highlight1}</span>{" "}
                    {FUNCTIONS_CONTENT.title.middle}{" "}
                    <span className="text-brand">{FUNCTIONS_CONTENT.title.highlight2}</span>{" "}
                    {FUNCTIONS_CONTENT.title.suffix}
                </>
            }
            description={FUNCTIONS_CONTENT.description}
            items={items}
            illustration={functionsIcon}
            illustrationClassName=""
            className="overflow-hidden"
        />
    );
};

export default Functions;
