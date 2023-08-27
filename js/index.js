  // 党建工作swiper
  var educationswiper = new Swiper("#educationSwiper", {
    slidesPerView:3,
    spaceBetween: 13,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        
    },

    speed: 800,
    autoplay: {
        delay: 1000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
    },
});
  
  // 首页顶部背景Swiper
  var swiperBanner = new Swiper('.main-banner', {
    navigation: {
        nextEl: '.main-banner .swiper-button-next',
        prevEl: '.main-banner .swiper-button-prev',
    },
    pagination: {
        el: '.main-banner .swiper-pagination',
        clickable: true
    },
    loop: true,
    speed: 800,
    autoplay:false
    // autoplay: {
    //     delay: 5000,
    //     stopOnLastSlide: false,
    //     disableOnInteraction: false,
    // },
});

// 特色培养Swiper
var slideHat = new Swiper(".slide-t", {
    lazy: true,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    spaceBetween: 10,
    speed: 100,
    noSwiping: true,
    noSwipingClass: 'no-swi',
});

var slideHaps = new Swiper(".slide-ps", {
    lazy: true,
    spaceBetween: 8,
    slidesPerView: 8,
    speed: 500,
    watchSlidesProgress: true,
    breakpoints: {
        1940: {
            slidesPerView: 4.4,
        }
    },

});
var slideHap = new Swiper('.slide-p', {
    lazy: true,
    speed: 500,
    spaceBetween: 5,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    watchSlidesProgress: true,
    navigation: {
        nextEl: '.homea .next',
        prevEl: '.homea .prev',
    },
    // autoplay: false,
    autoplay: {
        delay: 2000,
        stopOnLastSlide: false,
        disableOnInteraction: false
    },
    thumbs: {
        swiper: slideHaps,
        autoScrollOffset: 1,
    },
})
slideHap.controller.control = slideHat;

// 专业布局Swiper
var slideHb = new Swiper('#majorSwiper', {
    lazy: true,
    speed: 1000,
    watchOverflow: true,
    loop: true, 
    spaceBetween: 0,
    slidesPerView: 4,
    // slidesPerGroup: 2,
    breakpoints: {
        480: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 0
        },
        580: {
            slidesPerView: 3,
            //slidesPerGroup:3,
            spaceBetween: 0
        },
        980: {
            slidesPerView: 4,
            // slidesPerGroup: 4,
            spaceBetween: 0
        },
        1280: {
            slidesPerView: 4,
            //slidesPerGroup: 4,
            spaceBetween: 0
        },

    },
    // autoplay: false,
    autoplay: {
        delay: 1000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".pagHb",
        clickable: !0,
    },
    navigation: {
        nextEl: '.next1',
        prevEl: '.prev1',
    },
    on: {
        slideChangeTransitionEnd: function () {
            // if (!isIE()) {
            //     $(".sico svg").each(function (a, b) {
            //         a = $(this).attr("id");
            //         g[a] = new Vivus(a, {
            //             type: "delayed",
            //             duration: 100,
            //             inViewport: true,
            //             autostart: true,
            //         })
            //     });

            // }
        }
    }
})

// 风采学院
var slideNewt = new Swiper('.slide-newst', {
    lazy: true,
    speed: 1000,
    spaceBetween: 5,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    // loop: true,
})
var slideNew = new Swiper('.slide-news', {
    lazy: true,
    speed: 1000,
    // loop: true,
    spaceBetween: 5,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    // autoplay: false,
    autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false
    },
    navigation: {
        nextEl: '.homeas .next',
        prevEl: '.homeas .prev',
    },
    pagination: {
        el: ".homeas .pgba",
        clickable: !0,
        bulletActiveClass: 'active',
        type: 'progressbar',
    },

})
slideNew.controller.control = slideNewt;
slideNewt.controller.control = slideNew;


// 报考我们
var tabC = new Swiper('.tabc', {
    lazy: true,
    speed: 600,
    //loop:true,
    //roundLengths:true,
    autoHeight: true,
    noSwiping: true,
    noSwipingClass: 'no-swi',
    spaceBetween: 10,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    slidesPerView: 1,
    on: {
        slideChangeTransitionEnd: function (swiper) {
            //动态移除id
            setTimeout(function () {
                $(".tabc .swiper-slide-active video").attr("id", "");
            }, 10);
        },
    }
});



// 报考我们
const accordionItems = document.querySelectorAll('.accordion-item');
const contentItems = document.querySelectorAll('.content-item');
accordionItems.forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
        accordionItems.forEach((accItem) => accItem.classList.remove("active"));
        contentItems.forEach(content => content.classList.remove('active'));
        // contentItems[index].classList.add('active');
        // 添加鼠标移入的Li和对应内容的高亮样式
        item.classList.add("active");
        contentItems[index].classList.add("active");
    });
});
// 默认选中第一个选项
accordionItems[0].classList.add("active");
contentItems[0].classList.add("active");


// 风采学院
(function () {

    var slideMenu = function () {
        var sp, st, t, m, sa, l, w, gw, ot;
        return {
            destruct: function () {
                if (m) {
                    clearInterval(m.htimer);
                    clearInterval(m.timer);
                }
            },
            build: function (sm, sw, mt, s, sl, h) {
                sp = s;
                st = sw;
                t = mt;
                m = document.getElementById(sm);
                sa = m.getElementsByTagName('li');
                l = sa.length;
                w = m.offsetWidth;
                gw = w / l;
                ot = Math.floor((w - st) / (l - 1));
                var i = 0;
                for (i; i < l; i++) {
                    s = sa[i];
                    s.style.width = gw + 'px';
                    this.timer(s)
                }
                if (sl != null) {
                    m.timer = setInterval(function () {
                        slideMenu.slide(sa[sl - 1])
                    }, t)
                }
            },
            timer: function (s) {
                s.onmouseover = function () {
                    clearInterval(m.htimer);
                    clearInterval(m.timer);
                    m.timer = setInterval(function () {
                        slideMenu.slide(s)
                    }, t);
                    $(this).addClass('active');
                    $(this).siblings().removeClass('active');

                }
                s.onmouseout = function () {


                }
            },
            slide: function (s, c) {
                var cw = parseInt(s.style.width);
                if ((cw < st && !c) || (cw > gw && c)) {
                    var owt = 0;
                    var i = 0;
                    for (i; i < l; i++) {
                        if (sa[i] != s) {
                            var o, ow;
                            var oi = 0;
                            o = sa[i];
                            ow = parseInt(o.style.width);
                            if (ow < gw && c) {
                                oi = Math.floor((gw - ow) / sp);
                                oi = (oi > 0) ? oi : 1;
                                o.style.width = (ow + oi) + 'px';
                                //console.log(o);
                                //console.log(o.style.width);
                            } else if (ow > ot && !c) {
                                oi = Math.floor((ow - ot) / sp);
                                oi = (oi > 0) ? oi : 1;
                                o.style.width = (ow - oi - 1) + 'px';
                                //console.log(o);
                                //console.log(o.style.width);
                            }
                            if (c) {
                                owt = owt + (ow + oi)
                            } else {
                                owt = owt + (ow - oi)
                            }
                        }
                    }
                    s.style.width = (w - owt) + 'px';
                } else {
                    if (m.htimer)
                        clearInterval(m.htimer)
                    if (m.timer)
                        clearInterval(m.timer);
                }
            }
        };
    }();
    if ($(window).width() > 980) {
        slideMenu.build('sm', 595, 10, 10, 1);
    }

})();