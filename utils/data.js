// incription for the password so it is not visible in the database
import bcrypt from 'bcryptjs';

const data = {
	users: [
		{
			name: 'Jeff',
			email: 'bob@bob.com',
			password: bcrypt.hashSync('12345678'),
			isAdmin: false,
		},

		{
			name: 'Hunter',
			email: 'hunter@example.com',
			password: bcrypt.hashSync('12345678'),
			isAdmin: true,
		},
		{
			name: 'Sally',
			email: 'sally@grandma.com',
			password: bcrypt.hashSync('12345678'),
			isAdmin: false,
		},
	],

	products: [
		{
			name: 'Red Delicious Apple',
			slug: 'red-delicious-apple',
			category: 'Fruits',
			image: '/images/apple.jpg',
			price: 1.99,
			brand: 'Aldi',
			countInStock: 5,
			countNeeded: 10,
			description:
				'Give the gift of health with this delicious apple! It is a great source of fiber and vitamin C. It is also a great snack for on the go!',
		},

		{
			name: 'Banana',
			slug: 'banana',
			category: 'Fruits',
			image: '/images/banana.jpg',
			price: 1.99,
			brand: 'Aldi',
			countInStock: 23,
			countNeeded: 50,
			description:
				'Bananas are a great source of potassium and fiber. They are also a great snack for on the go!',
		},

		{
			name: 'Strawberries',
			slug: 'strawberries',
			category: 'Fruits',
			image: '/images/strawberry.jpg',
			price: 4.99,
			brand: 'HyVee',
			countInStock: 0,
			countNeeded: 25,
			description: 'What is better than strawberries?',
		},

		{
			name: 'Blueberries',
			slug: 'blueberries',
			category: 'Fruits',
			image: '/images/blueberry.jpg',
			price: 5.99,
			brand: 'Walmart',
			countInStock: 10,
			countNeeded: 90,
			description: 'Look mom! It is a blueberry! Wow!',
		},

		{
			name: 'Grape',
			slug: 'grape',
			category: 'Fruits',
			image: '/images/grapes.jpg',
			price: 3.99,
			brand: 'Walmart',
			countInStock: 22,
			countNeeded: 85,
			description: 'Got any grapes?',
		},
	],
};

export default data;
