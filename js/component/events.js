/**
 * Файл для Урока 8: События в JavaScript
 * Содержит интерактивные демонстрации работы с событиями
 */

class EventsLessonManager {
	constructor() {
		this.init();
	}

	init() {
		console.log( '%c🎯 События в JavaScript: интерактивные демо загружены', 'color: #4299e1;' );
	}

	// ===== ДЕМОНСТРАЦИИ ТИПОВ СОБЫТИЙ =====

	runMouseEventsDemo() {
		const output = document.getElementById( 'mouseOutput' );
		if ( !output ) return;

		// Очищаем предыдущие демо
		const existingDemo = document.getElementById( 'mouseDemo' );
		if ( existingDemo ) existingDemo.remove();

		const demoArea = document.createElement( 'div' );
		demoArea.id = 'mouseDemo';
		demoArea.style.cssText = 'width: 300px; height: 200px; background: #f0f0f0; border: 2px solid #ccc; padding: 20px; margin: 10px 0; cursor: pointer;';
		demoArea.innerHTML = 'Наведите, кликните, нажмите мышь в этой области';

		const coordsDisplay = document.createElement( 'div' );
		coordsDisplay.id = 'mouseCoords';
		coordsDisplay.style.cssText = 'margin-top: 10px; font-family: monospace; font-size: 12px; color: #666;';
		coordsDisplay.textContent = 'Координаты: X: -, Y: -';
		demoArea.appendChild( coordsDisplay );

		// Очищаем вывод
		output.innerHTML = '<div class="console-line info">Демо запущено. Взаимодействуйте с областью выше...</div>';

		// Собираем логи
		let logs = [];

		// click - клик левой кнопкой мыши
		demoArea.addEventListener( 'click', function ( e ) {
			const log = `Клик в точке: X=${e.clientX}, Y=${e.clientY}`;
			logs.push( log );
			updateOutput( log );
		} );

		// dblclick - двойной клик
		demoArea.addEventListener( 'dblclick', function () {
			const log = 'Двойной клик!';
			logs.push( log );
			updateOutput( log );
		} );

		// mousedown - нажатие кнопки мыши
		demoArea.addEventListener( 'mousedown', function ( e ) {
			const buttonNames = ['левая', 'средняя', 'правая'];
			const log = `Нажата ${buttonNames[e.button] || 'неизвестная'} кнопка мыши`;
			logs.push( log );
			updateOutput( log );
		} );

		// mouseup - отпускание кнопки
		demoArea.addEventListener( 'mouseup', function () {
			const log = 'Кнопка мыши отпущена';
			logs.push( log );
			updateOutput( log );
		} );

		// mouseover - наведение на элемент
		demoArea.addEventListener( 'mouseover', function () {
			this.style.backgroundColor = '#e0e0ff';
			const log = 'Мышь над элементом';
			logs.push( log );
			updateOutput( log );
		} );

		// mouseout - уход мыши с элемента
		demoArea.addEventListener( 'mouseout', function () {
			this.style.backgroundColor = '#f0f0f0';
			const log = 'Мышь ушла с элемента';
			logs.push( log );
			updateOutput( log );
		} );

		// mousemove - движение мыши над элементом
		demoArea.addEventListener( 'mousemove', function ( e ) {
			const rect = this.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			coordsDisplay.textContent = `Координаты: X: ${x}, Y: ${y}`;
		} );

		// contextmenu - клик правой кнопкой
		demoArea.addEventListener( 'contextmenu', function ( e ) {
			e.preventDefault();
			const log = 'Контекстное меню (правый клик) - стандартное поведение отменено';
			logs.push( log );
			updateOutput( log );
		} );

		function updateOutput( message ) {
			const time = new Date().toLocaleTimeString();
			const entry = document.createElement( 'div' );
			entry.className = 'console-line';
			entry.textContent = `[${time}] ${message}`;
			output.appendChild( entry );
			output.scrollTop = output.scrollHeight;

			// Ограничиваем количество записей
			if ( output.children.length > 10 ) {
				output.removeChild( output.firstChild );
			}
		}

		// Вставляем демо перед выводом
		output.parentNode.insertBefore( demoArea, output );
	}

