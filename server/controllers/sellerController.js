import jwt from 'jsonwebtoken'

//Login Seller : /api/seller/login

export const sellerLogin = async (req,res) =>{
    try {
        const {email,password} = req.body

    if(password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL){
        const token = jwt.sign({email},process.env.JWT_SECRET,{expiresIn:'7d'});

         res.cookie('sellerToken',token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: process.env.NODE_ENV ==='production' ? 'none' : 'strict', 
            maxAge: 7 * 24 * 60 * 1000, 
        });

        return res.json({success:true,message: "Logged In"});

    }else{
        return res.json({success:false,message: "Invalid Credentials"});
    }
    } catch (error) {
        console.log( error.message);
        res.json({success:false,message: error.message});
        
    }
}

//Seller Auth: /api/seller/is-auth
export const isSellerAuth = async (req, res) => {
    try {
      
      res.json({ success: true, });
    } catch (err) {
      res.json({ success: false, message: err.message });
    }
  };

  //Logout Seller: /api/seller/logout

export const sellerLogout = async (req, res) => {
    try {
      res.clearCookie('sellertoken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      });
  
      return res.json({ success: true, message: 'Logged out successfully' });
    } catch (err) {
      console.log(err.message);
      res.json({ success: false, message: err.message });
    }
  };

