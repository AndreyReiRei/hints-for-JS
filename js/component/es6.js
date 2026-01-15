/**
 * Файл для Урока 9: Современный JavaScript (ES6+)
 * Содержит интерактивные демонстрации возможностей ES6+
 */

class ES6LessonManager {
	constructor() {
		this.init();
	}

	init() {
		console.log( '%c🚀 ES6+ функции загружены', 'color: #4299e1;' );
	}

	// ===== ДЕМОНСТРАЦИЯ LET И CONST =====

	runLetDemo() {
		const output = document.getElementById( 'letOutput' );
		if ( !output ) return;

		output.innerHTML = `
            <div class="console-line info">Запуск демонстрации let...</div>
            <div class="console-line">Внутри блока: x = 10</div>
            <div class="console-line">y (var) до объявления: undefined</div>
            <div class="console-line">Цикл с let: 0, 1, 2</div>
            <div class="console-line">Цикл с var: 3, 3, 3</div>
            <div class="console-line success">Демонстрация завершена</div>
        `;
	}

	runConstDemo() {
		const output = document.getElementById( 'constOutput' );
		if ( !output ) return;

		output.innerHTML = `
            <div class="console-line info">Запуск демонстрации const...</div>
            <div class="console-line">PI = 3.14159 (константа)</div>
            <div class="console-line">user.age изменен с 25 на 26</div>
            <div class="console-line">colors: ["красный", "зеленый", "синий"]</div>
            <div class="console-line">Цикл for...of: 1, 2, 3, 4, 5</div>
            <div class="console-line success">Демонстрация завершена</div>
        `;
	}

	// ===== СТРЕЛОЧНЫЕ ФУНКЦИИ =====

	runArrowBasicDemo() {
		alert( 'Стрелочные функции:\nadd(2,3)=5\naddArrow(2,3)=5\naddShort(2,3)=5\nsquare(4)=16' );
	}

	runArrowThisDemo() {
		alert( 'this в функциях:\nobj1.getValue()=10\nobj2.getValue()=undefined (проблема)\nobj3.getValue()=10 (решение)\nobj4.getValue()=undefined (не имеет своего this)' );
	}

	runArrowArrayDemo() {
		alert( 'Стрелочные функции в методах массивов:\ndoubled=[2,4,6,8,10]\nevens=[2,4]\nsum=15\nresult=36\nfirstEven=2\nhasNegative=false, allPositive=true' );
	}

	// ===== ШАБЛОННЫЕ СТРОКИ =====

	runTemplateBasicDemo() {
		const output = document.getElementById( 'templateBasicOutput' );
		if ( !output ) return;

		output.innerHTML = `
            <div class="console-line info">Базовые шаблонные строки...</div>
            <div class="console-line">Имя: Анна, возраст: 25</div>
            <div class="console-line">Сумма: 30</div>
            <div class="console-line">Максимум: 20</div>
            <div class="console-line">Сегодня: ${new Date().toLocaleDateString()}</div>
            <div class="console-line">Роль: Администратор</div>
            <div class="console-line success">Демонстрация завершена</div>
        `;
	}

	runTemplateMultilineDemo() {
		const output = document.getElementById( 'templateMultilineOutput' );
		if ( !output ) return;

		output.innerHTML = `
            <div class="console-line info">Многострочные шаблонные строки...</div>
            <div class="console-line">Первая строка<br>Вторая строка<br>Третья строка</div>
            <div class="console-line">HTML шаблон создан</div>
            <div class="console-line">SQL запрос создан</div>
            <div class="console-line">Шаблон письма создан</div>
            <div class="console-line success">Демонстрация завершена</div>
        `;
	}

	runTemplateTaggedDemo() {
		const output = document.getElementById( 'templateTaggedOutput' );
		if ( !output ) return;

		output.innerHTML = `
            <div class="console-line info">Tagged templates...</div>
            <div class="console-line">highlight: Студент &lt;mark&gt;Анна&lt;/mark&gt; получил &lt;mark&gt;95&lt;/mark&gt; баллов</div>
            <div class="console-line">safeHtml: &lt;div&gt;&amp;lt;script&amp;gt;alert("XSS")&amp;lt;/script&amp;gt;&lt;/div&gt;</div>
            <div class="console-line">currency: Цена: 1 500,00 ₽, скидка: 200,00 ₽, итого: 1 300,00 ₽</div>
            <div class="console-line">l10n: Привет Мир! добро пожаловать to our site.</div>
            <div class="console-line success">Демонстрация завершена</div>
        `;
	}

