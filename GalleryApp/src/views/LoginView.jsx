import { Link } from 'react-router-dom';
import backgroundImage from '../assets/eric-park-QbX8A8eHfzw-unsplash.jpg';

// https://flowbite.com/docs/forms/input-field/  for the input field design
// https://flowbite.com/docs/buttons/  for the button design
// https://flowbite.com/docs/cards/  for the card design

const LoginView = () => {
  return (
    <div  className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat font-['Poppins']" style={{backgroundImage: `url(${backgroundImage})`}}>
    <div className="transform -translate-x-[35px] bg-white p-10 rounded-2xl shadow-[0_10px_25px_rgba(65,1,56,0.1)] w-[340px] text-center">
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">Gallery App</h1>
      <div className="flex flex-col gap-5 mb-4">
        <input  type="text" placeholder="Username" className="px-5 py-4 border-2 border-gray-100 rounded-xl text-base font-normal w-full box-border transition-all ease-in-out duration-300 bg-gray-50 text-gray-800 focus:outline-none focus:border-gray-500 focus:shadow-[0_0_0_4px_rgba(85,85,85,0.1)] focus:bg-white"/>
        <input 
          type="password" 
          placeholder="Password" 
          className="px-5 py-4 border-2 border-gray-100 rounded-xl text-base font-normal w-full box-border transition-all ease-in-out duration-300 bg-gray-50 text-gray-800 focus:outline-none focus:border-gray-500 focus:shadow-[0_0_0_4px_rgba(85,85,85,0.1)] focus:bg-white"/>
        <Link 
          to='/gallery'
          className="py-4 bg-gray-800 text-white border-none rounded-xl text-base font-medium cursor-pointer transition-all ease-in-out duration-300 w-full mt-2 tracking-wider shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:bg-gray-700 hover:-translate-y-0.5 hover:shadow-[0_6px_15px_rgba(0,0,0,0.2)] active:translate-y-0 active:shadow-[0_4px_8px_rgba(0,0,0,0.1)]">
          Login
        </Link>
      </div>
      <p className="text-xs text-gray-500 mt-6 font-light">
        Photo by Eric Park on Unsplash
      </p>
    </div>
  </div>
  );
}

export default LoginView;