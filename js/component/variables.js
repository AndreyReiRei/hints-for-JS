/**
 * Файл для страницы урока по переменным
 * Содержит все интерактивные функции для демонстраций
 */

const VariablesLesson = {
	// Инициализация всех компонентов страницы
	init() {
		console.log( '%c📦 Урок "Переменные" загружен', 'color: #4299e1; font-weight: bold;' );

		this.initVisualVariables();
		this.initInteractiveComponents();
		this.initDemoVariables();
		this.initLessonProgress();
		this.initSolutionToggles(); // Добавляем инициализацию решений
	},

	// ===== ВИЗУАЛИЗАЦИЯ ПЕРЕМЕННЫХ =====
	initVisualVariables() {
		// Анимируем коробки с переменными
		const boxes = document.querySelectorAll( '.variable-box' );
		boxes.forEach( ( box, index ) => {
			setTimeout( () => {
				box.classList.add( 'animated' );
			}, index * 300 );
		} );
	},

	// ===== ИНТЕРАКТИВНЫЕ КОМПОНЕНТЫ =====
	initInteractiveComponents() {
		this.initTabs();
		this.initCodeHighlighting();
	},

	initTabs() {
		const tabBtns = document.querySelectorAll( '.tab-btn' );
		tabBtns.forEach( btn => {
			btn.addEventListener( 'click', function () {
				const tabId = this.getAttribute( 'data-tab' );

				// Убираем активный класс у всех
				tabBtns.forEach( b => b.classList.remove( 'active' ) );
				document.querySelectorAll( '.tab-content' ).forEach( c => c.classList.remove( 'active' ) );

				// Добавляем активный класс текущему
				this.classList.add( 'active' );
				const tabContent = document.getElementById( tabId );
				if ( tabContent ) tabContent.classList.add( 'active' );
			} );
		} );
	},

	// Добавляем новый метод для инициализации переключателей решений
	initSolutionToggles() {
		const solutionBtns = document.querySelectorAll( '.show-solution' );
		solutionBtns.forEach( btn => {
			btn.addEventListener( 'click', function ( e ) {
				e.preventDefault();
				const solution = this.nextElementSibling;
				if ( solution && solution.classList.contains( 'solution' ) ) {
					const isHidden = solution.classList.contains( 'hidden' );

					if ( isHidden ) {
						// Показываем решение
						solution.classList.remove( 'hidden' );
						this.innerHTML = '<i class="fas fa-eye-slash"></i> Скрыть решение';
						this.classList.add( 'active' );
					} else {
						// Скрываем решение
						solution.classList.add( 'hidden' );
						this.innerHTML = '<i class="fas fa-code"></i> Показать решение';
						this.classList.remove( 'active' );
					}
				}
			} );
		} );
	},

	initCodeHighlighting() {
		if ( typeof hljs !== 'undefined' ) {
			hljs.highlightAll();
		}
	},

	// ===== ДЕМО ПЕРЕМЕННЫХ =====
	initDemoVariables() {
		window.demoCounter = 0;
		window.demoCounterHistory = [];
	},

	// ===== ПРОГРЕСС УРОКА =====
	initLessonProgress() {
		const progressFill = document.querySelector( '.progress-fill' );
		if ( !progressFill ) return;

		const updateProgress = () => {
			const windowHeight = window.innerHeight;
			const documentHeight = document.documentElement.scrollHeight;
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			const scrolledPercent = ( scrollTop / ( documentHeight - windowHeight ) ) * 100;
			const progress = Math.min( Math.max( scrolledPercent, 0 ), 100 );

			progressFill.style.width = `${progress}%`;
		};

		window.addEventListener( 'scroll', updateProgress );
		updateProgress();
	}
};

// ===== ОБЩИЕ ФУНКЦИИ ДЛЯ ДЕМОНСТРАЦИЙ =====

// Демонстрация переменных
function runVariablesDemo() {
	const output = document.getElementById( 'variablesOutput' );
	if ( !output ) return;

	output.innerHTML = '';

	const messages = [
		{ text: 'let greeting = "Привет, мир!";', type: 'info' },
		{ text: 'greeting: "Привет, мир!"', type: 'success' },
		{ text: 'let number = 42;', type: 'info' },
		{ text: 'number: 42', type: 'success' },
		{ text: 'let isReady = true;', type: 'info' },
		{ text: 'isReady: true', type: 'success' },
		{ text: 'number = 100; // Изменяем значение', type: 'info' },
		{ text: 'number: 100', type: 'success' },
		{ text: 'let a = 5;', type: 'info' },
		{ text: 'let b = 10;', type: 'info' },
		{ text: 'let sum = a + b;', type: 'info' },
		{ text: 'sum: 15', type: 'success' }
	];

	let delay = 0;
	messages.forEach( ( msg, index ) => {
		setTimeout( () => {
			const line = document.createElement( 'div' );
			line.className = `console-line ${msg.type}`;
			line.textContent = `> ${msg.text}`;
			output.appendChild( line );
			output.scrollTop = output.scrollHeight;
		}, delay );
		delay += 300;
	} );
}