	// ===== ДЕСТРУКТУРИЗАЦИЯ =====

	runDestructuringObjectDemo() {
		alert( 'Деструктуризация объектов:\nname=Анна, age=25\nuserName=Анна, userAge=25\nphone=не указан\ncity=Москва, street=Тверская\nФункция printUser: Анна, 25 лет, город: не указан\nlogin=admin, role=administrator' );
	}

	runDestructuringArrayDemo() {
		alert( 'Деструктуризация массивов:\nfirst=красный, second=зеленый, third=синий\nprimary=красный, tertiary=синий\na=1, b=2, c=0\nhead=красный, tail=["зеленый","синий"]\nx=20, y=10\na1=1, a2=2, b1=3, b2=4\nletter1=A, letter2=B\nlatitude=10.5, longitude=55.8' );
	}

	// ===== SPREAD И REST =====

	runSpreadDemo() {
		const output = document.getElementById( 'spreadOutput' );
		if ( !output ) return;

		output.innerHTML = `
            <div class="console-line info">Spread оператор...</div>
            <div class="console-line">copy: [1, 2, 3]</div>
            <div class="console-line">merged: [1, 2, 3, 4, 5, 6]</div>
            <div class="console-line">chars: ["h","e","l","l","o"]</div>
            <div class="console-line">arrayFromSet: [1, 2, 3]</div>
            <div class="console-line">objCopy: {a: 1, b: 2}</div>
            <div class="console-line">objMerged: {a: 1, b: 2, c: 3, d: 4}</div>
            <div class="console-line">updated: {a: 1, b: 20}</div>
            <div class="console-line">result1: {x: 2, a: 1, b: 2}</div>
            <div class="console-line">Math.max: 12, Math.min: 3</div>
            <div class="console-line success">Демонстрация завершена</div>
        `;
	}

	runRestDemo() {
		const output = document.getElementById( 'restOutput' );
		if ( !output ) return;

		output.innerHTML = `
            <div class="console-line info">Rest параметры...</div>
            <div class="console-line">sum(1,2,3)=6, sum(1,2,3,4,5)=15</div>
            <div class="console-line">Привет, Анна, Петр, Мария!</div>
            <div class="console-line">first=1, second=2, others=[3,4,5]</div>
            <div class="console-line">name=Анна, age=25, otherProps={city: "Москва", email: "anna@example.com"}</div>
            <div class="console-line">devConfig создан с debug: true</div>
            <div class="console-line">processData: объект с numbers, strings, others</div>
            <div class="console-line">boundMultiply(3)=60</div>
            <div class="console-line success">Демонстрация завершена</div>
        `;
	}

	// ===== ПРАКТИЧЕСКОЕ ЗАДАНИЕ =====

	runES6Exercise() {
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

	clearES6Exercise() {
		document.getElementById( 'exerciseCode' ).value = '';
		document.getElementById( 'exerciseOutput' ).innerHTML = `
            <div class="output-placeholder">
                <i class="fas fa-terminal"></i>
                Вывод вашего кода появится здесь
            </div>
        `;
	}
}

// Инициализация
document.addEventListener( 'DOMContentLoaded', () => {
	window.es6Lesson = new ES6LessonManager();
} );

// Глобальные функции для onclick
window.runLetDemo = () => window.es6Lesson?.runLetDemo();
window.runConstDemo = () => window.es6Lesson?.runConstDemo();
window.runArrowBasicDemo = () => window.es6Lesson?.runArrowBasicDemo();
window.runArrowThisDemo = () => window.es6Lesson?.runArrowThisDemo();
window.runArrowArrayDemo = () => window.es6Lesson?.runArrowArrayDemo();
window.runTemplateBasicDemo = () => window.es6Lesson?.runTemplateBasicDemo();
window.runTemplateMultilineDemo = () => window.es6Lesson?.runTemplateMultilineDemo();
window.runTemplateTaggedDemo = () => window.es6Lesson?.runTemplateTaggedDemo();
window.runDestructuringObjectDemo = () => window.es6Lesson?.runDestructuringObjectDemo();
window.runDestructuringArrayDemo = () => window.es6Lesson?.runDestructuringArrayDemo();
window.runSpreadDemo = () => window.es6Lesson?.runSpreadDemo();
window.runRestDemo = () => window.es6Lesson?.runRestDemo();
window.runES6Exercise = () => window.es6Lesson?.runES6Exercise();
window.clearES6Exercise = () => window.es6Lesson?.clearES6Exercise();