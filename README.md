xSlider
===========
Responsive Image Slider
[xSlider - Webseite]

## Installation

Download and include `xSlider.js` and `xSlider.css`  in your document after including jQuery and  Fontawesome.

```html
<link href="xSlider.css" rel="stylesheet" />
<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet" />
<script type="text/javascript" src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="xSlider.js"></script>
```

## Usage

```javascript
$("#slider").xSlider();
```

``` html
<div id="slider" class="xpager-slider">
	<img src="photos/1.JPG" alt="test" />
	<img src="photos/2.JPG"  alt="Italien"/>
	<img src="photos/3.JPG"  alt="Italien"/>
	<img src="photos/4.JPG" />
</div>
```


## Options

Options can be passed in via data attributes of JavaScript.

``` js
$("#slider").xSlider({
	showTime:8000, // Anzeige Zeit
	animateSpeed:1000, // Animations Zeit
	animateType:"fade"
});
```

<table class="table table-bordered table-striped">
	<thead>
		<tr>
			<th style="width: 100px;">Name</th>
			<th style="width: 100px;">type</th>
			<th style="width: 50px;">default</th>
			<th>description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>showTime</td>
			<td>number</td>
			<td>5000</td>
			<td>Image display time</td>
		</tr>
		<tr>
			<td>animateSpeed</td>
			<td>number</td>
			<td>700</td>
			<td>Animation time</td>
		</tr>
		<tr>
			<td>animateType</td>
			<td>string</td>
			<td>fade</td>
            <td>Animation Type (slide,slide-vertical,karussell,karussell-vertical,fade,ken-burns)</td>
		</tr>
		<tr>
			<td>easingType</td>
			<td>string</td>
			<td>linear</td>
			<td>Animation jQuery Easing Type</td>
		</tr>
		<tr>
			<td>verticalFormat</td>
			<td>boolen</td>
			<td>false</td>
            <td>Adjust vertical</td>
		</tr>
		<tr>
			<td>scale</td>
			<td>boolen</td>
			<td>true</td>
            <td>Scale images</td>
		</tr>
		<tr>
			<td>autoplay</td>
			<td>boolen</td>
			<td>true</td>
			<td>Auto Play</td>
		</tr>
		<tr>
			<td>autoStop</td>
			<td>boolen</td>
			<td>true</td>
			<td>Stop at first click</td>
		</tr>
		<tr>
			<td>touchControl</td>
			<td>boolen</td>
			<td>true</td>
			<td>Touch Control</td>
		</tr>
		<tr>
			<td>keyControl</td>
			<td>boolean</td>
			<td>true</td>
			<td>Key Control</td>
		</tr>
		<tr>
			<td>showTopNav</td>
			<td>boolean</td>
			<td>true</td>
			<td>Next Back Navigation on Image</td>
		</tr>
		<tr>
			<td>detectBrightness</td>
			<td>boolean</td>
			<td>false</td>
			<td>Brightness of the images seen (Canvas)</td>
		</tr>
		<tr>
		  <td>showNav</td>
		  <td>boolean</td>
		  <td>false</td>
		  <td>Next Back buttons bottom</td>
	  </tr>
		<tr>
		  <td>showPageNum</td>
		  <td>boolean</td>
		  <td>false</td>
		  <td>Show page nummbers</td>
	  </tr>
		<tr>
		  <td>showThumbnail</td>
		  <td>boolean</td>
		  <td>false</td>
		  <td>Thumbnail navigation</td>
	  </tr>
		<tr>
		  <td>scrollThumbnailNum</td>
		  <td>number</td>
		  <td>3</td>
		  <td>Number of scrolling thumbnails</td>
	  </tr>
		<tr>
		  <td>autoThumbnailScroll</td>
		  <td>boolean</td>
		  <td>true</td>
		  <td>Auto scrolling thumbnails</td>
	  </tr>
		<tr>
		  <td>showNavPoints</td>
		  <td>boolean</td>
		  <td>false</td>
		  <td>Show navigation points</td>
	  </tr>
		<tr>
		  <td>showComments</td>
		  <td>boolean</td>
		  <td>false</td>
		  <td>Show alt image comments</td>
	  </tr>
		<tr>
		  <td>randomOrder</td>
		  <td>boolean</td>
		  <td>false</td>
		  <td>Random sequence</td>
	  </tr>
		<tr>
		  <td>shadowBox</td>
		  <td>boolean</td>
		  <td>false</td>
		  <td>Open image in Shadowbox (add Shadowbox.ja)</td>
	  </tr>
		<tr>
		  <td>shadowBoxComments</td>
		  <td>boolean</td>
		  <td>true</td>
		  <td>Show alt image comments at the box</td>
	  </tr>
		<tr>
		  <td>imageLink</td>
		  <td>boolean</td>
		  <td>false</td>
		  <td>
		  Open link on Image Click (set &quot;showTopNav&quot; : false) <br />
		  Image Attributes: "data-url, data-target"
		  </td>
	  </tr>
		<tr>
		  <td>fullSize</td>
		  <td>boolean</td>
		  <td>false</td>
		  <td>Slider 100% size</td>
	  </tr>
	</tbody>
</table>



[xSlider - Webseite]:http://xpager.ch/entwicklung/xslider/
