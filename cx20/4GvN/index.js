// forked from snorpey's "Block Animation Demo" http://codepen.io/snorpey/pen/wpKLl


var DOT_SIZE = 16;
var X_START_POS = 450;
var Y_START_POS = 200;
var Z_START_POS = 0;

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
        "無":"black",  // "#000000",
        "白":"white",  // "#ffffff",
        "肌":"orange", // "#ffcccc",
        "茶":"brown",  // "#800000",
        "赤":"red",    // "#ff0000",
        "黄":"yellow", // "#ffff00",
        "緑":"green",  // "#00ff00",
        "水":"cyan",   // "#00ffff",
        "青":"blue",   // "#0000ff",
        "紫":"purple"  // "#800080"
    };
    return colorHash[ c ];
}

var block_castle = [];

var options = {
   // how many blocks do we want to animate at the same time?
	blocks_in_parallel: 5,

	// milliseconds before starting to animate the next set of blocks
	blockset_timeout: 80,

	// duration of a block animation
	block_animation_duration: 300,

	// delay before we call the animation complete callback
	callback_delay: 400,

	// size of #blocks
	canvas: {
		width: 465,
		height: 465
	},

	// offset of ead block relative to #blocks
	offset: {
		left: 370,
		top: 92
	},

	// size of a block
	block: {
		width: 28,
		height: 14
	},

	// resize timeout, so we don't call expensive operations too often
	resize_timeout: 50,

	// position of #blocks
	wrapper: {
		x: 0,
		y: 0
	}
  
  // in case you're wondering, you can find the json data that is used
  // to position the blocks in this pen: http://codepen.io/snorpey/pen/iCrhe
};

// prperties of the browser window
var win = new WindowSize();

function WindowSize ()
{
	var self = this;

	self.size = { width: window.innerWidth, height: window.innerHeight };
	self.center = { x: self.size.width / 2, y: self.size.height / 2 };

	window.addEventListener( 'resize', resized );

	function resized ()
	{
		self.size = { width: window.innerWidth, height: window.innerHeight };
		self.center = { x: self.size.width / 2, y: self.size.height / 2 };
	}
  
  self.resized = resized;
}

