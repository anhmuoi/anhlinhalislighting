( function( $ ) {
    var pxl_widget_counter_handler = function( $scope, $ ) {
        elementorFrontend.waypoint($scope.find('.pxl--counter-value'), function () {
            var $number = $(this),
                data = $number.data();

            var decimalDigits = data.toValue.toString().match(/\.(.*)/);

            if (decimalDigits) {
                data.rounding = decimalDigits[1].length;
            }

            $number.numerator(data);
        }, {
            offset: '95%',
            triggerOnce: true
        });
    };

    $( window ).on( 'elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_counter.default', pxl_widget_counter_handler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_progressbar.default', pxl_widget_counter_handler );
    } );
} )( jQuery );