/**
 * by 逝风无言 2018/8/18
 * @param {Object} parentDiv 父块的索引
 * @param {Object} childDiv 子块的索引
 * @param {Object} onePageNumber 每页的数量
 */
function Jpage(parentDiv,childDiv,onePageNumber){
	var t=this;
	this.onePageNumber=onePageNumber;//每页显示个数
	this.currentPage=1;//初始当前页数为0
	this.parentDiv=$(parentDiv);
	this.childDiv=$(childDiv);
	//子块数量
	this.sumNumber=function(){
		return this.parentDiv.find(childDiv).length;
	};
	this.pageNumber=Math.ceil(this.sumNumber()/onePageNumber);//页数
	//下一页
	this.nextPage=function(){
		if(this.currentPage==this.pageNumber){
			this.currentPage=1;
		}else{
			this.currentPage++;
		}
		this.showCurrentPage();
	}
	//上一页
	this.prePage=function(){
		if(this.currentPage==1){
			this.currentPage=this.pageNumber;
		}else{
			this.currentPage--;
		}
		this.showCurrentPage();
	}
	//首页
	this.firstPage=function(){
		this.currentPage=1;
		this.showCurrentPage();
	}
	//尾页
	this.endPage=function(){
		this.currentPage=this.pageNumber;
		this.showCurrentPage();
	}
	//跳转页面
	this.goPage=function(pageNum){
		if(pageNum<=0){
			this.currentPage=1;
		}else if(pageNum>this.pageNumber){
			this.currentPage=this.pageNumber;
		}else{
			this.currentPage=pageNum;
		}
//		console.log(this.currentPage)
		this.showCurrentPage();
		
	}
	//下面的的数字按钮装饰
	this.decoratePage=function(){
		$(".bottomButton .numPage span").css({
			"border":"1px solid gray",
			"border-radius":"3px",
			"padding":"2px 8px 2px 8px",
			"color":"black",
			"margin":"0px 3px 0px 3px",
			"cursor":"pointer",
			"font-size":"1rem"
		}).click(function(){
			
			t.goPage(parseInt($(this).text()));
		});
		$(".bottomButton .numPage .currentPage").css({
			"background-color":"lightseagreen",
			"border":"1px solid lightseagreen",
			"color":"white"
		});
	}
	//为下面几个按钮添加样式
	this.decorateOther=function(){
		$(".bottomButton .first").click(function(){
		t.firstPage();
	}).css({
		"font-size":"1rem",
		"display":"inline-block",
		"padding":"2px",
		"border":"1px solid gray",
		"border-radius":"8px",
		"cursor":"pointer",
		"font-family":"STfangsong",
		"font-weight":"600"
	}).mouseover(function(){
		$(this).css({
			"border":"1px solid lightseagreen",
			"color":"lightseagreen"
		});
	}).mouseout(function(){
		$(this).css({
			"border":"1px solid gray",
			"color":"black"
		});
	});
	$(".bottomButton .end").click(function(){
		t.endPage();
	}).css({
		"font-size":"1rem",
		"display":"inline-block",
		"padding":"2px",
		"border":"1px solid gray",
		"border-radius":"8px",
		"cursor":"pointer",
		"font-family":"STfangsong",
		"font-weight":"600"
	}).mouseover(function(){
		$(this).css({
			"border":"1px solid lightseagreen",
			"color":"lightseagreen"
		});
	}).mouseout(function(){
		$(this).css({
			"border":"1px solid gray",
			"color":"black"
		});
	});
	$(".bottomButton .pre").click(function(){
		t.prePage();
	}).css({
		"font-size":"1rem",
		"display":"inline-block",
		"padding":"2px",
		"border":"1px solid gray",
		"border-radius":"8px",
		"cursor":"pointer",
		"font-family":"STfangsong",
		"font-weight":"600"
	}).mouseover(function(){
		$(this).css({
			"border":"1px solid lightseagreen",
			"color":"lightseagreen"
		});
	}).mouseout(function(){
		$(this).css({
			"border":"1px solid gray",
			"color":"black"
		});
	});
	$(".bottomButton a").css({
		"margin":"5px 5px 0 5px"
	});
	$(".bottomButton .next").click(function(){
		t.nextPage();
	}).css({
		"font-size":"1rem",
		"display":"inline-block",
		"padding":"2px",
		"border":"1px solid gray",
		"border-radius":"8px",
		"cursor":"pointer",
		"font-family":"STfangsong",
		"font-weight":"600"
	}).mouseover(function(){
		$(this).css({
			"border":"1px solid lightseagreen",
			"color":"lightseagreen"
		});
	}).mouseout(function(){
		$(this).css({
			"border":"1px solid gray",
			"color":"black"
		});
	});
	}
	//创建布局
	this.createPage=function(){
		if(!this.parentDiv||this.parentDiv.text()==""){
			alert("父块不存在！")
			return ;
		}else{
			if(!this.parentDiv.find(childDiv)||this.parentDiv.find(childDiv).text()==""){
				alert("子块不存在！");
				return ;
			}
		}
		this.showCurrentPage();
		this.decoratePage();
		this.decorateOther();
	}
	//显示当前页面
	this.showCurrentPage=function(){
//		console.log("执行");
		if(this.currentPage<=0){
			this.currentPage=1;
		}
		var start=(this.currentPage-1)*this.onePageNumber;//开始索引位置，不用减一
		this.showChildDiv(start);//调用函数显示子块
		this.addButton();
	}
	//显示当前页面的块
	this.showChildDiv=function(start){
		this.parentDiv.find(childDiv).hide();
		for(var i=start;i<this.parentDiv.find(childDiv).length&&i< parseInt(start)+this.onePageNumber;i++){
			this.parentDiv.find(childDiv).eq(i).show();
		}
	}
	//添加下方上一页下一页的button
	this.addButton=function(){
		var str="";
		var strBtn="";
		if(this.pageNumber<5||this.currentPage<=3){//总页数小于5
			for(var i=1;i<=this.pageNumber&&i<=5;i++){
				if(i==this.currentPage){//当前页面
					strBtn+="<span class='currentPage'>"+this.currentPage+"</span>";
				}else{
					strBtn+="<span>"+i+"</span>";
				}
			}
		}else{//总页数>=5并且当前页>3
			if(this.pageNumber-2>=this.currentPage){//能往前后数两个
				for(var j=this.currentPage-2;j<=parseInt(this.currentPage)+2;j++){
					if(j==this.currentPage){//当前页面
						strBtn+="<span class='currentPage'>"+this.currentPage+"</span>";
					}else{
						strBtn+="<span>"+j+"</span>";
					}
				}
			}else{
				for(var i=this.pageNumber-4;i<=this.pageNumber;i++){
					if(i==this.currentPage){//当前页面
						strBtn+="<span class='currentPage'>"+this.currentPage+"</span>";
					}else{
						strBtn+="<span>"+i+"</span>";
					}
				}
			}
		}
		//处理一下当前页面两端的页数
		if(!$(".bottomButton")||$(".bottomButton").text()==""){
			str="<div class='bottomButton' ><a>共 "+this.pageNumber+" 页</a><a class='first'>首页</a><a class='pre'><<<</a> <span class='numPage'>"
			+strBtn+" </span> <a class='next'>>>></a><a class='end'>尾页</a></div>";
			this.parentDiv.after(str);
		}
		else{
			$(".bottomButton .numPage").html(strBtn);
		}
		this.decoratePage();
	}
}
