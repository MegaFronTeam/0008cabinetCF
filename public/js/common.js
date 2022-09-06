"use strict";
const JSCCommon = { 
	modalCall() {
		const link = '[data-fancybox="modal"], .link-modal-js';

		Fancybox.bind(link, {
			arrows: false,
			// infobar: false,
			touch: false,
			trapFocus: false,
			placeFocusBack: false,
			infinite: false,
			dragToClose: false,
			type: 'inline',
			autoFocus: false,
			groupAll: false,
			groupAttr: false,
			// showClass: "fancybox-throwOutUp",
			// hideClass: "fancybox-throwOutDown",
			l10n: {
				Escape: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад",
			},
		});
		
		Fancybox.bind('.link-modal-aside-js', {
			arrows: false,
			// infobar: false,
			touch: false,
			trapFocus: false,
			placeFocusBack: false,
			infinite: false,
			dragToClose: false,
			type: 'inline',
			autoFocus: false,
			groupAll: false,
			groupAttr: false,
			mainClass:"fancy-aside",
			// parentEl: document.querySelector(".main-center-wrap"),
			showClass: "fancybox-throwOutUp",
			hideClass: "fancybox-throwOutDown",
			l10n: {
				Escape: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад",
			},
		});

		document.querySelectorAll(".modal-close-js").forEach(el=>{
			el.addEventListener("click", ()=>{
				Fancybox.close();
			})
		})
		Fancybox.bind('[data-fancybox]', {
			placeFocusBack: false,
		});
		const linkModal = document.querySelectorAll(link);
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href") || '#'+element.dataset.src);
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
					setValue(data.newTarif, '.newTarif');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		document.addEventListener("click", function (event) {
			const toggle = document.querySelectorAll(".toggle-menu-mobile--js");
			const menu = document.querySelector(".menu-mobile--js");
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed"));
		}, { passive: true });
	},
	closeMenu() {
		const toggle = document.querySelectorAll(".toggle-menu-mobile--js");
		const menu = document.querySelector(".menu-mobile--js");
		if (!menu) return;
		if (menu.classList.contains("active")) {
			toggle.forEach(element => element.classList.remove("on"));
			menu.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed"));
		}

	},
	mobileMenu() { 
		const menu = document.querySelector(".menu-mobile--js");
		if (!menu) return;
		this.toggleMenu();
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)
			let link = event.target.closest(".menu-mobile .menu a"); // (1)
			let toggle = event.target.closest('.toggle-menu-mobile--js.on'); // (1)
			if (!container && !toggle) this.closeMenu();
		}, { passive: true });
		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 992px)").matches) this.closeMenu();
		}, { passive: true });
	},

	// tabs  .
	tabscostume(tab) {
		// const tabs = document.querySelectorAll(tab);
		// const indexOf = element => Array.from(element.parentNode.children).indexOf(element);
		// tabs.forEach(element => {
		// 	let tabs = element;
		// 	const tabsCaption = tabs.querySelector(".tabs__caption");
		// 	const tabsBtn = tabsCaption.querySelectorAll(".tabs__btn");
		// 	const tabsWrap = tabs.querySelector(".tabs__wrap");
		// 	const tabsContent = tabsWrap.querySelectorAll(".tabs__content");
		// 	const random = Math.trunc(Math.random() * 1000);
		// 	tabsBtn.forEach((el, index) => {
		// 		const data = `tab-content-${random}-${index}`;
		// 		el.dataset.tabBtn = data;
		// 		const content = tabsContent[index];
		// 		content.dataset.tabContent = data;
		// 		if (!content.dataset.tabContent == data) return;

		// 		const active = content.classList.contains('active') ? 'active' : '';
		// 		// console.log(el.innerHTML);
		// 		content.insertAdjacentHTML("beforebegin", `<div class="tabs__btn-accordion  btn btn-primary  mb-1 ${active}" data-tab-btn="${data}">${el.innerHTML}</div>`)
		// 	})


		// 	tabs.addEventListener('click', function (element) {
		// 		const btn = element.target.closest(`[data-tab-btn]:not(.active)`);
		// 		if (!btn) return;
		// 		const data = btn.dataset.tabBtn;
		// 		const tabsAllBtn = this.querySelectorAll(`[data-tab-btn`);
		// 		const content = this.querySelectorAll(`[data-tab-content]`);
		// 		tabsAllBtn.forEach(element => {
		// 			element.dataset.tabBtn == data
		// 				? element.classList.add('active')
		// 				: element.classList.remove('active')
		// 		});
		// 		content.forEach(element => {
		// 			element.dataset.tabContent == data
		// 				? (element.classList.add('active'), element.previousSibling.classList.add('active'))
		// 				: element.classList.remove('active')
		// 		});
		// 	})
		// })

		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
				.eq($(this).index()).fadeIn().addClass('active');

		});

	},
	// /tabs

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask({"mask":"+9(999)999-99-99", showMaskOnHover: false}).mask(InputTel);
	},
	// /inputMask
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},
	sendForm() {
		var gets = (function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");
			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}
			return b;
		})();
		// form
		$(document).on('submit', "form", function (e) {
			e.preventDefault();
			const th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data,
			}).done(function (data) {

				Fancybox.close();
				Fancybox.show([{ src: "#modal-thanks", type: "inline" }]);
				// window.location.replace("/thanks.html");
				setTimeout(function () {
					// Done Functions
					th.trigger("reset");
					// $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () { });

		});
	},
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {
		$(document).on('click', " .menu li a, .scroll-link", function () {
			const elementClick = $(this).attr("href");
			if (!document.querySelector(elementClick)) {
				$(this).attr("href", '/' + elementClick)
			}
			else {
				let destination = $(elementClick).offset().top;
				$('html, body').animate({ scrollTop: destination - 80 }, 0);
				return false;
			}
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	},
	toggleShow(toggle, drop) {

		let catalogDrop = drop;
		let catalogToggle = toggle;
		
		$(document).on('click', catalogToggle, function () {
			$(this).toggleClass('active').next() .toggleClass("active") 
		})

		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(catalogDrop + ".active"); // (1)
			let link = event.target.closest(catalogToggle); // (1)
			if (!container && !link) {
				$(catalogDrop).removeClass('active');
				$(catalogToggle).removeClass('active');
			};
		}, { passive: true });
	},
	makeDDGroup() {
		let parents = document.querySelectorAll('.dd-group-js');
		for (let parent of parents) {
			if (parent) {
				// childHeads, kind of funny))
				let ChildHeads = parent.querySelectorAll('.dd-head-js:not(.disabled)');
				$(ChildHeads).click(function () {
					let clickedHead = this;
					$(this.parentElement).toggleClass('active');
					$(this.parentElement).find('.dd-content-js').slideToggle(function () {
						$(this).toggleClass('active');
					});

					// $(ChildHeads).each(function () {
					// 	if (this === clickedHead) {
					// 		//parent element gain toggle class, style head change via parent
					// 	}
					// 	else {
					// 		$(this.parentElement).removeClass('active');
					// 		$(this.parentElement).find('.dd-content-js').slideUp(function () {
					// 			$(this).removeClass('active');
					// 		});
					// 	}
					// });

				});
			}
		}
	},
};
const $ = jQuery;

