import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Collection from "./pages/Collection"
import About from "./pages/About"
import Contact from "./pages/Contact"
import PlaceOrder from "./pages/PlaceOrder"
import Cart from "./pages/Cart"
import Signup from "./pages/Signup"
import Product from "./pages/Product"
import Orders from "./pages/Orders"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import SearchBar from "./components/SearchBar"
import Login from "./pages/Login"
import VerifyEmail from "./pages/VerifyEmail"
import Profile from "./pages/Profile"
import ResetPassword from "./pages/reset-password"
import ChangePassword from "./pages/change-password"

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <Navbar />
        <SearchBar />
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/collection' element={<Collection/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path = '/product/:productId' element={<Product/>}/>
            <Route path = '/cart' element={<Cart/>} />
            <Route path = '/signup' element={<Signup/>} />
            <Route path = '/login' element={<Login/>} />
            <Route path = '/place-order' element={<PlaceOrder/>} />
            <Route path = '/orders' element={<Orders/>} />
            <Route path = '/verify-email' element={<VerifyEmail/>} />
            <Route path = '/profile' element={<Profile/>} />
            <Route path = '/reset-password' element={<ResetPassword/>} />
            <Route path = '/change-password' element={<ChangePassword/>} />
        </Routes>
        <Footer />
    </div>
  )
}

export default App