#!/bin/bash

# 修改主机名
host_name=$1
echo $host_name | tee /etc/hostname
sed -i -E 's/^127.0.1.1.*/127.0.1.1\t'"$host_name"'/' /etc/hosts
hostnamectl set-hostname $host_name
# systemctl restart avahi-daemon

serviceName="avahi-daemon"

if systemctl --all --type service | grep -q "$serviceName";then
    systemctl restart avahi-daemon
# else
#     echo "$serviceName does NOT exist."
fi
