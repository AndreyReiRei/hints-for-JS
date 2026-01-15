/**
 * Файл для Урока 5: Объекты в JavaScript
 * Содержит интерактивные демонстрации работы с объектами
 */

class ObjectsLessonManager {
	constructor() {
		this.userObject = {}; // Для интерактивного создания объектов
		this.init();
	}

	init() {
		console.log( '%c📘 Объекты в JavaScript: интерактивные демо загружены', 'color: #4299e1;' );
		this.userObject = {}; // Инициализируем пустой объект
	}

	// ===== ДЕМОНСТРАЦИЯ СОЗДАНИЯ ОБЪЕКТОВ =====

	runLiteralDemo() {
		const output = document.getElementById( 'literalOutput' );
		if ( !output ) return;

		output.innerHTML = `
            <div class="console-line info">Запуск демонстрации литералов объектов...</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] user.name = "Анна"</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] user.address.city = "Москва"</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] user.hobbies[0] = "чтение"</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] ${car.brand} ${car.model} = "Toyota Camry"</div>
            <div class="console-line success">[${new Date().toLocaleTimeString()}] Демонстрация завершена</div>
        `;
	}

	runConstructorDemo() {
		const output = document.getElementById( 'constructorOutput' );
		if ( !output ) return;

		output.innerHTML = `
            <div class="console-line info">Запуск демонстрации new Object()...</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] person.getFullName() = "Иван Петров"</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] person.age = 30</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] config.apiUrl = "https://api.example.com"</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] config.timeout = 5000</div>
            <div class="console-line success">[${new Date().toLocaleTimeString()}] Демонстрация завершена</div>
        `;
	}

	runFunctionDemo() {
		const output = document.getElementById( 'functionOutput' );
		if ( !output ) return;

		output.innerHTML = `
            <div class="console-line info">Запуск демонстрации конструкторных функций...</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] laptop.name = "Ноутбук"</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] phone.getPriceWithTax() = 36000</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] book.category = "книги"</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] laptop instanceof Product = true</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] laptop.getInfo() = "Ноутбук - 50000 руб. (электроника)"</div>
            <div class="console-line success">[${new Date().toLocaleTimeString()}] Демонстрация завершена</div>
        `;
	}

	runClassDemo() {
		const output = document.getElementById( 'classOutput' );
		if ( !output ) return;

		const currentYear = new Date().getFullYear();

		output.innerHTML = `
            <div class="console-line info">Запуск демонстрации классов...</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] user1.getInfo() = "Анна (anna@example.com), 25 лет"</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] user1.isAdult() = true</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] user2.isAdult() = false</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] user1.birthYear = ${currentYear - 25}</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] user1.age = 29</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] admin.getInfo() = "Администратор (admin@example.com), 30 лет"</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] premium.getInfo() = "Мария (maria@example.com), 28 лет [Gold]"</div>
            <div class="console-line success">[${new Date().toLocaleTimeString()}] Демонстрация завершена</div>
        `;
	}

	// ===== ИНТЕРАКТИВНОЕ СОЗДАНИЕ ОБЪЕКТА =====

	addProperty() {
		const keyInput = document.getElementById( 'objKey' );
		const valueInput = document.getElementById( 'objValue' );
		const objectCode = document.getElementById( 'objectCode' );

		if ( !keyInput || !valueInput || !objectCode ) return;

		const key = keyInput.value.trim();
		const value = valueInput.value.trim();

		if ( !key || !value ) {
			alert( 'Пожалуйста, заполните оба поля' );
			return;
		}

		// Проверяем, является ли значение числом
		const numValue = Number( value );
		const isNumber = !isNaN( numValue ) && value !== '';

		// Добавляем свойство в объект
		if ( isNumber ) {
			this.userObject[key] = numValue;
		} else if ( value.toLowerCase() === 'true' ) {
			this.userObject[key] = true;
		} else if ( value.toLowerCase() === 'false' ) {
			this.userObject[key] = false;
		} else if ( value.toLowerCase() === 'null' ) {
			this.userObject[key] = null;
		} else if ( value.toLowerCase() === 'undefined' ) {
			this.userObject[key] = undefined;
		} else {
			this.userObject[key] = value;
		}

		// Обновляем отображение кода
		this.updateObjectDisplay();

		// Очищаем поля ввода
		keyInput.value = '';
		valueInput.value = '';
		keyInput.focus();
	}

	clearObject() {
		this.userObject = {};
		this.updateObjectDisplay();

		const output = document.getElementById( 'objectOutput' );
		if ( output ) {
			output.innerHTML = `
                <div class="console-line info">Объект очищен. Добавьте новые свойства</div>
            `;
		}
	}

