// forked from bluesbug's "テキスト分解アニメーション" http://jsdo.it/bluesbug/d0VY
(function(){
    function arrayFill(num, str){
        var rtn = new Array(num);
        var i;
        for(i = 0; i < num; i++){
            rtn[i] = str;
        }
        return rtn;
    }
    
    $.fn.stringTranslate = function(){
        var $this = $(this),
            lastFrameCount = 100,
            frameCount = 0,
            boundText = $.trim($this.text());
        
        $this.html(function(){
            var html = "";
            for (var i = 0; i < boundText.length; i++) {
                html += "<span>" + boundText.charAt(i) + "</span>";
            }
            return html;
        });
        
        var $innerSpan = $this.find("span"),
            xArray = arrayFill($this.size(), 0),
            yArray = arrayFill($this.size(), 0);
        
        $innerSpan.each(function(i, ele){
            
            xArray[i] = Math.round(Math.random() * 200) * (Math.round(Math.random()) * 2 - 1);
            yArray[i] = Math.round(Math.random() * 200) * (Math.round(Math.random()) * 2 - 1);
            
            $(ele).css({
                left : xArray[i],
                top  : yArray[i]
            });
            
        });
        
        function animateText(){
            
            setTimeout(function(){
                
                frameCount++;
                
                $innerSpan.each(function(i, ele){
                    
                    var $ele = $(ele),
                        addXVal = xArray[i] / lastFrameCount * -1,
                            addYVal = yArray[i] / lastFrameCount * -1,
                                eleX = xArray[i] + addXVal * frameCount,
                                    eleY = yArray[i] + addYVal * frameCount;
                    
                    if(frameCount === lastFrameCount){
                        eleX = 0;
                        eleY = 0;
                    }
                    
                    $(ele).css({
                        left : eleX,
                        top  : eleY
                    });
                    
                });
                
                if(frameCount !== lastFrameCount){
                    animateText();
                }                    
                
            }, 25);
            
        }
        
        animateText();
        
    };
    
    $("#stringTranslate").stringTranslate();
    
})();