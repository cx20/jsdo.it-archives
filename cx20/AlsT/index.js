// forked from cx20's "Google Chart Tools テスト" http://jsdo.it/cx20/li2g
// forked from https://google-developers.appspot.com/chart/interactive/docs/quick_start
 
var DOT_SIZE = (window.innerHeight/465) * 0.1;

// Load the Visualization API and the piechart package.
google.load('visualization', '1.0', {'packages':['corechart']});
 
// Set a callback to run when the Google Visualization API is loaded.
google.setOnLoadCallback(drawChart);
 
// ‥‥‥‥‥‥‥‥‥‥‥‥‥□□□
// ‥‥‥‥‥‥〓〓〓〓〓‥‥□□□
// ‥‥‥‥‥〓〓〓〓〓〓〓〓〓□□
// ‥‥‥‥‥■■■□□■□‥■■■
// ‥‥‥‥■□■□□□■□□■■■
// ‥‥‥‥■□■■□□□■□□□■
// ‥‥‥‥■■□□□□■■■■■‥
// ‥‥‥‥‥‥□□□□□□□■‥‥
// ‥‥■■■■■〓■■■〓■‥‥‥
// ‥■■■■■■■〓■■■〓‥‥■
// □□■■■■■■〓〓〓〓〓‥‥■
// □□□‥〓〓■〓〓□〓〓□〓■■
// ‥□‥■〓〓〓〓〓〓〓〓〓〓■■
// ‥‥■■■〓〓〓〓〓〓〓〓〓■■
// ‥■■■〓〓〓〓〓〓〓‥‥‥‥‥
// ‥■‥‥〓〓〓〓‥‥‥‥‥‥‥‥
var dataSet = [
	"白","白","白","白","白","白","白","白","白","白","白","白","白","肌","肌","肌",
	"白","白","白","白","白","白","赤","赤","赤","赤","赤","白","白","肌","肌","肌",
	"白","白","白","白","白","赤","赤","赤","赤","赤","赤","赤","赤","赤","肌","肌",
	"白","白","白","白","白","茶","茶","茶","肌","肌","茶","肌","白","赤","赤","赤",
	"白","白","白","白","茶","肌","茶","肌","肌","肌","茶","肌","肌","赤","赤","赤",
	"白","白","白","白","茶","肌","茶","茶","肌","肌","肌","茶","肌","肌","肌","赤",
	"白","白","白","白","茶","茶","肌","肌","肌","肌","茶","茶","茶","茶","赤","白",
	"白","白","白","白","白","白","肌","肌","肌","肌","肌","肌","肌","赤","白","白",
	"白","白","赤","赤","赤","赤","赤","青","赤","赤","赤","青","赤","白","白","白",
	"白","赤","赤","赤","赤","赤","赤","赤","青","赤","赤","赤","青","白","白","茶",
	"肌","肌","赤","赤","赤","赤","赤","赤","青","青","青","青","青","白","白","茶",
	"肌","肌","肌","白","青","青","赤","青","青","黄","青","青","黄","青","茶","茶",
	"白","肌","白","茶","青","青","青","青","青","青","青","青","青","青","茶","茶",
	"白","白","茶","茶","茶","青","青","青","青","青","青","青","青","青","茶","茶",
	"白","茶","茶","茶","青","青","青","青","青","青","青","白","白","白","白","白",
	"白","茶","白","白","青","青","青","青","白","白","白","白","白","白","白","白"
];

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {
	
	// Create and populate the data table.
	var data = google.visualization.arrayToDataTable([
		['ID', 'x', 'y', 'color', 'size'],
		['',1,20,'black',0.1],
		['',2,20,'white',0.1],
		['',3,20,'beige',0.1],
		['',4,20,'brown',0.1],
		['',5,20,'red',0.1],
		['',6,20,'yellow',0.1],
		['',7,20,'green',0.1],
		['',8,20,'lightblue',0.1],
		['',9,20,'blue',0.1],
		['',10,20,'purple',0.1],
		['',25,20,'black',1]
	]);
	 
	var rows = data.getNumberOfRows();
	
	var i, x, y;
	var colorName;
	for ( i = 0; i < dataSet.length; i++ ) {
		x = i % 16 + 5;
		y = 16 - Math.floor( i / 16 );
		colorName = getEnglishColorName( dataSet[i] );
		data.addRow();
		data.setValue(i + rows, 0, '');
		data.setValue(i + rows, 1, x);
		data.setValue(i + rows, 2, y);
		data.setValue(i + rows, 3, colorName);
		data.setValue(i + rows, 4, DOT_SIZE);
	}
	 
	var options = {
		title: 'Chart of Mario',
		height: window.innerHeight, // 440,
		width: window.innerWidth, // 440,
		hAxis: {title: 'x'},
        vAxis: {title: 'y'},
		colors:["#000000",
				"#ffffff",
				"#ffcccc",
				"#800000",
				"#ff0000",
				"#ffff00",
				"#00ff00",
				"#00ffff",
				"#0000ff",
				"#800080"],
		bubble: {textStyle: {fontSize: 11}}
	};
 
	// Create and draw the visualization.
	var chart = new google.visualization.BubbleChart(
		document.getElementById('chart_div'));
	chart.draw(data, options);
}

function getEnglishColorName( colorJapanese )
{
	var colorHash = {
		"無":"black",
		"白":"white",
		"肌":"beige",
		"茶":"brown",
		"赤":"red",
		"黄":"yellow",
		"緑":"green",
		"水":"lightblue",
		"青":"blue",
		"紫":"purple"
	};
	return colorHash[ colorJapanese];
}
