'use strict';

$(document).ready(function () {

    // leftbar toggle for minbar
    var nice = $(".left-bar").niceScroll(); 
    $('.menu-bar').click(function(){                  
        $(".wrapper").toggleClass('mini-bar');        

        $(".left-bar").getNiceScroll().remove();
        setTimeout(function() {
            $(".left-bar").niceScroll();
        }, 200);
    }); 
    
    // mobile menu
    $('.menu-bar-mobile').on('click', function (e) {        
        // $(this).addClass('menu_appear');
        $(".left-bar").getNiceScroll().remove();
        
        $( ".left-bar" ).toggleClass("menu_appear" );
        $( ".overlay" ).toggleClass("show" );
        setTimeout(function() {
          $(".left-bar").niceScroll();
        }, 200);
    });

    // orvelay hide menu
    $(".overlay").on('click',function(){
        $( ".left-bar" ).toggleClass("menu_appear" );
        $(this).removeClass("show");
    });

    // right side-bar toggle
    $('.right-bar-toggle').on('click', function(e){
        e.preventDefault();
        $('.wrapper').toggleClass('right-bar-enabled');
    });

    $('ul.menu-parent').accordion();

    // PANELS
    // panel close
    $('.panel-close').on('click', function (e) {
        e.preventDefault();
        $(this).parent().parent().parent().parent().addClass(' animated fadeOutDown');
    });


    $('.panel-minimize').on('click', function (e) 
    {
        e.preventDefault();
        var $target = $(this).parent().parent().parent().next('.panel-body');
        if ($target.is(':visible')) {
            $('i', $(this)).removeClass('ti-angle-up').addClass('ti-angle-down');
        } else {
            $('i', $(this)).removeClass('ti-angle-down').addClass('ti-angle-up');
        }
        $target.slideToggle();
    });
    
    
    $('.panel-refresh').on('click', function (e) 
    {
        e.preventDefault();
        // alert('vj');
        var $target = $(this).closest('.panel-heading').next('.panel-body');
        $target.mask('<i class="fa fa-refresh fa-spin"></i> Loading...');

        setTimeout(function () {
            $target.unmask();
            console.log('ended');
        },1000);
    });

    //Active menu item expand automatically on reload or fresh open
    
    if (!$('.wrapper').hasClass("mini-bar") && $(window).width() > 1200) {
        $('.submenu li.active').closest('.submenu').addClass('current');
        var activeMenu = $('.submenu li.current').closest('ul').css('display','block');
    }
    


    if($(".mail_list").length > 0){
        $(".mail_list").niceScroll();    
    }

    if($(".mails_holder").length > 0){
        $(".mails_holder").niceScroll();    
    }

    if($(".mail_brief_holder").length > 0){
        $(".mail_brief_holder").niceScroll();    
    }
    
    if($("#paginator").length > 0){
        $('#paginator').datepaginator();
    }

    if($(".table-row").length > 0){
        $('.table-row').on('click', function(){
            // $('.table-row').removeClass('active');
            $(this).toggleClass('active');
        }); 
    }

    if($(".pick-a-color").length > 0){
        $(".pick-a-color").pickAColor({
          showSpectrum            : true,
            showSavedColors         : true,
            saveColorsPerElement    : true,
            fadeMenuToggle          : true,
            showAdvanced            : true,
            showBasicColors         : true,
            showHexInput            : true,
            allowBlank              : true,
            inlineDropdown          : true
        });    
    }

    if($('#colorPicker').length > 0){
        var $box = $('#colorPicker');
        $box.tinycolorpicker();    
    }

    if($('#picker').length > 0){
        $('#picker').colpick({
            flat:true,
            layout:'hex',
            submit:0
        });    
    }
});