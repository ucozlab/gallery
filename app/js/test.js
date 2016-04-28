var windowSize = $(window).width();


$(window).load(function () {
    var title = $('.tov-desc > h1').text();
    if ($('.val.size select').length > 0) { //чекаем есть ли опция на странице
        var sizeHtml = $('.val.size select').html();
        $('.stock_mail_form select.size').html(sizeHtml);
    }
    if ($('.val.colors select').length > 0) { //чекаем есть ли опция на странице
        var colorsHtml = $('.val.colors select').html();
        $('.stock_mail_form select.colors').html(colorsHtml);
    }
    $('.form_title').text(title);
    $('input.title').val(title);
});
function openSearch(elem, e){
    e.preventDefault();
    $('#header #search').slideToggle(function() {
        /*if($(this).is(':visible')) {
            if($('.mobile-login').hasClass('activated')) {
                $('.mobile-login').removeClass('activated');
                $('.account-links').slideUp();
            }
            $('.searchdiv > .srchq').trigger('focus');
            //alert('some');
        } else {
            $('.searchdiv > .srchq').blur();
        }*/
    });
    if ($(elem).hasClass('activated')) {
        $(elem).removeClass('activated');
        $('.searchdiv > input[type="text"]').blur();
    } else {
        $(elem).addClass('activated');
         $('.searchdiv > input[type="text"]').focus();
    }
    /*if ($(elem).hasClass('activated')) {
        $(elem).removeClass('activated');
        $('#header #search').css('height', '0px');
        $('.searchdiv > input[type="text"]').blur();
    }  else {
        if($('.mobile-login').hasClass('activated')) {
            $('.mobile-login').removeClass('activated');
            $('.account-links').slideUp();
        }
        $(elem).addClass('activated');
        $('#header #search').css('height', '95px');
        $('.searchdiv > input[type="text"]').focus();
    }*/
}
$(document).ready(function () {

    function checkWidth() {

    }
    // Execute on load
    checkWidth();
    // Bind event listener
    $(window).resize(checkWidth);

    $('.select > span').click(function () {
        if ($(this).hasClass('activated')) {
            $(this).removeClass('activated');
            $(this).next().slideUp(300);
        } else {
            $(this).addClass('activated');
            $(this).next().slideDown(300);
        }
    });


    (function ($) {
        $.fn.popupcall = function () {
            var link = $(this).attr("data-src");
            //попап "уведомить о поступлении товара"
            $(this).click(function (e) {
                e.preventDefault();

                if ($('.val.size select').length > 0) { //чекаем есть ли опция на странице
                    var sizeHtml = $('.val.size select').html();
                    var inputSizesName = $(".val.size :selected").text();
                    $('.stock_mail_form select.size').html(sizeHtml).append('<option>Другое (укажите в тексте сообщения)</option>');
                } else {
                    $('.stock_mail_form select.size').html('<option>Размеры не заданы</option>');
                }

                if ($('.val.colors select').length > 0) { //чекаем есть ли опция на странице
                    var colorsHtml = $('.val.colors select').html();
                    var inpitColorsName = $(".val.colors :selected").text();
                    $('.stock_mail_form select.colors').html(colorsHtml).append('<option>Другое (укажите в тексте сообщения)</option>');
                } else {
                    $('.stock_mail_form select.colors').html('<option>Цвета не заданы</option>');
                }

                //$('input.size').val(inputSizesName);
                //$('input.colors').val(inpitColorsName);

                function selectSize() {
                    var inputSizesName = $('.stock_mail_form select.size :selected').text();
                    $('input.size').val(inputSizesName);
                    if ($('.stock_mail_form .size :selected').text().indexOf('Выбрать') > -1) {
                        a = false;
                        $('input.size').val('');
                    } else {
                        a = true;
                        $('input.size').val(inputSizesName);
                    }
                    if (a && b) {
                        $('.stock_mail_form input[type="submit"]').removeClass('cantpress');
                    } else {
                        $('.stock_mail_form input[type="submit"]').addClass('cantpress');
                    }
                }

                function selectColor() {
                    var inpitColorsName = $('.stock_mail_form select.colors :selected').text();
                    if ($('.stock_mail_form .colors :selected').text().indexOf('Выбрать') > -1) {
                        b = false;
                        $('input.colors').val('');
                    } else {
                        b = true;
                        $('input.colors').val(inpitColorsName);
                    }
                    if (a && b) {
                        $('.stock_mail_form input[type="submit"]').removeClass('cantpress');
                    } else {
                        $('.stock_mail_form input[type="submit"]').addClass('cantpress');
                    }
                }

                /*submit test*/
                var a = false;
                var b = false;
                if ($('.val.size select').length > 0) { //чекаем есть ли опция на странице
                    if ($('.stock_mail_form .size :selected').text().indexOf('Выбрать') > -1) {
                        a = false;
                        $('input.size').val('');
                    } else {
                        a = true;
                        $('input.size').val(inputSizesName);
                    }
                } else {
                    a = true;
                }
                if ($('.val.colors select').length > 0) { //чекаем есть ли опция на странице
                    if ($('.stock_mail_form .colors :selected').text().indexOf('Выбрать') > -1) {
                        b = false;
                        $('input.colors').val('');
                    } else {
                        b = true;
                        $('input.colors').val(inpitColorsName);
                    }
                } else {
                    b = true;
                }


                if (a && b) {
                    $('.stock_mail_form input[type="submit"]').removeClass('cantpress');
                } else {
                    $('.stock_mail_form input[type="submit"]').addClass('cantpress');
                }
                /*submit test end*/

                $('.popup-content > .' + link + '').css('display', 'block');
                $('.popup').css('display', 'block');
                $(".fader").fadeIn(400);


                $(".stock_mail_form select.size").change(selectSize);
                $(".stock_mail_form select.colors").change(selectColor);
                $('.jq-selecbox').remove();
                //$('.stock_mail_form .colors, .stock_mail_form .size').styler();

                if ($('.val.size select').length > 0) { //чекаем есть ли опция на странице
                    $('.stock_mail_form .size').styler();
                } else {
                    $('.chosen-select.size').hide();
                }

                if ($('.val.colors select').length > 0) { //чекаем есть ли опция на странице
                    $('.stock_mail_form .colors').styler();
                } else {
                    $('.chosen-select.colors').hide();
                }

                //Клики по селектам
                $('.jq-selectbox__select').click(function (event) {
                    if ($(this).hasClass('activated')) {
                        $(this).removeClass('activated');
                        return false;
                    } else {
                        $('.jq-selectbox__select').removeClass('activated');
                        $(this).addClass('activated');
                    }
                    event.stopPropagation();
                });
                $('body').on('click', function () {
                    $('.jq-selectbox__select').removeClass('activated');
                });
                $('.stock-mail').click(function () {
                    var tem1 = 'Уведомить о поступлении товара';
                    $('.popup-title').text(tem1);
                    $('.new-tems').val(tem1);
                    $('.stock_mail_form .size, .stock_mail_form .colors').trigger('refresh');
                });
                $('.request-goods').click(function () {
                    var tem2 = 'Запрос товара по E-mail';
                    $('.popup-title').text(tem2);
                    $('.new-tems').val(tem2);
                    $('.stock_mail_form .size, .stock_mail_form .colors').trigger('refresh');
                });

            });
            $(document).keyup(function (e) {
                if (e.keyCode == 27) $('.popup-close').click(); // esc
            });
        };
    })(jQuery);
    $('.popup-close').click(function () {
        $('.popup').css('display', 'none');
        $(".fader").fadeOut(400);
        setTimeout(function () {
            $('.popup-content > div').css('display', 'none');
        }, 500);
    });
    /*end*/
    $(function () {
        $(".popup-button").popupcall();
    });

    $('.mobilemenu').click(function (e) {
        var heightMenu = $(document).outerHeight(true);
        e.preventDefault();
        if ($(this).hasClass('activated')) {
            $(this).removeClass('activated');
            $('footer + .fader').fadeOut(500);
            $('#aside').height(heightMenu - 10);
        } else {
            $(this).addClass('activated');
            $('.popup').css('display', 'none');
            $('footer + .fader').fadeIn(500);
            $('#aside').height(heightMenu + 10);
        }
    });
    //закрываем меню по клику в не область
    $('.fader').click(function (e) {
        var heightMenu = $(document).outerHeight(true);
        var targetclick = $(e.target);
        if (!(targetclick.parents('.popup').length)) {
            $('.mobilemenu').removeClass('activated');
            $('#aside').height(heightMenu - 10);
            $('.popup').css('display', 'none');
            $('.fader').fadeOut(500);
        }
    });
    //кнопка поднять вверх
    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() != 0) {
                $('#scrollup').fadeIn();
            } else {
                $('#scrollup').fadeOut();
            }
        });
        $('#scrollup').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 800);
        });
    });
});
//mailform
function mailform(event, element) {
    var text = $(element).text();
    $('.select > span').text(text);
    if ($('div[class*="mailform"]').hasClass('mailformactivated')) {
        $('.mailform1, .mailform2').fadeOut(500);
        setTimeout(function () {
            $('.mailform' + event + '').fadeIn(500);
        }, 500);
    } else {
        $('div[class="mailform' + event + '"]').fadeIn(500).addClass('mailformactivated');
    }
    $('.select > span').removeClass('activated');
    $('.select > span').next().slideUp(500);
}