	runKeyboardEventsDemo() {
		const output = document.getElementById( 'keyboardOutput' );
		if ( !output ) return;

		// Очищаем предыдущие демо
		const existingInput = document.querySelector( 'input[placeholder*="Введите текст"]' );
		if ( existingInput ) existingInput.remove();

		const inputDemo = document.createElement( 'input' );
		inputDemo.type = 'text';
		inputDemo.placeholder = 'Введите текст и наблюдайте за событиями...';
		inputDemo.style.cssText = 'width: 300px; padding: 10px; margin: 10px 0; display: block; border: 2px solid #ccc; border-radius: 4px;';

		// Очищаем вывод
		output.innerHTML = '<div class="console-line info">Демо запущено. Вводите текст в поле выше...</div>';

		// keydown - нажатие клавиши
		inputDemo.addEventListener( 'keydown', function ( e ) {
			const modifiers = [];
			if ( e.ctrlKey ) modifiers.push( 'Ctrl' );
			if ( e.shiftKey ) modifiers.push( 'Shift' );
			if ( e.altKey ) modifiers.push( 'Alt' );

			const log = `keydown: "${e.key}" (${e.code}) ${modifiers.length ? `[${modifiers.join( '+' )}]` : ''}`;
			updateOutput( log );

			// Блокировка Escape
			if ( e.key === 'Escape' ) {
				e.preventDefault();
				updateOutput( 'Escape заблокирован (preventDefault)' );
			}
		} );

		// keyup - отпускание клавиши
		inputDemo.addEventListener( 'keyup', function ( e ) {
			const log = `keyup: Отпущена клавиша "${e.key}"`;
			updateOutput( log );
		} );

		// keypress - устаревшее
		inputDemo.addEventListener( 'keypress', function ( e ) {
			const char = String.fromCharCode( e.charCode );
			const log = `keypress: Символ "${char}"`;
			updateOutput( log );
		} );

		// Глобальные горячие клавиши
		const handleGlobalHotkey = ( e ) => {
			// Ctrl+S (сохранение)
			if ( e.ctrlKey && e.key === 's' ) {
				e.preventDefault();
				updateOutput( 'Глобальная горячая клавиша: Ctrl+S (сохранить)' );
			}

			// Стрелки
			if ( e.key.startsWith( 'Arrow' ) ) {
				updateOutput( `Глобальная горячая клавиша: ${e.key}` );
			}
		};

		document.addEventListener( 'keydown', handleGlobalHotkey );

		function updateOutput( message ) {
			const time = new Date().toLocaleTimeString();
			const entry = document.createElement( 'div' );
			entry.className = 'console-line';
			entry.textContent = `[${time}] ${message}`;
			output.appendChild( entry );
			output.scrollTop = output.scrollHeight;

			// Ограничиваем количество записей
			if ( output.children.length > 10 ) {
				output.removeChild( output.firstChild );
			}
		}

		// Вставляем демо перед выводом
		output.parentNode.insertBefore( inputDemo, output );

		// Убираем обработчик при повторном запуске
		this.cleanupKeyboardDemo = () => {
			document.removeEventListener( 'keydown', handleGlobalHotkey );
		};
	}

