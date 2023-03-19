# part3

Part 3 of the Fullstack Open course focuses on the backend of the application.
Concept that will be explored:
- Exploration of building our backend on top of NodeJS, which is a JavaScript runtime based on Google's Chrome V8 JavaScript engine.

# phonebook

Implement a Node application that returns a hardcoded list of phonebook entries from the address http://localhost:3001/api/persons.

The application must be started with the command 'npm start'.

The application must also offer an 'npm run dev' command that will run the application and restart the server whenever changes are made and saved to a file in the source code.

Implement following features
- Implement a page at the address http://localhost:3001/info
- display the information for a single phonebook entry. The url for getting the data for a person with the id 5 should be http://localhost:3001/api/persons/5
- make it possible to delete a single phonebook entry by making an HTTP DELETE request to the unique URL of that phonebook entry.
- Expand the backend so that new phonebook entries can be added by making HTTP POST requests to the address http://localhost:3001/api/persons.
- Implement error handling for creating new entries. The request is not allowed to succeed, if:
   - The name or number is missing
   - The name already exists in the phonebook
- connect backend to the frontend of part2/phonebook
- deploy the backend to the internet using Fly.io or Render
- Generate a production build of your frontend, and add it to the internet application using the method introduced in this part.

Checkout the end result: 
