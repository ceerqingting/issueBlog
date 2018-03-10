### XXX.APP已损坏,打不开.你应该将它移到废纸篓 MACOS 10.12 SIERRA
1. 修改系统配置： 系统偏好设置 -> 安全性与隐私。修改为任何来源
2. 如果没有这个选项，则执行如下命令即可
```
sudo spctl --master-disable
```