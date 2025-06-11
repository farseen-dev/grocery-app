import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//Register User
export const register = async (req,res)=>{
    try{
        const {name,email,password} = req.body;

        if(!name || !email || !password){
            return res.json({success: false,message: "missing details"})
        }

        const existingUser = await User.findOne({email})

        if(existingUser)
            return res.json({success: false,message: "User already exists"})

        const hashedPassword = await bcrypt.hash(password,10)

        const user = await User.create({name,email,password: hashedPassword})

        const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn:'7d'})

        res.cookie('token',token, {
            httpOnly: true, //prevent Javascript to access cookie
            secure: process.env.NODE_ENV === 'production', //use secure cookies in production
            sameSite: process.env.NODE_ENV ==='production' ? 'none' : 'strict', //CSRF protection
            maxAge: 7 * 24 * 60 * 1000, //cookie expiration time
        })

        return res.json({success: true,user: {email:user.email,name:user.name}})

    } catch(err){
        console.log(err.message);
        res.json({success:false,message: err.message})
        
    }
}

//Login User : /api/user/login

export const login = async (req,res)=>{
    try{
        const {email,password} = req.body;

        if(!email || !password)
            return res.json({success:false,message:'email and password are required'});
        const user = await User.findOne({email});

        if(!user){
            return res.json({success:false,message:'invalid emial or password'});

        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch)
            return res.json({success:false,message:'invalid emial or password'});

        const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn:'7d'})

        res.cookie('token',token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: process.env.NODE_ENV ==='production' ? 'none' : 'strict', 
            maxAge: 7 * 24 * 60 * 1000, 
        })

        return res.json({success: true,user: {email:user.email,name:user.name}})

    } catch (err){
        console.log(err.message);
        res.json({success: false,message: err.message})
        

    }
}

//check Auth: /api/user/is-auth
export const isAuth = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      res.json({ success: true, user });
    } catch (err) {
      res.json({ success: false, message: err.message });
    }
  };
  

//Logout User: /api/user/logout

export const logout = async (req, res) => {
    try {
      res.clearCookie('token', {
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
  