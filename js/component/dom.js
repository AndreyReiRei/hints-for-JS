/**
 * Файл для Урока 7: Работа с DOM в JavaScript
 * Содержит интерактивные демонстрации работы с DOM
 */

class DOMLessonManager {
	constructor() {
		this.selectedElements = new Set();
		this.practiceElements = [
			{ id: 'el1', text: 'Элемент 1', classes: [] },
			{ id: 'el2', text: 'Элемент 2', classes: [] },
			{ id: 'el3', text: 'Элемент 3 (class-a)', classes: ['class-a'] },
			{ id: 'el4', text: 'Элемент 4 (class-b)', classes: ['class-b'] },
			{ id: 'el5', text: 'Элемент 5 (class-a class-b)', classes: ['class-a', 'class-b'] },
			{ id: 'el6', text: 'Элемент 6 (data-type)', classes: [], attributes: { 'data-type': 'special' } },
			{ id: 'el7', text: 'Элемент 7 с вложенным <strong>тегом</strong>', classes: [], hasHtml: true },
			{ id: 'el8', text: 'Элемент 8', classes: [] },
			{ id: 'el9', text: 'Элемент 9 (class-a)', classes: ['class-a'] },
			{ id: 'el10', text: 'Элемент 10', classes: [] }
		];
		this.init();
	}

	init() {
		console.log( '%c🌳 DOM в JavaScript: интерактивные демо загружены', 'color: #4299e1;' );
		this.updatePracticeStats();
	}

	// ===== РАЗДЕЛ 1: Что такое DOM? =====
	showLiveDOM() {
		// Создаем или находим контейнер для вывода
		let output = document.getElementById( 'liveDOMOutput' );
		if ( !output ) {
			output = document.createElement( 'div' );
			output.id = 'liveDOMOutput';
			output.className = 'console-output';
			// Добавляем в нужное место на странице
			const domVisualization = document.querySelector( '.dom-visualization' );
			if ( domVisualization ) {
				domVisualization.appendChild( output );
			}
		}

		// Получаем информацию о DOM
		const totalElements = document.querySelectorAll( '*' ).length;
		const scripts = document.scripts.length;
		const styles = document.styleSheets.length;
		const links = document.links.length;
		const images = document.images.length;
		const forms = document.forms.length;

		output.innerHTML = `
            <div class="console-line info">📊 Анализ DOM текущей страницы...</div>
            <div class="console-line">📄 Заголовок: "${document.title}"</div>
            <div class="console-line">🔗 URL: ${window.location.href}</div>
            <div class="console-line">🌳 Корневой элемент: &lt;${document.documentElement.tagName.toLowerCase()}&gt;</div>
            <div class="console-line">👤 Body содержит: ${document.body.children.length} дочерних элементов</div>
            <div class="console-line">🔢 Всего элементов: ${totalElements}</div>
            <div class="console-line">📜 Скриптов: ${scripts}</div>
            <div class="console-line">🎨 Стилей: ${styles}</div>
            <div class="console-line">🔗 Ссылок: ${links}</div>
            <div class="console-line">🖼️ Изображений: ${images}</div>
            <div class="console-line">📝 Форм: ${forms}</div>
            <div class="console-line">📏 Высота документа: ${document.documentElement.scrollHeight}px</div>
            <div class="console-line">📐 Ширина документа: ${document.documentElement.scrollWidth}px</div>
            <div class="console-line success">✅ Анализ завершен!</div>
            <div class="console-line info">🔍 Примеры элементов на странице:</div>
        `;

		// Добавляем примеры некоторых элементов
		const sampleElements = document.querySelectorAll( 'h1, h2, .lesson-section, .code-editor, .btn' );
		const uniqueTags = new Set();

		sampleElements.slice( 0, 10 ).forEach( ( el, index ) => {
			const tag = el.tagName.toLowerCase();
			const id = el.id ? `#${el.id}` : '';
			const classes = el.className ? `.${el.className.split( ' ' ).join( '.' )}` : '';
			const text = el.textContent ? el.textContent.substring( 0, 50 ).replace( /\n/g, ' ' ).trim() + '...' : '(пустой)';

			if ( !uniqueTags.has( tag ) ) {
				uniqueTags.add( tag );
				output.innerHTML += `
                    <div class="console-line">
                        ${index + 1}. &lt;${tag}${id}${classes}&gt; "${text}"
                    </div>
                `;
			}
		} );

		// Добавляем кнопку для показа дерева
		const showTreeBtn = document.createElement( 'button' );
		showTreeBtn.className = 'btn btn-primary';
		showTreeBtn.innerHTML = '<i class="fas fa-sitemap"></i> Показать DOM дерево';
		showTreeBtn.style.marginTop = '10px';
		showTreeBtn.onclick = () => this.showDOMTreeModal();

		output.appendChild( showTreeBtn );

		// Прокручиваем к результатам
		output.scrollIntoView( { behavior: 'smooth', block: 'nearest' } );
	}

