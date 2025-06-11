import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({ success: false, message: 'Not Authorized' });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      req.user = { id: tokenDecode.id };  // ✅ Use req.user instead of req.body
      next();
    } else {
      return res.json({ success: false, message: 'Not Authorized' });
    }
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export default authUser;
