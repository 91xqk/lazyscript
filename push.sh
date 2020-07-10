#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

#git init
git add .
git commit -m $1

#git remote add origin https://github.com/91xqk/lazyscript.git

git push -f origin master

cd -