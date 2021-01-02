const http = require('http');
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const url = require('url');
class DataCache {
    constructor() {
        this.skills = []
        this.getData = this.getData.bind(this);
    }
    getData() {
        return this.skills;
    }
    pushData(data) {
        this.skills.push(data);
    }
}
let skillsData = new DataCache();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/getSkills', (req, res) => {
    const queryObject = url.parse(req.url, true).query;
    let tempSkills = queryObject.skills.split(',');
    let toMatchSkills = {}
    for (let i = 0; i < tempSkills.length; i++) {
        toMatchSkills[tempSkills[i]] = 1
    }
    let candData = skillsData.getData();
    console.log('queryObj', toMatchSkills,candData);
    let count = 0, candidate = {};
    for (let i = 0; i < candData.length; i++) {
        let c = 0;
        for (let j = 0; j < candData[i].skills.length; j++) {
            if (toMatchSkills[candData[i].skills[j]]) {
                c++;
            }
        }
        if (c > count) {
            candidate = candData[i];
            count=c;
        }
    }
    console.log('candidate',candidate);
    res.send(candidate)
})

app.post('/postData', (req, res) => {
    if (req.body) {
        skillsData.pushData(req.body);
        res.status(200).send("OK Data Recieved")
    } else {
        res.status(401).send('in correct or no data recieved');
    }
})

app.listen(3000, () => {
    console.log('Server started');
})
