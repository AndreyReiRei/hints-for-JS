/**
 * Файл для практической страницы JavaScript
 * Содержит функционал для демонстрационных проектов
 */

// ===== ToDo Приложение =====
let todoTasks = JSON.parse( localStorage.getItem( 'todoTasks' ) ) || [];
let currentFilter = 'all';

function addTodo() {
	const input = document.getElementById( 'todoInput' );
	const text = input.value.trim();

	if ( text ) {
		todoTasks.push( {
			id: Date.now(),
			text: text,
			completed: false,
			createdAt: new Date()
		} );

		input.value = '';
		saveTodos();
		renderTodos();
	}
}

function toggleTodo( id ) {
	const task = todoTasks.find( t => t.id === id );
	if ( task ) {
		task.completed = !task.completed;
		saveTodos();
		renderTodos();
	}
}

function deleteTodo( id ) {
	todoTasks = todoTasks.filter( t => t.id !== id );
	saveTodos();
	renderTodos();
}

function clearCompleted() {
	todoTasks = todoTasks.filter( t => !t.completed );
	saveTodos();
	renderTodos();
}

function setFilter( filter ) {
	currentFilter = filter;
	document.querySelectorAll( '.filter-btn' ).forEach( btn => {
		btn.classList.remove( 'active' );
		if ( btn.dataset.filter === filter ) {
			btn.classList.add( 'active' );
		}
	} );
	renderTodos();
}

function getFilteredTasks() {
	switch ( currentFilter ) {
		case 'active':
			return todoTasks.filter( t => !t.completed );
		case 'completed':
			return todoTasks.filter( t => t.completed );
		default:
			return todoTasks;
	}
}

