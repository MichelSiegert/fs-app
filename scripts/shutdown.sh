#!/bin/bash

MC_RAW=$(printf '\xFE\x01' | nc -w 1 localhost 25565 2>/dev/null)

if [ -z "$MC_RAW" ]; then
    ONLINE="false"
    PLAYERS_CONNECTED=0
    logger "Minecraft server is offline or unreachable on port 25565."
else
    ONLINE="true"
    PLAYERS_CONNECTED=$(echo "$MC_RAW" | sed 's/\x00\x00\x00/\n/g' | tr -d '\0' | tail -n 1)
    
    if ! [[ "$PLAYERS_CONNECTED" =~ ^[0-9]+$ ]]; then
        PLAYERS_CONNECTED=0
    fi
fi

if [ "$ONLINE" = "false" ] || [ "$PLAYERS_CONNECTED" -eq 0 ]; then
    logger "Minecraft server empty or offline at 7PM or later. Shutting down PC..."
    poweroff
else
    logger "Minecraft server is not empty ($PLAYERS_CONNECTED connections). Postponing shutdown."
fi