$('.shop-options .shop-options').addClass('loader');
$(".shop-options-s").each(function () {
    $(this).after("<span class=\"shop-options-li\"></span>");
    $(this).hide()
});
$(".shop-options-s option").each(function () {
    if ($(this).text() != "Выбрать") {
        $(this).parent().next().append("<a href='javascript:void(0);' id=\"" + $(this).parent().attr("id") + "-" + $(this).attr("value") + "\" class=\"option-link \" data-id=" + $(this).attr("value") + ">" + $(this).text() + "</a> ");
    }
});
$(".option-link").click(function () {
    if (!($(this).hasClass('nostock') || $(this).hasClass('nostock-temp'))) {
        var dataid = $(this).attr('data-id');
        linkIdArray = $(this).attr("id").split('-');
        selectId = linkIdArray[0] + '-' + linkIdArray[1] + '-' + linkIdArray[2] + '-' + linkIdArray[3];
        optionValue = linkIdArray[4];
        $(".val .active").each(function () {
            if (this.id.indexOf(selectId) != -1) {
                $(this).removeClass("active");
            }
        });
        if (this.className.indexOf('active') == -1) {
            $(this).addClass('active');
            $("#" + selectId + " option").each(function () {
                if ($(this).attr("value") == optionValue) {
                    $(this).parent().find('option').removeAttr("selected");
                    $(this).attr("selected", "selected")
                }
            });
            $("#" + selectId).change()
        } else {
            $(this).removeClass("active");
            $("#" + selectId + " option[value='0']").attr("selected", "selected");
            $("#" + selectId + " option[value='0']").addClass("active");
            $("#" + selectId).change()
        }
        //чекаем при клике есть ли наличие опции сайза
        if ($(this).parent().parent().hasClass('colors')) {
            if ( /*!$('.size .shop-options-li > .active').length > 0*/ true) {
                $('.tov-desc .shop-options > li > span.size').addClass('loader');
                $('.size .shop-options-li a').removeClass('nostock-temp');
                //$('.size .shop-options-s option').removeAttr("selected");
                //$('.size .shop-options-s').change();
                var ajax_opt_id = $('.colors .shop-options-s').attr('id').split('-')[3];
                var ajax_opt_1 = ajax_opt_id;
                var ajax_opt_2 = $('.size .shop-options-s').attr('id').split('-')[3];
                var stock, thissize, thiscolor, option1, option2;
                if (dataid == 0) {
                    option1 = ajax_opt_1;
                } else {
                    option1 = '' + ajax_opt_1 + '-' + dataid + '';
                }
                $('.size .shop-options-s option').not(':first').each(function (i) {
                    if (i == 0) {
                        option2 = ajax_opt_2;
                    } else {
                        option2 = '' + ajax_opt_2 + '-' + i + '';
                    }
                    $.ajax({
                        method: "POST",
                        url: window.location.pathname,
                        timeout: 20000,
                        cache: false,
                   //     async: false,
                        data: {
                            mode: 'opt-sel',
                            pref: 'id',
                            opt: '' + option1 + ':' + option2 + '',
                            opt_id: ajax_opt_id,
                            cnt: 1,
                            _tp_: 'xml'
                        },
                        statusCode: {
                            200: function (data, textStatus, jqXHR) {
                                var script = $(data).text();
                                eval(script);
                                if (!(+$('.stock').text() > 0)) {
                                    //console.log($('.size .shop-options-li a[data-id=' + i + ']').text());
                                    if ($('.size .shop-options-li a[data-id=' + i + ']').hasClass('active')) {
                                        $('.size .shop-options-s option').removeAttr("selected");
                                        $('.size .shop-options-s').change();
                                    }
                                    $('.size .shop-options-li a[data-id=' + i + ']').removeClass('active').addClass('nostock-temp');
                                }
                                if (i == $('.size .shop-options-s option').not(':first').length - 1) {
                                    $('.tov-desc .shop-options > li > span.size').removeClass('loader');
                                }
                            },
                            500: function (data, textStatus, jqXHR) {
                                alert('Internal server error');
                            },
                            503: function (data, textStatus, jqXHR) {
                                alert('Internal server error 503 :' + textStatus + jqXHR +'');
                            }
                        }
                    });
                });
            }
        }
        return false
    }
});

