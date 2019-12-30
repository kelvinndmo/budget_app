const person = {
  name: "Kelvin",
  age: 26,
  location: {
    city: "Philadephia",
    temp: 92
  }
};

const { name, age } = person;

console.log(`${name} is`);

// array destructuring
const adress = ["Keroka", "Kisii", "Kenya"];

const [, , country = "Nai"] = adress;
console.log(country);
