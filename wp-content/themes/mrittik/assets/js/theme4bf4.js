;(function ($) {
    "use strict";
    var pxl_scroll_top;
    var pxl_window_width;
    var pxl_window_height;
    var pxl_scroll_status = '';
    var pxl_last_scroll_top = 0;

    $(window).on('load', function () {
        pxl_scroll_top = $(window).scrollTop();
        pxl_window_width = $(window).width();
        pxl_window_height = $(window).height();
        mrittik_loader();
        mrittik_header_sticky();
        mrittik_scroll_to_top();
        mrittik_footer_fixed();
        mrittik_quantity_icon();
        mrittik_panel_anchor_toggle();
        mrittik_document_click();
        mrittik_product_single_variations_att();
        mrittik_tab_carousel();
        mrittik_check_scroll();
        mrittik_grid_effects();
        mrittik_webgl_effects();
        mrittik_functions();
        mrittik_functions_rsz();
        setTimeout(function () {
            mrittik_post_grid();
        }, 500);
    });

    $(window).on('resize', function () {
        pxl_window_width = $(window).width();
        pxl_window_height = $(window).height();
        mrittik_post_grid();
        mrittik_grid_effects();
        mrittik_functions_rsz();
    });

    $(window).on('scroll', function () {
        pxl_scroll_top = $(window).scrollTop();
        pxl_window_width = $(window).width();
        pxl_window_height = $(window).height();
        if (pxl_scroll_top < pxl_last_scroll_top) {
            pxl_scroll_status = 'up';
        } else {
            pxl_scroll_status = 'down';
        }
        pxl_last_scroll_top = pxl_scroll_top;
        mrittik_header_sticky();
        mrittik_scroll_to_top();
        mrittik_footer_fixed();
        mrittik_check_scroll();

        $('.page-section').each(function(i) {
            if ($(this).position().top <= pxl_scroll_top + 50) {
                $('.pxl-header-elementor-main .pxl-menu-primary > li > a.page-active').removeClass('page-active');
                $('.pxl-header-elementor-sticky .pxl-nav-menu .pxl-menu-primary > li > a.page-active').removeClass('page-active');
                $('.pxl-header-elementor-main .pxl-menu-primary > li > a').eq(i).addClass('page-active');
                $('.pxl-header-elementor-sticky .pxl-nav-menu .pxl-menu-primary > li > a').eq(i).addClass('page-active');
            }
        });

    });

    $(document).ready(function () {
        mrittik_lightdark_switch();

        /* Slider Vertical */
        $('.pxl-slider-carousel2').each(function () {
            var $this = $(this);
            var swiper_container = $(this).find('.pxl-swiper-container');
            var content_wrapper = $(this).find('.content--wrapper');
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

        /* Menu Responsive Dropdown */
        var $mrittik_menu = $('.pxl-header-elementor-main');
        $mrittik_menu.find('.pxl-menu-primary li').each(function () {
            var $mrittik_submenu = $(this).find('> ul.sub-menu');
            if ($mrittik_submenu.length == 1) {
                $(this).hover(function () {
                    if ($mrittik_submenu.offset().left + $mrittik_submenu.width() > $(window).width()) {
                        $mrittik_submenu.addClass('pxl-sub-reverse');
                    } else if ($mrittik_submenu.offset().left < 0) {
                        $mrittik_submenu.addClass('pxl-sub-reverse');
                    }
                }, function () {
                    $mrittik_submenu.removeClass('pxl-sub-reverse');
                });
            }
        });

        /* Active Menu Header */
        $('.pxl-header-elementor-main .pxl-menu-primary .menu-item, .pxl-header-elementor-sticky .pxl-menu-primary .menu-item').each(function () {
            $(this).hover(function () {
                $(this).addClass('active').siblings('li').removeClass("active");
            });
            $(this).find('.sub-menu').hover(function () {
                $(this).parent().addClass("active");
            });
            $(this).parents('section').mouseleave(function() {
                setTimeout(function () {
                    $('.pxl-menu-primary .menu-item').removeClass("active");
                }, 500);
            });
        });

        /* Start Menu Mobile */
        $('.pxl-header-menu li.menu-item-has-children, .pxl-nav-hidden li.menu-item-has-children, .pxl-menu-primary li.menu-item-has-children').append('<span class="pxl-menu-toggle"></span>');
        $('.pxl-menu-toggle').on('click', function () {
            if( $(this).hasClass('active')){
                $(this).closest('ul').find('.pxl-menu-toggle.active').toggleClass('active');
                $(this).closest('ul').find('.sub-menu.active').toggleClass('active').slideToggle();
                $(this).closest('ul').find('a.active').toggleClass('active');
            }else{
                $(this).closest('ul').find('.pxl-menu-toggle.active').toggleClass('active');
                $(this).closest('ul').find('.sub-menu.active').toggleClass('active').slideToggle();
                $(this).closest('ul').find('a.active').toggleClass('active');
                $(this).toggleClass('active');
                $(this).parent().find('> .sub-menu').toggleClass('active');
                $(this).parent().find('> .sub-menu').slideToggle();
                $(this).parent().find('> a').toggleClass('active');
            }
        });
        $('.menu-parallax > li > a > span').on('click', function () {
            if( $(this).parent().hasClass('active')){
                $(this).closest('ul').find('.pxl-menu-toggle.active').toggleClass('active');
                $(this).closest('ul').find('.sub-menu.active').toggleClass('active').slideToggle();
                $(this).closest('ul').find('a.active').toggleClass('active');
            }else{
                $(this).closest('ul').find('.pxl-menu-toggle.active').toggleClass('active');
                $(this).closest('ul').find('.sub-menu.active').toggleClass('active').slideToggle();
                $(this).closest('ul').find('a.active').toggleClass('active');
                $(this).parent().toggleClass('active');
                $(this).parents('li').find('> .pxl-menu-toggle').toggleClass('active');
                $(this).parents('li').find('> .sub-menu').toggleClass('active');
                $(this).parents('li').find('> .sub-menu').slideToggle();
            }
        });
        $('.menu-parallax .sub-menu > li > a, .menu-vertical .sub-menu > li > a').on('click', function () {
            $(this).toggleClass('active');
            $(this).closest('li').find('> .pxl-menu-toggle').toggleClass('active');
            $(this).closest('li').find('> .sub-menu').toggleClass('active');
            $(this).closest('li').find('> .sub-menu').slideToggle();
        });
        $('.menu-vertical > li > a').on('click', function () {
            if( $(this).hasClass('active')){
                $(this).closest('ul').find('.pxl-menu-toggle.active').toggleClass('active');
                $(this).closest('ul').find('.sub-menu.active').toggleClass('active').slideToggle();
                $(this).closest('ul').find('a.active').toggleClass('active');
            }else{
                $(this).closest('ul').find('.pxl-menu-toggle.active').toggleClass('active');
                $(this).closest('ul').find('.sub-menu.active').toggleClass('active').slideToggle();
                $(this).closest('ul').find('a.active').toggleClass('active');
                $(this).toggleClass('active');
                $(this).parents('li').find('> .pxl-menu-toggle').toggleClass('active');
                $(this).parents('li').find('> .sub-menu').toggleClass('active');
                $(this).parents('li').find('> .sub-menu').slideToggle();
            }
        });
        $("#pxl-nav-mobile").on('click', function () {
            $(this).toggleClass('active');
            $('.pxl-header-menu').toggleClass('active');
        });

        $(".pxl-menu-close, .pxl-header-menu-backdrop").on('click', function () {
            $(this).parents('.pxl-header-main').find('.pxl-header-menu').removeClass('active');
            $('#pxl-nav-mobile').removeClass('active');
        });
        /* End Menu Mobile */

        if($('div').hasClass('px-header--transparent')) {
            $('#pxl-wapper').css({
                "position": "relative",
            });
        }

        /* Scroll To Top */
        $('.pxl-scroll-top').click(function () {
            $('html, body').animate({scrollTop: 0});
            return false;
        });

        /* Animate Time Delay */
        $('.pxl-grid-masonry').each(function () {
            var eltime = 100;
            var elt_inner = $(this).children().length;
            var _elt = elt_inner - 1;
            $(this).find('> .pxl-grid-item > .wow').each(function (index, obj) {
                $(this).css('animation-delay', eltime + 'ms');
                if (_elt === index) {
                    eltime = 100;
                    _elt = _elt + elt_inner;
                } else {
                    eltime = eltime + 60;
                }
            });
        });

        $('.pxl-item--text').each(function () {
            var pxl_time = 0;
            var pxl_item_inner = $(this).children().length;
            var _elt = pxl_item_inner - 1;
            $(this).find('> .pxl-text--slide > .wow').each(function (index, obj) {
                $(this).css('transition-delay', pxl_time + 'ms');
                if (_elt === index) {
                    pxl_time = 0;
                    _elt = _elt + pxl_item_inner;
                } else {
                    pxl_time = pxl_time + 80;
                }
            });
        });

        /* Nice Select */
        $('.pxl-nice-select, .woocommerce .woocommerce-ordering .orderby, #wp-block-archives-1, #wp-block-categories-1, .woocommerce div.product form.cart .variations select, #pxl-sidebar-area select').each(function () {
            $(this).niceSelect();
        });

        /* Comment Form */
        var inputElement = $('.comment-respond .form-submit input.submit');
        var buttonElement = $('<button>', {
            name: inputElement.attr('name'),
            id: inputElement.attr('id'),
            class: inputElement.attr('class'),
            type: inputElement.attr('type'),
            text: inputElement.val()
        });
        inputElement.replaceWith(buttonElement);

        /* Related Post - Slick Slider */
        const postSlider = $(".pxl-related-post .pxl-related-post-inner, .pxl-related-portfolio .pxl-related-post-inner");
        postSlider
        .slick({
            dots: false,
            infinite: true,
            arrows: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 2000,
            cssEase: 'linear',
            responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
            ]
        });
        if ($('body').hasClass('rtl')) {
            postSlider.slick('slickSetOption', 'rtl', true);
        }

        /* Custom Widget */
        $(".widget.widget_search input").attr('required', true);

        /* Custom Woocommerce */
        $('.woocommerce .woocommerce-summary-wrap.row.style1').parents('.product').addClass('pxl-product-page-style1');
        $('.woocommerce .woocommerce-summary-wrap.row.style2').parents('.product').addClass('pxl-product-page-style2');

        $(".woocommerce .pxl-wapper #pxl-main .pxl-content-product .woosc-quick-table").remove();
        $(".woocommerce ul.products li.product > .woosc-btn, .woocommerce ul.products li.product > .woosq-btn, .woocommerce ul.products li.product > .woosw-btn").remove();
        $(".single-product #primary div.product .entry-summary > button").remove();

        $('.add_to_cart_button').attr('title', 'Add To Cart');
        $('.product_type_grouped').attr('title', 'View Product');
        $('.product_type_external').attr('title', 'Shop Now');
        $('.woosw-btn').attr('title', 'Add To Wishlist');
        $('.woosq-btn').attr('title', 'Quick View');
        $('.woosc-btn').attr('title', 'Compare');

        $(".woocommerce-shop .widget_layered_nav .wc-layered-nav-term").on('click', function(e) {
            $(this).addClass('active').siblings('li').removeClass("active");
        });

        if ($('form').hasClass('woocommerce-form woocommerce-form-login login')) {
            var labelUsername = $(this).find('label[for="username"]').text().trim().toUpperCase();
            $(this).find('label[for="username"]').text('');
            $(this).find('#username').attr('placeholder', labelUsername);
            var labelPassword = $(this).find('label[for="password"]').text().trim().toUpperCase();
            $(this).find('label[for="password"]').text('');
            $(this).find('#password').attr('placeholder', labelPassword);
        }

        // Custom Add space in the end price currency
        $('.woocommerce-Price-currencySymbol').each(function() {
            var $el = $(this);
            var string = $el.text();
            $el.text('');
            var result = string.trim() + " ";
            $el.html(result);
        });

        // Custom move section shop single
        var productPage = $('.woocommerce .product.pxl-product-page-style2');

        var wooTabsWrapper = productPage.find('.woocommerce-tabs.wc-tabs-wrapper');
        var originalTabs = wooTabsWrapper.clone();
        wooTabsWrapper.remove();
        productPage.find('.woocommerce-summary-wrap .woocommerce-gallery + div').append(originalTabs);

        var tabMappings = [
            { tabName: 'description_tab', panelClass: 'woocommerce-Tabs-panel--description' },
            { tabName: 'additional_information_tab', panelClass: 'woocommerce-Tabs-panel--additional_information' },
            { tabName: 'tab-product-feature_tab', panelClass: 'woocommerce-Tabs-panel--tab-product-feature' },
            { tabName: 'reviews_tab', panelClass: 'woocommerce-Tabs-panel--reviews' }
            ];

        $.each(tabMappings, function(index, mapping) {
            var tabElement = productPage.find('.wc-tabs .' + mapping.tabName);
            var panelElement = originalTabs.find('.woocommerce-Tabs-panel.' + mapping.panelClass).clone();
            originalTabs.find('.woocommerce-Tabs-panel.' + mapping.panelClass).remove();
            tabElement.append(panelElement);
        });

        /* Search Popup */
        var $search_wrap_init = $("#pxl-search-popup");
        var search_field = $('#pxl-search-popup .search-field');
        var $body = $('body');

        $(".pxl-search-popup-button").on('click', function(e) {
            if (!$search_wrap_init.hasClass('active')) {
                $search_wrap_init.addClass('active');
                setTimeout(function() { search_field.get(0).focus(); }, 500);
            } else if (search_field.val() === '') {
                $search_wrap_init.removeClass('active');
                search_field.get(0).focus();
            }
            e.preventDefault();
            return false;
        });

        $("#pxl-search-popup .pxl-item--overlay, #pxl-search-popup .pxl-item--close").on('click', function (e) {
            $body.addClass('pxl-search-out-anim');
            setTimeout(function () {
                $body.removeClass('pxl-search-out-anim');
            }, 600);
            setTimeout(function () {
                $search_wrap_init.removeClass('active');
            }, 600);
            e.preventDefault();
            return false;
        });


        /* Lightbox Popup */
        $('.btn-video, .pxl-video-popup').magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });

        /* Nav Logo */
        $(".pxl-nav-button").on('click', function () {
            $(this).toggleClass('active');
            $(this).parent().find('.pxl-nav-wrap').toggle(400);
        });

        /* Select Theme Style */
        $('.wpcf7-select').each(function() {
            var $this = $(this), numberOfOptions = $(this).children('option').length;

            $this.addClass('pxl-select-hidden');
            $this.wrap('<div class="pxl-select"></div>');
            $this.after('<div class="pxl-select-higthlight"></div>');

            var $styledSelect = $this.next('div.pxl-select-higthlight');
            $styledSelect.text($this.children('option').eq(0).text());

            var $list = $('<ul />', {
                'class': 'pxl-select-options'
            }).insertAfter($styledSelect);

            for (var i = 0; i < numberOfOptions; i++) {
                $('<li />', {
                    text: $this.children('option').eq(i).text(),
                    rel: $this.children('option').eq(i).val()
                }).appendTo($list);
            }

            var $listItems = $list.children('li');

            $styledSelect.click(function(e) {
                e.stopPropagation();
                $('div.pxl-select-higthlight.active').not(this).each(function(){
                    $(this).removeClass('active').next('ul.pxl-select-options').addClass('pxl-select-lists-hide');
                });
                $(this).toggleClass('active');
            });

            $listItems.click(function(e) {
                e.stopPropagation();
                $styledSelect.text($(this).text()).removeClass('active');
                $this.val($(this).attr('rel'));
            });

            $(document).click(function() {
                $styledSelect.removeClass('active');
            });

        });

        /* Custom Effects */
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

        $('.pxl-show-grid').append('<div class="pxl-grid-lines"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>');
        $('.pxl-show-grid-yes').append('<div class="pxl-grid-lines"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>');
        $('.pxl-grid-mobile-yes').each(function() {
            $(this).find('.pxl-grid-lines').addClass('grid-mobile');
        });

        $('.widget-title, .wp-block-group__inner-container > h2, .single-post #comments .comments-title, .single-post .comment-respond .comment-reply-title, .cart_totals > h2, #customer_details .woocommerce-billing-fields > h3, #order_review_heading, .woocommerce-additional-fields > h3').append('<span class="title-line"></span>');

        /* Custom Page */
        $('.pxl-page-bg').each(function () {
            $('#pxl-wapper').addClass('pxl-wapper-has-bg');
        });

        /* Custom Hide Scroll Bar */
        $('.pxl-hide-scroll-bar').each(function () {
            $('body').addClass('pxl-hide-scroll-bar');
        });

        /* Custom Change Color Header */
        $('.pxl-header-icon-white-darkmode').each(function () {
            $('header .pxl-iconwhite-indark').addClass('pxl-color-white');
        });

        if($('body').hasClass('pxl-header-mb-blur')) {
            $('#pxl-header-mobile').css("backdrop-filter", "blur(10px)");
        }

        if($('body').hasClass('pxl-header-mb-white')) {
            $('#pxl-header-mobile .pxl-header-branding .logo-dark').css({
                opacity: 1,
                visibility: 'visible'
            });
        }

        $('.pxl-menu-parallax').each(function() {
            const $this = $(this);
            const menu = $this.find('.menu-parallax');
            const menuItems = $this.find('div:nth-child(1) > ul > li');
            const numItems = menuItems.length;
            const patternStep = 100 / numItems;
            const imageStep = 10 / numItems;

            menu.hover(function () {
                $this.addClass('active');
            }, function () {
                $this.removeClass('active');
            });

            function updateBackgroundPositions() {
                menuItems.each(function(i) {
                    const patternPos = i * patternStep;
                    const imagePos = 50 - (numItems - 1 - i) * imageStep;
                    $(this).on("mouseover", function() {
                        $this.css("--pattern-position", `0% ${patternPos}%`);
                        $this.css("--image-position", `center ${imagePos}%`);
                    });
                });
            }

            updateBackgroundPositions();

            menuItems.on("mouseover", function() {
                $this.attr("data-active-index", $(this).index());
            });
        });

    });

    /* --------------------------------------------------------------------------------------------- */

    function mrittik_panel_anchor_toggle() {
        'use strict';
        $(document).on('click','.pxl-anchor.side-panel',function(e){
            e.preventDefault();
            e.stopPropagation();
            var target = $(this).attr('data-target');
            $(this).toggleClass('cliked');
            $(target).toggleClass('open');
            $('body').toggleClass('side-panel-open');
            $(target).next('.pxl-overlay-drop').toggleClass('panel-open');
            setTimeout(function(){
                $(document).find('.pxl-search-form input[name="s"]').focus();
                $(document).find('.search-form input[name="s"]').focus();
            },1000);
        });
        $(document).on('click','.custom-link.anchor',function(e){
            e.preventDefault();
            e.stopPropagation();
            var target = $(this).attr('data-target');
            $(this).toggleClass('cliked');
            $(target).toggleClass('anchor-target-open');
            $('.pxl-anchor-bg').toggleClass('anchor-bg-open');
        });

        //* Menu Dropdown
        $('.pxl-menu-primary li').each(function () {
            var $submenu = $(this).find('> ul.sub-menu');
            if ($submenu.length == 1) {
                $(this).hover(function () {
                    if ($submenu.offset().left + $submenu.width() > $(window).width()) {
                        $submenu.addClass('back');
                    } else if ($submenu.offset().left < 0) {
                        $submenu.addClass('back');
                    }
                }, function () {
                    $submenu.removeClass('back');
                });
            }
        });
    }

    function mrittik_document_click() {
        $(document).on('click',function (e) {
            var target = $(e.target);
            var check = '.btn-nav-mobile';

            if (!(target.is(check)) && target.closest('.pxl-hidden-template').length <= 0 && $('body').hasClass('side-panel-open')) {
                $('.btn-nav-mobile').removeClass('cliked');
                $('.pxl-hidden-template').removeClass('open');
                $('body').removeClass('side-panel-open');
                $('.pxl-overlay-drop').removeClass('panel-open');
            }
        });
        $(document).on('click','.pxl-close',function(e){
            e.preventDefault();
            e.stopPropagation();
            $(this).closest('.pxl-hidden-template').toggleClass('open');
            $('.btn-nav-mobile').removeClass('cliked');
            $('body').toggleClass('side-panel-open');
        });
        $(document).on('click','.pxl-close-drop',function(e){
            e.preventDefault();
            e.stopPropagation();
            $('.pxl-overlay-drop').removeClass('panel-open');
        });
    }

    /* Get Mouse Move Direction */
    function getDirection(ev, obj) {
        var w = $(obj).width(),
        h = $(obj).height(),
        x = (ev.pageX - $(obj).offset().left - (w / 2)) * (w > h ? (h / w) : 1),
        y = (ev.pageY - $(obj).offset().top - (h / 2)) * (h > w ? (w / h) : 1),
        d = Math.round( Math.atan2(y, x) / 1.57079633 + 5 ) % 4;
        return d;
    }
    function addClass( ev, obj, state ) {
        var direction = getDirection( ev, obj ),
        class_suffix = null;
        $(obj).removeAttr('class');
        switch ( direction ) {
            case 0 : class_suffix = '-top';    break;
            case 1 : class_suffix = '-right';  break;
            case 2 : class_suffix = '-bottom'; break;
            case 3 : class_suffix = '-left';   break;
        }
        $(obj).addClass( state + class_suffix );
    }
    $.fn.ctDeriction = function () {
        this.each(function () {
            $(this).on('mouseenter',function(ev){
                addClass( ev, this, 'in' );
            });
            $(this).on('mouseleave',function(ev){
                addClass( ev, this, 'out' );
            });
        });
    }
    $('.pxl-grid-direction .item-direction').ctDeriction();

    /* Header Sticky */
    function mrittik_header_sticky() {
        if($('#pxl-header-elementor').hasClass('is-sticky')) {
            if (pxl_scroll_top > 147) {
                $('.pxl-header-elementor-sticky.pxl-sticky-stb').addClass('pxl-header-fixed');
            } else {
                $('.pxl-header-elementor-sticky.pxl-sticky-stb').removeClass('pxl-header-fixed');
            }

            if (pxl_scroll_status == 'up' && pxl_scroll_top > 147) {
                $('.pxl-header-elementor-sticky.pxl-sticky-stt').addClass('pxl-header-fixed');
            } else {
                $('.pxl-header-elementor-sticky.pxl-sticky-stt').removeClass('pxl-header-fixed');
            }
        }
        $('.pxl-header-elementor-sticky').parents('body').addClass('pxl-header-sticky');
    }

    /* Scroll To Top */
    function mrittik_scroll_to_top() {
        $('.pxl-scroll-top').addClass('pxl-hover-transition');
        if (pxl_scroll_top < pxl_window_height) {
            $('.pxl-scroll-top').addClass('pxl-off').removeClass('pxl-on');
        }
        if (pxl_scroll_top > pxl_window_height) {
            $('.pxl-scroll-top').addClass('pxl-on').removeClass('pxl-off');
        }
    }

    /* Footer Fixed */
    function mrittik_footer_fixed() {
        setTimeout(function(){
            var h_footer = $('.pxl-footer-fixed #pxl-footer-elementor').outerHeight() - 1;
            $('.pxl-footer-fixed #pxl-main').css('margin-bottom', h_footer + 'px');
        }, 600);
    }

    /* ====================
     WooComerce Quantity
     ====================== */
    function mrittik_quantity_icon() {
        $('#pxl-main .quantity').append('<span class="quantity-icon"><i class="quantity-down">-</i><i class="quantity-up">+</i></span>');
        $('.quantity-up').on('click', function () {
            $(this).parents('.quantity').find('input[type="number"]').get(0).stepUp();
            $(this).parents('.woocommerce-cart-form').find('.actions .button').removeAttr('disabled');
        });
        $('.quantity-down').on('click', function () {
            $(this).parents('.quantity').find('input[type="number"]').get(0).stepDown();
            $(this).parents('.woocommerce-cart-form').find('.actions .button').removeAttr('disabled');
        });
        $('.woocommerce-cart-form .actions .button').removeAttr('disabled');
    }

    function mrittik_product_single_variations_att() {
        $(document).on('mousedown', '.pro-variation-select', function (e) {
            e.preventDefault();
            var $this_var = $(this).closest('.variations'),
                this_closest = $(this).closest('.pxl-variation-att-terms'),
                target_hidden = $this_var.find('#'+this_closest.attr('data-id'));
            var $this = $(this);
            if (!$this.hasClass('custom-vari-enabled'))
                return;
            var target = $this.attr('data-value');
            if (!target)
                return;
            target_hidden.val(target).change();
            this_closest.find('li.pxl-vari-item').removeClass('active');
            $this.parent('li').addClass('active');
        });
    }

    /* Custom Tab Carousel */
    function mrittik_tab_carousel() {
        setTimeout(() => {
            $('.pxl-tab-carousel .pxl-item--content:not(:first-child)').css({
                "display": "none",
            });
        }, 1000);
    }

    /* Custom Check Scroll */
    function mrittik_check_scroll() {
        var $gridItems = $('.pxl-check-scroll .pxl-grid-item, .pxl-image-single1, .pxl-item--title, .pxl-item-check-scroll');
        var viewportBottom = pxl_scroll_top + $(window).height();

        $gridItems.each(function() {
            var $gridItem = $(this);
            var elementTop = $gridItem.offset().top;
            var elementBottom = elementTop + $gridItem.outerHeight();

            if (elementTop < viewportBottom && elementBottom > pxl_scroll_top) {
                $gridItem.addClass('visible');
            } else {
                $gridItem.removeClass('visible');
            }
            $('.filter-item').click(function() {
                $gridItem.removeClass('visible');
                $gridItem.addClass('visible');
            });
        });
    }

    /* Custom Post Grid */
    function mrittik_post_grid() {
        $('.pxl-post-layout-post-1').each(function () {
            var $this = $(this);
            var itemGrid = $this.find('.pxl-grid-item');
            $this.hover(function () {
                var itemGrid = $this.find('.pxl-grid-item');
            });
            itemGrid.find('.item--count.show').removeClass("deactive");
            itemGrid.find('.pxl-item--inner, .item--overlay').css({
                'min-height': '0px',
            });
            var pMaxHeight = 0;
            itemGrid.each(function() {
                var pHeight = $(this).find('.pxl-item--inner').height();
                if(pHeight > pMaxHeight) {
                    pMaxHeight = pHeight;
                }
            });
            itemGrid.find('.pxl-item--inner, .item--overlay').css({
                'min-height': pMaxHeight,
            });
            setTimeout(function() {
                itemGrid.find('.item--count.show').addClass("deactive");
            }, 1000);
        });
    }

    function mrittik_draw_svg() {
        var $gridItems = $('.slide-draw-svg svg');
        var viewportBottom = pxl_scroll_top + $(window).height();

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
                    if (elementTop < viewportBottom && elementBottom > pxl_scroll_top) {
                        $gridItem.addClass('visible');
                        var $percentageComplete = ((pxl_scroll_top - elementTop) / ($gridItem.outerHeight() - $(window).height())) * 100;
                        var $offsetUnit = ($percentageComplete <= 100) ? 0 : pathLength;
                        thisPath.css("stroke-dashoffset", $offsetUnit);
                    } else {
                        $gridItem.removeClass('visible');
                    }
                });
            });

        });
    }

    function mrittik_grid_effects() {
        $('.pixel_stretch').each(function () {
            var gridItems = $(this).find(".pxl-grid-item");
            gridItems.each(function () {
                var itemFeatured = $(this).find(".item--featured");
                var imgWidth = $(this).find(".item--featured img").width();
                itemFeatured.css('--pg-img-width', imgWidth + 'px');
            });
        });
    }

    /* Custom Switch Light/Dark Mode */
    function mrittik_lightdark_switch() {
        let getMode = localStorage.getItem("mode");
        const toggleButton = $(".pxl-switch-button");

        var currentPath = window.location.pathname;
        var isLandingPage = currentPath.endsWith("/landing/");

        if (isLandingPage) {
            toggleButton.css("opacity", "0");
            getMode = "dark";
        } else {
            const urlParams = new URLSearchParams(window.location.search);
            const colorParam = urlParams.get('color');
            if (colorParam === 'v-dark' || colorParam === 'v-light') {
                getMode = (colorParam === 'v-light') ? 'light' : 'dark';
            }
        }

        if (getMode && getMode === "light") {
            $("body").removeClass("dark-mode");
        }
        if (getMode && getMode === "dark") {
            $("body").addClass("dark-mode");
        }

        toggleButton.on("click", function() {
            $("body").toggleClass("dark-mode");
            if (!$("body").hasClass("dark-mode")) {
                return localStorage.setItem("mode", "light");
            }
            localStorage.setItem("mode", "dark");
        });
    }

    /* Custom Loader */
    function mrittik_loader() {
        if ($('#pxl-loadding').is('.style-text, .style-home-assistant')) {
            $('#pxl-loadding').addClass('hide');
        } else {
            $(".pxl-loader").fadeOut("slow");
        }
    }

    /* Custom WebGL Effects */
    function mrittik_webgl_effects() {
        var WebGL_vs = `#ifdef GL_ES
        precision mediump float;
        #endif

        attribute vec3 aVertexPosition;
        attribute vec2 aTextureCoord;

        uniform mat4 uMVMatrix;
        uniform mat4 uPMatrix;

        uniform mat4 texture0Matrix;
        uniform mat4 texture1Matrix;
        uniform mat4 mapMatrix;

        varying vec3 vVertexPosition;
        varying vec2 vTextureCoord0;
        varying vec2 vTextureCoord1;
        varying vec2 vTextureCoordMap;

        void main() {
            vec3 vertexPosition = aVertexPosition;

            gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);

            vTextureCoord0 = (texture0Matrix * vec4(aTextureCoord, 0., 1.)).xy;
            vTextureCoord1 = (texture1Matrix * vec4(aTextureCoord, 0., 1.)).xy;
            vTextureCoordMap = (mapMatrix * vec4(aTextureCoord, 0., 1.)).xy;
            vVertexPosition = vertexPosition;
        }`;

        var WebGL_fs = `#ifdef GL_ES
        precision mediump float;
        #endif

        #define PI2 6.28318530718
        #define PI 3.14159265359
        #define S(a,b,n) smoothstep(a,b,n)

        uniform float uTime;
        uniform float uProgress;
        uniform vec2 uReso;
        uniform vec2 uMouse;

        varying vec3 vVertexPosition;
        varying vec2 vTextureCoord0;
        varying vec2 vTextureCoord1;
        varying vec2 vTextureCoordMap;

        uniform sampler2D texture0;
        uniform sampler2D texture1;
        uniform sampler2D map;

        float exponentialEasing (float x, float a){

            float epsilon = 0.00001;
            float min_param_a = 0.0 + epsilon;
            float max_param_a = 1.0 - epsilon;
            a = max(min_param_a, min(max_param_a, a));

            if (a < 0.5){
                a = 2.0 * a;
                float y = pow(x, a);
                return y;
            } else {
                a = 2.0 * (a-0.5);
                float y = pow(x, 1.0 / (1.-a));
                return y;
            }
        }

        vec4 blur13(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
            vec4 color = vec4(0.0);
            vec2 off1 = vec2(1.411764705882353) * direction;
            vec2 off2 = vec2(3.2941176470588234) * direction;
            vec2 off3 = vec2(5.176470588235294) * direction;
            color += texture2D(image, uv) * 0.1964825501511404;
            color += texture2D(image, uv + (off1 / resolution)) * 0.2969069646728344;
            color += texture2D(image, uv - (off1 / resolution)) * 0.2969069646728344;
            color += texture2D(image, uv + (off2 / resolution)) * 0.09447039785044732;
            color += texture2D(image, uv - (off2 / resolution)) * 0.09447039785044732;
            color += texture2D(image, uv + (off3 / resolution)) * 0.010381362401148057;
            color += texture2D(image, uv - (off3 / resolution)) * 0.010381362401148057;
            return color;
        }

        void main(){
            vec2 uv0 = vTextureCoord0;
            vec2 uv1 = vTextureCoord1;

            float progress0 = uProgress;
            float progress1 = 1. - uProgress;

            vec4 map = blur13(map, vTextureCoordMap, uReso, vec2(2.)) + 0.5;

            uv0.x += progress0 * map.r;
            uv1.x -= progress1 * map.r;

            vec4 color = texture2D( texture0, uv0 );
            vec4 color1 = texture2D( texture1, uv1 );

            gl_FragColor = mix(color, color1, progress0 );
        }`;
        class WebglHover {
            constructor(set) {
                this.canvas = set.canvas;
                this.webGLCurtain = new Curtains({
                    container: this.canvas,
                    watchScroll: false,
                    pixelRatio: Math.min(1.5, window.devicePixelRatio)
                })
                this.planeElement = set.planeElement;
                this.mouse = {
                    x: 0,
                    y: 0
                };
                this.params = {
                    vertexShader: WebGL_vs,
                    fragmentShader: WebGL_fs,
                    widthSegments: 40,
                    heightSegments: 40,
                    uniforms: {
                        time: {
                            name: "uTime",
                            type: "1f",
                            value: 0
                        },
                        mousepos: {
                            name: "uMouse",
                            type: "2f",
                            value: [0, 0]
                        },
                        resolution: {
                            name: "uReso",
                            type: "2f",
                            value: [innerWidth, innerHeight]
                        },
                        progress: {
                            name: "uProgress",
                            type: "1f",
                            value: 0
                        }
                    }
                };
                this.initPlane();
            }

            initPlane() {
                this.plane = this.webGLCurtain.addPlane(this.planeElement, this.params);
                // this.plane = new Plane(this.webGLCurtain, this.planeElement, this.params)

                if (this.plane) {
                    this.plane.onReady(() => {
                        this.update();
                        this.initEvent();
                    });
                }
            }

            update() {
                this.plane.onRender(() => {
                    this.plane.uniforms.time.value += 0.01;
                    this.plane.uniforms.resolution.value = [innerWidth, innerHeight];
                });
            }

            initEvent() {
                this.planeElement.addEventListener("mouseenter", e => {
                    gsap.to(this.plane.uniforms.progress, .8, {
                        value: 1
                    });
                });

                this.planeElement.addEventListener("mouseout", e => {
                    gsap.to(this.plane.uniforms.progress, .8, {
                        value: 0
                    });
                });
            }
        }

        if (navigator.userAgent.indexOf('Safari') == -1 || navigator.userAgent.indexOf('Chrome') > -1) {
            $('.pxl-image-box1.normal, .pxl-image-box3').each(function() {
                const $this = $(this),
                canvas = $this.find('.canvas')[0],
                planeElement = $this.find('.item--image')[0],
                initialized = $this.data('initialized');

                if (!initialized && canvas && planeElement) {
                    new WebglHover({
                        canvas: canvas,
                        planeElement: planeElement
                    });
                    $this.data('initialized', true);
                }
            });
        }

        // Effect Expo
        var WebExpo_vs = `#ifdef GL_ES
        precision mediump float;
        #endif

        attribute vec3 aVertexPosition;
        attribute vec2 aTextureCoord;

        uniform mat4 uMVMatrix;
        uniform mat4 uPMatrix;

        varying vec2 vTextureCoord;

        void main() {
            gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

            vTextureCoord = aTextureCoord;
        }`;

        var WebExpo_fs = `
        #ifdef GL_ES
        precision mediump float;
        #endif

        varying vec3 vVertexPosition;
        varying vec2 vTextureCoord;

        uniform float uTime;

        uniform sampler2D planeTexture;

        void main() {
            vec2 textureCoord = vTextureCoord;

            const float PI = 3.141592;

            textureCoord.x += (
            sin(textureCoord.x * 2.5 + ((uTime * (PI / 3.0)) * 0.031))
            + sin(textureCoord.y * 2.5 + ((uTime * (PI / 2.489)) * 0.017))
            ) * 0.0075;

            textureCoord.y += (
            sin(textureCoord.y * 2.5 + ((uTime * (PI / 2.023)) * 0.023))
            + sin(textureCoord.x * 2.5 + ((uTime * (PI / 3.1254)) * 0.037))
            ) * 0.0125;

            gl_FragColor = texture2D(planeTexture, textureCoord);
        }
        `;

        class WebGLExpo {
            constructor(set) {
                this.canvas = set.canvas;
                this.webGLCurtain = new Curtains({
                    container: this.canvas,
                    watchScroll: false,
                    pixelRatio: Math.min(1.5, window.devicePixelRatio)
                })
                this.planeElement = set.planeElement;
                this.mouse = {
                    x: 0,
                    y: 0
                };
                this.params = {
                    vertexShader: WebExpo_vs,
                    fragmentShader: WebExpo_fs,
                    widthSegments: 40,
                    heightSegments: 40,
                    uniforms: {
                        time: {
                            name: "uTime",
                            type: "1f",
                            value: 0
                        },
                        mousepos: {
                            name: "uMouse",
                            type: "2f",
                            value: [0, 0]
                        },
                        resolution: {
                            name: "uReso",
                            type: "2f",
                            value: [innerWidth, innerHeight]
                        },
                        progress: {
                            name: "uProgress",
                            type: "1f",
                            value: 0
                        }
                    }
                };
                this.initPlane();
            }

            initPlane() {
                this.plane = this.webGLCurtain.addPlane(this.planeElement, this.params);
                // this.plane = new Plane(this.webGLCurtain, this.planeElement, this.params)

                if (this.plane) {
                    this.plane.onReady(() => {
                        this.update();
                        this.initEvent();
                    });
                }
            }

            update() {
                this.plane.onRender(() => {
                    this.plane.uniforms.resolution.value = [innerWidth, innerHeight];
                });
            }

            initEvent() {
                let isHovered = false;

                this.planeElement.addEventListener("mouseenter", e => {
                    isHovered = true;
                });

                this.planeElement.addEventListener("mouseout", e => {
                    isHovered = false;
                });

                this.plane.onRender(() => {
                    if (isHovered) {
                        this.plane.uniforms.time.value++;
                    }
                });

            }
        }

        if (navigator.userAgent.indexOf('Safari') == -1 || navigator.userAgent.indexOf('Chrome') > -1) {
            $('.pxl-image-box1.expo').each(function() {
                const $this = $(this),
                canvas = $this.find('.canvas')[0],
                planeElement = $this.find('.item--image')[0],
                initialized = $this.data('initialized');

                if (!initialized && canvas && planeElement) {
                    new WebGLExpo({
                        canvas: canvas,
                        planeElement: planeElement
                    });
                    $this.data('initialized', true);
                }
            });
        }

        // Effect Wave
        const WebWave_vs = `
        precision mediump float;

        attribute vec3 aVertexPosition;
        attribute vec2 aTextureCoord;

        uniform mat4 uMVMatrix;
        uniform mat4 uPMatrix;

        varying vec3 vVertexPosition;
        varying vec2 vTextureCoord;

        uniform float uTime;

        void main() {
            vec3 vertexPosition = aVertexPosition;

            float waveCoords = ((uTime / 45.0) * 3.5) - 1.75;

            float distanceToWave = distance(vec2(vertexPosition.x, 0.0), vec2(waveCoords, 0.0));

            vertexPosition.z -= (cos(clamp(distanceToWave, 0.0, 0.75) * 3.141592) - cos(0.75 * 3.141592) + (2.0 * sin(3.141592 * uTime / 90.0))) * 0.025;

            gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);

            vTextureCoord = aTextureCoord;
            vVertexPosition = vertexPosition;
        }
        `;

        const WebWave_fs = `precision mediump float;

        uniform float uTime;

        varying vec3 vVertexPosition;
        varying vec2 vTextureCoord;

        uniform sampler2D uExample;


        void main() {

            vec2 textureCoords = vec2(vTextureCoord.x, vTextureCoord.y);
            vec4 finalColor = texture2D(uExample, textureCoords);

            gl_FragColor = finalColor;
        }`;

        class ImgCurtain {
            constructor(set) {
                this.canvas = set.canvas;
                this.webGLCurtain = new Curtains({
                    container: this.canvas,
                    watchScroll: false,
                    pixelRatio: Math.min(1.5, window.devicePixelRatio)
                })
                this.planeElement = set.planeElement;
                this.mouse = {
                    x: 0,
                    y: 0
                };
                this.params = {
                    vertexShader: WebWave_vs,
                    fragmentShader: WebWave_fs,
                    widthSegments: 40,
                    heightSegments: 40,
                    uniforms: {
                        time: {
                            name: "uTime",
                            type: "1f",
                            value: 0
                        },
                        resolution: {
                            name: "uReso",
                            type: "2f",
                            value: [innerWidth, innerHeight]
                        }
                    }
                };
                this.initPlane();
            }

            initPlane() {
                this.plane = this.webGLCurtain.addPlane(this.planeElement, this.params);

                if (this.plane) {
                    this.plane.onReady(() => {
                        this.update();
                        this.initEvent();
                    });
                }
            }

            update() {
                this.plane.onRender(() => {
                    this.plane.uniforms.time.value += 0.01;
                    this.plane.uniforms.resolution.value = [innerWidth, innerHeight];
                });
            }

            initEvent() {
                let isHovered = false;

                this.planeElement.addEventListener("mouseenter", e => {
                    isHovered = true;
                });

                this.planeElement.addEventListener("mouseout", e => {
                    isHovered = false;
                });

                this.plane.onRender(() => {
                    if (isHovered) {
                        this.plane.uniforms.time.value += (45 - this.plane.uniforms.time.value) * 0.0375;
                    } else {
                        this.plane.uniforms.time.value += (0 - this.plane.uniforms.time.value) * 0.0375;
                    }
                });
            }
        }

        if (navigator.userAgent.indexOf('Safari') == -1 || navigator.userAgent.indexOf('Chrome') > -1) {
            $('.pxl-image-box1.wave').each(function() {
                const $this = $(this),
                canvas = $this.find('.canvas')[0],
                planeElement = $this.find('.item--image')[0],
                initialized = $this.data('initialized');

                if (!initialized && canvas && planeElement) {
                    new ImgCurtain({
                        canvas: canvas,
                        planeElement: planeElement
                    });
                    $this.data('initialized', true);
                }
            });
        }


        if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
            $('.pxl-image-box1 .image-front, .pxl-image-box3 .image-front').css('opacity', '1');
        }

    }

    function mrittik_functions() {
        // Detect mobile device
        var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Nokia|Opera Mini/i.test(navigator.userAgent) ? true : false;

        // Add class "is-mobile" to </body>
        if(isMobile) {
            $("body").addClass("is-mobile");
        } else {
            $("body").removeClass("is-mobile");
        }

        /* Svg Length */
        var getSvgLength = $('.pxl-draw-svg svg path');
        getSvgLength.each(function() {
            var pathLength = this.getTotalLength();
            $(this).attr('stroke-dasharray', pathLength);
            return pathLength;
        });

        $('.pxl-draw-svg svg path').each(function() {
            var stroke = $(this).attr('stroke-dasharray');
            $(this).css({
                "stroke-dasharray": stroke,
                "stroke-dashoffset": stroke
            });

            var randomId = 'path_' + Math.floor(Math.random() * 1000000);
            $(this).attr('id', randomId);

            var elementId = $(this).attr('id');
            var animationName = 'drawAnimation_' + elementId;
            var keyframes = '@keyframes ' + animationName + ' { ' +
            'from { stroke-dashoffset: ' + stroke + '; } ' +
            'to { stroke-dashoffset: 0; } ' +
            '}';

            var styleElement = $('<style>').text(keyframes);
            $('head').append(styleElement);
            $(this).css({
                'animation-name': animationName,
                'animation-duration': '2s',
                'animation-timing-function': 'ease',
                'animation-fill-mode': 'forwards',
                'animation-iteration-count': 'infinite'
            });
        });

        /* Custom Effect Scroll */
        $('.pxl-section-overlay-scroll').each(function () {
            $(this).find('.elementor-background-overlay').addClass('element-scroll');
        });

        $('.pxl-section-scroll').each(function () {
            gsap.registerPlugin(ScrollTrigger);
            const scrollEx = () => {
                document.body.style.overflow = 'auto';
                var prevSection = $(this).prev('section');
                gsap.utils.toArray($(this).find('.element-scroll')).forEach((section, index) => {
                    const w = section;
                    var x = w.scrollWidth * -1;
                    var xEnd = 0;
                    if($(section).closest('.pxl-section-scroll').hasClass('revesal')){
                        x = '100%';
                        xEnd = (w.scrollWidth + 50 - section.offsetWidth) * -1;
                    }
                    gsap.fromTo(w, { x }, {
                        x: xEnd,
                        scrollTrigger: {
                            trigger: prevSection,
                            start: 'top 10%',
                            end: 'bottom 50%',
                            scrub: 0.5
                        }
                    });
                });
            }
            scrollEx();
        });

    }

    function mrittik_functions_rsz() {
        /* Custom Post */
        var dhi = 0;
        $(".pxl-item-single-post .pxl-post--navigation .nav--title").each(function() {
            var default_height = $(this).height();
            if(default_height > dhi){
                dhi = default_height;
            }
        });
        $('.pxl-item-single-post .pxl-post--navigation .nav--line').css("height", dhi);

        /* Custom width nice select shop archive */
        $('.woocommerce .nice-select').each(function() {
            var default_width = $('.woocommerce .products:not(.pxl-products-list) .woocommerce-product-inner').width();
            $(this).css("min-width", default_width);
            if ($('ul').hasClass('pxl-products-list')) {
                $(this).css({
                    "min-width": "270px"
                });
            }
        });

        /* Custom scroll flex control shop single */
        $('.woocommerce .woocommerce-summary-wrap.row .flex-control-nav').each(function () {
            var count_nav_item = $(this).find('li').length;
            if (count_nav_item >= 4) {
                $(this).addClass('pxl-custom-scroll');
                var flex_height = $(this).parent().height();
                $(this).css("max-height", flex_height);
            }
        });

        /* Blog List Scroll */
        $(".blog-list-scroll").each(function() {
            var get_height = $(this).find(".pxl-grid-item").height();
            var list_height = (get_height * 2) + 40;
            $(this).find(".pxl-blog-inner").css('max-height', list_height);

            $(".blog-list-scroll .pxl-blog-inner").overlayScrollbars({
                className: "os-theme-thick-dark",
                overflowBehavior : {
                    x : "hidden",
                    y : "scroll"
                },
            });

            $(this).find(".pxl-blog-inner").hover(function () {
                $(this).find(".os-scrollbar-handle").addClass('pxl-scrollbar-transition');
            });
            $(this).find(".pxl-blog-inner").mouseleave(function() {
                setTimeout(() => {
                    $(this).find(".os-scrollbar-handle").removeClass('pxl-scrollbar-transition');
                }, 300);
            });
        });

       /* Custom Grid Filter Moving Border */
        $('.pxl-grid-filter1').each(function () {
            var marker = $(this).find('.filter-marker'),
            item = $(this).find('.filter-item'),
            current = $(this).find('.filter-item.active'),
            offsetTop = current.position().top;
            marker.css({
                top: offsetTop + current.outerHeight(),
                left: current.position().left,
                width: current.outerWidth(),
                display: "block"
            });

            item.mouseover(function () {
                var self = $(this),
                offsetacTop = self.position().top,
                offsetLeft = self.position().left,
                width = self.outerWidth() || current.outerWidth(),
                top = offsetacTop == 0 ? 0 : offsetacTop || offsetTop,
                left = offsetLeft == 0 ? 0 : offsetLeft || current.position().left;
                marker.stop().animate({
                    top: top + current.outerHeight(),
                    left: left,
                    width: width,
                }, 300);
            });

            item.on('click', function () {
                current = $(this);
            });

            item.mouseleave(function () {
                var offsetlvTop = current.position().top;
                marker.stop().animate({
                    top: offsetlvTop + current.outerHeight(),
                    left: current.position().left,
                    width: current.outerWidth()
                }, 300);
            });
        });

        $('.pxl-image-box3').each(function() {
            $(this).css('min-height', '');
            var item_box_height = $(this).outerHeight();
            var item_min_height = item_box_height + 129;
            $(this).css('min-height', item_min_height + 'px');
        });

        /* Custom Slider Carousel */
        // Slider 03, 04
        $('.pxl-slider-carousel3, .pxl-slider-carousel4').each(function () {
            var $this = $(this);
            var slides = $this.find('.pxl-swiper-slide');

            if (!$this.hasClass('pxl-slider-no-parallax')) {
                if (pxl_window_width > 767) {
                    var contentWrapper = $this.find('.content--wrapper');
                    contentWrapper.attr('data-parallax', '{"x": 50}');
                    $this.hover(function () {
                        contentWrapper.attr('data-parallax', '{"x": 50}');
                    });
                } else if (pxl_window_width <= 767) {
                    var contentWrapper = $this.find('.content--wrapper');
                    contentWrapper.removeAttr("data-parallax");
                    contentWrapper.css('transform', '');
                    $this.hover(function () {
                        contentWrapper.removeAttr("data-parallax");
                        contentWrapper.css('transform', '');
                    });
                }
            }

            function calculateHeight() {
                slides.css('min-height', '');
                var maxHeight = 0;
                slides.each(function () {
                    var slideHeight = $(this).outerHeight();
                    if (slideHeight > maxHeight) {
                        maxHeight = slideHeight;
                    }
                });
                slides.css('min-height', maxHeight + 'px');
            }
            calculateHeight();
        });

        // Slider 05
        $('.pxl-slider-carousel5').each(function() {
            $(this).find('.pxl-swiper-container').css('min-height', '');
            $(this).hover(function() {
                var elements = $(this).find('.pxl-swiper-container');
                elements.each(function() {
                    var elementHeight = $(this).height();
                    $(this).css('min-height', elementHeight + 'px');
                });
            });
        });

        // Slider 06, 04
        $('.pxl-slider-carousel6, .pxl-slider-carousel4.style2').each(function() {
            var slider = $(this);
            var tiltElement = slider.find(".pxl-item--content");
            if (tiltElement.length > 0) {
                tiltElement.each(function() {
                    var $this = $(this);
                    if(pxl_window_width > 767) {
                        VanillaTilt.init($this[0], {
                            max: 3,
                            speed: 1000,
                            scale: 1.01,
                            glare: false,
                            "max-glare": 0.5,
                            perspective: 1400,
                            easing: "cubic-bezier(.03, .98, .52, .99)",
                            reset: true
                        });
                    }
                });
            }
        });

        // Arrow Carousel
        $('.wp-arrow.style2').each(function () {
            var checkSlider = $(this).parents('.pxl-slider-carousel');
            if (!checkSlider.hasClass('pxl-slider-no-parallax')) {
                var contentElementActive = $(this).parent('.pxl-carousel-inner').find('.swiper-slide-active .content--inner');
                var contentElement = $(this).parent('.pxl-carousel-inner').find('.pxl-swiper-slide .content--inner');
                var parent = $(this).parent('.pxl-carousel-inner');
                var bodyElement = $('body');
                contentElement.css('margin', '0');
                if (contentElementActive.length > 0) {
                    var contentPosition = contentElementActive.offset().left;
                    var arrowElement = bodyElement.hasClass('rtl') ? $(this).parent('.pxl-carousel-inner').find('.pxl-swiper-arrow-next') : $(this).parent('.pxl-carousel-inner').find('.pxl-swiper-arrow-prev');
                    var arrowPosition = arrowElement.offset().left + arrowElement.outerWidth() + 32;
                    var offset = arrowPosition + 15;
                    if (pxl_window_width > 767) {
                        if (bodyElement.hasClass('rtl')) {
                            contentPosition = contentElementActive.offset().left + contentElementActive.outerWidth() + 15;
                            arrowPosition = arrowElement.offset().left - arrowElement.outerWidth() + 28;
                            offset = pxl_window_width - arrowPosition + 15;
                            if (contentPosition > arrowPosition) {
                                contentElement.css('margin-right', '+=' + offset + 'px');
                            }
                        } else {
                            if (contentPosition < arrowPosition) {
                                contentElement.css('margin-left', '+=' + offset + 'px');
                            }
                        }
                    }
                }
                parent.hover(function () {
                    var contentElementActive = $(this).parent('.pxl-carousel-inner').find('.swiper-slide-active .content--inner');
                    var contentElement = $(this).parent('.pxl-carousel-inner').find('.pxl-swiper-slide .content--inner');
                    contentElement.css('margin', '0');
                    if (contentElementActive.length > 0) {
                        var contentPosition = contentElementActive.offset().left;
                        var arrowElement = bodyElement.hasClass('rtl') ? $(this).parent('.pxl-carousel-inner').find('.pxl-swiper-arrow-next') : $(this).parent('.pxl-carousel-inner').find('.pxl-swiper-arrow-prev');
                        var arrowPosition = arrowElement.offset().left + arrowElement.outerWidth() + 32;
                        var offset = arrowPosition + 15;
                        if (pxl_window_width > 767) {
                            if (bodyElement.hasClass('rtl')) {
                                contentPosition = contentElementActive.offset().left + contentElementActive.outerWidth() + 15;
                                arrowPosition = arrowElement.offset().left - arrowElement.outerWidth() + 28;
                                offset = pxl_window_width - arrowPosition + 15;
                                if (contentPosition > arrowPosition) {
                                    contentElement.css('margin-right', '+=' + offset + 'px');
                                }
                            } else {
                                if (contentPosition < arrowPosition) {
                                    contentElement.css('margin-left', '+=' + offset + 'px');
                                }
                            }
                        }
                    }
                });
            }
        });

    }

    $( document ).ajaxComplete(function() {
        mrittik_quantity_icon();
        mrittik_post_grid();
        mrittik_functions();
        setTimeout(function () {
            mrittik_grid_effects();
        }, 500);
    });
})(jQuery);
