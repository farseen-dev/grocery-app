import jwt from 'jsonwebtoken';

const authSeller = async (req,resizeBy,next)=>{
    const{ sellerToken } =req.cookies;

    if(!sellerToken){
        return resizeBy.json({success: false,message: 'Not Authorised'});
    }

    
      try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    
        if (tokenDecode.email === process.env.SELLER_EMAIL) {
          next();
        } else {
          return res.json({ success: false, message: 'Not Authorized' });
        }
      } catch (err) {
        res.json({ success: false, message: err.message });
      }
    };

    export default authSeller;