	updateObjectDisplay() {
		const objectCode = document.getElementById( 'objectCode' );
		if ( !objectCode ) return;

		const properties = Object.entries( this.userObject )
			.map( ( [key, value] ) => {
				if ( typeof value === 'string' ) {
					return `    ${key}: "${value}"`;
				} else if ( typeof value === 'boolean' ) {
					return `    ${key}: ${value}`;
				} else if ( value === null ) {
					return `    ${key}: null`;
				} else if ( value === undefined ) {
					return `    ${key}: undefined`;
				} else {
					return `    ${key}: ${value}`;
				}
			} )
			.join( ',\n' );

		objectCode.textContent = `const myObject = {\n${properties}\n};`;
	}

	runObjectCode() {
		const output = document.getElementById( 'objectOutput' );
		if ( !output ) return;

		if ( Object.keys( this.userObject ).length === 0 ) {
			output.innerHTML = `
                <div class="console-line warning">Объект пуст. Добавьте свойства перед выполнением</div>
            `;
			return;
		}

		let outputLines = [
			`<div class="console-line info">Выполнение кода объекта...</div>`
		];

		// Перебираем свойства объекта
		for ( const [key, value] of Object.entries( this.userObject ) ) {
			const type = typeof value;
			const typeColor = this.getTypeColor( type );
			outputLines.push(
				`<div class="console-line">` +
				`[${new Date().toLocaleTimeString()}] myObject.${key} = ` +
				`<span style="color: ${typeColor}">${JSON.stringify( value )}</span> ` +
				`<span class="type-tag">(${type})</span>` +
				`</div>`
			);
		}

		// Методы объекта (если есть)
		const entries = Object.entries( this.userObject );
		outputLines.push(
			`<div class="console-line info">[${new Date().toLocaleTimeString()}] Методы объекта:</div>`
		);
		outputLines.push(
			`<div class="console-line">` +
			`[${new Date().toLocaleTimeString()}] Object.keys(myObject) = ` +
			`<span style="color: #68d391">${JSON.stringify( Object.keys( this.userObject ) )}</span>` +
			`</div>`
		);
		outputLines.push(
			`<div class="console-line">` +
			`[${new Date().toLocaleTimeString()}] Object.values(myObject) = ` +
			`<span style="color: #68d391">${JSON.stringify( Object.values( this.userObject ) )}</span>` +
			`</div>`
		);
		outputLines.push(
			`<div class="console-line">` +
			`[${new Date().toLocaleTimeString()}] Object.entries(myObject).length = ` +
			`<span style="color: #68d391">${entries.length}</span>` +
			`</div>`
		);

		outputLines.push(
			`<div class="console-line success">[${new Date().toLocaleTimeString()}] Код выполнен успешно!</div>`
		);

		output.innerHTML = outputLines.join( '' );
	}

	getTypeColor( type ) {
		switch ( type ) {
			case 'string': return '#68d391';
			case 'number': return '#63b3ed';
			case 'boolean': return '#f6ad55';
			case 'object': return '#d6bcfa';
			default: return '#a0aec0';
		}
	}

	// ===== ДЕМОНСТРАЦИЯ ДОСТУПА К СВОЙСТВАМ =====

	runDotNotationDemo() {
		const output = document.getElementById( 'dotOutput' );
		if ( !output ) return;

		output.innerHTML = `
            <div class="console-line info">Запуск демонстрации точечной нотации...</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] book.title = "JavaScript для начинающих"</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] book.author = "Иван Иванов"</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] book.year = 2023</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] book.publisher.name = "Издательский дом"</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] book.publisher.city = "Москва"</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] book.isbn = undefined</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] book.publisher?.country = undefined</div>
            <div class="console-line success">[${new Date().toLocaleTimeString()}] Демонстрация завершена</div>
        `;
	}

	runBracketNotationDemo() {
		const output = document.getElementById( 'bracketOutput' );
		if ( !output ) return;

		output.innerHTML = `
            <div class="console-line info">Запуск демонстрации скобочной нотации...</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] product["price-in-rubles"] = 29999</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] product["in stock"] = true</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] product["category-id"] = "PH001"</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] product.specs["screen-size"] = "6.5"</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] product["specs"]["battery-capacity"] = "5000mAh"</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] user["user_id"] = 123</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] user["user_name"] = "Анна"</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] obj[[1, 2, 3]] = "Массив как ключ"</div>
            <div class="console-line success">[${new Date().toLocaleTimeString()}] Демонстрация завершена</div>
        `;
	}

