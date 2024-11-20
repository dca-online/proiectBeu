(function ($) {
    "use strict";

    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
  
    new WOW().init();

    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });

    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });

    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: false,
        loop: true,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });

})(jQuery);

document.addEventListener("DOMContentLoaded", function () {
    const splashContainer = document.getElementById('splash-container');
    const splashVideo = document.getElementById('splash-video');
    const body = document.body;

    const videoSources = {
        mobile: 'img/imaginiGradini/GazonAZVideoPhone3.mp4',
        mobileWide: 'img/imaginiGradini/1080x2560fast.mp4',
        tablet: 'img/imaginiGardini/1080x2560fast.mp4',
        largeDevices: 'img/imaginiGradini/1920x1080fast.mp4',
        desktop: 'img/imaginiGardini/1920x1080fast.mp4'
    };

    function getVideoSource() {
        const screenWidth = window.innerWidth;
        console.log('Screen width:', screenWidth);
        
        if (screenWidth <= 600) {
            console.log('Selecting mobile');
            return videoSources.mobile;
        }
        if (screenWidth <= 1024) {
            console.log('Selecting mobile wide');
            return videoSources.mobileWide;
        }
        if (screenWidth <= 1366) {
            console.log('Selecting tablet');
            return videoSources.tablet;
        }
        if (screenWidth <= 1920) {
            console.log('Selecting large devices');
            return videoSources.largeDevices;
        }
        console.log('Selecting desktop');
        return videoSources.desktop;
    }

    function setVideoSource() {
        const source = getVideoSource();
        console.log('Full source path:', source);
        
        splashVideo.src = source;
        splashVideo.load();
        
        splashVideo.onloadedmetadata = () => {
            console.log('Metadata loaded, attempting to play');
            splashVideo.play().catch(error => {
                console.error('Autoplay error:', error);
            });
        };

        splashVideo.onerror = (e) => {
            console.error('Video error:', e);
        };
    }

    function hideSplashScreen() {
        splashContainer.classList.add('hidden');
        body.classList.add('loaded');
        setTimeout(() => {
            splashContainer.style.display = 'none';
        }, 500);
    }

    setVideoSource();

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(setVideoSource, 250);
    });

    splashVideo.addEventListener('ended', hideSplashScreen);
    setTimeout(hideSplashScreen, 2000);
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#estimareForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('gname').value,
            email: document.getElementById('gmail').value,
            phone: document.getElementById('cname').value,
            service: document.getElementById('cage').value,
            message: document.getElementById('message').value
        };
        
        fetch('telegramForm.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Mesaj trimis cu succes! Vă vom contacta în curând.');
                form.reset();
            } else {
                alert('Eroare la trimitere: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Eroare:', error);
            alert('A apărut o eroare. Vă rugăm să încercați din nou.');
        });
    });
});
