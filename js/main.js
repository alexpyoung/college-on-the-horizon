$(document).ready(function($) {
    $('.content').find('.accordion-toggle').click(function(){
        $(this).next().slideToggle('fast');
        $(".accordion-content").not($(this).next()).slideUp('fast');
    });
});
