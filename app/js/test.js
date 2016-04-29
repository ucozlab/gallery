 (function ($) {
     if ($('#chose_file1').length) {
         $('#chose_file1').click(function () {
             $('#chose_file_input1').click();
             return (false);
         });
         $('#chose_file_input1').change(function () {
             $('#chose_file1').html($(this).val().replace(/.*(\/|\\)/, ''));
         }); // .change() в конце для того чтобы событие сработало при обновлении страницы
     }
 })($);
