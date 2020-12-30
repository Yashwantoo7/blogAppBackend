const data=async(db,email)=>{
    const x= await db.query('select * from blogs where email<> $1',[email])
    return x
}

const handleSignUp=async (req,res,db)=>{
    try{
        const {name,email,date_of_birth,password,}=req.body;
        console.log(name,email,date_of_birth,password)
        await db.query('BEGIN')

        const info= await db.query('INSERT INTO login(email,password) VALUES($1,$2) returning *',
        [email,password]);
        console.log(info.rows[0])

        const userDetail=await db.query('INSERT INTO users(name,email,date_of_birth) VALUES($1,$2,$3) returning *',
        [name,email,date_of_birth]);
        console.log(userDetail.rows[0],'data')
        
        const ownBlogs=await db.query('select blog from blogs where email=$1',[email]);

        await db.query('COMMIT')

        const d=await data(db,email)
        res.status(201).json({    
            userData:userDetail.rows[0],
            data:d.rows,
            ownBlogs:ownBlogs.rows,
            status:'success'
        })
    }
    catch(err){
        await db.query('ROLLBACK')
        console.log(err)
        res.status(400).json({
            status:"failure"
        })
    }
}
module.exports={
    handleSignUp
}