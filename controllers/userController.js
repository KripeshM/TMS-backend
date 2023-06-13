const Users=require('../models/userSchema')


exports.register=async(req,res)=>{

    const {username,email,password}=req.body

    try{
        const user=await Users.findOne({email})
        if(user){
            res.status(403).json("Email already exists")
        }
        else{
            const newUser=new Users({username,email,password})

            await newUser.save()
            res.status(200).json("Registered Successfully")
        }
    }
    catch(error){
        res.status(401).json(error)
    }
}



exports.login = async (req, res) => {

    const { email, password } = req.body

    try {
        const user = await Users.findOne({ email, password })
        if (user) {
            // console.log(user.username);
            response={
                user
            }
            res.status(200).json(response)
            
        }
        else {
            res.status(401).json("Invalid data")
        }
    }
    catch (error) {
        res.status(401).json(error)
    }

}