import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({

    name:{
        type:String,
        require: [true, 'Name is required']
    },
    email:{
        type:String,
        require: [true, 'Email is required'],
        unique:true
    },
    password:{
        type: String,
    },
    img:{
        type: String,
    },
    roles:{
        type: [String],
        default: ['USER_ROLE'],
        enum: ['USER_ROLE','ADMIN_ROLE']
    },
    googleId:{
        type:String,
    }

})

export const UserModel = mongoose.model('User',userSchema);