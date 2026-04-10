import fs from 'fs';
function readBook(req,res){
    try{
        let {name} = req.body;
        if(!name){
            return res.status(400).send("all fields required");
        }
        if(!fs.existsSync("books.json")){
            return res.status(404).send("No Post found");
        }
        let data = fs.readFileSync("books.json","utf-8");
        let parseData = JSON.parse(data);
        let isUser = parseData.filter(a=>a.name.toLowerCase()===name.toLowerCase())
        if(!isUser){
            return res.status(404).send("User not Found");
        }
        res.status(201).send(isUser);
        
    }
    catch(error){
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}
export default readBook;