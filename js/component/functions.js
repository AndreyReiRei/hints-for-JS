/**
 * Файл для Урока 4: Функции в JavaScript
 * Содержит интерактивные демонстрации функций
 */

class FunctionsLessonManager {
	constructor() {
		this.init();
	}

	init() {
		console.log( '%c📘 Функции в JavaScript: интерактивные демо загружены', 'color: #4299e1;' );

		// Используем уже существующий initSolutions из basic-components.js
		// поэтому ничего не вызываем здесь
	}

	// ===== ДЕМОНСТРАЦИЯ ТИПОВ ОБЪЯВЛЕНИЙ ФУНКЦИЙ =====

	runDeclarationDemo() {
		const output = document.getElementById( 'declarationOutput' );
		if ( !output ) return;

		output.innerHTML = `
            <div class="console-line info">Запуск Function Declaration...</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] greet("Анна") = "Привет, Анна!"</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] calculateSum(5, 3) = 8</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] calculateSum(10, 20) = 30</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] message = "Привет, Мир!"</div>
            <div class="console-line success">[${new Date().toLocaleTimeString()}] Демонстрация завершена</div>
        `;
	}

	runExpressionDemo() {
		const output = document.getElementById( 'expressionOutput' );
		if ( !output ) return;

		output.innerHTML = `
            <div class="console-line info">Запуск Function Expression...</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] greet("Петр") = "Привет, Петр!"</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] multiply(4, 5) = 20</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] operations[0](10, 5) = 15</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] operations[1](10, 5) = 5</div>
            <div class="console-line success">[${new Date().toLocaleTimeString()}] Демонстрация завершена</div>
        `;
	}

	runArrowDemo() {
		const output = document.getElementById( 'arrowOutput' );
		if ( !output ) return;

		output.innerHTML = `
            <div class="console-line info">Запуск Arrow Functions...</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] greet("Мария") = "Привет, Мария!"</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] square(5) = 25</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] sayHello() = "Привет!"</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] sum(10, 20) = 30</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] createUser("Алексей", 25) = {name: "Алексей", age: 25, isAdult: true}</div>
            <div class="console-line success">[${new Date().toLocaleTimeString()}] Демонстрация завершена</div>
        `;
	}

	runIIFEDemo() {
		const output = document.getElementById( 'iifeOutput' );
		if ( !output ) return;

		output.innerHTML = `
            <div class="console-line info">Запуск IIFE...</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Эта функция выполняется сразу!</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Привет, Алексей!</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Случайное число: ${Math.floor( Math.random() * 100 )}</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] getSecret() = "Секрет"</div>
            <div class="console-line success">[${new Date().toLocaleTimeString()}] Демонстрация завершена</div>
        `;
	}

	// ===== ДЕМОНСТРАЦИЯ ПАРАМЕТРОВ И АРГУМЕНТОВ =====

	runParamsDemo() {
		const arg1 = parseFloat( document.getElementById( 'arg1' ).value ) || 0;
		const arg2 = parseFloat( document.getElementById( 'arg2' ).value ) || 0;
		const operation = document.getElementById( 'operation' ).value;
		const output = document.getElementById( 'paramsOutput' );

		if ( !output ) return;

		let result;
		let operationText;

		switch ( operation ) {
			case 'add':
				result = arg1 + arg2;
				operationText = '+';
				break;
			case 'subtract':
				result = arg1 - arg2;
				operationText = '-';
				break;
			case 'multiply':
				result = arg1 * arg2;
				operationText = '×';
				break;
			case 'divide':
				result = arg2 !== 0 ? arg1 / arg2 : 'Ошибка: деление на ноль';
				operationText = '÷';
				break;
		}

		output.innerHTML = `
            <div class="result-success">
                <h4><i class="fas fa-check-circle"></i> Результат вызова функции:</h4>
                <div class="result-details">
                    <p><strong>Вызов функции:</strong> <code>calculate(${arg1}, ${arg2}, "${operation}")</code></p>
                    <p><strong>Операция:</strong> ${arg1} ${operationText} ${arg2}</p>
                    <p><strong>Результат:</strong> <strong class="result-value">${result}</strong></p>
                    <p><strong>Тип результата:</strong> ${typeof result}</p>
                </div>
            </div>
        `;
	}

