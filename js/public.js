AOS.init({   
  disable: 'mobile' //禁止在小屏幕设备中使用
});


$(window).scroll(function(){  
var scrollPos=$(window).scrollTop();  
if(scrollPos >0){  
$("body").addClass("scrolling"); 


}else{  
$("body").removeClass("scrolling");  
}  
}); 
$(function(){
var scrollPos=$(window).scrollTop();  
if(scrollPos >0){  
$("body").addClass("scrolling");  
}else{  
$("body").removeClass("scrolling");  
}   
})
$(window).scroll(function(){  
var scrollPos1=$(window).scrollTop();  
if(scrollPos1 >10){  
$(".headerAd").slideUp();
$(".tCimg").fadeOut();
$(".header").removeClass('headerIn');
}
}); 

$(".head-menu-btn").click(function(){
$('html').toggleClass('drawerMenu-open');
$('body').toggleClass('fixdbody');
$('.mobNav').slideToggle();
})

$(".navp").each(function(){
  $(this).click(function(){
       $(this).parent().siblings().find('.subNavm').slideUp();
     $(this).parent().siblings().removeClass('on');
    $(this).parent().toggleClass('on');
    $(this).next().slideToggle();

  })
})

$('.toSearch').click(function(){
$(".cd-popup").addClass('is-visible')
});
$('.cd-popup-close').click(function(){
$(".cd-popup").removeClass('is-visible')
})  

  if(navigator.appName == "Microsoft Internet Explorer"&&parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE",""))<=9){
      //document.getElementById('browser-modal').style.display='block';
      $('body').append('<div id="browser-modal"><div class="browser-modal-cover"></div><div class="browser-content"><div class="browser-text"><h3 class="browser-text-title">请升级浏览器版本</h3><p class="browser-text-desc">你正在使用旧版本浏览器。请升级浏览器以获得更好的体验。</p></div><div class="browser-list"><div class="browser-item"><a href="https://www.google.cn/chrome/" target="_blank"><div class="iconfont iconchrome"></div><h4>Chrome</h4></a></div><div class="browser-item"><a href="http://www.firefox.com.cn/" target="_blank"><div class="iconfont iconfirefox"></div><h4>Firefox</h4></a></div><div class="browser-item"><a href="https://www.opera.com/zh-cn" target="_blank"><div class="iconfont iconopera"></div><h4>Opera</h4></a></div><div class="browser-item"><a href="https://www.microsoft.com/zh-cn/edge" target="_blank"><div class="iconfont iconEdge"></div><h4>Edge</h4></a></div></div></div></div>')
      //console.log("您的浏览器版本过低，请使用IE9以上版本");
  }

AOS.init({
	offset: 0,
	easing: 'linear',
	duration: 500,
	disable: 'mobile'
});


// 概况
$(function() {
   $(".aboutc .tabNav li:eq(0)").addClass('cur');
   $(".aboutc .tabCon .tabcons:eq(0)").show();
    $(".aboutc .tabNav li").click(function() {
       $(".aboutc .tabNav li").eq($(this).index()).addClass("cur").siblings().removeClass('cur');
        $(".aboutc .tabCon .tabcons").hide().eq($(this).index()).show();
    });
});
// 人才培养
$(function() {
   $(".rcpy .tabNav li:eq(0)").addClass('cur');
   $(".rcpy .tabCon .tabcons:eq(0)").show();
    $(".rcpy .tabNav li").hover(function() {
       $(".rcpy .tabNav li").eq($(this).index()).addClass("cur").siblings().removeClass('cur');
        $(".rcpy .tabCon .tabcons").hide().eq($(this).index()).show();
    });
});
//学术活动
if($(window).width()<=980){
 $(".slidefilter dt").click(function(){
  $(this).next('dd').slideToggle();
  $(this).find('i').toggleClass('on');
  $(this).parent().siblings('.slidefilter').find('dd').slideUp();
  $(this).parent().siblings('.slidefilter').find('i').removeClass('on');
 })
}


// 校园生活
$(function() {
   $(".xysh4 .tabNav li:eq(0)").addClass('cur');
    $(".xysh4 .tabNav li").hover(function() {
       $(".xysh4 .tabNav li").eq($(this).index()).addClass("cur").siblings().removeClass('cur');
    });
});
// 科学研究
$(function() {
   $(".kxyj2 .tabNav li:eq(0)").addClass('cur');
   $(".kxyj2 .tabCon .tabcons:eq(0)").show();
    $(".kxyj2 .tabNav li").click(function() {
       $(".kxyj2 .tabNav li").eq($(this).index()).addClass("cur").siblings().removeClass('cur');
        $(".kxyj2 .tabCon .tabcons").hide().eq($(this).index()).show();
    });
});