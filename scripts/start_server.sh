#!/bin/bash
cd /home/fsie/fs-app/ || exit 1

export PATH="/home/fsie/.nvm/versions/node/v26.12.0/bin:$PATH"

git fetch &&
git reset --hard origin/main &&
git clean -fd &&
git pull && 
npm i && 
npm run build && 
npm start & 
sleep 45

xdg-open http://localhost:3000