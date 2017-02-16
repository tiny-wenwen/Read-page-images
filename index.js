$(document).ready(function(){
	web.main();
});

var web={
	main : function(){
		web.init();
		web.load();

	},
	init : function(){
		this.main_Id = $("#main");
		this.btn_Id = $("#btn");
		this.list_Api =  "http://sq.iyunmai.com/consultation/query-list.json"
	},
	load :function(){
		var list = [],param =[],pages =1,switchs=true;

		var getData=function(){
			param = {
				userId:100000007,
				messageType:20,
				rows:10,
				pages:pages
			}
			com.ajax("get",web.list_Api,param,"","",function(data){
				var len = data.result.data.length;
				if (len<10) {
					web.btn_Id.hide()
				}
				$.each(data.result.data,function(i,d){
					console.log("img"+i)
					list.push('<img src="'+d.newsSmallImgUrl+'">');

				})
				web.main_Id.html(list.join(''));
				switchs=true;
			})

		}
		getData();

		//点击后页数+1
/*		web.btn_Id.click(function(){
			pages++;
			getData()
		})*/
		$(window).scroll( function() { 
			var height = $(window).height();
			var windowScroll = $(window).scrollTop();
			var top = web.btn_Id.offset().top;
			if (!switchs) {
				return;
			}
			if (top-windowScroll<height ) {
				switchs =false;
				pages++;
				getData()
			}
		} );

	}
}