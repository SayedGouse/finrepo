import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userShema =new mongoose.Schema({
    FullName : {type:String, require:true},
    Email:{type:String, require:true},
    Address:{type:String,require:true},
    PhoneNo : {type:Number, require:true},
    Password :{type:String, require:true}
})

userShema.pre("save", async function(next) {
    if(!this.isModified("Password")){
        next()
    }

    const salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password, salt)
})

userShema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.Password)
}


const User = mongoose.model('User', userShema)

export default User
