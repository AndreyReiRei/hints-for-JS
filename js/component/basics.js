/**
 * Специфичный код для Урока 1: Основы JavaScript
 */

class BasicsLessonManager {
	constructor() {
		this.init();
	}

	init() {
		console.log( '%c📘 Основы JavaScript: интерактивные демо загружены', 'color: #4299e1;' );
	}

	// Запуск базового кода
	runBasicCode() {
		const output = document.getElementById( 'basicOutput' );
		if ( !output ) return;

		output.innerHTML = `
            <div class="console-line info">Запуск программы...</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Привет, мир!</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Добро пожаловать в JavaScript!</div>
            <div class="console-line number">[${new Date().toLocaleTimeString()}] 42</div>
            <div class="console-line boolean">[${new Date().toLocaleTimeString()}] true</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] [1, 2, 3]</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] {name: "Вася"}</div>
            <div class="console-line success">[${new Date().toLocaleTimeString()}] Программа завершена!</div>
        `;
	}

	// Проверка типа данных
	checkDataType() {
		const input = document.getElementById( 'typeInput' );
		const result = document.getElementById( 'typeResult' );
		if ( !input || !result ) return;

		try {
			// Пытаемся вычислить введенное значение
			const value = eval( input.value );
			const type = typeof value;

			let typeDescription = '';
			let typeClass = '';

			switch ( type ) {
				case 'number':
					typeDescription = isNaN( value ) ? 'NaN (Not a Number)' : 'Число';
					typeClass = 'number';
					break;
				case 'string':
					typeDescription = 'Строка';
					typeClass = 'string';
					break;
				case 'boolean':
					typeDescription = 'Логическое значение';
					typeClass = 'boolean';
					break;
				case 'undefined':
					typeDescription = 'Не определено';
					typeClass = 'undefined';
					break;
				case 'object':
					typeDescription = value === null ? 'Null' : 'Объект';
					typeClass = 'object';
					break;
				default:
					typeDescription = type;
			}

			result.innerHTML = `
                <div class="result-success">
                    <h4><i class="fas fa-check-circle"></i> Результат проверки</h4>
                    <div class="result-details">
                        <p><strong>Введенное значение:</strong> <code>${input.value}</code></p>
                        <p><strong>Тип данных:</strong> <span class="type-badge ${typeClass}">${typeDescription}</span></p>
                        <p><strong>typeof:</strong> <code>"${type}"</code></p>
                        <p><strong>Значение:</strong> <code>${JSON.stringify( value )}</code></p>
                    </div>
                </div>
            `;
		} catch ( error ) {
			result.innerHTML = `
                <div class="result-error">
                    <i class="fas fa-exclamation-triangle"></i>
                    <div>
                        <strong>Ошибка!</strong>
                        <p>${error.message}</p>
                        <p class="text-muted">Проверьте правильность синтаксиса</p>
                    </div>
                </div>
            `;
		}
	}

	// Вычисление операции
	calculateOperation() {
		const a = parseFloat( document.getElementById( 'calcA' ).value );
		const b = parseFloat( document.getElementById( 'calcB' ).value );
		const operator = document.getElementById( 'calcOperator' ).value;
		const resultDiv = document.getElementById( 'calcResult' );

		if ( !resultDiv ) return;

		let result;
		let operation;

		try {
			switch ( operator ) {
				case '+':
					result = a + b;
					operation = `${a} + ${b}`;
					break;
				case '-':
					result = a - b;
					operation = `${a} - ${b}`;
					break;
				case '*':
					result = a * b;
					operation = `${a} × ${b}`;
					break;
				case '/':
					result = a / b;
					operation = `${a} ÷ ${b}`;
					break;
				case '%':
					result = a % b;
					operation = `${a} % ${b}`;
					break;
				case '**':
					result = a ** b;
					operation = `${a} ** ${b}`;
					break;
				case '==':
					result = a == b;
					operation = `${a} == ${b}`;
					break;
				case '===':
					result = a === b;
					operation = `${a} === ${b}`;
					break;
				default:
					result = 'Неизвестная операция';
			}

			resultDiv.innerHTML = `
                <div class="calc-result-success">
                    <h4><i class="fas fa-equals"></i> Результат вычисления</h4>
                    <div class="calc-operation">
                        <code>${operation}</code> = <strong>${result}</strong>
                    </div>
                    <div class="calc-details">
                        <p><strong>Тип результата:</strong> ${typeof result}</p>
                        ${typeof result === 'boolean' ?
					`<p><strong>Логическое значение:</strong> ${result ? 'Истина (true)' : 'Ложь (false)'}</p>` :
					''
				}
                    </div>
                </div>
            `;
		} catch ( error ) {
			resultDiv.innerHTML = `
                <div class="calc-result-error">
                    <i class="fas fa-exclamation-circle"></i>
                    <div>
                        <strong>Ошибка вычисления!</strong>
                        <p>${error.message}</p>
                    </div>
                </div>
            `;
		}
	}

