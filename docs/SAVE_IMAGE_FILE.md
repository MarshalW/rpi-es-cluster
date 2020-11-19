# 生成并缩少系统镜像文件

简化后续 rpi4 的安装，直接用镜像文件制作 TF 卡。

## TF 卡生成镜像文件

TF 卡插入电脑，执行：

```properties
diskutil unmountDisk /dev/disk5
```

生成镜像文件：

```properties
sudo dd if=/dev/rdisk5 of=rpi-ubuntu-20.04.img bs=64m
```

镜像文件会和 TF 卡容量一样大。

## 缩小镜像文件

使用 [Docker-PiShrink](https://github.com/thhan/Docker-PiShrink) 可以将镜像文件缩小。

需要宿主机已经安装了 Docker.

该工具将直接更新当前的镜像文件，如果担心可提前备份原始镜像文件。

## 测试使用缩小的镜像文件

运行：

```properties
sudo dd bs=64m if=rpi-ubuntu-20.04.img of=/dev/rdisk5; sync
```

