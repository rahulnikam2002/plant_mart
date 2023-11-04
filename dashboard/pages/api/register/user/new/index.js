import dbConnect from "@/utils/database/mongodb.connect";

export default async function handler(req, res){
    const {method } = req;
    if(metho !== 'POST'){
        return res.send({
            msg: "Invalid request"
        })
    }
    try{
        dbConnect()
    }
    catch(requestError){
        return res.send({
            err: requestError.message
        })
    }
}