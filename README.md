# Table of Contents
- [What is Family Tabs](#family-tabs)
- [Tech-Stack](#tech-stack)
    - [Front-End Dependencies](#front-end-dependencies)
        - [React](#react)
        - [Axios](#axios)
        - [Styled Components](#styled-components)
  - [Back-End Dependencies](#back-end-dependencies-production)
    - [ExpressJS](#expressjs)
    - [Stripe](#stripe)

- [Backend API](#backend-api)
    - [Admin Routes](#admin-routes)
      - [Create Event](#create-events)
      - [Change Event](#change-events)

# Family-Tabs

Family Tabs helps families to stay on top of events related to everything from recitals, to soccer games to doctor’s appointments.  Parents can view events on one screen, mark off events that have passed and edit existing events.  Family accounts allow full integration with the ability for older children to add events in real time and on the go to the app.  Parents can edit events made by children and manage schedules with ease. 

Find us here: [Family Tabs!](https://family-tabs.netlify.com/)

# Tech-Stack

## Front-End Dependencies

### React

React offers reusable components that can be used on multiple pages, such as our individual Family Tabs.   It is scalable toward larger accounts, or even enterprise level accounts as an eventuality.  React has easier state management in that multiple dates and times will be added, edited and deleted in real time.  It also offers robust documentation and wide implementation makes react the more stable reliable choice.  | [View Dependency](https://reactjs.org/docs/getting-started.html)

### BlueprintJS

Blueprint is a React-based UI toolkit for the web. It is optimized for building complex data-dense interfaces for desktop web applications.  [View Dependency](https://github.com/palantir/blueprint)

### MomentJS

Moment simplifies parsing, validating, manipulating, and displaying dates and times in JavaScript.  Moment is designed to work in the browser and NodeJS. [View Dependency](https://github.com/moment/moment/)

### Cheesburger-Menu

A simple sliding menu component for React. 

[View Dependency](https://www.npmjs.com/package/cheeseburger-menu)

### React-Hamburger-Menu

Built for React, this is a handy UI component for a menu icon in a mobile site or application. [View Dependency](https://www.npmjs.com/package/react-hamburger-menu)

### Axios
This HTTP client is promise based and works very well with a REST API. | [View Dependency](https://www.npmjs.com/package/react-axios)

### Styled Components

This dependency allows the developer to directly style components within each file.  There is fantastic documentation, and an active community.  The syntax uses JavaScript component syntax, and therefore is easy to read for future developers on the project. | [View Dependency](https://www.styled-components.com/docs/)

## Back-End Dependencies 

### Express

Express is a minimal, flexible and highly customizable framework using the JS language that we will be using on the front-end.  Knowing that all team members would be hopping back and forth between front end and back end made choosing a javascript framework the better choice for us.
| [View Dependency](http://expressjs.com/)

### Stripe

Stripe offers and easily integratable payment systems for applications in order to process subscription feeds | [View Dependency](https://stripe.com/docs/)

## Backend API


### Admin Routes

#### Create Events

POST `/createevent`

Adds a new event to schedule.

Request body should look like this:

```
{
    "scheduledEvent_name": "Baseball Game",
    "familyID": 1,
    "eventTypeID": 1,
    "locationID": 1,
    "timeDate": "January 2, 2018"
    
}
```

#### Change Events

POST `/changeevent/:id`

Changes the details of a particular event by input field. 

Request body could include these fields:

```
{
    "scheduledEvent_name": "Baseball Game",
    "timeDate": "January 2, 2018"
    
}
```