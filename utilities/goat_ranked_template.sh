#!/bin/sh

filename="../data/in/${2}/${1}.csv"

for (( i=$3+1 ; i>=1 ; i-- ))
do
	if [ $i -gt $3 ] 
	then 
		echo "RANK,GAME,NOTES" > $filename
	else
		echo "${i},," >> $filename
	fi
done
