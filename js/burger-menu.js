/**
 * Простой и надежный бургер-меню
 */
( function () {
	'use strict';

	console.log( '🍔 Загрузка бургер-меню...' );

	// Ждем полной загрузки DOM
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}

	function init() {
		console.log( '🚀 Инициализация бургер-меню' );

		const burgerIcon = document.querySelector( '.burger-icon' );
		const navMobile = document.querySelector( '.nav-mobile' );

		if ( !burgerIcon || !navMobile ) {
			console.error( '❌ Не найдены элементы меню' );
			return;
		}

		console.log( '✅ Элементы найдены' );

		// Создаем оверлей
		let overlay = document.querySelector( '.menu-overlay' );
		if ( !overlay ) {
			overlay = document.createElement( 'div' );
			overlay.className = 'menu-overlay';
			document.body.appendChild( overlay );
			console.log( '➕ Создан оверлей' );
		}

		// Создаем кнопку закрытия
		let closeBtn = navMobile.querySelector( '.close-menu' );
		if ( !closeBtn ) {
			closeBtn = document.createElement( 'button' );
			closeBtn.className = 'close-menu';
			closeBtn.innerHTML = '<i class="fas fa-times"></i>';
			closeBtn.setAttribute( 'aria-label', 'Закрыть меню' );

			const header = navMobile.querySelector( '.mobile-menu-header' );
			if ( header ) {
				header.appendChild( closeBtn );
			}
			console.log( '➕ Создана кнопка закрытия' );
		}

		// Проверяем и фиксируем z-index
		fixZIndex();

		// Функции открытия/закрытия
		function openMenu( e ) {
			if ( e ) {
				e.preventDefault();
				e.stopPropagation();
			}

			console.log( '📱 Открываем меню' );

			// Показываем меню
			navMobile.classList.add( 'active' );
			navMobile.style.right = '0';

			// Показываем оверлей
			overlay.classList.add( 'active' );

			// Анимируем бургер
			burgerIcon.classList.add( 'open' );

			// Блокируем скролл
			document.body.style.overflow = 'hidden';
			document.documentElement.style.overflow = 'hidden';
		}

		function closeMenu( e ) {
			if ( e ) {
				e.preventDefault();
				e.stopPropagation();
			}

			console.log( '📱 Закрываем меню' );

			// Скрываем меню
			navMobile.classList.remove( 'active' );
			navMobile.style.right = '-280px';

			// Скрываем оверлей
			overlay.classList.remove( 'active' );

			// Возвращаем бургер
			burgerIcon.classList.remove( 'open' );

			// Разблокируем скролл
			document.body.style.overflow = '';
			document.documentElement.style.overflow = '';
		}

		// Назначаем обработчики
		burgerIcon.addEventListener( 'click', openMenu );
		closeBtn.addEventListener( 'click', closeMenu );
		overlay.addEventListener( 'click', closeMenu );

		// Закрытие по клику на ссылки
		const links = navMobile.querySelectorAll( 'a' );
		links.forEach( link => {
			link.addEventListener( 'click', function () {
				setTimeout( closeMenu, 100 );
			} );
		} );

		// Закрытие по Escape
		document.addEventListener( 'keydown', function ( e ) {
			if ( e.key === 'Escape' && navMobile.classList.contains( 'active' ) ) {
				closeMenu();
			}
		} );

		// Функция фиксации z-index
		function fixZIndex() {
			console.log( '🔧 Фиксируем z-index' );

			// Гарантируем правильный z-index
			navMobile.style.zIndex = '10002';
			overlay.style.zIndex = '10001';

			console.log( '✅ z-index установлен:', {
				menu: navMobile.style.zIndex,
				overlay: overlay.style.zIndex
			} );
		}

		// Экспортируем функции
		window.openBurgerMenu = openMenu;
		window.closeBurgerMenu = closeMenu;
		window.fixMenuZIndex = fixZIndex;

		console.log( '🎉 Бургер-меню готово!' );
	}
} )();