	// ===== ДЕМОНСТРАЦИЯ ВОЗВРАТА ЗНАЧЕНИЙ =====

	runReturnSingle() {
		const output = document.getElementById( 'returnSingleOutput' );
		if ( !output ) return;

		output.innerHTML = `
            <div class="console-line info">Запуск функций с одним return...</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] isAdult(20) = true</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] isAdult(16) = false</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] calculateCircleArea(5) = ${( Math.PI * 5 * 5 ).toFixed( 2 )}</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] square(4) = 16</div>
            <div class="console-line success">[${new Date().toLocaleTimeString()}] Демонстрация завершена</div>
        `;
	}

	runReturnMultiple() {
		const output = document.getElementById( 'returnMultipleOutput' );
		if ( !output ) return;

		output.innerHTML = `
            <div class="console-line info">Запуск функций с несколькими return...</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] getGrade(95) = 'A'</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] getGrade(85) = 'B'</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] getGrade(55) = 'F'</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] processValue("hello") = "HELLO"</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] processValue(10) = 20</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] processValue([1, 2, 3]) = 3</div>
            <div class="console-line success">[${new Date().toLocaleTimeString()}] Демонстрация завершена</div>
        `;
	}

	runReturnNone() {
		const output = document.getElementById( 'returnNoneOutput' );
		if ( !output ) return;

		output.innerHTML = `
            <div class="console-line info">Запуск функций без return...</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Привет, мир!</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Результат функции: undefined</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Счетчик: 1</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Счетчик: 2</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Новый total: 10</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Новый total: 30</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Итоговый total: 30</div>
            <div class="console-line success">[${new Date().toLocaleTimeString()}] Демонстрация завершена</div>
        `;
	}

	runReturnEarly() {
		const output = document.getElementById( 'returnEarlyOutput' );
		if ( !output ) return;

		output.innerHTML = `
            <div class="console-line info">Запуск функций с ранним return...</div>
            <div class="console-line warning">[${new Date().toLocaleTimeString()}] Ошибка: пользователь не определен</div>
            <div class="console-line warning">[${new Date().toLocaleTimeString()}] Ошибка: имя пользователя не указано</div>
            <div class="console-line warning">[${new Date().toLocaleTimeString()}] Ошибка: имя пользователя не указано</div>
            <div class="console-line warning">[${new Date().toLocaleTimeString()}] Ошибка: некорректный возраст</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Обработка пользователя: Иван, 25 лет</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] calculateDiscount(100, "SALE20") = 80</div>
            <div class="console-line success">[${new Date().toLocaleTimeString()}] Демонстрация завершена</div>
        `;
	}

	// ===== ДЕМОНСТРАЦИЯ ЗАМЫКАНИЙ =====

	createCounter() {
		const startValue = parseInt( document.getElementById( 'startValue' ).value ) || 0;
		const stepValue = parseInt( document.getElementById( 'stepValue' ).value ) || 1;
		const controls = document.getElementById( 'counterControls' );
		const output = document.getElementById( 'counterOutput' );

		if ( !controls || !output ) return;

		// Создаем счетчик с замыканием
		const counter = ( function () {
			let count = startValue;

			return {
				increment: () => {
					count += stepValue;
					return count;
				},
				decrement: () => {
					count -= stepValue;
					return count;
				},
				getValue: () => count,
				reset: () => {
					count = startValue;
					return count;
				}
			};
		} )();

		// Создаем кнопки управления
		controls.innerHTML = `
            <button class="btn btn-primary" onclick="window.functionsLesson.counterAction('increment')">
                <i class="fas fa-plus"></i> Увеличить (+${stepValue})
            </button>
            <button class="btn btn-secondary" onclick="window.functionsLesson.counterAction('decrement')">
                <i class="fas fa-minus"></i> Уменьшить (-${stepValue})
            </button>
            <button class="btn btn-warning" onclick="window.functionsLesson.counterAction('reset')">
                <i class="fas fa-redo"></i> Сбросить
            </button>
            <button class="btn btn-success" onclick="window.functionsLesson.counterAction('get')">
                <i class="fas fa-eye"></i> Текущее значение
            </button>
        `;

		// Сохраняем счетчик
		this.currentCounter = counter;

		output.innerHTML = `
            <div class="result-success">
                <h4><i class="fas fa-check-circle"></i> Счетчик создан!</h4>
                <div class="result-details">
                    <p><strong>Начальное значение:</strong> ${startValue}</p>
                    <p><strong>Шаг изменения:</strong> ${stepValue}</p>
                    <p><strong>Текущее значение:</strong> ${counter.getValue()}</p>
                    <p class="text-muted">Используйте кнопки выше для управления счетчиком</p>
                </div>
            </div>
        `;
	}

