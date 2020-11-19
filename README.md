# Raspbery Pi Elasticsearch

搭建单节点和集群节点 Elasticsearch，并做相关指标的基准测试。

## 单节点



## 5 节点集群

目的：

- rpi4，5 个节点，运行 Elasticsearch cluster
- rpi4 系统为 Ubuntu server 20.04
- 另外有一个 rpi4 节点，做 admin
  - 通过 ansible 控制 Elasticsearch cluster
  - 通过 kibana 监控 Elasticsearch cluster

### 准备

需要准备硬件：

- 3 台 rpi4，4GB 内存，elasticsearch master node
- 2 台 rpi4，8GB 内存，elasticsearch data & ingest node
- 1 台 rpi4，2GB 内存，admin，安装 ansible & kibana

### 基本步骤

- [制作基于 TF 卡的初始系统](./docs/TF_INIT_SYSTEM.md)
- [安装配置基础组件](./docs/BASIC_COMPONENTS.md) //TODO 有修改，未测试
- [生成并缩少系统镜像文件](./docs/SAVE_IMAGE_FILE.md)
- [为每个节点指定 ip 地址和主机名](./)
- [配置 admin 节点免密码访问其他节点](./)
- [配置和管理 Elasticsearch 节点](./)
- [admin 节点配置 Kibana 和管理脚本](./)