	runDynamicAccessDemo() {
		const output = document.getElementById( 'dynamicOutput' );
		if ( !output ) return;

		output.innerHTML = `
            <div class="console-line info">Запуск демонстрации динамического доступа...</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] employee[propertyName] = "Алексей"</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] getProperty(employee, "position") = "Разработчик"</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] getProperty(employee, "salary") = 120000</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] findKeyByValue(employee, "Разработчик") = "position"</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] config.theme = "dark"</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] config.language = "ru"</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] config.notifications = true</div>
            <div class="console-line success">[${new Date().toLocaleTimeString()}] Демонстрация завершена</div>
        `;
	}

	runModifyDemo() {
		const output = document.getElementById( 'modifyOutput' );
		if ( !output ) return;

		output.innerHTML = `
            <div class="console-line info">Запуск демонстрации изменения объектов...</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] После добавления: {brand: "Toyota", model: "Corolla", year: 2022, color: "серебристый", "engine-type": "гибрид", features: ["кондиционер", "навигация", "камера"]}</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] После изменения: {brand: "Toyota", model: "Corolla", year: 2023, color: "черный", "engine-type": "электрический", features: ["кондиционер", "навигация", "камера"]}</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] После удаления: {brand: "Toyota", model: "Corolla", year: 2023, color: "черный"}</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] "brand" in car = true</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] "features" in car = false</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] car.hasOwnProperty("model") = true</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] car.hasOwnProperty("vin") = false</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Объект заморожен: true</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] JSON строка создана</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Парсинг обратно успешен</div>
            <div class="console-line success">[${new Date().toLocaleTimeString()}] Демонстрация завершена</div>
        `;
	}

	// ===== ДЕМОНСТРАЦИЯ МЕТОДОВ ОБЪЕКТОВ =====

	runMethodsDemo1() {
		alert( 'Результат: 8 (calculator.add(5, 3))\n20 (calculator.calculate("*", 4, 5))' );
	}

	runMethodsDemo2() {
		alert( 'Результат:\n"Меня зовут Мария, мне 28 лет"\n"С днем рождения! Теперь Мария 29 лет"\n"Мария переехал(а) из Москва в Санкт-Петербург"\n"Привет от Мария"' );
	}

	runMethodsDemo3() {
		alert( 'Результат:\n"Иван Петров"\n"Анна"\n"Иванова"\n25\ntrue\n"Возраст не может быть отрицательным"\n"Слишком большой возраст"' );
	}

	// ===== ИССЛЕДОВАНИЕ ОБЪЕКТОВ =====

	exploreWithForIn() {
		const output = document.getElementById( 'explorerOutput' );
		if ( !output ) return;

		const employee = {
			name: "Алексей",
			position: "Разработчик",
			salary: 100000,
			department: "IT",
			skills: ["JavaScript", "React", "Node.js"],
			address: {
				city: "Москва",
				street: "Тверская"
			}
		};

		let result = '<div class="console-line info">for...in перебор:</div>';

		for ( let key in employee ) {
			if ( employee.hasOwnProperty( key ) ) {
				const value = employee[key];
				const type = typeof value;
				const typeColor = this.getTypeColor( type );

				result += `
                    <div class="console-line">
                        [${new Date().toLocaleTimeString()}] ${key}: 
                        <span style="color: ${typeColor}">${JSON.stringify( value )}</span>
                        <span class="type-tag">(${type})</span>
                    </div>
                `;
			}
		}

		output.innerHTML = result;
	}

	exploreWithObjectKeys() {
		const output = document.getElementById( 'explorerOutput' );
		if ( !output ) return;

		const employee = {
			name: "Алексей",
			position: "Разработчик",
			salary: 100000,
			department: "IT",
			skills: ["JavaScript", "React", "Node.js"],
			address: {
				city: "Москва",
				street: "Тверская"
			}
		};

		const keys = Object.keys( employee );

		output.innerHTML = `
            <div class="console-line info">Object.keys() результат:</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Ключи: <span style="color: #68d391">${JSON.stringify( keys )}</span></div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Количество свойств: <span style="color: #63b3ed">${keys.length}</span></div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Содержит 'name': <span style="color: #f6ad55">${keys.includes( 'name' )}</span></div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Содержит 'email': <span style="color: #f6ad55">${keys.includes( 'email' )}</span></div>
        `;
	}

	exploreWithObjectValues() {
		const output = document.getElementById( 'explorerOutput' );
		if ( !output ) return;

		const employee = {
			name: "Алексей",
			position: "Разработчик",
			salary: 100000,
			department: "IT",
			skills: ["JavaScript", "React", "Node.js"],
			address: {
				city: "Москва",
				street: "Тверская"
			}
		};

		const values = Object.values( employee );

		output.innerHTML = `
            <div class="console-line info">Object.values() результат:</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Значения: <span style="color: #68d391">${JSON.stringify( values, null, 2 )}</span></div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Типы значений:</div>
            ${values.map( ( value, index ) => {
			const type = typeof value;
			const typeColor = this.getTypeColor( type );
			return `
                    <div class="console-line">
                        [${new Date().toLocaleTimeString()}] ${Object.keys( employee )[index]}: 
                        <span style="color: ${typeColor}">${type}</span>
                    </div>
                `;
		} ).join( '' )}
        `;
	}

