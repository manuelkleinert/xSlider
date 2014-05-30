xSlider
=======
<br>
Responsive Image Slider with many settings.
<br><br>

Init Script
=======

``` js
$("#demo").xSlider({
		id:false,
		obj:false,
		showTime:5000, // Anzeige Zeit
		animateSpeed:700, // Animations Zeit
		animateType:"fade", // Animation Type
		easingType:"linear", // Animation Easing Type
		verticalFormat:false, // Hochformat anpassem
		scale: true, // Bilder Skalieren
		autoplay:true, // Auto Start
		autoStop:true, // Stop on Click
		touchControl:true, // Touch Control
		keyControl:true, // Key Control
		showTopNav:true, // Next Back Navigation on Image
		detectBrightness:false, // Helligkeit der Bilder erkennen (Canvas)
		showNav:false,  // Next Back Buttons bottom
		showPageNum:false, // Page Nummbers
		showThumbnail:false, // Thumbnail Navigation
		scrollThumbnailNum:3, // Nummber of Scrolling Thumbs
		autoThumbnailScroll:true, // Auto Thumb Scroll
		showNavPoints:false, // Show Points Nav
		showComments:false, // Show Alt Immages Comment
		randomOrder:false, // Order
		shadowBox:false, // Open on Click in Shadowbox
		shadowBoxComments:true, // Show Alt Immages Comment in ShadowBox
        imageLink:false, // Open Link on Gallery Click 
		beta:false
		});
```