	// Запуск задания
	runExercise() {
		const code = document.getElementById( 'exerciseCode' ).value;
		const output = document.getElementById( 'exerciseOutput' );

		if ( !output ) return;

		try {
			// Сохраняем оригинальные функции для восстановления
			const originalAlert = window.alert;
			const originalPrompt = window.prompt;
			const originalConsoleLog = console.log;

			let alertOutput = '';
			let promptOutput = '';
			let consoleOutput = '';

			// Переопределяем alert для захвата вывода
			window.alert = function ( message ) {
				alertOutput += `💬 Alert: ${message}\n`;
				return originalAlert( message );
			};

			// Переопределяем prompt для симуляции ввода
			window.prompt = function ( message, defaultValue ) {
				promptOutput += `❓ Prompt: ${message}\n`;
				// Симулируем ввод тестовых данных
				if ( message.includes( 'имя' ) ) return 'Тестовый пользователь';
				if ( message.includes( 'год' ) ) return '2000';
				return defaultValue || '';
			};

			// Переопределяем console.log для захвата вывода
			console.log = function ( ...args ) {
				consoleOutput += args.join( ' ' ) + '\n';
				originalConsoleLog.apply( console, args );
			};

			// Выполняем код пользователя
			eval( code );

			// Восстанавливаем оригинальные функции
			window.alert = originalAlert;
			window.prompt = originalPrompt;
			console.log = originalConsoleLog;

			// Формируем вывод
			output.innerHTML = `
                <div class="exercise-output">
                    <h4><i class="fas fa-play-circle"></i> Результат выполнения:</h4>
                    ${promptOutput ? `
                        <div class="output-section">
                            <h5>Ввод данных:</h5>
                            <pre class="output-pre">${promptOutput}</pre>
                        </div>
                    ` : ''}
                    ${alertOutput ? `
                        <div class="output-section">
                            <h5>Окна сообщений:</h5>
                            <pre class="output-pre">${alertOutput}</pre>
                        </div>
                    ` : ''}
                    ${consoleOutput ? `
                        <div class="output-section">
                            <h5>Вывод в консоль:</h5>
                            <pre class="output-pre">${consoleOutput}</pre>
                        </div>
                    ` : ''}
                    ${!promptOutput && !alertOutput && !consoleOutput ? `
                        <div class="output-placeholder">
                            <i class="fas fa-info-circle"></i>
                            Код выполнен, но не было вывода. Добавьте console.log() или prompt()/alert()
                        </div>
                    ` : ''}
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

	// Очистка задания
	clearExercise() {
		document.getElementById( 'exerciseCode' ).value = '';
		document.getElementById( 'exerciseOutput' ).innerHTML = `
            <div class="output-placeholder">
                <i class="fas fa-terminal"></i>
                Вывод вашего кода появится здесь
            </div>
        `;
	}
}

// Инициализация при загрузке страницы
document.addEventListener( 'DOMContentLoaded', () => {
	window.basicsLesson = new BasicsLessonManager();
} );

// Глобальные функции для HTML атрибутов onclick
window.runBasicCode = function () {
	if ( window.basicsLesson ) window.basicsLesson.runBasicCode();
};

window.checkDataType = function () {
	if ( window.basicsLesson ) window.basicsLesson.checkDataType();
};

window.calculateOperation = function () {
	if ( window.basicsLesson ) window.basicsLesson.calculateOperation();
};

window.runExercise = function () {
	if ( window.basicsLesson ) window.basicsLesson.runExercise();
};

window.clearExercise = function () {
	if ( window.basicsLesson ) window.basicsLesson.clearExercise();
};