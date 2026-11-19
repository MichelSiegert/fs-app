sudo systemctl daemon-reload
sudo systemctl enable --now minecraft.service minecraft-ssh-tunnel.service

systemctl status minecraft.service minecraft-ssh-tunnel.service
journalctl -u minecraft-ssh-tunnel.service -n 20 --no-pager