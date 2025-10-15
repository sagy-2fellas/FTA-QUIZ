import styles from "../style";
import Image from "next/image";
import Link from "next/link";
const Home = () => {
  return (
    <div className="relative ">
      <div className="bgHomeHero h-full  w-screen md:w-1/2  absolute right-0 "></div>
      <div className={`${styles.boxWidth} mx-auto  `}>
        <div className="grid md:grid-cols-2  ">
          <div className="flex flex-col justify-center  2xl:space-y-8 space-y-4 sm:space-y-8  mx-auto z-50 py-4 lg:py-20">
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-0">
              <Image
                src="/img/logo-fairtrade.png"
                width={180}
                height={216}
                alt="Fairtrade Africa logo"
                className="w-20 sm:w-28 md:w-32 h-auto"
                priority
              />
            </div>
            <div className="  border-l-2 lg:py-14 border-ft-blue">
              <div className="2xl:space-y-8 sm:space-y-4 space-y-2 mx-10">
                <h1 className="font-alegreya 2xl:text-7xl text-white md:text-black lg:text-5xl  text-4xl">
                  Meet the human who grows your favourite drink.
                </h1>
                <p className="font-exo text-xl md:text-2xl text-white md:text-gray-700">
                  Spoiler alert: You're not treating them fairly.
                </p>
                <div>
                  <Link href="/#WhoMe">
                    <button className="shadow-xl border rounded-2xl border-white bg-white md:border-black py-1 px-4 md:px-10 sm:text-3xl text-2xl  font-alegreya text-black md:text-black  w-3/4 sm:w-auto">
                      Who, me?
                    </button>
                  </Link>
                </div>
                <p className="font-exo text-base md:text-lg text-white md:text-gray-700">
                  Pssst! Doing the quiz is also your entry to an amazing
                  giveaway. More details at the end of the quiz!
                </p>
                <div className="sm:flex gap-x-6">
                  <div>
                    <Link href="/quiz">
                      <button className="cursor-pointer shadow-xl border rounded-2xl text-ft-light-green bg-ft-blue border-ft-blue py-1 px-4 md:px-10 text-2xl sm:text-3xl font-alegreya w-3/4 sm:w-auto mt-4 sm:mt-0">
                        Take the quiz
                      </button>
                    </Link>
                    <p className="font-exo text-xl md:text-center text-white md:text-black  mt-2">
                      It only takes 2 minutes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:block sm:col-span-1 "></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
