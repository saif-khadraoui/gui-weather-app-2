# How to run the code

The unzipped folder should be open and you should see a client folder and a server folder. Open two terminals side by side. On the first terminal, cd into the client folder and write npm install to download all the dependencies. Then on the second terminal cd into the server folder and also write npm install. 

Both client and server should have all the installed dependencies now. On the terminal which has the server folder open, write node index.js. If you get an error on the server terminal about bcrypt not being installed then on the server terminal write npm rebuild bcrypt --build-from-source, then write node index.js on the server terminal. On the terminal that has the client folder open, write npm run dev. The client terminal should provide you with a link, click on that link to open the web app. On the server folder, the server should have started too. 

