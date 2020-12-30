const handleRating=async(req,res,db)=>{
    try{
        let  {email,idx,amount,rated,rating}=req.body;
        // console.log(email,idx,amount,rated,rating);
        idx=parseInt(idx)
        amount=parseInt(amount)+1
        rated=((parseFloat(rated)*(amount-1)*5+rating)/(amount*5)).toFixed(2);
        // console.log(rated)

        const data= await  db.query('update blogs set blog[$1][4]=$2 , blog[$1][5]=$3 where email=$4 returning *',[idx+1,amount,rated,email]);
        // console.log(data.rows[0])
 
        res.status(201).json({
            data:data.rows[0],
            status: "success"
        })
    }
    catch(err){
        // console.log(err)
        res.status(400).json("failure")
    }
}
module.exports ={
    handleRating
}