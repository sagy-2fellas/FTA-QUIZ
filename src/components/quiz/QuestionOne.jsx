import styles from "../../style";
import Map from "../svg/Map";
import SlideOneChar from "../svg/SlideOneChar";
import FactCard from "../FactCard";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProvince } from "../../slices/QOneSlice";
import { motion } from "framer-motion";

const QuestionOne = ({}) => {
  const [value, setValue] = useState("");

  // const province = useSelector((state) => state.QuestionOne.value);
  const dispatch = useDispatch();

  const handleSelection = (mapSelection) => {
    setValue(mapSelection);
  };

  const navigateNext = () => {
    if (value != "") {
      window.fullpage_api.moveSectionDown();
      // onAddAnswer(value, "slide1");
      dispatch(addProvince(value));
    }
  };
  const [factToggled1, setFactToggled1] = useState(false);
  return (
    <div className={`${styles.boxWidth}  mx-auto z-0 h-full `}>
      {/* NAVIGATION */}

      <div className="z-10 absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 lg:-translate-y-[15%]">
        <div className="relative">
          <div className="absolute right-0 -top-32 sm:-top-40 lg:-top-52 buttonNotice-mobile buttonNotice">
            <h2 className="font-alegreya text-xs sm:text-sm lg:text-base xl:text-xl rotate-90 lg:-translate-x-1 text-ft-blue whitespace-nowrap w-8 sm:w-10 lg:w-12 hidden xs:block">
              Click here to go to the next question
            </h2>
          </div>
          <div
            className={
              value === ""
                ? "bg-gray-500 h-12 w-12 sm:h-14 sm:w-14 rounded-l-full flex items-center justify-center shadow-lg relative lg:hidden min-h-[44px] min-w-[44px] touch-manipulation"
                : "bg-ft-dark-green h-12 w-12 sm:h-14 sm:w-14 rounded-l-full flex items-center justify-center cursor-pointer shadow-lg lg:hidden min-h-[44px] min-w-[44px] touch-manipulation"
            }
            onClick={() => {
              if (value !== "") {
                setFactToggled1(!factToggled1);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={value === "" ? "Select a province first" : "Show fact and continue"}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (value !== "") {
                  setFactToggled1(!factToggled1);
                }
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="white"
              className="w-5 h-5 sm:w-6 sm:h-6"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
              />
            </svg>
          </div>
          <div
            className={
              value === ""
                ? "bg-gray-500 h-12 w-12 sm:h-14 sm:w-14 rounded-l-full lg:flex items-center justify-center shadow-lg relative hidden min-h-[44px] min-w-[44px]"
                : "bg-ft-dark-green h-12 w-12 sm:h-14 sm:w-14 rounded-l-full lg:flex items-center justify-center cursor-pointer shadow-lg hidden min-h-[44px] min-w-[44px] touch-manipulation"
            }
            onClick={navigateNext}
            role="button"
            tabIndex={0}
            aria-label="Go to next question"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigateNext();
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="white"
              className="w-5 h-5 sm:w-6 sm:h-6"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* END NAVIGATION */}

      {/* NAVIGATION FACT */}
      <div className="lg:hidden">
        <div
          className={
            factToggled1
              ? `fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4`
              : `hidden`
          }
        >
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-auto relative">
            <button
              onClick={() => {
                setFactToggled1(!factToggled1);
              }}
              className="absolute -top-2 -right-2 bg-ft-dark-green text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg font-exo text-lg min-h-[44px] min-w-[44px] touch-manipulation"
              aria-label="Close fact popup"
            >
              ×
            </button>
            <div className="p-4 pt-6">
              <h3 className="font-alegreya text-lg sm:text-xl border-l-2 border-ft-blue pl-2 mb-4">
                This isn't about farmers vs farm workers
              </h3>
              <p className="font-exo text-sm leading-relaxed mb-6">
                This is about you. Farmers and farm workers alike need you to
                choose fairness so farming can remain sustainable. By choosing
                products with the Fairtrade logo, you're choosing sustainable
                farming, decent work, and fair relationships between farmers,
                farm workers and the retailers who buy their products. By
                choosing Fairtrade, you're choosing transparency.
              </p>
              <button
                className="bg-ft-dark-green text-white px-6 py-3 rounded-md shadow-lg font-exo text-base w-full min-h-[44px] touch-manipulation"
                onClick={() => {
                  window.fullpage_api.moveSectionDown();
                  dispatch(addProvince(value));
                  setFactToggled1(false);
                }}
              >
                Go to Next Question
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* END NAVIGATION FACT */}

      {/* CONTENT */}
      <div className="h-full w-full flex flex-col lg:flex-row">
        <div className="flex items-center justify-center lg:justify-start h-auto lg:h-full lg:flex-initial lg:w-1/4 px-4 py-6 lg:py-0">
          <motion.h2
            initial={{ opacity: 0, y: 300 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "spring", delay: 0.5 }}
            className="font-alegreya text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-center lg:text-left leading-tight max-w-xs sm:max-w-md lg:max-w-[20rem]"
          >
            Where do you live in South Africa?
          </motion.h2>
        </div>
        <div className="flex items-center justify-center flex-1 pb-4 sm:pb-6 lg:pb-0 px-4">
          <div className="w-full max-w-md sm:max-w-lg lg:max-w-none">
            <Map selectProvince={handleSelection} />
          </div>
        </div>
        <div className="hidden lg:flex justify-between pr-12 flex-col items-end pt-28 xl:pt-40 flex-1">
          <div>
            <FactCard link="#">
              <h3 className="font-alegreya text-lg xl:text-xl 2xl:text-2xl border-l-2 border-ft-blue pl-2 mb-4">
                This isn't about farmers vs farm workers
              </h3>
              <p className="font-exo text-sm xl:text-base">
                This is about you. Farmers and farm workers alike need you to
                choose fairness so farming can remain sustainable. By choosing
                products with the Fairtrade logo, you're choosing sustainable
                farming, decent work, and fair relationships between farmers,
                farm workers and the retailers who buy their products. By
                choosing Fairtrade, you're choosing transparency.
              </p>
            </FactCard>
          </div>
          <div className="h-40 xl:h-56 2xl:h-auto w-auto">
            <SlideOneChar />
          </div>
        </div>
      </div>

      {/* END CONTENT */}
    </div>
  );
};

export default QuestionOne;
