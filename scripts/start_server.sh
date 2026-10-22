#!/bin/bash
cd /home/fsie/fs-app/ || exit 1

git fetch && 
git pull && 
npm i && 
npm run build && 
npm start & 
sleep 15

xdg-open http://localhost:3000