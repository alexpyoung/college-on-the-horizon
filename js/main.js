$(document).ready(function($) {
    let accordionSpeed = 'fast'
    $('.content').find('.accordion-toggle').click(function(){
        $(this).next().slideToggle(accordionSpeed)
        $(".accordion-content").not($(this).next()).slideUp(accordionSpeed)
    })
    $('.services').find('section').click(function() {
        let contentSelector = '.package-copy'
        let content = $(this).children(contentSelector)
        $('.service-facets').slideUp(accordionSpeed)
        $(contentSelector).not(content).slideUp(accordionSpeed)
        content.slideToggle(accordionSpeed)
    })
    $('.services').find('.additional-services').click(function() {
        let content = $(this).children('.service-facets')
        $('.package-copy').slideUp(accordionSpeed)
        content.slideToggle(accordionSpeed)
    })
})