	exploreWithObjectEntries() {
		const output = document.getElementById( 'explorerOutput' );
		if ( !output ) return;

		const employee = {
			name: "Алексей",
			position: "Разработчик",
			salary: 100000,
			department: "IT",
			skills: ["JavaScript", "React", "Node.js"],
			address: {
				city: "Москва",
				street: "Тверская"
			}
		};

		const entries = Object.entries( employee );

		output.innerHTML = `
            <div class="console-line info">Object.entries() результат:</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Всего пар: <span style="color: #63b3ed">${entries.length}</span></div>
            ${entries.map( ( [key, value], index ) => {
			const type = typeof value;
			const typeColor = this.getTypeColor( type );
			return `
                    <div class="console-line">
                        [${new Date().toLocaleTimeString()}] [${index}] ${key}: 
                        <span style="color: ${typeColor}">${JSON.stringify( value )}</span>
                    </div>
                `;
		} ).join( '' )}
        `;
	}

	// ===== ПРАКТИЧЕСКОЕ ЗАДАНИЕ =====

	runObjectsExercise() {
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

			eval( code );

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

	testObjectsExercise() {
		const code = document.getElementById( 'exerciseCode' ).value;
		const output = document.getElementById( 'exerciseOutput' );

		if ( !output ) return;

		try {
			const testResults = [];

			eval( code );

			// Проверяем наличие класса Book
			if ( typeof Book === 'function' ) {
				const book = new Book( "Тестовая книга", "Тестовый автор", 2023, 300 );

				// Проверяем свойства
				if ( book.title === "Тестовая книга" ) {
					testResults.push( {
						name: 'Book создается корректно',
						passed: true
					} );
				}

				// Проверяем метод getInfo
				if ( typeof book.getInfo === 'function' ) {
					const info = book.getInfo();
					if ( typeof info === 'string' && info.includes( "Тестовая книга" ) ) {
						testResults.push( {
							name: 'getInfo() работает',
							passed: true
						} );
					}
				}

				// Проверяем isAvailable
				if ( book.isAvailable === true ) {
					testResults.push( {
						name: 'isAvailable по умолчанию true',
						passed: true
					} );
				}
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
                            <p>Класс Book не найден. Убедитесь, что класс определен правильно.</p>
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

	clearObjectsExercise() {
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
	window.objectsLesson = new ObjectsLessonManager();
} );

// Глобальные функции для HTML атрибутов onclick
window.runLiteralDemo = () => window.objectsLesson?.runLiteralDemo();
window.runConstructorDemo = () => window.objectsLesson?.runConstructorDemo();
window.runFunctionDemo = () => window.objectsLesson?.runFunctionDemo();
window.runClassDemo = () => window.objectsLesson?.runClassDemo();
window.addProperty = () => window.objectsLesson?.addProperty();
window.clearObject = () => window.objectsLesson?.clearObject();
window.runObjectCode = () => window.objectsLesson?.runObjectCode();
window.runDotNotationDemo = () => window.objectsLesson?.runDotNotationDemo();
window.runBracketNotationDemo = () => window.objectsLesson?.runBracketNotationDemo();
window.runDynamicAccessDemo = () => window.objectsLesson?.runDynamicAccessDemo();
window.runModifyDemo = () => window.objectsLesson?.runModifyDemo();
window.runMethodsDemo1 = () => window.objectsLesson?.runMethodsDemo1();
window.runMethodsDemo2 = () => window.objectsLesson?.runMethodsDemo2();
window.runMethodsDemo3 = () => window.objectsLesson?.runMethodsDemo3();
window.exploreWithForIn = () => window.objectsLesson?.exploreWithForIn();
window.exploreWithObjectKeys = () => window.objectsLesson?.exploreWithObjectKeys();
window.exploreWithObjectValues = () => window.objectsLesson?.exploreWithObjectValues();
window.exploreWithObjectEntries = () => window.objectsLesson?.exploreWithObjectEntries();
window.runObjectsExercise = () => window.objectsLesson?.runObjectsExercise();
window.testObjectsExercise = () => window.objectsLesson?.testObjectsExercise();
window.clearObjectsExercise = () => window.objectsLesson?.clearObjectsExercise();