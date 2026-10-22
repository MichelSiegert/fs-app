
if [ "$(id -u)" -eq 0 ]; then
    exec su - fsie -c "$0 $@"
fi

cd /home/fsie/fs-app/ || exit 1

export PATH="/home/fsie/.nvm/versions/node/YOUR_NODE_VERSION/bin:$PATH"

git fetch &&
git pull &&
npm i &&
npm run build &&
npm start &
sleep 15

xdg-open http://localhost:3000