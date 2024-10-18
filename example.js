fetch('http://localhost:3000/friends', {
  method: 'POST',
  body: JSON.stringify({
    id: 3,
    name: 'John Doe',
    ages: 25,
    address: 'New York',
    description: 'I am John Doe, I am 25 years old, I live in New York',
  }),
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => response.json())
  .then((friend) => console.log(friend))
  .catch((error) => console.error(error));
