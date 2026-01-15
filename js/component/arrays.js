/**
 * Файл для Урока 6: Массивы в JavaScript
 * Содержит интерактивные демонстрации работы с массивами
 */

class ArraysLessonManager {
	constructor() {
		this.userArray = []; // Для интерактивного создания массивов
		this.init();
	}

	init() {
		console.log( '%c📘 Массивы в JavaScript: интерактивные демо загружены', 'color: #4299e1;' );
		this.userArray = []; // Инициализируем пустой массив
		this.updateArrayDisplay();
	}

	// ===== ДЕМОНСТРАЦИЯ СОЗДАНИЯ МАССИВОВ =====

	runLiteralDemo() {
		const output = document.getElementById( 'literalOutput' );
		if ( !output ) return;

		output.innerHTML = `
            <div class="console-line info">Запуск демонстрации литералов массивов...</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] fruits[0] = "яблоко"</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] fruits[1] = "банан"</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] fruits.length = 3</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] fruits[2] = "мандарин"</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] sparseArray[5] = "шестой"</div>
            <div class="console-line success">[${new Date().toLocaleTimeString()}] Демонстрация завершена</div>
        `;
	}

	runConstructorDemo() {
		const output = document.getElementById( 'constructorOutput' );
		if ( !output ) return;

		output.innerHTML = `
            <div class="console-line info">Запуск демонстрации new Array()...</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] colors = ["красный", "зеленый", "синий"]</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] emptyArray.length = 5</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] filled array = [0, 0, 0, 0, 0]</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] sequence = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]</div>
            <div class="console-line success">[${new Date().toLocaleTimeString()}] Демонстрация завершена</div>
        `;
	}

	runFromDemo() {
		const output = document.getElementById( 'fromOutput' );
		if ( !output ) return;

		output.innerHTML = `
            <div class="console-line info">Запуск демонстрации Array.from()...</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] fromString = ['J', 'a', 'v', 'a', 'S', 'c', 'r', 'i', 'p', 't']</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] fromSet = [1, 2, 3]</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] fromArrayLike = ['первый', 'второй', 'третий']</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] numbers = [0, 2, 4, 6, 8]</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] range(5, 25, 5) = [5, 10, 15, 20]</div>
            <div class="console-line success">[${new Date().toLocaleTimeString()}] Демонстрация завершена</div>
        `;
	}

	runOfDemo() {
		const output = document.getElementById( 'ofOutput' );
		if ( !output ) return;

		output.innerHTML = `
            <div class="console-line info">Запуск демонстрации Array.of()...</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] array1 = [1, 2, 3]</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] withNewArray(3) = [empty × 3]</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] withArrayOf(3) = [3]</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] fromVariables = [10, 20, 30]</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] sumAll(1, 2, 3, 4, 5) = 15</div>
            <div class="console-line success">[${new Date().toLocaleTimeString()}] Демонстрация завершена</div>
        `;
	}

	// ===== ИНТЕРАКТИВНОЕ СОЗДАНИЕ МАССИВА =====

	addArrayElement() {
		const valueInput = document.getElementById( 'arrayValue' );
		if ( !valueInput ) return;

		const value = valueInput.value.trim();
		if ( !value ) {
			alert( 'Пожалуйста, введите значение' );
			return;
		}

		// Пытаемся определить тип значения
		const numValue = Number( value );
		let processedValue;

		if ( !isNaN( numValue ) && value !== '' ) {
			processedValue = numValue;
		} else if ( value.toLowerCase() === 'true' ) {
			processedValue = true;
		} else if ( value.toLowerCase() === 'false' ) {
			processedValue = false;
		} else if ( value.toLowerCase() === 'null' ) {
			processedValue = null;
		} else if ( value.toLowerCase() === 'undefined' ) {
			processedValue = undefined;
		} else if ( value.startsWith( '[' ) && value.endsWith( ']' ) ) {
			try {
				processedValue = JSON.parse( value );
			} catch {
				processedValue = value;
			}
		} else if ( value.startsWith( '{' ) && value.endsWith( '}' ) ) {
			try {
				processedValue = JSON.parse( value );
			} catch {
				processedValue = value;
			}
		} else {
			processedValue = value;
		}

		// Добавляем элемент в массив
		this.userArray.push( processedValue );
		this.updateArrayDisplay();

		// Очищаем поле ввода
		valueInput.value = '';
		valueInput.focus();
	}

