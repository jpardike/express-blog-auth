require('dotenv').config();
const db = require('./models');

// Author Seed Data

// const author1 = {
//   name: 'John Doe',
// };


const authors = [
  {name: 'John Doe'},
  {name: 'Kevin Smith'},
  {name: 'Paulo Coelho'},
  {name: 'Aldous Huxley'},
  {name: 'George R. R. Martin'},
];

// Delete All Authors
db.Author.deleteMany((err, result) => {
  if (err) {
    console.log(err);
    process.exit();
  }

  console.log(result);

  // Create Authors
  db.Author.create(authors, (err, newAuthors) =>{
    if (err) {
      console.log(err);
    }
    console.log(newAuthors);
    process.exit();
  });
});
