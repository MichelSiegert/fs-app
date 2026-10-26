#!/bin/bash

cd /home/fsie/minecraft

tmux new-session -d -s minecraft 'java -Xmx4G -Xms4G -jar server.jar nogui'