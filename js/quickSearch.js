/**
 * Created by Joe.Wu on 2016/10/30 0030.
 */

function QuickSearch(ele, eleContainer) {

    var search = {
        'baidu': {
            url: 'https://www.baidu.com/s?wd={{keyword}}',
            text: '百度搜索'
        },
        'google': {
            url: 'https://www.google.com/#q={{keyword}}',
            text: '谷歌搜索'
        },
        'taobao': {
            url: 'https://s.taobao.com/search?q={{keyword}}',
            text: '淘宝搜索'
        },
    }
    ele = ele || getEle();
    eleContainer = eleContainer || document;
    var btnEle = ele.getElementsByTagName('button'), startX, endX;

    function appendEle() {
        var div = document.createElement('div');
        div.setAttribute('id', 'quickSearch');

        for (var key in search) {
            var btn = document.createElement('button');
            btn.setAttribute('target', key);
            btn.textContent = search[key].text;
            btn.className = 'quickSearchBtn';
            div.appendChild(btn);
        }

        document.body.appendChild(div);
        return div;
    }

    function getEle() {
        return appendEle();
    }

    function funGetSelectTxt() {
        var txt = "";
        if (document.selection) {
            txt = document.selection.createRange().text;	// IE
        } else {
            txt = document.getSelection();
        }
        return txt.toString();
    };
    eleContainer.onmousedown = function (e) {
        startX = e.clientX;
    }
    eleContainer.onmouseup = function (e) {
        e = e || window.event;
        endX = e.clientX;
        if (Math.abs(endX - startX) < 3) {
            ele.style.visibility = "hidden";
            return;
        }
        if (e.target.className == 'quickSearchBtn') {
            return;
        }
        var txt = funGetSelectTxt(),
            left = (e.clientX + 85 > document.documentElement.clientWidth) ? e.clientX - 85 : e.clientX + 20,
            top = (e.clientY + ele.offsetHeight / 2 > document.documentElement.clientHeight) ? e.clientY - ele.offsetHeight : (e.clientY - ele.offsetHeight / 2 < 0) ? e.clientY : e.clientY - ele.offsetHeight / 2;
        if (txt) {
            ele.style.visibility = "visible";
            ele.style.left = left + "px";
            ele.style.top = top + "px";
        } else {
            ele.style.visibility = "hidden";
        }
    };
    for (var i = 0; i < btnEle.length; i++) {
        var btn = btnEle[i];
        btn.addEventListener('click', function (e) {
            var keyword = funGetSelectTxt();
            var url = search[e.target.getAttribute('target')].url.replace(/{{keyword}}/, keyword);
            window.open(url, '_blank');
        }, false);
    }
};

QuickSearch();