	generateRandomArray() {
		const types = ['number', 'string', 'boolean', 'array', 'object', 'null'];
		const randomCount = Math.floor( Math.random() * 5 ) + 3; // 3-7 элементов

		this.userArray = [];

		for ( let i = 0; i < randomCount; i++ ) {
			const type = types[Math.floor( Math.random() * types.length )];
			let value;

			switch ( type ) {
				case 'number':
					value = Math.floor( Math.random() * 100 );
					break;
				case 'string':
					const words = ['яблоко', 'банан', 'апельсин', 'виноград', 'клубника'];
					value = words[Math.floor( Math.random() * words.length )];
					break;
				case 'boolean':
					value = Math.random() > 0.5;
					break;
				case 'array':
					value = [Math.floor( Math.random() * 10 ), Math.floor( Math.random() * 10 )];
					break;
				case 'object':
					value = { id: i, random: Math.random() };
					break;
				case 'null':
					value = null;
					break;
			}

			this.userArray.push( value );
		}

		this.updateArrayDisplay();

		const output = document.getElementById( 'arrayOutput' );
		if ( output ) {
			output.innerHTML = `
                <div class="console-line success">Случайный массив из ${randomCount} элементов создан</div>
            `;
		}
	}

	clearArray() {
		this.userArray = [];
		this.updateArrayDisplay();

		const output = document.getElementById( 'arrayOutput' );
		if ( output ) {
			output.innerHTML = `
                <div class="console-line info">Массив очищен. Добавьте новые элементы</div>
            `;
		}
	}

	updateArrayDisplay() {
		const arrayCode = document.getElementById( 'arrayCode' );
		const arrayLength = document.getElementById( 'arrayLength' );
		const arrayTypes = document.getElementById( 'arrayTypes' );

		if ( !arrayCode || !arrayLength || !arrayTypes ) return;

		// Обновляем отображение кода
		const formattedArray = this.userArray.map( item => {
			if ( typeof item === 'string' ) {
				return `"${item}"`;
			} else if ( typeof item === 'boolean' ) {
				return item;
			} else if ( item === null ) {
				return 'null';
			} else if ( item === undefined ) {
				return 'undefined';
			} else if ( Array.isArray( item ) ) {
				return JSON.stringify( item );
			} else if ( typeof item === 'object' ) {
				return JSON.stringify( item );
			}
			return item;
		} ).join( ', ' );

		arrayCode.textContent = `const myArray = [${formattedArray}];`;

		// Обновляем информацию о массиве
		arrayLength.textContent = this.userArray.length;

		// Подсчитываем типы элементов
		const typeCounts = {};
		this.userArray.forEach( item => {
			const type = Array.isArray( item ) ? 'array' :
				item === null ? 'null' :
					typeof item;
			typeCounts[type] = ( typeCounts[type] || 0 ) + 1;
		} );

		const typeStrings = Object.entries( typeCounts )
			.map( ( [type, count] ) => `${type}: ${count}` )
			.join( ', ' );

		arrayTypes.textContent = typeStrings || 'нет элементов';
	}

