import Order from "../models/Order.js";
import Product from "../models/Product.js";

//Place Order COD : /api/order/cod
export const placeOrderCOD = async(req,res)=>{
    try {
        const {userId,items,address} =req.body;
        if(!address || items.length === 0){
            return res.json({success: false,message: "Invalid data"})
        }
        //calculate Amount Using Items
        let amount = await items.reduce(async(ActiveXObject,item)=>{
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;
        },0)

        //Add Tax Charge(2%)
        amount += Math.floor(amount * 0.02);

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD"
        });

        return res.json({success: true,message:"order Placed Successfully"})
    } catch (error) {
        return res.json({success: false,message: error.message});
        
    }
}

//Get Orders by User ID : /api/order/user

export const getUserOrders = async (req,res)=>{
    try {
        const {userId} = req.body;
        const orders = await Order.find({
            userId,
            $or: [{paymentType: "COD"},{isPaid: true}]
        }).populate("items.product address").sort({createdAt: -1});
        res.json({success: true,orders});
    } catch (error) {
         return res.json({success: false,message: error.message});
    }
}

//Get All Orders (for seller / admin) : /api/order/seller

export const getAllOrders = async (req,res)=>{
    try {
        const orders = await Order.find({
            $or: [{paymentType: "COD"},{isPaid: true}]
        }).populate("items.product address").sort({createdAt: -1});
        res.json({success: true,orders});
    } catch (error) {
         return res.json({success: false,message: error.message});
    }
}
