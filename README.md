# Project Aegon

Part of the product built for DevJams 2019 Hackathon

## Viserion Platform

A product to improve the communication between the rescuees and their family/friends , in an effort to reduce the stress and trauma
faced by the victims.

### Tyrion

It is the chatbot with whom you can converse and enquire detailes about a rescuee, Tyrion is connected with the Database used by the SAR camps and can fetch realtime data about a rescuee's medical condition, his current  camp address and most importantly schedule a call

### Connect

This is the platform used to make calls, Connect uses Agora's RTC SDK to place video calls so that the rescuee and his family/friends can connect using a video call, this is done in the backdrop of a major disaster where all communication lines are down in ground zero but the camps have some network 
coverage due to their use of sattelite networks.

## Key Tech Features

i)To login to the Viserion Platform , users need to use their Google Id and we store some of their profile information in our database.  this is done using Google OAuth 2.0
  
ii) Tyrion is built using Dialogflow and it is connected to the DB using webhooks built using node js that allows it to communicate with our 
   backend servers.
   
iii) We use Agora's web SDK to build the Connect Platform which enables us to build a video communication platform.

iv) The calls are scheduled by Tyrion and the schedules stored in the database, a user can use the Connect platform only when it is time for his scheduled call   otherwise the browser will just display a message as "You don't have any calls scheduled at the moment, use Tyrion to schedule a call"
  
## Business Model
  
  The code has been open sourced and any Rescue Agency is free to use this code for their uses, we just want to give back to the community   with the help of this project
  
## Screen Shots

### HomePage

![Home Page](https://github.com/ramaneswaran/aegon/blob/master/index.PNG)

### Profile Page

![Profile Page](https://github.com/ramaneswaran/aegon/blob/master/Screenshot_2019-10-26%20Profile.png)

### Tyrion

![Tyrion](https://github.com/ramaneswaran/aegon/blob/master/Screenshot_2019-10-26%20Tyrion.png)

### Connect

![Connnect](https://github.com/ramaneswaran/aegon/blob/master/Screenshot_2019-10-26%20Basic%20Communication.png)
  
