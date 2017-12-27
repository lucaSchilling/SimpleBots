# SimpleBots Backend

![SimpleBots Logo](../logo.png)

This is the repository for the software development project from the `University of Applied Science in Mannheim`. Our customer is LivePerson and we are team Slitherin. In this folder you can find everything for our backend and the used bot templates.

## Getting Started

The following instructions will enable you to set up a copy of our project and run it on your local machine for development and testing purposes.
See deployment in the frontend README.md file for notes on how to deploy the project on a live system.

To start off, you'll need to grab a copy of our repository:
```
$ git clone http://github.com/lucaSchilling/SEP-Slitherin.git
```

### Prerequisites

* It is mandatory to have a running MongoDB, either locally or by changing the `MONGOURL` in the `.env` file to the ip your MongoDB is running on.
* To use the `LivePerson` messaging system you need to enter your `LivePerson` credentials to the `.env` file
* To use the F.A.Q. bot template you need to register at [Microsoft LUIS](https://www.luis.ai/) and add your LUIS key into the `.env` file.

### Installing

Step into the backend folder and install the necessary dependencies by running:
```
$ npm install
```
Start the backend by using:
```
$ node backend.js
```
Now you should be able to create and deploy a simple welcome bot with an easy config.
First `POST` the following config with a REST-Client to the following address: 
```javascript
http://[IP where your backend is running]:3000/deploy/helloWorld
{    
    "_id": "1",   
    "template": "Welcome Bot",   
    "name": "Hello World Bot",    
    "welcomeMessage": "Hello I am the Hello World Bot",    
    "options": [{   
        "message" : "Joke 1", "options" : [{    
            "message" : "I love the F5 key. It´s just so refreshing."}]}]        
}   
```
In the next step you need to start it and enable it to respond to messages:
```javascript
http://[IP where your backend is running]:3000/setStatus/helloWorld
```
and the following `JSON`
```javascript
{    
    "status": "true",    
    "_id": "1"    
}    
```
Now your bot should be running and you are able to test it by using the following code pen:
* [Test suite](https://codepen.io/liveperson/full/xRzXXd/)
Just enter your `LivePerson` account number and click on connect. Your previously created Hello World Bot should be able to answer your message.
Simply enter a 1 for the first option and you'll receive a small joke from the Hello World Bot.

## Docker

You can use all of our software components as `docker container`.
In case of our backend, all you have to do is running the following in the backend folder:

``
docker build -t backend .
docker run -p 3000:3000 -v /var/run/docker.sock:/var/run/docker.sock backend
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