	showDOMTreeModal() {
		// Создаем модальное окно
		const modal = document.createElement( 'div' );
		modal.className = 'dom-modal';
		modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-sitemap"></i> DOM дерево текущей страницы</h3>
                    <button class="close-modal" onclick="this.closest('.dom-modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="dom-tree-view" id="domTreeView">
                        <div class="tree-loading">
                            <i class="fas fa-spinner fa-spin"></i> Генерация DOM-дерева...
                        </div>
                    </div>
                    <div class="modal-footer">
                        <small>Показаны только основные элементы (ограничено для производительности)</small>
                    </div>
                </div>
            </div>
        `;

		document.body.appendChild( modal );

		// Генерируем DOM дерево с задержкой
		setTimeout( () => {
			const container = document.getElementById( 'domTreeView' );
			if ( container ) {
				container.innerHTML = '';
				this.generateSimpleDOMTree( container );
			}
		}, 100 );
	}

	generateSimpleDOMTree( container ) {
		// Создаем корневой узел
		const createNode = ( element, depth = 0 ) => {
			const node = document.createElement( 'div' );
			node.className = 'tree-node';
			node.style.paddingLeft = `${depth * 20}px`;
			node.style.margin = '2px 0';

			const tagName = element.tagName ? element.tagName.toLowerCase() : element.nodeName;
			const id = element.id ? `#${element.id}` : '';
			const classes = element.className ? `.${element.className.split( ' ' ).join( '.' )}` : '';

			let icon = 'fa-file';
			switch ( tagName ) {
				case 'html': icon = 'fab fa-html5'; break;
				case 'head': icon = 'fas fa-heading'; break;
				case 'body': icon = 'fas fa-body'; break;
				case 'div': icon = 'fas fa-square'; break;
				case 'h1': icon = 'fas fa-heading'; break;
				case 'h2': icon = 'fas fa-heading'; break;
				case 'p': icon = 'fas fa-paragraph'; break;
				case 'span': icon = 'fas fa-minus'; break;
				case 'a': icon = 'fas fa-link'; break;
				case 'button': icon = 'fas fa-hand-pointer'; break;
				case 'form': icon = 'fas fa-window-restore'; break;
				case 'input': icon = 'fas fa-keyboard'; break;
				default: icon = 'fas fa-tag';
			}

			node.innerHTML = `
                <div class="tree-node-header">
                    <i class="${icon}"></i>
                    <span class="tree-tag">${tagName}</span>
                    <span class="tree-id">${id}</span>
                    <span class="tree-class">${classes}</span>
                </div>
            `;

			return node;
		};

		// Добавляем основные элементы
		const addElement = ( element, container, depth = 0 ) => {
			if ( depth > 3 ) return; // Ограничиваем глубину

			const node = createNode( element, depth );
			container.appendChild( node );

			// Добавляем детей (ограниченное количество)
			if ( element.children && element.children.length > 0 ) {
				for ( let i = 0; i < Math.min( element.children.length, 3 ); i++ ) {
					addElement( element.children[i], container, depth + 1 );
				}
				if ( element.children.length > 3 ) {
					const moreNode = document.createElement( 'div' );
					moreNode.className = 'tree-more';
					moreNode.style.paddingLeft = `${( depth + 1 ) * 20}px`;
					moreNode.textContent = `... и еще ${element.children.length - 3} элементов`;
					container.appendChild( moreNode );
				}
			}
		};

