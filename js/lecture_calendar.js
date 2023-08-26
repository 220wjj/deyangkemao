//日历控件构造函数
function Calendar() {
	this.initialize.apply(this, arguments)
}
Calendar.prototype = {
	constructor: Calendar,
	//初始化
	initialize: function(config) {
		config = config || {};
		//日历对象列表
		this.aCal = [],
		//插入指定位置
		this.insertBefore = typeof config.insertBefore === "object" ? config.insertBefore : document.getElementById(config.insertBefore);
		//日历id
		this.id = config.id || "C_" + (+new Date());
		//日历内容容器
		this.container = document.createElement("div");
		this.container.id = this.id;			
		//关闭按钮
		this.oClose = document.createElement("span");
		this.oClose.className = "cal-close";
		//左按钮
		this.oPrev = document.createElement("span");
		this.oPrev.className = "cal-prev";
		this.oPrev.innerHTML = "&lt;&lt;";
		//右按钮
		this.oNext = document.createElement("span");
		this.oNext.className = "cal-next";
		this.oNext.innerHTML = "&gt;&gt;";
		//是否显示功能按钮
		this.bShowBtn = config.showBtn;
		//是否特殊显示节假日
		this.holiday = true;
		//日历个数
		this.count = config.count || 1;
		//指定年份
		this.Year = config.year || new Date().getFullYear();
		//指定月份
		this.Month = config.month || new Date().getMonth() + 1;
		//选择的日期
		this.selectDay = config.selectDay;
		//当天回调函数
		this.onToday = config.onToday || function() {};
		//日历创建完毕回调函数
		this.onComplete = config.onComplete || function() {};
		//选择日期回调函数
		this.onSelectDay = config.onSelectDay || function() {};
		//今天
		this.today = new Date().getFullYear() + "-" + this.format(new Date().getMonth() + 1) + "-" + this.format(new Date().getDate());
		//配置功能按钮
		this.setBtn(this.bShowBtn);
		//添加事件
		this.addEvent();
	},
	//创建日历算法
	_Draw: function(iYear, iMonth) {
		var oContainer = document.createElement("div"),
			oDl = document.createElement("dl"),
			oDd = document.createElement("dd"),
			oFrag = document.createDocumentFragment(),
			//计算当月第一天是星期几
			firstDay = new Date(iYear, iMonth - 1, 1).getDay(),
			//计算当月有多少天
			lastDay = new Date(iYear, iMonth, 0).getDate(),
			//日历头
			aTmp = [
				"<dt class=\"date\">"+ iYear + "年" + iMonth +"月</dt>",
				"<dt><strong>日</strong></dt>",
				"<dt><strong>一</strong></dt>",
				"<dt><strong>二</strong></dt>",
				"<dt><strong>三</strong></dt>",
				"<dt><strong>四</strong></dt>",
				"<dt><strong>五</strong></dt>",
				"<dt><strong>六</strong></dt>"		
			],
			arr = [],
			cur, oA, i, len, sValue, classIndex;
		//-------------------------------------------------------------
		for(i = 1; i <= firstDay; i++) arr.push(0);
		for(i = 1; i <= lastDay; i++) arr.push(i);
		while(arr.length) {
			for(i = 1, len = arr.length; i <= len; i++) {
				if(arr.length) {
					oA = document.createElement("a");					
					sValue = arr.shift();
					if(!sValue) {			
						oA.innerHTML = "&nbsp;";
						oA.className = "disabled";	
					}
					else {
						oA["data-date"] = iYear + "-" + this.format(iMonth) + "-" + this.format(sValue);
						oA["data-week"] = this.getWeek(oA["data-date"]);
						oA.href = "javascript:;";
						oA.innerHTML = sValue;
						cur = new Date(iYear, iMonth - 1, sValue);
						//屏蔽今天以前的日期选择
						//parseInt(oA["data-date"].replace(/-/g, "")) < parseInt(this.today.replace(/-/g, "")) && (oA.className = "disabled");
						//节假日处理
						if(this.holiday) for(var className in this.dayName) this.isHoliday(oA, className)						
					}	
				}
				oFrag.appendChild(oA)
			}
		}
		//插入相关元素
		oDd.appendChild(oFrag);			
		oDl.innerHTML = aTmp.join("");
		oDl.appendChild(oDd);
		oContainer.className = "cal-container";
		oContainer.appendChild(oDl);
		//记录日历队列
		this.aCal.push(oContainer);
		//返回生成好的日历
		return oContainer
	},
	//创建日历
	create: function() {
		var year = this.Year,
			month = this.Month,
			i = 0;
		//----------------------------------------------------------------
		this.container.className = "calendar"; //※指定日历控件className
		//清空日历队列
		while(this.aCal[0]) this.container.removeChild(this.aCal.shift());
		//批量生成日历
		for(i = 0; i < this.count; i++) {
			year += (month + (i ? 1 : 0)) > 12 ? 1 : 0;
			month = (month + (i ? 1 : 0)) % 12 || 12;
			this.container.appendChild(this._Draw(year, month))
		}
		//将日历插入页面, 如果未指定插入位置则插入BODY
		(this.insertBefore ? this.insertBefore.parentNode : document.body).insertBefore(this.container, this.insertBefore);
		//日历生成完毕的回调方法
		this.onComplete();
		return this
	},
	//根据日期创建日历
	Draw: function(date) {
		this.Year = date.getFullYear();
		this.Month = date.getMonth() + 1;
		//重新创建日历
		this.create()
	},
	//当前月
	NowMonth: function() {
		this.Draw(new Date())
	},
	//下月
	NextMonth: function() {
		this.Draw(new Date(this.Year, this.Month + (this.count - 1), 1))	
	},
	//上月
	PrevMonth: function() {
		this.Draw(new Date(this.Year, this.Month - (this.count + 1), 1))	
	},
	//计算是否为节假日
	isHoliday: function(obj, className) {
		if(new RegExp(obj["data-date"]).test(this.Holidays()[className].join())) {
			obj.className = className;
			obj["data-week"] = this.dayName[className];
			obj.innerHTML = "<span>"+ obj.innerHTML +"</span>"
		}
	},
	//格式化数字, 不足两位补0
	format: function(str) {
		return str.toString().replace(/^(\d)$/, "0$1")
	},
	//显示日历
	show: function() {
		this.container.style.display = "none"
	},
	//隐藏日历
	hide: function() {
		this.container.style.display = "none"
	},
	//按钮设置(显示/隐藏)
	setBtn: function(boolean) {
		var obj = this.container;
		//如果按钮没有创建过并且设置为显示, 则创建按钮, 并添加已创建标记
		if(!this.mark && boolean) {
		
			obj.insertBefore(this.oPrev, obj.firstChild);
			obj.insertBefore(this.oNext, obj.firstChild);
			//添加已创建标记
			this.mark = true
		}
		//如果按钮已经创建过, 则设置其显示/隐藏
		this.oClose.style.display = this.oPrev.style.display = this.oNext.style.display = boolean ? "block" : "none";
	},
	//添加事件
	addEvent: function() {
		var that = this,
			obj = this.container,
			handler = null;
		//CLICK事件代理
		handler = function(e) {
			e = e || event
			var oTarget = e.target || e.srcElement;
			switch(oTarget.className) {
				case "cal-close":
					that.hide();
					break;
				case "cal-prev":
					that.PrevMonth();
					break;
				case "cal-next":
					that.NextMonth();
					break;
			}
			if(oTarget.tagName.toUpperCase() === "A" && oTarget.className != "disabled") {
				that.onSelectDay(oTarget)
			}
			if(oTarget.tagName.toUpperCase() === "SPAN" && oTarget.parentNode.tagName.toUpperCase() === "A") {
				that.onSelectDay(oTarget.parentNode)
			}
		}
		//为日历控件添加CLICK事件监听
		if(obj.addEventListener)
			obj.addEventListener("click", handler, false);
		else if(obj.attachEvent)
			obj.attachEvent("onclick", handler)
	},
	//获取指定日期是星期几 @param date string yyyy-mm-dd
	getWeek: function(date) {
		var aWeek = ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d"],
			arr = date.split(/-/g);
		return "\u661f\u671f" + aWeek[new Date(arr[0], arr[1] - 1, arr[2]).getDay()]
	},
	//节假日名字
	dayName: {
		"today":"\u4eca\u5929"
	},
	//2012——2020年节假日数据
	Holidays: function(){
		return {
			today: [this.today]
		}
	}
};

