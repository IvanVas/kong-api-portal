# Web portal for a Kong-based API access

## Purpose
You use [Kong](https://github.com/Kong/kong) to authenticate your API users and you registered your first few manually.
Now it's time to automate the process, but you don't have spare time to create a complicated portal for your users, just yet.
This **API portal** would give your users an opportunity to register and get Kong auth credentials to start using your API.

## Features
There are two main functions:
1. Registration: users can register. That way you have a base of your users.
    - Email login and registration: users can register using email and get a confirmation link to their inbox. Only having confirmed the email registration can she get an API key.
    - GitHub account login
    - Google account login 
    - Other OAuth integrations are easily added if needed and supported by Meteor (e.g, Facebook)
2. Get an API access key (create a [Kong authentication key](https://getkong.org/plugins/key-authentication/), store it into the Portal's DB and display to the user).

## Usage
This is a template project. You have to enter your infrastructure information, change branding.
Having done this, you can [deploy](#meteor-up-quick-deployment) and start using it.

- There are *TODO* bookmarks throughout the code. Those need to be changed to reflect your infrastructure.
- When freshly installed (or after *meteor reset*), in the *Sign in* dropdown you'll find 'Configure xxxx Login' links in red. Follow the instructions to configure the authentication. 
- You'll find Airly logos, URLs, etc. They need to be changed to reflect your brand, URLs and other information.

## Meteor UP quick deployment
There are several methods of deploying the portal. [[1]](https://guide.meteor.com/deployment.html) 
To make it easy you can use [Meteor UP](https://github.com/zodern/meteor-up). 
All you need to do is:
- install [Docker](https://www.docker.com/) on the server
- install Meteor UP locally
- change *.deploy/mup.js*
- run the deployment as below
```bash
cd .deploy
mup deploy
```

#### Disclaimer
UX is minimalistic, you won't find a trendy UI here.