( function( $ ) {
    var pxl_widget_elementor_handler = function( $scope, $ ) {
        /* Button Effect */
        const createSVG = (width, height, radius) => {
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            const rectangle = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "rect"
                );
            svg.setAttributeNS(
                "http://www.w3.org/2000/svg",
                "viewBox",
                `0 0 ${width} ${height}`
                );
            rectangle.setAttribute("x", "0");
            rectangle.setAttribute("y", "0");
            rectangle.setAttribute("width", "100%");
            rectangle.setAttribute("height", "100%");
            rectangle.setAttribute("rx", `${radius}`);
            rectangle.setAttribute("ry", `${radius}`);
            rectangle.setAttribute("pathLength", "10");
            svg.appendChild(rectangle);
            return svg;
        };
        document.querySelectorAll(".btn-border-running").forEach((button) => {
            if (!button.querySelector(".lines")) {
                const style = getComputedStyle(button);
                const lines = document.createElement("div");
                lines.classList.add("lines");
                const groupTop = document.createElement("div");
                const groupBottom = document.createElement("div");
                const svg = createSVG(
                    button.offsetWidth,
                    button.offsetHeight,
                    parseInt(style.borderRadius, 10)
                    );
                groupTop.appendChild(svg);
                groupTop.appendChild(svg.cloneNode(true));
                groupTop.appendChild(svg.cloneNode(true));
                groupTop.appendChild(svg.cloneNode(true));

                groupBottom.appendChild(svg.cloneNode(true));
                groupBottom.appendChild(svg.cloneNode(true));
                groupBottom.appendChild(svg.cloneNode(true));
                groupBottom.appendChild(svg.cloneNode(true));

                lines.appendChild(groupTop);
                lines.appendChild(groupBottom);

                button.appendChild(lines);
                button.addEventListener("pointerenter", () => {
                    button.classList.add("start");
                });
                svg.addEventListener("animationend", () => {
                    button.classList.remove("start");
                });
            }
        });

        // Custom Section Parallax Effect
        function SectionBGParallax() {
            if ($scope.find('.pxl-elementor-bg-parallax').length) {
                var $scopePR = $scope;
                var lFollowX = 0,
                lFollowY = 0,
                x = 0,
                y = 0,
                friction = 1 / 30;

                function moveBackground() {
                    x += (lFollowX - x) * friction;
                    y += (lFollowY - y) * friction;

                    translate = 'translate(' + x + 'px, ' + y + 'px) scale(1.1)';

                    $scopePR.find('.pxl-elementor-bg-parallax .parallax-element').css({
                        '-webit-transform': translate,
                        '-moz-transform': translate,
                        'transform': translate
                    });

                    window.requestAnimationFrame(moveBackground);
                }

                $scopePR.on('mousemove', function (e) {
                    var $this = $(this);
                    var lMouseX = Math.max(-100, Math.min(100, $this.width() / 2 - e.clientX));
                    var lMouseY = Math.max(-100, Math.min(100, $this.height() / 2 - e.clientY));
                    lFollowX = (20 * lMouseX) / 100;
                    lFollowY = (10 * lMouseY) / 100;
                });

                moveBackground();
            }
        }

        SectionBGParallax();

        // Custom Grid Background Animation
        if (!$scope.find('.pxl-elementor-grid-ani').length && $scope.hasClass('pxl-section-grid-bg-yes')) {
            $scope.prepend('<div class="pxl-elementor-grid-ani"><div class="grid-element"></div></div>');
        }

        // Custom Draw SVG
        if ($scope.find('.slide-draw-svg').length) {
            var $gridItems = $scope.find('.slide-draw-svg svg'),
            pxl_scroll_top = $(window).scrollTop(),
            viewportBottom = pxl_scroll_top + $(window).height();

            $gridItems.each(function() {
                var $gridItem = $(this);
                var elementTop = $gridItem.offset().top;
                var elementBottom = elementTop + $gridItem.outerHeight();

                var $svgPaths = $gridItem.find('path');
                $svgPaths.each(function() {
                    var thisPath = $(this);
                    var pathLength = this.getTotalLength();
                    thisPath.attr('stroke-dasharray', pathLength);
                    thisPath.css("stroke-dashoffset", pathLength);

                    $(window).on('scroll', function () {
                        pxl_scroll_top = $(window).scrollTop();
                        viewportBottom = pxl_scroll_top + $(window).height();
                        elementTop = $gridItem.offset().top;
                        elementBottom = elementTop + $gridItem.outerHeight();
                        if (elementTop < viewportBottom && elementBottom > pxl_scroll_top) {
                            $gridItem.addClass('visible');
                            thisPath.css("stroke-dashoffset", 0);
                        } else {
                            $gridItem.removeClass('visible');
                            thisPath.css("stroke-dashoffset", pathLength);
                        }
                    });
                });

            });
        }

        if (window.elementorFrontend.isEditMode()) {

            $('a, input, button, .pxl-transtion').on('mouseover', function() {
                $(this).addClass('pxl-hover-transition');
            });

            $('.pxl-switch-button').on('mouseover', function() {
                $('a, input, button, .pxl-transtion').removeClass('pxl-hover-transition');
                $('.pxl-scroll-top').removeClass('pxl-hover-transition');
            });

            $('.pxl-parent-transition').each(function() {
                $(this).find('.pxl-transtion').addClass('pxl-hover-transition');
                $(this).hover(function() {
                    $(this).find('.pxl-transtion').addClass('pxl-hover-transition');
                });
                $('.pxl-switch-button').on('mouseover', function() {
                    $(this).find('.pxl-transtion').removeClass('pxl-hover-transition');
                });
            });

            $('.pxl-hidden-panel-button, .pxl-anchor-icon.custom').each(function () {
                $(this).hover(function () {
                    $(this).addClass("pxl-line-width");
                    setTimeout(function(){
                        $(".pxl-hidden-panel-button, .pxl-anchor-icon.custom").removeClass("pxl-line-width");
                    }, 600);
                });
            });

            $('.btn-default').each(function () {
                var mouseX = 0,
                mouseY = 0,
                z = $(this).find('svg path');
                $(this).mousemove(function(e) {
                    var offset = $(this).offset();
                    var mouseX = e.pageX - offset.left;
                    var mouseY = e.pageY - offset.top;
                    var translateX = mouseX - $(this).width() / 2;
                    var translateY = mouseY - $(this).height() / 2;
                    var zTransform = 'scale(' + (1 + (mouseX + mouseY) / ($(this).width() + $(this).height())) + ')';
                    z.css('transform', zTransform);
                });
                $(this).mouseleave(function() {
                    z.css('transform', 'none');
                });
            });

            $('.pxl-neon-glow').each(function(index) {
                var strongTags = $(this).find("strong");
                strongTags.each(function() {
                    var strongText = $(this).text();
                    var spanHtml = '';
                    for (var i = 0; i < strongText.length; i++) {
                        spanHtml += '<span class="highlight">' + strongText[i] + '</span>';
                    }
                    $(this).html(spanHtml);
                });

                var color = $(this).css('color');
                var keyframesName = 'pxl_neon_glows_' + index;
                var shadowSize = '3px';
                var style = '@keyframes ' + keyframesName + ' { 0% { color: ' + color + '; text-shadow: 0 0 ' + shadowSize + ' ' + color + '; } 100% { color: ' + color + '; text-shadow: 0 0 ' + shadowSize + ' ' + color + ', 0 0 ' + shadowSize + ' ' + color + ', 0 0 ' + shadowSize + ' ' + color + '; } }';
                var dynamicStyle = $('<style>').text(style);
                $('head').append(dynamicStyle);
                $(this).find('.highlight').css('animation', keyframesName + ' 1.5s ease-in-out infinite alternate');
            });

            var wobbleElements = document.querySelectorAll('.pxl-wobble');
            wobbleElements.forEach(function(el){
                el.addEventListener('mouseover', function(){
                    if(!el.classList.contains('animating') && !el.classList.contains('mouseover')){
                        el.classList.add('animating','mouseover');
                        var letters = el.innerText.split('');
                        setTimeout(function(){ el.classList.remove('animating'); }, (letters.length + 1) * 50);
                        var animationName = el.dataset.animation;
                        if(!animationName){ animationName = "pxl-jump"; }
                        el.innerText = '';
                        letters.forEach(function(letter){
                            if(letter == " "){
                                letter = "&nbsp;";
                            }
                            el.innerHTML += '<span class="letter">'+letter+'</span>';
                        });
                        var letterElements = el.querySelectorAll('.letter');
                        letterElements.forEach(function(letter, i){
                            setTimeout(function(){
                                letter.classList.add(animationName);
                            }, 50 * i);
                        });
                    }
                });
                el.addEventListener('mouseout', function(){
                    el.classList.remove('mouseover');
                });
            });

            $scope.hover(function () {
                if (!$scope.find('.pxl-grid-lines').length && $scope.hasClass('pxl-show-grid-yes')) {
                    $scope.append('<div class="pxl-grid-lines"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>');
                } else if ($scope.find('.pxl-grid-lines').length && $scope.hasClass('pxl-show-grid-none')) {
                    $scope.find('.pxl-grid-lines').remove();
                }
                if ($scope.find('.pxl-grid-lines').length && $scope.hasClass('pxl-grid-mobile-yes')) {
                    $scope.find('.pxl-grid-lines').addClass('grid-mobile');
                } else if ($scope.find('.pxl-grid-lines').length && $scope.hasClass('pxl-grid-mobile-none')) {
                    $scope.find('.pxl-grid-lines').removeClass('grid-mobile');
                }
            });

            $(window).on('scroll', function () {
                if (!$scope.find('.pxl-elementor-bg-scroll').length && $scope.hasClass('pxl-section-bg-scroll')) {
                    $scope.prepend('<div class="pxl-elementor-bg-scroll"><div class="scroll-element" data-parallax=\'{"y": -20}\'></div></div>');
                }
                if (!$scope.find('.pxl-elementor-bg-parallax').length && $scope.hasClass('pxl-section-bg-parallax')) {
                    $scope.prepend('<div class="pxl-elementor-bg-parallax"><div class="parallax-element"></div></div>');
                    SectionBGParallax();
                }
                if (!$scope.find('.pxl-elementor-grid-ani').length && $scope.hasClass('pxl-section-grid-bg-yes')) {
                    $scope.prepend('<div class="pxl-elementor-grid-ani"><div class="grid-element"></div></div>');
                }
                if ($scope.find('.pxl-elementor-grid-ani').length && !$scope.hasClass('pxl-section-grid-bg-yes')) {
                    $scope.find('.pxl-elementor-grid-ani').remove();
                }
            });

        }

    };

    function mrittik_section_start_render() {
        var _elementor = typeof elementor != 'undefined' ? elementor : elementorFrontend;
        _elementor.hooks.addFilter( 'pxl_section_start_render', function( html, settings, el ) {
            if((typeof settings.pxl_scroll_bg_img != 'undefined' && settings.pxl_scroll_bg_img.url != '') || (typeof settings.pxl_scroll_bg_img_dark != 'undefined' && settings.pxl_scroll_bg_img_dark.url != '')){
                html += '<div class="pxl-elementor-bg-scroll"><div class="scroll-element" data-parallax=\'{"y": -20}\'></div></div>';
            }
            if((typeof settings.pxl_parallax_bg_img != 'undefined' && settings.pxl_parallax_bg_img.url != '') ||(typeof settings.pxl_parallax_bg_img_dark != 'undefined' && settings.pxl_parallax_bg_img_dark.url != '')){
                html += '<div class="pxl-elementor-bg-parallax"><div class="parallax-element"></div></div>';
            }
            return html;
        } );
    }

    $( window ).on( 'elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction( 'frontend/element_ready/global', pxl_widget_elementor_handler );
        mrittik_section_start_render();
    } );
} )( jQuery );