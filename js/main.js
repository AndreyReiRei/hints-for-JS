/**
 * Основной файл JavaScript для учебного сайта по JavaScript
 * Содержит функционал: переключение темы, навигацию, прогресс, интерактив
 */

// Объект приложения JSTutor
const JSTutorApp = {
	// Инициализация приложения - запускается при загрузке DOM
	init() {
		console.log( '%c🚀 JSTutor инициализирован!', 'color: #667eea; font-weight: bold;' );

		// Вызов всех методов инициализации
		this.initTheme();               // Настройка светлой/темной темы
		this.initNavigation();          // Настройка навигации
		this.initProgress();            // Инициализация отслеживания прогресса (в данный момент закомментирована)
		this.initInteractiveElements(); // Настройка интерактивных элементов
		this.initHotkeys();             // Настройка горячих клавиш
		this.initScrollAnimations();    // Настройка анимаций при прокрутке

		// Показать подсказку о горячих клавишах (один раз для новых пользователей)
		this.showHotkeyHint();
	},

	// ==================== ТЕМА ====================
	// Инициализация системы тем
	initTheme() {
		// Получаем сохраненную тему или определяем системную
		const savedTheme = localStorage.getItem( 'jsTutorTheme' );
		const prefersDark = window.matchMedia( '(prefers-color-scheme: dark)' ).matches;
		const initialTheme = savedTheme || ( prefersDark ? 'dark' : 'light' );

		// Применяем тему без анимации при первой загрузке
		this.applyTheme( initialTheme, false );
		// Создаем кнопку переключения темы
		this.createThemeToggle();

		// Слушаем изменения системной темы (если пользователь меняет тему в ОС)
		window.matchMedia( '(prefers-color-scheme: dark)' ).addEventListener( 'change', ( e ) => {
			// Меняем тему только если пользователь не выбрал тему вручную
			if ( !localStorage.getItem( 'jsTutorTheme' ) ) {
				this.applyTheme( e.matches ? 'dark' : 'light', false );
				this.updateThemeToggle();
			}
		} );
	},

	// Применение темы к странице
	applyTheme( theme, animate = true ) {
		// Добавляем или удаляем класс dark-theme у body
		document.body.classList.toggle( 'dark-theme', theme === 'dark' );
		// Запускаем анимацию переключения темы (если нужно)
		if ( animate ) this.animateThemeChange();
		// Сохраняем выбор пользователя в localStorage
		localStorage.setItem( 'jsTutorTheme', theme );
	},

	// Создание кнопки переключения темы для десктопной версии
	createThemeToggle() {
		// Удаляем старую кнопку если существует
		const oldToggle = document.querySelector( '.theme-toggle' );
		if ( oldToggle ) oldToggle.remove();

		// Создаем новую кнопку
		const themeToggle = document.createElement( 'button' );
		themeToggle.className = 'theme-toggle';
		themeToggle.setAttribute( 'aria-label', 'Переключить тему' );
		themeToggle.setAttribute( 'title', 'Сменить тему (Alt+T)' );

		// Создаем иконку (солнце или луна)
		const icon = document.createElement( 'i' );
		icon.className = this.isDarkTheme() ? 'fas fa-sun' : 'fas fa-moon';
		themeToggle.appendChild( icon );

		// Создаем тултип с подсказкой
		const tooltip = document.createElement( 'span' );
		tooltip.className = 'theme-tooltip';
		tooltip.textContent = this.isDarkTheme() ? 'Светлая тема' : 'Темная тема';
		themeToggle.appendChild( tooltip );

		// Добавляем кнопку в шапку и навешиваем обработчик события
		const headerInner = document.querySelector( '.header-inner' );
		if ( headerInner ) {
			headerInner.appendChild( themeToggle );
			themeToggle.addEventListener( 'click', () => this.toggleTheme() );
		}






		// Добавляем кнопку переключения темы в мобильное меню
		this.addThemeToggleToMobileMenu();
	},

	// Добавление кнопки переключения темы в мобильное меню
	addThemeToggleToMobileMenu() {
		const mobileMenu = document.getElementById( 'mobileMenu' );
		if ( !mobileMenu ) return;

		// Удаляем старую кнопку если существует
		const oldMobileToggle = mobileMenu.querySelector( '.theme-toggle-mobile' );
		if ( oldMobileToggle ) oldMobileToggle.remove();

		// Создаем новую кнопку для мобильного меню
		const mobileToggle = document.createElement( 'div' );
		mobileToggle.className = 'theme-toggle-mobile';
		mobileToggle.innerHTML = `
	        <div class="theme-toggle-item">
	            <i class="fas ${this.isDarkTheme() ? 'fa-sun' : 'fa-moon'}"></i>
	            <span>${this.isDarkTheme() ? 'Светлая тема' : 'Темная тема'}</span>
	        </div>
	    `;

		// Вставляем кнопку в мобильное меню
		const menuHeader = mobileMenu.querySelector( '.mobile-menu-header' );
		if ( menuHeader ) {
			menuHeader.parentNode.insertBefore( mobileToggle, menuHeader.nextSibling );

			// Обработчик клика по кнопке
			mobileToggle.addEventListener( 'click', () => {
				this.toggleTheme();
				// Закрываем меню после смены темы
				setTimeout( () => {
					const closeBtn = document.querySelector( '.close-menu' );
					if ( closeBtn ) closeBtn.click();
				}, 300 );
			} );
		}
	},









	// Переключение темы (светлая ↔ темная)
	toggleTheme() {
		const newTheme = this.isDarkTheme() ? 'light' : 'dark';
		this.applyTheme( newTheme, true );
		this.updateThemeToggle();
		this.animateThemeSwitch();
	},

	// Проверка текущей темы
	isDarkTheme() {
		return document.body.classList.contains( 'dark-theme' );
	},

	// Обновление состояния кнопок переключения темы
	updateThemeToggle() {
		const toggle = document.querySelector( '.theme-toggle' );
		const mobileToggle = document.querySelector( '.theme-toggle-mobile' );
		const isDark = this.isDarkTheme();

		// Обновляем десктопную кнопку
		if ( toggle ) {
			const icon = toggle.querySelector( 'i' );
			const tooltip = toggle.querySelector( '.theme-tooltip' );
			icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
			tooltip.textContent = isDark ? 'Светлая тема' : 'Темная тема';
		}

		// Обновляем мобильную кнопку
		if ( mobileToggle ) {
			const icon = mobileToggle.querySelector( 'i' );
			const text = mobileToggle.querySelector( 'span' );
			icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
			text.textContent = isDark ? 'Светлая тема' : 'Темная тема';
		}
	},

	// Анимация переключения темы (вращение кнопки)
	animateThemeSwitch() {
		const toggle = document.querySelector( '.theme-toggle' );
		if ( !toggle ) return;

		// Эффект вращения и уменьшения
		toggle.style.transform = 'rotate(180deg) scale(0.9)';
		setTimeout( () => {
			toggle.style.transform = 'rotate(360deg) scale(1)';
		}, 300 );

		// Эффект пульсации
		toggle.classList.add( 'pulse' );
		setTimeout( () => {
			toggle.classList.remove( 'pulse' );
		}, 600 );
	},

	// Анимация плавного изменения темы
	animateThemeChange() {
		// Временно добавляем переходы для плавной смены
		document.body.style.transition = 'background-color 0.5s ease, color 0.3s ease';
		setTimeout( () => {
			document.body.style.transition = '';
		}, 500 );
	},

	// ==================== НАВИГАЦИЯ ====================
	// Инициализация навигации
	initNavigation() {
		this.highlightActivePage(); // Подсветка текущей страницы
		this.initSmoothScroll();    // Плавная прокрутка
		this.initStickyHeader();    // "Липкий" заголовок
	},

	// Подсветка активной страницы в навигации
	highlightActivePage() {
		// Получаем имя текущей страницы
		const currentPage = window.location.pathname.split( '/' ).pop() || 'index.html';
		// Находим все ссылки в навигации (десктоп и мобильная)
		const navLinks = document.querySelectorAll( '.nav-desktop a, .mobile-nav-list a' );

		// Для каждой ссылки проверяем соответствие текущей странице
		navLinks.forEach( link => {
			const linkHref = link.getAttribute( 'href' );
			if ( !linkHref ) return;

			const linkPage = linkHref.split( '/' ).pop();
			// Добавляем класс active если страница совпадает
			link.classList.toggle( 'active',
				linkPage === currentPage ||
				( currentPage === '' && linkPage === 'index.html' )
			);
		} );
	},

	// Инициализация плавной прокрутки к якорям
	initSmoothScroll() {
		document.querySelectorAll( 'a[href^="#"]' ).forEach( anchor => {
			anchor.addEventListener( 'click', function ( e ) {
				const href = this.getAttribute( 'href' );
				// Игнорируем пустые ссылки
				if ( href === '#' || href === '#!' ) return;

				// Находим целевой элемент
				const targetElement = document.querySelector( href );
				if ( targetElement ) {
					e.preventDefault();
					// Прокручиваем с плавной анимацией
					window.scrollTo( {
						top: targetElement.offsetTop - 100, // Отступ от верха
						behavior: 'smooth'
					} );
				}
			} );
		} );
	},

	// Инициализация "липкого" заголовка
	initStickyHeader() {
		let lastScroll = 0;
		const header = document.querySelector( '.header' );

		if ( !header ) return;

		// Отслеживаем прокрутку
		window.addEventListener( 'scroll', () => {
			const currentScroll = window.pageYOffset;

			// Если в самом верху страницы
			if ( currentScroll <= 0 ) {
				header.classList.remove( 'scroll-up' );
				return;
			}

			// Прокрутка вниз
			if ( currentScroll > lastScroll && !header.classList.contains( 'scroll-down' ) ) {
				header.classList.remove( 'scroll-up' );
				header.classList.add( 'scroll-down' );
			}
			// Прокрутка вверх
			else if ( currentScroll < lastScroll && header.classList.contains( 'scroll-down' ) ) {
				header.classList.remove( 'scroll-down' );
				header.classList.add( 'scroll-up' );
			}

			lastScroll = currentScroll;
		} );
	},


	// ==================== ИНТЕРАКТИВНЫЕ ЭЛЕМЕНТЫ ====================
	// Инициализация всех интерактивных элементов
	initInteractiveElements() {
		this.initSolutionToggles(); // Кнопки показа/скрытия решений
		this.initCodeExamples();    // Блоки с кодом (копирование)
		this.initTabs();            // Табы (вкладки)
		this.initAccordions();      // Аккордеоны (раскрывающиеся блоки)
		this.initGitPageSupport(); // Гит
	},

	// Инициализация кнопок показа/скрытия решений
	initSolutionToggles() {
		document.querySelectorAll( '.show-solution' ).forEach( button => {
			button.addEventListener( 'click', function () {
				// Находим следующий элемент (решение)
				const solution = this.nextElementSibling;
				if ( !solution || !solution.classList.contains( 'solution' ) ) return;

				// Определяем текущее состояние (скрыто/показано)
				const isHidden = !solution.classList.contains( 'hidden' );
				// Переключаем видимость
				solution.classList.toggle( 'hidden' );
				// Меняем текст кнопки
				this.textContent = isHidden ? 'Скрыть решение' : 'Показать решение';
			} );
		} );
	},

	// Инициализация блоков с кодом (добавление кнопки копирования)
	initCodeExamples() {
		document.querySelectorAll( '.code-example pre' ).forEach( pre => {
			// Создаем кнопку копирования
			const copyBtn = document.createElement( 'button' );
			copyBtn.className = 'copy-code';
			copyBtn.innerHTML = '<i class="far fa-copy"></i>';
			copyBtn.setAttribute( 'title', 'Копировать код' );

			pre.appendChild( copyBtn );

			// Обработчик копирования кода
			copyBtn.addEventListener( 'click', async () => {
				const code = pre.querySelector( 'code' ).textContent;
				try {
					// Пытаемся скопировать в буфер обмена
					await navigator.clipboard.writeText( code );
					// Показываем успешное копирование
					copyBtn.innerHTML = '<i class="fas fa-check"></i>';
					copyBtn.classList.add( 'copied' );

					// Через 2 секунды возвращаем исходное состояние
					setTimeout( () => {
						copyBtn.innerHTML = '<i class="far fa-copy"></i>';
						copyBtn.classList.remove( 'copied' );
					}, 2000 );
				} catch ( err ) {
					console.error( 'Ошибка копирования:', err );
					// Показываем ошибку
					copyBtn.innerHTML = '<i class="fas fa-times"></i>';
					setTimeout( () => {
						copyBtn.innerHTML = '<i class="far fa-copy"></i>';
					}, 2000 );
				}
			} );
		} );
	},

	// Инициализация табов (вкладок)
	initTabs() {
		document.querySelectorAll( '.tabs' ).forEach( tabsContainer => {
			const tabButtons = tabsContainer.querySelectorAll( '.tab-btn' );

			tabButtons.forEach( button => {
				button.addEventListener( 'click', () => {
					const tabId = button.getAttribute( 'data-tab' );

					// Убираем активный класс у всех кнопок и контента
					tabButtons.forEach( btn => btn.classList.remove( 'active' ) );
					tabsContainer.querySelectorAll( '.tab-content' ).forEach( content => {
						content.classList.remove( 'active' );
					} );

					// Добавляем активный класс выбранной кнопке и соответствующему контенту
					button.classList.add( 'active' );
					const tabContent = tabsContainer.querySelector( `#${tabId}` );
					if ( tabContent ) tabContent.classList.add( 'active' );
				} );
			} );
		} );
	},

	// Инициализация аккордеонов (раскрывающихся блоков)
	initAccordions() {
		document.querySelectorAll( '.accordion-header' ).forEach( header => {
			header.addEventListener( 'click', () => {
				const accordion = header.parentElement;
				const content = header.nextElementSibling;

				// Переключаем состояние аккордеона
				accordion.classList.toggle( 'active' );

				// Анимируем раскрытие/скрытие
				if ( accordion.classList.contains( 'active' ) ) {
					content.style.maxHeight = content.scrollHeight + 'px';
					content.style.opacity = '1';
				} else {
					content.style.maxHeight = '0';
					content.style.opacity = '0';
				}
			} );
		} );
	},

	// ==================== ГОРЯЧИЕ КЛАВИШИ ====================
	// Инициализация горячих клавиш
	initHotkeys() {
		document.addEventListener( 'keydown', ( e ) => {
			// Alt+T - переключение темы
			if ( e.altKey && e.key.toLowerCase() === 't' ) {
				e.preventDefault();
				this.toggleTheme();
				this.showKeyFeedback( 'Тема изменена' );
			}

			// Esc - закрытие меню и модальных окон
			if ( e.key === 'Escape' ) {
				this.closeAllModals();
			}
		} );
	},

	initGitPageSupport() {
		if ( window.location.pathname.includes( 'Git.html' ) && typeof hljs !== 'undefined' ) {
			// Убедимся, что bash работает на Git странице
			hljs.registerAliases( 'bash', 'shell' );

			// Переподсветим все блоки кода
			setTimeout( () => {
				document.querySelectorAll( 'pre code.language-bash, pre code.language-shell' ).forEach( block => {
					hljs.highlightElement( block );
				} );
			}, 100 );
		}
	},

	// Показ уведомления о нажатии горячей клавиши
	showKeyFeedback( message ) {
		const feedback = document.createElement( 'div' );
		feedback.className = 'key-feedback';
		feedback.textContent = `✨ ${message}`;
		document.body.appendChild( feedback );

		// Анимация появления
		setTimeout( () => feedback.classList.add( 'show' ), 10 );
		// Автоматическое скрытие через 2 секунды
		setTimeout( () => {
			feedback.classList.remove( 'show' );
			setTimeout( () => feedback.remove(), 300 );
		}, 2000 );
	},

	// Закрытие всех модальных окон и меню
	closeAllModals() {
		const mobileMenu = document.getElementById( 'mobileMenu' );
		if ( mobileMenu && mobileMenu.classList.contains( 'active' ) ) {
			const closeBtn = document.querySelector( '.close-menu' );
			if ( closeBtn ) closeBtn.click();
		}

		// Закрываем все активные модальные окна
		document.querySelectorAll( '.modal.active' ).forEach( modal => {
			modal.classList.remove( 'active' );
		} );
	},

	// ==================== АНИМАЦИИ ====================
	// Инициализация анимаций при прокрутке
	initScrollAnimations() {
		// Используем IntersectionObserver для отслеживания появления элементов в viewport
		const observer = new IntersectionObserver( ( entries ) => {
			entries.forEach( entry => {
				if ( entry.isIntersecting ) {
					// Добавляем класс для анимации при появлении
					entry.target.classList.add( 'animate-in' );
					observer.unobserve( entry.target );
				}
			} );
		}, {
			threshold: 0.1,       // Срабатывает при 10% видимости
			rootMargin: '0px 0px -50px 0px' // Игнорирует нижние 50px
		} );

		// Наблюдаем за всеми элементами, которые должны анимироваться
		document.querySelectorAll( '.feature-card, .lesson-card, .code-example' ).forEach( el => {
			observer.observe( el );
		} );
	},

	// ==================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ====================
	// Показ подсказки о горячих клавишах (один раз для новых пользователей)
	showHotkeyHint() {
		// Проверяем, показывали ли уже подсказку
		if ( localStorage.getItem( 'jsTutorHotkeyHint' ) ) return;

		// Показываем с задержкой 3 секунды
		setTimeout( () => {
			this.showKeyFeedback( 'Используйте Alt+T для смены темы' );
			// Сохраняем, что подсказка была показана
			localStorage.setItem( 'jsTutorHotkeyHint', 'true' );
		}, 3000 );
	}
};

// Инициализация приложения после полной загрузки DOM
document.addEventListener( 'DOMContentLoaded', () => {
	JSTutorApp.init();
} );

// Экспортируем объект приложения для доступа из консоли браузера
window.JSTutor = JSTutorApp;