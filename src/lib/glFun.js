export default {
    initWebSocket(path, fn) {
        let open = () => {
            console.log("socket连接成功");
        };
        let error = () => {
            console.log("连接错误");
        };
        let getMessage = fn;
        let close = () => {
            console.log("socket已经关闭");
        };
        if (typeof WebSocket === "undefined") {
            alert("您的浏览器不支持socket");
        } else {
            let socket = "";
            // 实例化socket
            socket = new WebSocket(path);
            // 监听socket连接
            socket.onopen = open;
            // 监听socket错误信息
            socket.onerror = error;
            // 监听socket消息
            socket.onmessage = getMessage;
            socket.onclose = close;
            return socket;
        }
    },
    // 13位时间戳转换年月日时分秒
    formatDate(timeStamp) {
        timeStamp = Number(timeStamp);
        let year = new Date(timeStamp).getFullYear();
        let month =
            new Date(timeStamp).getMonth() + 1 < 10 ?
            "0" + (new Date(timeStamp).getMonth() + 1) :
            new Date(timeStamp).getMonth() + 1;
        let date =
            new Date(timeStamp).getDate() < 10 ?
            "0" + new Date(timeStamp).getDate() :
            new Date(timeStamp).getDate();
        let hh =
            new Date(timeStamp).getHours() < 10 ?
            "0" + new Date(timeStamp).getHours() :
            new Date(timeStamp).getHours();
        let mm =
            new Date(timeStamp).getMinutes() < 10 ?
            "0" + new Date(timeStamp).getMinutes() :
            new Date(timeStamp).getMinutes();
        let ss =
            new Date(timeStamp).getSeconds() < 10 ?
            "0" + new Date(timeStamp).getSeconds() :
            new Date(timeStamp).getSeconds();
        let nowTime =
            year + "-" + month + "-" + date + " " + hh + ":" + mm + ":" + ss;
        return nowTime;
    },
    // 当前时间转换第几周
    getWeekOfYear() {
        let today = new Date();
        let firstDay = new Date(today.getFullYear(), 0, 1);
        let dayOfWeek = firstDay.getDay();
        let spendDay = 1;
        if (dayOfWeek != 0) {
            spendDay = 7 - dayOfWeek + 1;
        }
        firstDay = new Date(today.getFullYear(), 0, 1 + spendDay);
        let d = Math.ceil((today.valueOf() - firstDay.valueOf()) / 86400000);
        let result = Math.ceil(d / 7);
        return result + 1;
    },
    // 当前时间转换周几
    getCurrentDate() {
        let today = new Date();
        let days = today.getDay();
        switch (days) {
            case 1:
                days = '星期一';
                break;
            case 2:
                days = '星期二';
                break;
            case 3:
                days = '星期三';
                break;
            case 4:
                days = '星期四';
                break;
            case 5:
                days = '星期五';
                break;
            case 6:
                days = '星期六';
                break;
            case 0:
                days = '星期日';
                break;
        }
        let str = days;
        return str;
    }
}