//控件应用实例
//公用方法
var _ = {
	$: function(id) {
		return typeof id === "object" ? id : document.getElementById(id)
	},
	$$: function(tagName, oParent) {
		return (oParent || document).getElementsByTagName(tagName)
	},	
	hasClass: function(element, className) {
		return new RegExp("(^|\\s)" + className + "(\\s|$)").test(element.className)
	},
	addClass: function(element, className) {
		var arr = element.className.split(/\s+/);	
		this.hasClass(element, className) || arr.push(className);
		element.className = arr.join(" ").replace(/(^\s*)|(\s*$)/, "")
	},
	removeClass: function(element, className) {
		element.className = element.className.replace(new RegExp("(^|\\s)" + className + "(\\s|$)", "g"), "").split(/\s+/).join(" ")	
	}
},
//获取按钮
aInput = _.$$("input"),
//创建一个日历实例
oCalendar = new Calendar({
	count:1,					//显示日历个数
	showBtn: !0,				//显示功能按钮
	onSelectDay: fnSelectDay,	//选择日期回函函数
	insertBefore: "columnDivContent1"	//将日历插入到id为copyright元素前, 如果设置此项, 默认插入BODY
});
//将日历插入页面
oCalendar.create();
//回调函数
function fnSelectDay(obj) {
	var aA = oCalendar.container.getElementsByTagName("a"),
		len = aA.length;
	for(;len--;) _.removeClass(aA[len].children[0] ? aA[len].children[0] : aA[len], "selected");
	_.addClass(obj.children[0] ? obj.children[0] : obj, "selected");
	//alert(obj["data-date"])
	queryLectureByDate(obj);
};
//INPUT事件代理
document.onclick = function(e) {
	e = e || event;
	var oTarget = e.target || e.srcElement;
	if(oTarget.tagName.toUpperCase() == "BUTTON") {
		switch(oTarget.innerHTML) {
			case "\u663e\u793a\u529f\u80fd\u6309\u94ae":
				oCalendar.setBtn(true);
				oTarget.innerHTML = "\u9690\u85cf\u529f\u80fd\u6309\u94ae";
				break;
			case "\u9690\u85cf\u529f\u80fd\u6309\u94ae":
				oCalendar.setBtn(false);
				oTarget.innerHTML = "\u663e\u793a\u529f\u80fd\u6309\u94ae";
				break;	
			case "\u663e\u793a\u65e5\u5386":
				oCalendar.show();
				oTarget.innerHTML = "\u9690\u85cf\u65e5\u5386";
				break;
			case "\u9690\u85cf\u65e5\u5386":
				oCalendar.hide();
				oTarget.innerHTML = "\u663e\u793a\u65e5\u5386"
				break;
			case "\u8282\u5047\u65e5\u7279\u6b8a\u663e\u793a":
				oCalendar.holiday = !0;
				oCalendar.Draw(new Date);
				oTarget.innerHTML = "\u8282\u5047\u65e5\u6b63\u5e38\u663e\u793a"
				break;
			case "\u8282\u5047\u65e5\u6b63\u5e38\u663e\u793a":
				oCalendar.holiday = !1;
				oCalendar.Draw(new Date);
				oTarget.innerHTML = "\u8282\u5047\u65e5\u7279\u6b8a\u663e\u793a"
				break;
			case "\u786e\u5b9a":
				var count = _.$("Cal_Count");					
				if(/^[^1-5]$/.test(count.value || 0)) {
					count.select();
					alert("\u9519\u8bef\u63d0\u793a\uff1a\n\n\u53ea\u80fd\u8f93\u5165\u6570\u5b57[1-5]")
				}
				else {
					oCalendar.count = parseInt(count.value);
					oCalendar.Draw(new Date())
				}
				break;
		}	
	}		
};