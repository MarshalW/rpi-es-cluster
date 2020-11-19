# 安装配置基础组件

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [要求有预设的 HTTP 代理](#要求有预设的-http-代理)
- [宿主机 clone 项目并执行安装过程](#宿主机-clone-项目并执行安装过程)
  - [宿主机设置登录信息](#宿主机设置登录信息)
  - [执行安装过程](#执行安装过程)

<!-- /code_chunk_output -->

所有节点通用的组件和设置包括：

- 设置 ssh key 登录，并加入宿主机的 key
- 禁用 ssh 密码登录
- 给 ubuntu 用户和 root 用户设置 proxy 和 unproxy alias，方便通过代理加速安装过程
- 安装 Docker 和 docker-compose
- Docker service 设置代理，加速容器镜像下载
- docker pull elasticsearch image
- 安装 ansible

## 要求有预设的 HTTP 代理

- 如果没有可靠快速的代理，国内网几乎很难正常安装
- 使用代理后，可以很快，可能几分钟就可以安装完毕
- 为 apt/docker/npm/pip 配置国内 mirror site 会消耗很多时间，而且有时不稳定
- 另有一些情况不能通过 mirror site 解决，比如 curl/wget

## 宿主机 clone 项目并执行安装过程

clone 项目：

```properties
git clone https://github.com/MarshalW/rpi-es-cluster.git
```

### 宿主机设置登录信息

假设之前跑起来初始系统的 rpi4 的 ip 地址是 `192.168.0.163`

那么已经可以通过 `ssh ubuntu@192.168.0.163` 登录到 rpi4

配置`~/.ssh/config`，加入：

```properties
host proto
Hostname 192.168.0.163
User ubuntu
```

配置 `./rpi-es-cluster/hosts.ini`

```ini
[basic_components]
proto ansible_user=ubuntu ansible_password=password
```

### 执行安装过程

宿主机需要安装 ansible

在项目根目录下执行：

```
ansible-play basic-compoents.yml
```
