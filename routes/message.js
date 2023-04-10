const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();

const p = path.join(__dirname, "..", "data", "message.txt");
// console.log(p);

router.get(`/`, (req, res, next) => {
  fs.readFile(p, (err, data) => {
    if (err) {
      console.log(err);
      return res.send("No chats exist");
    }
    res.send(`
      ${data}
      <form action="/" onsubmit="document.getElementById('username').value=localStorage.getItem('username')" method="POST">
        <input id="message" name="message" type="text" placeholder="message">
        <input type="hidden" name="username" id="username">
        <button type="submit">send</button>
      </form>
    `);
  });
});

router.post(`/`, (req, res, next) => {
  const username = req.body.username;
  const message = req.body.message;

  // write the message in file with username
  fs.writeFile(p, `${username}: ${message}`, { flag: "a" }, (err) => {
    if (err) {
      console.log(err);
      res.send(`<h1>Error: ${err.message}</h1>`);
    } else {
      res.redirect(`/`);
    }
  });
});

module.exports = router;