		// Начинаем с корневых элементов
		addElement( document.documentElement, container );
	}

	// ===== РАЗДЕЛ 2: Выбор элементов =====
	runGetElementByIdDemo() {
		const output = this.createOutputElement( 'idOutput' );
		output.innerHTML = `
            <div class="console-line info">Демонстрация getElementById()...</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Поиск элемента с ID 'lesson-content'...</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Найден: ${document.getElementById( 'lesson-content' ) ? 'Да' : 'Нет'}</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Поиск несуществующего ID...</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Результат: ${document.getElementById( 'nonexistent-id' ) || 'null'}</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Время выполнения: ~0.1ms (самый быстрый метод)</div>
            <div class="console-line success">[${new Date().toLocaleTimeString()}] Демонстрация завершена</div>
        `;
	}

	runGetElementsByClassNameDemo() {
		const output = this.createOutputElement( 'classOutput' );
		const practiceElements = document.querySelectorAll( '.practice-element' );
		const classAElements = document.querySelectorAll( '.class-a' );

		output.innerHTML = `
            <div class="console-line info">Демонстрация getElementsByClassName()...</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Всего practice-element: ${practiceElements.length}</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Элементов с class-a: ${classAElements.length}</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] HTMLCollection обновляется динамически</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Для методов массивов нужно преобразование</div>
            <div class="console-line success">[${new Date().toLocaleTimeString()}] Демонстрация завершена</div>
        `;
	}

	runGetElementsByTagNameDemo() {
		const output = this.createOutputElement( 'tagOutput' );
		const divs = document.querySelectorAll( 'div' );
		const buttons = document.querySelectorAll( 'button' );

		output.innerHTML = `
            <div class="console-line info">Демонстрация getElementsByTagName()...</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Всего div на странице: ${divs.length}</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Всего button на странице: ${buttons.length}</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] '*' вернет все элементы</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Полезен для глобальных изменений</div>
            <div class="console-line success">[${new Date().toLocaleTimeString()}] Демонстрация завершена</div>
        `;
	}

	runQuerySelectorDemo() {
		const output = this.createOutputElement( 'cssOutput' );
		const firstButton = document.querySelector( '.btn' );
		const allButtons = document.querySelectorAll( '.btn' );

		output.innerHTML = `
            <div class="console-line info">Демонстрация querySelector()...</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Первая кнопка: ${firstButton ? 'найдена' : 'не найдена'}</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Всего кнопок: ${allButtons.length}</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] NodeList поддерживает forEach</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Можно использовать все CSS селекторы</div>
            <div class="console-line success">[${new Date().toLocaleTimeString()}] Демонстрация завершена</div>
        `;
	}

	runRelationsDemo() {
		const output = this.createOutputElement( 'relationsOutput' );
		const practiceArea = document.querySelector( '.practice-area' );

		output.innerHTML = `
            <div class="console-line info">Демонстрация навигации по DOM...</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Родитель practice-area: ${practiceArea.parentElement ? practiceArea.parentElement.className : 'none'}</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Дочерние элементы: ${practiceArea.children.length}</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Все узлы: ${practiceArea.childNodes.length}</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] children - только элементы</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] childNodes - все узлы (текст, комментарии)</div>
            <div class="console-line success">[${new Date().toLocaleTimeString()}] Демонстрация завершена</div>
        `;
	}

	// ===== ИНТЕРАКТИВНЫЙ СЕЛЕКТОР =====
	testSelector() {
		const selector = document.getElementById( 'selectorInput' ).value.trim();
		if ( !selector ) {
			this.showMessage( 'Введите CSS селектор', 'warning' );
			return;
		}

		try {
			const elements = document.querySelectorAll( selector );
			this.updateSelectedElements( Array.from( elements ) );
			this.updateSelectorResult( selector, elements );
		} catch ( error ) {
			this.showMessage( `Ошибка в селекторе: ${error.message}`, 'error' );
		}
	}

	setSelector( selector ) {
		document.getElementById( 'selectorInput' ).value = selector;
		this.testSelector();
	}

	updateSelectedElements( elements ) {
		// Сбрасываем предыдущий выбор
		document.querySelectorAll( '.practice-element.selected' ).forEach( el => {
			el.classList.remove( 'selected' );
		} );

		// Выделяем новые элементы
		this.selectedElements.clear();
		elements.forEach( element => {
			if ( element.classList.contains( 'practice-element' ) ) {
				element.classList.add( 'selected' );
				this.selectedElements.add( element.id );
			}
		} );

		this.updatePracticeStats();
	}

	updatePracticeStats() {
		const total = document.querySelectorAll( '.practice-element' ).length;
		const selected = this.selectedElements.size;

		document.getElementById( 'selectedCount' ).textContent = selected;
		document.getElementById( 'totalCount' ).textContent = total;
	}

	updateSelectorResult( selector, elements ) {
		const result = document.getElementById( 'selectorResult' );
		const elementDetails = Array.from( elements )
			.filter( el => el.classList.contains( 'practice-element' ) )
			.map( el => {
				const classes = Array.from( el.classList )
					.filter( c => c !== 'practice-element' && c !== 'selected' )
					.join( ' ' );
				const id = el.id;
				const attrs = Array.from( el.attributes )
					.filter( attr => attr.name.startsWith( 'data-' ) )
					.map( attr => `${attr.name}="${attr.value}"` )
					.join( ' ' );

				return `• ${id}${classes ? ` (${classes})` : ''}${attrs ? ` [${attrs}]` : ''}`;
			} )
			.join( '\n' );

		result.innerHTML = `
            <div class="console-line info">Результат для селектора: "${selector}"</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Найдено элементов: ${elements.length}</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] В practice-области: ${this.selectedElements.size}</div>
            ${elementDetails ? `
                <div class="console-line">[${new Date().toLocaleTimeString()}] Элементы:</div>
                <div class="console-line details">${elementDetails}</div>
            ` : ''}
            ${this.selectedElements.size === 0 ?
				'<div class="console-line warning">Элементы не найдены в тестовой области</div>' :
				''
			}
        `;
	}

	// ===== РАЗДЕЛ 3: Изменение элементов =====
	runContentDemo() {
		const output = this.createOutputElement( 'contentOutput' );

		output.innerHTML = `
            <div class="console-line info">Демонстрация работы с содержимым...</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] textContent - безопасный текст (без HTML)</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] innerHTML - с HTML разметкой</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] innerText - с учетом стилей</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Для безопасности используйте textContent</div>
            <div class="console-line success">[${new Date().toLocaleTimeString()}] Демонстрация завершена</div>
            
            <div class="console-line info">Пример:</div>
            <div class="console-line">const el = document.createElement('div');</div>
            <div class="console-line">el.innerHTML = '&lt;span&gt;Текст&lt;/span&gt;';</div>
            <div class="console-line">console.log(el.textContent); // "Текст"</div>
            <div class="console-line">console.log(el.innerHTML);   // "&lt;span&gt;Текст&lt;/span&gt;"</div>
        `;
	}

	runStylesDemo() {
		const output = this.createOutputElement( 'stylesOutput' );

		output.innerHTML = `
            <div class="console-line info">Демонстрация работы со стилями...</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] element.style изменяет inline стили</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Свойства в camelCase (fontSize, backgroundColor)</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] getComputedStyle() возвращает все стили</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Рекомендуется использовать CSS классы</div>
            <div class="console-line success">[${new Date().toLocaleTimeString()}] Демонстрация завершена</div>
            
            <div class="console-line info">Пример массового изменения:</div>
            <div class="console-line">function setStyles(element, styles) {</div>
            <div class="console-line">    Object.assign(element.style, styles);</div>
            <div class="console-line">}</div>
        `;
	}

	runClassesDemo() {
		const output = this.createOutputElement( 'classesOutput' );

		output.innerHTML = `
            <div class="console-line info">Демонстрация работы с классами...</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] classList.add() - добавляет класс(ы)</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] classList.remove() - удаляет класс(ы)</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] classList.toggle() - переключает класс</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] classList.contains() - проверяет наличие</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] classList.replace() - заменяет класс</div>
            <div class="console-line success">[${new Date().toLocaleTimeString()}] Демонстрация завершена</div>
            
            <div class="console-line info">Пример:</div>
            <div class="console-line">element.classList.add('active', 'highlight');</div>
            <div class="console-line">element.classList.toggle('visible', true); // принудительно добавить</div>
            <div class="console-line">const isActive = element.classList.contains('active');</div>
        `;
	}

	// ===== НОВЫЕ МЕТОДЫ ДЛЯ РАБОТЫ С АТРИБУТАМИ =====
	runAttributesDemo() {
		const output = this.createOutputElement( 'attributesOutput' );

		output.innerHTML = `
            <div class="console-line info">Демонстрация работы с атрибутами...</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] getAttribute(name) - получить значение атрибута</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] setAttribute(name, value) - установить/изменить атрибут</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] removeAttribute(name) - удалить атрибут</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] hasAttribute(name) - проверить наличие атрибута</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] attributes - коллекция всех атрибутов</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] dataset - доступ к data-* атрибутам</div>
            <div class="console-line success">[${new Date().toLocaleTimeString()}] Демонстрация завершена</div>
            
            <div class="console-line info">Пример data-атрибутов:</div>
            <div class="console-line">// HTML: &lt;div data-user-id="123" data-user-role="admin"&gt;</div>
            <div class="console-line">const element = document.querySelector('[data-user-id]');</div>
            <div class="console-line">const userId = element.dataset.userId;          // "123"</div>
            <div class="console-line">const userRole = element.dataset.userRole;      // "admin"</div>
            <div class="console-line">element.dataset.userStatus = 'active';</div>
            <div class="console-line">// Преобразуется в data-user-status="active"</div>
        `;
	}

	runDatasetDemo() {
		const output = this.createOutputElement( 'datasetOutput' );

		// Создаем тестовый элемент для демонстрации
		const testElement = document.createElement( 'div' );
		testElement.id = 'dataset-demo-element';
		testElement.innerHTML = 'Тестовый элемент для демонстрации dataset';

		// Устанавливаем data-атрибуты
		testElement.dataset.userId = '12345';
		testElement.dataset.userRole = 'admin';
		testElement.dataset.accountStatus = 'active';
		testElement.dataset.lastLogin = '2024-01-23';

		// Временно добавляем на страницу для демонстрации
		const container = output.parentElement;
		if ( container ) {
			container.appendChild( testElement );
			testElement.style.display = 'block';
			testElement.style.padding = '10px';
			testElement.style.margin = '10px 0';
			testElement.style.backgroundColor = '#f0f9ff';
			testElement.style.border = '1px solid #4299e1';
			testElement.style.borderRadius = '4px';
		}

		output.innerHTML = `
            <div class="console-line info">Демонстрация работы с data-атрибутами (dataset)...</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] dataset - объект для работы с data-* атрибутами</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Дефисы преобразуются в camelCase: data-user-id → userId</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Все значения возвращаются как строки</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Установка: element.dataset.key = 'value'</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Удаление: delete element.dataset.key</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Все data-атрибуты: ${JSON.stringify( testElement.dataset )}</div>
            <div class="console-line success">[${new Date().toLocaleTimeString()}] Демонстрация завершена</div>
            
            <div class="console-line info">Примеры операций:</div>
            <div class="console-line">const element = document.getElementById('dataset-demo-element');</div>
            <div class="console-line">console.log(element.dataset.userId);         // "12345"</div>
            <div class="console-line">console.log(element.dataset.userRole);       // "admin"</div>
            <div class="console-line">console.log(element.dataset.accountStatus);  // "active"</div>
            <div class="console-line">console.log(element.dataset.lastLogin);      // "2024-01-23"</div>
            <div class="console-line">console.log(Object.keys(element.dataset));   // ["userId", "userRole", "accountStatus", "lastLogin"]</div>
            
            <div class="console-line info">Создан тестовый элемент:</div>
            <div class="console-line demo-element" id="demoElementInfo"></div>
        `;

		// Показываем HTML элемента
		const demoInfo = output.querySelector( '#demoElementInfo' );
		if ( demoInfo ) {
			demoInfo.textContent = testElement.outerHTML;
			demoInfo.style.fontFamily = 'monospace';
			demoInfo.style.fontSize = '12px';
			demoInfo.style.overflow = 'auto';
			demoInfo.style.padding = '10px';
			demoInfo.style.backgroundColor = '#f8f9fa';
			demoInfo.style.border = '1px solid #dee2e6';
			demoInfo.style.borderRadius = '4px';
		}

		// Удаляем тестовый элемент через 10 секунд
		setTimeout( () => {
			if ( testElement && testElement.parentElement ) {
				testElement.remove();
			}
		}, 10000 );
	}

	// ===== РАЗДЕЛ 7: Практическое задание =====
	runDOMExercise() {
		const code = document.getElementById( 'exerciseCode' ).value;
		const output = document.getElementById( 'exerciseOutput' );

		if ( !output ) return;

		try {
			const originalConsoleLog = console.log;
			let consoleOutput = '';

			console.log = function ( ...args ) {
				consoleOutput += args.join( ' ' ) + '\n';
				originalConsoleLog.apply( console, args );
			};

			// Изолируем выполнение кода
			const script = document.createElement( 'script' );
			script.textContent = `(function() {
                ${code}
            })();`;
			document.head.appendChild( script );
			document.head.removeChild( script );

			console.log = originalConsoleLog;

			output.innerHTML = `
                <div class="exercise-output">
                    <h4><i class="fas fa-play-circle"></i> Результат выполнения:</h4>
                    ${consoleOutput ? `
                        <div class="output-section">
                            <pre class="output-pre">${consoleOutput}</pre>
                        </div>
                    ` : `
                        <div class="output-placeholder">
                            <i class="fas fa-info-circle"></i>
                            Код выполнен, но нет вывода. Добавьте console.log()
                        </div>
                    `}
                </div>
            `;

		} catch ( error ) {
			output.innerHTML = `
                <div class="exercise-error">
                    <h4><i class="fas fa-exclamation-triangle"></i> Ошибка выполнения:</h4>
                    <pre class="error-pre">${error.toString()}</pre>
                    <p class="error-hint">Проверьте синтаксис вашего кода</p>
                </div>
            `;
		}
	}

	testDOMExercise() {
		const code = document.getElementById( 'exerciseCode' ).value;
		const output = document.getElementById( 'exerciseOutput' );

		if ( !output ) return;

		try {
			const testResults = [];

			// Проверяем наличие базовых структур
			eval( code );

			// Тест 1: Проверяем наличие класса ProductManager
			if ( typeof ProductManager === 'function' ) {
				testResults.push( {
					name: 'Класс ProductManager определен',
					passed: true
				} );
			}

			// Тест 2: Проверяем создание экземпляра
			try {
				const manager = new ProductManager();
				testResults.push( {
					name: 'Экземпляр ProductManager создан',
					passed: true
				} );

				// Тест 3: Проверяем метод addProduct
				if ( typeof manager.addProduct === 'function' ) {
					const product = manager.addProduct( "Тест", 100, "test", "Описание" );
					testResults.push( {
						name: 'Метод addProduct работает',
						passed: true
					} );
				}

				// Тест 4: Проверяем массив products
				if ( Array.isArray( manager.products ) ) {
					testResults.push( {
						name: 'Массив products инициализирован',
						passed: true
					} );
				}

			} catch ( e ) {
				testResults.push( {
					name: 'Ошибка при создании экземпляра',
					passed: false,
					error: e.message
				} );
			}

			const passedTests = testResults.filter( t => t.passed ).length;
			const totalTests = testResults.length;

			let testReport = '';
			testResults.forEach( test => {
				testReport += `
                    <div class="test-result ${test.passed ? 'passed' : 'failed'}">
                        <i class="fas fa-${test.passed ? 'check' : 'times'}-circle"></i>
                        <span>${test.name}</span>
                        <span class="status">${test.passed ? '✅' : '❌'}</span>
                    </div>
                `;
			} );

			output.innerHTML = `
                <div class="test-report">
                    <h4><i class="fas fa-vial"></i> Результаты тестирования:</h4>
                    <div class="test-summary">
                        <p>Пройдено тестов: <strong>${passedTests}/${totalTests}</strong></p>
                        <p>Успешность: <strong>${totalTests > 0 ? Math.round( passedTests / totalTests * 100 ) : 0}%</strong></p>
                    </div>
                    ${testResults.length > 0 ? `
                        <div class="test-details">
                            ${testReport}
                        </div>
                    ` : `
                        <div class="test-warning">
                            <i class="fas fa-exclamation-triangle"></i>
                            <p>Код не содержит ожидаемых структур. Убедитесь, что класс ProductManager определен.</p>
                        </div>
                    `}
                </div>
            `;

		} catch ( error ) {
			output.innerHTML = `
                <div class="exercise-error">
                    <h4><i class="fas fa-exclamation-triangle"></i> Ошибка тестирования:</h4>
                    <pre class="error-pre">${error.toString()}</pre>
                    <p class="error-hint">Проверьте синтаксис вашего кода</p>
                </div>
            `;
		}
	}

	clearDOMExercise() {
		document.getElementById( 'exerciseCode' ).value = '';
		document.getElementById( 'exerciseOutput' ).innerHTML = `
            <div class="output-placeholder">
                <i class="fas fa-terminal"></i>
                Вывод вашего кода появится здесь
            </div>
        `;
	}

	// ===== ВСПОМОГАТЕЛЬНЫЕ МЕТОДЫ =====
	createOutputElement( id ) {
		let output = document.getElementById( id );
		if ( !output ) {
			output = document.createElement( 'div' );
			output.id = id;
			output.className = 'console-output';
			// Находим ближайший output-container и добавляем в него
			const container = document.querySelector( `#${id.replace( 'Output', '' )}` )?.closest( '.code-executor' )?.querySelector( '.output-container' );
			if ( container ) {
				container.appendChild( output );
			}
		}
		return output;
	}

	showMessage( text, type = 'info' ) {
		const message = document.createElement( 'div' );
		message.className = `flash-message ${type}`;
		message.innerHTML = `
            <i class="fas fa-${this.getMessageIcon( type )}"></i>
            <span>${text}</span>
        `;

		document.body.appendChild( message );

		setTimeout( () => {
			message.classList.add( 'show' );
		}, 10 );

		setTimeout( () => {
			message.classList.remove( 'show' );
			setTimeout( () => message.remove(), 300 );
		}, 3000 );
	}

	getMessageIcon( type ) {
		switch ( type ) {
			case 'success': return 'check-circle';
			case 'error': return 'exclamation-circle';
			case 'warning': return 'exclamation-triangle';
			default: return 'info-circle';
		}
	}
}

