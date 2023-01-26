#!/bin/sh

filename="../data/in/${3}/${1}.csv"

for (( i=$2+1 ; i>=1 ; i-- ))
do
	if [ "$i" -gt "$2" ]
	then 
		echo "RANK,GAME,NOTES" > "$filename"
	else
		echo "${i},," >> "$filename"
	fi
done
