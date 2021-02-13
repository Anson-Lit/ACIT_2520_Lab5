/*
 Authors:
 Your name and student #: Anson Lit A00938515
 Your Partner's Name and student #: Eric Chang A01069050
 (Make sure you also specify on the Google Doc)
*/
const express = require("express");
const fs = require("fs");

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => res.render("pages/index"));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

//Part1
app.post("/myForm", (req, res) => {
    let formData = req.body;
    let my_list = formData.test.split(", ")
    res.render("pages/index", { my_list: my_list })
});

//Part2
app.get("/myListQueryString", (req, res) => {
    let my_list = []
    my_list.push(req.query.movie1, req.query.movie2)
    res.render("pages/index", { my_list: my_list })
});

//Part3
app.get("/search/:movieName", (req, res) => {
    let movie = req.params.movieName;
    fs.readfile("movieDescriptions.txt", (err, data) => {
        if (err) {
            console.log(err);
        } else {
            data = data.toString();
            let arr = data.split("\n");
            let arr2 = [];
            for (item in arr) {
                temp_arr = item.split(":");
                let obj = { title: null, description: null }
                obj["title"] = temp_arr[0];
                obj["description"] = temp_arr[1];
                arr2.push(obj);
            }
        }
    });
    res.render("pages/searchResult", { arr2: arr2 }, movie)
});

app.listen(3000, () => {
    console.log("Server is running on port 3000 🚀");
});