// Инициализация при загрузке страницы
document.addEventListener( 'DOMContentLoaded', () => {
	window.domLesson = new DOMLessonManager();

	// Инициализируем практическую область
	const practiceElements = document.getElementById( 'practiceElements' );
	if ( practiceElements ) {
		practiceElements.innerHTML = window.domLesson.practiceElements.map( element => {
			const classes = ['practice-element', ...element.classes].join( ' ' );
			const attributes = element.attributes ?
				Object.entries( element.attributes )
					.map( ( [key, value] ) => `${key}="${value}"` )
					.join( ' ' ) : '';

			return `
                <div class="${classes}" id="${element.id}" ${attributes}>
                    ${element.hasHtml ? element.text : escapeHtml( element.text )}
                </div>
            `;
		} ).join( '' );
	}
} );

// Глобальные функции для HTML атрибутов onclick
window.showLiveDOM = () => window.domLesson?.showLiveDOM();
window.runGetElementByIdDemo = () => window.domLesson?.runGetElementByIdDemo();
window.runGetElementsByClassNameDemo = () => window.domLesson?.runGetElementsByClassNameDemo();
window.runGetElementsByTagNameDemo = () => window.domLesson?.runGetElementsByTagNameDemo();
window.runQuerySelectorDemo = () => window.domLesson?.runQuerySelectorDemo();
window.runRelationsDemo = () => window.domLesson?.runRelationsDemo();
window.testSelector = () => window.domLesson?.testSelector();
window.setSelector = ( selector ) => window.domLesson?.setSelector( selector );
window.runContentDemo = () => window.domLesson?.runContentDemo();
window.runStylesDemo = () => window.domLesson?.runStylesDemo();
window.runClassesDemo = () => window.domLesson?.runClassesDemo();
window.runAttributesDemo = () => window.domLesson?.runAttributesDemo();
window.runDatasetDemo = () => window.domLesson?.runDatasetDemo();
window.runDOMExercise = () => window.domLesson?.runDOMExercise();
window.testDOMExercise = () => window.domLesson?.testDOMExercise();
window.clearDOMExercise = () => window.domLesson?.clearDOMExercise();

// Вспомогательная функция для экранирования HTML
window.escapeHtml = ( text ) => {
	const div = document.createElement( 'div' );
	div.textContent = text;
	return div.innerHTML;
};