// loads a blocks json file, creates and manages blocks
function BlockManager ( data )
{
	var self = this;
	var blocks = [ ];
	var outer_wrapper = $( '#wrapper' );
	var wrapper = $( '#blocks' );
	var start_position_name;
	var end_position_name;
	var resized_timeout;
	var is_initialized = false;

	var callbacks = {
		animationstarted: [ ],
		animationended: [ ]
	};

	moveWrapper();

	outer_wrapper.addClass( 'is-loading' );

	function addCallback ( type, fn )
	{
		callbacks[type].push( fn );

		return self;
	}

	function callCallback( type )
	{
		if ( callbacks[type] )
		{
			for ( var i = 0, len = callbacks[type].length; i < len; i++ )
			{
				callbacks[type][i]();
			}
		}
	}

	function init ()
	{
		for ( var i = 0, len = data.length; i < len; i++ )
		{
			blocks[i] = new Block( data[i], wrapper, i );
			wrapper.append( blocks[i].getElement() );
			blocks[i].calculatePositions();
		}
    
        if (
			! is_initialized &&
			start_position_name &&
			end_position_name &&
			blocks.length
		)
		{
			window.addEventListener( 'resize', resized );

			is_initialized = true;
			animationStarted();

			setToPosition( 'center' );
			outer_wrapper.removeClass( 'is-loading' );
			moveToPosition( 'block', animationEnded );
		}
	}

	function animate ()
	{
		animationStarted();

		moveToPosition(
			start_position_name,
			function ()
			{
				setToPosition( end_position_name );
				moveToPosition( 'block', animationEnded );
			}
		);
	}

	function animationStarted ()
	{
		callCallback( 'animationstarted' );
	}

	function animationEnded ()
	{
		callCallback( 'animationended' );
	}

	function setStartPosition ( position_name )
	{
		start_position_name = position_name;
	
		return self;
	}

	function setEndPosition ( position_name )
	{
		end_position_name = position_name;
		
		return self;
	}

	function moveToPosition ( position_name, callback )
	{
		var timeout = options.blockset_timeout;
		var delay = 0;
						
		var i = 0;
		var i_len = 0;
		
		var j = 0;
		var j_len = 0;

		var blocks_in_parallel = options.blocks_in_parallel;
		var current_block_set = [ ];

		for ( i = 0, i_len = blocks.length; i < i_len; i += blocks_in_parallel )
		{
			current_block_set = [ ];
			
			for ( j = 0, j_len = blocks_in_parallel; j < j_len; j++ )
			{
				if ( i + j < i_len )
				{
					current_block_set[j] = i + j;
					
					// if we've reached the latest block
					if ( i + j === i_len - 1 )
					{
						// call callbacks
						if ( typeof callback === 'function' )
						{
							setTimeout( callback, delay + options.callback_delay );
						}
						
						if ( typeof callback === 'string' )
						{
							setTimeout(
								function ()
								{
									moveToPosition( callback );
								},
								delay + options.callback_delay
							);
						}
					}
				}
			}

			moveBlocksToPosition( position_name, current_block_set, delay );
			
			delay += timeout;
		}
	}

	function moveBlocksToPosition( position_name, block_indexes, delay )
	{
		if ( delay )
		{
			setTimeout(
				function ()
				{
					for ( var i = 0, len = block_indexes.length; i < len; i++ )
					{
						blocks[block_indexes[i]].moveToPosition( position_name );
					}
				},
				delay
			);
		}

		else {
			for ( var i = 0, len = block_indexes.length; i < len; i++ )
			{
				blocks[block_indexes[i]].moveToPosition( position_name );
			}
		}
	}

	function moveBlockToPosition( position_name, block_index, delay )
	{
		if ( delay )
		{
			setTimeout(
				function ()
				{
					blocks[block_index].moveToPosition( position_name );
				},
				delay
			);
		}

		else {
			blocks[block_index].moveToPosition( position_name );
		}
	}

	function setToPosition ( position_name )
	{
		for ( var i = 0, len = blocks.length; i < len; i++ )
		{
			blocks[i].setToPosition( position_name );
		}
	}

	function moveWrapper ()
	{
		// snap to position				
		var new_x = ( win.size.width - options.canvas.width ) / 2;
		var new_y = ( win.size.height - options.canvas.height ) / 2;

		new_x = Math.floor( new_x / options.block.width ) * options.block.width;
		new_y = Math.floor( new_y / options.block.height ) * options.block.height;

		options.wrapper.x = new_x;
		options.wrapper.y = new_y;

		var transform_str = 'translateX(' + new_x + 'px) translateY(' + new_y + 'px)';
		
		wrapper.css( { transform: transform_str, webkitTransform: transform_str } );
	}

	function resized ()
	{
		// to reduce the workload, don't always handle the resize event				
		clearTimeout( resized_timeout );

		resized_timeout = setTimeout(
			function ()
			{
				moveWrapper();

				for ( var i = 0, len = blocks.length; i < len; i++ )
				{
					blocks[i].calculatePositions();
				}
			},
			options.resize_timeout
		);
	}

	self.addCallback = addCallback;
	self.animate = animate;
	self.setStartPosition = setStartPosition;
	self.setEndPosition = setEndPosition;
  self.init = init;
}

