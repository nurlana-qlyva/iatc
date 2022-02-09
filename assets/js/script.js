//for animation

AOS.init({
    duration: 400,
})

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
    });
    $('.member-slider').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 3,
        accessibility: true,
        autoplay: true,
        dots: true,
        autoplaySpeed: 3000,
    })
    $('.partner-slider').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        accessibility: true,
        autoplay: true,
        dots: true,
        autoplaySpeed: 3000,
    })
});