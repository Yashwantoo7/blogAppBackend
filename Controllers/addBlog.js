const handleAddBlog=async (req,res,db)=>{
    try{
        const id=req.params.id
        console.log(req.body)
        const  {email,totalblogs,title,blog}=req.body
        console.log(id,email,totalblogs,title,blog);
        
        const rated=0
        const amount=0
        if (totalblogs!==0){
            const data=await db.query(`update blogs set blog=blog||'{{${title},${blog},${totalblogs},${amount},${rated}}}' where email=$1 returning *`,[email]);
            console.log(data.rows[0]);
            if(data.rows[0].id){
                await db.query('update users set totalblogs=totalblogs+1 where id=$1 returning totalblogs',[id])
                res.status(201).json({
                    data:data.rows[0],
                    status:"success"
                })
            }        
            else{
                res.status(400).json('failure')
            }
        }
        else if(totalblogs===0){

            const data=await db.query(`insert into blogs (email,blog) values($1,'{{${title},${blog},${totalblogs},${amount},${rated}}}') returning *`,
                    [email])
            console.log(data.rows[0]);
            if(data.rows[0].id){
                await db.query('update users set totalblogs=totalblogs+1 where id=$1',[id])
                res.status(201).json({
                    data:data.rows[0],
                    status:"success"
                })
            }        
            else{
                res.status(400).json('failure')
            }
        }
        
    }
    catch(er){
        console.log(er)
        res.status(400).json(er)
    }
}
module.exports={
    handleAddBlog:handleAddBlog
}