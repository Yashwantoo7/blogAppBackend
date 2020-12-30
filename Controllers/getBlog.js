const handleGetBlog=async(req,res,db)=>{

    try{const id=req.params.id
        const {search,email}=req.body;

        const results=await db.query("select * from blogs where to_tsvector(array_to_string(blog,' ')) @@ to_tsquery($1) and email<>$2",[search,email]);
        // select * from blogs where to_tsvector (array_to_string(blog,' ')) @@ to_tsquery('detection');
        console.log(results.rows)
        res.status(201).json({
            results:results.rows
        })
    }
    catch(er){
        console.log(er)
        res.status(400).json(er)
    }
}

module.exports={
    handleGetBlog
}