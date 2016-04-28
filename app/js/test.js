$(window).load(function () {
    /*показывает картинку доставки на странице товара слева от ВИЗА*/
    var str = $('#others10').text();
    if (str.length > 0) {
        $('.delivery_inner').css('display', 'block');
        $('.visa').css('text-align', 'right');
    }

    /*класс если нет дополнительных картинок*/
    if ($('.small_images').children().length == 0) {
        $('.small_images').addClass('no_child');
    }
});
/*end window load*/

function flistLabel(elem) {
    if ($(elem).hasClass('hiden')) {
        $(elem).removeClass('hiden');
    } else {
        $(elem).addClass('hiden');
    }
}
$(document).ready(function () {
    /*Переделывает страницу поиска по магазину*/
    if ($('.goods-list').children().length == 0) {
        var text = $('#goods_cont ul li').text();
        $('.content.search_page').addClass('no_results');
        $('#goods_cont').append('<div class="warning_text"></div>');
        $('.warning_text').text(text);
        $('#goods_cont ul').remove();
    }

    function checkWidth() {
        var width = $('body').width();
        if (width > 583) {
            $('.flist-label').removeClass('hiden').removeAttr('onclick');
            $('.compare_block').insertAfter('#shop-basket');
        } else {
            $('.compare_block').appendTo('.added_compare');
            $('.flist-label').addClass('hiden').attr('onclick', 'flistLabel(this)');
        }
        if (width > 623) {
            $('.small_images').insertBefore('.pluso');
        } else {
            $('.small_images').insertAfter('.item-img');
        }
    }
    // Execute on load
    checkWidth();
    // Bind event listener
    $(window).resize(checkWidth);
});


/*bxSlider*/
$('.bxslider').bxSlider({
    auto: true,
    autoControls: false,
    pager: false
});

/*удаляет <br> из описания в виде товара*/
$('.brief br').remove()

/*переделывает меню под стили бутстрапа*/
var div = $("header .uMenuV .uMenuRoot");
var tmp = div.children().clone();
var parent = div.parent().parent();
div.parent().remove();
div.remove();
tmp.appendTo(parent);

/*выпадает поиск при клике*/
$('.mob_search').click(function () {
    $('header .search').slideToggle("fast");
})

/*добавляет пункт меню (нужно для мобильного вида козины)*/
$("<li class='added_basket'><a href='/shop/checkout'>Корзина</a></li>").appendTo('.nav.navbar-nav');
/*добавляет пункт меню (для сравнения товаров)*/
$("<li class='added_compare'></li>").appendTo('.nav.navbar-nav');

/*удаляет таблицу в которой находится ссылка на картинку с доставкой*/
$('.full-review a[href*="/index/discount/0-91"]').parents('table').remove();


/*Меняет текст на shop/checkout */
$('.order_topay_curr').prev().text('Сумма к оплате');


/*Подставляет имя выбранного файла в псевдоелемент бефор*/
$('input[type="file"][name="fld7"]').on('change', function () {
    var text = $(this).val().substr(12);
    $('input[type="file"][name="fld7"]').attr('data-title', text)
    if (text.length > 0) {
        $(this).addClass('not_empty');
    }
});
/*убирает квадратные скобки на странице поиска*/
$('.search_page .cat_name').each(function () {
    rtxt = $(this).text();
    n = rtxt.replace('[', '"').replace(']', '"').replace('Поиск', 'Поиск по запросу');
    $(this).text(n);
});
$('.search_page .breadcrumbs .current').each(function () {
    $(this).parent().html('Поиск').css('color', '#191919');
});
