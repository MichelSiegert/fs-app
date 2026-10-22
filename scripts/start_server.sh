#!/bin/bash
cd /home/fsie/fs-app/ || exit 1

export PATH="/home/fsie/.nvm/versions/node/v26.12.0/bin:$PATH"
export DISPLAY=:0

git fetch && 
git pull && 
npm i && 
npm run build && 
npm start & 
sleep 15

firefox http://localhost:3000