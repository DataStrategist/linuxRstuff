!/bin/bash
# 
echo what repo should I pull and build?
read varname

        echo --------------------------------
        echo pulling...
        cd $varname
        git pull
        echo --------
        cd ..
        R CMD INSTALL $varname
        
