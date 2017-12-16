# SimpleBots Backend

![SimpleBots Logo](/logo.png)

This is the repository for the software development project from the University of Applied Science in Mannheim. Our customer is LivePerson and we are the team Slitherin. In this repository you can find everything about our product, `SimpleBots`.
`SimpleBots` was created to simplify the life of the LivePerson employies.
They should be able to create, manage and edit messaging bots from a user friendly website.
The bots should be small in size, good in performance and easy in creation.
In here you find our solution for this problem, we had about 10 weeks for the whole project and the most of us didnt know any of the frameworks we were using.
If you have any questions you can contact me at any time Luca Schilling <1612711@stud.hs-mannheim.de><https://github.com/lucaSchilling>


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

First, get you a copy of the whole repository:
```
$ git clone http://github.com/lucaSchilling/SEP-Slitherin.git
```

### Prerequisites

* For using our software u have to have docker installed:
Linux
``
sudo apt-get install docker
``
[Windows](https://docs.docker.com/docker-for-windows/install/) 
* If you want to use our frontend from an other location then the backend just change the url in `/frontend/src/store/actions.js` to the url where  you run the backend.
* Our software uses a mongo database, when you use the docker-compose file you dont need to change something.
But if you want to use your own mongo database just change the `MONGOURL` in the `/backend/.env` file to the ip your mongo is running.
* To use the `LivePerson` messaging system you need to enter your `LivePerson` credentials to the `/backend/.env` file.
* To use the F.A.Q. bot template you need to register by [Microsoft LUIS](https://www.luis.ai/) and add your LUIS key into the `/backend/.env` file.

### Installing

Thanked to docker you just need to run:
```
docker-compose up
```
When our the slitherin logo appears everything should be running and you can test it by creating a bot and test this bot with the following code pen:
* [Test suite](https://codepen.io/liveperson/full/xRzXXd/)
Just enter your `LivePerson` accountnumber and connect, now you can write anything and the before created Bot should anwser.

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

This project is licensed under the Apache 2.0 License - see the [LICENSE.md](/LICENSE.md) file for details

## Acknowledgments

* Thanks a lot to my whole team and all other participants of the SEP in the WS 17/18.
It would be an honor to work with you again.   
`Luca Schilling`
