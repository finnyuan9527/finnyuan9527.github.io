# finn-site Nginx 部署指南

本站是 Astro 构建的纯静态站点(`pnpm build` 输出到 `dist/`),只需 Nginx 托管静态文件即可,无需 Node 运行时。

## 一、部署前决策:选择站点路径模式

当前配置(`astro.config.mjs`)面向 GitHub Pages:

```js
site: 'https://finnyuan9527.github.io',
base: '/finn-site',
```

Nginx 部署有 **两种模式**,对应不同的配置与构建参数,**二选一**:

| 模式 | 访问地址 | 需要改动 |
|---|---|---|
| **A. 根路径**(推荐自有域名/服务器) | `https://your-domain.com/` | 改 `base` 和 `site`(见下) |
| **B. 子路径** | `https://your-domain.com/finn-site/` | 无需改代码 |

### 模式 A:根路径部署(推荐)

编辑 [astro.config.mjs](astro.config.mjs):

```js
export default defineConfig({
  site: 'https://your-domain.com',   // ← 你的正式域名
  base: '/',                          // ← 改为根路径
  integrations: [mdx(), sitemap()],
  vite: { plugins: [tailwindcss()] },
});
```

同时更新 [public/robots.txt](public/robots.txt) 中 Sitemap 地址:

```
Sitemap: https://your-domain.com/sitemap-index.xml
```

### 模式 B:子路径部署

代码零改动,直接按第三章「子路径 Nginx 配置」托管即可。

> 注意:`robots.txt` 中 Sitemap 地址仍是 github.io,需一并改为实际域名。

---

## 二、构建与上传

### 1. 本地构建

```bash
pnpm install
pnpm build
```

产物在 `dist/` 目录。

### 2. 上传到服务器

方式一:rsync 推送(推荐,增量同步)

```bash
rsync -avz --delete dist/ root@your-server:/var/www/finn-site/
```

方式二:服务器上拉取仓库后构建

```bash
git clone git@github.com:finnyuan9527/finn-site.git && cd finn-site
pnpm install && pnpm build
cp -r dist/* /var/www/finn-site/
```

确保运行 Nginx 的用户(如 `www-data`)对目录有读取权限:

```bash
chown -R www-data:www-data /var/www/finn-site
chmod -R 755 /var/www/finn-site
```

---

## 三、Nginx 配置

### 模式 A:根路径配置

新建 `/etc/nginx/sites-available/finn-site`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name your-domain.com;          # ← 改成你的域名

    root /var/www/finn-site/dist;         # ← 构建产物目录
    index index.html;

    # Gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_comp_level 5;
    gzip_types
        text/plain
        text/css
        text/javascript
        application/javascript
        application/json
        application/xml
        image/svg+xml;

    # 静态资源(Astro 自带内容哈希指纹,可长期缓存)
    location /_astro/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 页面路由:静态站规则,directory 下有 index.html
    location / {
        try_files $uri $uri/ $uri/index.html =404;
    }

    # 404 页面(可选)
    error_page 404 /404.html;
}

# HTTPS(推荐,证书申请见第五章)
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name your-domain.com;

    ssl_certificate     /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    root /var/www/finn-site/dist;
    index index.html;

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/css text/javascript application/javascript application/json image/svg+xml;

    location /_astro/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location / {
        try_files $uri $uri/ $uri/index.html =404;
    }

    error_page 404 /404.html;
}
```

启用并重载:

```bash
sudo ln -s /etc/nginx/sites-available/finn-site /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

### 模式 B:子路径配置

保持代码 `base: '/finn-site'` 不变,Nginx 用 `alias` 映射:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # 根路径跳转到子路径(可选)
    location = / {
        return 302 /finn-site/;
    }

    # 注意:alias 末尾斜杠必须保留,否则路径拼接会错
    location /finn-site/ {
        alias /var/www/finn-site/dist/;
        try_files $uri $uri/ $uri/index.html =404;

        location ~* ^/finn-site/_astro/.+ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

---

## 四、验证

```bash
# 本机快速检查
curl -I http://localhost/                # 应返回 200
curl -s http://localhost/projects | head # 项目页 HTML 是否正常

# 检查资源加载无 404
curl -I https://your-domain.com/_astro/$(ls dist/_astro | head -1)
```

浏览器打开首页,点击导航确认各页面正常、样式加载完整。

---

## 五、HTTPS 证书(Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

自动续期由 certbot 定时任务处理,可用下面命令验证:

```bash
sudo certbot renew --dry-run
```

---

## 六、日常更新流程

本地修改内容后:

```bash
pnpm build
rsync -avz --delete dist/ root@your-server:/var/www/finn-site/
```

或接入 CI(GitHub Actions 参考 [.github/workflows/deploy.yml](.github/workflows/deploy.yml)),把部署步骤换成 rsync/scp 即可。

---

## 七、常见问题排查

| 现象 | 原因 | 解决 |
|---|---|---|
| 页面能开但样式/JS 全 404 | `base` 配置与实际访问路径不一致 | 根路径部署须 `base: '/'`;子路径部署须 `base: '/finn-site'`,重新 build |
| 刷新子页面 404 | Nginx 未命中 `$uri/index.html` 规则 | 确认 `try_files $uri $uri/ $uri/index.html =404;` 存在 |
| 子路径 alias 报 404 | `alias` 结尾少了 `/` | 写成 `alias /var/www/finn-site/dist/;` |
| 内容更新了但页面没变 | 浏览器缓存 HTML 或 Nginx 缓存 | Ctrl+F5 强刷;确认只有 `/_astro/` 走长缓存 |
| sitemap 里还是旧域名 | `site` 字段未随域名修改 | 改 [astro.config.mjs](astro.config.mjs) 后重新 build |
| 权限 403 | Nginx 用户无文件读权限 | `chown -R www-data:www-data /var/www/finn-site` |
