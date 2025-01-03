( function( $ ) {

    var pxl_swiper_handler = function( $scope, $ ) {

        var breakpoints = elementorFrontend.config.breakpoints,
            carousel = $scope.find(".pxl-swiper-container");
        if(carousel.length == 0){
            return false;
        }

        /* Thumbs Slider */
        var galleryThumbs = new Swiper('.pxl-swiper-thumbs', {
            spaceBetween: 0,
            slidesPerView: 1,
            freeMode: true,
            allowTouchMove: true,
            watchSlidesProgress: true,
            centeredSlides: false,
            loop: false,
        });

        var numSlides = carousel.find(".pxl-swiper-slide").length;

        /* Main Slider */
        var data = carousel.data(),
            settings = data.settings,
            carousel_settings = {
                direction: settings['slide_direction'],
                effect: settings['slide_mode'],
                wrapperClass : 'pxl-swiper-wrapper',
                slideClass: 'pxl-swiper-slide',
                slidesPerView: settings['slides_to_show'],
                slidesPerGroup: settings['slides_to_scroll'],
                slidesPerColumn: settings['slide_percolumn'],
                spaceBetween: 0,
                navigation: {
                    nextEl: $scope.find(".pxl-swiper-arrow-next"),
                    prevEl: $scope.find(".pxl-swiper-arrow-prev"),
                },
                pagination : {
                    el: $scope.find(".pxl-swiper-dots"),
                    clickable : true,
                    dynamicBullets: true,
                    modifierClass: 'pxl-swiper-pagination-',
                    bulletClass : 'pxl-swiper-pagination-bullet',
                    renderCustom: function (swiper, element, current, total) {
                        return current + ' of ' + total;
                    },
                    type: settings['pagination_type'],
                },
                speed: settings['speed'],
                watchSlidesProgress: true,
                watchSlidesVisibility: true,
                breakpoints: {
                    0 : {
                        slidesPerView: settings['slides_to_show_xs'],
                        slidesPerGroup: settings['slides_to_scroll'],
                    },
                    576 : {
                        slidesPerView: settings['slides_to_show_sm'],
                        slidesPerGroup: settings['slides_to_scroll'],
                    },
                    768 : {
                        slidesPerView: settings['slides_to_show_md'],
                        slidesPerGroup: settings['slides_to_scroll'],
                    },
                    992 : {
                        slidesPerView: settings['slides_to_show_lg'],
                        slidesPerGroup: settings['slides_to_scroll'],
                    },
                    1200 : {
                        slidesPerView: settings['slides_to_show'],
                        slidesPerGroup: settings['slides_to_scroll'],
                    },
                    1600 : {
                        slidesPerView: settings['slides_to_show_xxl'],
                        slidesPerGroup: settings['slides_to_scroll'],
                    }
                }
            };
            // parallax
            if(settings['parallax'] === 'true'){
                carousel_settings['parallax'] = true;
            }
            // center
            if(settings['center'] === 'true'){
                if (numSlides % 2 === 0) {
                    carousel_settings['centeredSlides'] = false;
                } else {
                    carousel_settings['centeredSlides'] = true;
                    carousel_settings['initialSlide'] = Math.floor(numSlides / 2);
                }
            }
            // effect
            if(settings['slide_mode'] === 'fade'){
                carousel_settings['fadeEffect'] = {
                    crossFade: true
                };
            }
            // loop
            if(settings['loop'] === 'true'){
                carousel_settings['loop'] = true;
            }
            // auto play
            if(settings['autoplay'] === 'true'){
                carousel_settings['autoplay'] = {
                    delay : settings['delay'],
                    disableOnInteraction : settings['pause_on_interaction']
                };
            } else {
                carousel_settings['autoplay'] = false;
            }
            // mouse wheel
            if(settings['mousewheel'] === 'true'){
                carousel_settings['mousewheel'] = true;
                carousel_settings['keyboard'] = {
                    enabled: true
                };
            }
            // space between
            if(settings['space_between'] === 'true'){
                carousel_settings['breakpoints'] = {
                    0 : {
                        slidesPerView: settings['slides_to_show_xs'],
                        slidesPerGroup: settings['slides_to_scroll'],
                        spaceBetween: 0,
                    },
                    576 : {
                        slidesPerView: settings['slides_to_show_sm'],
                        slidesPerGroup: settings['slides_to_scroll'],
                        spaceBetween: 0,
                    },
                    768 : {
                        slidesPerView: settings['slides_to_show_md'],
                        slidesPerGroup: settings['slides_to_scroll'],
                        spaceBetween: 0,
                    },
                    992 : {
                        slidesPerView: settings['slides_to_show_lg'],
                        slidesPerGroup: settings['slides_to_scroll'],
                        spaceBetween: 0,
                    },
                    1199 : {
                        slidesPerView: settings['slides_to_show'],
                        slidesPerGroup: settings['slides_to_scroll'],
                        spaceBetween: 0,
                    },
                    1200 : {
                        slidesPerView: settings['slides_to_show'],
                        slidesPerGroup: settings['slides_to_scroll'],
                        spaceBetween: -350,
                    },
                    1400 : {
                        slidesPerView: settings['slides_to_show'],
                        slidesPerGroup: settings['slides_to_scroll'],
                        spaceBetween: -500,
                    },
                    1600 : {
                        slidesPerView: settings['slides_to_show_xxl'],
                        slidesPerGroup: settings['slides_to_scroll'],
                        spaceBetween: -600,
                    },
                    1800 : {
                        slidesPerView: settings['slides_to_show'],
                        slidesPerGroup: settings['slides_to_scroll'],
                        spaceBetween: -825,
                    },
                }
            }
            if(settings['space_between2'] === 'true'){
                carousel_settings['breakpoints'] = {
                    0 : {
                        slidesPerView: settings['slides_to_show_xs'],
                        slidesPerGroup: settings['slides_to_scroll'],
                        spaceBetween: 0,
                    },
                    576 : {
                        slidesPerView: settings['slides_to_show_sm'],
                        slidesPerGroup: settings['slides_to_scroll'],
                        spaceBetween: 0,
                    },
                    768 : {
                        slidesPerView: settings['slides_to_show_md'],
                        slidesPerGroup: settings['slides_to_scroll'],
                        spaceBetween: 0,
                    },
                    992 : {
                        slidesPerView: settings['slides_to_show_lg'],
                        slidesPerGroup: settings['slides_to_scroll'],
                        spaceBetween: 0,
                    },
                    1199 : {
                        slidesPerView: settings['slides_to_show'],
                        slidesPerGroup: settings['slides_to_scroll'],
                        spaceBetween: 0,
                    },
                    1200 : {
                        slidesPerView: settings['slides_to_show'],
                        slidesPerGroup: settings['slides_to_scroll'],
                        spaceBetween: -450,
                    },
                    1400 : {
                        slidesPerView: settings['slides_to_show'],
                        slidesPerGroup: settings['slides_to_scroll'],
                        spaceBetween: -600,
                    },
                    1600 : {
                        slidesPerView: settings['slides_to_show_xxl'],
                        slidesPerGroup: settings['slides_to_scroll'],
                        spaceBetween: -800,
                    },
                    1800 : {
                        slidesPerView: settings['slides_to_show'],
                        slidesPerGroup: settings['slides_to_scroll'],
                        spaceBetween: -1025,
                    },
                }
            }

        carousel.each(function(index, element) {

            if($(this).closest('.pxl-swiper-sliders').find('.pxl-swiper-thumbs').length > 0){
                carousel_settings['thumbs'] = { swiper: galleryThumbs };
            }
            if ($('.pxl-slider-carousel5').length > 0) {
                carousel_settings.allowTouchMove = false;
            }
            if ($('.pxl-gallery-carousel2').length > 0) {
                carousel_settings['slidesPerView'] = 'auto';
                carousel_settings['autoplay'] = {
                    delay: 0,
                };
                if(settings['reverse'] === 'true'){
                    carousel_settings['autoplay'] = {
                        reverseDirection: true
                    };
                };
            }

            var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            if ($('.pxl-slider-carousel2').length > 0) {
                carousel_settings.allowTouchMove = isMobile;
            }

            var swiper = new Swiper(carousel, carousel_settings);

            if(settings['autoplay'] === 'true' && settings['pause_on_hover'] === 'true'){
                $(this).on({
                    mouseenter: function mouseenter() {
                        this.swiper.autoplay.stop();
                    },
                    mouseleave: function mouseleave() {
                        this.swiper.autoplay.start();
                    }
                });
            }

            if (swiper && swiper.slides) {
                var slideCount = swiper.slides.length;
                if (slideCount <= 1) {
                    swiper.allowSlideNext = false;
                    swiper.allowSlidePrev = false;
                }
            }

            $('.pxl-testimonial-carousel').each(function() {
                var $this = $(this);
                swiper.on('slideNextTransitionStart', function() {
                    $this.addClass('pxl-slider-next-transition');
                    swiper.allowTouchMove = false;
                });
                swiper.on('slidePrevTransitionStart', function() {
                    $this.addClass('pxl-slider-prev-transition');
                    swiper.allowTouchMove = false;
                });
                swiper.on('transitionEnd', function() {
                    $this.removeClass('pxl-slider-next-transition');
                    $this.removeClass('pxl-slider-prev-transition');
                    setTimeout(function () {
                        swiper.allowTouchMove = true;
                    }, settings['speed']);
                });
            });

            if($scope.find('.pxl-slider-carousel1.style2').length > 0) {
                var postSlider = $scope.find('.pxl-slider-carousel1.style2');
                postSlider.each(function () {
                    $thisSlide = $(this);
                    $thisSlide.closest('section').prepend('<div class="pxl-elementor-slide-grid"><div class="grid-element"></div></div>');
                    swiper.on('slideNextTransitionStart', function() {
                        $thisSlide.addClass('slide-next');
                        $thisSlide.closest('section').find('.pxl-elementor-slide-grid').addClass('slide-next');
                    });
                    swiper.on('slidePrevTransitionStart', function() {
                        $thisSlide.addClass('slide-prev');
                        $thisSlide.closest('section').find('.pxl-elementor-slide-grid').addClass('slide-prev');
                    });
                    swiper.on('slideChangeTransitionStart', function() {
                        swiper.allowTouchMove = false;
                        $thisSlide.addClass('pxl-pointerev-none');
                    });
                    swiper.on('slideChangeTransitionEnd', function() {
                        setTimeout(function () {
                            swiper.allowTouchMove = true;
                            $thisSlide.removeClass('slide-next slide-prev pxl-pointerev-none');
                            $thisSlide.closest('section').find('.pxl-elementor-slide-grid').removeClass('slide-next slide-prev');
                        }, 200);
                    });

                    $thisSlide.hover(function () {
                        var slideImgs = $thisSlide.find('.pxl-img-zoompan .pxl-item--image');
                        slideImgs.each(function () {
                            $thisImg = $(this);
                            $thisImg
                            .on('mouseover', function(){
                                $(this).children('.item--image').css({'transform': 'scale('+ $(this).children('.item--image').attr('data-scale') +')'});
                            })
                            .on('mouseout', function(){
                                $(this).children('.item--image').css({'transform': 'scale(1)'});
                            })
                            .on('mousemove', function(e){
                                $(this).children('.item--image').css({'transform-origin': ((e.pageX - $(this).offset().left) / $(this).width()) * 100 + '% ' + ((e.pageY - $(this).offset().top) / $(this).height()) * 100 +'%'});
                            })
                        });
                    });

                });
            }

            $scope.find(".swiper-filter-wrap .filter-item").on("click", function(){
                var target = $(this).attr('data-filter-target');
                var parent = $(this).closest('.pxl-swiper-sliders');
                $(this).siblings().removeClass("active");
                $(this).addClass("active");

                if(target == "all"){
                    parent.find("[data-filter]").removeClass("non-swiper-slide").addClass("swiper-slide-filter");
                    swiper.destroy();
                    swiper = new Swiper(carousel, carousel_settings);
                } else {
                    parent.find(".swiper-slide-filter").not("[data-filter^='"+target+"'], [data-filter*=' "+target+"']").addClass("non-swiper-slide").removeClass("swiper-slide-filter");
                    parent.find("[data-filter^='"+target+"'], [data-filter*=' "+target+"']").removeClass("non-swiper-slide").addClass("swiper-slide-filter");
                    swiper.destroy();
                    swiper = new Swiper(carousel, carousel_settings);
                }
            });

            $('.swiper-filter-wrap').parents('.pxl-swiper-sliders').addClass('swiper-filter-active');

            /* Slider Vertical */
            if (window.elementorFrontend.isEditMode()) {
                $scope.find('.pxl-slider-carousel2').each(function () {
                    var $this = $(this),
                    swiper_container = $this.find('.pxl-swiper-container'),
                    swiper_slide = $this.find('.pxl-swiper-slide'),
                    content_wrapper = $this.find('.content--wrapper');

                    function adjustHeight() {
                        var bodyheight = $(window).height();
                        swiper_slide.height(bodyheight);
                    }
                    setInterval(adjustHeight, 1000);

                    $(window).on("resize", function() {
                        var bodyheight = $(this).height();
                        $this.height(bodyheight);
                        swiper_container.height(bodyheight);

                        var elementHeight = content_wrapper.height();
                        if (elementHeight > bodyheight) {
                            var scaleRatio = bodyheight / elementHeight / 1.3;
                            content_wrapper.css("transform", "scale(" + scaleRatio + ")");
                        } else {
                            content_wrapper.css("transform", "none");
                        }
                    }).resize();
                });

            }

        });

    };

    // Make sure you run this code under Elementor.
    $( window ).on( 'elementor/frontend/init', function() {
        // Swipers
        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_testimonial_carousel.default', pxl_swiper_handler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_team_carousel.default', pxl_swiper_handler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_gallery_carousel.default', pxl_swiper_handler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_slider_carousel.default', pxl_swiper_handler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_post_carousel.default', pxl_swiper_handler );
    } );
} )( jQuery );