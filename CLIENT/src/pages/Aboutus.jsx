import HomeLayout from "../layouts/HomeLayout";
import aboutMainImage from "../assets/images/aboutMainImage.png";
import stevejobs from "../assets/images/stevejobs.png";
import apj from "../assets/images/apj.png";
import billgates from "../assets/images/billGates.png";
import nelsonMandela from "../assets/images/nelsonMandela.png";
import einstein from "../assets/images/einstein.png";

function Aboutus() {
  return (
    <HomeLayout>
      <div className="flex flex-col text-white pl-20 pt-20">
        <div className="flex items-center gap-5 mx-10">
          <section className="w-1/2 space-y-10">
            <h1 className="text-5xl text-yellow-500 font-semibold">
              Affordable and quality education
            </h1>
            <p className="text-xl text-gray-200">
              our goal is to provide the affordable and quality education to the
              world. we are providing the platform for the aspiring teachers and
              students to share their skills, creativity and knowledge to eacg
              other to empower and contribute in the growth and wellness of
              mankind.
            </p>
          </section>
          <div className="w-1/2">
            <img
              src={aboutMainImage}
              alt="about main image"
              className="drop-shadow-2xl"
              id="test1"
            />
          </div>
        </div>
        <div className="carousel w-1/2 my-10 mx-auto">
          <div id="slide1" className="carousel-item relative w-full">
            <div className="flex flex-col  items-center justify-center gap-4 px-[15%]">
              <img
                src={apj}
                className="w-40 rounded-full border-2 border-gray-400"
              />
              <p className="text-xl text-gray-200">
                Teaching is a very noble profession that shapes the character,
                caliber, and future of an individual.
              </p>
              <h3 className="text-2xl font-semibold">APJ Abdul Kalam</h3>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide4" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide2" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
          <div id="slide2" className="carousel-item relative w-full">
            <div className="flex flex-col  items-center justify-center gap-4 px-[15%]">
              <img
                src={stevejobs}
                className="w-40 rounded-full border-2 border-gray-400"
              />
              <p className="text-xl text-gray-200">
                Your work is going to fill a large part of your life, and the
                only way to be truly satisfied is to do what you believe is
                great work.
              </p>
              <h3 className="text-2xl font-semibold">stevejobs</h3>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide1" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide3" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
          <div id="slide3" className="carousel-item relative w-full">
            <div className="flex flex-col  items-center justify-center gap-4 px-[15%]">
              <img
                src={einstein}
                className="w-40 rounded-full border-2 border-gray-400"
              />
              <p className="text-xl text-gray-200">
                Creativity is intelligence having fun.
              </p>
              <h3 className="text-2xl font-semibold">Einstein</h3>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide2" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide4" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
          <div id="slide4" className="carousel-item relative w-full">
            <div className="flex flex-col  items-center justify-center gap-4 px-[15%]">
              <img
                src={billgates}
                className="w-40 rounded-full border-2 border-gray-400"
              />
              <p className="text-xl text-gray-200">
                What's amazing is, if young people understood how doing well in
                school makes the rest of their life so much interesting, they
                would be more motivated.
              </p>
              <h3 className="text-2xl font-semibold">Billgates</h3>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide3" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide1" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
export default Aboutus;
