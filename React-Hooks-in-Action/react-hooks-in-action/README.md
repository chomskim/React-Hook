# React Hooks in Action

Code for the Bookings App example from the book [React Hooks in Action](https://www.manning.com/books/react-hooks-in-action?a_aid=r51&a_bid=b49082e3&chan=gh) by John Larsen, published by Manning.

## Setup

The app was created with create-react-app:

    npx create-react-app react-hooks-in-action

React Router and React Icons were then installed:

    yarn add history react-icons react-router-dom

## Pages

The app includes three pages:

- Bookings
- Bookables
- Users

React Router (v6) is used to link to and render the three pages.

## Components

There is a component for each page. There is also a UserPicker component that is currently just a drop-down list with one item: Users.

## Setting up a JSON server

    npm install -g json-server

    json-server --watch db.json --port 3001

    json-server --watch db.json --port 3001 --delay 3000
