# 制作基于 TF 卡的初始系统

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [写入 Ubuntu server 系统](#写入-ubuntu-server-系统)
- [访问 rpi4 运行的 Ubuntu server](#访问-rpi4-运行的-ubuntu-server)
  - [headless 安装如何找到 ip 地址](#headless-安装如何找到-ip-地址)
  - [第一次登录到服务器](#第一次登录到服务器)

<!-- /code_chunk_output -->

## 写入 Ubuntu server 系统

准备 1 张 TF 卡，16GB 以上

下文使用操作系统为 macOS 10.15。

TF 卡插入电脑，查看盘符：

```properties
diskutil list
```

unmount 该盘:

```properties
diskutil unmountDisk /dev/disk5
```

在 Ubuntu 官网下载最新的 Ubuntu server 20.04 镜像，应该是 gz 格式的。

将镜像写入 TF 卡：

```properties
sudo sh -c 'gunzip -c ~/Downloads/ubuntu-20.04.1-preinstalled-server-arm64+raspi.img.xz | sudo dd of=/dev/rdisk5 bs=64m'
```

## 访问 rpi4 运行的 Ubuntu server

将 TF 卡插入一台 rpi4，连接网线运行。需要局域网支持 DHCP.

### headless 安装如何找到 ip 地址

最简单的方式是，在局域网内另一台 linux 执行：

```properties
ping ubuntu.lan
```

或者，使用 nmap 查找同网段下所有打开 TCP22 端口的机器：

```properties
nmap -p22 192.168.0.0/24 | grep -B4 open
```

### 第一次登录到服务器

执行

```
ssh ubuntu@ubuntu.lan
```

会强制要求修改密码。
