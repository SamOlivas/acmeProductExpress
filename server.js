const express = require('express');
const port = process.env.PORT || 3000;
const path = require('path');
const fs = require('fs');
const FILE = path.join(__dirname, 'data.json');

const write = (filePath, data) => {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(data)) {
      return reject('data must be array')
    }
    fs.writeFile(filePath, JSON.stringify(data), (err) => {
      if(err){
        return reject(err);
      };
    })
  });
}

const read = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        return reject(err)
      };
      let results;
      try {
        results = JSON.parse(data.toString());
        if (!Array.isArray(results)) {
          return reject('data must be array');
        }
      }
      catch(ex) {
        return reject(ex)
      };
      resolve(results)
    });
  });
}

//APPLICATION
const app = express();

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})
app.get('/api/data', (req, res, next)=> {
  res.send( {random : Math.random()} )
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
