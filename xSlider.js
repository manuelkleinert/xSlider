/*#####################################################################################################################
                                                                                                              
                    PPPPPPPPPPPPPPPPP                                                                              
                    P::::::::::::::::P                                                                             
                    P::::::PPPPPP:::::P                                                                            
                    PP:::::P     P:::::P                                                                           
xxxxxxx      xxxxxxx  P::::P     P:::::Paaaaaaaaaaaaa     ggggggggg   ggggg    eeeeeeeeeeee    rrrrr   rrrrrrrrr   
 x:::::x    x:::::x   P::::P     P:::::Pa::::::::::::a   g:::::::::ggg::::g  ee::::::::::::ee  r::::rrr:::::::::r  
  x:::::x  x:::::x    P::::PPPPPP:::::P aaaaaaaaa:::::a g:::::::::::::::::g e::::::eeeee:::::eer:::::::::::::::::r 
   x:::::xx:::::x     P:::::::::::::PP           a::::ag::::::ggggg::::::gge::::::e     e:::::err::::::rrrrr::::::r
    x::::::::::x      P::::PPPPPPPPP      aaaaaaa:::::ag:::::g     g:::::g e:::::::eeeee::::::e r:::::r     r:::::r
     x::::::::x       P::::P            aa::::::::::::ag:::::g     g:::::g e:::::::::::::::::e  r:::::r     rrrrrrr
     x::::::::x       P::::P           a::::aaaa::::::ag:::::g     g:::::g e::::::eeeeeeeeeee   r:::::r            
    x::::::::::x      P::::P          a::::a    a:::::ag::::::g    g:::::g e:::::::e            r:::::r            
   x:::::xx:::::x   PP::::::PP        a::::a    a:::::ag:::::::ggggg:::::g e::::::::e           r:::::r            
  x:::::x  x:::::x  P::::::::P        a:::::aaaa::::::a g::::::::::::::::g  e::::::::eeeeeeee   r:::::r            
 x:::::x    x:::::x P::::::::P         a::::::::::aa:::a gg::::::::::::::g   ee:::::::::::::e   r:::::r            
xxxxxxx      xxxxxxxPPPPPPPPPP          aaaaaaaaaa  aaaa   gggggggg::::::g     eeeeeeeeeeeeee   rrrrrrr            
                                                                   g:::::g                                         
                                                       gggggg      g:::::g                                         
                                                       g:::::gg   gg:::::g                                         
                                                        g::::::ggg:::::::g                                         
                                                         gg:::::::::::::g                                          
                                                           ggg::::::ggg                                            
                                                              gggggg
															  
© xPager - xSlider - Manuel Kleinert - www.xpager.ch - info(at)xpager.ch - v 2.1.4 - 16.11.2015
#####################################################################################################################*/

(function($){
	$.fn.xSlider = function(options){
		if(!options){var options = {};}
		return this.each(function() {
			options.obj = this;
			new xSlider(options);
		});
	}
}(jQuery));

var xSlider = function(options,fx){
	this.options = $.extend({
		id:false,
		obj:false,
		showTime:5000,                                                          // Show time
		animateSpeed:700,                                                       // Animations Zeit
		animateType:"fade",                                                     // Animation Type (slide,slide-vertical,karussell,karussell-vertical,fade,ken-burns)
		easingType:"linear",                                                    // Animation Easing Type
		verticalFormat:false,                                                   // Vertical image edit
		scale: true,                                                            // Image Skalieren
        autoheight:true,                                                        // Adapt to Image height
		autoplay:true,                                                          // Auto Start
		autoStop:true,                                                          // Stop on Click
		touchControl:true,                                                      // Touch Control
		keyControl:true,                                                        // Key Control
		showTopNav:true,                                                        // Next Back Navigation on Image
		detectBrightness:false,                                                 // Detect brightness of the images (Canvas)
		showNav:false,                                                          // Next Back Buttons bottom
		showPageNum:false,                                                      // Page Nummbers
		showThumbnail:false,                                                    // Thumbnail Navigation
		scrollThumbnailNum:3,                                                   // Nummber of Scrolling Thumbs
		autoThumbnailScroll:true,                                               // Auto Thumb Scroll
		showNavPoints:false,                                                    // Show Points Nav
		showComments:false,                                                     // Show Alt Immages Comment
		randomOrder:false,                                                      // Order
		shadowBox:false,                                                        // Open on Click in Shadowbox
		shadowBoxComments:true,                                                 // Show Alt Immages Comment in ShadowBox
        imageLink:true,                                                         // Open Link on Gallery Click 
        fullSize:false,
		beta:false
	}, options);
	
    // Attribut
	this.width = 0;
	this.height = 0;
	this.imgArray = new Array();
	this.loop = false;
	this.position = 0;
	this.lastPosition = 0;
    this.direction = false;
	this.imageNum = 0;
	this.fadeStatus = false;
	this.thumbnailWidth = 0;
	this.thumbnailContent = false;
	this.thumbnailContentWidth = 0;
	this.mouseFirstEvent = false;
    this.hasLinks = false;
	this.fx = fx;
    
	// Options to Attributs
	for(var name in this.options){eval("this."+name+"=this.options."+name);}
	// Set Obj
	if(this.options.obj){
		this.obj =  this.options.obj;	
	}else{
		this.obj =  $(this.options.id);	
	}
	
	if(!jQuery.ui && this.easingType != "linear"){
        this.message("no jQuery UI !!!");
    }
	
	if(this.obj){
		if($(this.obj).find("img").length){
			this.init();
		}else{
			this.message("No image object or double init");
		}
	}else{
		this.message("No galerie object");
	}
}

