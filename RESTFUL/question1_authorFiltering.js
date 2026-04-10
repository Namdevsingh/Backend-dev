import fs from 'fs';
function authorFiltering(req,res){
    try{
        let {author} = req.body;

        if(!author){
            return res.status(400).send("Author name Required");
        }
        if(!fs.existsSync("books.json")){
            return res.status(404).send("No Book found");
        }
        let data = fs.readFileSync("books.json","utf-8");
        let parseData = JSON.parse(data);
        let isUser = parseData.filter(a=>a.author.toLowerCase()===author.toLowerCase())
        if(!isUser){
            return res.status(404).send("Author not Found");
        }
        res.status(201).send(isUser);
        
    }
    catch(error){
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}
export default authorFiltering;