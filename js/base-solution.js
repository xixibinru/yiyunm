$('.nav ul').on('click','li',function () {
    $(this).addClass('current').siblings().removeClass('current');
});
