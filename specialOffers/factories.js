
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function booknow() {
    // Scroll to the element with id 'container5'
    document.getElementById('book-formNow').scrollIntoView({ behavior: 'smooth' });
}


$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 18,
    stagePadding: 40,
    nav: false,
    animateOut: 'fadeOut',
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        768: {
            items: 2
        },
        1000: {
            items: 3
        },
        1440: {
            items: 3
        }
    }
})
