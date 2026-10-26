#!/bin/bash

cd /home/fsie/minecraft

export DISPLAY=:0
export XAUTHORITY=/home/fsie/.Xauthority

java -Xmx4G -Xms4G -jar server.jar