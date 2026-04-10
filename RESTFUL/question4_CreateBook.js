import fs from 'fs';
function addBooks(req,res){
    try{
        let{author,name,year} = req.body;
        if(!author || !name || !year){
            return res.status(400).send("All Fields are required");
        }
        let books = [];
        if(fs.existsSync("books.json")){
            const data = fs.readFileSync("books.json","utf-8");
            books = JSON.parse(data);
            const isBook = books.find(a => a.name === name);
            const isAuthor = books.find(a => a.author === author);
            if(isBook && isAuthor){
                return res.status(409).send("Book Already Exists");
            }
        }

        let ob = {
            id: Date.now(),
            author,
            name,
            year
        };
        books.push(ob);
        fs.writeFileSync("books.json",JSON.stringify(books,null,2));
        res.status(201).send("Book Added to library");

    }
    catch(error){
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}
export default addBooks;