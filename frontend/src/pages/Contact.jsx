import authorImage1 from "../assets/contact_img.png"; 
import authorImage2 from "../assets/contact_img.png"; 

const Contact = () => {
  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Contact the Authors</h2>

      {/* Bố cục 2 tác giả */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Tác giả 1 */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
          <img
            src={authorImage1}
            alt="Author 1"
            className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Author 1</h3>
          <p className="text-gray-700 mb-2">Nguyễn Tuấn Kiệt</p>

          <div className="mb-4">
            <h4 className="text-lg font-medium text-gray-800">Email</h4>
            <p className="text-gray-700">522h0058@student.tdtu.edu.vn</p>
          </div>

          <div className="mb-4">
            <h4 className="text-lg font-medium text-gray-800">Phone</h4>
            <p className="text-gray-700">+84 (987) 654-3210</p>
          </div>

          <div className="mb-4">
            <h4 className="text-lg font-medium text-gray-800">About</h4>
            <p className="text-gray-700">
            Kiet is a student at Ton Duc Thang University.
            </p>
          </div>
        </div>

        {/* Tác giả 2 */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
          <img
            src={authorImage2}
            alt="Author 2"
            className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Author 2</h3>
          <p className="text-gray-700 mb-2">Nguyễn Hoàng Trung Chánh</p>

          <div className="mb-4">
            <h4 className="text-lg font-medium text-gray-800">Email</h4>
            <p className="text-gray-700">522h0044@student.tdtu.edu.vn</p>
          </div>

          <div className="mb-4">
            <h4 className="text-lg font-medium text-gray-800">Phone</h4>
            <p className="text-gray-700">+84 (987) 654-3210</p>
          </div>

          <div className="mb-4">
            <h4 className="text-lg font-medium text-gray-800">About</h4>
            <p className="text-gray-700">
            Chanh is a student at Ton Duc Thang University.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;