import {
    HiOutlineCheckCircle,
    HiOutlineLockClosed,
    HiOutlineMapPin,
    HiOutlineMicrophone,
    HiOutlinePlus,
} from "react-icons/hi2";
import { MdOutlinePriceChange } from "react-icons/md";

import { ProcessSteps } from "@/components/ProcessSteps";

const HowItWorks = () => {
    return (
        <>
            <ProcessSteps
                id="how-it-works"
                title={
                    <>
                        For <span className="text-brand">drivers</span>
                    </>
                }
                steps={[
                    {
                        step: "Step 1",
                        title: "Find it now",
                        description:
                            "Open the app and find a verified space near you, right now. No booking ahead.",
                        icon: <HiOutlineMapPin size={20} />,
                    },
                    {
                        step: "Step 2",
                        title: "Ask by voice",
                        description: "Ask hands free by voice while you drive, then go.",
                        icon: <HiOutlineMicrophone size={20} />,
                    },
                    {
                        step: "Step 3",
                        title: "Park",
                        description:
                            "Park. Your spot is reserved and the host knows you are coming.",
                        icon: <HiOutlineCheckCircle size={20} />,
                    },
                ]}
                ctaLabel="Find parking"
                ctaHref="/early-access"
            />
            <ProcessSteps
                id="how-it-works-hosts"
                title={
                    <>
                        For <span className="text-brand">hosts</span>
                    </>
                }
                steps={[
                    {
                        step: "Step 1",
                        title: "List your space",
                        description: "List your driveway, garage or carport in a few minutes.",
                        icon: <HiOutlinePlus size={20} />,
                    },
                    {
                        step: "Step 2",
                        title: "Get paid instantly",
                        description:
                            "An identity verified driver books. The payout flows the moment the booking completes.",
                        icon: <MdOutlinePriceChange size={20} />,
                    },
                    {
                        step: "Step 3",
                        title: "Stay in control",
                        description:
                            "You stay in control: set your hours, choose who parks, switch it off whenever you need the space.",
                        icon: <HiOutlineLockClosed size={20} />,
                    },
                ]}
                ctaLabel="List your space"
                ctaHref="/hosts#early-access-form"
            />
        </>
    );
};

export default HowItWorks;
