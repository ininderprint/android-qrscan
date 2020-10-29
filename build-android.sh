echo "开始打包bundle"
npm run bundle-android
echo "打包bundle完成"

echo "开始打包apk"
cd ./android
./gradlew assembleRelease
echo "打包成功"