	runArrayCode() {
		const output = document.getElementById( 'arrayOutput' );
		if ( !output ) return;

		if ( this.userArray.length === 0 ) {
			output.innerHTML = `
                <div class="console-line warning">Массив пуст. Добавьте элементы перед выполнением</div>
            `;
			return;
		}

		let outputLines = [
			`<div class="console-line info">Выполнение кода массива...</div>`
		];

		// Выводим каждый элемент с его типом
		this.userArray.forEach( ( item, index ) => {
			const type = Array.isArray( item ) ? 'array' :
				item === null ? 'null' :
					typeof item;
			const typeColor = this.getTypeColor( type );

			outputLines.push(
				`<div class="console-line">` +
				`[${new Date().toLocaleTimeString()}] myArray[${index}] = ` +
				`<span style="color: ${typeColor}">${JSON.stringify( item )}</span> ` +
				`<span class="type-tag">(${type})</span>` +
				`</div>`
			);
		} );

		// Выводим информацию о массиве
		outputLines.push(
			`<div class="console-line info">[${new Date().toLocaleTimeString()}] Информация о массиве:</div>`
		);
		outputLines.push(
			`<div class="console-line">` +
			`[${new Date().toLocaleTimeString()}] Длина: ` +
			`<span style="color: #63b3ed">${this.userArray.length}</span>` +
			`</div>`
		);

		const hasObjects = this.userArray.some( item => typeof item === 'object' && !Array.isArray( item ) && item !== null );
		const hasArrays = this.userArray.some( Array.isArray );
		const hasNull = this.userArray.includes( null );

		outputLines.push(
			`<div class="console-line">` +
			`[${new Date().toLocaleTimeString()}] Содержит объекты: ` +
			`<span style="color: ${hasObjects ? '#68d391' : '#f56565'}">${hasObjects}</span>` +
			`</div>`
		);
		outputLines.push(
			`<div class="console-line">` +
			`[${new Date().toLocaleTimeString()}] Содержит массивы: ` +
			`<span style="color: ${hasArrays ? '#68d391' : '#f56565'}">${hasArrays}</span>` +
			`</div>`
		);
		outputLines.push(
			`<div class="console-line">` +
			`[${new Date().toLocaleTimeString()}] Содержит null: ` +
			`<span style="color: ${hasNull ? '#68d391' : '#f56565'}">${hasNull}</span>` +
			`</div>`
		);

		outputLines.push(
			`<div class="console-line success">[${new Date().toLocaleTimeString()}] Код выполнен успешно!</div>`
		);

		output.innerHTML = outputLines.join( '' );
	}

	testArrayMethods() {
		const output = document.getElementById( 'arrayOutput' );
		if ( !output ) return;

		if ( this.userArray.length === 0 ) {
			output.innerHTML = `
                <div class="console-line warning">Массив пуст. Добавьте элементы для тестирования</div>
            `;
			return;
		}

		let outputLines = [
			`<div class="console-line info">Тестирование методов массива...</div>`
		];

		// Тест map()
		try {
			const mapped = this.userArray.map( item => {
				if ( typeof item === 'number' ) return item * 2;
				if ( typeof item === 'string' ) return item.toUpperCase();
				return item;
			} );
			outputLines.push(
				`<div class="console-line">` +
				`[${new Date().toLocaleTimeString()}] map(): ` +
				`<span style="color: #68d391">${JSON.stringify( mapped )}</span>` +
				`</div>`
			);
		} catch ( e ) {
			outputLines.push(
				`<div class="console-line error">[${new Date().toLocaleTimeString()}] map() ошибка: ${e.message}</div>`
			);
		}

		// Тест filter()
		try {
			const filtered = this.userArray.filter( item => {
				if ( typeof item === 'number' ) return item > 10;
				if ( typeof item === 'string' ) return item.length > 3;
				return true;
			} );
			outputLines.push(
				`<div class="console-line">` +
				`[${new Date().toLocaleTimeString()}] filter(): ` +
				`<span style="color: #68d391">${JSON.stringify( filtered )}</span>` +
				`</div>`
			);
		} catch ( e ) {
			outputLines.push(
				`<div class="console-line error">[${new Date().toLocaleTimeString()}] filter() ошибка: ${e.message}</div>`
			);
		}

		// Тест reduce()
		try {
			const numbersOnly = this.userArray.filter( item => typeof item === 'number' );
			if ( numbersOnly.length > 0 ) {
				const sum = numbersOnly.reduce( ( acc, curr ) => acc + curr, 0 );
				outputLines.push(
					`<div class="console-line">` +
					`[${new Date().toLocaleTimeString()}] reduce() (сумма чисел): ` +
					`<span style="color: #68d391">${sum}</span>` +
					`</div>`
				);
			}
		} catch ( e ) {
			outputLines.push(
				`<div class="console-line error">[${new Date().toLocaleTimeString()}] reduce() ошибка: ${e.message}</div>`
			);
		}

		// Тест forEach()
		try {
			let count = 0;
			this.userArray.forEach( ( item, index ) => {
				if ( typeof item === 'string' || typeof item === 'number' ) count++;
			} );
			outputLines.push(
				`<div class="console-line">` +
				`[${new Date().toLocaleTimeString()}] forEach() (строк/чисел): ` +
				`<span style="color: #68d391">${count}</span>` +
				`</div>`
			);
		} catch ( e ) {
			outputLines.push(
				`<div class="console-line error">[${new Date().toLocaleTimeString()}] forEach() ошибка: ${e.message}</div>`
			);
		}

		// Тест includes()
		try {
			const hasString = this.userArray.some( item => typeof item === 'string' );
			const hasNumber = this.userArray.some( item => typeof item === 'number' );

			outputLines.push(
				`<div class="console-line">` +
				`[${new Date().toLocaleTimeString()}] includes строки: ` +
				`<span style="color: ${hasString ? '#68d391' : '#f56565'}">${hasString}</span>` +
				`</div>`
			);
			outputLines.push(
				`<div class="console-line">` +
				`[${new Date().toLocaleTimeString()}] includes числа: ` +
				`<span style="color: ${hasNumber ? '#68d391' : '#f56565'}">${hasNumber}</span>` +
				`</div>`
			);
		} catch ( e ) {
			outputLines.push(
				`<div class="console-line error">[${new Date().toLocaleTimeString()}] includes() ошибка: ${e.message}</div>`
			);
		}

		outputLines.push(
			`<div class="console-line success">[${new Date().toLocaleTimeString()}] Тестирование завершено!</div>`
		);

		output.innerHTML = outputLines.join( '' );
	}

