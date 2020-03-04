/*================================
login form focus
==================================*/
$('.form-gp input').on('focus', function() {
    $(this).parent('.form-gp').addClass('focused');
});
$('.form-gp input').on('focusout', function() {
    if ($(this).val().length === 0) {
        $(this).parent('.form-gp').removeClass('focused');
    }
});