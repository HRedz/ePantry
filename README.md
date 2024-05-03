# ePantry

--> First Time Setup

Make sure that the following tools are installed:
Git https://git-scm.com/downloads 
VS Code https://code.visualstudio.com/ 
Node.js https://nodejs.org/en/download 

Go to MongoDB https://www.mongodb.com/ and sign in with the following credentials:
* Email: epantry4@gmail.com
* Password: boston.organ.lowe

Once logged in, locate the link to Network Access in the sidebar on the left, under the Security label. 

On the Network Access page, click Add IP Address and then click Add Current IP Address and then click Confirm to add your IP address. This allows you to connect to the database when running the project and is necessary. 

Using git, clone the repository to your device by method of your choice.

Once you have the repository cloned, open the project in VS Code by launching VS Code and selecting File > Open Folder… and choosing the ePantry folder that you cloned.

In VS Code, open a terminal by selecting Terminal > New Terminal. 

Verify that you are in the correct folder by running 

`pwd`

and confirm that the current directory is ePantry. If that is not the current directory, navigate to it.

Run

`cd backend`

to navigate to the backend folder, then run

`npm install`

to install all needed node packages in the backend folder, and finally run

`npm start`

to start the server. You should see the message “connected to db and listening on port 4000” appear. If it does not, ensure you have added your IP address to the MongoDB account.

Open an additional terminal in VS Code, without terminating the backend process, and run

`cd frontend`

to navigate to the frontend folder. Run

`npm install`

`npm install axios`

to install all needed node packages in the frontend folder, and finally run

`npm start`

to start the frontend. It will launch in your default browser. Please note, our web portal is designed to work in Chrome, other browsers may have issues. To access the web portal in a different browser, simply enter the url http://localhost:3000/ in the address bar of your browser of choice while the frontend and backend are running. 

You may now use the web portal! You can create an account to get started. 

--> Future Usage

After completing this setup, you only need to open VS Code and use 

`npm start`

to start the backend and the frontend as described above. Please note that if your IP address changes you will need to add it via the MongoDB website again using the same process. 
