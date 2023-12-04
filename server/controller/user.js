const User = require('../model/user');

exports.addUser = async(req, res)=>{
    try{
        // console.log(req.body);
        const {name, email, phone} = req.body;

        const user = await User.create({name, email, phone});
        res.status(201).json(user);

    } catch(err){
        console.log('add-user is failing -->', err.message);
        res.status(500).json({err: err});
    }
}

exports.getUser = async(req, res)=>{
    try{
        const allUsers = await User.findAll();
        res.status(200).json({allUsers: allUsers});
    } catch(err){
        console.log('get-users is failing -->', err.message);
        res.status(500).json({err: err});
    }
}

exports.deleteUser = async(req, res)=>{
    try{
        const uid = req.params.id;
        // console.log(uid);

        const deleteUser = await User.destroy({where: {id: uid}});
        res.status(200).json({delete: deleteUser});
    } catch(err){
        console.log('delete users failing -->', err.message);
        res.status(500).json({err: err});
    }
}

exports.updateUser = async(req, res)=>{
    try{
        const userId = req.params.id;
        // console.log(userId);

        //find user...
        const user = await User.findByPk(userId);
        // console.log(user);
        if(!user){
            res.status(404).json({err: 'user not found'});
        }

        // grab the updated values...
        // console.log(req.body);
        const {name, email, phone} = req.body;

        const updatedUser = await User.update(
            {name, email, phone},
            {where: {id: userId}}
        )
        res.status(200).json({message: 'user updated successfully'});


    } catch(err){
        console.log('delete users failing -->', err.message);
        res.status(500).json({err: err});
    }
}