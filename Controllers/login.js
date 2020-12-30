const data=async(db,email)=>{
    const x= await db.query('select * from blogs where email<>$1',[email]);
    return x
}

const handleLogin=async (req,res,db)=>{
    try{
        const {email,password}=req.body
        console.log(email,password)
        const user=await db.query('select exists (select 1 from login where email=$1 and password=$2)',
        [email,password]);
    
        if(user.rows[0].exists){
            const userDetail= await db.query('select * from users where email=$1',[email]);
            const ownBlogs=await db.query('select blog from blogs where email=$1',[email]);
            const d=await data(db,email)
            res.status(201).json({    
                userData:userDetail.rows[0],
                data:d.rows,
                ownBlogs:ownBlogs.rows,
                status:'success'
            })
        }
        else{
            res.status(400).json("failure")
        }
        }
        catch(err){
            res.status(400).json(err)
        }
}
module.exports={
    handleLogin
}