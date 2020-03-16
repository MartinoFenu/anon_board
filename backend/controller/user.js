const User      = require('../models/user.js');
const bcrypt    = require("bcrypt");
const jwt       = require("jsonwebtoken");

exports.user_login = async(req, res) => {
  try{
    const user = await User.findOne({ username: req.body.username }).exec();
    if(user.length < 1) return res.status(401).json({ error: 'Incorrect user or password' });
    else {
      const match = await bcrypt.compare(req.body.password, user.password);
      if(!match) return res.status(401).json({ error: 'Incorrect user or password' });
      else {
        const key = process.env.JWT_PRIVATE_KEY.replace(/\\n/g, '\n');
        const token = jwt.sign(
          {
            username: user.username,
            userId: user._id
          },
          key,
          {
            expiresIn: '1h',
            algorithm:  'RS256'
          }
        );
        return res.status(200).json({
          token: token,
          expiresIn: 3600
        })
      }
    }
  } catch(err) {
    return res.status(500).send('An error occured during login');
  }
}
