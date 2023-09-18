// ==UserScript==
// @name         xunfeizhizuo-音频
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  获取讯飞配音的音频
// @author       luoruofeng
// @match        https://www.xfzhizuo.cn/make
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
    // 定义定时检查间隔（单位：毫秒）
    const interval = 5000; // 5秒

    // 初始化序列号
    let serialNumber = 1;

    // 监视Ajax请求
    (function() {
        const open = window.XMLHttpRequest.prototype.open;
        window.XMLHttpRequest.prototype.open = function() {
            this.addEventListener('load', function() {
                if (this.readyState === 4 && this.status === 200) {
                    const contentType = this.getResponseHeader('Content-Type');
                    if (contentType === 'audio/mpeg') {
                        // 下载MP3文件并重命名
                        const filename = `mp3_${serialNumber}.mp3`;
                        const blob = this.response;

                        const audioBlob = new Blob([blob], { type: 'audio/mpeg' });

                        // 创建一个下载链接并触发点击以下载文件
                        const link = document.createElement('a');
                        link.href = URL.createObjectURL(audioBlob);
                        link.download = filename; // 设置文件名
                        link.style.display = 'none';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);

                        // 增加序列号
                        serialNumber++;
                    }
                }
            });
            open.apply(this, arguments);
        };
    })();

    // 开始定时检查
    setInterval(() => {
        // 在这里可以执行其他操作，例如定时检查
    }, interval);
})();
