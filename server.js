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
    fs.writeFile( filePath, JSON.stringify(data), (err) => {
      if(err){
        return reject(err)
      };
    })
  });
}
const read = (filePath) => {
  return new Promise((resolce, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err)
      };
      let results;
      try {
        results = JSON.parse(data.toString());
        if (!Array.isArray(results)) {
          return reject('data must be array')
        };
      }
      catch(ex) {
        return reject(ex)
      };
    })
    resolve(results)
  })
}

write(FILE, [{name: 'moe'}, {name: 'larry'}] )
  .then (()=> read(FILE))
  .then (users => {
    users.push({name: 'shep'});
    return write(FILE, users);
  })
  .then (console.log('saved new name'))
  .catch (ex => console.log(ex));

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