//accordeon
(function ($) {
    $.fn.accordeoncall = function () {
        $(this).click(function (e) {
            if ($(this).hasClass('activated')) {
                $(this).removeClass('activated');
                $(this).next().slideUp(300);
            } else {
                if (windowSize > 768) {
                    $('.accordeon-title.activated + .accordeon-desc').slideUp(300);
                    $('.accordeon-title').removeClass('activated');
                }
                $(this).addClass('activated');
                $(this).next().slideDown(300);
            }
        });
    };
})(jQuery);
//$('ul.accordeon .accordeon-title').accordeoncall();
$(window).resize($('ul.accordeon .accordeon-title').accordeoncall());

//активный пункт меню в личном кабинете
if (window.location.href.indexOf('index/8') > -1) {
    $('#aside .uMenuRoot li:nth-of-type(2) a').css('font-weight', 'bold');
}

//редирект на главную с личного кабинета
$('a[href="/index/10"], .logout').click(function () {
    if (window.location.href.indexOf('index/8') > -1) {
        $.ajax({
            url: 'http://littledrama.ru/index/10',
            type: "POST",
            async: true,
            success: function (data) {
                window.location.replace("/");
            }
        });
    }
});

//плавающий хедер
$(window).scroll(function () {
    if ($(window).scrollTop() <= "70") {
        $('#header .sideline').removeClass("scrolled");
    } else {
        $('#header .sideline').addClass("scrolled");
    }
});

