const handleInfo=async(req,res,db)=>{
    try{
        const {email}=req.body
        console.log(email)
        const info=await db.query('select * from users where email=$1',[email]);
        const blogs=await db.query('select blog from blogs where email=$1',[email]);
        // console.log(info.rows,blogs.rows)
        res.status(200).json({
            info:info.rows[0],
            blogs:blogs.rows,
            status:'success'
        })
    }
    catch(err){
        res.status(200).json({
            succes:"failure"
        })
    }
}
module.exports={
    handleInfo
}