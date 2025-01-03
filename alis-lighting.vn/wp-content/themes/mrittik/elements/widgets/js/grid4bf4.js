( function( $ ) {
    $.sep_grid_refresh = function () {
        $('.pxl-grid-masonry').each(function () {
            $thisMasonry = $(this);
            var iso = new Isotope(this, {
                itemSelector: '.pxl-grid-item',
                layoutMode: $(this).closest('.pxl-grid').attr('data-layout'),
                percentPosition: true,
                masonry: {
                    columnWidth: '.grid-sizer',
                },
                containerStyle: null,
                stagger: 30,
                sortBy : 'name',
            });

            var filtersElem = $(this).parent().find('.pxl-grid-filter');
            filtersElem.on('click', function (event) {
                var filterValue = event.target.getAttribute('data-filter');
                iso.arrange({filter: filterValue});

                var filteredItems = iso.filteredItems;
                var filterApplied = iso.options.filter;
                if (filterApplied === filterValue && filteredItems.length === 0) {
                    $(this).parent().find('.pxl-grid-no-results').show();
                } else {
                    $(this).parent().find('.pxl-grid-no-results').hide();
                }
            });

            var filterItem = $(this).parent().find('.filter-item');
            filterItem.on('click', function (e) {
                filterItem.removeClass('active');
                $(this).addClass('active');
            });

            var filtersSelect = $(this).parent().find('.pxl-grid-filter');
            filtersSelect.change(function() {
                var filters = $(this).val();
                iso.arrange({filter: filters});
            });

            var orderSelect = $(this).parent().find('.pxl-grid-filter');
            orderSelect.change(function() {
                var e_order = $(this).val();
                if(e_order == 'asc') {
                    iso.arrange({sortAscending: false});
                }
                if(e_order == 'des') {
                    iso.arrange({sortAscending: true});
                }
            });

            applyFilters($thisMasonry, iso);

        });

    }

    function updateFilters(gridContainer, iso) {
        selectedFilters = [];
        var activeFilters = gridContainer.find('.active');

        activeFilters.each(function () {
            selectedFilters.push($(this).data('filter'));
        });

        var filterValue = selectedFilters.join('') + '.price-show';
        iso.arrange({ filter: filterValue });

        var filteredItems = iso.filteredItems;
        var filterApplied = iso.options.filter;
        if (filterApplied === filterValue && filteredItems.length === 0) {
            gridContainer.find('.pxl-grid-no-results').show();
        } else {
            gridContainer.find('.pxl-grid-no-results').hide();
        }
    }

    function updatePriceFilters(gridContainer, gridItems, iso, inputMin, inputMax) {
        gridItems.each(function () {
            var price = parseInt($(this).data('price'));
            var min = parseInt(inputMin.val());
            var max = parseInt(inputMax.val());
            if (price >= min && price <= max) {
                $(this).addClass('price-show');
            } else {
                $(this).removeClass('price-show');
            }
        });

        updateFilters(gridContainer, iso);
    }

    function applyFilters($grid, iso) {
        $grid.closest('.pxl-product-grid').each(function () {
            var gridContainer = $(this);
            var selectedFilters = [];
            var gridItems = gridContainer.find('.pxl-grid-item');

            // Widget Filters
            gridContainer.on('click', '.pxl-sidebar-area .widget_product_categories .cat-item', function (event) {
                var filterValue = $(this).data('filter');
                event.preventDefault();
                $(this).toggleClass('active');
                updateFilters(gridContainer, iso);
            });

            gridContainer.on('click', '.widget_price_filter .price_slider_amount button', function (event) {
                event.preventDefault();
                updateFilters(gridContainer, iso);
                resetSlider();
            });

            gridContainer.on('click', '.pxl-sidebar-area .widget_layered_nav .wc-layered-nav-term', function () {
                $(this).toggleClass('active');
                updateFilters(gridContainer, iso);
            });

            gridContainer.on('click', '.pxl-sidebar-area .widget_product_tag_cloud .tag-cloud-link', function (event) {
                var filterValue = $(this).data('filter');
                event.preventDefault();
                $(this).toggleClass('active');
                updateFilters(gridContainer, iso);
            });

            // Widget Product Price Filter
            var sliderPrice = gridContainer.find('.widget_price_filter .price_slider');
            var minPrice = parseInt(gridContainer.find('.widget_price_filter').data('price-min'));
            var maxPrice = parseInt(gridContainer.find('.widget_price_filter').data('price-max'));
            var inputMin = gridContainer.find('.widget_price_filter .price_slider_amount input[name="min_price"]');
            var inputMax = gridContainer.find('.widget_price_filter .price_slider_amount input[name="max_price"]');
            var filterButton = gridContainer.find('.widget_price_filter .price_slider_amount button');

            sliderPrice.slider({
                range: true,
                min: minPrice,
                max: maxPrice,
                values: [minPrice, maxPrice],
                slide: function (event, ui) {
                    inputMin.val(ui.values[0]);
                    inputMax.val(ui.values[1]);
                    $(this).parent().find('.price_label .from').html('$' + ui.values[0]);
                    $(this).parent().find('.price_label .to').html('$' + ui.values[1]);
                    updatePriceFilters(gridContainer, gridItems, iso, inputMin, inputMax);
                }
            });

            filterButton.on('click', function (event) {
                event.preventDefault();
                updatePriceFilters(gridContainer, gridItems, iso, inputMin, inputMax);
                resetSlider();
                updatePriceFilters(gridContainer, gridItems, iso, inputMin, inputMax);
            });


            function resetSlider() {
                inputMin.val(minPrice);
                inputMax.val(maxPrice);
                sliderPrice.slider('values', [minPrice, maxPrice]);
                sliderPrice.parent().find('.price_label .from').html('$' + minPrice);
                sliderPrice.parent().find('.price_label .to').html('$' + maxPrice);
            }

            filterButton.click();

        });

    }

    //Post
    var widget_post_masonry_handler = function( $scope, $ ) {
        $('.pxl-grid-masonry').imagesLoaded(function() {
            if (!window.elementorFrontend.isEditMode()) {
                $.sep_grid_refresh();
            }
        });
    };

    $(document).ajaxComplete(function(event, xhr, settings) {
        "use strict";
        $(document).on('click', '.pxl-grid-filter .filter-item', function (e) {
            $(this).siblings('.filter-item').removeClass('active');
            $(this).addClass('active');
        });
    });

    $(document).on('click', '.pxl-load-more', function() {
        var loadmore    = $(this).data('loadmore');
        var perpage     = loadmore.perpage;
        var _this       = $(this).parents(".pxl-grid");
        var layout_type = _this.data('layout');
        var loading_text = $(this).data('loading-text');
        var loadmore_text = $(this).data('loadmore-text');
        loadmore.paged  = parseInt(_this.data('start-page')) +1;
        $(this).addClass('loading');
        $(this).find('.pxl-btn-icon').addClass('loading');
        $(this).find('.pxl-btn-text').text(loading_text);
        $('.pxl-grid').find('.pxl-grid-no-results').hide();
        $.ajax({
            url: main_data.ajax_url,
            type: 'POST',
            beforeSend: function () {

            },
            data: {
                action: 'mrittik_load_more_post_grid',
                settings: loadmore
            }
        })
        .done(function (res) {
            if(res.data.posts.length > 0){
                _this.find('.pxl-grid-inner').append(res.data.html);
                _this.data('start-page', res.data.paged);
                $('.pxl-grid-masonry').imagesLoaded(function(){
                    $.sep_grid_refresh();
                });
            }
            if(res.data.posts.length > perpage){
                _this.data('start-page', res.data.paged);
            }else{
                _this.find('.btn').hide();
            }

        })
        .fail(function (res) {
            _this.find('.btn').hide();
            return false;
        })
        .always(function () {
            return false;
        });
    });

    $(document).on('click', '.pxl-grid-pagination .ajax a.page-numbers', function() {
        var _this = $(this).parents(".pxl-grid");
        var loadmore = _this.find(".pxl-grid-pagination").data('loadmore');
        var query_vars = _this.find(".pxl-grid-pagination").data('query');

        var layout_type = _this.data('layout');
        var paged = $(this).attr('href');
        paged = paged.replace('#', '');
        loadmore.paged = parseInt(paged);
        query_vars.paged = parseInt(paged);

        var _class = loadmore.pagin_align_cls;

        $('#pxl-main').addClass('pxl-ajax-loading');

        $('.pxl-grid').find('.pxl-grid-no-results').hide();

        // reload pagination
        $.ajax({
            url: main_data.ajax_url,
            type: 'POST',
            beforeSend: function () {

            },
            data: {
                action: 'mrittik_get_pagination_html',
                query_vars: query_vars,
                settings: loadmore,
                cls: _class
            }
        }).done(function (res) {
            if(res.status == true){
                _this.find(".pxl-grid-pagination").html(res.data.html);
            }
            else if(res.status == false){
            }
        }).fail(function (res) {
            return false;
        }).always(function () {
            return false;
        });

        // load post
        $.ajax({
            url: main_data.ajax_url,
            type: 'POST',
            beforeSend: function () {

            },
            data: {
                action: 'mrittik_load_more_post_grid',
                settings: loadmore
            }
        }).done(function (res) {
            if(res.status == true){
                $('#pxl-main').removeClass('pxl-ajax-loading');
                _this.find('.pxl-grid-inner .pxl-grid-item').remove();
                _this.find('.pxl-grid-inner').append(res.data.html);
                _this.data('start-page', res.data.paged);

                _this.find('.pxl-grid-masonry').imagesLoaded(function() {
                    $.sep_grid_refresh();
                });

            }
            else if(res.status == false){
            }
        }).fail(function (res) {
            $('#pxl-main').removeClass('pxl-ajax-loading');
            return false;
        }).always(function () {
            return false;
        });
        return false;
    });

    // Product
    var widget_product_masonry_handler = function( $scope, $ ) {
        $('.pxl-product-grid .pxl-grid-masonry').imagesLoaded(function() {
            $.sep_grid_refresh();
        });
    };

    $(document).on('click', '.btn-product-grid-loadmore', function() {
        var loadmore      = $(this).parents('.pxl-load-more').data('loadmore');
        var _this         = $(this).parents(".pxl-grid");
        var layout_mode   = _this.data('layout-mode');
        var loading_text  = $(this).parents('.pxl-load-more').data('loading-text');
        var loadmore_text  = $(this).parents('.pxl-load-more').data('loadmore-text');
        loadmore.paged    = parseInt(_this.data('start-page')) +1;
        $(this).addClass('loading');
        $(this).find('.btn-text').text(loading_text);
        $('.pxl-grid').find('.pxl-grid-no-results').hide();

        $.ajax({
            url: main_data.ajax_url,
            type: 'POST',
            beforeSend: function () {

            },
            data: {
                action: 'mrittik_load_more_product_grid',
                settings: loadmore
            }
        })
        .done(function (res) {
            if(res.status == true) {
                _this.find('.btn-product-grid-loadmore').removeClass('loading');
                _this.find('.pxl-grid-inner').append(res.data.html);
                _this.data('start-page', res.data.paged);
                _this.find('.btn-text').text(loadmore_text);

                $('.pxl-grid-masonry').imagesLoaded(function(){
                    $.sep_grid_refresh();
                });

                if(res.data.paged >= res.data.max){
                    _this.find('.pxl-load-more').hide();
                }
            }else{
                _this.find('.pxl-load-more').hide();
            }

        })
        .fail(function (res) {

            _this.find('.pxl-load-more').hide();
            return false;
        })
        .always(function () {
            return false;
        });
    });


    $(document).on('click', '.pxl-grid-pagination.pagin-product .ajax a.page-numbers', function(event) {
        event.preventDefault();
        var _this = $(this).parents(".pxl-grid");
        var layout_mode   = _this.data('layout-mode');
        var loadmore = _this.find(".pxl-grid-pagination").data('loadmore');
        var query_vars = _this.find(".pxl-grid-pagination").data('query');

        var layout_type = _this.data('layout');
        var paged = $(this).attr('href');
        paged = paged.replace('#', '');
        loadmore.paged = parseInt(paged);
        query_vars.paged = parseInt(paged);

        var _class = loadmore.pagin_align_cls;

        $('.pxl-grid').find('.pxl-grid-no-results').hide();

        var ajaxCompleted = false;

        // reload pagination
        $.ajax({
            url: main_data.ajax_url,
            type: 'POST',
            beforeSend: function () {

            },
            data: {
                action: 'mrittik_get_pagination_html',
                query_vars: query_vars,
                cls: _class
            }
        }).done(function (res) {
            if(res.status == true){
                _this.find(".pxl-grid-pagination").html(res.data.html);
            }
            else if(res.status == false){
            }
        }).fail(function (res) {
            return false;
        }).always(function () {
            ajaxCompleted = true;
            return false;
        });

        // load post
        $.ajax({
            url: main_data.ajax_url,
            type: 'POST',
            beforeSend: function () {

            },
            data: {
                action: 'mrittik_load_more_product_grid',
                settings: loadmore
            }
        }).done(function (res) { //console.log(res); return false;
            if(res.status == true){
                _this.find('.pxl-grid-inner').html(res.data.html);
                _this.data('start-page', res.data.paged);

                _this.find('.pxl-grid-masonry').imagesLoaded(function() {
                    $.sep_grid_refresh();
                });

            }
            else if(res.status == false){
            }
            $(document).off("mousewheel DOMMouseScroll");
        }).fail(function (res) {
            return false;
        }).always(function () {
            return false;
        });
        return false;
    });

    // Make sure you run this code under Elementor.
    $( window ).on( 'elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_post_grid.default', widget_post_masonry_handler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_team_grid.default', widget_post_masonry_handler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_partner_grid.default', widget_post_masonry_handler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_product_grid.default', widget_product_masonry_handler );
    } );
} )( jQuery );