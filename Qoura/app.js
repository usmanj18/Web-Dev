const express = require("express");
const app = express();
const path = require("path");  //Requiring Path
const port = 8080;
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended:true }));  //Parsing URLS
app.use(express.json());  //Parsing JSON Files
app.use(methodOverride("_method"));

app.set("view engine", "ejs");   //Using EJS Templates
app.set("views", path.join(__dirname, "views"));  //Setting Path of Views Folder
app.use(express.static(path.join(__dirname, "public")));  //Setting Path of Public Folder

//An Array of Posts (Replica of Database)
let posts = [
    {
        id: uuidv4(),
        username: "Usman",
        content: "The secret of getting ahead is getting started.",
    },
    {
        id: uuidv4(),
        username: "Sheryar",
        content:"Opportunities don't happen, you create them",
    },
    {
        id: uuidv4(),
        username: "Abdullah",
        content: "The biggest asset in the world is your mindset.",
    }
];

//Port Activation
app.listen(port, () => {
    console.log(`Listening through Port: ${port}`);
})

//Sending Post array to Index.ejs
app.get("/posts", (req, res) => {
    res.render("index", { posts });
})

//Adding a new Request through form in New.ejs
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
})

//Posting the Request received in new.ejs
app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id,username, content });
    res.redirect("/posts");
})

//Searching ID's
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id );
    res.render("show.ejs", { post });
})

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) =>  id === p.id );
    res.render("edit.ejs", { post });
})

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    let newContent = req.body.content;
    post.content = newContent;
    res.redirect("/posts");
})

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})