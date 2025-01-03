import mongoose , {Schema,Document} from "mongoose";

export interface Message extends Document {
    content:string;
    CreatedAt:Date;
 }

 const MessageSchema :Schema<Message> = new Schema({
    content:{
        type:String,
        required:true,
    },
    CreatedAt:{
        type:Date,
        required:true,
        default:Date.now(),
    }
 })
 
 export interface User extends Document {
     username:string;
     email:string;
     password:string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isVerified:boolean;
    isAcceptingMessages:boolean;
    messages:Message[];
}
const UserSchema :Schema<User> = new Schema({
   username:{
       type:String,
       required:[true,"Username is required"],
       unique:true,
       trim:true,
   },
   email:{
       type:String,
       required:[true,"Email is required"],
       unique:true,
       match:[/.+\@.+\..+/,"Please use a valid email address"]//expression for email validation
   },
   password:{
       type:String,
       required:[true,"Password is requied"],

   },
    verifyCode:{
       type:String,
       required:[true,"Verify Code is requied"],
   },
   verifyCodeExpiry:{
       type:Date,
       required:[true,"verify code Expiry is requied"],

    },
    isVerified:{
        type:Boolean,
       default:false,
    },
    isAcceptingMessages:{
        type:Boolean,
        default:true,
    },
    messages:[MessageSchema]
})


const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User",UserSchema))

export default UserModel