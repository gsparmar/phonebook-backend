const express = require('express');
const app = express();

app.use(express.json());

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];
const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};
// post
app.post('/api/persons', (request, response) => {
  const body = request.body;
  console.log(body);
  const existingPerson = persons.find(
    (person) => person.name.toLowerCase() === body.name.toLowerCase()
  );

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  if (!body.name) {
    return response.status(404).json({ error: 'name is missing' });
  } else if (!body.number) {
    return response.status(404).json({ error: 'missing number' });
  } else if (existingPerson) {
    return response.status(404).json({ error: 'name already exists' });
  }

  persons = persons.concat(person);
  console.log(person);
  response.json(person);
});

// /api/persons
app.get('/api/persons', (request, response) => {
  response.json(persons);
});
// /info
app.get('/info', (request, response) => {
  const messageContent = `Phonebook has info for ${persons.length} people`;
  const date = new Date();
  response.send(`${messageContent} <p>${date}</p>`);
});

//api/persons/id
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  console.log(id);
  const person = persons.find((person) => person.id === id);
  console.log(person);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

// delete id
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  console.log(id);
  persons = persons.filter((person) => person.id !== id);
  console.log(persons);

  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server is running on port ${PORT}`);
