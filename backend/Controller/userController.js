
import User from "../Model/UserModel.js";
import generateToken from "../Token/jwtToken.js";

export const register = async (req, res) => {
    const { FullName, Email, Address, PhoneNo, Password } = req.body;

    try {
        const userExists = await User.findOne({ Email });

        if (userExists) {
            console.log("User already exists:", Email);
            return res.status(400).json({ message: "User Already Exists" });
        }

        const user = await User.create({
            FullName,
            Email,
            Address,
            PhoneNo,
            Password
        });

        if (user) {
            return res.status(200).json(user)
        } else {
            return res.status(400).json({ message: "Invalid data" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};


export const login = async (req, res)=>{
    const {email, Password} = req.body
        console.log("iam here");
    const user = await User.findOne({Email:email})

    if(user && (await user.matchPassword(Password))){
        const Token = await generateToken(res, user._id);

        res.status(200).json({
            id:user._id,
            FullName:user.FullName,
            Email:user.Email,
            PhoneNo:user.PhoneNo,
            Token:Token,
            message:"Login Success"
        })
    }else if(!user){
        res.status(400).json("Invalid Email ")
    }else{
        res.status(402).json("Invalid  Password")

    }

}