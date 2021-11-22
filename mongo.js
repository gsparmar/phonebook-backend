const mongoose = require('mongoose');
/*
if (process.argv.length = 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  );
  process.exit(1);
}
*/

// node mongo.js <password> in command line
const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.i8kbg.mongodb.net/phonebook-db?retryWrites=true&w=majority`;

mongoose.connect(url);

// define schema

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// define model
const Person = mongoose.model('Person', personSchema);

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
});
// log name - number into the console, else add new contact if params are met
if (process.argv.length === 3) {
  Person.find({}).then((res) => {
    console.log('phonebook:');
    res.map((n) => {
      console.log(`${n.name} ${n.number}`);
    });
    mongoose.connection.close();
  });
} else {
  person.save().then((res) => {
    console.log(`added ${person.name}, number: ${person.number} to phonebook`);
    mongoose.connection.close();
  });
}
