
$(document).ready(function(){

    // Animación hero

    $(".hero-title").hide().fadeIn(1200);

    $(".hero-card").hide().slideDown(1200);

    // Hover dinámico

    $(".feature-card").hover(

        function(){

            $(this).addClass("shadow-lg");

        },

        function(){

            $(this).removeClass("shadow-lg");

        }

    );

});