// Генерация объявления переменной
function generateDeclaration() {
	const type = document.getElementById( 'declarationType' ).value;
	const name = document.getElementById( 'variableName' ).value.trim();
	const value = document.getElementById( 'variableValue' ).value.trim();
	const resultBox = document.getElementById( 'declarationResult' );

	if ( !name || !value ) {
		resultBox.innerHTML = '<div class="console-line error">Введите имя и значение</div>';
		return;
	}

	// Проверяем имя переменной
	const nameRegex = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/;
	if ( !nameRegex.test( name ) ) {
		resultBox.innerHTML = '<div class="console-line error">Некорректное имя переменной</div>';
		return;
	}

	const code = `${type} ${name} = ${value};`;

	resultBox.innerHTML = `
        <div class="console-line success">Сгенерированный код:</div>
        <div class="console-line info">${code}</div>
        <div class="console-line success">Копируйте и используйте в своём коде!</div>
    `;
}

// Проверка имени переменной
function checkVariableName() {
	const name = document.getElementById( 'checkName' ).value.trim();
	const resultBox = document.getElementById( 'nameResult' );

	if ( !name ) {
		resultBox.innerHTML = '<div class="console-line error">Введите имя переменной</div>';
		return;
	}

	const checks = [];

	// 1. Проверка на зарезервированные слова
	const reservedWords = [
		'let', 'const', 'var', 'if', 'else', 'for', 'while', 'function',
		'return', 'class', 'import', 'export', 'new', 'this', 'typeof'
	];

	if ( reservedWords.includes( name.toLowerCase() ) ) {
		checks.push( { status: 'error', text: `"${name}" - зарезервированное слово` } );
	}

	// 2. Проверка первого символа
	if ( /^[0-9]/.test( name ) ) {
		checks.push( { status: 'error', text: 'Не может начинаться с цифры' } );
	}

	// 3. Проверка допустимых символов
	if ( !/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test( name ) ) {
		checks.push( { status: 'error', text: 'Содержит недопустимые символы' } );
	}

	// 4. Проверка camelCase (рекомендация)
	if ( name !== name.toLowerCase() && name !== name.toUpperCase() && !name.includes( '_' ) ) {
		checks.push( { status: 'good', text: 'CamelCase - отлично!' } );
	}

	// 5. Проверка длины
	if ( name.length > 20 ) {
		checks.push( { status: 'warning', text: 'Слишком длинное имя' } );
	} else if ( name.length < 2 ) {
		checks.push( { status: 'warning', text: 'Слишком короткое имя' } );
	}

	// 6. Проверка транслита
	const cyrillicPattern = /[а-яА-Я]/;
	if ( cyrillicPattern.test( name ) ) {
		checks.push( { status: 'warning', text: 'Используется транслит' } );
	}

	// Вывод результатов
	let html = '<div class="console-line success">Результаты проверки:</div>';

	if ( checks.length === 0 ) {
		html += '<div class="console-line success">Имя переменной корректно!</div>';
	} else {
		checks.forEach( check => {
			const icon = check.status === 'good' ? '✅' : check.status === 'warning' ? '⚠️' : '❌';
			html += `<div class="console-line ${check.status}">${icon} ${check.text}</div>`;
		} );
	}

	resultBox.innerHTML = html;
}

// Изменение значения демо-переменной
function changeValue( action ) {
	const valueElement = document.getElementById( 'demoVarValue' );
	const codeElement = document.getElementById( 'demoCode' );

	if ( !window.demoCounterHistory ) {
		window.demoCounterHistory = [];
	}

	let newValue = parseInt( valueElement.textContent );
	let codeLine = 'let counter = 0;';

	switch ( action ) {
		case 'increment':
			newValue++;
			codeLine = 'counter++;';
			break;
		case 'decrement':
			newValue--;
			codeLine = 'counter--;';
			break;
		case 'double':
			newValue *= 2;
			codeLine = 'counter *= 2;';
			break;
		case 'reset':
			newValue = 0;
			codeLine = 'counter = 0;';
			window.demoCounterHistory = [];
			break;
	}

	valueElement.textContent = newValue;
	window.demoCounterHistory.push( { action, value: newValue } );
	codeElement.textContent = codeLine;

	// Анимация изменения
	valueElement.classList.add( 'changed' );
	setTimeout( () => {
		valueElement.classList.remove( 'changed' );
	}, 500 );
}

