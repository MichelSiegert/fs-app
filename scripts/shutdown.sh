#!/bin/bash
PLAYERS_CONNECTED=$(ss -tn '( sport = :25565 )' | grep -v 'LISTEN' | grep -v '127.0.0.1' | grep -v '::1' | wc -l)

if [ "$PLAYERS_CONNECTED" -eq 0 ]; then
    logger "Minecraft server empty at 7PM or later. Shutting down PC..."
    shutdown -h now
else
    logger "Minecraft server is not empty ($PLAYERS_CONNECTED connections). Postponing shutdown."
fi