	runFormEventsDemo() {
		const output = document.getElementById( 'formOutput' );
		if ( !output ) return;

		// Очищаем предыдущие демо
		const existingForm = document.getElementById( 'demoForm' );
		if ( existingForm ) existingForm.remove();

		const formDemo = document.createElement( 'form' );
		formDemo.id = 'demoForm';
		formDemo.innerHTML = `
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Имя:</label>
                <input type="text" id="name" placeholder="Введите имя" style="width: 100%; padding: 8px; box-sizing: border-box;">
            </div>
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Email:</label>
                <input type="email" id="email" placeholder="email@example.com" style="width: 100%; padding: 8px; box-sizing: border-box;">
            </div>
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Сообщение:</label>
                <textarea id="message" placeholder="Введите сообщение..." style="width: 100%; padding: 8px; box-sizing: border-box; height: 80px;"></textarea>
            </div>
            <div style="margin-bottom: 15px;">
                <label style="display: flex; align-items: center; gap: 8px;">
                    <input type="checkbox" id="agree">
                    Согласен с условиями
                </label>
            </div>
            <button type="submit" style="padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">Отправить</button>
        `;

		formDemo.style.cssText = 'padding: 20px; border: 1px solid #ccc; max-width: 400px; margin: 10px 0; background: white; border-radius: 8px;';

		// Очищаем вывод
		output.innerHTML = '<div class="console-line info">Демо запущено. Взаимодействуйте с формой выше...</div>';

		// focus - получение фокуса
		formDemo.querySelectorAll( 'input, textarea' ).forEach( input => {
			input.addEventListener( 'focus', function () {
				updateOutput( `Фокус на: ${this.id}` );
				this.style.borderColor = '#667eea';
				this.style.boxShadow = '0 0 5px rgba(102, 126, 234, 0.5)';
			} );
		} );

		// blur - потеря фокуса
		formDemo.querySelectorAll( 'input, textarea' ).forEach( input => {
			input.addEventListener( 'blur', function () {
				updateOutput( `Потеря фокуса: ${this.id}` );
				this.style.borderColor = '#ccc';
				this.style.boxShadow = 'none';
			} );
		} );

		// input - ввод данных
		formDemo.querySelectorAll( 'input, textarea' ).forEach( input => {
			input.addEventListener( 'input', function () {
				const value = this.value.substring( 0, 20 ) + ( this.value.length > 20 ? '...' : '' );
				updateOutput( `Ввод в ${this.id}: "${value}"` );
			} );
		} );

		// change - изменение значения
		formDemo.querySelector( '#agree' ).addEventListener( 'change', function () {
			updateOutput( `Чекбокс: ${this.checked ? 'отмечен' : 'снят'}` );
		} );

		// submit - отправка формы
		formDemo.addEventListener( 'submit', function ( e ) {
			e.preventDefault();

			const name = this.querySelector( '#name' ).value;
			const email = this.querySelector( '#email' ).value;
			const message = this.querySelector( '#message' ).value;
			const agree = this.querySelector( '#agree' ).checked;

			updateOutput( '=== Отправка формы ===' );
			updateOutput( `Имя: ${name || '(не указано)'}` );
			updateOutput( `Email: ${email || '(не указано)'}` );
			updateOutput( `Сообщение: ${message || '(не указано)'}` );
			updateOutput( `Согласие: ${agree ? 'да' : 'нет'}` );

			// Простая валидация
			let isValid = true;
			if ( !name ) {
				updateOutput( '❌ Ошибка: укажите имя' );
				isValid = false;
			}
			if ( email && !email.includes( '@' ) ) {
				updateOutput( '❌ Ошибка: неверный email' );
				isValid = false;
			}
			if ( !agree ) {
				updateOutput( '❌ Ошибка: необходимо согласие' );
				isValid = false;
			}

			if ( isValid ) {
				updateOutput( '✅ Форма успешно отправлена!' );
				this.reset();
			}
		} );

		function updateOutput( message ) {
			const time = new Date().toLocaleTimeString();
			const entry = document.createElement( 'div' );
			entry.className = 'console-line';
			entry.textContent = `[${time}] ${message}`;
			output.appendChild( entry );
			output.scrollTop = output.scrollHeight;

			// Ограничиваем количество записей
			if ( output.children.length > 15 ) {
				output.removeChild( output.firstChild );
			}
		}

		// Вставляем демо перед выводом
		output.parentNode.insertBefore( formDemo, output );
	}

