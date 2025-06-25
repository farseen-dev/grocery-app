// import User from '../models/User.js'

// //Update User CartData : /api/cart/update

// export const updateCart = async (req,res)=>{
//     try {
//         const {userId,cartItems} = req.body
//         await User.findByIdAndUpdate(userId,{cartItems})
//         res.json({success: true,message: "Cart Updated"})

//     } catch (error) {
//         console.log(error.message);
//         res.json({success:false,message: error.message})
        
        
//     }
// }



import User from '../models/User.js';

// Update User Cart: POST /api/cart/update
export const updateCart = async (req, res) => {
  try {
    const { cartItems } = req.body;

    if (!cartItems || typeof cartItems !== 'object') {
      return res.status(400).json({ success: false, message: 'Invalid cart data' });
    }

    // Get user ID from auth middleware (req.user was set there)
    const userId = req.user._id;

    // Update the user's cart field
    await User.findByIdAndUpdate(userId, { cart: cartItems });

    res.json({ success: true, message: 'Cart updated successfully' });
  } catch (error) {
    console.error('❌ Cart update error:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
