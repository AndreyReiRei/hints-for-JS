/**
 * Файл для Урока 8: Асинхронность в JavaScript
 * Содержит интерактивные демонстрации асинхронных операций
 */

class AsyncLessonManager {
	constructor() {
		this.init();
	}

	init() {
		console.log( '%c🚀 Асинхронность в JavaScript: интерактивные демо загружены', 'color: #667eea;' );
	}

	// ===== ДЕМОНСТРАЦИИ =====

	runSyncVsAsyncDemo() {
		const output = document.getElementById( 'syncAsyncOutput' );
		if ( !output ) return;

		let outputLines = [
			`<div class="console-line info">Запуск демонстрации синхронного vs асинхронного кода...</div>`
		];

		// Синхронная часть
		outputLines.push( `<div class="console-line"><strong>СИНХРОННЫЙ КОД:</strong></div>` );
		outputLines.push( `<div class="console-line">1. Начинаем приготовление кофе</div>` );
		outputLines.push( `<div class="console-line">2. Кипятим воду</div>` );
		outputLines.push( `<div class="console-line">3. Заливаем кофе</div>` );
		outputLines.push( `<div class="console-line">4. Подаем кофе</div>` );
		outputLines.push( `<div class="console-line">5. Пьем кофе</div>` );

		outputLines.push( `<div class="console-line"><strong>АСИНХРОННЫЙ КОД:</strong></div>` );
		outputLines.push( `<div class="console-line">1. Начинаем приготовление кофе</div>` );
		outputLines.push( `<div class="console-line">2. Кипятим воду (не ждем)</div>` );
		outputLines.push( `<div class="console-line">5. Читаем новости пока готовится кофе</div>` );

		// Асинхронная часть с задержкой
		setTimeout( () => {
			outputLines.push( `<div class="console-line">3. Заливаем кофе (после 2 секунд)</div>` );
			output.innerHTML = outputLines.join( '' );
		}, 2000 );

		setTimeout( () => {
			outputLines.push( `<div class="console-line">4. Подаем кофе (еще через 1 секунду)</div>` );
			outputLines.push( `<div class="console-line success">Демонстрация завершена</div>` );
			output.innerHTML = outputLines.join( '' );
		}, 3000 );

		output.innerHTML = outputLines.join( '' );
	}

	runCallbackBasicDemo() {
		const output = document.getElementById( 'callbackBasicOutput' );
		if ( !output ) return;

		output.innerHTML = `
            <div class="console-line info">Запуск демонстрации callback-функций...</div>
            <div class="console-line">Привет, Анна!</div>
            <div class="console-line">До свидания!</div>
            <div class="console-line">Результат: 8</div>
            <div class="console-line">Результат: 15</div>
            <div class="console-line">2</div>
            <div class="console-line">4</div>
            <div class="console-line">6</div>
            <div class="console-line">8</div>
            <div class="console-line">10</div>
            <div class="console-line success">Демонстрация завершена</div>
        `;
	}

	runCallbackErrorDemo() {
		const output = document.getElementById( 'callbackErrorOutput' );
		if ( !output ) return;

		// Имитация случайного результата
		const success = Math.random() > 0.3;

		if ( success ) {
			output.innerHTML = `
                <div class="console-line info">Запуск демонстрации обработки ошибок...</div>
                <div class="console-line">Успех: Содержимое файла document.txt</div>
                <div class="console-line">Пользователь получен: Анна Иванова</div>
                <div class="console-line success">Демонстрация завершена успешно</div>
            `;
		} else {
			output.innerHTML = `
                <div class="console-line info">Запуск демонстрации обработки ошибок...</div>
                <div class="console-line error">Ошибка: Не удалось прочитать файл document.txt</div>
                <div class="console-line error">Ошибка получения пользователя: Пользователь не найден</div>
                <div class="console-line">Используем запасного пользователя: Анна Иванова</div>
                <div class="console-line warning">Демонстрация завершена с ошибками (как и ожидалось)</div>
            `;
		}
	}

