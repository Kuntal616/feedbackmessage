import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";
import {usernameValidation} from "@/Schemas/signUpSchema"



const UsernameQueryScheme=z.object({
    username:usernameValidation
})

export async function GET(request:Request) {
    //edge cases..
    //now not required next js updated ..
    // if(request.method!=='GET'){
    //     return Response.json({
    //         success:false,
    //    message:"Method not allowed"
    //    },{
    //        status:405
    //    })
    // }
    await dbConnect();

    try {
        const {searchParams}=new URL(request.url);
        const queryParam={
            username:searchParams.get('username')
        }
        // validate with zod
        const result = UsernameQueryScheme.safeParse(queryParam);
        console.log(result);//todo:remove after check....
        if(!result.success){
            const usernameErrors=result.error.format().username?._errors || [];
            return Response.json({
                 success:false,
            message:usernameErrors?.length>0 ? usernameErrors.join(', '):"Invalid query Parameters"
            },{
                status:400
            })
        }
        const {username}=result.data
       const existingVerifiedUser= await  UserModel.findOne({username,isVerified:true});

       if(existingVerifiedUser){
        return Response.json({
            success:false,
       message:"Username is already taken"
       },{
           status:400
       })
       }
       return Response.json({
        success:true,
            message:"username is available"
   },{
       status:200
   })
    } catch (error) {
        console.error("Error in checking username",error);
        return Response.json({
            success:false,
            message:"Error in checking username"
        },{
            status:500
        })
    }
}