	counterAction( action ) {
		if ( !this.currentCounter ) return;

		const output = document.getElementById( 'counterOutput' );
		if ( !output ) return;

		let result;
		let message;

		switch ( action ) {
			case 'increment':
				result = this.currentCounter.increment();
				message = `Увеличили на ${document.getElementById( 'stepValue' ).value || 1}`;
				break;
			case 'decrement':
				result = this.currentCounter.decrement();
				message = `Уменьшили на ${document.getElementById( 'stepValue' ).value || 1}`;
				break;
			case 'reset':
				result = this.currentCounter.reset();
				message = 'Сбросили к начальному значению';
				break;
			case 'get':
				result = this.currentCounter.getValue();
				message = 'Текущее значение счетчика';
				break;
		}

		output.innerHTML = `
            <div class="result-success">
                <h4><i class="fas fa-history"></i> ${message}</h4>
                <div class="result-details">
                    <p><strong>Результат:</strong> <strong class="result-value">${result}</strong></p>
                    <p><strong>Тип:</strong> ${typeof result}</p>
                </div>
            </div>
        `;
	}

	// ===== ДЕМОНСТРАЦИЯ РЕКУРСИИ =====

	calculateFactorial() {
		const n = parseInt( document.getElementById( 'recursionNumber' ).value ) || 5;
		const tree = document.getElementById( 'recursionTree' );
		const resultDiv = document.getElementById( 'recursionResult' );

		if ( !tree || !resultDiv ) return;

		// Очищаем предыдущие результаты
		tree.innerHTML = '';

		// Создаем визуализацию рекурсии
		let depth = 0;
		const callStack = [];

		function factorialWithTrace( x, level = 0 ) {
			const callId = callStack.length;
			callStack.push( { n: x, level, id: callId } );

			// Добавляем в дерево
			const levelDiv = document.createElement( 'div' );
			levelDiv.className = `level level-${level}`;
			levelDiv.textContent = `factorial(${x}) = ${x > 1 ? `${x} × factorial(${x - 1})` : '1'}`;
			tree.appendChild( levelDiv );

			if ( x <= 1 ) {
				return 1;
			}

			const result = x * factorialWithTrace( x - 1, level + 1 );

			// Добавляем результат в дерево
			const resultDiv = document.createElement( 'div' );
			resultDiv.className = `level level-${level} result`;
			resultDiv.textContent = `↳ factorial(${x}) = ${result}`;
			resultDiv.style.color = '#68d391';
			tree.appendChild( resultDiv );

			return result;
		}

		const result = factorialWithTrace( n );

		// Показываем итоговый результат
		resultDiv.innerHTML = `
            <div class="result-success">
                <h4><i class="fas fa-calculator"></i> Результат вычисления факториала</h4>
                <div class="result-details">
                    <p><strong>Формула:</strong> ${n}! = ${n} × ${n - 1} × ... × 1</p>
                    <p><strong>Результат:</strong> <strong class="result-value">${result}</strong></p>
                    <p><strong>Количество рекурсивных вызовов:</strong> ${n}</p>
                    <p><strong>Глубина рекурсии:</strong> ${n}</p>
                </div>
            </div>
        `;
	}

