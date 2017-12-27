# SimpleBots

![SimpleBots Logo](/logo.png)

This is the repository for the software development project from the `University of Applied Science in Mannheim`. Our customer is `LivePerson` and we are team `Slitherin`. In this repository you can find everything about our product, `SimpleBots`.
`SimpleBots` was created to simplify the life of `LivePerson` employees.
Our task was to develop a product that allows its users to easily create, manage and edit messaging bots from a user friendly website.
The bots themselves were supposed to fit three criteria: small in size, good in performance and easy in creation.
This repository contains our solution for the given task.
We were given a total time span of roughly 10 weeks to complete the project and most of us didn't have any prior experience with most frameworks that are being used as of right now.
If you have any questions about our project, feel free to contact me:   
* Luca Schilling   
<1612711@stud.hs-mannheim.de>  
<https://github.com/lucaSchilling>


## Getting Started

The following instructions will enable you to set up a copy of our project and run it on your local machine for development and testing purposes.
See deployment in the frontend README.md file for notes on how to deploy the project on a live system.

To start off, you'll need to grab a copy of our repository:
```
$ git clone http://github.com/lucaSchilling/SEP-Slitherin.git
```

### Prerequisites

* It is mandatory to install docker before you use our software:     
Linux:   
``
sudo apt-get install docker    
``     
[Windows](https://docs.docker.com/docker-for-windows/install/)      
* If you want to use our frontend from another location then the backend just change the url in `/frontend/src/store/actions.js` to the url where you run the backend.
* Our software uses MongoDB as a database, removing the need to change anything when you use the docker-compose file.
If you want to use your own MongoDB, simply change the `MONGOURL` in the `/backend/.env` file to the ip your MongoDB is running on.
* To use the `LivePerson` messaging system you need to enter your `LivePerson` credentials into the `/backend/.env` file.
* To use the F.A.Q. bot template you need to register at [Microsoft LUIS](https://www.luis.ai/) and add your LUIS key into the `/backend/.env` file.

### Installing

Thanks to docker, all you need to do is run the next command:
```
docker-compose up
```
When our Slitherin logo appears, everything should be running and you are able to test it by creating a bot and use the following code pen to connect with it:
* [Test suite](https://codepen.io/liveperson/full/xRzXXd/)
Just enter your `LivePerson` account number and click on connect. Your previously created bot should be able to answer your message.

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

This project is licensed under the MIT License - see the [LICENSE.md](/LICENSE.md) file for details.

## Acknowledgments

* Thanks a lot to my whole team and all other participants of the SEP in the WS 17/18.
It would be an honor to work with you again.   
`Luca Schilling`
