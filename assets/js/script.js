//for animation

// AOS.init({
//     duration: 400,
// })

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

$("#passToAdmin").on('click', function(){
    location.replace('./admin/login.html')
})