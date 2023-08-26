document.addEventListener("DOMContentLoaded", function () {
     // 分页 鼠标悬停时高亮显示
  $(".page-link").hover(
    function() {
      $(".page-link").removeClass("hover");
      if (!$(this).hasClass("active")) {
        $(this).addClass("hover");
      }
    },
    function() {
      $(this).removeClass("hover");
      $(".page-link.active").addClass("hover");
    }
  );
// 右侧手风琴
  $(".accordion-item").on("click", function () {
   
    $(this).find(".zhedie").toggleClass("listtext-open")
    $(this).find(".content").toggleClass("expand-content").toggleClass("expand-active")

   

    if ($(this).find(".content").hasClass("expand-active")) {
     $(this).find(".radius-icon").css("border-color","#fff")
      $(this).css({
        "background":"linear-gradient(90deg, #0468C2 0%, #378FD6 100%)","color":"#fff","marginBottom":"0"
      })
      
    } else {
      $(this).css({
        "background": "#e3e3e3",
        "color": "#000",
        "marginBottom":"4px"
      })
        $(this).find(".radius-icon").css("border-color","#535353")
    }
    
    if( $(this).find(".zhedie").hasClass("listtext-open")){
     $(this).siblings().find(".zhedie").removeClass("listtext-open")
     $(this).siblings().find(".content").removeClass("expand-active")
     $(this).siblings().find(".content").removeClass("expand-content")
    

      $(this).find(".radius-icon").css("border-color","#fff")
      $(this).css({
        "background":"linear-gradient(90deg, #0468C2 0%, #378FD6 100%)","color":"#fff","marginBottom":"0"
      })
      $(this).siblings().css({
        "background": "#e3e3e3",
        "color": "#000",
        "marginBottom":"4px"
      }).find(".radius-icon").css("border-color","#000")
      $(this).find(".radius-icon").css("border-color","#fff")
    }
  })

  // 新闻公告
  $(".date-list-item").hover(
    function () {
      console.log(11);
      $(this).toggleClass("first-date-list-item");
      $(this).find(".item-time").toggleClass("item-time-active")
      $(this).siblings().removeClass("first-date-list-item")
       $(this).siblings().find(".item-time").removeClass("item-time-active")
    }
  )
  // 就业信息
   // 默认显示第一个导航项的内容
  var initialContentId = $(".msg-tabNav li:first-child").data("content");
  console.log(initialContentId);
  $("#" + initialContentId).show();
   // 高亮显示第一个导航项
  $(".msg-tabNav li:first-child").addClass("current");
  
   $(".msg-tabNav li").hover(
            function () {
                var contentId = $(this).data("content");
                $(".content").hide();
                $("#" + contentId).show();

                // 移除所有导航项的高亮状态
                $(".msg-tabNav li").removeClass("current");
                // 添加高亮状态到当前导航项
                $(this).addClass("current");
            },
            function () {
                // 鼠标移出时不需要做什么操作
            }
  );
  // 就业咨询
   var initialContentId = $(".consult-tabNav li:first-child").data("content");
  console.log(initialContentId);
  $("#" + initialContentId).show();
   // 高亮显示第一个导航项
  $(".consult-tabNav li:first-child").addClass("current");
  
   $(".consult-tabNav li").hover(
            function () {
                var contentId = $(this).data("content");
                $(".consult-content").hide();
       $("#" + contentId).show();
       console.log($("#" + contentId).show());
                // 移除所有导航项的高亮状态
                $(".consult-tabNav li").removeClass("current");
                // 添加高亮状态到当前导航项
                $(this).addClass("current");
            },
            function () {
                // 鼠标移出时不需要做什么操作
            }
  );
}); 