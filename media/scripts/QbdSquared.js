(function(window, document, undefined){
    
    var QS = (function(options){
        this.defaults = {};
        
        this.selected=false;
        this.mouseX;
        this.mouseY;
        this.cubeNum=0;
        
        var requestAnimationFrame  =    window.requestAnimationFrame || 
                                        window.mozRequestAnimationFrame || 
                                        window.webkitRequestAnimationFrame || 
                                        window.msRequestAnimationFrame;
        
        this.applyOptions = function(defaults, options){
            for(var s in options) {
                try{
                    if(options[s].constructor === Object)
                        defaults[s] = applyOptions(defaults[s], options[s]);
                    else
                        defaults[s] = options[s];
                }catch (e) {
                    defaults[s] = options[s];
                }
            }
            return defaults;
        };
        
        this.init = function(options){
            if(options){
                this.settings = (options) ? this.applyOptions(this.defaults, options) : defaults;
                
                this.buildVariables();
                this.generateGrid();
                
                return this;
            }else{
                // default options
                alert("no options");
            }
            
            if(window === this)
                return new QS(options);
            
        };
        
        this.buildVariables = function(){
            var options = this.settings.options;
            this.el = document.getElementsByClassName(options[0].element || "QbdSquared")[0];
            this.width = this.el.innerWidth; 
            this.height = this.el.innerHeight;
            this.halfWidth = this.width/2;
            this.halfHeight = this.height/2;
            this.unit = options[0].CubeUnit;
            console.log(this.unit);
        };
        
        this.generateGrid = function(){
            var options = this.settings.options;
            var layerTotal = options[0].GridSize[1]*options[0].GridSize[2];
            for(var a=0;a<options[0].GridSize[0]; a++){
                for(var b=0;b<options[0].GridSize[1]; b++){
                    for(var c=0;c<options[0].GridSize[2]; c++){
                        this.cubeNum++;
                        if(options[0].Layers[a][b][c]!==0){
                            var colorNum = options[0].Layers[a][b][c] - 1;
                            this.html.cube(this.cubeNum,this.el);
                            var cubeSize = options[0].CubeSize;
                            this.shape.position(c*cubeSize,a*cubeSize,b*cubeSize,this.cubeNum,this.unit);
                            var color = options[0].CubeColors;
                            this.shape.color(this.cubeNum,colorNum,color);
            }   }   }   }
        };
        
        this.shape = {
            position: function(x,y,z,cubeNum,u){
                document.getElementsByClassName(cubeNum)[0].style.transform = 'translate3d('+x+u+','+y+u+','+z+u+')';
            },
            color: function(cubeNum,colorNum,color){
                document.getElementsByClassName(cubeNum)[0].style.backgroundColor = "rgba("+color[colorNum][0]+","+color[colorNum][1]+","+color[colorNum][2]+","+color[colorNum][3]+")";
            }
        };
        
        this.html = {
            cube: function (x,el){
                var html = '<div class="cube '+ x +'">';
                    html += '<div class="side  front"></div>';
                    html += '<div class="side   back"></div>';
                    html += '<div class="side  left"></div>';
                    html += '<div class="side  right"></div>';
                    html += '<div class="side    top"></div>';
                    html += '<div class="side bottom"></div>';
                    html += '</div>';
                    
                el.innerHTML += html;
            }
        };
        
        this.mouseDown = function(e){
            this.selected = true;
            console.log("selected: "+this.selected);
        };
        
        this.mouseUp = function(){
            this.selected = false;
            console.log("selected: "+this.selected);
        };
        
        this.mouseMove = function(e){
            if(this.selected){
                this.mouseX = (this.halfWidth - e.clientX) * .1;
                this.mouseY = (this.halfHeight - e.clientY) * .1; 
                console.log("Mouse Position: "+this.mouseX+this.mouseY);
            }
        };
        
        // view port checker. True if element is visible at all
        this.inViewPort = function(i) {
            var top = i.offsetTop, left = i.offsetLeft, width = i.offsetWidth, height = i.offsetHeight;
            while(i.offsetParent) {
                i = i.offsetParent;
                top += i.offsetTop;
                left += i.offsetLeft;
            }
            return (
                top >= window.pageYOffset - height &&
                left >= window.pageXOffset - width &&
                (top + height) <= (window.pageYOffset + window.innerHeight + height) &&
                (left + width) <= (window.pageXOffset + window.innerWidth + width)
            );
        };
        
        return this.init(options);
    });
    
QS.prototype = {
       
};
    window.QS = QS;
})( window , document );

var QbdSquared = new QS({
    options: [
        {
            element: "QbdSquared",
            easeFunction: "linear",
            GridSize: [5,5,5],
            CubeSize: 2,
            CubeUnit: 'em',
            CubeColors: [
                            [156,2,2,.5],
                            [169,167,19,.5],
                            [12,69,105,.5],
                            [169,75,19,.5],
                            [75,232,45,.5]
                        ],
            Layers: [ 
                     [
                         [0,0,1,0,0],
                         [0,0,0,0,0],
                         [0,0,0,0,0],
                         [0,0,0,0,0],
                         [0,0,0,0,0]
                     ],
                     
                     [
                         [0,0,0,0,0],
                         [0,0,0,1,0],
                         [0,0,0,0,0],
                         [0,0,0,0,0],
                         [0,0,0,0,0]
                     ],
                     
                    [
                         [0,0,0,0,0],
                         [0,0,0,0,0],
                         [0,0,0,0,1],
                         [0,0,0,0,0],
                         [0,0,0,0,0]
                     ],
                     
                     [
                         [0,0,0,0,0],
                         [0,0,0,0,0],
                         [0,0,0,0,0],
                         [0,0,0,1,0],
                         [0,0,0,0,0]
                     ],
                     
                     [
                         [0,0,0,0,0],
                         [0,0,0,0,0],
                         [0,0,0,0,0],
                         [0,0,0,0,0],
                         [0,0,1,0,0]
                     ]
                   ]
        }
    ]
});