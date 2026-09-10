
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-[#fff7ed] text-gray-900 overflow-hidden">

      {/* =========================================================
          BACKGROUND DECORATIONS
      ========================================================== */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-orange-300/20 blur-3xl"></div>

        <div className="absolute top-[30%] -right-40 w-[500px] h-[500px] rounded-full bg-yellow-200/30 blur-3xl"></div>

        <div className="absolute bottom-[-200px] left-[30%] w-[500px] h-[500px] rounded-full bg-red-200/20 blur-3xl"></div>

      </div>


      {/* =========================================================
          HERO SECTION
      ========================================================== */}

      <section className="relative min-h-screen flex items-center">

        <div className="max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-12 py-16 lg:py-20">

          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-14 xl:gap-20 items-center">


            {/* =================================================
                LEFT SIDE
            ================================================== */}

            <div className="relative z-10 text-center lg:text-left">


              {/* Badge */}

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur border border-orange-200 shadow-sm">

                <span className="relative flex h-2.5 w-2.5">

                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>

                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>

                </span>

                <span className="text-xs sm:text-sm font-bold tracking-[0.18em] uppercase text-orange-600">
                  Welcome to TastyBites
                </span>

              </div>


              {/* Heading */}

              <h1 className="mt-7 text-[3.5rem] sm:text-6xl md:text-7xl xl:text-[5.8rem] font-black leading-[0.92] tracking-[-0.04em]">

                Good Food.

                <br />

                <span className="relative inline-block text-orange-500">

                  Good Mood.

                  <span className="absolute -bottom-2 left-0 w-full h-2 bg-orange-200/70 rounded-full -z-10"></span>

                </span>

              </h1>


              {/* Description */}

              <p className="mt-8 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg leading-8 text-gray-600">

                Fresh ingredients, bold flavors, and unforgettable
                meals — carefully prepared to make every bite worth
                remembering.

              </p>


              {/* Buttons */}

              <div className="mt-9 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">

                <Link
                  to="/menu"
                  className="group relative overflow-hidden inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gray-950 text-white font-bold shadow-xl shadow-gray-900/20 hover:shadow-2xl hover:shadow-orange-500/20 hover:-translate-y-1 transition-all duration-300"
                >

                  <span className="relative z-10">
                    Explore Menu
                  </span>

                  <span className="relative z-10 text-xl group-hover:translate-x-1 transition-transform">
                    →
                  </span>

                  <span className="absolute inset-0 bg-orange-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>

                </Link>


                <div className="inline-flex items-center justify-center px-6 py-4 rounded-2xl bg-white/70 backdrop-blur border border-orange-100 text-gray-700 font-semibold">

                  <span className="text-orange-500 mr-2">
                    ★
                  </span>

                  Loved by food lovers

                </div>

              </div>


              {/* =================================================
                  STATS
              ================================================== */}

              <div className="mt-12 grid grid-cols-3 max-w-xl mx-auto lg:mx-0 border-t border-orange-200 pt-7">

                <div className="text-center lg:text-left">

                  <p className="text-2xl sm:text-3xl font-black">
                    50+
                  </p>

                  <p className="mt-1 text-xs sm:text-sm text-gray-500">
                    Dishes
                  </p>

                </div>


                <div className="text-center lg:text-left border-l border-orange-200 pl-4 sm:pl-7">

                  <p className="text-2xl sm:text-3xl font-black">
                    4.9
                    <span className="text-orange-500 text-lg">
                      ★
                    </span>
                  </p>

                  <p className="mt-1 text-xs sm:text-sm text-gray-500">
                    Rating
                  </p>

                </div>


                <div className="text-center lg:text-left border-l border-orange-200 pl-4 sm:pl-7">

                  <p className="text-2xl sm:text-3xl font-black">
                    100%
                  </p>

                  <p className="mt-1 text-xs sm:text-sm text-gray-500">
                    Fresh
                  </p>

                </div>

              </div>

            </div>


            {/* =================================================
                RIGHT SIDE — FOOD VISUAL
            ================================================== */}

            <div className="relative flex justify-center items-center min-h-[420px] sm:min-h-[500px]">


              {/* Large orange circle */}

              <div className="absolute w-[300px] h-[300px] sm:w-[430px] sm:h-[430px] lg:w-[500px] lg:h-[500px] rounded-full bg-gradient-to-br from-orange-400 via-orange-300 to-yellow-200 opacity-80"></div>


              {/* Outer ring */}

              <div className="absolute w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] lg:w-[560px] lg:h-[560px] rounded-full border border-orange-300/60"></div>


              {/* Decorative ring */}

              <div className="absolute w-[370px] h-[370px] sm:w-[510px] sm:h-[510px] lg:w-[590px] lg:h-[590px] rounded-full border border-dashed border-orange-300/50"></div>


              {/* Main food card */}

              <div className="relative z-10 w-[270px] h-[330px] sm:w-[350px] sm:h-[420px] lg:w-[390px] lg:h-[460px] rounded-[3rem] bg-white/90 backdrop-blur-xl shadow-2xl shadow-orange-900/20 border border-white flex flex-col items-center justify-center rotate-2 hover:rotate-0 transition-transform duration-500">


                {/* Top label */}

                <div className="absolute top-6 left-6 px-3 py-1.5 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-wider">

                  Chef's Pick

                </div>


                {/* Food */}

                <div className="text-[8rem] sm:text-[10rem] lg:text-[11rem] drop-shadow-2xl">

                  🍔

                </div>


                {/* Food title */}

                <h2 className="mt-2 text-2xl sm:text-3xl font-black">
                  Tasty Burger
                </h2>


                <p className="mt-2 text-sm text-gray-500">
                  Fresh • Juicy • Delicious
                </p>


                {/* Price */}

                <div className="mt-5 px-5 py-2 rounded-full bg-gray-950 text-white font-bold">

                  Chef's Special

                </div>


              </div>


              {/* =================================================
                  FLOATING CARD 1
              ================================================== */}

              <div className="absolute z-20 top-3 right-0 sm:right-2 lg:-right-3 bg-white rounded-2xl p-3 sm:p-4 shadow-xl border border-orange-100">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center text-xl">
                    🔥
                  </div>

                  <div>

                    <p className="text-xs text-gray-400">
                      Popular
                    </p>

                    <p className="font-bold text-sm">
                      Customer Favorite
                    </p>

                  </div>

                </div>

              </div>


              {/* =================================================
                  FLOATING CARD 2
              ================================================== */}

              <div className="absolute z-20 bottom-5 left-0 sm:left-0 lg:-left-8 bg-white rounded-2xl p-3 sm:p-4 shadow-xl border border-orange-100">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center text-lg">
                    ✓
                  </div>

                  <div>

                    <p className="text-xs text-gray-400">
                      Quality
                    </p>

                    <p className="font-bold text-sm">
                      Fresh Ingredients
                    </p>

                  </div>

                </div>

              </div>


              {/* Decorative dots */}

              <div className="absolute top-16 left-3 w-4 h-4 rounded-full bg-orange-500"></div>

              <div className="absolute top-28 left-14 w-2.5 h-2.5 rounded-full bg-yellow-400"></div>

              <div className="absolute bottom-20 right-4 w-5 h-5 rounded-full bg-red-300"></div>


            </div>

          </div>

        </div>


        {/* =======================================================
            SCROLL INDICATOR
        ======================================================== */}

        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-gray-400">

          <span className="text-[10px] uppercase tracking-[0.3em]">
            Discover
          </span>

          <div className="w-px h-8 bg-orange-300"></div>

        </div>

      </section>


      {/* =========================================================
          FEATURE STRIP
      ========================================================== */}

      <section className="relative px-5 sm:px-8 lg:px-12 pb-16">

        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">


            {/* Feature 1 */}

            <div className="group p-6 rounded-3xl bg-white/70 backdrop-blur border border-orange-100 hover:bg-white hover:-translate-y-1 shadow-sm hover:shadow-xl transition-all duration-300">

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  🥗
                </div>

                <div>

                  <h3 className="font-bold">
                    Fresh Ingredients
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Quality in every bite
                  </p>

                </div>

              </div>

            </div>


            {/* Feature 2 */}

            <div className="group p-6 rounded-3xl bg-white/70 backdrop-blur border border-orange-100 hover:bg-white hover:-translate-y-1 shadow-sm hover:shadow-xl transition-all duration-300">

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  👨‍🍳
                </div>

                <div>

                  <h3 className="font-bold">
                    Made With Love
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Crafted by our chefs
                  </p>

                </div>

              </div>

            </div>


            {/* Feature 3 */}

            <div className="group p-6 rounded-3xl bg-white/70 backdrop-blur border border-orange-100 hover:bg-white hover:-translate-y-1 shadow-sm hover:shadow-xl transition-all duration-300">

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  ❤️
                </div>

                <div>

                  <h3 className="font-bold">
                    Made For You
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Your cravings, our mission
                  </p>

                </div>

              </div>

            </div>


          </div>

        </div>

      </section>


      {/* Bottom Accent */}

      <div className="h-1.5 bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-500"></div>

    </div>
  );
}

export default Home;
