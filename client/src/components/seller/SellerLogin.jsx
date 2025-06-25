// import React, { useEffect, useState } from "react";
// import { useAppContext } from "../../context/AppContext";

// const SellerLogin = () => {
//   const { isSeller, setIsSeller, navigate } = useAppContext();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
//     setIsSeller(true);
//   };

//   useEffect(() => {
//     if (isSeller) {
//       navigate("/seller");
//     }
//   }, [isSeller]);

//   return (
//     !isSeller && (
//       <form
//         onSubmit={onSubmitHandler}
//         className="min-h-screen flex items-center text-sm
//     text-gray-600"
//       >
//         <div>
//           <p className="text-2xl font-medium -auto">
//             <span className="text-primary">Seller</span>
//             Login
//           </p>

//           <div className="w-full">
//                 <p>Email</p>
//                 <input type="email"
//                 className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" 
//                 required/>
//           </div>

//           <div className="w-full">
//                 <p>Password</p>
//                 <input type="password" 
//                 className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
//                 required/>
//           </div>
//           <button className="bg-primary text-white w-full py-2 rounded-md
//           cursor-pointer">Login</button>
//         </div>
//       </form>
//     )
//   );
// };

// export default SellerLogin;


import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate,axios } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const{data} = await axios.post('/api/seller/login',{email,password})
      if(data.success){
        setIsSeller(true)
        navigate('/seller')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    
  };

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller]);

  return (
    !isSeller && (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <form
          onSubmit={onSubmitHandler}
          className="w-full max-w-md bg-white shadow-md rounded-xl p-8 space-y-6 text-sm text-gray-700"
        >
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-1">
              <span className="text-primary">Seller</span> Login
            </h2>
            <p className="text-gray-500 text-sm">Sign in to your seller dashboard</p>
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              className="border border-gray-300 rounded w-full p-2.5 outline-none focus:ring-2 focus:ring-primary transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              className="border border-gray-300 rounded w-full p-2.5 outline-none focus:ring-2 focus:ring-primary transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2.5 rounded-md font-medium hover:bg-primary-dull transition"
          >
            Login
          </button>
        </form>
      </div>
    )
  );
};

export default SellerLogin;
