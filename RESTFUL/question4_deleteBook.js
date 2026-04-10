import fs from 'fs';
function deleteBook(req,res){
    try{
        let{id} = req.params;
        id = Number(id.slice(1));
        if(!id){
            return res.status(400).send("id is   requrired");
        }
        if(fs.existsSync("books.json")){
            const data =  JSON.parse(fs.readFileSync("books.json","utf-8"));
            const isBook = data.filter(a => a.id != id );
            if(!isBook){
                return res.status(404).send("book not Found");
            }

            fs.writeFileSync("books.json", JSON.stringify(isBook, null, 2));
            res.status(200).send("Book deleted ")
        }
    }
    catch(error){
        console.error(error);
        res.status(500).send("Server error");
    }

}
export default deleteBook;