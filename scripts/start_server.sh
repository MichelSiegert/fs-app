#!/bin/bash
cd /home/fsie/fs-app/ || exit 1
npm start > /tmp/npm-start.log 2>&1 &
NPM_PID=$!

echo "Waiting for an app to start..."
until curl -s http://localhost:3000 > /dev/null; do
	if ! kill -0 $NPM_PID 2>dev/null; then
		echo "Error: npm start oricess died. Here is da log;"
		cat /tmp/npm-start.log
		exit 1
	fi
	sleep 1
done

xdg-open http://localhost:3000