//Дизейбл поля количества товаров на странице заказа
$('.order-submited .order-item-cnt input').attr('disabled', 'disabled');
//=====
//В ссылки товаров на странице price добавляем - target="_blank"
$('#shop-price-list tr[id^="goods"] td:first-child > a').attr('target', '_blank');
//=====
//Добавляем ярлык новинки
$('#goods_cont .list-cats a:contains("New")').parents('.list-item-img').append('<span class="list-item-img-novinka">New</span>');
if ($('.tov-desc .list-cats a:contains("New")').length > 0) {
    $('<span class="title-desc">Новинка сезона</span>').insertAfter('.tov-desc > h1');
}
//=====
//Вспливашка описания товара
$('.tov-page .description-opt > span').click(function () {
    if ($(this).hasClass('activated')) {
        $(this).removeClass('activated');
    } else {
        $(this).addClass('activated');
    }
});
//=====
//Всплывашки
$('.mobile-login').click(function () {
    if ($(this).hasClass('activated')) {
        $(this).removeClass('activated');
        $(this).next('.delivery, .account-links').slideUp(300);
    } else {
        $('.sideline-search a').removeClass('activated');
        $('#search').css('height', '0px');
        $(this).addClass('activated');
        $(this).next('.delivery, .account-links').slideDown(300);
    }
});
//=====
//Удаляем пробелы в опциях
$('.shop-options .shop-options li').contents().filter(function () {
    if (this.nodeType === 3) {
        $(this).remove();
    }
});
//=====
//перестройка товаров в категории
if (!$.cookie('item_mode')) {
    $(".item-shop").addClass("normal");
}
$(".item-shop").addClass($.cookie("item_mode"));
$(".normal-mode").live("click", function () {
    $.cookie("item_mode", "normal", {
        expires: 7,
        path: "/"
    });
});
$(".table-mode").live("click", function () {
    $.cookie("item_mode", "table", {
        expires: 7,
        path: "/"
    });
});
$(".compact-mode").live("click", function () {
    $.cookie("item_mode", "small", {
        expires: 7,
        path: "/"
    });
});

function easyRander(_class) {
    var speedIN = 200;
    var speedOUT = 100;
    var easyCLASS = '.item-shop';

    $(easyCLASS).animate({
        opacity: 0
    }, speedOUT, function () {
        $(this).animate({
            height: '100%'
        }, speedOUT, function () {
            $(this).removeClass('normal').removeClass('table').removeClass('small');
            $(this).addClass(_class).animate({
                height: 'auto'
            }, speedIN, function () {
                $(this).animate({
                    opacity: 1
                }, speedIN);
            });
        });
    });
};
//=====
//Закрытие попапа после отправки сообщения
$('.stock_mail_form .popup_inputs input[type="submit"]').click(function () {
    var def = /.+@.+\..+/i;
    if (!$(this).hasClass('cantpress') && def.test($('.stock_mail_form .user-mail').val())) {
        $('.popup-close').trigger('click');
    }
});
//=====
//Закрываем поиск по скролу
$(window).scroll(function () {
    if ($('.sideline-search a').hasClass('activated'))
        $('.sideline-search a').removeClass('activated');
    $('#search').removeClass('activated');
});
//=====
//Закрываем поиск и вход по клику вне елемента
$('.sideline + wrapper,.mainpage,footer,#main').on('click', function (e) {
    $('.sideline-search > a, .mobile-login').removeClass('activated');
    $('#search').css('height', '0px');
    if (windowSize <= 480) {
        $('.account-links').slideUp(300);
    }
});
//=====
//Очищаем формы на странице контактов
$('.mailform1 input[type="button"],.mailform2 input[type="button"]').click(function () {
    if (!$('.mailform1 input, .mailform1 textarea, .mailform2 input, .mailform2 textarea').hasClass('borderRed')) {
        setTimeout(function () {
            $('form[name="mform"]').trigger('reset');
        }, 500);
    }
});
//=====
if ($('.uMenuRoot > li > a:first-child').hasClass('uMenuItemA')) {
    $('.uWithSubmenu > span').css('font-weight', 'normal');
    $('.uWithSubmenu > ul').slideUp('fast');
    $('.uWithSubmenu > span').click(function () {
        if ($(this).css('font-weight') == '600') {
            $(this).css('font-weight', 'normal');
        } else {
            $(this).css('font-weight', '600');
        }
    });
}
