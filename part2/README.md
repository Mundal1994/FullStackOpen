# part2

Concept that will be explored:
    - how to render a data collection, like a list of names, to the screen.
    - how a user can submit data to a React application using HTML forms.
    - how JavaScript code in the browser can fetch and handle data stored in a remote backend server.
    - simple ways of adding CSS styles to our React applications.

## Course information

Looks at courseinformation from part1 and tries to improve it.

## Phonebook

Starting to work with how to save the information on the webpage on the backend server. Goes over how to use axios to store, update and delete date on the server end

## Data for countries

Gives the opportunity to learn about API. Had to retrieve data from https://restcountries.com and make a webapplication that is able to retrieve and display data about the countries. Also tried to use api-key to retrieve API information about the weather.

## How to run

to see webpage start npm with the following command

npm start

for seeing the information on the server side open it on port 3001 with the following command

npx json-server --port 3001 --watch db.json


## Frontend production build

A production build of applications created with create-react-app can be created with the command 
    
    npm run build.

Before build make sure baseUrl is set = '/api/persons' in Server.js