function eventHandler() {
	// JSCCommon.ifie();
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	// JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.makeDDGroup();

	JSCCommon.toggleShow(".alert-item__dots .icon-dots", '.alert-item__dropdown');
	// JSCCommon.animateScroll();
	
	// JSCCommon.CustomInputFile(); 
	var x = window.location.host;
	let screenName;
	screenName = document.body.dataset.bg;
	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}


	function setFixedNav() {
		let topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.scrollY > 0
			? topNav.classList.add('fixed')
			: topNav.classList.remove('fixed');
	}

	function whenResize() {
		setFixedNav();
	}

	window.addEventListener('scroll', () => {
		setFixedNav();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}
	
	const swiperbreadcrumb = new Swiper('.breadcrumb-slider--js', {
		slidesPerView: 'auto',
		freeMode: true,
		watchOverflow: true
	});
	
	const swiper4 = new Swiper('.sCabinetPanel__slider--js', { 
		slidesPerView: 'auto',
		freeMode: true,
		spaceBetween: 20,
		// loopFillGroupWithBlank: true,
		// touchRatio: 0.2,
		// slideToClickedSlide: true,
		freeModeMomentum: true,
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},

	});
	// modal window

	let inputGroups = document.querySelectorAll(".form-wrap__input-wrap");
	for (const inputGroup of inputGroups) {
		
		inputGroup.addEventListener("click", function(event){
			let toggle = event.target.closest(".btn-toggle-pass")
			if(toggle) {
					toggle.classList.toggle("active")
					let  input = this.querySelector("input");
					input.type = input.type == 'password' ? "text" : "password";
					
			}
		})
	}

	try {
		
		$(".toggle-menu-mobile--js").click(function(){
			this.classList.toggle("on");
			document.body.classList.toggle("show-sidebar")
			document.querySelector("aside").classList.toggle("active")
		})
		document.addEventListener("click", function(event){
			let menu = event.target.closest("aside.active");
			let toggle = event.target.closest(".toggle-menu-mobile--js");
			if(!menu && !toggle && document.body.classList.contains('show-sidebar')) {
				$(".toggle-menu-mobile--js")[0].classList.remove("on");
				document.body.classList.remove("show-sidebar")
				document.querySelector("aside").classList.remove("active")
	
			}
		})
	} catch (error) {
		
	}


	try {
		document.querySelector('.avatar-block input').onchange = function (evt) {
			var tgt = evt.target || window.event.srcElement,
			files = tgt.files; 
			var fr = new FileReader();
			if (FileReader && files && files.length) {
			fr.onload = function () {
				document.querySelector('.avatar-block img').src = fr.result;
				document.querySelector('.avatar-block').classList.add("active");
			}
			fr.readAsDataURL(files[0]); 
		}
			
			document.querySelector('.avatar-block').addEventListener("click", function(event){
				let target = event.target.closest(".avatar-block__img-wrap")
				if(this.classList.contains("active") && target) {
					console.log(1);
					event.stopPropagation();
					this.classList.remove("active")
				} 

			})

	}
	} catch (error) {
		
	}
	$(".save-alert__progress").removeClass("active");

	$(".btn-save-js").click(function(){
			$(".save-alert").addClass("active");
			let duration = 1000;
			document.querySelector(".save-alert__progress").animate([
				// keyframes
				{ transform: 'scaleX(0)' },
				{ transform: 'scaleX(1)' }
			], { 
				duration
			})
			setTimeout(()=>{
				$(".save-alert").removeClass("active");
			}, duration)	
	})

	let customSelects = document.querySelectorAll(".custom-select-js");

	for (const select of customSelects) {
		const choices = new Choices(select,{
			itemSelectText: '',
			searchEnabled: false,
    searchChoices: false,
		});
	}



	const convertImages = (query, callback) => {
		const images = document.querySelectorAll(query);
	
		images.forEach(image => {
			fetch(image.src)
			.then(res => res.text())
			.then(data => {
				const parser = new DOMParser();
				const svg = parser.parseFromString(data, 'image/svg+xml').querySelector('svg');
	
				if (image.id) svg.id = image.id;
				if (image.className) svg.classList = image.classList;
	
				image.parentNode.replaceChild(svg, image);
			})
			.then(callback)
			.catch(error => console.error(error))
		});
	}

	convertImages('.img-to-svg');

	$(document).on('click', '.link-block .icon', function(){
		$(this).parents('.link-block').addClass("active"); 
			/* Get the text field */
			var copyText = $(this).parent().find('.link-block__copy-text')[0];
			/* Select the text field */
			copyText.select();
			copyText.setSelectionRange(0, 99999); /* For mobile devices */
		
			 /* Copy the text inside the text field */
			navigator.clipboard.writeText(copyText.value);
		
			/* Alert the copied text */
			// alert("Copied the text: " + copyText.value); 

	})