// a single block
function Block ( params, wrapper, index )
{
	var self = this;
	var current_position_name;
	var el = $( '<div id="block-' + params.id + '" class="block color-' + params.color + '" />' );
	var z = parseInt( params.position.z, 10 ) || 0;
	var position = { };
	
	el.css( 'z-index', params.layer );

	position.block = {
		left: params.position.x,
		top: params.position.y - z * 15
	};
	
	function calculatePositions ()
	{
		position.explode = getPositionExplode();
		position.top = getPositionTop();
		position.center = getPositionCenter();
	}

	function moveTo ( position )
	{
		el.velocity( position, options.block_animation_duration );
	}

	function moveToPosition ( position_name )
	{
		if ( current_position_name !== position_name )
		{
			moveTo( position[position_name] );

			current_position_name = position_name;
		}

		return self;
	}

	function setTo ( position )
	{
		el.css( position );
	}

	function setToPosition ( position_name )
	{
		if ( current_position_name !== position_name )
		{
			setTo( position[position_name] );
		}

		return self;
	}

	// calculate the "explode" position for a block
	function getPositionExplode()
	{
		var result = { left: 0, top: 0 };
		var side = Math.floor( Math.random() * 4 );
		var min;
		var max;

		// 0 = top
		// 1 = right
		// 2 = bottom
		// 3 = left
		
		if (
			side === 0 ||
			side === 2
		)
		{
			min = options.offset.left - options.wrapper.x;
			max = options.offset.left + options.wrapper.x + options.canvas.width;

			result.left = Math.random() * (max - min) + min;
		}

		if (
			side === 1 ||
			side === 3
		)
		{
			min = options.offset.top - options.wrapper.y;
			max = options.offset.top + options.wrapper.y + options.canvas.height;

			result.top = Math.random() * (max - min) + min;
		}

		if ( side === 0 )
		{
			result.top = options.offset.top - options.wrapper.y - options.block.height * 2;
		}

		if ( side === 1 )
		{
			result.left = options.offset.left + options.wrapper.x + options.canvas.width + options.block.width * 2;
		}

		if ( side === 2 )
		{
			result.top = options.offset.top + options.wrapper.y + options.canvas.height + options.block.height * 2;
		}

		if ( side === 3 )
		{
			result.left = options.offset.left - options.wrapper.x - options.block.width;
		}

		return result;
	}

	// calculate the "top" position for a block
	function getPositionTop ()
	{
		return {
			left: params.position.x,
			top: options.offset.top - options.wrapper.y - options.block.height * 2
		};
	}

	function getPositionCenter ()
	{
		return {
			//left: ( options.canvas.width / 2 ) + options.offset.left,
			//top: ( options.canvas.height / 2 ) + options.offset.top
			left: ( options.canvas.width / 2 ) + options.offset.left + 150,
			top: ( options.canvas.height / 2 ) + options.offset.top + 100
		};
	}

	function getElement ()
	{
		return el;
	}

	self.setToPosition = setToPosition;
	self.moveToPosition = moveToPosition;
	self.calculatePositions = calculatePositions;
	self.getElement = getElement;
}

// a dropdown menu
function Selector ( selector )
{
	var self = this;
	var el = $( selector );
	var callbacks = [ ];
	var current_selection = getCurrentSelection();
	
	el.on( 'change', animationSelected );

	function animationSelected ()
	{
		for ( var i = 0, len = callbacks.length; i < len; i++ )
		{
			callbacks[i]( getCurrentSelection() );
		}
	}

	function addCallback ( fn )
	{
		if ( typeof fn === 'function' )
		{
			callbacks.push( fn );
		}

		animationSelected();

		return self;
	}

	function disable ()
	{
		el.attr( { disabled: 'disabled' } );

		return self;
	}

	function enable ()
	{
		el.removeAttr( 'disabled' );

		return self;
	}

	function getCurrentSelection ()
	{
		return el.val();
	}

	self.addCallback = addCallback;
	self.getCurrentSelection = getCurrentSelection;
	self.disable = disable;
	self.enable = enable;
}

function Button ( selector )
{
	var self = this;
	var button = $( selector );
	var callbacks = [ ];

	if ( button.length )
	{
		button.click( 'click', buttonClicked );
	}

	function buttonClicked ()
	{
		for ( var i = 0, len = callbacks.length; i < len; i++ )
		{
			callbacks[i]();
		}
	}

	function addCallback ( fn )
	{
		callbacks.push( fn );

		return self;
	}

	self.addCallback = addCallback;
}

function dataSetToBlock( dataSet ) {
	var result = [];
	for ( var i = 0; i < dataSet.length; i++ ) {
		var x = (i % 16) * DOT_SIZE + X_START_POS;
		var y = Math.floor( i / 16 ) * DOT_SIZE + Y_START_POS;
		var z = 0;
		var color = getRgbColor( dataSet[i] );
		if ( dataSet[i] != "無" ) {
			result.push( {"id":i, "color":color, "position":{"x":x, "y":y, "z":z}, "type":"solid","layer":i} );
		}
	}
	return result;
}
function init ()
{
	block_castle = dataSetToBlock( dataSet );
	// using json data from this codepen:
	// http://codepen.io/snorpey/pen/iCrhe
	var castle = block_castle;
	
	var block_manager = new BlockManager( castle );
	var in_selector = new Selector( '#animation-in' );
	var out_selector = new Selector( '#animation-out' );
	var play = new Button( '#play' ).addCallback( block_manager.animate );

	block_manager
		.addCallback( 'animationstarted', in_selector.disable )
		.addCallback( 'animationstarted', out_selector.disable )
		.addCallback( 'animationended', in_selector.enable )
		.addCallback( 'animationended', out_selector.enable );

	in_selector.addCallback( block_manager.setStartPosition );
	out_selector.addCallback( block_manager.setEndPosition );

	block_manager.init();
}

init();
