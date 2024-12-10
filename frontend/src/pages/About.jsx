import aboutImg from "../assets/about_img.png";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">About Us</h2>
      <div className="flex items-center">
        {/* Hình ảnh */}
        <div className="w-1/2 pr-6">
          <img
            src={aboutImg}
            alt="About Us"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>

        {/* Nội dung */}
        <div className="w-1/2">
          <p className="text-lg text-gray-700">
            Welcome to our website! We are students of Ton Duc Thang University. Our site sells all kinds of laptop products.
          </p>
          <p className="mt-4 text-lg text-gray-700">
          We do not have much experience in the industry and are always striving to improve to serve you better. Thank you for visiting our website!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