	calculateFibonacci() {
		const n = parseInt( document.getElementById( 'recursionNumber' ).value ) || 5;
		const tree = document.getElementById( 'recursionTree' );
		const resultDiv = document.getElementById( 'recursionResult' );

		if ( !tree || !resultDiv ) return;

		tree.innerHTML = '';

		let callCount = 0;

		function fibonacciWithTrace( x, level = 0 ) {
			callCount++;

			const levelDiv = document.createElement( 'div' );
			levelDiv.className = `level level-${level}`;

			if ( x <= 0 ) {
				levelDiv.textContent = `fibonacci(${x}) = 0`;
				tree.appendChild( levelDiv );
				return 0;
			}
			if ( x === 1 ) {
				levelDiv.textContent = `fibonacci(${x}) = 1`;
				tree.appendChild( levelDiv );
				return 1;
			}

			levelDiv.textContent = `fibonacci(${x}) = fibonacci(${x - 1}) + fibonacci(${x - 2})`;
			tree.appendChild( levelDiv );

			const result = fibonacciWithTrace( x - 1, level + 1 ) + fibonacciWithTrace( x - 2, level + 1 );

			const resultDiv = document.createElement( 'div' );
			resultDiv.className = `level level-${level} result`;
			resultDiv.textContent = `↳ fibonacci(${x}) = ${result}`;
			resultDiv.style.color = '#68d391';
			tree.appendChild( resultDiv );

			return result;
		}

		const result = fibonacciWithTrace( n );

		resultDiv.innerHTML = `
            <div class="result-success">
                <h4><i class="fas fa-project-diagram"></i> Результат вычисления Фибоначчи</h4>
                <div class="result-details">
                    <p><strong>Число Фибоначчи F(${n}):</strong> F(${n}) = F(${n - 1}) + F(${n - 2})</p>
                    <p><strong>Результат:</strong> <strong class="result-value">${result}</strong></p>
                    <p><strong>Последовательность до F(${n}):</strong> ${this.getFibonacciSequence( n )}</p>
                    <p><strong>Количество рекурсивных вызовов:</strong> ${callCount}</p>
                </div>
            </div>
        `;
	}

	calculateSumRecursive() {
		const n = parseInt( document.getElementById( 'recursionNumber' ).value ) || 5;
		const tree = document.getElementById( 'recursionTree' );
		const resultDiv = document.getElementById( 'recursionResult' );

		if ( !tree || !resultDiv ) return;

		tree.innerHTML = '';

		function sumUpTo( x, level = 0 ) {
			const levelDiv = document.createElement( 'div' );
			levelDiv.className = `level level-${level}`;

			if ( x <= 0 ) {
				levelDiv.textContent = `sumUpTo(${x}) = 0`;
				tree.appendChild( levelDiv );
				return 0;
			}

			levelDiv.textContent = `sumUpTo(${x}) = ${x} + sumUpTo(${x - 1})`;
			tree.appendChild( levelDiv );

			const result = x + sumUpTo( x - 1, level + 1 );

			const resultDiv = document.createElement( 'div' );
			resultDiv.className = `level level-${level} result`;
			resultDiv.textContent = `↳ sumUpTo(${x}) = ${result}`;
			resultDiv.style.color = '#68d391';
			tree.appendChild( resultDiv );

			return result;
		}

		const result = sumUpTo( n );

		resultDiv.innerHTML = `
            <div class="result-success">
                <h4><i class="fas fa-plus"></i> Результат суммирования чисел</h4>
                <div class="result-details">
                    <p><strong>Формула:</strong> 1 + 2 + 3 + ... + ${n}</p>
                    <p><strong>Результат:</strong> <strong class="result-value">${result}</strong></p>
                    <p><strong>Альтернативная формула:</strong> n(n+1)/2 = ${n}×${n + 1}/2 = ${n * ( n + 1 ) / 2}</p>
                    <p><strong>Глубина рекурсии:</strong> ${n}</p>
                </div>
            </div>
        `;
	}

