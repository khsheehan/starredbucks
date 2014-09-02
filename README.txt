------------------------------------------------------------------------
StarredBucks Build and Run Instructions
------------------------------------------------------------------------

To get StarredBucks running on your local machine, complete the following steps. Note that the MySQL credentials are kept outside of the submitted repository, and if you wish to run the application completely, you'll need to request permission to have your current IP Address whitelisted.

If this is required please email khs35@drexel.edu for further instructions.

This README.txt file sits in the root of the StarredBucks project. We will assume that you have Java 5 or newer installed on your system. If you do not have any version of Java installed, we suggest installing the latest version of Java (Java 8).

Download links can be found at http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html.

Once you have Java installed and it is ready to run on your system, complete the following steps...

1. Download and install the Play! Framework (available at https://playframework.com/)
2. In this directory (the one that contained this README file), run the following command...

    activator run;

3. The above command should initialize the app, resolve any dependencies, and then attach the running process to port 9000.

4. If all appears to be running properly, open your browser of choice and navigate to

    localhost:9000/

5. If the installation worked, you should be presented with an error that Play! cannot connect to the database with the provided credentials (this is a good thing).

6. If something does not appear to be running properly, please consult the Play! Framework guide at https://www.playframework.com/documentation/1.0/guide1 for further instructions.

7. If you wish to run the app and connect to the database, your IP Address will need to be whitelisted to connect to Google's CloudSQL service. If this is required please email khs35@drexel.edu for further instruction.

