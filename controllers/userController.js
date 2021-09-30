const _ = require('lodash');
const { User, validate } = require('../models/User');

module.exports.addUser = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message)
    let user = {};
    user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send('User already Exists!');
    user = new User(_.pick(req.body, ['name', 'email', 'phone', 'country', 'city', 'address', 'religion', 'nationality']));
    const result = await user.save();
    return res.status(201).send({
        message: "User added successfully",
        user: _.pick(result, ['name', 'email', 'phone', 'country', 'city', 'address', 'religion', 'nationality'])
    })
}

module.exports.getUser = async (req, res) => {
    const users = await User.find()
        .sort({ createdAt: 1 })
    return res.status(200).send(users)
}

module.exports.getUserById=async(req,res)=>{
    const userId=req.params.id;
    const user=await User.findById(userId);
    if(!user) return res.status(404).send('User Not Found');
    return res.status(200).send(user);
}

module.exports.updateUser=async(req,res)=>{
    const userId=req.params.id;
    const updateUser=_.pick(req.body,['name', 'email', 'phone', 'country', 'city', 'address', 'religion', 'nationality']);
    await User.updateOne({_id:userId},updateUser);
    return res.status(200).send("Updated Successfully!");

}

module.exports.deleteUser=async(req,res)=>{
    const userId=req.params.id;
    const user=await User.deleteOne({_id:userId});
    if(!user) return res.status(404).send('User Not Found');
    return res.status(200).send('User delete successfully');
}