	runCallbackHellDemo() {
		const output = document.getElementById( 'callbackHellOutput' );
		if ( !output ) return;

		let outputLines = [
			`<div class="console-line info">Запуск демонстрации Callback Hell...</div>`,
			`<div class="console-line"><strong>CALLBACK HELL:</strong></div>`,
			`<div class="console-line">1. Заказываем пиццу...</div>`
		];

		output.innerHTML = outputLines.join( '' );

		setTimeout( () => {
			outputLines.push( `<div class="console-line">2. Пицца готова!</div>` );
			outputLines.push( `<div class="console-line">3. Заказываем напиток к пицце Пепперони...</div>` );
			output.innerHTML = outputLines.join( '' );
		}, 2000 );

		setTimeout( () => {
			outputLines.push( `<div class="console-line">4. Напиток готов!</div>` );
			outputLines.push( `<div class="console-line">5. Подаем Пепперони с Кола...</div>` );
			output.innerHTML = outputLines.join( '' );
		}, 3000 );

		setTimeout( () => {
			outputLines.push( `<div class="console-line">6. Все подано!</div>` );
			outputLines.push( `<div class="console-line">Заказ выполнен: {"pizza":"Пепперони","drink":"Кола"}</div>` );
			outputLines.push( `<div class="console-line"><strong>Именованные функции:</strong></div>` );
			outputLines.push( `<div class="console-line">1. Заказываем пиццу...</div>` );
			output.innerHTML = outputLines.join( '' );
		}, 3500 );

		setTimeout( () => {
			outputLines.push( `<div class="console-line">2. Пицца готова!</div>` );
			outputLines.push( `<div class="console-line">3. Заказываем напиток к пицце Пепперони...</div>` );
			outputLines.push( `<div class="console-line">4. Напиток готов!</div>` );
			outputLines.push( `<div class="console-line">5. Подаем Пепперони с Кола...</div>` );
			outputLines.push( `<div class="console-line">6. Все подано!</div>` );
			outputLines.push( `<div class="console-line">Заказ выполнен (именованные функции): {"pizza":"Пепперони","drink":"Кола"}</div>` );
			outputLines.push( `<div class="console-line"><strong>Водопад (Async Waterfall):</strong></div>` );
			outputLines.push( `<div class="console-line">Водопад: Заказываем пиццу...</div>` );
			output.innerHTML = outputLines.join( '' );
		}, 4000 );

		setTimeout( () => {
			outputLines.push( `<div class="console-line">Водопад: Заказываем напиток к Маргарита...</div>` );
			output.innerHTML = outputLines.join( '' );
		}, 4800 );

		setTimeout( () => {
			outputLines.push( `<div class="console-line">Водопад: Подаем Маргарита с Сок...</div>` );
			outputLines.push( `<div class="console-line">Водопад завершен: {"pizza":"Маргарита","drink":"Сок","status":"готово"}</div>` );
			outputLines.push( `<div class="console-line success">Демонстрация завершена</div>` );
			output.innerHTML = outputLines.join( '' );
		}, 5300 );
	}

	runPromisesDemo() {
		const output = document.getElementById( 'promisesOutput' );
		if ( !output ) return;

		// Функции для демо
		const getUser = ( userId ) => new Promise( ( resolve, reject ) => {
			setTimeout( () => {
				if ( userId > 0 ) {
					resolve( { id: userId, name: `Пользователь ${userId}` } );
				} else {
					reject( new Error( "Неверный ID" ) );
				}
			}, 300 );
		} );

		const getUserPosts = ( userId ) => new Promise( resolve => {
			setTimeout( () => {
				resolve( [{ id: 1, title: "Пост 1" }, { id: 2, title: "Пост 2" }] );
			}, 200 );
		} );

		let outputLines = [
			`<div class="console-line info">Запуск демонстрации Promise...</div>`
		];

		output.innerHTML = outputLines.join( '' );

		// Цепочка Promise
		getUser( 1 )
			.then( user => {
				outputLines.push( `<div class="console-line">Пользователь получен: ${user.name}</div>` );
				output.innerHTML = outputLines.join( '' );
				return getUserPosts( user.id );
			} )
			.then( posts => {
				outputLines.push( `<div class="console-line">Посты получены: ${posts.length}</div>` );
				outputLines.push( `<div class="console-line">Комментарии получены: 2</div>` );
				outputLines.push( `<div class="console-line">Все данные загружены успешно!</div>` );
				outputLines.push( `<div class="console-line">Операция загрузки завершена</div>` );
				output.innerHTML = outputLines.join( '' );
				return Promise.all( [getUser( 2 ), getUserPosts( 2 ), Promise.resolve( "Дополнительные данные" )] );
			} )
			.then( ( [user, posts, extra] ) => {
				outputLines.push( `<div class="console-line"><strong>Promise.all:</strong></div>` );
				outputLines.push( `<div class="console-line">Все Promise выполнены</div>` );
				outputLines.push( `<div class="console-line">Пользователь: ${user.name}</div>` );
				outputLines.push( `<div class="console-line">Количество постов: ${posts.length}</div>` );
				outputLines.push( `<div class="console-line">Дополнительно: ${extra}</div>` );
				output.innerHTML = outputLines.join( '' );
				return Promise.race( [
					new Promise( resolve => setTimeout( () => resolve( "Быстрый Promise" ), 100 ) ),
					new Promise( resolve => setTimeout( () => resolve( "Медленный Promise" ), 500 ) )
				] );
			} )
			.then( result => {
				outputLines.push( `<div class="console-line"><strong>Promise.race:</strong></div>` );
				outputLines.push( `<div class="console-line">Победитель гонки: ${result}</div>` );
				outputLines.push( `<div class="console-line">Ошибка обработана: Неверный ID</div>` );
				outputLines.push( `<div class="console-line success">Демонстрация завершена</div>` );
				output.innerHTML = outputLines.join( '' );
			} )
			.catch( error => {
				outputLines.push( `<div class="console-line error">Ошибка: ${error.message}</div>` );
				output.innerHTML = outputLines.join( '' );
			} );
	}