	getTypeColor( type ) {
		switch ( type ) {
			case 'string': return '#68d391';
			case 'number': return '#63b3ed';
			case 'boolean': return '#f6ad55';
			case 'object': return '#d6bcfa';
			case 'array': return '#f687b3';
			case 'null': return '#a0aec0';
			case 'undefined': return '#718096';
			default: return '#a0aec0';
		}
	}

	// ===== ДЕМОНСТРАЦИЯ ОПЕРАЦИЙ С МАССИВАМИ =====

	runAddDemo() {
		const output = document.getElementById( 'addOutput' );
		if ( !output ) return;

		output.innerHTML = `
            <div class="console-line info">Запуск демонстрации добавления элементов...</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] После push(4): [1, 2, 3, 4]</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] После unshift(0): [0, 1, 2, 3, 4, 5, 6]</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] arr1.concat(arr2): [1, 2, 3, 4, 5, 6]</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] После arr[5] = 6: [1, 2, 3, empty × 2, 6]</div>
            <div class="console-line success">[${new Date().toLocaleTimeString()}] Демонстрация завершена</div>
        `;
	}

	runRemoveDemo() {
		const output = document.getElementById( 'removeOutput' );
		if ( !output ) return;

		output.innerHTML = `
            <div class="console-line info">Запуск демонстрации удаления элементов...</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] После pop(): [1, 2, 3, 4]</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] После shift(): [2, 3, 4]</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] После splice(1, 2): [10, 40, 50]</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] После delete arr[2]: [1, 2, empty, 4, 5]</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Только четные (filter): [2, 4, 6]</div>
            <div class="console-line success">[${new Date().toLocaleTimeString()}] Демонстрация завершена</div>
        `;
	}

	runModifyDemo() {
		const output = document.getElementById( 'modifyOutput' );
		if ( !output ) return;

		output.innerHTML = `
            <div class="console-line info">Запуск демонстрации изменения элементов...</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] После arr[2] = 30: [1, 2, 30, 4, 5]</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] После splice(1, 2, 25, 35): [10, 25, 35, 40, 50]</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] new Array(5).fill(0): [0, 0, 0, 0, 0]</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] После reverse(): [5, 4, 3, 2, 1]</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] arr.map(x => x * 2): [2, 4, 60, 8, 10]</div>
            <div class="console-line success">[${new Date().toLocaleTimeString()}] Демонстрация завершена</div>
        `;
	}

	runSearchDemo() {
		const output = document.getElementById( 'searchOutput' );
		if ( !output ) return;

		output.innerHTML = `
            <div class="console-line info">Запуск демонстрации поиска элементов...</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] arr.indexOf(30): 2</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] arr.includes(20): true</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] arr.find(x => x > 25): 30</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] [1, 2, -3, 4, 5].some(x => x < 0): true</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] [1, 2, 3, 4, 5].every(x => x > 0): true</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] linearSearch([1, 2, 3, 4, 5], 3): 2</div>
            <div class="console-line success">[${new Date().toLocaleTimeString()}] Демонстрация завершена</div>
        `;
	}

