import fs from 'fs';
function yearFiltering(req,res,next){
    try{
        let {year} = req.body;

        if(!year){
            return res.status(400).send("Author name Required");
        }
        if(!fs.existsSync("books.json")){
            return res.status(404).send("No Book found");
        }
        let data = fs.readFileSync("books.json","utf-8");
        let parseData = JSON.parse(data);
        let isUser = parseData.filter(a=>a.year===year)
        if(!isUser){
            return res.status(404).send("No Book Found in this year");
        }
        res.status(201).send(isUser);
        next();
        
    }
    catch(error){
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}
export default yearFiltering;