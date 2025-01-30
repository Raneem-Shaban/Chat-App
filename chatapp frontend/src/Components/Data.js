import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../CssFiles/Sign.css'
const reader = new FileReader();

function Data() {
  const navigate = useNavigate();
  const [base64String, setBase64String] = useState('');
  const [file, setFile] = useState('');
  const [username, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const handleSubmit = async (event) => {
        console.log(email,password);
        event.preventDefault();
        fetch('http://localhost:1337/api/classes/_User',{
            method : 'POST',
            headers:{
              'X-Parse-Application-Id': 'appId',
              'X-Parse-REST-API-Key': 'restAPIKey'
            },
            body: JSON.stringify({image:base64String ,username,mobileNumber ,email, password,dateOfBirth,city,area})})
            .then(result => {
            console.log( "this the amer"+result+result.data);
            if(result.data ==='Invalid'){
                alert("E-mail already registered! Please Login to proceed.");
                navigate('/signpass');
            }
            else{
                    alert("Registered successfully! Please Login to proceed.")
                    console.log(result.data);
                    navigate('/Homepage');
                }
})}
const handleImageUpload = (e) => {
    const [file] = e.target.files;
    setFile(file)
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const result = reader.result;
        setBase64String(result);
      };
      reader.readAsDataURL(file);
      };
      reader.readAsDataURL(file);
    }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-gray-300 w-24 h-24 flex items-center justify-center positon-rel ">
          {/* <img src={file} alt="My Image"  className="positon-abs  border-none"/> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-gray-500 z1"
              viewBox="0 0 20 20"
              fill="currentColor"
              
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            <p className=" text-white  rounded-full bg-teal-500  hover:bg-teal-700  text-center positon-abs top-20 border-none left-14 w-6 h-6 rounded z3">+</p>
            <input type="file" accept="image/*" onChange={handleImageUpload} multiple={false} className=" border-none opacity-0 w-24 h-24  positon-abs focus:border-teal-500 z3"/>
            <div className="positon-abs z2 w-24">
              <img src={base64String} alt="" className="  h-24 rounded-full" />
            </div>
            </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="full-name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-teal-500"
              value={username}
              placeholder="Full name"
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              id="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-teal-500"
              value={mobileNumber}
              placeholder="Phone Number"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-teal-500"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-teal-500"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4 flex">
            <input
              type="date"
              // id="date-of-birth"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-teal-500"
              // value={'mm/dd/yy'}
              // placeholder='Date of Birth'
              name="party"
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>

          <div className="mb-4 flex">
            <div className="w-1/2 mr-2">
              <select
                id="city"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:text-teal-500"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value=""> City</option>
                {/* Add options for cities here */}
              </select>
            </div>
            <div className="w-1/2">
              <select
                id="area"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:text-teal-500"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              >
                <option value="">Area</option>
                {/* Add options for areas here */}
              </select>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              onClick={handleSubmit}
              className="  bg-teal-400 w-full hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline">
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Data;