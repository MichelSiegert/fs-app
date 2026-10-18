chmod +x ~/minecraft_shutdown.sh
grep "Minecraft" /var/log/syslog
journalctl -t kernel --since "5 minutes ago"
sudo crontab -e
*/5 19-23 * * * /home/fsie/fs-app/scripts/shutdown.sh