import styles from "../../style";
import FactCard from "../FactCard";
import { useState, useEffect, useRef } from "react";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { addCoffee } from "../../slices/QThreeSlice";
import QuizNavigation from "../QuizNavigation";

const QuestionThree = () => {
  const dispatch = useDispatch();
  const min = 1;
  const max = 5;
  const allowedValues = [1, 2, 3, 4, 5];
  const [value, setValue] = useState(3);
  const [dragging, setDragging] = useState(false);
  const constraintsRef = useRef();
  const handleRef = useRef();
  const progressBarRef = useRef();
  const handleSize = 80; // Reduced for better mobile experience
  const handleX = useMotionValue(0);
  const progress = useTransform(handleX, (v) => v + handleSize / 2);
  const background = useMotionTemplate`linear-gradient(90deg, #C1D42F ${progress}px, #d1d5db 0)`;

  function handleDrag() {
    let handleBounds = handleRef.current.getBoundingClientRect();
    let middleOfHandle = handleBounds.x + handleBounds.width / 2;
    let progressBarBounds = progressBarRef.current.getBoundingClientRect();
    let newProgress =
      (middleOfHandle - progressBarBounds.x) / progressBarBounds.width;
    setValue(Math.round(newProgress * (max - min)) + min); // Ensure it stays within the range
  }

  function handleDragEnd() {
    // Snap to the nearest allowed value when dragging ends
    snapToClosestValue(value);
  }

  function snapToClosestValue(currentValue) {
    const closestValue = allowedValues.reduce((prev, curr) => {
      return Math.abs(curr - currentValue) < Math.abs(prev - currentValue)
        ? curr
        : prev;
    });

    setValue(closestValue);

    let progressBarBounds = progressBarRef.current.getBoundingClientRect();
    const newProgress =
      ((closestValue - min) / (max - min)) * progressBarBounds.width; // Adjust for min value

    animate(handleX, newProgress);
  }

  // Update handle size based on viewport width

  useEffect(() => {
    const updateInitialPosition = () => {
      let newProgress = (value - min) / (max - min); // Adjust for min value
      let progressBarBounds = progressBarRef.current.getBoundingClientRect();
      handleX.set(newProgress * progressBarBounds.width);
    };

    // Delay setting the initial position until layout is fully measured
    setTimeout(updateInitialPosition, 0);
  }, [handleX, min, max, value]);

  const displayedValue = () => {
    if (value === 1) return "None. I run on vibes.";
    if (value === 2) return "A cup here, a cup there.";
    if (value === 3) return "Don't talk to me before my third mug.";
    if (value === 4) return "Coffee is my love language.";
    if (value === 5) return "Espresso is my blood type.";
    return Math.floor(value); // Default case (if needed)
  };

  const navigatePrev = () => {
    window.fullpage_api.moveSectionUp();
  };
  const navigateNext = () => {
    if (value != "") {
      window.fullpage_api.moveSectionDown();
      // onAddAnswer(value, "slide1");
      dispatch(addCoffee(value));
    }
  };

  const [factToggled3, setFactToggled3] = useState(false);

  return (
    <div className="relative w-full">
      {" "}
      <div className={`${styles.boxWidth} h-full z-0 mx-auto`}>
        {/* NAVIGATION */}
        <div>
          <div className="hidden lg:block">
            <QuizNavigation
              navigateNext={navigateNext}
              navigatePrev={navigatePrev}
              value={value}
            />
          </div>
          <div
            className={`z-10 absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 space-y-3 lg:hidden`}
          >
            <div
              className={
                value != ""
                  ? "bg-ft-dark-green h-14 w-14 sm:h-16 sm:w-16 rounded-l-full flex items-center justify-center cursor-pointer shadow-lg touch-manipulation min-h-[44px] min-w-[44px]"
                  : "bg-ft-dark-green h-14 w-14 sm:h-16 sm:w-16 rounded-l-full flex items-center justify-center shadow-lg touch-manipulation min-h-[44px] min-w-[44px]"
              }
              onClick={navigatePrev}
              role="button"
              tabIndex={0}
              aria-label="Previous question"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  navigatePrev();
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="white"
                className="w-6 h-6 sm:w-7 sm:h-7 rotate-180"
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
                value != ""
                  ? "bg-ft-dark-green h-14 w-14 sm:h-16 sm:w-16 rounded-l-full flex items-center justify-center cursor-pointer shadow-lg touch-manipulation min-h-[44px] min-w-[44px]"
                  : "bg-gray-500 h-14 w-14 sm:h-16 sm:w-16 rounded-l-full flex items-center justify-center shadow-lg touch-manipulation min-h-[44px] min-w-[44px]"
              }
              onClick={() => {
                if (value !== "") {
                  setFactToggled3(!factToggled3);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label="Show fact"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  if (value !== "") {
                    setFactToggled3(!factToggled3);
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
                className="w-6 h-6 sm:w-7 sm:h-7"
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
        {factToggled3 && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-sm w-full mx-4 max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-alegreya text-lg sm:text-xl border-l-2 border-ft-blue pl-2 flex-1">
                    Six-year olds ensure your coffee stays nice and cheap
                  </h3>
                  <button
                    onClick={() => {
                      setFactToggled3(false);
                    }}
                    className="ml-4 bg-ft-dark-green text-white w-8 h-8 rounded-full flex items-center justify-center font-exo text-lg touch-manipulation min-h-[44px] min-w-[44px]"
                    aria-label="Close fact"
                  >
                    ×
                  </button>
                </div>
                <div className="mb-6">
                  <p className="font-exo text-sm sm:text-base leading-relaxed">
                    The cost of living is at an all-time high. Children as young
                    as six years old in coffee-producing countries are doing their
                    part to ensure your coffee stays affordable. They work between
                    8 and 10 hours a day.
                  </p>
                  <p className="font-exo text-xs sm:text-sm mt-3 text-gray-600">
                    ILO (2004): International Programme on the Elimination of
                    Child Labour, Safety and Health Fact Sheet: Hazardous Child
                    Labour in Agriculture Coffee - Geneva. ILO_REF: INT/00/000/AAA
                  </p>
                </div>
                <button
                  className="bg-ft-dark-green text-white px-6 py-3 rounded-md shadow-lg font-exo text-base w-full touch-manipulation min-h-[44px]"
                  onClick={() => {
                    window.fullpage_api.moveSectionDown();
                    dispatch(addCoffee(value));
                    setFactToggled3(false);
                  }}
                >
                  Go to Next Question
                </button>
              </div>
            </div>
          </div>
        )}
        {/* END NAVIGATION FACT */}

        {/* CONTENT SECTION */}
        <div className="flex  h-[92vh] lg:h-[95vh] 2xl:h-[90vh] pb-20 lg:pb-0">
          <div className="hidden lg:flex flex-initial w-1/5 2xl:w-1/6 items-end">
            <FactCard link="#">
              <h3 className="font-alegreya sm:text-2xl border-l-2 border-ft-blue pl-2 mb-4">
                Six-year olds ensure your coffee stays nice and cheap
              </h3>
              <p className="font-exo sm:text-sm text-xs">
                The cost of living is at an all-time high. Children as young as
                six years old in coffee-producing countries are doing their part
                to ensure your coffee stays affordable. They work between 8 and
                10 hours a day.
              </p>
              <p className="font-exo sm:text-xs text-xs mt-2">
                ILO (2004): International Programme on the Elimination of Child
                Labour, Safety and Health Fact Sheet: Hazardous Child Labour in
                Agriculture Coffee - Geneva. ILO_REF: INT/00/000/AAA
              </p>
            </FactCard>
          </div>
          <div className="flex flex-col items-center justify-between  flex-initial w-full lg:w-3/5 2xl:w-4/6  gap-y-14 lg:gap-16 2xl:gap-y-20">
            {" "}
            <motion.h2
              initial={{ opacity: 0, y: 300 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, type: "spring", delay: 0.5 }}
              className="font-alegreya text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:!text-5xl 2xl:!text-7xl pt-16 xs:pt-20 sm:pt-24 lg:pt-40 2xl:!pt-56 text-center px-4 leading-tight"
            >
              How would you describe your
              <span className="block sm:inline"> coffee ritual?</span>
            </motion.h2>
            <div className="flex justify-center">
              {!dragging && (
                <motion.div
                  key={displayedValue()}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="message-box shadow-xl border border-white bg-white pb-4 pt-2 px-6 md:px-10 text-xl sm:text-2xl md:text-3xl font-alegreya text-black text-center min-w-[200px] sm:min-w-[250px]"
                >
                  {displayedValue()}
                </motion.div>
              )}
            </div>
            <div className="lg:p-8 w-full px-4 sm:px-6">
              <div
                data-test="slider"
                className="relative flex flex-col justify-center"
              >
                <motion.div
                  data-test="slider-background"
                  className="absolute w-full h-4 rounded-full"
                  style={{
                    background,
                  }}
                />

                {/* Indicators with values */}
                <div className="absolute w-full px-2 sm:px-4 md:px-8 lg:px-10">
                  <div className="flex justify-between">
                    <span className="h-8 sm:h-10 lg:h-10 w-3 sm:w-4 bg-black rounded-full"></span>
                    <span className="h-8 sm:h-10 lg:h-10 w-3 sm:w-4 bg-black rounded-full"></span>
                    <span className="h-8 sm:h-10 lg:h-10 w-3 sm:w-4 bg-black rounded-full"></span>
                    <span className="h-8 sm:h-10 lg:h-10 w-3 sm:w-4 bg-black rounded-full"></span>
                    <span className="h-8 sm:h-10 lg:h-10 w-3 sm:w-4 bg-black rounded-full"></span>
                  </div>
                </div>
                <div
                  data-test="slider-progress"
                  ref={progressBarRef}
                  className="absolute"
                  style={{
                    left: handleSize / 2,
                    right: handleSize / 2,
                  }}
                />
                <div ref={constraintsRef} className="relative select-none">
                  <motion.div
                    data-test="slider-handle"
                    ref={handleRef}
                    className="relative z-20 bg-transparent rounded-full cursor-pointer touch-manipulation touch-pan-x"
                    drag="x"
                    dragMomentum={false}
                    dragConstraints={constraintsRef}
                    dragElastic={0}
                    onDrag={handleDrag}
                    onDragStart={() => setDragging(true)}
                    onDragEnd={() => {
                      setDragging(false);
                      handleDragEnd(); // Call snapping function
                    }}
                    onPointerDown={() => setDragging(true)}
                    onPointerUp={() => setDragging(false)}
                    animate={{
                      scale: dragging ? 1.5 : 1,
                    }}
                    style={{
                      width: handleSize,
                      height: handleSize,
                      x: handleX,
                      backgroundImage: `url('/img/2.png')`, // Set your image path here
                      backgroundSize: "cover",

                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></motion.div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex flex-initial w-1/5 2xl:w-1/6"></div>
        </div>

        {/* CONTENT SECTION */}
      </div>
    </div>
  );
};

function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

export default QuestionThree;