// Запуск упражнения
function runExercise() {
	const code = document.getElementById( 'exerciseCode' ).value;
	const output = document.getElementById( 'exerciseOutput' );

	if ( !output ) return;

	output.innerHTML = '<div class="console-line info">Выполнение кода...</div>';

	try {
		// Создаем безопасное окружение для выполнения кода
		const safeCode = `
            try {
                ${code}
            } catch(error) {
                console.error("Ошибка:", error.message);
            }
        `;

		// Заменяем console.log для вывода в наш блок
		const originalLog = console.log;
		const logs = [];

		console.log = function ( ...args ) {
			logs.push( args.join( ' ' ) );
			originalLog.apply( console, args );
		};

		// Выполняем код
		eval( safeCode );

		// Восстанавливаем console.log
		console.log = originalLog;

		// Выводим результаты
		if ( logs.length === 0 ) {
			output.innerHTML = '<div class="console-line warning">Код выполнен, но нет вывода в консоль</div>';
		} else {
			output.innerHTML = logs.map( log => `<div class="console-line success">${log}</div>` ).join( '' );
		}

	} catch ( error ) {
		output.innerHTML = `<div class="console-line error">Ошибка: ${error.message}</div>`;
	}
}

// Очистка упражнения
function clearExercise() {
	document.getElementById( 'exerciseCode' ).value = '';
	document.getElementById( 'exerciseOutput' ).innerHTML =
		'<div class="output-placeholder"><i class="fas fa-terminal"></i>Вывод вашего кода появится здесь</div>';
}

// Загрузка шпаргалки
function downloadCheatSheet() {
	const cheatSheet = `
=== Шпаргалка по переменным JavaScript ===

1. ОБЪЯВЛЕНИЕ:
   let x = 5;          // Изменяемая переменная
   const y = 10;       // Константа (нельзя менять)
   var z = 15;         // Устаревший способ (не использовать)

2. ПРАВИЛА ИМЕНОВАНИЯ:
   - camelCase: userName, itemCount
   - UPPER_CASE для констант: MAX_SIZE, PI
   - Начинать с буквы, $ или _
   - Не использовать зарезервированные слова

3. ОБЛАСТЬ ВИДИМОСТИ:
   - Глобальная: везде доступна
   - Локальная: только в функции
   - Блочная: только в блоке {}

4. ВСПЛЫТИЕ (HOISTING):
   - var: объявление поднимается, = undefined
   - let/const: объявление поднимается, но не инициализируется
   - Функции: полностью поднимаются

5. ПРАКТИЧЕСКИЕ СОВЕТЫ:
   - Всегда используйте const по умолчанию
   - Используйте let только когда нужно менять значение
   - Никогда не используйте var
   - Давайте осмысленные имена переменным

Примеры:
   const MAX_USERS = 100;           // Константа
   let currentUser = "Анна";        // Изменяемая переменная
   let isLoggedIn = false;          // Флаг
   let items = [];                  // Массив
   let user = { name: "Иван" };     // Объект
    `.trim();

	const blob = new Blob( [cheatSheet], { type: 'text/plain' } );
	const url = URL.createObjectURL( blob );
	const a = document.createElement( 'a' );
	a.href = url;
	a.download = 'javascript-variables-cheatsheet.txt';
	document.body.appendChild( a );
	a.click();
	document.body.removeChild( a );
	URL.revokeObjectURL( url );
}

// Инициализация урока при загрузке страницы
document.addEventListener( 'DOMContentLoaded', () => {
	VariablesLesson.init();

	// Экспортируем функции в глобальную область видимости
	window.runVariablesDemo = runVariablesDemo;
	window.generateDeclaration = generateDeclaration;
	window.checkVariableName = checkVariableName;
	window.changeValue = changeValue;
	window.runExercise = runExercise;
	window.clearExercise = clearExercise;
	window.downloadCheatSheet = downloadCheatSheet;

	// Также делаем глобальной функцию для переключения решений
	window.toggleSolution = function ( button ) {
		const solution = button.nextElementSibling;
		if ( solution && solution.classList.contains( 'solution' ) ) {
			const isHidden = solution.classList.contains( 'hidden' );

			if ( isHidden ) {
				// Показываем решение
				solution.classList.remove( 'hidden' );
				button.innerHTML = '<i class="fas fa-eye-slash"></i> Скрыть решение';
				button.classList.add( 'active' );
			} else {
				// Скрываем решение
				solution.classList.add( 'hidden' );
				button.innerHTML = '<i class="fas fa-code"></i> Показать решение';
				button.classList.remove( 'active' );
			}
		}
	};
} );