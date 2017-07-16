$(document).ready(function($) {
    let accordionSpeed = 'fast'
    // Hamburger menu toggle
    $('.menu-icon').click(function(){
        $(this).toggleClass('open');
    });
    // Packages accordion
    $('.services').find('section[class*=package-]').click(function() {
        let contentSelector = '.package-copy'
        let content = $(this).children(contentSelector)
        if ($('.service-facets').is(':visible')) {
            $('.service-facets').slideUp(accordionSpeed)
        }
        $(contentSelector).not(content).slideUp(accordionSpeed)
        content.slideToggle(accordionSpeed)
    })
    $('.services').find('.additional-services').click(function() {
        let content = $(this).children('.service-facets')
        $('.package-copy').slideUp(accordionSpeed)
        content.slideToggle(accordionSpeed)
    })
    // FAQ accordion-toggle
    $('.content').find('.accordion-toggle').click(function(){
        $(this).next().slideToggle(accordionSpeed)
        $(".accordion-content").not($(this).next()).slideUp(accordionSpeed)
    })
})