	runAsyncBasicDemo() {
		const output = document.getElementById( 'asyncBasicOutput' );
		if ( !output ) return;

		const getUser = ( userId ) => new Promise( ( resolve, reject ) => {
			setTimeout( () => {
				if ( userId > 0 ) {
					resolve( { id: userId, name: `Анна Иванова` } );
				} else {
					reject( new Error( "Пользователь не найден" ) );
				}
			}, 300 );
		} );

		const getUserPosts = ( userId ) => new Promise( resolve => {
			setTimeout( () => {
				resolve( [{ id: 1, title: "Мой первый пост" }] );
			}, 200 );
		} );

		let outputLines = [
			`<div class="console-line info">Запуск демонстрации Async/Await...</div>`
		];

		output.innerHTML = outputLines.join( '' );

		// Имитация async/await
		setTimeout( async () => {
			try {
				outputLines.push( `<div class="console-line">Начинаем загрузку данных пользователя...</div>` );
				output.innerHTML = outputLines.join( '' );

				await new Promise( resolve => setTimeout( resolve, 300 ) );
				outputLines.push( `<div class="console-line">Пользователь загружен: Анна Иванова</div>` );
				output.innerHTML = outputLines.join( '' );

				await new Promise( resolve => setTimeout( resolve, 200 ) );
				outputLines.push( `<div class="console-line">Посты загружены: 1</div>` );
				output.innerHTML = outputLines.join( '' );

				await new Promise( resolve => setTimeout( resolve, 200 ) );
				outputLines.push( `<div class="console-line">Комментарии загружены: 2</div>` );
				outputLines.push( `<div class="console-line">Все данные получены:</div>` );
				outputLines.push( `<div class="console-line">Имя: Анна Иванова</div>` );
				outputLines.push( `<div class="console-line">Постов: 1</div>` );
				outputLines.push( `<div class="console-line">Комментариев: 2</div>` );

				// Загрузка нескольких пользователей
				outputLines.push( `<div class="console-line">Загружен пользователь 1: Пользователь 1</div>` );
				outputLines.push( `<div class="console-line">Загружен пользователь 2: Пользователь 2</div>` );
				outputLines.push( `<div class="console-line">Загружен пользователь 3: Пользователь 3</div>` );
				outputLines.push( `<div class="console-line error">Ошибка загрузки пользователя -1: Неверный ID</div>` );
				outputLines.push( `<div class="console-line">Загружен пользователь 4: Пользователь 4</div>` );
				outputLines.push( `<div class="console-line">Успешно загружено 4 пользователей</div>` );

				outputLines.push( `<div class="console-line success">Демонстрация завершена</div>` );
				output.innerHTML = outputLines.join( '' );

			} catch ( error ) {
				outputLines.push( `<div class="console-line error">Ошибка: ${error.message}</div>` );
				output.innerHTML = outputLines.join( '' );
			}
		}, 500 );
	}

	runAsyncErrorDemo() {
		const output = document.getElementById( 'asyncErrorOutput' );
		if ( !output ) return;

		let outputLines = [
			`<div class="console-line info">Запуск демонстрации обработки ошибок в Async/Await...</div>`
		];

		output.innerHTML = outputLines.join( '' );

		setTimeout( async () => {
			// Пример 1: try/catch
			outputLines.push( `<div class="console-line">Загружаем пользователя 1...</div>` );
			outputLines.push( `<div class="console-line">Загружаем посты пользователя Анна Иванова...</div>` );
			outputLines.push( `<div class="console-line">Загружаем комментарии...</div>` );
			outputLines.push( `<div class="console-line">Загрузка данных завершена (блок finally)</div>` );
			outputLines.push( `<div class="console-line">Операция успешна</div>` );

			// Пример 2: Несколько источников
			outputLines.push( `<div class="console-line">Пытаемся основной источник...</div>` );
			outputLines.push( `<div class="console-line warning">Основной источник не сработал, пробуем запасной...</div>` );
			outputLines.push( `<div class="console-line">Используем запасной источник...</div>` );

			outputLines.push( `<div class="console-line success">Демонстрация завершена</div>` );
			output.innerHTML = outputLines.join( '' );
		}, 500 );
	}

