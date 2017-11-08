!/bin/bash
# Ask the user what package to install
echo what package should I grab?
read varname

echo I assume you mean CRAN, but to use github type "g"
read source

if [ "$source" = "g" ]; then
        echo --------------------------------
        echo Installing $varname from GitHub
        sudo su - -c \\"R -e \"devtools::install_github('$varname')\"\\"
else
        echo --------------------------------
        echo Grabbin $varname from CRAN
        sudo su - -c \\"R -e \"install.packages('$varname', repos='http://cran.rstudio.com/')\"\\"
fi


