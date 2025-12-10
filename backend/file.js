const fs = require('fs');

fs.appendFile("sample.txt", "\nThis is appended text", (err) => {
    console.log(err);
});
