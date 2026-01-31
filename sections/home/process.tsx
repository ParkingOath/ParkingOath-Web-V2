import { HiOutlineCheckCircle, HiOutlinePlus } from "react-icons/hi2";
import { MdOutlinePriceChange } from "react-icons/md";

import { ProcessSteps } from "@/components";

const steps = [
  {
    step: "Step 1",
    title: "List your parking space",
    description:
      "Add your driveway or off-street space to Parking Oath. Include basic details like location, access notes, and when it’s available.",
    icon: <HiOutlinePlus size={20} />,
  },
  {
    step: "Step 2",
    title: "Set simple availability",
    description:
      "Our platform makes managing your space’s availability simple. Just set your preferences, and we’ll handle the rest.",
    icon: <HiOutlineCheckCircle size={20} />,
  },
  {
    step: "Step 3",
    title: "Drivers park, you earn",
    description:
      "Once a driver reserves your spot, payment is processed instantly. Your earnings are then directly deposited into your account.",
    icon: <MdOutlinePriceChange size={20} />,
  },
];

const ProcessSection = () => {
  return (
    <ProcessSteps
      id="how-it-works"
      title={
        <>
          How process <span className="text-brand">works</span>
        </>
      }
      steps={steps}
      ctaLabel="Get Started"
    />
  );
};

export default ProcessSection;
