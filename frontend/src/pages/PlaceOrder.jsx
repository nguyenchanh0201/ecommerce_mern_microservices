import Title from '../components/Title';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');

  // Customer information state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');

  const { navigate, updateQuantity } = useContext(ShopContext);
  const backendUrl = useContext(ShopContext);


  // Download list of provinces/cities
  useEffect(() => {
    axios.get('https://provinces.open-api.vn/api/?depth=1')
      .then(response => {
        setCities(response.data);
      })
      .catch(error => {
        console.error('Error loading list of provinces/cities:', error);
      });
  }, []);

  // Download the list of districts when selecting a province/city
  useEffect(() => {
    if (selectedCity) {
      axios.get(`https://provinces.open-api.vn/api/p/${selectedCity}?depth=2`)
        .then(response => {
          setDistricts(response.data.districts);
          setWards([]); // Reset wards
          setSelectedDistrict('');
          setSelectedWard('');
        })
        .catch(error => {
          console.error('Error loading district list:', error);
        });
    }
  }, [selectedCity]);

  // Download the list of communes/wards when selecting a district/ward
  useEffect(() => {
    if (selectedDistrict) {
      axios.get(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
        .then(response => {
          setWards(response.data.wards);
          setSelectedWard('');
        })
        .catch(error => {
          console.error('Error loading list of communes/wards:', error);
        });
    }
  }, [selectedDistrict]);

  // Handle form submission to place the order
  const handlePlaceOrder = async () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    const ids = Object.keys(cartItems);
    const quantities = Object.values(cartItems);
    
    const total = localStorage.getItem('total');

    const orderData = {
      ids,
      quantities,
      total,
      
    };

    // Step 1: Check if the token exists
    const token = localStorage.getItem('token'); 
    // Assuming the token is saved in localStorage
    
    
    const city = cities.find((city) => city.code == selectedCity).name;
    const district = districts.find((district) => district.code == selectedDistrict).name;
    const ward = wards.find((ward) => ward.code == selectedWard).name;
    

    if (token) {
      // Step 2: Token exists, update user's address profile
      const addressData = {
        name: `${firstName} ${lastName}`,
        street: street, // Customizable street address
        city: city,
        district: district,
        ward: ward,
        phoneNumber: phone,
        isDefault: true,
      };
      

      axios.post(`${backendUrl.backendUrl}/account/profile/address`, addressData, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token to the headers
        },
      })
        .then(response => {
          console.log('Address added successfully:', response.data);
          // After address update, navigate to the orders page
          navigate('/orders');
        })
        .catch(error => {
          console.error('Error adding address:', error);
        });


        try {
          const response = await axios.post(`${backendUrl.backendUrl}/products/buy`, orderData, {
            headers: {
              Authorization: `Bearer ${token}`, // Attach the Bearer token
              'Content-Type': 'application/json', // Ensure proper content type
            },
          });
          localStorage.removeItem('cartItems');
          localStorage.removeItem('total');
          console.log(cartItems);
          //updateQuantity
          
        } catch (error) {
          console.error('Error placing order:', error);
        }
      
        

    } else {
      navigate('/login'); 
    }

    // Step 4: Send orderData to your backend for placing the order (you can send it to a different endpoint if needed)
    
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* Left Side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY '} text2={'INFORMATION'} />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />

        {/* Dropdown Province/City */}
        <select
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="">Select province/city</option>
          {cities.map((city) => (
            <option key={city.code} value={city.code}>
              {city.name}
            </option>
          ))}
        </select>

        {/* Dropdown District */}
        <select
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          disabled={!selectedCity}
        >
          <option value="">Select district</option>
          {districts.map((district) => (
            <option key={district.code} value={district.code}>
              {district.name}
            </option>
          ))}
        </select>

        {/* Dropdown Commune/Ward */}
        <select
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          value={selectedWard}
          onChange={(e) => setSelectedWard(e.target.value)}
          disabled={!selectedDistrict}
        >
          <option value="">Select commune/ward</option>
          {wards.map((ward) => (
            <option key={ward.code} value={ward.code}>
              {ward.name}
            </option>
          ))}
        </select>


      </div>

      {/* Right Side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">

        </div>
        <div className="mt-12">
          <Title text1={'PAYMENT '} text2={'METHOD'} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod('cod')}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}
              ></p>
              <p className="text-gray-500 text-sm font-medium">CASH ON DELIVERY</p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button onClick={handlePlaceOrder} className="bg-black text-white px-16 py-3 text-sm">
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
