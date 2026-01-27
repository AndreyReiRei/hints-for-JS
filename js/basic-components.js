/**
 * Основные компоненты для всех страниц уроков
 * Табы, аккордеоны, показ решений, подсветка синтаксиса
 * Включая поддержку Git
 */

const LessonComponents = {
	init() {
		console.log( '%c📚 Инициализация компонентов урока', 'color: #4299e1;' );

		this.initTabs();
		this.initAccordions();
		this.initSolutions();
		this.initSyntaxHighlighting();
		this.initGitComponents();
	},

	// ===== ТАБЫ =====
	initTabs() {
		document.querySelectorAll( '.tab-btn' ).forEach( btn => {
			btn.addEventListener( 'click', function () {
				const tabId = this.getAttribute( 'data-tab' );
				const tabsContainer = this.closest( '.tabs' );

				tabsContainer.querySelectorAll( '.tab-btn' ).forEach( b => b.classList.remove( 'active' ) );
				tabsContainer.querySelectorAll( '.tab-content' ).forEach( c => c.classList.remove( 'active' ) );

				this.classList.add( 'active' );
				const tabContent = tabsContainer.querySelector( `#${tabId}` );
				if ( tabContent ) tabContent.classList.add( 'active' );
			} );
		} );
	},

	// ===== АККОРДЕОНЫ =====
	initAccordions() {
		document.querySelectorAll( '.accordion-header' ).forEach( header => {
			header.addEventListener( 'click', function () {
				const content = this.nextElementSibling;
				const icon = this.querySelector( 'i' );

				content.classList.toggle( 'active' );
				if ( icon ) {
					icon.classList.toggle( 'fa-chevron-down' );
					icon.classList.toggle( 'fa-chevron-up' );
				}
			} );
		} );
	},

	// ===== РЕШЕНИЯ =====
	initSolutions() {
		document.querySelectorAll( '.show-solution' ).forEach( btn => {
			btn.addEventListener( 'click', function () {
				const solution = this.nextElementSibling;
				if ( solution && solution.classList.contains( 'solution' ) ) {
					solution.classList.toggle( 'hidden' );
					this.innerHTML = solution.classList.contains( 'hidden' )
						? '<i class="fas fa-code"></i> Показать решение'
						: '<i class="fas fa-eye-slash"></i> Скрыть решение';
				}
			} );
		} );
	},

	// ===== ПОДСВЕТКА СИНТАКСИСА =====
	initSyntaxHighlighting() {
		if ( typeof hljs !== 'undefined' ) {
			const isGitPage = window.location.pathname.includes( 'Git.html' );

			if ( isGitPage ) {
				// Регистрируем bash для Git страницы
				hljs.registerAliases( 'bash', 'shell' );

				document.querySelectorAll( 'pre code' ).forEach( block => {
					if ( !block.className.includes( 'language-' ) ) {
						block.className = 'language-bash';
					}
					hljs.highlightElement( block );
				} );
			} else {
				hljs.highlightAll();
			}
		}
	},

	// ===== КОМПОНЕНТЫ ДЛЯ GIT =====
	initGitComponents() {
		if ( !window.location.pathname.includes( 'Git.html' ) ) return;

		this.initGitExercise();
		this.addGitTooltips();
	},

	initGitExercise() {
		// Обработка кнопки "Проверить команды"
		const checkBtn = document.querySelector( '.btn-primary[onclick*="runGitExercise"]' );
		const clearBtn = document.querySelector( '.btn-secondary[onclick*="clearExercise"]' );

		if ( checkBtn ) {
			checkBtn.removeAttribute( 'onclick' );
			checkBtn.addEventListener( 'click', () => this.runGitExercise() );
		}

		if ( clearBtn ) {
			clearBtn.removeAttribute( 'onclick' );
			clearBtn.addEventListener( 'click', () => {
				const textarea = document.getElementById( 'exerciseCode' );
				const output = document.getElementById( 'exerciseOutput' );

				if ( textarea ) textarea.value = '';
				if ( output ) {
					output.innerHTML = `
                        <div class="output-placeholder">
                            <i class="fas fa-terminal"></i>
                            Результат выполнения команд появится здесь
                        </div>
                    `;
				}
			} );
		}
	},

	runGitExercise() {
		const output = document.getElementById( 'exerciseOutput' );
		const code = document.getElementById( 'exerciseCode' )?.value || '';

		if ( !output ) return;

		const commands = code.split( '\n' ).filter( cmd => cmd.trim() && !cmd.trim().startsWith( '#' ) );
		const hasGitInit = commands.some( cmd => cmd.includes( 'git init' ) || cmd.includes( 'git clone' ) );
		const hasGitAdd = commands.some( cmd => cmd.includes( 'git add' ) );
		const hasGitCommit = commands.some( cmd => cmd.includes( 'git commit' ) );
		const hasGitPush = commands.some( cmd => cmd.includes( 'git push' ) );

		const resultHTML = `
            <div class="exercise-output">
                <h4><i class="fas fa-terminal"></i> Выполнение команд:</h4>
                <div class="output-section">
                    <pre class="output-pre">${code || '// Команды не введены'}</pre>
                </div>
                <div class="test-report">
                    <h4><i class="fas fa-check-circle"></i> Проверка команд Git:</h4>
                    <div class="test-summary">
                        <p><strong>${commands.length}</strong> команд</p>
                        <p><strong>${hasGitInit ? '✓' : '✗'}</strong> Инициализация</p>
                        <p><strong>${hasGitCommit ? '✓' : '✗'}</strong> Коммиты</p>
                    </div>
                    <div class="test-details">
                        <div class="test-result ${hasGitInit ? 'passed' : 'failed'}">
                            <i class="fas fa-${hasGitInit ? 'check' : 'times'}"></i>
                            <span>git init/clone</span>
                            <span class="status">${hasGitInit ? '✓' : '✗'}</span>
                        </div>
                        <div class="test-result ${hasGitAdd ? 'passed' : 'failed'}">
                            <i class="fas fa-${hasGitAdd ? 'check' : 'times'}"></i>
                            <span>git add</span>
                            <span class="status">${hasGitAdd ? '✓' : '✗'}</span>
                        </div>
                        <div class="test-result ${hasGitCommit ? 'passed' : 'failed'}">
                            <i class="fas fa-${hasGitCommit ? 'check' : 'times'}"></i>
                            <span>git commit</span>
                            <span class="status">${hasGitCommit ? '✓' : '✗'}</span>
                        </div>
                        <div class="test-result ${hasGitPush ? 'passed' : 'failed'}">
                            <i class="fas fa-${hasGitPush ? 'check' : 'times'}"></i>
                            <span>git push</span>
                            <span class="status">${hasGitPush ? '✓' : '✗'}</span>
                        </div>
                    </div>
                    <div class="test-warning">
                        <i class="fas fa-info-circle"></i>
                        <p>Для реального выполнения откройте терминал</p>
                    </div>
                </div>
            </div>
        `;

		output.innerHTML = resultHTML;
		output.scrollIntoView( { behavior: 'smooth', block: 'nearest' } );
	},

	addGitTooltips() {
		const style = document.createElement( 'style' );
		style.textContent = `
            .git-tooltip {
                position: relative;
                border-bottom: 1px dashed #667eea;
                cursor: help;
            }
            .git-tooltip:hover::after {
                content: attr(data-tooltip);
                position: absolute;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%);
                background: #2d3748;
                color: white;
                padding: 6px 10px;
                border-radius: 4px;
                font-size: 11px;
                white-space: nowrap;
                z-index: 1000;
                border: 1px solid #4a5568;
            }
            body.dark-theme .git-tooltip:hover::after {
                background: #4a5568;
            }
        `;
		document.head.appendChild( style );
	}
};

document.addEventListener( 'DOMContentLoaded', () => {
	LessonComponents.init();
} );

window.LessonComponents = LessonComponents;