	// ===== ДЕМОНСТРАЦИЯ МЕТОДОВ ПЕРЕБОРА =====

	runForLoopDemo() {
		alert( 'Результаты цикла for:\narr[0] = 10\narr[1] = 20\narr[2] = 30\narr[3] = 40\narr[4] = 50\n\nЦикл for...of:\n10\n20\n30\n40\n50' );
	}

	runForEachDemo() {
		alert( 'Результат forEach():\nСумма чисел [1, 2, 3, 4, 5] = 15\n\nПользователи:\n1. Анна: активен\n2. Петр: неактивен' );
	}

	runMapDemo() {
		alert( 'Результат map():\n[1, 2, 3, 4, 5] → [2, 4, 6, 8, 10]\n[1, 2, 3, 4, 5] → [1, 4, 9, 16, 25]\nПользователи → ["Анна Иванова", "Петр Петров"]' );
	}

	runFilterDemo() {
		alert( 'Результат filter():\n[1..10] → четные: [2, 4, 6, 8, 10]\n[1..10] → >5: [6, 7, 8, 9, 10]\nТовары → только доступные: [{name: "Яблоки"...}, {name: "Апельсины"...}]' );
	}

	// ===== ДЕМОНСТРАЦИЯ МЕТОДОВ ПРЕОБРАЗОВАНИЯ =====

	runReduceDemo() {
		alert( 'Результат reduce():\nСумма [1, 2, 3, 4, 5] = 15\nПроизведение = 120\nМаксимум = 5\nЧастота фруктов: {яблоко: 3, банан: 2, апельсин: 1}\nreduceRight для reverse: [5, 4, 3, 2, 1]' );
	}

	runSortDemo() {
		alert( 'Результат sort():\nПо возрастанию: [1, 5, 10, 25, 40, 100]\nПо убыванию: [100, 40, 25, 10, 5, 1]\nСтроки: ["Апельсин", "арбуз", "банан", "яблоко"]\nМногоуровневая: сначала по оценке, потом по возрасту' );
	}

	// ===== ПРОДВИНУТЫЕ ТЕХНИКИ =====

	runMultidimensionalDemo() {
		const output = document.getElementById( 'multidimensionalOutput' );
		if ( !output ) return;

		output.innerHTML = `
            <div class="console-line info">Запуск демонстрации многомерных массивов...</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] matrix[0] = [1, 2, 3]</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] matrix[1][1] = 5</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Шахматная доска 8x8 создана</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] cube[0][0][0] = 1</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Средняя оценка всех студентов: 88.75</div>
            <div class="console-line success">[${new Date().toLocaleTimeString()}] Демонстрация завершена</div>
        `;
	}

	runFlatDemo() {
		const output = document.getElementById( 'flatOutput' );
		if ( !output ) return;

		output.innerHTML = `
            <div class="console-line info">Запуск демонстрации flat() и flatMap()...</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] flat() на 1 уровень: [1, 2, 3, 4, 5, [6, 7]]</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] flat(2) на 2 уровня: [1, 2, 3, 4, 5, 6, 7]</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] flatMap(x => [x, x * x]): [1, 1, 2, 4, 3, 9, 4, 16]</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Все слова: ["Привет", "мир", "Массивы", "это", "круто"]</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Удаление дырок: [1, 3, 5]</div>
            <div class="console-line success">[${new Date().toLocaleTimeString()}] Демонстрация завершена</div>
        `;
	}

	runSpreadDemo() {
		const output = document.getElementById( 'spreadOutput' );
		if ( !output ) return;

		output.innerHTML = `
            <div class="console-line info">Запуск демонстрации spread оператора...</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Копия arr1: [1, 2, 3]</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Объединенный: [1, 2, 3, 4, 5, 6]</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Максимум: 12, Минимум: 3</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] sumAll(1, 2, 3, 4, 5): 15</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Деструктуризация: first=1, second=2, rest=[3, 4, 5]</div>
            <div class="console-line success">[${new Date().toLocaleTimeString()}] Демонстрация завершена</div>
        `;
	}

