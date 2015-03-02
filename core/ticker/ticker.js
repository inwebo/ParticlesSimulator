//<![CDATA[
;(function(window){
    window.LibreJs.Plugins.Ticker = function(tickInterval){
        var plugin              = this;
        /**
         * Milliseconds
         * @type {*|number}
         */
        plugin.tickInterval     = tickInterval || 500;
        plugin.ticks            = 0;
        plugin.timestamp        = 0;
        plugin.interval         = 0;

        var init = function(){

        };

        //region Helpers
        plugin.resetInterval = function(){
            plugin.interval = 0;
        };

        plugin.step = function(timestamp){
            plugin.interval += Math.floor(timestamp - plugin.timestamp);
            if(plugin.isTicking()) {
                plugin.ticks++;
            }
        };

        plugin.setTimestamp = function(timestamp){
            plugin.timestamp = timestamp;
        };

        plugin.isTicking = function(){
            return (plugin.interval > plugin.tickInterval);
        };

        init();

    };

})(window);
//]]>