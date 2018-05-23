!/bin/bash
# Ask the user what package to install
echo what package should I grab? If from github, just write user/repo
read varname

if [[ $varname = *"/"* ]];  then
        echo --------------------------------
        echo Installing $varname from GitHub
        sudo su - -c \\"R -e \"devtools::install_github('$varname')\"\\"
else
        echo --------------------------------
        echo Grabbin $varname from CRAN
        sudo su - -c \\"R -e \"install.packages('$varname', repos='http://cran.rstudio.com/')\"\\"
fi
