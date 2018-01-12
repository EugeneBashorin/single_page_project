$(function(){
	/*.menu-toggle*/
	$('.menu-toggle').click(function(){
		$(this).toggleClass('active')/*add class active*/
		$('.menu').slideToggle(400)/*add slideToggle*/
	});

	$('.tabs a').click(function(){
			$(this).parents('.tab-wrap').find('.tab-cont').addClass('hide');
			$(this).parent().siblings().removeClass('active');
			var id = $(this).attr('href');
			$(id).removeClass('hide');
			$(this).parent().addClass('active');
			return false
		});
	/*add slider class/include slick */
	$('.banner-slider, .testimonial-slider').slick({
			arrows: false,//del standart buttons
			dots: true,//add dots buttons
	})

	$('.portfolio-slider').slick({
		dots:true,
		appendArrows:'.portfolio-slider_button',
		prevArrow:'<button type="button" class="slick-prev"><i class="fa fa-chevron-left"></i></button>',
		nextArrow:'<button type="button" class="slick-next"><i class="fa fa-chevron-right"></i></button>',
		/*использует настройки на нужном расширении*/
		responsive: [
		{
			breakpoint: 767,/*измен. хар-ка на расширении 767px*/			
			settings: {/*примен настройки*/
				dots:false,
			}
		}
		]

	})

	/*slider for portfolio_TABS*/
	$nav_tabs_slider = $('.nav-tab-list');//записываем в переменую значение класса
	settings = {
			slidesToShow : 1,
			prevArrow:'<button type="button" class="slick-prev"><i class="fa fa-chevron-left"></i></button>',
			nextArrow:'<button type="button" class="slick-next"><i class="fa fa-chevron-right"></i></button>',
			infinite: false,//убираем постоянную прокрутку
	}

	$nav_tabs_slider.on('afterChange', function(event, slick, currentSlide, nextSlide){
			$(this).parents('.tab-wrap').find('.tab-cont').addClass('hide');
			$(this).find('.slick-current').removeClass('active');

			var id = $(this).find('.slick-current a').attr('href');
			$(id).removeClass('hide');
			$(this).find('.slick-current').addClass('active');
			return false
	})

	/*ограничиваем появление слайдера, только на зкранах 767px*/
	$(window).on('resize load', function(){
		if($(window).width() > 767){
					if($nav_tabs_slider.hasClass('slick-Initialized')){//если класс имеет ...
							$nav_tabs_slider.slick('unslick') 	//останавливаем слайдер
					}
				return						
				}
			if(!$nav_tabs_slider.hasClass('slick-Initialized')){//если класс не имеет ...
				return $nav_tabs_slider.slick(settings) 	//start слайдер
		}
	})

});
function initMap(){
	var coordinates = {lat: -37.806006, lng: 144.961291},//координаты центра карты
			markerImg = 'img/marker.png',//иконка для маркера (путь то Index.html файла)
//create map
map = new google.maps.Map(document.getElementById('map'),{
	center:coordinates,
	zoom:16,//определяет первоначальный мастаб
	disableDefaultUI: true,//убираем эл управления
	scrollwheel: false,//отключает масштабирование колесиком мыши(подезно если, карта на всю высоту экрана)
});
//create marker
marker = new google.maps.Marker({
	position: coordinates,
	map: map,
	animation: google.maps.Animation.DROP,//анимация маркера DROP / BOUNCE
	icon: markerImg,
});
}
//Запускаем карту при загрузке страницы
google.maps.event.addDomListener(window, 'load', initMap);