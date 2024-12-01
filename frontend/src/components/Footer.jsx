import { assets } from "../assets/assets"

const Footer = () => {
  return (
    <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm font-sans">
        <div className="flex flex-col gap-4">
            <img src={assets.logo} className="mb-5 w-32" alt="Logo" />
            <p className="w-full md:w-2/3 text-gray-700 text-base">
                We are a team of talented developers making websites and apps
                for you. We can make your business grow.
            </p>
        </div>
        <div>
            <p className="text-xl font-semibold mb-5 text-gray-800">COMPANY</p>
            <ul className="flex flex-col gap-2 text-gray-600">
                <li className="hover:text-primary transition-colors">About us</li>
                <li className="hover:text-primary transition-colors">Our services</li>
                <li className="hover:text-primary transition-colors">Delivery</li>
                <li className="hover:text-primary transition-colors">Privacy policy</li>
            </ul>
        </div>
        <div>
            <p className="text-xl font-semibold mb-5 text-gray-800">CONTACT</p>
            <ul className="flex flex-col gap-2 text-gray-600">
                <li className="text-base">Address: Ton Duc Thang University, 19 Đ. Nguyễn Hữu Thọ, Tân Hưng, Quận 7, Hồ Chí Minh, Vietnam</li>
                <li className="text-base">Phone: +123 456 7890</li>
                <li className="text-base">Email: 522h0058@student.tdtu.edu.vn
                                                
                </li>
            </ul>
        </div>
        <div className="col-span-full mt-10 text-center">
            <hr className="border-gray-300 mb-4" />
            <p className="py-5 text-sm text-gray-600">Copyright © 2024 kietchanhshop - All rights reserved</p>
        </div>
    </div>
  )
}

export default Footer;
