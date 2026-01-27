/**
 * Дополнительные компоненты для страницы Git
 * Расширяет базовые компоненты
 */

const GitPageExtensions = {
	init() {
		if ( !window.location.pathname.includes( 'Git.html' ) ) return;

		console.log( '%c🔧 Инициализация Git-расширений', 'color: #48bb78;' );

		this.initGitSimulator();
		this.initInteractiveBranches();
	},

	initGitSimulator() {
		const simulateBtn = document.querySelector( '#simulateGitCommands' );
		if ( !simulateBtn ) return;

		simulateBtn.addEventListener( 'click', () => {
			this.runSimulation();
		} );
	},

	runSimulation() {
		const output = document.getElementById( 'gitSimulationOutput' );
		if ( !output ) return;

		const steps = [
			{ cmd: 'git init', out: 'Initialized empty Git repository', delay: 500 },
			{ cmd: 'echo "# Project" > README.md', out: '', delay: 300 },
			{ cmd: 'git status', out: 'Untracked files: README.md', delay: 600 },
			{ cmd: 'git add README.md', out: '', delay: 300 },
			{ cmd: 'git commit -m "Initial"', out: '[main] Initial commit', delay: 800 }
		];

		let html = '<div class="console-output"><h4>🚀 Симуляция Git...</h4>';
		output.innerHTML = html;

		steps.forEach( ( step, i ) => {
			setTimeout( () => {
				html += `<div class="console-line"><span style="color:#48bb78;">$ ${step.cmd}</span></div>`;
				if ( step.out ) html += `<div class="console-line info">${step.out}</div>`;
				output.innerHTML = html;
				output.scrollTop = output.scrollHeight;
			}, i * 1000 );
		} );

		setTimeout( () => {
			html += '<div class="console-line success">✅ Готово!</div>';
			output.innerHTML = html;
		}, steps.length * 1000 );
	},

	initInteractiveBranches() {
		const diagram = document.getElementById( 'gitBranchDiagram' );
		if ( !diagram ) return;

		diagram.innerHTML = `
            <div class="branch-diagram">
                <div class="branch main">main</div>
                <div class="branch feature">feature/login</div>
                <div class="branch hotfix">hotfix/bug</div>
            </div>
        `;

		diagram.querySelectorAll( '.branch' ).forEach( branch => {
			branch.addEventListener( 'click', function () {
				const name = this.textContent;
				alert( `Ветка: ${name}\nКоманда: git checkout ${name}` );
			} );
		} );
	}
};

// Автоматически инициализируем при загрузке Git страницы
if ( window.location.pathname.includes( 'Git.html' ) ) {
	document.addEventListener( 'DOMContentLoaded', () => {
		GitPageExtensions.init();
	} );
}

window.GitPageExtensions = GitPageExtensions;