	runWindowEventsDemo() {
		const output = document.getElementById( 'windowOutput' );
		if ( !output ) return;

		// Очищаем предыдущие демо
		const existingDisplay = document.getElementById( 'windowEvents' );
		if ( existingDisplay ) existingDisplay.remove();

		const windowEventsDisplay = document.createElement( 'div' );
		windowEventsDisplay.id = 'windowEvents';
		windowEventsDisplay.style.cssText = 'padding: 15px; border: 1px solid #ccc; margin: 10px 0; max-height: 200px; overflow-y: auto; background: white; border-radius: 8px;';
		windowEventsDisplay.innerHTML = '<h4 style="margin-top: 0; color: #2d3748;">События окна:</h4>';

		// Очищаем вывод
		output.innerHTML = '<div class="console-line info">Демо запущено. Изменяйте размер окна, прокручивайте страницу...</div>';

		function logWindowEvent( message ) {
			const time = new Date().toLocaleTimeString();
			const entry = document.createElement( 'div' );
			entry.style.cssText = 'padding: 4px 0; border-bottom: 1px solid #eee; font-size: 13px;';
			entry.textContent = `[${time}] ${message}`;
			windowEventsDisplay.appendChild( entry );
			windowEventsDisplay.scrollTop = windowEventsDisplay.scrollHeight;

			// Ограничиваем количество записей
			if ( windowEventsDisplay.children.length > 15 ) {
				windowEventsDisplay.removeChild( windowEventsDisplay.children[1] );
			}

			// Также пишем в основной вывод
			const outputEntry = document.createElement( 'div' );
			outputEntry.className = 'console-line';
			outputEntry.textContent = `[${time}] ${message}`;
			output.appendChild( outputEntry );
			output.scrollTop = output.scrollHeight;

			if ( output.children.length > 10 ) {
				output.removeChild( output.firstChild );
			}
		}

		// DOMContentLoaded
		if ( document.readyState === 'loading' ) {
			document.addEventListener( 'DOMContentLoaded', () => {
				logWindowEvent( 'DOM полностью загружен и обработан' );
			} );
		} else {
			logWindowEvent( 'DOM уже загружен' );
		}

		// load
		window.addEventListener( 'load', () => {
			logWindowEvent( 'Страница полностью загружена' );
		} );

		// resize
		let resizeTimeout;
		window.addEventListener( 'resize', () => {
			logWindowEvent( `Размер окна: ${window.innerWidth}x${window.innerHeight}` );

			clearTimeout( resizeTimeout );
			resizeTimeout = setTimeout( () => {
				logWindowEvent( 'Размер окна стабилизировался' );
			}, 200 );
		} );

		// scroll
		let lastScroll = 0;
		window.addEventListener( 'scroll', () => {
			const currentScroll = window.pageYOffset;
			const direction = currentScroll > lastScroll ? 'вниз' : 'вверх';
			logWindowEvent( `Прокрутка: ${currentScroll}px (${direction})` );
			lastScroll = currentScroll;
		} );

		// hashchange
		window.addEventListener( 'hashchange', () => {
			logWindowEvent( `Хэш изменился: ${window.location.hash || '(пусто)'}` );
		} );

		// online/offline
		window.addEventListener( 'online', () => {
			logWindowEvent( 'Устройство подключено к интернету' );
		} );

		window.addEventListener( 'offline', () => {
			logWindowEvent( 'Устройство отключено от интернета' );
		} );

		// beforeunload
		window.addEventListener( 'beforeunload', ( e ) => {
			// Только для демонстрации - в реальности это может мешать
			// e.preventDefault();
			// e.returnValue = '';
			logWindowEvent( 'Попытка покинуть страницу (перед закрытием)' );
		} );

		// Вставляем демо перед выводом
		output.parentNode.insertBefore( windowEventsDisplay, output );
	}

