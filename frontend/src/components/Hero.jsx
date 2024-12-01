import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row bg-blue-400 text-white">
      {/* Hero Left Side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 px-6 sm:px-10">
        <div className="text-center sm:text-left">
          <div className="flex items-center gap-2 mb-4 justify-center sm:justify-start">
            <div className="w-12 h-[2px] bg-yellow-400"></div>
            <p className="font-semibold text-sm md:text-base uppercase tracking-wide text-yellow-400">
              Our Bestsellers
            </p>
          </div>
          <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight text-white">
            Latest Arrivals
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-300 max-w-xl mx-auto sm:mx-0">
            Discover our latest collection of high-quality products that are
            sure to catch your eye. Shop now and stay ahead of the trends.
          </p>
          <div className="flex items-center gap-6 mt-6 justify-center sm:justify-start">
            <button className="font-semibold text-sm md:text-base text-white bg-yellow-400 py-2 px-6 rounded hover:bg-yellow-500 transition">
              Shop Now
            </button>
            <div className="w-10 h-[2px] bg-yellow-400"></div>
          </div>
        </div>
      </div>

      {/* Hero Right Side */}
      <div className="w-full sm:w-1/2">
        <img
          className="w-full h-full object-cover"
          src={assets.hero_img}
          alt="Hero"
        />
      </div>
    </div>
  );
};

export default Hero;
