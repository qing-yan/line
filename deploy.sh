#!/usr/bin/env sh
# 使用方式：在当前目录下，直接运行此文件，指令：.\deploy.sh
# 或：bash .\deploy.sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd src/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:qing-yan/line.git master:gh-pages
#https://github.com/qing-yan/line.git

cd -