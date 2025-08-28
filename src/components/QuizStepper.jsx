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
      <h3 className="lg:mb-4 text-xl font-alegreya">Quiz Questions</h3>

      <div className="sm:w-4/6  flex flex-row items-center justify-start z-10">
        <div className="stepper-item bg-black h-7 w-7 lg:w-10 lg:h-10 flex items-center justify-center text-center font-medium border-2 rounded-full">
          <p className="text-ft-blue font-exo">1</p>
        </div>

        <div className="w-2  border-t-2 border-black stepper-line "></div>
        <div className="stepper-item bg-black h-7 w-7 lg:w-10 lg:h-10 flex items-center justify-center text-center font-medium border-2 rounded-full">
          <p className="text-ft-blue font-exo">2</p>
        </div>
        <div className="w-2  border-t-2 border-black stepper-line "></div>
        <div className="stepper-item bg-black h-7 w-7 lg:w-10 lg:h-10 flex items-center justify-center text-center font-medium border-2 rounded-full">
          <p className="text-ft-blue font-exo">3</p>
        </div>
        <div className="w-2  border-t-2 border-black stepper-line "></div>
        <div className="stepper-item bg-black h-7 w-7 lg:w-10 lg:h-10 flex items-center justify-center text-center font-medium border-2 rounded-full">
          <p className="text-ft-blue font-exo">4</p>
        </div>
        <div className="w-2  border-t-2 border-black stepper-line "></div>
        <div className="stepper-item bg-black h-7 w-7 lg:w-10 lg:h-10 flex items-center justify-center text-center font-medium border-2 rounded-full">
          <p className="text-ft-blue font-exo">5</p>
        </div>
        <div className="w-2  border-t-2 border-black stepper-line "></div>
        <div className="stepper-item bg-black h-7 w-7 lg:w-10 lg:h-10 flex items-center justify-center text-center font-medium border-2 rounded-full">
          <p className="text-ft-blue font-exo">6</p>
        </div>
        <div className="w-2  border-t-2 border-black stepper-line "></div>
        <div className="stepper-item bg-black h-7 w-7 lg:w-10 lg:h-10 flex items-center justify-center text-center font-medium border-2 rounded-full">
          <p className="text-ft-blue font-exo">7</p>
        </div>
        <div className="w-2  border-t-2 border-black stepper-line "></div>
        <div className="stepper-item bg-black h-7 w-7 lg:w-10 lg:h-10 flex items-center justify-center text-center font-medium border-2 rounded-full">
          <p className="text-ft-blue font-exo">8</p>
        </div>
      </div>
    </section>
  );
}

export default Stepper;
