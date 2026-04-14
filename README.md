# Classic Snake

一个可直接部署分享的经典贪吃蛇小游戏。

## 本地运行

需要先安装 Node.js。

```powershell
cd D:\AI_project
node server.js
```

浏览器打开：

`http://localhost:3000`

## 本地测试

```powershell
node --test
```

## 分享给别人玩

最简单的方式是部署到 Vercel。

### 方法一：用 GitHub + Vercel

1. 把 `D:\AI_project` 上传到你的 GitHub 仓库
2. 打开 [https://vercel.com](https://vercel.com)
3. 用 GitHub 账号登录
4. 选择 `Add New Project`
5. 导入这个仓库
6. 保持默认配置直接部署

部署完成后，Vercel 会给你一个公开网址，别人打开就能玩。

### 方法二：用 Vercel CLI 直接部署

先安装 Vercel CLI：

```powershell
npm install -g vercel
```

然后在项目目录执行：

```powershell
cd D:\AI_project
vercel
```

如果要直接发正式地址：

```powershell
vercel --prod
```

## 手动检查清单

- 方向键或 `WASD` 可以控制移动
- 吃到食物后分数会增加，蛇会变长
- 撞墙或撞到自己会结束游戏
- 按 `Space` 可以暂停或继续
- 点击 `Restart` 可以重新开始
- 手机上可以点击屏幕按钮控制方向
