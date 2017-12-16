# SimpleBots Backend

![SimpleBots Logo](../logo.png)

This is the repository for the software development project from the University of Applied Science in Mannheim. Our customer is LivePerson and we are the team Slitherin. In this folder u find everything for our frontend.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

First, get you a copy of the whole repository:
```
$ git clone http://github.com/lucaSchilling/SEP-Slitherin.git
```

### Prerequisites

* For using our frontend u have to have a running backend connected to a mongo database more about that in the backend folder.
* To use our frontend from an other ip then the backend you need to change the URL in `/src/store/actions.js` in line 2

### Installing

Step into the frontend folder,
then install the dependencies:
```
$ npm install
```
Start the frontend with:
```
$ npm run dev
```
Now your browser should open and you will see our frontend, you can click through it and have fun.

## Deployment

For deployment you can either build our frontend with: 
``
npm run build
``
and put the now generated files in `/dist` onto an apache, or you can run it as docker, therefore look into the next paragraph `Docker`

## Docker

You can use all of our softwar components as `docker container`.
For our frontend you simply run in the frontend folder:

``
npm run build
``
Wait for the build to finish
``
docker build -t frontend .
docker run -p 8080:8080 frontend
``

## Authors

* **Luca Schilling** - *Team Leader* - [find me here](https://github.com/lucaSchilling)
* **Raphael Lubaschewski** - *Frontend Leader* - [find me here](https://github.com/Raphi1524694)
* **Christopher Rotter** - *Backend Leader* - [find me here](https://github.com/ChristopherRotter)
* **Ibrahim Dursun** - *Tester* - [find me here](https://github.com/ibdursun)
* **Lucas Englert** - *Tester* - [find me here](https://github.com/Lucas964)
* **Markus Klatt** - *Organisation and Documentation* - [find me here](https://github.com/TPEMarkus)

See also the list of [contributors](https://github.com/lucaSchilling/SEP-Slitherin/contributors) who participated in this project.

## Designer

**Marlene Jung**, **Joceline Lampe**, **Maria Belov**, **Christina Deck**

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE.md](../LICENSE.md) file for details

## Acknowledgments

* Thanks a lot to my whole team and all other participants of the SEP in the WS 17/18.
It would be an honor to work with you again.   
`Luca Schilling`
