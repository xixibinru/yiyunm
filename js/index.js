$(function () {
    // 拿到dom的高
    var arr = [0, $('#header')[0].offsetHeight, $('#company')[0].offsetHeight, $('#FAQ')[0].offsetHeight, $('#feature')[0].offsetHeight];
    var navHeight = $('#header .nav')[0].offsetHeight;
    // 拿到应该跳转的高
    function getArr(arr) {
        var newArr = [];
        var i = 0, len = arr.length;
        for (; i < len; i++) {
            var sum = 0;
            for (var j = 0; j <= i; j++) {
                sum += arr[j];
            }
            if (i !== 0) {
                sum -= navHeight; //减去导航栏的高
            }
            newArr.push(sum);
        }
        return newArr;
    }

    var navArr = getArr(arr);
    $('#header ul').on('click', 'li', function () {
        $('html,body').stop().animate({'scrollTop': navArr[$(this).index()]});
    });
    $('header .move').on('click',function () {
        $('html,body').stop().animate({'scrollTop': navArr[3]});
    })
    //滑动的时候导航栏添加样式
    $(window).on('scroll', function () {
        var scrollTop = $(window).scrollTop();
        if (scrollTop >= navArr[4] - 1) {
            $('#header .nav li').eq(4).addClass('current').siblings().removeClass('current');
        } else if (scrollTop >= navArr[3] - 1) {
            $('#header .nav li').eq(3).addClass('current').siblings().removeClass('current');
        } else if (scrollTop >= navArr[2] - 1) {
            $('#header .nav li').eq(2).addClass('current').siblings().removeClass('current');
        } else if (scrollTop >= navArr[1] - 1) {
            $('#header .nav li').eq(1).addClass('current').siblings().removeClass('current');
        } else if (scrollTop >= navArr[0] - 1) {
            $('#header .nav li').eq(0).addClass('current').siblings().removeClass('current');
        }
    });
    /*<轮播图>*/
    //轮播图添加背景图标
    $('#FAQ li i').each(function (i, e) {
        $(e).css('background', 'url(images/icon_list.png) no-repeat 0 ' + (i * 20.4) + '%/200%');
        $(e).attr('index', i);
    });
    // $(this).css('background-position-x','100%')
    //初始化margin-left值
    var $lis = $('#FAQ .slider li');
    // marginWidth为一个li距离上一个li之间的距离
    var marginWidth = 0.355 * 100;
    $lis.each(function (i, e) {
        $(e).css('margin-left', i * marginWidth + '%');
    });
    //给每个li添加属性 num 轮播图根据num判断li所在的位置
    $lis.each(function (i, e) {
        $(e).attr('num', i);
        current(e);
    });
    // 当前显示的添加class current
    function current(e) {
        if ($(e).attr('num') >= 0 && $(e).attr('num') <= 2) {
            $(e).addClass('current');
        } else {
            $(e).removeClass('current');
        }
    }

    //6张轮播图 全部播放完才执行
    var flag = 6;
    // 轮播图向左滑动一次
    function goRight(timer) {
        if (flag === 6) {
            $lis.each(function (i, e) {
                flag = 0;
                if ($(e).attr('num') < 0) {
                    $(e).attr('num', 5);
                    $(e).css('margin-left', 5 * marginWidth + '%');
                }
                $(e).attr('num', $(e).attr('num') - 1);
                current(e);
                $(e).stop().animate({'margin-left': $(e).attr('num') * marginWidth + '%'}, timer, function () {
                    flag += 1;
                });
            });
        }
    }

    // 轮播图向右滑动一次

    function goLeft(timer) {
        if (flag === 6) {
            $lis.each(function (i, e) {
                flag = 0;
                if ($(e).attr('num') > 4) {
                    $(e).attr('num', -1);
                    $(e).css('margin-left', -1 * marginWidth + '%');
                }
                $(e).attr('num', +$(e).attr('num') + 1);
                current(e);
                $(e).stop().animate({'margin-left': $(e).attr('num') * marginWidth + '%'}, timer, function () {
                    flag += 1;
                });
            });
        }
    }

    var timer = null, time = 3000;
    timer = setInterval(function () {
        goRight(500);
    }, time);
    var startTouch = 0;
    // 如果手指触摸的距离大于0.75个个li的宽度,那么li移动一个身位的距离
    var oneDistance = $('#FAQ .slider ul').width() * marginWidth / 100 * 0.75;
    $('#FAQ .slider ul').on('touchstart', 'li', function (e) {
        $(this).addClass('touch').siblings().removeClass('touch')
        $(this).children('a').children('i').css('background-position-x', '100%');
        clearInterval(timer);
        startTouch = e.originalEvent.touches[0].screenX;
    });

    $('#FAQ .slider ul').on('touchmove', 'li', function (e) {
        e.stopPropagation();
        e.preventDefault();
        var lastTouch = e.originalEvent.touches[0].screenX;
        var touchDistance = lastTouch - startTouch;
        var bodyPosition = parseInt(touchDistance / oneDistance);
        setTimeout(function () {
            if (bodyPosition >= 1) {
                goLeft(300);
                bodyPosition--;
            } else if (bodyPosition <= -1) {
                goRight(300);
                bodyPosition++;
            }
            setTimeout(arguments.callee, 350);
        }, 0);
    });
    $(document).on('touchend', function () {
        $('#FAQ .slider li').removeClass('touch');
        $('#FAQ .slider li i').css('background-position-x', '0');
        setTimeout(function () {
            clearInterval(timer);
            timer = setInterval(function () {
                goRight(500);
            }, time);
        }, 3000);
        $('#Address').css({'width':'46.377%','padding-top':'45.219%'});
    });

    // <高德地图导航>
    $('#Address').on('touchend',function (e) {
        e.stopPropagation();
        $(this).css({'width':'100%','padding-top':'90%'});
    });
    var map = new AMap.Map('Address', {
        resizeEnable: true,
        zoom:13,
        center: [120.730738,27.974167],
    });
    var marker = new AMap.Marker({
        position: [120.730738,27.974167],
        title: '红莲文创园A208',

    });
    marker.setMap(map);
    var circle = new AMap.Circle({
        center: [120.730738,27.974167],
        radius: 200,
        fillOpacity:0.2,
        strokeWeight:1,
    });
    circle.setMap(map);
    // </高德地图导航>
});

