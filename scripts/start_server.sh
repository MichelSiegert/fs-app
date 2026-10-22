#!/bin/bash
cd /home/fsie/fs-app/ || exit 1

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

nvm use default || nvm use node

git fetch && 
git pull && 
npm i && 
npm run build && 
npm start & 
sleep 15

xdg-open http://localhost:3000