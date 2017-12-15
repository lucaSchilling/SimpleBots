# SimpleBots Backend

This is the repository for the software development project from the University of Applied Science in Mannheim. Our customer is LivePerson and we are the team Slitherin. In this folder u find everything for our different bot types.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

First, get you a copy of the whole repository:
```
git clone http://github.com/lucaSchilling/SEP-Slitherin.git
```

### Prerequisites

For using our backend u have to have a mongo database, either you have one local then it should work fine,
otherwise you need to change the `MONGOURL` in the `.env` file to the ip your mongo is running.

### Installing

Step into the backend folder,
then install the dependencies:
```sh
npm install
```
Start the backend with:
```sh
node backend.js
```
Now you should be able to start an easy configured welcome bot with an easy config
First ´POST´ the following config with a REST-Client to the following address: 
```
http://`[IP where your backend is running]`:3000/deploy/helloWorld
```
{
    "_id": "1",
    "template": "Welcome Bot",
    "name": "Hello World Bot",
    "welcomeMessage": "Hello I am the Hello World Bot",
    "options": [{"message" : "Joke 1", "options" : [{"message" : "Wer ist eigentlich dieser LAN und warum macht er so viele Partys?"}]}]
}
```
In the next step you need to turn him on with:
```
http://`[IP where your backend is running]`:3000/setStatus/helloWorld
```
and the following `JSON`
```
{
    "status": "true",
    "_id": "1"
}
```
Now your bot should be running and you can test him with the following code pen:
* [Test suite](https://codepen.io/liveperson/full/xRzXXd/)
Just enter your accountnumber and connect, now you can write anything and the Hello World Bot should anwser.
Enter a 1 for the first option, now the Hello World Bot is telling you a small joke. 

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
