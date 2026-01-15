/**
 * Основные компоненты для всех страниц уроков
 * Табы, аккордеоны, показ решений, подсветка синтаксиса
 */

const LessonComponents = {
	// Инициализация всех компонентов
	init() {
		console.log( '%c📚 Инициализация компонентов урока', 'color: #4299e1;' );

		this.initTabs();
		this.initAccordions();
		this.initSolutions();
		this.initSyntaxHighlighting();
	},

	// ===== ТАБЫ =====
	initTabs() {
		const tabBtns = document.querySelectorAll( '.tab-btn' );
		const tabContents = document.querySelectorAll( '.tab-content' );

		if ( tabBtns.length === 0 ) return;

		tabBtns.forEach( btn => {
			btn.addEventListener( 'click', function () {
				const tabId = this.getAttribute( 'data-tab' );

				// Убираем активный класс у всех кнопок и контента
				tabBtns.forEach( b => b.classList.remove( 'active' ) );
				tabContents.forEach( c => c.classList.remove( 'active' ) );

				// Добавляем активный класс текущей кнопке и контенту
				this.classList.add( 'active' );
				const tabContent = document.getElementById( tabId );
				if ( tabContent ) tabContent.classList.add( 'active' );
			} );
		} );
	},

	// ===== АККОРДЕОНЫ =====
	initAccordions() {
		const accordionHeaders = document.querySelectorAll( '.accordion-header' );

		if ( accordionHeaders.length === 0 ) return;

		accordionHeaders.forEach( header => {
			header.addEventListener( 'click', function () {
				const content = this.nextElementSibling;
				const icon = this.querySelector( 'i' );

				// Переключаем текущий аккордеон
				if ( content ) content.classList.toggle( 'active' );
				if ( icon ) {
					if ( content && content.classList.contains( 'active' ) ) {
						icon.classList.remove( 'fa-chevron-down' );
						icon.classList.add( 'fa-chevron-up' );
					} else {
						icon.classList.remove( 'fa-chevron-up' );
						icon.classList.add( 'fa-chevron-down' );
					}
				}
			} );
		} );
	},

	// ===== РЕШЕНИЯ =====
	initSolutions() {
		const showSolutionBtns = document.querySelectorAll( '.show-solution' );

		if ( showSolutionBtns.length === 0 ) return;

		showSolutionBtns.forEach( btn => {
			// Проверяем, не на странице ли мы с функциями или объектами
			const isFunctionsPage = window.location.pathname.includes( 'functions.html' );
			const isObjectsPage = window.location.pathname.includes( 'objects.html' );

			if ( !btn.hasAttribute( 'data-solution-handled' ) ) {
				btn.addEventListener( 'click', function () {
					const solution = this.nextElementSibling;
					if ( solution && solution.classList.contains( 'solution' ) ) {
						solution.classList.toggle( 'hidden' );
						if ( solution.classList.contains( 'hidden' ) ) {
							this.innerHTML = '<i class="fas fa-code"></i> Показать решение';
						} else {
							this.innerHTML = '<i class="fas fa-eye-slash"></i> Скрыть решение';
						}
					}
				} );
				btn.setAttribute( 'data-solution-handled', 'true' );
			}
		} );
	},

	// ===== ПОДСВЕТКА СИНТАКСИСА =====
	initSyntaxHighlighting() {
		// Подсветка синтаксиса (если библиотека подключена)
		if ( typeof hljs !== 'undefined' ) {
			hljs.highlightAll();
		}
	}
};

// Автоматическая инициализация при загрузке DOM
document.addEventListener( 'DOMContentLoaded', () => {
	LessonComponents.init();
} );

// Экспортируем для использования в других файлах
window.LessonComponents = LessonComponents;