	runTouchEventsDemo() {
		const output = document.getElementById( 'touchOutput' );
		if ( !output ) return;

		// Очищаем предыдущие демо
		const existingDemo = document.getElementById( 'touchDemo' );
		if ( existingDemo ) existingDemo.remove();

		const touchDemo = document.createElement( 'div' );
		touchDemo.id = 'touchDemo';
		touchDemo.style.cssText = 'width: 300px; height: 200px; background: #e8f4f8; border: 2px solid #4fd1c7; padding: 20px; margin: 10px 0; text-align: center; display: flex; align-items: center; justify-content: center; flex-direction: column; border-radius: 8px; touch-action: none;';
		touchDemo.innerHTML = 'Коснитесь этой области на мобильном устройстве<br><small style="font-size: 12px; color: #666;">Или используйте эмуляцию в DevTools</small>';

		// Очищаем вывод
		output.innerHTML = '<div class="console-line info">Демо запущено. Коснитесь области выше (требуется сенсорный экран или эмуляция)...</div>';

		// touchstart
		touchDemo.addEventListener( 'touchstart', function ( e ) {
			e.preventDefault();
			const touch = e.touches[0];
			const rect = this.getBoundingClientRect();
			const x = touch.clientX - rect.left;
			const y = touch.clientY - rect.top;

			updateOutput( `touchstart: Начало касания (пальцев: ${e.touches.length})` );
			updateOutput( `  Координаты: X=${x.toFixed( 0 )}, Y=${y.toFixed( 0 )}` );

			this.style.backgroundColor = '#c6f6d5';
		} );

		// touchmove
		touchDemo.addEventListener( 'touchmove', function ( e ) {
			e.preventDefault();
			const touch = e.touches[0];
			const rect = this.getBoundingClientRect();
			const x = touch.clientX - rect.left;
			const y = touch.clientY - rect.top;

			updateOutput( `touchmove: X=${x.toFixed( 0 )}, Y=${y.toFixed( 0 )}` );
		} );

		// touchend
		touchDemo.addEventListener( 'touchend', function ( e ) {
			updateOutput( `touchend: Касание завершено (осталось пальцев: ${e.touches.length})` );
			this.style.backgroundColor = '#e8f4f8';
		} );

		// touchcancel
		touchDemo.addEventListener( 'touchcancel', function () {
			updateOutput( 'touchcancel: Касание прервано системой' );
			this.style.backgroundColor = '#e8f4f8';
		} );

		// Эмуляция жестов
		let startX, startY, startTime;

		touchDemo.addEventListener( 'touchstart', function ( e ) {
			const touch = e.touches[0];
			startX = touch.clientX;
			startY = touch.clientY;
			startTime = Date.now();
		} );

		touchDemo.addEventListener( 'touchend', function ( e ) {
			if ( !startX || !startY || !startTime ) return;

			const touch = e.changedTouches[0];
			const endX = touch.clientX;
			const endY = touch.clientY;
			const endTime = Date.now();

			const deltaX = endX - startX;
			const deltaY = endY - startY;
			const duration = endTime - startTime;

			if ( duration < 500 ) { // Быстрый жест
				if ( Math.abs( deltaX ) > 30 && Math.abs( deltaY ) < 20 ) {
					updateOutput( `Жест: ${deltaX > 0 ? 'Свайп вправо' : 'Свайп влево'}` );
				} else if ( Math.abs( deltaY ) > 30 && Math.abs( deltaX ) < 20 ) {
					updateOutput( `Жест: ${deltaY > 0 ? 'Свайп вниз' : 'Свайп вверх'}` );
				} else if ( Math.abs( deltaX ) < 15 && Math.abs( deltaY ) < 15 ) {
					updateOutput( 'Жест: Тап (короткое касание)' );
				}
			}

			// Сброс
			startX = startY = startTime = null;
		} );

		function updateOutput( message ) {
			const time = new Date().toLocaleTimeString();
			const entry = document.createElement( 'div' );
			entry.className = 'console-line';
			entry.textContent = `[${time}] ${message}`;
			output.appendChild( entry );
			output.scrollTop = output.scrollHeight;

			// Ограничиваем количество записей
			if ( output.children.length > 10 ) {
				output.removeChild( output.firstChild );
			}
		}

		// Индикатор для десктопов
		const touchIndicator = document.createElement( 'div' );
		touchIndicator.style.cssText = 'margin-top: 10px; padding: 10px; background: #f7fafc; border: 1px solid #cbd5e0; border-radius: 4px; font-size: 13px;';
		touchIndicator.innerHTML = `
            <p style="margin: 0 0 8px 0; font-weight: bold;">Для тестирования на ПК:</p>
            <ol style="margin: 0; padding-left: 20px;">
                <li>Откройте DevTools (F12)</li>
                <li>Включите режим мобильного устройства</li>
                <li>Выберите устройство с сенсорным экраном</li>
                <li>Кликайте мышью для эмуляции касаний</li>
            </ol>
        `;

		// Вставляем демо перед выводом
		output.parentNode.insertBefore( touchDemo, output );
		output.parentNode.insertBefore( touchIndicator, output );
	}

	// ===== ДЕМОНСТРАЦИИ ОБРАБОТКИ СОБЫТИЙ =====

	runPropertyHandlerDemo() {
		alert( 'Демо запущено. Созданы кнопки с разными обработчиками. Проверьте консоль браузера для результатов.' );
	}

	runAddEventListenerDemo() {
		alert( 'Демо запущено. Проверьте консоль браузера для результатов работы addEventListener с разными опциями.' );
	}

	runRemoveHandlersDemo() {
		alert( 'Демо удаления обработчиков запущено. Проверьте консоль браузера для тестирования добавления/удаления обработчиков.' );
	}

	// ===== ДЕМОНСТРАЦИИ СВОЙСТВ СОБЫТИЙ =====