// 	$('.table-js').DataTable({
// 		// order: [[3, 'desc']],
// });


const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

let tabsMobileBtns = document.getElementsByClassName('tabs__content-toggle');
for (let tabsMobileBtn of tabsMobileBtns) {
	tabsMobileBtn.addEventListener('click', function() {
		let val = tabsMobileBtn.dataset.id;
		const tabs = document.querySelectorAll('.tabs__content');
		if (!tabsMobileBtn.classList.contains('active')) {
			for (let tabsMobileBtn of tabsMobileBtns) {
				tabsMobileBtn.classList.remove('active');
			}
			tabsMobileBtn.classList.add('active');
		}
		for (let tab of tabs) {
			if(tab.classList.contains('active')) {
				tab.classList.remove('active');
			} if(tab.id == val) {
				tab.classList.add('active');
			};
		}
		
	});
}

// for (let i = 0; i < tabsMobileBtns.length; i++) {
// 	tabsMobileBtns[i].addEventListener('click', function() {
// 		console.log(tabsMobileBtns[i]);
// 		if(tabsMobileBtns[i] == i) {
// 		}

// 	});
	
// }

const sMenuswiper = new Swiper('.sMenu__slider--js', { 
	slidesPerView: 'auto',
	spaceBetween: 20,
	grid: {
    rows: 2,
    // column: 2,
  },
	breakpoints: {
    768: {
      grid: false,
    },
  }
});

	$('.sBotMenu__search--toggle button').on('click', function() {
		$('.sBotMenu__wrap--search').addClass('active');
		$('body').addClass('fixed');
	});
	$('.sBotMenu__cross').on('click', function() {
		$('.sBotMenu__wrap--search').removeClass('active');
		$('body').removeClass('fixed');
	});

	$('.sBotMenu__filter').on('click', function() {
		$('.sBotMenu__wrap--filter').addClass('active');
		$('body').addClass('fixed');
	});
	$('.sBotMenu__cross').on('click', function() {
		$('.sBotMenu__wrap--filter').removeClass('active');
		$('body').removeClass('fixed');
	});

	$('.topLine__btn--cabinet').on('click', function() {
		$('.topLine__btn--cabinet').toggleClass('active');
		$('.topLine__btn-toggle').toggleClass('active');
		window.addEventListener('click', function(event) {
			let btn = event.target.closest('.topLine__btn--cabinet');
			let toggleWindow = event.target.closest('.topLine__btn-toggle');
			if (!btn && !toggleWindow) {
				$('.topLine__btn--cabinet').removeClass('active');
				$('.topLine__btn-toggle').removeClass('active');
			}
		})
	});
	let dropDown = $('.nav-main__ddgroup-wrap');
	let dropDownBtns = $('.nav-main__link--js');
	for (let i = 0; i< dropDownBtns.length; i++) {
		dropDownBtns[i].addEventListener('click', function() {
			$(this).toggleClass('active');
			$(dropDown[i]).slideToggle('active');
		});
	}

	let drugWrap = document.querySelector(".drug-wrap-block");

	if(drugWrap) {

		function getListIndex(){
			let itemsTitle = document.querySelectorAll(".form-wrap__col-title" );
			let index = 0
			for (const itemTitle of itemsTitle) {
				itemTitle.innerHTML = `Категория ${++index}`
			}
		}
		var sortable = new Sortable(drugWrap, {
			handle: ".my-handle",
			direction: 'vertical',
			ghostClass: 'ghost',
			onEnd: function (/**Event*/evt) {
				var itemEl = evt.item;  // dragged HTMLElement
				getListIndex(); 
			},
			
		})
		drugWrap.addEventListener("click", function(event){
			let btnUp = event.target.closest(".form-wrap__btn-circle--top") 
			let btnUDown = event.target.closest(".form-wrap__btn-circle--down") 
			
			if(btnUDown) {
				let parent = btnUDown.closest(".form-wrap__drug-inner");
				let clone = parent.cloneNode(true); 
				let nextEl = parent.nextElementSibling;
				if (!nextEl) return;
				parent.remove();
				nextEl.after( clone);
				getListIndex();
			}
			
			 if(btnUp) {
				// console.log(btnUp);
				let parent = btnUp.closest(".form-wrap__drug-inner");
				let clone = parent.cloneNode(true); 
				let prevEl = parent.previousElementSibling;
				if (!prevEl) return; 
				parent.remove();
				prevEl.before( clone);
				getListIndex();
			}


		})
	}

 
	let aside = document.querySelector('aside');
	if (aside) {
		aside.addEventListener("mouseleave", function(){
			$(aside).find(".nav-main__ddgroup-wrap").slideUp(function(){

				$(aside).find(".nav-main__ddgroup-wrap, .nav-main__link--js").removeClass('active')
			});
		})
	}

	$(function(){
		// Bind the swipeHandler callback function to the swipe event on div.box
		$( "body" ).on( "swipe", swipeHandler );
	 
		// Callback function references the event target and adds the 'swipe' class to it
		function swipeHandler( event ){
			$( event.target ).addClass( "swipe" );
		}
	});

	function swipedetect(el, callback){
  
    var touchsurface = el,
    swipedir,
    startX,
    startY,
    distX,
    distY,
    threshold = 150, //required min distance traveled to be considered swipe
    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 1000, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    handleswipe = callback || function(swipedir){}
  
    touchsurface.addEventListener('touchstart', function(e){
			var touchobj = e.changedTouches[0]
					swipedir = 'none'
					// dist = 0
					startX = touchobj.pageX
					startY = touchobj.pageY
					startTime = new Date().getTime() // record time when finger first makes contact with surface
					e.preventDefault()
    }, false)
  
    touchsurface.addEventListener('touchmove', function(e){
        e.preventDefault() // prevent scrolling when inside DIV
    }, false)
  
    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime){ // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir)
        e.preventDefault()
    }, false)
	}

	var el = document.querySelector('.nav-main');
	swipedetect(el, function(swipedir){
		// swipedir contains either "none", "left", "right", "top", or "down"
		if (swipedir =='left') {
			$('aside').removeClass('active');
			$('body').removeClass('show-sidebar');
			$('.toggle-menu-mobile--js').removeClass('on');
		}
	})
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }


 
	var loadFile = function(event) {
		var image = document.querySelector('.img-preview');
		image.classList.add("active")
		document.querySelector(".add-photo-wrap__btn-delete").classList.remove("d-none")
		image.src = URL.createObjectURL(event.target.files[0]);
	}; 