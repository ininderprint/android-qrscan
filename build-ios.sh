echo "开始打包bundle"
npm run bundle-ios
echo "打包bundle完成"
# 复制webapp资源文件
# cp -R ./src/static/webapp ./ios/bundle/assets/src/static
echo "开始打包ipa"
cd ./ios/fastlane
fastlane beta
echo "打包成功"
#####开始上传，如果只需要打ipa包出来不需要上传，可以删除下面的代码
export LANG=en_US;
export LC_ALL=en_US;
echo "正在上传到fir.im...."
#####http://fir.im/api/v2/app/appID?token=APIToken，里面的appID是你要上传应用的appID，APIToken是你fir上的APIToken
fir p "./app.ipa"
changelog=`无`
curl -X PUT --data "changelog=$changelog" http://fir.im/api/v2/app/5b49ee0f548b7a2f0e7d65d9?token=2f4e8b59e1e5afa178924089afb90351
echo "\n上传更新成功！"