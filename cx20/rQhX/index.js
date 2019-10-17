// forked from tikamoton's "Binary Tree" http://jsdo.it/tikamoton/vK1d

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
    "無","無","無","無","無","無","無","無","無","無","無","無","無","肌","肌","肌",
    "無","無","無","無","無","無","赤","赤","赤","赤","赤","無","無","肌","肌","肌",
    "無","無","無","無","無","赤","赤","赤","赤","赤","赤","赤","赤","赤","肌","肌",
    "無","無","無","無","無","茶","茶","茶","肌","肌","茶","肌","無","赤","赤","赤",
    "無","無","無","無","茶","肌","茶","肌","肌","肌","茶","肌","肌","赤","赤","赤",
    "無","無","無","無","茶","肌","茶","茶","肌","肌","肌","茶","肌","肌","肌","赤",
    "無","無","無","無","茶","茶","肌","肌","肌","肌","茶","茶","茶","茶","赤","無",
    "無","無","無","無","無","無","肌","肌","肌","肌","肌","肌","肌","赤","無","無",
    "無","無","赤","赤","赤","赤","赤","青","赤","赤","赤","青","赤","無","無","無",
    "無","赤","赤","赤","赤","赤","赤","赤","青","赤","赤","赤","青","無","無","茶",
    "肌","肌","赤","赤","赤","赤","赤","赤","青","青","青","青","青","無","無","茶",
    "肌","肌","肌","無","青","青","赤","青","青","黄","青","青","黄","青","茶","茶",
    "無","肌","無","茶","青","青","青","青","青","青","青","青","青","青","茶","茶",
    "無","無","茶","茶","茶","青","青","青","青","青","青","青","青","青","茶","茶",
    "無","茶","茶","茶","青","青","青","青","青","青","青","無","無","無","無","無",
    "無","茶","無","無","青","青","青","青","無","無","無","無","無","無","無","無"
];

function getRgbColor( c )
{
    var colorHash = {
        "無":"#000000",
        "白":"#ffffff",
        "肌":"#ffcccc",
        "茶":"#800000",
        "赤":"#ff0000",
        "黄":"#ffff00",
        "緑":"#00ff00",
        "水":"#00ffff",
        "青":"#0000ff",
        "紫":"#800080"
    };
    return colorHash[ c ];
}

var canvas, renderer,
    branches = [], color, level, cnt;

window.addEventListener( 'load', init, false );

function init(){
  
  // Canvas
  canvas = document.createElement( 'canvas' );
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.getElementById( 'container' ).appendChild( canvas );
  renderer = canvas.getContext( '2d' );
  
  // クリックした場所で二分木を作成
  canvas.addEventListener( 'mousedown', function( event ){
    
    // マウス座標
    var x = event.clientX - canvas.offsetLeft;
    var y = event.clientY - canvas.offsetTop;
    
    // 枝の座標
    branches = [];
    binaryTree(
      x, y, // 始点
      x, y - ( 20 + Math.random() * 30 ), // 終点
      20 + Math.random() * 20, // 子枝の分岐角度
      0.7 + Math.random() * 0.2, //　親枝に対する子枝の長さの割合
      5 + Math.floor( Math.random() * 4 ) // 末枝までの分岐点の数
    );
    
    // 枝の色
    color = Math.floor( Math.random() * 0xffffff).toString(16);
    for( var i = color.length; i < 6; i++ ){
      color = "0" + color;
    }
    color = "#" + color;

    // 描画
    level = branches.length - 1;
    cnt = 0;
    render( true );
    
  }, false );
  

  // 初期表示
  binaryTree( canvas.width / 2, canvas.height, canvas.width / 2, canvas.height - 50, 30, 0.8, 8 );
  color = "#000000";
  level = branches.length - 1;
  cnt = 0;
  render();
  
  // Canvasクリア
  document.getElementById( 'clear' ).addEventListener( 'click', function(){
    renderer.clearRect( 0, 0, canvas.width, canvas.height );
  }, false );
}


/*
 * 枝の始点と終点の座標をbranches配列に格納
 */
function binaryTree( x1, y1, x2, y2, angle, len, dim ){
  if( branches[dim] == undefined ) branches[dim] = [];
  branches[dim].push( [x1 ,y1 ,x2, y2] );
  if( dim === 0 ) return;

  var sin, cos, dx, dy, x3, y3, x4, y4;
  sin = Math.sin( angle * Math.PI / 180 );
  cos = Math.cos( angle * Math.PI / 180 );
  dx = len * ( x2 - x1 );
  dy = len * ( y2 - y1 );
  x3 = x2 + dx * cos - dy * sin;
  y3 = y2 + dx * sin + dy * cos;
  x4 = x2 + dx * cos + dy * sin;
  y4 = y2 - dx * sin + dy * cos;
  binaryTree( x2, y2, x3, y3, angle, len, dim - 1 );
  binaryTree( x2, y2, x4, y4, angle, len, dim - 1 );
}

/*
 * 描画
 */
function render( animate ){
  
  var div = animate ? 4 : 1; 
  
  for( var i = 0; i < branches[level].length; i++ ){
    var dx, dy, x1, y1, x2, y2;
    
    dx = ( branches[level][i][2] - branches[level][i][0] ) / div;
    dy = ( branches[level][i][3] - branches[level][i][1] ) / div;
    x1 = branches[level][i][0];
    y1 = branches[level][i][1];
    x1 += ( 0 < cnt ) ? dx * ( cnt - 1 ) : dx * cnt;
    y1 += ( 0 < cnt ) ? dy * ( cnt - 1 ) : dy * cnt;
    x2 = branches[level][i][0] + dx * ( cnt + 1 );
    y2 = branches[level][i][1] + dy * ( cnt + 1 );
    
    renderer.beginPath();
/*
    renderer.moveTo( x1, y1 );
    renderer.lineTo( x2, y2 );
    renderer.lineWidth = level + 1;
    renderer.strokeStyle = color;
    renderer.stroke();
*/
    drawMario( x1, y1, level * 10 );
  }
  
  cnt++;
  
  if( cnt == div ){
    level--;
    cnt = 0;
  }
  
  if( 0 <= level ){
    if( animate ){
      setTimeout( function(){ render( true ); }, 1000 / 60 );
    }else{
      render();
    }
  }
}

function drawMario(x0, y0, size) {
    var dot_size = size/16;
	for ( var i = 0; i < dataSet.length; i++ ) {
		var x = x0 + i % 16 * dot_size;
		var y = y0 + Math.floor( i / 16 ) * dot_size;
		var color = getRgbColor( dataSet[i] );
		if ( dataSet[i] != "無" ) {
			renderer.fillStyle = color;
			renderer.fillRect( x, y, dot_size * 0.9, dot_size * 0.9 );
		}
	}
}