	runDestructuringDemo() {
		const output = document.getElementById( 'destructuringOutput' );
		if ( !output ) return;

		output.innerHTML = `
            <div class="console-line info">Запуск демонстрации деструктуризации...</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] firstColor: "красный"</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Значения по умолчанию: primary: "красный", secondary: "белый"</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Rest в деструктуризации: firstNum: 1, secondNum: 2, otherNums: [3, 4, 5]</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Обмен переменных: a: 20, b: 10</div>
            <div class="console-line">[${new Date().toLocaleTimeString()}] Деструктуризация матрицы: a11: 1, a12: 2, a21: 4</div>
            <div class="console-line success">[${new Date().toLocaleTimeString()}] Демонстрация завершена</div>
        `;
	}

	// ===== ПРАКТИЧЕСКОЕ ЗАДАНИЕ =====

	runArraysExercise() {
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

	testArraysExercise() {
		const code = document.getElementById( 'exerciseCode' ).value;
		const output = document.getElementById( 'exerciseOutput' );

		if ( !output ) return;

		try {
			const testResults = [];

			eval( code );

			// Проверяем наличие класса Task
			if ( typeof Task === 'function' ) {
				const task = new Task( "Тестовая задача", "Описание", "medium" );

				// Проверяем свойства
				if ( task.title === "Тестовая задача" ) {
					testResults.push( {
						name: 'Task создается корректно',
						passed: true
					} );
				}

				if ( task.completed === false ) {
					testResults.push( {
						name: 'completed по умолчанию false',
						passed: true
					} );
				}

				// Проверяем метод getInfo
				if ( typeof task.getInfo === 'function' ) {
					const info = task.getInfo();
					if ( typeof info === 'string' && info.includes( "Тестовая задача" ) ) {
						testResults.push( {
							name: 'getInfo() работает',
							passed: true
						} );
					}
				}
			}

			// Проверяем наличие класса TaskManager
			if ( typeof TaskManager === 'function' ) {
				const manager = new TaskManager();
				const task = manager.addTask( "Тест", "Описание" );

				if ( manager.tasks.length === 1 ) {
					testResults.push( {
						name: 'TaskManager добавляет задачи',
						passed: true
					} );
				}

				if ( task && task.id ) {
					testResults.push( {
						name: 'Задачам присваивается ID',
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
                            <p>Классы не найдены. Убедитесь, что классы определены правильно.</p>
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

	clearArraysExercise() {
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
	window.arraysLesson = new ArraysLessonManager();
} );

// Глобальные функции для HTML атрибутов onclick
window.runLiteralDemo = () => window.arraysLesson?.runLiteralDemo();
window.runConstructorDemo = () => window.arraysLesson?.runConstructorDemo();
window.runFromDemo = () => window.arraysLesson?.runFromDemo();
window.runOfDemo = () => window.arraysLesson?.runOfDemo();
window.addArrayElement = () => window.arraysLesson?.addArrayElement();
window.generateRandomArray = () => window.arraysLesson?.generateRandomArray();
window.clearArray = () => window.arraysLesson?.clearArray();
window.runArrayCode = () => window.arraysLesson?.runArrayCode();
window.testArrayMethods = () => window.arraysLesson?.testArrayMethods();
window.runAddDemo = () => window.arraysLesson?.runAddDemo();
window.runRemoveDemo = () => window.arraysLesson?.runRemoveDemo();
window.runModifyDemo = () => window.arraysLesson?.runModifyDemo();
window.runSearchDemo = () => window.arraysLesson?.runSearchDemo();
window.runForLoopDemo = () => window.arraysLesson?.runForLoopDemo();
window.runForEachDemo = () => window.arraysLesson?.runForEachDemo();
window.runMapDemo = () => window.arraysLesson?.runMapDemo();
window.runFilterDemo = () => window.arraysLesson?.runFilterDemo();
window.runReduceDemo = () => window.arraysLesson?.runReduceDemo();
window.runSortDemo = () => window.arraysLesson?.runSortDemo();
window.runMultidimensionalDemo = () => window.arraysLesson?.runMultidimensionalDemo();
window.runFlatDemo = () => window.arraysLesson?.runFlatDemo();
window.runSpreadDemo = () => window.arraysLesson?.runSpreadDemo();
window.runDestructuringDemo = () => window.arraysLesson?.runDestructuringDemo();
window.runArraysExercise = () => window.arraysLesson?.runArraysExercise();
window.testArraysExercise = () => window.arraysLesson?.testArraysExercise();
window.clearArraysExercise = () => window.arraysLesson?.clearArraysExercise();