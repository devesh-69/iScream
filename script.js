// const scroll = new LocomotiveScroll({
//     el: document.querySelector('#main'),
//     smooth: true
// });

$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    stagePadding: 70,
    nav: false,
    animateOut: 'fadeOut',
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 3
        },
        1000: {
            items: 4
        },
        1440: {
            items: 5
        }
    }
})