import { HiOutlineCheckCircle, HiOutlinePlus } from "react-icons/hi2";
import { MdOutlinePriceChange } from "react-icons/md";

import { ProcessSteps } from "@/components";
import { PROCESS_STEPS_CONTENT, PROCESS_STEPS } from "@/constants/process";

const ProcessSection = () => {
  const steps = [
    {
      ...PROCESS_STEPS[0],
      icon: <HiOutlinePlus size={20} />,
    },
    {
      ...PROCESS_STEPS[1],
      icon: <HiOutlineCheckCircle size={20} />,
    },
    {
      ...PROCESS_STEPS[2],
      icon: <MdOutlinePriceChange size={20} />,
    },
  ];

  return (
    <ProcessSteps
      id="how-it-works"
      title={
        <>
          {PROCESS_STEPS_CONTENT.title.text} <span className="text-brand">{PROCESS_STEPS_CONTENT.title.highlight}</span>
        </>
      }
      steps={steps}
      ctaLabel={PROCESS_STEPS_CONTENT.cta}
      ctaHref="/early-access"
    />
  );
};

export default ProcessSection;