	getFibonacciSequence( n ) {
		const sequence = [];
		let a = 0, b = 1;

		for ( let i = 0; i <= n; i++ ) {
			sequence.push( a );
			[a, b] = [b, a + b];
		}

		return sequence.join( ', ' );
	}

	// ===== ПРАКТИЧЕСКОЕ ЗАДАНИЕ =====

	runFunctionsExercise() {
		const code = document.getElementById( 'exerciseCode' ).value;
		const output = document.getElementById( 'exerciseOutput' );

		if ( !output ) return;

		try {
			// Сохраняем оригинальный console.log
			const originalConsoleLog = console.log;
			let consoleOutput = '';

			// Перехватываем вывод
			console.log = function ( ...args ) {
				consoleOutput += args.join( ' ' ) + '\n';
				originalConsoleLog.apply( console, args );
			};

			// Выполняем код
			eval( code );

			// Восстанавливаем console.log
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

	testFunctionsExercise() {
		const code = document.getElementById( 'exerciseCode' ).value;
		const output = document.getElementById( 'exerciseOutput' );

		if ( !output ) return;

		try {
			// Создаем тестовую среду
			const testResults = [];

			// Выполняем код
			eval( code );

			// Проверяем наличие функций (базовые тесты)
			if ( typeof celsiusToFahrenheit === 'function' ) {
				const result = celsiusToFahrenheit( 25 );
				const expected = 77;
				const passed = Math.abs( result - expected ) < 0.1;
				testResults.push( {
					name: 'celsiusToFahrenheit(25)',
					result,
					expected,
					passed
				} );
			}

			if ( typeof fahrenheitToCelsius === 'function' ) {
				const result = fahrenheitToCelsius( 77 );
				const expected = 25;
				const passed = Math.abs( result - expected ) < 0.1;
				testResults.push( {
					name: 'fahrenheitToCelsius(77)',
					result,
					expected,
					passed
				} );
			}

			// Формируем отчет
			const passedTests = testResults.filter( t => t.passed ).length;
			const totalTests = testResults.length;

			let testReport = '';
			testResults.forEach( test => {
				testReport += `
                    <div class="test-result ${test.passed ? 'passed' : 'failed'}">
                        <i class="fas fa-${test.passed ? 'check' : 'times'}-circle"></i>
                        <span>${test.name}</span>
                        <span>Результат: ${test.result.toFixed( 2 )}</span>
                        <span>Ожидалось: ${test.expected}</span>
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
                            <p>Тестовые функции не найдены. Убедитесь, что функции названы правильно.</p>
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

	clearFunctionsExercise() {
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
	window.functionsLesson = new FunctionsLessonManager();
} );

// Глобальные функции для HTML атрибутов onclick
window.runDeclarationDemo = () => window.functionsLesson?.runDeclarationDemo();
window.runExpressionDemo = () => window.functionsLesson?.runExpressionDemo();
window.runArrowDemo = () => window.functionsLesson?.runArrowDemo();
window.runIIFEDemo = () => window.functionsLesson?.runIIFEDemo();
window.runParamsDemo = () => window.functionsLesson?.runParamsDemo();
window.runReturnSingle = () => window.functionsLesson?.runReturnSingle();
window.runReturnMultiple = () => window.functionsLesson?.runReturnMultiple();
window.runReturnNone = () => window.functionsLesson?.runReturnNone();
window.runReturnEarly = () => window.functionsLesson?.runReturnEarly();
window.createCounter = () => window.functionsLesson?.createCounter();
window.calculateFactorial = () => window.functionsLesson?.calculateFactorial();
window.calculateFibonacci = () => window.functionsLesson?.calculateFibonacci();
window.calculateSumRecursive = () => window.functionsLesson?.calculateSumRecursive();
window.runFunctionsExercise = () => window.functionsLesson?.runFunctionsExercise();
window.testFunctionsExercise = () => window.functionsLesson?.testFunctionsExercise();
window.clearFunctionsExercise = () => window.functionsLesson?.clearFunctionsExercise();