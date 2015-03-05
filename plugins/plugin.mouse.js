//<![CDATA[
;(function(window){

    window.LibreJs.Plugins.Mouse = {
        getPosition:function(event){
            var x = new Number();
            var y = new Number();
            var canvas = document.getElementById("demo");

            if (event.x != undefined && event.y != undefined)
            {
                x = event.x;
                y = canvas.height-event.y;
            }
            else // Firefox method to get the position
            {
                x = event.clientX + document.body.scrollLeft +
                document.documentElement.scrollLeft;
                y = canvas.height-event.clientY;

            }

            x -= canvas.offsetLeft;

            return {
                x:x,
                y:y
            };
        }
    };

})(window);
//]]>