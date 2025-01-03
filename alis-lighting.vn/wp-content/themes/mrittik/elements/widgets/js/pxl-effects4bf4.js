( function( $ ) {
    var pxl_widget_image_handler = function( $scope, $ ) {
        /* Image Effect */
        if($('.pxl-image-tilt').length) {
            $('.pxl-image-tilt').each(function () {
                var $this = $(this);
                VanillaTilt.init($this[0], {
                    max: 3,
                    speed: 1000,
                    glare: false,
                    "max-glare": 0.5,
                    perspective: 1400,
                    easing: "cubic-bezier(.03, .98, .52, .99)",
                    reset: true
                });
            });
        }

        /* Ink Transition Effect */
        const inkTriggers = [...document.querySelectorAll('.pxl-image-ink')];
        const pxl_controller = new ScrollMagic.Controller();
        inkTriggers.map(ink => {
            const sceneInk = new ScrollMagic.Scene({
                triggerElement: ink,
                triggerHook: 'onEnter',
            })
            .setClassToggle(ink, 'is-active')
            .reverse(false)
            .addTo(pxl_controller);
        });

        /* Scroll Load Effect */
        const imagesAni = document.querySelectorAll(".pxl-image-scroller img");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = 1;
                        entry.target.style.filter = "grayscale(0)";
                    } else {
                        entry.target.style.opacity = 0;
                        entry.target.style.filter = "grayscale(1)";
                    }
                });
            },
            {
                threshold: 0.15
            }
            );
        imagesAni.forEach((el, i) => {
            observer.observe(el);
        });

    };

    var pxl_widget_text_image = function( $scope, $ ) {
        if($scope.find('.pxl-text-img-wrap').length <= 0) return;
        var mouseX = 0,
        mouseY = 0;

        $scope.find('.pxl-text-img-wrap .pxl-item--inner').mousemove(function(e){
            var offset = $(this).offset();
            mouseX = (e.pageX - offset.left);
            mouseY = (e.pageY - offset.top);
        });

        $scope.find('.pxl-text-img-wrap ul>li').on("mouseenter", function() {
            $(this).removeClass('deactive').addClass('active');
            var target = $(this).attr('data-target');
            $(this).closest('.pxl-item--inner').find(target).removeClass('deactive').addClass('active');
        });
        $scope.find('.pxl-text-img-wrap ul>li').on("mouseleave", function() {
            $(this).addClass('deactive').removeClass('active');
            var target = $(this).attr('data-target');
            $(this).closest('.pxl-item--inner').find(target).addClass('deactive').removeClass('active');
        });
        const s = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        },
        t = gsap.quickSetter($scope.find('.pxl-text-img-wrap .pxl-item--inner'), "css"),
        e = gsap.quickSetter($scope.find('.pxl-text-img-wrap .pxl-item--inner'), "css");

        gsap.ticker.add((() => {
            const o = .15,
            i = 1 - Math.pow(.85, gsap.ticker.deltaRatio());
            s.x += (mouseX - s.x) * i,
            s.y += (mouseY - s.y) * i,
            t({
                "--pxl-mouse-x": `${s.x}px`
            }), e({
                "--pxl-mouse-y": `${s.y}px`
            })
        }))
    };

    var pxl_widget_button_handler = function( $scope, $ ) {

    };

    var pxl_gsap_ani = function( $scope, $ ) {
        gsap.registerPlugin(SplitText, ScrollTrigger);

        // SplitText
        var st = $scope.find(".pxl-split-text");
        // if(st.length == 0) return;
        st.each(function(index, el) {
            el.split = new SplitText(el, {
                type: "lines,words,chars",
                linesClass: "split-line"
            });
            gsap.set(el, { perspective: 400 });

            if( $(el).hasClass('split-in-fade') ){
                gsap.set(el.split.chars, {
                    opacity: 0,
                    ease: "Back.easeOut",
                });
            }
            if( $(el).hasClass('split-in-right') ){
                gsap.set(el.split.chars, {
                    opacity: 0,
                    x: "50",
                    ease: "Back.easeOut",
                });
            }
            if( $(el).hasClass('split-in-left') ){
                gsap.set(el.split.chars, {
                    opacity: 0,
                    x: "-50",
                    ease: "circ.out",
                });
            }
            if( $(el).hasClass('split-in-up') ){
                gsap.set(el.split.chars, {
                    opacity: 0,
                    y: "80",
                    ease: "circ.out",
                });
            }
            if( $(el).hasClass('split-in-down') ){
                gsap.set(el.split.chars, {
                    opacity: 0,
                    y: "-80",
                    ease: "circ.out",
                });
            }
            if( $(el).hasClass('split-in-rotate') ){
                gsap.set(el.split.chars, {
                    opacity: 0,
                    rotateX: "50deg",
                    ease: "circ.out",
                });
            }
            if( $(el).hasClass('split-in-scale') ){
                gsap.set(el.split.chars, {
                    opacity: 0,
                    scale: "0.5",
                    ease: "circ.out",
                });
            }
            el.anim = gsap.to(el.split.chars, {
                scrollTrigger: {
                    trigger: el,
                    toggleActions: "restart pause resume reverse",
                    start: "top 90%",
                },
                x: "0",
                y: "0",
                rotateX: "0",
                scale: 1,
                opacity: 1,
                duration: 0.8,
                stagger: 0.02,
            });
        });

        // ScrollTrigger
        const scrollEx = () => {
            document.body.style.overflow = 'auto';
            var prevSection = $scope.prev('section');
            gsap.utils.toArray($scope.find('.element-scroll')).forEach((section, index) => {
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

    };

    var pxl_widget_image_box_handler = function( $scope, $ ) {
        if (window.elementorFrontend.isEditMode()) {
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

            $(window).on('scroll', function () {
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

            });

        }

        $scope.find('.pxl-image-box2').each(function() {
            var $this = $(this);
            var item_text = $this.find('.item--text');
            var item_text_div = $this.find('.item--text div');
            var item_image = $this.find('.item--image');

            text_divider(item_text);
            var elements = $this.find(".item--text div");
            var diviseur = 360 / elements.length;
            var compteur = 1;

            elements.each(function(index, element) {
                var degrees = diviseur * compteur;
                $(element).css("transform", "translate(-50%,-95%) rotate(" + degrees + "deg)");
                compteur++;
            });

            function text_divider(element) {
                if ($(element).length > 0) {
                    var texts = $(element);
                    texts.each(function(index, theText) {
                        var newText = "";
                        for (var i = 0; i < theText.innerText.length; i++) {
                            if (theText.innerText[i] == " ") {
                                newText += "<div>&nbsp;</div>";
                            } else {
                                newText += "<div>" + theText.innerText[i] + "</div>";
                            }
                        }
                        newText += "<div>&nbsp;</div>";
                        $(theText).html(newText);
                    });
                }
            }

            var tl__emoji = new TimelineMax();
            item_text.mouseenter(function() {
                gsap.to(item_image, 2, {
                    rotation: 360,
                    scale: 1.3,
                    ease: Elastic.easeOut.config(1, 1)
                });
                gsap.to($this.find('.item--text div'), 0.5, {
                    scale: 1.5,
                    ease: Elastic.easeInOut.config(1, 1)
                });
            });

            $this.find('.item--text').mouseleave(function() {
                gsap.to(item_image, 2, {
                    rotation: 0,
                    scale: 1,
                    ease: Elastic.easeOut.config(1, 1)
                });
                gsap.to($this.find('.item--text div'), 0.5, {
                    scale: 1,
                    ease: Elastic.easeInOut.config(1, 1)
                });
            });

            var tl__rotateText = new TimelineMax({
                repeat: -1
            });
            tl__rotateText.to(item_text, 10, {
                rotate: 360,
                ease: Power0.easeNone
            });
        });

    };

    $( window ).on( 'elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_image.default', pxl_widget_image_handler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_button.default', pxl_widget_button_handler );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_meta_box.default', pxl_widget_text_image );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_heading.default', pxl_gsap_ani );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_image_box.default', pxl_widget_image_box_handler );
    } );
} )( jQuery );