for i in {1..150}; do
    if curl -s -o /dev/null http://localhost:3000; then
        firefox --kiosk http://localhost:3000
        exit 0
    fi
    sleep 2
done
exit 1