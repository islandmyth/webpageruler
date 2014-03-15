webpageRuler = {
	version: '0.0.1',
    attach: function(ruler,minh,minw){
    	
    	//webpageRuler.init();
    	
        var resizer=ruler.resizer=document.getElementById("wpr-ruler-resizer");
        ruler.elemDetails =  document.getElementById('wpr-size-details');
        ruler.elemWidth = document.getElementById('wpr-wvalue');
        ruler.elemHeight = document.getElementById('wpr-hvalue');
        resizer.resizeParent=ruler;

        ruler.minh=minh||resizer.offsetHeight*2;
        ruler.minw=minw||resizer.offsetWidth*2;
        ruler.clientY = (!ruler.clientY)?0:ruler.clientY;
        ruler.clientX = (!ruler.clientX)?0:ruler.clientX;
        ruler.offsetY = ruler.clientY-parseInt(ruler.offsetTop);
        ruler.offsetX = ruler.clientX-parseInt(ruler.offsetLeft);
        
        //add listener        
        resizer.onmousedown = webpageRuler.resize;
        ruler.onmousedown = webpageRuler.drag;
    },

    resize: function(e){
        var e=e||window.event;
		e.cancelBubble=true;
        webpageRuler.ruler=this.resizeParent;
        this.lastx=e.clientX;
        this.lasty=e.clientY;
        document.onmousemove=webpageRuler.startResize;
        document.onmouseup=webpageRuler.end;
        return false;
    },
    
    drag: function(e){
        var e=e||window.event;
    	webpageRuler.ruler=this;
  		this.offsetY= e.clientY-parseInt(this.offsetTop);
		this.offsetX= e.clientX-parseInt(this.offsetLeft);
		document.onmousemove = webpageRuler.startdrag;
        document.onmouseup=webpageRuler.end;
		return false;
    },
    startdrag: function(e){
    	var e = e || window.event;
        var x,y,el,rs;
        el=webpageRuler.ruler;
        rs=el.resizer;
  		x = (e.clientX-el.offsetX);
  		y = (e.clientY-el.offsetY);

		el.style.top = y + "px";
		el.style.left = x + "px";
		
		el.elemDetails.style.top = y + "px";
		el.elemDetails.style.left = x + el.offsetWidth + 10 + "px"; 
        return false;
    },
    
    startResize: function(e){
        var e = e || window.event;
        var x,y,mx,my,el,rs,neww,newh;
        el=webpageRuler.ruler;
        rs=el.resizer;
        mx=e.clientX;
        my=e.clientY;
        x = (mx-el.offsetX);
  		y = (my-el.offsetY);
        neww=(el.clientWidth-(rs.lastx-mx));
        newh=(el.clientHeight-(rs.lasty-my));
		

        if(neww>=el.minw){
        	     
            el.style.width=neww+'px';
            rs.lastx=mx;
        }
        else{
            rs.lastx-=parseInt(el.style.width)-el.minw;
            el.style.width=el.minw+'px';
            neww = el.minw;
            
        }
        if(newh>=el.minh){
            el.style.height=newh+'px';
            rs.lasty=my;
        }
        else{
            rs.lasty-=parseInt(el.style.height)-el.minh;
            el.style.height=el.minh+'px';
            newh = el.minh;
        }
        
		el.elemDetails.style.top = el.offsetTop + "px";
		el.elemDetails.style.left = el.offsetLeft + neww + 10 + "px";
		 
		el.elemWidth.innerHTML = (neww +2);
		el.elemHeight.innerHTML = (newh +2);
		        
        return false;
        
        
    },
    init: function(){
		var x = window._content;
		var pageBody = x.document.getElementsByTagName("body")[0];  
		  	
		var isExists = x.document.getElementById("wpr-measure");
		if(isExists == null) {
			
			var divWrapper = x.document.createElement("div");
			divWrapper.setAttribute("id", "wpr-measure");
			
			var divRuler = x.document.createElement('div');
			divRuler.setAttribute("id", "wpr-ruler");			
			var divResizer = x.document.createElement('div');
			divResizer.setAttribute("id", "wpr-ruler-resizer");


			var divSize = x.document.createElement('div');
			divSize.setAttribute('id', "wpr-size-details");

			var spanHeight = x.document.createElement('span');
			spanHeight.setAttribute("id", "wpr-wvalue");
			
			var spanWidth = x.document.createElement('span');
			spanWidth.setAttribute("id", "wpr-hvalue");
			
			divSize.appendChild(spanWidth);
			divSize.appendChild(spanHeight);

			divRuler.appendChild(divResizer);
			
			divWrapper.appendChild(divRuler);
			divWrapper.appendChild(divSize);
			
			pageBody.appendChild(divWrapper);
			
			
		}
    },
    end: function(){
        document.onmouseup=null;
        document.onmousemove=null;
    }
};


window.onload=function(){webpageRuler.attach(document.getElementById('wpr-ruler'));}