/*my ajax function*/
$('.stock').text('0');
var stock, thissize, thiscolor, option1, option2, mass = [];
$(document).ready(function () {

    if ($('.shop-options-s').length > 1) { //чек на наличие второй опции
        $('.size .shop-options-s option').not(':first').each(function () {
            thissize = $(this).attr('value');
            if (thissize != "") {
                $('.colors .shop-options-s option').not(':first').each(function () {
                    thiscolor = $(this).attr('value');
                    if (thiscolor != "") {
                        var arr = [thissize, thiscolor];
                        mass.push(arr);
                    }
                });
            }
        }); // делаем общий массив из опций

        var ajax_opt_id = $('.colors .shop-options-s').attr('id').split('-')[3];
        var ajax_opt_1 = ajax_opt_id;
        var ajax_opt_2 = $('.size .shop-options-s').attr('id').split('-')[3];

        $.each(mass, function (i) {
            thissize = $('.size .shop-options-s option[value=' + mass[i][0] + ']');
            thiscolor = $('.colors .shop-options-s option[value=' + mass[i][1] + ']');
            if (thiscolor.attr('value') == 0) {
                option1 = ajax_opt_1;
            } else {
                option1 = '' + ajax_opt_1 + '-' + mass[i][1] + '';
            }
            if (thissize.attr('value') == 0) {
                option2 = ajax_opt_2;
            } else {
                option2 = '' + ajax_opt_2 + '-' + mass[i][0] + '';
            }
            $.ajax({
                method: "POST",
                url: window.location.pathname,
                timeout: 15000,
             //   async: false,
                cache: false,
                data: {
                    mode: 'opt-sel',
                    pref: 'id',
                    opt: '' + option1 + ':' + option2 + '',
                    opt_id: ajax_opt_id,
                    cnt: 1,
                    _tp_: 'xml'
                },
                statusCode: {
                    200: function (data, textStatus, jqXHR) {
                        var script = $(data).text();
                        eval(script);
                        if (+$('.stock').text() > 0) {
                            //console.log($('.colors .shop-options-s option[value=' + mass[i][1] + ']').text() + "" + $('.size .shop-options-s option[value=' + mass[i][0] + ']').text());
                            $('.colors .shop-options-li a[data-id=' + mass[i][1] + '], .size .shop-options-li a[data-id=' + mass[i][0] + ']').removeClass('nostock').addClass('instock');
                        } else {
                            if (!$('.colors .shop-options-li a[data-id=' + mass[i][1] + ']').hasClass('instock')) {
                                $('.colors .shop-options-li a[data-id=' + mass[i][1] + ']').addClass('nostock');
                            }
                            if (!$('.size .shop-options-li a[data-id=' + mass[i][0] + ']').hasClass('instock')) {
                                $('.size .shop-options-li a[data-id=' + mass[i][0] + ']').addClass('nostock');
                            }
                        }
                        if (i === mass.length - 1) {
                            $('.shop-options .shop-options').removeClass('loader');
                        }
                    },
                    500: function (data, textStatus, jqXHR) {
                        alert('Internal server error');
                    },
                    503: function (data, textStatus, jqXHR) {
                        alert('Internal server error 503 :' + textStatus + jqXHR +'');
                    }
                }
            });
        });
    } else { //если опция одна
        var ajax_opt_id = $('.shop-options-s').attr('id').split('-')[3];
        var ajax_opt_1 = ajax_opt_id;
        var option1;
        $('.shop-options-s option').not(':first').each(function (i) {
            if (i == 0) {
                option1 = ajax_opt_1;
            } else {
                option1 = '' + ajax_opt_1 + '-' + i + '';
            }
            $.ajax({
                method: "POST",
                url: window.location.pathname,
                timeout: 15000,
              //  async: false,
                cache: false,
                data: {
                    mode: 'opt-sel',
                    pref: 'id',
                    opt: option1,
                    opt_id: ajax_opt_id,
                    cnt: 1,
                    _tp_: 'xml'
                },
                statusCode: {
                    200: function (data, textStatus, jqXHR) {
                        var script = $(data).text();
                        eval(script);
                        if (!(+$('.stock').text() > 0)) {
                            //console.log($('.size .shop-options-li a[data-id=' + i + ']').text());
                            if ($('.shop-options-li a[data-id=' + i + ']').hasClass('active')) {
                                $('.shop-options-s option').removeAttr("selected");
                                $('.shop-options-s').change();
                            }
                            $('.shop-options-li a[data-id=' + i + ']').removeClass('active').addClass('nostock-temp');
                        }
                        if (i == $('.shop-options-s option').not(':first').length - 1) {
                            $('.shop-options').removeClass('loader');
                        }
                    },
                    500: function (data, textStatus, jqXHR) {
                        alert('Internal server error');
                    },
                    503: function (data, textStatus, jqXHR) {
                        alert('Internal server error 503 :' + textStatus + jqXHR +'');
                    }
                }
            });
        });
    }
});
