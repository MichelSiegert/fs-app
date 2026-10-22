#!/bin/bash
cd /home/fsie/fs-app/ || exit 1

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

git fetch && 
git pull && 
npm i && 
npm run build && 
npm start & 
sleep 5

xdg-open http://localhost:3000

