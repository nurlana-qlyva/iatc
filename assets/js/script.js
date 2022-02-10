//for animation

// AOS.init({
//     duration: 400,
// })

//Slider banner

$(document).ready(function(){
    $('.banner-slider').slick({
        accessibility: true,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
    });
    $('.course-slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        accessibility: true,
        autoplay: true,
        dots: true,
        autoplaySpeed: 3000,
        responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 1008,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 780,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ],
    });
    $('.member-slider').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 3,
        accessibility: true,
        autoplay: true,
        dots: true,
        autoplaySpeed: 3000,
        responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 1008,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 800,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ],
    })
    $('.partner-slider').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        accessibility: true,
        autoplay: true,
        dots: true,
        autoplaySpeed: 3000,
        responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 1008,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 800,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ],
    })
});
// menu bar
$(function(){
    $('.menu').click(function(){
        $('.side-menu').toggleClass('show');
        $('.mega-menu').addClass('transform00');
    })
    $('.side-menu').click(function(){
        $(this).removeClass('show');
        $('.mega-menu').removeClass('transform00');
    })
    $('.mega-menu').click(function(e){
        e.stopPropagation();
    })
    $('.show-submenu').click(function(){
        $(this).parents('.has-submenu').siblings('.has-submenu').removeClass('active').find('.sub-menu').slideUp();
        $(this).parents('.has-submenu').toggleClass('active').find('.sub-menu').slideToggle();
    })
    $('.general-list li a').click(function(e){
        e.preventDefault();
        $(this).parents('li').toggleClass('This');
        $(this).find('span').addClass('test')
    })
    $('.general-list li').eq(2).addClass('pink').nextUntil('.prountil').addClass('.lorem');
})