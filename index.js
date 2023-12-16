const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "/public")));


let posts = [
    {
        id: uuidv4(),
        username: "tejashree",
        content: "i love Coding!",
    },
    {
        id: uuidv4(),
        username: "myra",
        content: "hardwork is important to achive success!",
    },
    {
        id: uuidv4(),
        username: "mangesh",
        content: "I got selected for web developer role!",
    },
];


app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});


app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", {post});
});




app.delete("/posts/:id", (req, res) => {
 let {id} = req.params;
  posts = posts.filter((p) => id === p.id);
  res.redirect("/posts");

});


app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs");
});

app.listen(port, () => {
    console.log("listening to port : 8080");
});