	runMousePropertiesDemo() {
		const demoArea = document.createElement( 'div' );
		demoArea.style.cssText = 'width: 300px; height: 200px; background: #f0f0f0; border: 2px solid #ccc; padding: 20px; margin: 20px 0; position: relative;';
		demoArea.innerHTML = 'Кликайте и двигайте мышь в этой области';

		const infoDiv = document.createElement( 'div' );
		infoDiv.style.cssText = 'margin-top: 10px; font-family: monospace; font-size: 12px; background: white; padding: 10px; border: 1px solid #ddd;';
		demoArea.appendChild( infoDiv );

		demoArea.addEventListener( 'click', function ( e ) {
			const rect = this.getBoundingClientRect();
			const info = `
                clientX/Y: ${e.clientX}, ${e.clientY}
                pageX/Y: ${e.pageX}, ${e.pageY}
                offsetX/Y: ${e.offsetX}, ${e.offsetY}
                button: ${e.button} (${['левая', 'средняя', 'правая'][e.button] || 'неизвестная'})
                ctrlKey: ${e.ctrlKey}
                shiftKey: ${e.shiftKey}
                altKey: ${e.altKey}
            `;
			infoDiv.textContent = info;
		} );

		demoArea.addEventListener( 'mousemove', function ( e ) {
			const rect = this.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			this.querySelector( 'div:last-child' ).textContent = `Мышь: X=${x}, Y=${y}`;
		} );

		document.body.appendChild( demoArea );
		alert( 'Демо свойств мыши создано. Взаимодействуйте с серой областью.' );
	}

	runKeyboardPropertiesDemo() {
		const input = document.createElement( 'input' );
		input.type = 'text';
		input.placeholder = 'Нажимайте клавиши для просмотра свойств...';
		input.style.cssText = 'width: 300px; padding: 10px; margin: 10px 0; display: block;';

		const infoDiv = document.createElement( 'div' );
		infoDiv.style.cssText = 'margin-top: 10px; font-family: monospace; font-size: 12px; background: white; padding: 10px; border: 1px solid #ddd; max-width: 300px;';

		input.addEventListener( 'keydown', function ( e ) {
			const info = `
                key: "${e.key}"
                code: "${e.code}"
                keyCode: ${e.keyCode}
                ctrlKey: ${e.ctrlKey}
                shiftKey: ${e.shiftKey}
                altKey: ${e.altKey}
                metaKey: ${e.metaKey}
                repeat: ${e.repeat}
                location: ${e.location}
            `;
			infoDiv.textContent = info;

			// Блокировка Ctrl+U
			if ( e.ctrlKey && e.key === 'u' ) {
				e.preventDefault();
				infoDiv.textContent += '\n\nCtrl+U заблокирован!';
			}
		} );

		document.body.appendChild( input );
		document.body.appendChild( infoDiv );
		alert( 'Демо свойств клавиатуры создано. Вводите текст в поле для просмотра свойств событий.' );
	}

	// ===== ДЕМОНСТРАЦИЯ ПОТОКА СОБЫТИЙ =====

	startEventFlowDemo() {
		const output = document.getElementById( 'flowOutput' );
		const useCapture = document.getElementById( 'useCapture' ).checked;

		if ( !output ) return;

		output.innerHTML = '<div class="console-line info">Демо запущено. Кликните на кнопку "Кликни меня"...</div>';

		// Очищаем предыдущие обработчики
		this.removeEventFlowHandlers();

		const grandparent = document.getElementById( 'grandparent' );
		const parent = document.getElementById( 'parent' );
		const child = document.getElementById( 'child' );
		const triggerBtn = document.getElementById( 'triggerBtn' );

		if ( !grandparent || !parent || !child || !triggerBtn ) return;

		// Добавляем обработчики с указанной фазой
		const capture = useCapture;

		// Обработчики для grandparent
		grandparent.addEventListener( 'click', function ( e ) {
			if ( e.target === triggerBtn ) {
				const phase = capture ? 'ПОГРУЖЕНИЕ' : 'ВСПЛЫТИЕ';
				updateFlowOutput( `${phase}: grandparent (дедушка)` );
				if ( capture ) e.currentTarget.classList.add( 'highlight' );
			}
		}, capture );

		// Обработчики для parent
		parent.addEventListener( 'click', function ( e ) {
			if ( e.target === triggerBtn ) {
				const phase = capture ? 'ПОГРУЖЕНИЕ' : 'ВСПЛЫТИЕ';
				updateFlowOutput( `${phase}: parent (родитель)` );
				if ( capture ) e.currentTarget.classList.add( 'highlight' );
			}
		}, capture );

		// Обработчики для child
		child.addEventListener( 'click', function ( e ) {
			if ( e.target === triggerBtn ) {
				const phase = capture ? 'ПОГРУЖЕНИЕ' : 'ВСПЛЫТИЕ';
				updateFlowOutput( `${phase}: child (ребенок)` );
				if ( capture ) e.currentTarget.classList.add( 'highlight' );
			}
		}, capture );

		// Обработчик для кнопки (всегда на фазе цели)
		triggerBtn.addEventListener( 'click', function ( e ) {
			updateFlowOutput( 'ЦЕЛЬ: triggerBtn (кнопка)' );
			e.currentTarget.classList.add( 'highlight' );

			// Убираем подсветку через 1 секунду
			setTimeout( () => {
				document.querySelectorAll( '.flow-level.highlight, #triggerBtn.highlight' ).forEach( el => {
					el.classList.remove( 'highlight' );
				} );
			}, 1000 );
		} );

		// Обработчик для остановки всплытия/погружения
		const stopPropagationBtn = document.createElement( 'button' );
		stopPropagationBtn.textContent = 'Остановить распространение';
		stopPropagationBtn.className = 'btn btn-warning';
		stopPropagationBtn.style.marginLeft = '10px';

		stopPropagationBtn.addEventListener( 'click', function () {
			parent.addEventListener( 'click', function ( e ) {
				e.stopPropagation();
				updateFlowOutput( 'Всплытие/погружение остановлено на parent!' );
			}, capture );

			updateFlowOutput( 'Добавлен stopPropagation() на parent. Кликните снова.' );
			this.disabled = true;
		} );

		// Добавляем кнопку в управление
		const flowControls = document.querySelector( '.flow-controls' );
		if ( flowControls && !flowControls.querySelector( '.btn-warning' ) ) {
			flowControls.appendChild( stopPropagationBtn );
		}

		function updateFlowOutput( message ) {
			const time = new Date().toLocaleTimeString();
			const entry = document.createElement( 'div' );
			entry.className = 'console-line';
			entry.textContent = `[${time}] ${message}`;
			output.appendChild( entry );
			output.scrollTop = output.scrollHeight;
		}

		// Сохраняем ссылки на обработчики для очистки
		this.eventFlowHandlers = { grandparent, parent, child, triggerBtn, capture };
	}

