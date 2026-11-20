#!/bin/bash

MC_RAW=$(printf '\xFE\x01' | nc -w 1 localhost 25565 2>/dev/null)

if [ -z "$MC_RAW" ]; then
    ONLINE="false"
    PLAYERS_CONNECTED=0
else
    ONLINE="true"
    PLAYERS_CONNECTED=$(echo "$MC_RAW" | sed 's/\x00\x00\x00/\n/g' | tr -d '\0' | tail -n 1)
    P2=$(echo "$MC_RAW" | sed 's/\x00\x00\x00/\n/g' | tr -d '\0' | tail -n 1 | cut -c30-)
    PLAYERS_CONNECTED=$(echo "${P2}/100" | bc)
    echo "$P3"
    if ! [[ "$PLAYERS_CONNECTED" =~ ^[0-9]+$ ]]; then
        PLAYERS_CONNECTED=0
    fi
fi

if [ "$ONLINE" = "false" ] || [ "$PLAYERS_CONNECTED" -eq 0 ]; then
	poweroff
fi
