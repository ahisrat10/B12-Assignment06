# Green Earth - Plant a Tree, Grow a Future 🌱

A responsive web application for tree plantation campaign that allows users to browse different tree categories, add trees to cart, and participate in environmental conservation.

## Live Demo

[Live Site URL](https://project-green-earth.vercel.app/)

## Features

- 🌿 Browse trees by categories
- 🛒 Add trees to cart with quantity management
- 💰 Real-time price calculation
- 📱 Fully responsive design
- 🔄 Loading spinner for better UX
- 🖼️ Detailed tree information in modal
- ✨ Interactive category selection

## Technologies Used

- HTML5
- CSS3 (Tailwind CSS + DaisyUI)
- Vanilla JavaScript
- Font Awesome Icons

## API Endpoints

- Get All Plants: `https://openapi.programming-hero.com/api/plants`
- Get All Categories: `https://openapi.programming-hero.com/api/categories`
- Get Plants by Category: `https://openapi.programming-hero.com/api/category/${id}`
- Get Plant Details: `https://openapi.programming-hero.com/api/plant/${id}`

## Questions & Answers

### 1) What is the difference between var, let, and const?

**var:**

- Function-scoped or globally-scoped
- Can be redeclared and updated
- Hoisted and initialized with `undefined`
- Can be accessed before declaration (undefined)

**let:**

- Block-scoped
- Cannot be redeclared in same scope but can be updated
- Hoisted but not initialized (Temporal Dead Zone)
- Cannot be accessed before declaration

**const:**

- Block-scoped
- Cannot be redeclared or updated
- Must be initialized at declaration
- Hoisted but not initialized (Temporal Dead Zone)
- For objects/arrays, the content can be modified but not reassigned

```javascript
var x = 1;
var x = 2; // ✅ Works

let y = 1;
let y = 2; // ❌ SyntaxError

const z = 1;
z = 2; // ❌ TypeError
```

### 2) What is the difference between map(), forEach(), and filter()?

**forEach():**

- Executes a function for each array element
- Does not return a new array
- Cannot be chained
- Used for side effects (like console.log)

**map():**

- Creates a new array with results of calling a function for each element
- Returns a new array of same length
- Can be chained
- Used for transforming data

**filter():**

- Creates a new array with elements that pass a test
- Returns a new array (potentially different length)
- Can be chained
- Used for filtering data

```javascript
const numbers = [1, 2, 3, 4, 5];

// forEach - no return value
numbers.forEach((num) => console.log(num * 2));

// map - returns new array
const doubled = numbers.map((num) => num * 2); // [2, 4, 6, 8, 10]

// filter - returns filtered array
const evenNumbers = numbers.filter((num) => num % 2 === 0); // [2, 4]
```

### 3) What are arrow functions in ES6?

Arrow functions are a concise way to write functions in ES6. They have a shorter syntax and lexically bind the `this` value.

**Syntax:**

```javascript
// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;

// Single parameter (parentheses optional)
const square = (x) => x * x;

// No parameters
const greet = () => "Hello World!";

// Multiple statements
const calculate = (a, b) => {
  const sum = a + b;
  return sum * 2;
};
```

**Key Differences:**

- No `this` binding (inherits from enclosing scope)
- Cannot be used as constructors
- No `arguments` object
- More concise syntax
- Implicit return for single expressions

### 4) How does destructuring assignment work in ES6?

Destructuring allows extracting values from arrays or properties from objects into distinct variables.

**Array Destructuring:**

```javascript
const fruits = ["apple", "banana", "orange"];

// Traditional way
const first = fruits[0];
const second = fruits[1];

// Destructuring
const [first, second, third] = fruits;
const [first, , third] = fruits; // Skip second element
const [first, ...rest] = fruits; // Rest operator
```

**Object Destructuring:**

```javascript
const person = {
  name: "John",
  age: 30,
  city: "New York",
};

// Traditional way
const name = person.name;
const age = person.age;

// Destructuring
const { name, age, city } = person;
const { name: fullName, age } = person; // Renaming
const { name, age, country = "USA" } = person; // Default values
```

**Function Parameters:**

```javascript
// Object destructuring in parameters
function greetUser({ name, age }) {
  return `Hello ${name}, you are ${age} years old`;
}

greetUser({ name: "Alice", age: 25 });
```

### 5) Explain template literals in ES6. How are they different from string concatenation?

Template literals are string literals that allow embedded expressions and multi-line strings using backticks (`) instead of quotes.

**Template Literals:**

```javascript
const name = "John";
const age = 30;

// Template literal
const message = `Hello, my name is ${name} and I am ${age} years old.`;

// Multi-line strings
const multiLine = `
    This is a
    multi-line
    string
`;

// Expression evaluation
const price = 100;
const tax = 0.08;
const total = `Total price: $${price + price * tax}`;
```

**String Concatenation:**

```javascript
const name = "John";
const age = 30;

// String concatenation
const message =
  "Hello, my name is " + name + " and I am " + age + " years old.";

// Multi-line strings (cumbersome)
const multiLine = "This is a\n" + "multi-line\n" + "string";
```

**Key Differences:**

| Template Literals             | String Concatenation      |
| ----------------------------- | ------------------------- |
| Use backticks (`)             | Use quotes (' or ")       |
| `${expression}` for variables | Use + operator            |
| Multi-line support            | Need \n or +              |
| Expression evaluation         | Manual conversion         |
| More readable                 | Can become complex        |
| ES6 feature                   | Available in all versions |

**Advantages of Template Literals:**

- Cleaner syntax
- Better readability
- Multi-line support
- Expression evaluation
- No need for escape characters in most cases
