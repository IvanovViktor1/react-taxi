# React-Taxi

This web application allows users to book a taxi by selecting the taxi's starting address on an interactive map. Users can enter an address manually or select a point on the map. After selecting an address, available taxis are displayed on the map as green markers. The application uses a modern technology stack and provides an intuitive user interface.

## Getting Started

These instructions will help you run a copy of the project on your local computer for development and testing. Follow these steps to set up your project.

### Prerequisites

To run this application, you will need to install the following software:

Node.js (https://nodejs.org/)
npm (Node Package Manager), which is usually installed with Node.js

After installation, you can check their versions to make sure everything is installed correctly:

`bash`
`node -v`
`npm -v`

### Installation

First, clone the repository:

git clone https://github.com/IvanovViktor1/react-taxi.git
cd react-taxi

Then install the required dependencies:

`npm install`

### Launching the application

To start the development server, run:

`npm start`

This will start the development server and the application will be available at http://localhost:3000.

### Working with the application

Order a Taxi: Enter the address in the "From" form or click on the map to select a pickup location. If the address is not found, a red marker with "Address Not Found" will appear.
Crew Selection: Available crews will be displayed on the map as green markers. The list of eligible crews will be sorted by distance to the pickup point.
Order Confirmation: After selecting the appropriate crew, click "Order". Your order information will be sent, and you will receive a confirmation.

## Technology stack

The project uses the following technologies:

- React - the library for user interfaces [React documentation](https://reactjs.org/)
- Redux Toolkit - a set of tools for managing application state [Redux Toolkit documentation](https://redux-toolkit.js.org/)
- React-Yandex-Map - a wrapper around the Yandex.Maps API, allows you to display Yandex.Maps in a React application [react-yandex-maps documentation](https://pbe-react-yandex-maps.vercel.app/)
- TypeScript - JavaScript add-on for static code typing [TypeScript documentation](https://www.typescriptlang.org/)
- Material-UI - UI component library [TypeScript documentation](https://mui.com/)

## Authors

Ivanov Viktor - GitHub profile (https://github.com/IvanovViktor1)