xSlider.prototype = {
	init:function(){
		var self = this;
		var images = $(this.obj).find("img");
		this.imageNum = $(images).length;
		this.lastPosition = $(images).length;
		var num = 0;
		// ADD Loader
		$(this.obj).append("<div class='loader'><i class='fa fa-spinner fa-spin'></i></div>").hide().fadeIn(500);
		// Weniger als 2 Bilder
		if(this.imageNum <= 1){
			this.touchControl = false;
			this.keyControl = false;
			this.showTopNav = false;
			this.showNav = false;
			this.showPageNum = false;
			this.showThumbnail =  false;
			this.showNavPoints = false;
			this.autoplay = false;
		}
		$(this.obj).attr("data-type",this.animateType).addClass("xpager-slider"); 
		$(images).each(function(i,obj) {

			self.imgArray[i] = new Array();
			self.imgArray[i]["image"] = new Image;
			self.imgArray[i]["brightness"] = 0;	
			self.imgArray[i]["image"].src = $(this).attr("src");
            self.imgArray[i]["url"] = $(this).attr("data-url");
            self.imgArray[i]["target"] = $(this).attr("data-target");
            self.imgArray[i]["comment"] = $(this).attr("alt");
            
            if($(this).attr("data-comment")){self.imgArray[i]["comment"] = $(this).attr("data-comment");}
            
            if(!self.hasLinks && $(this).attr("data-url")){
                self.hasLinks = true;
            }
            
			self.imageLoader(self.imgArray[i]["image"],function(){
				self.setBrightness(self.imgArray[i]);
				num++;
				if(num==self.imageNum){self.build(function(){self.start();});}
			},function(){
				self.message("Error load image "+(i+1));
				delete self.imgArray[i];
				self.imageNum--;
				if(num==self.imageNum){self.build(function(){self.start();});}
			});
			$(this).remove();
        });
	},
	
	build:function(fx){
		var self = this;
		// randomOrder
		if(this.randomOrder){
			this.imgArray.sort(function() {return 0.5 - Math.random()});
		}
        
        if(this.fullSize){$(this.obj).addClass("fullSize");}
        
		var html = "<div class='overflow'><div class='inner-content'>";
			$(this.imgArray).each(function(i,obj) {
				if(obj){
					var setClass = "";				
					if(self.scale){
						if(obj["image"].width < obj["image"].height && self.verticalFormat){
							setClass += " verticalFormat";
						}else{
							setClass += " horizontalFormat";
						}
					}else{
						setClass += " noScaleFormat";
					}
					if(self.detectBrightness){
						setClass += " "+obj["brightness"];
					}
                    if(obj["url"]){
                        setClass += " link";
                    }
					if(self.shadowBox){setClass += " shadowBox";}
                    
					html += "<div class='image-content'><div class='image "+setClass+"' style='";
					html += "width:"+self.width+"px;";
					html += "height:"+self.height+"px;";
					html += "background-image:url("+obj["image"].src+");";
					html += "'>&nbsp;</div>";
					if(self.showComments && typeof obj["comment"] != 'undefined' && obj["comment"] != ''){
						html += '<div class="comments"><div class="comments-content">'+obj["comment"]+'</div></div>';
					}
					html += "</div>";
				}
			});
		html += "</div></div>";
		if(this.showTopNav){
            var setClass = "";
            if(this.hasLinks){
                setClass = "link";
            }
			html += "<div class='top-navigation "+setClass+"'><div class='prev'><i class='fa fa-angle-left'></i></div><div class='next'><i class='fa fa-angle-right'></i></div></div>";
		}
		if(this.showNav){
			html += "<div class='navigation'><div class='prev'><i class='fa fa-angle-left'></i></div><div class='next'><i class='fa fa-angle-right'></i></div><br clear='all' /></div>";
		}
		if(this.showThumbnail){
			html += "<div class='thumbnail-navigation'>";
			html += "<div class='thumbnail-prev'><i class='fa fa-angle-left'></i></div><div class='thumbnail-next'><i class='fa fa-angle-right'></i></div>";
			html += "<div class='thumbnail-content'>";
				$(this.imgArray).each(function(i,obj){
					if(obj){
						var format = "horizontalFormat";
						if(this.width < obj["image"].height && self.verticalFormat){
							format = "verticalFormat";
						}
						html += "<div class='image "+format+"' style='background-image:url("+obj["image"].src+");'>&nbsp;</div>";
					}
				});
			html += "</div></div>";
		}
		if(this.showNavPoints){
			html += "<div class='nav-points'><div class='points-content'>";
				$(this.imgArray).each(function(i,obj){
					if(obj){
						html += "<div class='point'><span>"+(i+1)+"</span></div>";
					}
				});
			html += "</div></div>";	
		}
		if(this.showPageNum){
			html += "<div class='pagenum'><div class='num'>0</div><div class='max'>0</div><br clear='all' /></div>";
		}
		$(this.obj).append(html);
		if(fx){fx();}
	},
	
	start:function(){
		var self = this;
		this.setStatus();
		this.startAutoplay();
		this.setSize();
        
        setInterval(function(){self.setSize();},500);
        
		$(this.obj).click(function(){
			self.mouseFirstEvent = true;	
		});
        
		$(window).resize(function(){
			self.setSize();
		});
        
		if(this.showNav || this.showTopNav){					
			$(this.obj).find(".next").click(function(){self.next();});
			$(this.obj).find(".prev").click(function(){self.prev();});
		}
		
        $(this.obj).find(".loader").fadeOut(500).remove();
        
		if(this.showThumbnail){
			this.thumbnailContent = $(this.obj).find(".thumbnail-navigation .thumbnail-content");
			$(this.thumbnailContent).children(".image").click(function(){
				self.goto($(this).index());
				self.mouseFirstEvent = true;
			});
			var last = $(this.obj).find(".thumbnail-navigation .thumbnail-content .image").last();
			var lastPos = $(last).position();
			this.thumbnailContentWidth = lastPos["left"] + $(last).width();
			var imgPos = $($(this.thumbnailContent).children(".image").get(1)).position();
			this.thumbnailWidth = imgPos.left;
			$(this.obj).find(".thumbnail-navigation .thumbnail-prev").click(function(){self.thumbnailScrollPrev();});
			$(this.obj).find(".thumbnail-navigation .thumbnail-next").click(function(){self.thumbnailScrollNext();});
		}
		if(this.showNavPoints){
			$(this.obj).find(".nav-points .points-content .point").click(function(){
				self.goto($(this).index());
			});
		}
		if(this.touchControl){
			this.touchStart = false;
			this.touchEnd= false;
			$(this.obj).bind('touchstart MSPointerDown pointerdown',function(e){
				self.touchStart = false;
				self.touchEnd = 0;
			});
			$(this.obj).bind('touchmove MSPointerMove pointermove',function(e){
				if(self.touchStart == false){
					self.touchStart = e.originalEvent.touches[0].pageX;
				}
				self.touchEnd = e.originalEvent.touches[0].pageX;
			});
			$(this.obj).bind('touchend MSPointerUp pointerup',function(e){
				var res = self.touchEnd-self.touchStart;
				if(res < 0 && res < -50){self.next();}
				if(res > 0 && res > 50){self.prev();}
				self.touchStart = false;
				self.touchEnd = 0;
			});
		}
		if(this.keyControl){
			$(document).keydown(function(e){
				if (e.keyCode == 37){e.preventDefault(); self.prev();}
				if (e.keyCode == 39){e.preventDefault(); self.next();}
			});	
		}
		if(this.shadowBox){
            Shadowbox.init({skipSetup: true});
			$(this.obj).find(".overflow .inner-content").click(function(){
				if(typeof Shadowbox != 'undefined'){
					var arr = new Array;
					$(self.imgArray).each(function(i,obj){
						if(self.shadowBoxComments){
							arr[i] =  {content: obj["image"].src, player: 'img',title:obj["comment"]}
						}else{
							arr[i] =  {content: obj["image"].src, player: 'img'}
						}
					});
					Shadowbox.open(arr);
					Shadowbox.change(self.position);
				}else{
					this.message("Shadowbox not Found");
				}
			});
		}
        
        // Open Link
        if(this.imageLink){
            $(this.obj).find(".overflow .inner-content").click(function(){
                self.openURL();
            });
        }
        
		// Set First Play
		if(this.imageNum >= 1){
			$(this.obj).find(".overflow .image-content").first().addClass("start");
		}
		// Start Show
		$(this.obj).children(".overflow").animate({opacity:1},500,function(){
			if(self.fx){self.fx();}
		});
		
	},
	
	startAutoplay:function(){
		if(this.autoplay){
			var self = this;
			var status = true;
			clearInterval(this.loop);
			if(this.autoStop && this.mouseFirstEvent){status = false;}
			if(this.animateType == 'ken-burns'){status = true;}
			if(status){
				this.loop = setInterval(function(){
					self.next();
				},this.showTime);
			}
		}
	},
	
	next:function(){
		if(!this.fadeStatus){
			var self = this;
			this.fadeStatus = true;
			this.lastPosition = this.position;
			this.position++;
            this.direction = "next";
			if(this.position == this.imageNum){this.position = 0;}
			this.animate(function(){
				self.startAutoplay(); //Reset Time
				self.fadeStatus = false;
			});
		}
	},
	
	prev:function(){
		if(!this.fadeStatus){
			var self = this;
			this.fadeStatus = true;
			this.lastPosition = this.position;
			this.position--;
            this.direction = "prev";
			if(this.position < 0){this.position = this.imageNum-1;}
			this.animate(function(){
				self.startAutoplay(); //Reset Time
				self.fadeStatus = false;
			});
		}
	},
	
	goto:function(pos){
		if(pos != this.position){
			var self = this;
            this.direction = "next";
			this.fadeStatus = true;
			this.lastPosition = this.position;
			this.position = pos;
			this.animate(function(){
				self.startAutoplay();
				self.fadeStatus = false;
			});
		}
	},
	
	animate:function(fx){
		var self = this;
		var innerContent = $(this.obj).find(".overflow .inner-content");
		var imageContent = $(this.obj).find(".overflow .image-content");
		var aktiv = $(imageContent).get(this.position);
		var last = $(imageContent).get(this.lastPosition);
		// Animationen
		switch(this.animateType){
			case "slide":
				$(imageContent).removeClass("start");
				$(innerContent).animate({left:(this.width*this.position)*-1},this.animateSpeed,this.easingType,function(){
					if(fx){fx();}
				});
			break;
			case "slide-vertical":
				$(imageContent).removeClass("start");
				$(innerContent).animate({top:(this.height*this.position)*-1},this.animateSpeed,this.easingType,function(){
					if(fx){fx();}
				});
			break;
            case "karussell":
                $(imageContent).not(last,aktiv).css({"left":this.width,"z-index":1,"display":"block"});
                $(last).css("z-index",2);
                if(this.direction == "next"){
                    $(aktiv).css({"left":this.width,"z-index":3});
                    $(last).animate({left:(this.width)*-1},this.animateSpeed,this.easingType);
                    $(aktiv).animate({left:0},this.animateSpeed,this.easingType,function(){
                        if(fx){fx();} 
                    });
                }else{
                    $(aktiv).css("left",(this.width)*-1);
                    $(last).animate({left:this.width},this.animateSpeed,this.easingType);
                    $(aktiv).animate({left:0},this.animateSpeed,this.easingType,function(){
                        if(fx){fx();} 
                    });
                }
			break;
            case "karussell-vertical":
                $(imageContent).not(last,aktiv).css({"top":this.height,"z-index":1,"display":"block"});
                $(last).css("z-index",2);
                if(this.direction == "next"){
                    $(aktiv).css({"top":this.height,"z-index":3});
                    $(last).animate({top:(this.height)*-1},this.animateSpeed,this.easingType);
                    $(aktiv).animate({top:0},this.animateSpeed,this.easingType,function(){
                        if(fx){fx();} 
                    });
                }else{
                    $(aktiv).css("top",(this.height)*-1);
                    $(last).animate({top:this.height},this.animateSpeed,this.easingType);
                    $(aktiv).animate({top:0},this.animateSpeed,this.easingType,function(){
                        if(fx){fx();} 
                    });
                }
			break;
			case "fade":
				$(imageContent).not(last,aktiv).hide();
				$(last).css('z-index',1);
				$(aktiv).hide().css('z-index',2).fadeIn(this.animateSpeed,this.easingType,function(){
                    $(imageContent).removeClass("start");    
                });
                $(imageContent).not(aktiv).fadeOut(this.animateSpeed,this.easingType,function(){
					$(this).css('z-index',0).hide();
					$(aktiv).css('z-index',1);
					if(fx){fx();}
				});
			break;
			case "ken-burns":
				if(this.imageNum > 1){
					x = Math.round(Math.random() * 3);
					y = Math.round(Math.random() * 3);
					$(aktiv).attr("data-x",x);
					$(aktiv).attr("data-y",y);
					$(last).css('z-index',1);
					$(aktiv).removeClass("reset").css({"opacity":0,"z-index":2}).addClass("play").animate({"opacity":1},2000,function(){
						$(imageContent).not(last).not(aktiv).removeClass("play").addClass("reset").css('z-index',0);
						$(imageContent).removeClass("start");
						if(fx){fx();}	
					});
				}else{
					this.message("min. 2 Images");
				}				
			break;
			case "gallery":
					$(imageContent).removeClass("start");
					if(fx){fx();}
			break;
			default:
				this.message("no animation type");
			break;
		}
		
		this.setStatus(innerContent,imageContent,aktiv,last);	
	},
    
    openURL:function(){
        if(this.imgArray[this.position]["url"]){
            var target = "_top";
            if(this.imgArray[this.position]["target"]){
                target = this.imgArray[this.position]["target"];
            } 
            window.open(this.imgArray[this.position]["url"],target);
        }
    },
	
	thumbnailScrollNext:function(){
		var thumbnailPos = $(this.thumbnailContent).position();
		var width = $(this.obj).children(".thumbnail-navigation").width();
		var scroll = thumbnailPos.left+(this.thumbnailWidth*this.scrollThumbnailNum)*-1;
		if(this.thumbnailContentWidth-width < scroll*-1){scroll = (this.thumbnailContentWidth-width)*-1;}
		if(this.thumbnailContentWidth-width > thumbnailPos.left*-1){
			$(this.thumbnailContent).stop().animate({left:scroll},500,this.easingType);
		}
	},
	
	thumbnailScrollPrev:function(){
		var thumbnailPos = $(this.thumbnailContent).position();
		var scroll = thumbnailPos.left+(this.thumbnailWidth*this.scrollThumbnailNum);		
		if(0> scroll*-1){scroll = 0;}
		if(thumbnailPos.left < 0){
			$(this.thumbnailContent).stop().animate({left:scroll},500,this.easingType);
		}	
	},
	
	thumbnailScrollToActive:function(){
		var aktiv = $(this.thumbnailContent).find(".aktiv");
		var width = $(this.obj).children(".thumbnail-navigation").width();
		if($(aktiv).length){
			var imgPos = $(aktiv).position();
			var scroll = imgPos.left*-1;
			if(0> scroll*-1){scroll = 0;}
			if(this.thumbnailContentWidth-width < scroll*-1){scroll = (this.thumbnailContentWidth-width)*-1;}
			if(scroll <= 0 && this.thumbnailContentWidth-this.width >= scroll*-1){
				$(this.thumbnailContent).stop().animate({left:scroll},500,this.easingType);
			}
		}
	},
	
	setSize:function(){
		var self = this;
		var innerContent = $(this.obj).find(".overflow .inner-content");
        if(this.fullSize){
            var marginTopBottom = 0;
            if(!isNaN(parseInt($(this.obj).css("margin-top")))){ marginTopBottom += parseInt($(this.obj).css("margin-top"))}
            if(!isNaN(parseInt($(this.obj).css("margin-bottom")))){ marginTopBottom += parseInt($(this.obj).css("margin-bottom"))}
            
            marginLeftRight = 0;
            if(!isNaN(parseInt($(this.obj).css("margin-right")))){ marginLeftRight += parseInt($(this.obj).css("margin-right"))}
            if(!isNaN(parseInt($(this.obj).css("margin-left")))){ marginLeftRight += parseInt($(this.obj).css("margin-left"))}
            
            this.width = $(window).width()-marginLeftRight;
		    this.height = $(window).height()-marginTopBottom;

            $(this.obj).find(".overflow").css({"width":this.width,"height":this.height});
            $(this.obj).css({"width":this.width,"height":this.height});
        }else{
            
            this.width = $(this.obj).width();

            if(this.autoheight){
                var imgHeight = this.imgArray[this.position]["image"]["naturalHeight"];
                var imgWidth = this.imgArray[this.position]["image"]["naturalWidth"];
                this.height = imgHeight/(imgWidth / this.width);
                $(this.obj).stop().animate({height:this.height},500);
            }else{
                this.height = $(this.obj).height();
            }
        }
        
		if(this.animateType == 'slide'){$(innerContent).css({"left":(this.width*this.position)*-1,"width":(this.imageNum*this.width)+1000});}
        
        
		$($(innerContent).find(".image-content .image")).css({"width":this.width,"height":this.height});
	},
	
	setStatus:function(innerContent,imageContent,aktiv,last){
		// Set Aktiv
		$(imageContent).removeClass("aktiv");
		$(aktiv).addClass("aktiv");
		// Set Thumbnails
		if(this.showThumbnail){
			var thumbnail = $(this.obj).find(".thumbnail-navigation .thumbnail-content .image");
			var aktivThumbnail = $(thumbnail).get(this.position);
			$(thumbnail).removeClass("aktiv");
			$(aktivThumbnail).addClass("aktiv");
		}
		// Set Points
		if(this.showNavPoints){
			var points = $(this.obj).find(".nav-points .points-content .point");
			var aktivPoint = $(points).get(this.position);
			$(points).removeClass("aktiv");
			$(aktivPoint).addClass("aktiv");
		}
		// Thumbnails Auto Scroll
		if(this.showThumbnail && this.autoThumbnailScroll){
			this.thumbnailScrollToActive();
		}
		// Set Numbers
		if(this.showPageNum){
			$(this.obj).find(".pagenum .max").text(this.imageNum);
			$(this.obj).find(".pagenum .num").text(this.position+1);
		}
		// Set Color
		if(this.detectBrightness){
			$(this.obj).attr("data-brightness",this.imgArray[this.position]["brightness"]);
		}
	},
	
	imageLoader:function(img,fx,fxErr){
		if(img.complete||img.readyState===4){
			img.src+="?d="+new Date().getTime();
			$(img).load(function(response,status,xhr){if(fx){fx();}}).error(function(){if(fxErr){fxErr();}});
		}else{
			if(fx){fx();}
		}
	},
	
	setBrightness:function(obj){
		// Color berechnen
		if(self.detectBrightness){
			var color_total = 0;
			var ctx = document.createElement('canvas').getContext('2d');
			ctx.width = 100;
			ctx.height = 100;
			ctx.drawImage(obj["image"],0,0,100,100);
			var pixel = ctx.getImageData(0,0,100,100);
			var l = $(pixel.data).length;
			$(pixel.data).each(function(i,obj) {color_total += obj;});
			var brightness = color_total/(255*l);
			if(brightness > 0.8){obj["brightness"] = "light";}
			if(brightness < 0.8 && brightness > 0.5){obj["brightness"] = "medium";}
			if(brightness < 0.5 && brightness > 0.0){obj["brightness"] = "dark";}
		}
	},
	
	// Console
	message:function(txt){
		if(this.beta){
			if($("#cis_error_message").length){
				var html = "<div class='cis_error_message' style='font-size:10px; text-align:left; line-height: 25px; border-bottom:solid 1px #ddd; padding-left:5px;'><div>";
				$("#cis_error_message_titel").after(html);
				$(".cis_error_message").first().text("- "+txt);
			}else{
				var html = "<div id='cis_error_message' style='position:absolute; top:10px; left:10px; z-index:100000; height:100px; width:250px; border:solid 2px #000; display:none;background-color:#fff; overflow: auto;'>";
				html += "<h3 id='cis_error_message_titel' style='display:block; text-align:center; background-color:#666; color:#fff; font-size:12px; line-height: 25px!important; margin:0px;'>ERROR</h3>";
				html += "<div class='cis_error_message' style='font-size:10px; text-align:left; line-height: 25px; border-bottom:solid 1px #ddd; padding-left:5px;'><div>";
				html += "</div>";			
				$(this.obj).append(html);
				$(".cis_error_message").text("- "+txt);
				$("#cis_error_message").fadeIn(500);
			}
		}
	}
}