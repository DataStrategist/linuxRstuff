# linuxRstuff
a collection of random scripts and notes that help R-Users working in Linux

## Scripts:
For all of these scripts, either clone the folder into your server (probably easiest), or `touch` a new file, then edit that file and drop the code in.

**but no matter what you do** Remember to make the file executable by using `chmod 777 filename`. You can then jump into the folder containing these files and run it like this: `./file.sh`

 - **Rinstaller.sh** - create a file like this in your server and use it to install packages. That way, the packages will be available for all users.
  - **chek.sh** - a file that you can use to see if an R script is running... if it's running, then do nothing... if it's NOT running, then it assigns the working directory, and restarts the file.
