$(".thumbnail_box").off().on({
  mouseover: function () {
    // 大图遮罩显示、放大镜显示
    $(".thumbnail_mask").css("display","block");
    $(".original_box").css("display","block");
  },
  mouseout: function () {
    // 大图遮罩隐藏、放大镜隐藏
    $(".thumbnail_mask").css("display","none");
    $(".original_box").css("display","none");
  },
  mousemove: function (e) {
    // 得到商品相对于页面的横坐标、纵坐标
    var imgX=$(".thumbnail_box").offset().left;
    var imgY=$(".thumbnail_box").offset().top;
    // 得到鼠标相对于商品大图的横坐标、纵坐标
    var cursorX=e.pageX-imgX;
    var cursorY=e.pageY-imgY;
    //得到遮罩层的坐标，100是遮罩层边长的一半
    var maskX=(cursorX-100)+"px";
    var maskY=(cursorY-100)+"px";
    //保证遮罩层是完整的，遮罩的宽度加上遮罩一半的宽度
    if (cursorX<100) {
        maskX="0px";
    }else if (cursorX>300) {
        maskX="200px";
    }
    if (cursorY<100) {
        maskY="0px";
    }else if (cursorY>300) {
        maskY="200px";
    }
    //计算得到放大镜中图片的显示位置 小图移动的距离/小图最大移动距离 = 大图移动的距离/大图最大移动距离
    var maginfyX= -parseInt(maskX)*2+"px";
    var maginfyY= -parseInt(maskY)*2+"px";
    //设置遮罩层的位置
    $(".thumbnail_mask").css({
        left: maskX,
        top: maskY
    });
    //设置放大镜中图片的位置
    $(".original_box img").css({
        left: maginfyX,
        top: maginfyY
    });
  }
});