function renderTodos() {
	const filteredTasks = getFilteredTasks();
	const todoList = document.getElementById( 'todoList' );

	todoList.innerHTML = filteredTasks.map( task => `
        <div class="todo-item ${task.completed ? 'completed' : ''}">
            <input type="checkbox" 
                   ${task.completed ? 'checked' : ''}
                   onchange="toggleTodo(${task.id})">
            <span class="todo-text">${task.text}</span>
            <button class="todo-delete" onclick="deleteTodo(${task.id})">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join( '' );

	updateStats();
}

function updateStats() {
	const total = todoTasks.length;
	const completed = todoTasks.filter( t => t.completed ).length;
	const active = total - completed;

	document.getElementById( 'totalCount' ).textContent = total;
	document.getElementById( 'activeCount' ).textContent = active;
	document.getElementById( 'completedCount' ).textContent = completed;
}

function saveTodos() {
	localStorage.setItem( 'todoTasks', JSON.stringify( todoTasks ) );
}

// ===== Виджет погоды (демо версия) =====
function getWeather() {
	const city = document.getElementById( 'cityInput' ).value.trim();
	if ( !city ) return;

	const weatherResult = document.getElementById( 'weatherResult' );
	weatherResult.innerHTML = `
        <div class="weather-loading">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Получение данных для ${city}...</p>
        </div>
    `;

	// В демо-версии используем фиктивные данные
	setTimeout( () => {
		const mockWeather = {
			city: city,
			country: 'RU',
			temperature: Math.floor( Math.random() * 30 ) - 10,
			feelsLike: Math.floor( Math.random() * 30 ) - 10,
			humidity: Math.floor( Math.random() * 100 ),
			windSpeed: ( Math.random() * 15 ).toFixed( 1 ),
			description: ['Солнечно', 'Облачно', 'Дождь', 'Снег'][Math.floor( Math.random() * 4 )]
		};

		renderWeather( mockWeather );
		addWeatherHistory( city );
	}, 1500 );
}

function getLocationWeather() {
	const weatherResult = document.getElementById( 'weatherResult' );
	weatherResult.innerHTML = `
        <div class="weather-loading">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Определение местоположения...</p>
        </div>
    `;

	// В демо-версии используем фиктивные данные
	setTimeout( () => {
		const mockWeather = {
			city: 'Москва',
			country: 'RU',
			temperature: 15,
			feelsLike: 13,
			humidity: 65,
			windSpeed: '3.5',
			description: 'Облачно'
		};

		renderWeather( mockWeather );
		addWeatherHistory( 'Москва (по геолокации)' );
	}, 1500 );
}

function renderWeather( data ) {
	const weatherResult = document.getElementById( 'weatherResult' );
	weatherResult.innerHTML = `
        <div class="weather-card">
            <div class="weather-header">
                <h3>${data.city}, ${data.country}</h3>
                <i class="fas fa-${getWeatherIcon( data.description )}"></i>
            </div>
            <div class="weather-body">
                <div class="weather-temp">
                    <span class="temp-value">${data.temperature}°C</span>
                    <span class="temp-feels">Ощущается как ${data.feelsLike}°C</span>
                </div>
                <div class="weather-details">
                    <p><i class="fas fa-wind"></i> Ветер: ${data.windSpeed} м/с</p>
                    <p><i class="fas fa-tint"></i> Влажность: ${data.humidity}%</p>
                    <p><i class="fas fa-cloud"></i> ${data.description}</p>
                </div>
            </div>
        </div>
    `;
}

function getWeatherIcon( description ) {
	const icons = {
		'Солнечно': 'sun',
		'Облачно': 'cloud',
		'Дождь': 'cloud-rain',
		'Снег': 'snowflake'
	};
	return icons[description] || 'cloud';
}

function addWeatherHistory( city ) {
	const history = JSON.parse( localStorage.getItem( 'weatherHistory' ) ) || [];
	const entry = {
		city: city,
		timestamp: new Date().toLocaleTimeString()
	};

	history.unshift( entry );
	if ( history.length > 5 ) history.pop();

	localStorage.setItem( 'weatherHistory', JSON.stringify( history ) );
	renderWeatherHistory();
}

function renderWeatherHistory() {
	const history = JSON.parse( localStorage.getItem( 'weatherHistory' ) ) || [];
	const historyList = document.getElementById( 'weatherHistory' );

	historyList.innerHTML = history.map( entry => `
        <div class="history-item">
            <span class="history-city">${entry.city}</span>
            <span class="history-time">${entry.timestamp}</span>
        </div>
    `).join( '' );
}

// ===== Викторина =====
let quiz = {
	questions: [],
	currentQuestion: 0,
	score: 0,
	timer: null,
	timeLeft: 30,
	isActive: false
};

// Вопросы для викторины
const quizQuestions = [
	{
		question: "Что выведет console.log(typeof null)?",
		answers: ["null", "object", "undefined", "string"],
		correct: 1,
		explanation: "typeof null возвращает 'object' - это известная особенность JavaScript"
	},
	{
		question: "Какой метод массива изменяет исходный массив?",
		answers: ["map()", "filter()", "slice()", "sort()"],
		correct: 3,
		explanation: "sort() изменяет исходный массив, остальные возвращают новый"
	},
	{
		question: "Что такое 'use strict' в JavaScript?",
		answers: [
			"Директива для использования строгого режима",
			"Комментарий для лучшей читаемости",
			"Функция для проверки типов",
			"Ключевое слово для классов"
		],
		correct: 0,
		explanation: "'use strict' включает строгий режим выполнения кода"
	}
];

function startQuiz() {
	const count = parseInt( document.getElementById( 'questionCount' ).value ) || 5;
	const time = parseInt( document.getElementById( 'timePerQuestion' ).value ) || 30;

	quiz.questions = quizQuestions.slice( 0, Math.min( count, quizQuestions.length ) );
	quiz.currentQuestion = 0;
	quiz.score = 0;
	quiz.timeLeft = time;
	quiz.isActive = true;

	document.getElementById( 'quizStart' ).classList.add( 'hidden' );
	document.getElementById( 'quizContainer' ).classList.remove( 'hidden' );
	document.getElementById( 'quizResult' ).classList.add( 'hidden' );

	showQuestion();
	startTimer();
}

function showQuestion() {
	if ( quiz.currentQuestion >= quiz.questions.length ) {
		finishQuiz();
		return;
	}

	const question = quiz.questions[quiz.currentQuestion];

	document.getElementById( 'questionText' ).textContent = question.question;
	document.getElementById( 'currentQuestion' ).textContent = quiz.currentQuestion + 1;
	document.getElementById( 'totalQuestions' ).textContent = quiz.questions.length;
	document.getElementById( 'score' ).textContent = quiz.score;

	const answersContainer = document.getElementById( 'answersContainer' );
	answersContainer.innerHTML = question.answers.map( ( answer, index ) => `
        <button class="answer-btn" onclick="selectAnswer(${index})">
            ${answer}
        </button>
    `).join( '' );

	document.getElementById( 'nextBtn' ).disabled = true;
	quiz.timeLeft = parseInt( document.getElementById( 'timePerQuestion' ).value );
	document.getElementById( 'timer' ).textContent = quiz.timeLeft;
}

function selectAnswer( index ) {
	if ( !quiz.isActive ) return;

	const question = quiz.questions[quiz.currentQuestion];
	const isCorrect = index === question.correct;

	// Отметка выбранного ответа
	const buttons = document.querySelectorAll( '.answer-btn' );
	buttons.forEach( ( btn, i ) => {
		if ( i === question.correct ) {
			btn.classList.add( 'correct' );
		}
		if ( i === index && !isCorrect ) {
			btn.classList.add( 'wrong' );
		}
		btn.disabled = true;
	} );

	// Добавление очков
	if ( isCorrect ) {
		quiz.score += 10;
		document.getElementById( 'score' ).textContent = quiz.score;
	}

	// Показать объяснение
	const explanation = document.createElement( 'div' );
	explanation.className = 'question-explanation';
	explanation.innerHTML = `<p><i class="fas fa-info-circle"></i> ${question.explanation}</p>`;
	document.getElementById( 'answersContainer' ).appendChild( explanation );

	// Остановить таймер и разрешить следующий вопрос
	clearInterval( quiz.timer );
	document.getElementById( 'nextBtn' ).disabled = false;
}

function nextQuestion() {
	quiz.currentQuestion++;
	if ( quiz.currentQuestion < quiz.questions.length ) {
		showQuestion();
		startTimer();
	} else {
		finishQuiz();
	}
}

function skipQuestion() {
	clearInterval( quiz.timer );
	quiz.currentQuestion++;
	if ( quiz.currentQuestion < quiz.questions.length ) {
		showQuestion();
		startTimer();
	} else {
		finishQuiz();
	}
}

function startTimer() {
	clearInterval( quiz.timer );
	quiz.timeLeft = parseInt( document.getElementById( 'timePerQuestion' ).value );
	document.getElementById( 'timer' ).textContent = quiz.timeLeft;

	quiz.timer = setInterval( () => {
		quiz.timeLeft--;
		document.getElementById( 'timer' ).textContent = quiz.timeLeft;

		if ( quiz.timeLeft <= 0 ) {
			clearInterval( quiz.timer );
			skipQuestion();
		}
	}, 1000 );
}

function finishQuiz() {
	clearInterval( quiz.timer );
	quiz.isActive = false;

	const percentage = Math.round( ( quiz.score / ( quiz.questions.length * 10 ) ) * 100 );
	let message = '';

	if ( percentage >= 80 ) {
		message = 'Отлично! Вы настоящий эксперт JavaScript! 🎉';
	} else if ( percentage >= 60 ) {
		message = 'Хорошо! Продолжайте практиковаться! 👍';
	} else {
		message = 'Есть над чем поработать! Не сдавайтесь! 💪';
	}

	document.getElementById( 'quizResult' ).innerHTML = `
        <h3>Викторина завершена!</h3>
        <div class="result-stats">
            <p>Ваш результат: <strong>${quiz.score} очков</strong></p>
            <p>Правильных ответов: ${Math.round( quiz.score / 10 )} из ${quiz.questions.length}</p>
            <p>Процент успеха: ${percentage}%</p>
            <p>${message}</p>
        </div>
        <button class="btn btn-primary" onclick="restartQuiz()">
            <i class="fas fa-redo"></i> Пройти еще раз
        </button>
    `;

	document.getElementById( 'quizContainer' ).classList.add( 'hidden' );
	document.getElementById( 'quizResult' ).classList.remove( 'hidden' );
}

function restartQuiz() {
	document.getElementById( 'quizResult' ).classList.add( 'hidden' );
	document.getElementById( 'quizStart' ).classList.remove( 'hidden' );
}

// ===== Конвертер валют =====
const exchangeRates = {
	USD: { RUB: 90.50, EUR: 0.92, GBP: 0.79, JPY: 148.50 },
	EUR: { RUB: 98.30, USD: 1.09, GBP: 0.86, JPY: 161.20 },
	RUB: { USD: 0.011, EUR: 0.010, GBP: 0.0087, JPY: 1.64 },
	GBP: { RUB: 114.80, USD: 1.27, EUR: 1.16, JPY: 187.90 },
	JPY: { RUB: 0.61, USD: 0.0067, EUR: 0.0062, GBP: 0.0053 }
};

function convertCurrency() {
	const amount = parseFloat( document.getElementById( 'amountInput' ).value );
	const from = document.getElementById( 'fromCurrency' ).value;
	const to = document.getElementById( 'toCurrency' ).value;

	if ( isNaN( amount ) || amount <= 0 ) {
		alert( 'Введите корректную сумму' );
		return;
	}

	let result;
	if ( from === to ) {
		result = amount;
	} else if ( exchangeRates[from] && exchangeRates[from][to] ) {
		result = amount * exchangeRates[from][to];
	} else if ( exchangeRates[to] && exchangeRates[to][from] ) {
		result = amount / exchangeRates[to][from];
	} else {
		alert( 'Курс для данной пары валют не найден' );
		return;
	}

	document.getElementById( 'resultOutput' ).value = result.toFixed( 2 );
	document.getElementById( 'exchangeRate' ).textContent =
		`1 ${from} = ${( from === to ? 1 : exchangeRates[from][to] || ( 1 / exchangeRates[to][from] ) ).toFixed( 2 )} ${to}`;

	addConversionHistory( amount, from, result.toFixed( 2 ), to );
}

function swapCurrencies() {
	const from = document.getElementById( 'fromCurrency' );
	const to = document.getElementById( 'toCurrency' );

	const tempValue = from.value;
	from.value = to.value;
	to.value = tempValue;

	// Обновляем результат после обмена
	convertCurrency();
}

function addConversionHistory( amount, from, result, to ) {
	const history = JSON.parse( localStorage.getItem( 'conversionHistory' ) ) || [];
	const entry = {
		amount: amount,
		from: from,
		result: result,
		to: to,
		timestamp: new Date().toLocaleTimeString()
	};

	history.unshift( entry );
	if ( history.length > 10 ) history.pop();

	localStorage.setItem( 'conversionHistory', JSON.stringify( history ) );
	renderConversionHistory();
}

function renderConversionHistory() {
	const history = JSON.parse( localStorage.getItem( 'conversionHistory' ) ) || [];
	const historyList = document.getElementById( 'historyList' );

	historyList.innerHTML = history.map( entry => `
        <div class="history-item">
            <span>${entry.amount} ${entry.from} → ${entry.result} ${entry.to}</span>
            <span class="history-time">${entry.timestamp}</span>
        </div>
    `).join( '' );
}

// ===== Pomodoro Таймер =====
let pomodoro = {
	timer: null,
	timeLeft: 25 * 60, // 25 минут в секундах
	isRunning: false,
	isWorkTime: true,
	sessions: 0,
	workDuration: 25 * 60,
	breakDuration: 5 * 60,
	longBreakDuration: 15 * 60
};

function toggleTimer() {
	const startBtn = document.getElementById( 'startBtn' );

	if ( !pomodoro.isRunning ) {
		pomodoro.isRunning = true;
		startBtn.innerHTML = '<i class="fas fa-pause"></i> Пауза';
		startTimer();
	} else {
		pomodoro.isRunning = false;
		startBtn.innerHTML = '<i class="fas fa-play"></i> Продолжить';
		clearInterval( pomodoro.timer );
	}
}

function startTimer() {
	clearInterval( pomodoro.timer );

	pomodoro.timer = setInterval( () => {
		pomodoro.timeLeft--;
		updateTimerDisplay();

		if ( pomodoro.timeLeft <= 0 ) {
			clearInterval( pomodoro.timer );
			pomodoro.isRunning = false;
			document.getElementById( 'startBtn' ).innerHTML = '<i class="fas fa-play"></i> Старт';

			// Оповещение о завершении сессии
			if ( 'Notification' in window && Notification.permission === 'granted' ) {
				new Notification(
					pomodoro.isWorkTime ? 'Время работы окончено!' : 'Перерыв окончен!',
					{ body: pomodoro.isWorkTime ? 'Время сделать перерыв!' : 'Время вернуться к работе!' }
				);
			} else if ( 'Audio' in window ) {
				const audio = new Audio( 'https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3' );
				audio.play();
			}

			// Переключение между работой и перерывом
			pomodoro.isWorkTime = !pomodoro.isWorkTime;

			if ( pomodoro.isWorkTime ) {
				pomodoro.sessions++;
				pomodoro.timeLeft = pomodoro.workDuration;
				document.getElementById( 'timerLabel' ).textContent = 'Работа';
				addSession();
			} else {
				// Каждые 4 сессии - длинный перерыв
				const breakTime = pomodoro.sessions % 4 === 0 ?
					pomodoro.longBreakDuration : pomodoro.breakDuration;
				pomodoro.timeLeft = breakTime;
				document.getElementById( 'timerLabel' ).textContent =
					pomodoro.sessions % 4 === 0 ? 'Длинный перерыв' : 'Отдых';
			}

			updateTimerDisplay();
		}
	}, 1000 );
}

function resetTimer() {
	clearInterval( pomodoro.timer );
	pomodoro.isRunning = false;
	pomodoro.isWorkTime = true;
	pomodoro.timeLeft = pomodoro.workDuration;

	document.getElementById( 'startBtn' ).innerHTML = '<i class="fas fa-play"></i> Старт';
	document.getElementById( 'timerLabel' ).textContent = 'Работа';
	updateTimerDisplay();
}

function skipSession() {
	clearInterval( pomodoro.timer );
	pomodoro.isRunning = false;
	pomodoro.isWorkTime = !pomodoro.isWorkTime;

	if ( pomodoro.isWorkTime ) {
		pomodoro.timeLeft = pomodoro.workDuration;
		document.getElementById( 'timerLabel' ).textContent = 'Работа';
	} else {
		const breakTime = pomodoro.sessions % 4 === 0 ?
			pomodoro.longBreakDuration : pomodoro.breakDuration;
		pomodoro.timeLeft = breakTime;
		document.getElementById( 'timerLabel' ).textContent =
			pomodoro.sessions % 4 === 0 ? 'Длинный перерыв' : 'Отдых';
	}

	document.getElementById( 'startBtn' ).innerHTML = '<i class="fas fa-play"></i> Старт';
	updateTimerDisplay();
}

function updateTimerDisplay() {
	const minutes = Math.floor( pomodoro.timeLeft / 60 );
	const seconds = pomodoro.timeLeft % 60;

	document.getElementById( 'timerMinutes' ).textContent =
		minutes.toString().padStart( 2, '0' );
	document.getElementById( 'timerSeconds' ).textContent =
		seconds.toString().padStart( 2, '0' );
}

function addSession() {
	const sessions = JSON.parse( localStorage.getItem( 'pomodoroSessions' ) ) || [];
	const session = {
		timestamp: new Date().toLocaleString(),
		duration: pomodoro.workDuration / 60
	};

	sessions.push( session );
	if ( sessions.length > 10 ) sessions.shift();

	localStorage.setItem( 'pomodoroSessions', JSON.stringify( sessions ) );
	renderSessions();
}

function renderSessions() {
	const sessions = JSON.parse( localStorage.getItem( 'pomodoroSessions' ) ) || [];
	const sessionsList = document.getElementById( 'sessionsList' );

	sessionsList.innerHTML = sessions.map( session => `
        <div class="session-item">
            <span>Сессия: ${session.duration} мин</span>
            <span class="session-time">${session.timestamp}</span>
        </div>
    `).join( '' );
}

// Обновление настроек Pomodoro
function updateSettings() {
	pomodoro.workDuration = parseInt( document.getElementById( 'workTime' ).value ) * 60;
	pomodoro.breakDuration = parseInt( document.getElementById( 'breakTime' ).value ) * 60;
	pomodoro.longBreakDuration = parseInt( document.getElementById( 'longBreakTime' ).value ) * 60;

	if ( !pomodoro.isRunning ) {
		resetTimer();
	}
}

// Инициализация при загрузке страницы
document.addEventListener( 'DOMContentLoaded', function () {
	// Инициализация ToDo
	renderTodos();
	renderWeatherHistory();
	renderConversionHistory();
	renderSessions();

	// Обработчики для фильтров ToDo
	document.querySelectorAll( '.filter-btn' ).forEach( btn => {
		btn.addEventListener( 'click', function () {
			setFilter( this.dataset.filter );
		} );
	} );

	// Обработчик Enter для ToDo
	document.getElementById( 'todoInput' ).addEventListener( 'keypress', function ( e ) {
		if ( e.key === 'Enter' ) addTodo();
	} );

	// Обработчик Enter для погоды
	document.getElementById( 'cityInput' ).addEventListener( 'keypress', function ( e ) {
		if ( e.key === 'Enter' ) getWeather();
	} );

	// Обработчики для настроек Pomodoro
	document.getElementById( 'workTime' ).addEventListener( 'change', updateSettings );
	document.getElementById( 'breakTime' ).addEventListener( 'change', updateSettings );
	document.getElementById( 'longBreakTime' ).addEventListener( 'change', updateSettings );

	// Запрос разрешения на уведомления
	if ( 'Notification' in window && Notification.permission === 'default' ) {
		Notification.requestPermission();
	}

	// Инициализация таймера Pomodoro
	updateTimerDisplay();
} );