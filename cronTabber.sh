START=$(date +%s)
# do something
# start your script work here
$1
# your logic ends here
END=$(date +%s)
DIFF=$(( $END - $START ))
echo "XXX $1 $START $DIFF"