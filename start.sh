#!/bin/bash
output=$( forever list | grep OC )
blank=""
if [ "$output" ]; then
   	forever restart OC
else
	forever start --uid OC -a index.js
fi