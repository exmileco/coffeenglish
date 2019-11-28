var button = document.querySelector('#button');
var footerButton = document.querySelector('#footer_button');
var modal = document.querySelector('#modal');
var close = document.querySelector('#close');
var closeThanks = document.querySelector('#close-thanks');
var closeModalTimeout = 10000;
var closeTimeoutId;

button.addEventListener('click', function () {
    modal.classList.add('modal_active');
    closeTimeoutId = window.setTimeout(function () {
        modal.classList.remove('modal_active');
    }, closeModalTimeout);
    window.addEventListener('input', function () {
        window.clearTimeout(closeTimeoutId);
    }, true);
});
footerButton.addEventListener('click', function () {
    modal.classList.add('modal_active');
    closeTimeoutId = window.setTimeout(function () {
        modal.classList.remove('modal_active');
    }, closeModalTimeout);
    window.addEventListener('input', function () {
        window.clearTimeout(closeTimeoutId);
    }, true);
});
close.addEventListener('click', function () {
    modal.classList.remove('modal_active');
});
closeThanks.addEventListener('click', function () {
    submodal.classList.remove('submodal_active');
});
new WOW().init();
$(document).ready(function () {

    var show = true;
    var countbox = ".statistics__item";
    var faqWrapper = document.querySelectorAll('.faq-wrapper');

    faqWrapper.forEach(function(item, idx) {
        var afterCSS = document.querySelector('faq-wrapper__question::after');
        // console.log(afterCSS);
        item.addEventListener('click', function(event) {
            for (i = 0; i < faqWrapper.length; i++) {
                if (idx !== i) {
                    faqWrapper[i].children[1].classList.remove('faq-wrapper__answer_active');
                }
            }
            item.children[1].classList.toggle('faq-wrapper__answer_active');
            item.children[0].children[1].classList.toggle('faq-wrapper__arrow_down');
            // console.log(item.children[0].style);
        });
    });

    // Burger menu
    document.querySelector('.menu-icon-wrapper').onclick = function () {
        document.querySelector('.menu-icon').classList.toggle('menu-icon_active');
        document.querySelector('.nav-menu').classList.toggle('nav-menu_active');
    };
    document.querySelector('.nav-menu').onclick = function () {
        // console.log(this.parentElement);
        // this.parentElement.classList.toggle('nav-menu_active');
        // document.querySelector('.menu-icon').classList.toggle('menu-icon-active');
        document.querySelector('.menu-icon').classList.remove('menu-icon_active');
        document.querySelector('.nav-menu').classList.remove('nav-menu_active');
    };

    /*Валидация модальной формы*/
    $('#modal-form').validate({
        rules: {
            modal_username: {
                required: true,
                minlength: 2,
                maxlength: 15
            },
            modal_phone: "required"
        },
        errorElement: "span",
        errorClass: "invalid",
        messages: {
            modal_username: {
                required: "<b>Заполните поле</b>",
                minlength: jQuery.validator.format("Осталось ввести символов: {0}!"),
                maxlength: jQuery.validator.format("Символов должно быть меньше: {0}.")
            },
            modal_phone: "<b>Заполните поле</b>"
        },
        submitHandler: function (form) {
            $.ajax({
                type: "POST",
                url: "mail.php",
                data: $('#modal-form').serialize(),
                success: function (response) {
                    $('#modal-form')[0].reset();
                    modal.classList.remove('modal_active');
                    submodal.classList.add('submodal_active');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error(jqXHR + " " + textStatus);
                }
            });
        }
    });


    /* Валидация формы hero */
    $('#hero-form').validate({
        rules: {
            hero_username: {
                required: true,
                minlength: 2,
                maxlength: 15
            },
            hero_phone: "required"
        },
        errorElement: "span",
        errorClass: "invalid",
        messages: {
            hero_username: {
                required: "<b>Заполните поле</b>",
                minlength: jQuery.validator.format("Осталось ввести символов: {0}!"),
                maxlength: jQuery.validator.format("Должно быть меньше: {0}.")
            },
            hero_phone: "<b>Заполните поле</b>",
        },
        submitHandler: function (form) {
            $.ajax({
                type: "POST",
                url: "mail.php",
                data: $('#hero-form').serialize(),
                success: function (response) {
                    $('#hero-form')[0].reset();
                    submodal.classList.add('submodal_active');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error(jqXHR + " " + textStatus);
                }
            });
        }
    });
    /* Маска для валидации*/
    $('.phone').mask('8 (999) 999-99-99');

    // lazy scroll
    $(window).on("scroll load resize", function () {
        if (!show) return false; // Отменяем показ анимации, если она уже была выполнена
        var w_top = $(window).scrollTop(); // Количество пикселей на которое была прокручена страница
        var e_top = $(countbox).offset().top; // Расстояние от блока со счетчиками до верха всего документа
        var w_height = $(window).height(); // Высота окна браузера
        var d_height = $(document).height(); // Высота всего документа
        var e_height = $(countbox).outerHeight(); // Полная высота блока со счетчиками
        if (w_top + 500 >= e_top || w_height + w_top == d_height || e_height + e_top < w_height) {
            $('.statistics__figure').css('opacity', '1');
            $('.statistics__figure').spincrement({
                thousandSeparator: "",
                duration: 3000
            });

            show = false;
        }
    });

    $('.feedbacks-slider').slick({
        // centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
        dots: true,
        infinite: true,
        fade: true,
        cssEase: 'linear',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });

    /* Кнопка Вверх */
    $(document).ready(function () {
        var button = $('#buttonup');
        $(window).scroll(function () {
            if ($(this).scrollTop() > 300) {
                button.fadeIn();
            } else {
                button.fadeOut();
            }
        });
        button.on('click', function () {
            $('body, html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    });
});


/* Подключение Yandex карты */
if (document.getElementById("map")) {
    var mapContainer = "map";
    var setLoadingTimeout = 2000;
} else {
    var mapContainer = "singlemap";
    var setLoadingTimeout = 0;
}

setTimeout(function () {
    var elem = document.createElement('script');
    elem.type = 'text/javascript';
    elem.src =
        '//api-maps.yandex.ru/2.0/?apikey=b752e912-ec52-44b1-a92b-062e6dc1fd71&load=package.standard&lang=ru-RU&onload=getYaMap&scroll=false';
    document.getElementsByTagName('body')[0].appendChild(elem);
}, setLoadingTimeout);

function getYaMap() {
    var myMap = new ymaps.Map(mapContainer, {
        center: [43.244302, 76.946678],
        zoom: 17
    });

    ymaps.geocode("г. Алматы, ул. Панфилова, 154").then(function (res) {
        var coord = res.geoObjects.get(0).geometry.getCoordinates();
        var myPlacemark = new ymaps.Placemark(coord, { preset: 'twirl#yellowDotIcon' });
        myMap.controls.add('smallZoomControl', { 'top': 5, 'smooth': true });
        myMap.geoObjects.add(myPlacemark);
        myMap.setCenter(coord);
    });
}