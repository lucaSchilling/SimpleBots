# SimpleBots FrontEnd

![SimpleBots Logo](../logo.png)

This is the repository for the software development project from the `University of Applied Science in Mannheim`. Our customer is LivePerson and we are team Slitherin. In this folder you can find everything for our frontend.

## Getting Started

The following instructions will enable you to set up a copy of our project and run it on your local machine for development and testing purposes.
See deployment for notes on how to deploy the project on a live system.

To start off, you'll need to grab a copy of our repository:
```
$ git clone http://github.com/lucaSchilling/SEP-Slitherin.git
```

### Prerequisites

* It is mandatory to have a running backend connected to a MongoDB. If you're unsure how to do it, feel free to take a look in our backend folder.
* To use our frontend from another ip then the backend, all you need to do is changing the URL in `/src/store/actions.js` in line 2.

### Installing

Step into the frontend folder and install the necessary dependencies by running:
```
$ npm install
```
Start the frontend by using:
```
$ npm run dev
```
When everything is done, your browser will open and you can freely click through the frontend and have fun.

## Deployment

For deployment you can either build our frontend with: 
``
npm run build
``
and put the newly generated files in `/dist` onto an apache, or you can run it as docker. Take a look at the next paragraph for more information on `Docker`.

## Docker

You can use all of our software components as `docker container`.
In case of our frontend, all you have to do is running the following in the frontend folder:

``
npm run build
``
Wait for the build to finish.
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

Take a look at the list of [contributors](https://github.com/lucaSchilling/SEP-Slitherin/contributors) to see participated in this project.

## Designer

**Marlene Jung**, **Joceline Lampe**, **Maria Belov**, **Christina Deck**

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE.md](../LICENSE.md) file for details

## Acknowledgments

* Thanks a lot to my whole team and all other participants of the SEP in the WS 17/18.
It would be an honor to work with you again.   
`Luca Schilling`
