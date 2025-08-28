import React, { useContext, useEffect } from "react";
import { SlideContext } from "../pages/quiz";

function Stepper() {
  let activeStepIndex = useContext(SlideContext);

  useEffect(() => {
    const stepperItems = document.querySelectorAll(".stepper-item");

    const stepperLines = document.querySelectorAll(".stepper-line");
    stepperItems.forEach((step, i) => {
      if (i === activeStepIndex[0]) {
        step.classList.add("!bg-ft-light-green");
      } else {
        step.classList.remove("!bg-ft-light-green");
      }
    });
    stepperLines.forEach((step, i) => {
      if (i <= activeStepIndex[0]) {
        step.classList.add("!border-ft-blue");
      } else {
        step.classList.remove("!border-ft-blue");
      }
    });
  }, [activeStepIndex]);
  return (
    <section className="z-10">
      <h3 className="mb-2 sm:mb-4 text-lg sm:text-xl font-alegreya">Quiz Questions</h3>

      <div className="w-full sm:w-4/6 flex flex-row items-center justify-start z-10 overflow-x-auto">
        <div className="stepper-item bg-black h-8 w-8 sm:h-10 sm:w-10 lg:w-12 lg:h-12 flex items-center justify-center text-center font-medium border-2 rounded-full min-w-[32px] sm:min-w-[40px] lg:min-w-[48px]">
          <p className="text-ft-blue font-exo text-sm sm:text-base">1</p>
        </div>

        <div className="w-1 sm:w-2 border-t-2 border-black stepper-line"></div>
        <div className="stepper-item bg-black h-8 w-8 sm:h-10 sm:w-10 lg:w-12 lg:h-12 flex items-center justify-center text-center font-medium border-2 rounded-full min-w-[32px] sm:min-w-[40px] lg:min-w-[48px]">
          <p className="text-ft-blue font-exo text-sm sm:text-base">2</p>
        </div>
        <div className="w-1 sm:w-2 border-t-2 border-black stepper-line"></div>
        <div className="stepper-item bg-black h-8 w-8 sm:h-10 sm:w-10 lg:w-12 lg:h-12 flex items-center justify-center text-center font-medium border-2 rounded-full min-w-[32px] sm:min-w-[40px] lg:min-w-[48px]">
          <p className="text-ft-blue font-exo text-sm sm:text-base">3</p>
        </div>
        <div className="w-1 sm:w-2 border-t-2 border-black stepper-line"></div>
        <div className="stepper-item bg-black h-8 w-8 sm:h-10 sm:w-10 lg:w-12 lg:h-12 flex items-center justify-center text-center font-medium border-2 rounded-full min-w-[32px] sm:min-w-[40px] lg:min-w-[48px]">
          <p className="text-ft-blue font-exo text-sm sm:text-base">4</p>
        </div>
        <div className="w-1 sm:w-2 border-t-2 border-black stepper-line"></div>
        <div className="stepper-item bg-black h-8 w-8 sm:h-10 sm:w-10 lg:w-12 lg:h-12 flex items-center justify-center text-center font-medium border-2 rounded-full min-w-[32px] sm:min-w-[40px] lg:min-w-[48px]">
          <p className="text-ft-blue font-exo text-sm sm:text-base">5</p>
        </div>
        <div className="w-1 sm:w-2 border-t-2 border-black stepper-line"></div>
        <div className="stepper-item bg-black h-8 w-8 sm:h-10 sm:w-10 lg:w-12 lg:h-12 flex items-center justify-center text-center font-medium border-2 rounded-full min-w-[32px] sm:min-w-[40px] lg:min-w-[48px]">
          <p className="text-ft-blue font-exo text-sm sm:text-base">6</p>
        </div>
        <div className="w-1 sm:w-2 border-t-2 border-black stepper-line"></div>
        <div className="stepper-item bg-black h-8 w-8 sm:h-10 sm:w-10 lg:w-12 lg:h-12 flex items-center justify-center text-center font-medium border-2 rounded-full min-w-[32px] sm:min-w-[40px] lg:min-w-[48px]">
          <p className="text-ft-blue font-exo text-sm sm:text-base">7</p>
        </div>
        <div className="w-1 sm:w-2 border-t-2 border-black stepper-line"></div>
        <div className="stepper-item bg-black h-8 w-8 sm:h-10 sm:w-10 lg:w-12 lg:h-12 flex items-center justify-center text-center font-medium border-2 rounded-full min-w-[32px] sm:min-w-[40px] lg:min-w-[48px]">
          <p className="text-ft-blue font-exo text-sm sm:text-base">8</p>
        </div>
      </div>
    </section>
  );
}

export default Stepper;