	resetEventFlowDemo() {
		const output = document.getElementById( 'flowOutput' );
		if ( output ) {
			output.innerHTML = '<div class="console-line info">Демо сброшено. Нажмите "Запустить демо" для начала.</div>';
		}

		this.removeEventFlowHandlers();

		// Убираем кнопку остановки распространения
		const stopBtn = document.querySelector( '.flow-controls .btn-warning' );
		if ( stopBtn ) stopBtn.remove();

		// Убираем подсветку
		document.querySelectorAll( '.highlight' ).forEach( el => {
			el.classList.remove( 'highlight' );
		} );
	}

	removeEventFlowHandlers() {
		if ( this.eventFlowHandlers ) {
			const { grandparent, parent, child, triggerBtn, capture } = this.eventFlowHandlers;

			// Клонируем и заменяем элементы для полного удаления обработчиков
			if ( grandparent && parent && child && triggerBtn ) {
				const newTriggerBtn = triggerBtn.cloneNode( true );
				triggerBtn.parentNode.replaceChild( newTriggerBtn, triggerBtn );
			}

			this.eventFlowHandlers = null;
		}
	}

	// ===== ПРАКТИЧЕСКОЕ ЗАДАНИЕ =====

	runEventsExercise() {
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

	testEventsExercise() {
		const code = document.getElementById( 'exerciseCode' ).value;
		const output = document.getElementById( 'exerciseOutput' );

		if ( !output ) return;

		try {
			const testResults = [];

			eval( code );

			// Проверяем наличие класса EventToolbar
			if ( typeof EventToolbar === 'function' ) {
				testResults.push( {
					name: 'Класс EventToolbar определен',
					passed: true
				} );
			}

			// Проверяем наличие методов
			const app = typeof EventToolbar === 'function' ? new EventToolbar() : null;
			if ( app ) {
				if ( typeof app.init === 'function' ) {
					testResults.push( {
						name: 'Метод init() существует',
						passed: true
					} );
				}

				if ( typeof app.createUI === 'function' ) {
					testResults.push( {
						name: 'Метод createUI() существует',
						passed: true
					} );
				}

				if ( typeof app.setupEventListeners === 'function' ) {
					testResults.push( {
						name: 'Метод setupEventListeners() существует',
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
                            <p>Класс EventToolbar не найден. Убедитесь, что класс определен правильно.</p>
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

	clearEventsExercise() {
		const codeArea = document.getElementById( 'exerciseCode' );
		const output = document.getElementById( 'exerciseOutput' );

		if ( codeArea ) codeArea.value = '';
		if ( output ) {
			output.innerHTML = `
                <div class="output-placeholder">
                    <i class="fas fa-terminal"></i>
                    Вывод вашего кода появится здесь
                </div>
            `;
		}
	}

	// ===== ДЕЛЕГИРОВАНИЕ СОБЫТИЙ (динамическое) =====

	setupEventDelegationDemo() {
		const addItemBtn = document.getElementById( 'addItemBtn' );
		const addMultipleBtn = document.getElementById( 'addMultipleBtn' );
		const clearListBtn = document.getElementById( 'clearListBtn' );
		const newItemInput = document.getElementById( 'newItemInput' );
		const itemList = document.getElementById( 'itemList' );

		if ( !addItemBtn || !addMultipleBtn || !clearListBtn || !newItemInput || !itemList ) return;

		// Делегирование событий на списке
		itemList.addEventListener( 'click', function ( e ) {
			// Клик по элементу списка
			if ( e.target.classList.contains( 'list-item' ) ) {
				console.log( 'Клик по элементу:', e.target.textContent );
				e.target.style.background = '#e6fffa';
				setTimeout( () => {
					e.target.style.background = '';
				}, 300 );
			}

			// Клик по кнопке удаления
			if ( e.target.classList.contains( 'item-actions' ) ) {
				console.log( 'Удаление элемента:', e.target.parentElement.textContent );
				e.target.parentElement.remove();
			}
		} );

		// Добавление нового элемента
		addItemBtn.addEventListener( 'click', function () {
			const text = newItemInput.value.trim();
			if ( !text ) {
				alert( 'Введите текст элемента' );
				return;
			}

			addListItem( text );
			newItemInput.value = '';
			newItemInput.focus();
		} );

		// Добавление по Enter
		newItemInput.addEventListener( 'keypress', function ( e ) {
			if ( e.key === 'Enter' ) {
				addItemBtn.click();
			}
		} );

		// Добавление нескольких элементов
		addMultipleBtn.addEventListener( 'click', function () {
			for ( let i = 1; i <= 5; i++ ) {
				addListItem( `Автоматический элемент ${itemList.children.length + i}` );
			}
		} );

		// Очистка списка
		clearListBtn.addEventListener( 'click', function () {
			while ( itemList.firstChild ) {
				itemList.removeChild( itemList.firstChild );
			}
			console.log( 'Список очищен' );
		} );

		function addListItem( text ) {
			const li = document.createElement( 'li' );
			li.className = 'list-item';
			li.innerHTML = `${text} <span class="item-actions">[x]</span>`;
			itemList.appendChild( li );
			console.log( 'Добавлен элемент:', text );
		}
	}
}

// Инициализация при загрузке страницы
document.addEventListener( 'DOMContentLoaded', () => {
	window.eventsLesson = new EventsLessonManager();

	// Настройка делегирования событий
	setTimeout( () => {
		window.eventsLesson.setupEventDelegationDemo();
	}, 100 );
} );

// Глобальные функции для HTML атрибутов onclick
window.runMouseEventsDemo = () => window.eventsLesson?.runMouseEventsDemo();
window.runKeyboardEventsDemo = () => {
	if ( window.eventsLesson?.cleanupKeyboardDemo ) {
		window.eventsLesson.cleanupKeyboardDemo();
	}
	window.eventsLesson?.runKeyboardEventsDemo();
};
window.runFormEventsDemo = () => window.eventsLesson?.runFormEventsDemo();
window.runWindowEventsDemo = () => window.eventsLesson?.runWindowEventsDemo();
window.runTouchEventsDemo = () => window.eventsLesson?.runTouchEventsDemo();
window.runPropertyHandlerDemo = () => window.eventsLesson?.runPropertyHandlerDemo();
window.runAddEventListenerDemo = () => window.eventsLesson?.runAddEventListenerDemo();
window.runRemoveHandlersDemo = () => window.eventsLesson?.runRemoveHandlersDemo();
window.runMousePropertiesDemo = () => window.eventsLesson?.runMousePropertiesDemo();
window.runKeyboardPropertiesDemo = () => window.eventsLesson?.runKeyboardPropertiesDemo();
window.startEventFlowDemo = () => window.eventsLesson?.startEventFlowDemo();
window.resetEventFlowDemo = () => window.eventsLesson?.resetEventFlowDemo();
window.runEventsExercise = () => window.eventsLesson?.runEventsExercise();
window.testEventsExercise = () => window.eventsLesson?.testEventsExercise();
window.clearEventsExercise = () => window.eventsLesson?.clearEventsExercise();