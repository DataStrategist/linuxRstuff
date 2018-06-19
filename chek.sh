if ps aux | grep "R_file_you_want_to_check.R"  | grep -v grep > /dev/null
then
  echo "Running, all good!"
else
  echo "Not running... will restart:"
  cd /path_to_your_working_directory
  Rscript "R_file_you_want_to_check.R" 
fi
