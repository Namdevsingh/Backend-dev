import fs from 'fs';
function updateBook(req,res){
    try{
        let{id} = req.params;
        id = Number(id.slice(1));
        let {author,name,year} = req.body;
        if(!id){
            return res.status(400).send("ID required");
        }
        if(!author||!name||!year){
            return res.status(400).send("All Fields are required");
        }
        if(!fs.existsSync("books.json")){
            return res.status(404).send("No Books or Author Found");
        }
        let data = fs.readFileSync("books.json");
        let parseData = JSON.parse(data);
        let isBook = parseData.findIndex(a=>a.id===id);
        if(isBook === -1){
            return res.status(404).send("Book Not Found");
        }
        parseData[isBook].author = author;
        parseData[isBook].name = name;
        parseData[isBook].year = year;
        fs.writeFileSync("books.json", JSON.stringify(parseData, null, 2));
        res.status(200).send("User updated successfully");
    }
    catch(error){
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}
export default updateBook;