	runAsyncParallelDemo() {
		const output = document.getElementById( 'asyncParallelOutput' );
		if ( !output ) return;

		let outputLines = [
			`<div class="console-line info">Запуск демонстрации параллельного выполнения...</div>`
		];

		output.innerHTML = outputLines.join( '' );

		// Имитация параллельного выполнения
		setTimeout( () => {
			outputLines.push( `<div class="console-line">Начинаем параллельную загрузку...</div>` );
			outputLines.push( `<div class="console-line">Все данные загружены параллельно!</div>` );
			outputLines.push( `<div class="console-line">Параллельная загрузка завершена</div>` );

			outputLines.push( `<div class="console-line"><strong>Promise.allSettled пример:</strong></div>` );
			outputLines.push( `<div class="console-line">Успешно: 2, Ошибок: 1</div>` );

			outputLines.push( `<div class="console-line"><strong>Ограничение параллелизма:</strong></div>` );
			outputLines.push( `<div class="console-line">Обработка с ограничением параллелизма (макс 3)...</div>` );
			outputLines.push( `<div class="console-line">Успешно обработано: 10/10</div>` );

			outputLines.push( `<div class="console-line success">Демонстрация завершена</div>` );
			output.innerHTML = outputLines.join( '' );
		}, 1000 );
	}

	runFetchDemo() {
		const output = document.getElementById( 'fetchOutput' );
		if ( !output ) return;

		let outputLines = [
			`<div class="console-line info">Запуск демонстрации Fetch API...</div>`,
			`<div class="console-line">=== ПРИМЕРЫ FETCH API ===</div>`,
			`<div class="console-line">Запрашиваем данные с JSONPlaceholder...</div>`
		];

		output.innerHTML = outputLines.join( '' );

		// Имитация сетевого запроса
		setTimeout( () => {
			outputLines.push( `<div class="console-line">Получен пост: sunt aut facere repellat provident occaecati excepturi optio reprehenderit</div>` );
			outputLines.push( `<div class="console-line">Текст: quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nrepreh...</div>` );
			outputLines.push( `<div class="console-line">Загружаем несколько ресурсов параллельно...</div>` );
			output.innerHTML = outputLines.join( '' );
		}, 800 );

		setTimeout( () => {
			outputLines.push( `<div class="console-line">Загружено: 100 постов, 10 пользователей, 500 комментариев</div>` );
			outputLines.push( `<div class="console-line">Обогащенные посты: [object Object],[object Object],[object Object]</div>` );
			outputLines.push( `<div class="console-line">Все примеры завершены!</div>` );
			outputLines.push( `<div class="console-line success">Демонстрация завершена</div>` );
			output.innerHTML = outputLines.join( '' );
		}, 1500 );
	}

	// ===== ПРАКТИЧЕСКОЕ ЗАДАНИЕ =====

	runAsyncExercise() {
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
                    <div class="hint-box" style="margin-top: 15px;">
                        <h5><i class="fas fa-lightbulb"></i> Подсказки для продолжения:</h5>
                        <ul>
                            <li>Реализуйте очередь с приоритетами (массив объектов {task, priority})</li>
                            <li>Добавьте метод <code>runTask()</code> для выполнения одной задачи</li>
                            <li>Реализуйте ограничение параллелизма через счётчик активных задач</li>
                            <li>Добавьте повторные попытки при ошибках (retry logic)</li>
                            <li>Реализуйте кэширование результатов в Map</li>
                            <li>Добавьте возможность отмены через AbortController</li>
                        </ul>
                    </div>
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

	clearAsyncExercise() {
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
	window.asyncLesson = new AsyncLessonManager();
} );

// Глобальные функции для HTML атрибутов onclick
window.runSyncVsAsyncDemo = () => window.asyncLesson?.runSyncVsAsyncDemo();
window.runCallbackBasicDemo = () => window.asyncLesson?.runCallbackBasicDemo();
window.runCallbackErrorDemo = () => window.asyncLesson?.runCallbackErrorDemo();
window.runCallbackHellDemo = () => window.asyncLesson?.runCallbackHellDemo();
window.runPromisesDemo = () => window.asyncLesson?.runPromisesDemo();
window.runAsyncBasicDemo = () => window.asyncLesson?.runAsyncBasicDemo();
window.runAsyncErrorDemo = () => window.asyncLesson?.runAsyncErrorDemo();
window.runAsyncParallelDemo = () => window.asyncLesson?.runAsyncParallelDemo();
window.runFetchDemo = () => window.asyncLesson?.runFetchDemo();
window.runAsyncExercise = () => window.asyncLesson?.runAsyncExercise();
window.clearAsyncExercise = () => window.asyncLesson?.clearAsyncExercise();