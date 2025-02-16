const problems = {
    easy: [
        {
            vertices: ['A', 'B', 'C', 'D'],
            edges: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A'], ['A', 'C']],
            solution: ['A', 'B', 'C', 'D'],
            image: 'easy1.png' 
        },
        {
            vertices: ['A', 'B', 'C'],
            edges: [['A', 'B'], ['B', 'C'], ['C', 'A']],
            solution: ['A', 'B', 'C'],
            image: 'easy3.png' 
        },
        {
            vertices: ['A', 'B', 'C', 'D'],
            edges: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A']],
            solution: ['A', 'B', 'C', 'D'],
            image: 'easy2.png' 
        }
    ],
    medium: [
        {
            vertices: ['A', 'B', 'C', 'D', 'E'],
            edges: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'E'], ['E', 'A'], ['A', 'C'], ['C', 'E']],
            solution: ['A', 'B', 'C', 'D', 'E'],
            image: 'medium1.png' 
        },
        {
            vertices: ['A', 'B', 'C', 'D', 'E'],
            edges: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'E'], ['E', 'A'], ['A', 'D'], ['B', 'E']],
            solution: ['A', 'B', 'C', 'D', 'E'],
            image: 'medium3.png' 
        },
        {
            vertices: ['A', 'B', 'C', 'D', 'E'],
            edges: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'E'], ['E', 'A'], ['A', 'D']],
            solution: ['A', 'B', 'C', 'D', 'E'],
            image: 'medium2.png' 
        }
    ],
    hard: [
        {
            vertices: ['A', 'B', 'C', 'D', 'E', 'F'],
            edges: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'E'], ['E', 'F'], ['F', 'A'], ['A', 'D'], ['B', 'E'], ['C', 'F']],
            solution: ['A', 'B', 'C', 'D', 'E', 'F'],
            image: 'hard1.png' 
        },
        {
            vertices: ['A', 'B', 'C', 'D', 'E', 'F'],
            edges: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'E'], ['E', 'F'], ['F', 'A'], ['A', 'C'], ['B', 'E'], ['D', 'F']],
            solution: ['A', 'B', 'C', 'D', 'E', 'F'],
            image: 'hard2.png' 
        }
    ]
};

let currentDifficulty = 'easy';
let currentIndex = 0;

function getProblem() {
    const problemSet = problems[currentDifficulty];
    if (currentIndex < problemSet.length) {
        const problem = problemSet[currentIndex];
        currentProblem = problem;

        document.getElementById('problemDescription').textContent =
            `Problem ${currentIndex + 1} in ${currentDifficulty} difficulty: Find a Hamiltonian path in this graph.`;

        document.getElementById('solution').value = '';
        document.getElementById('feedback').textContent = '';
        document.getElementById('tryAnother').classList.add('hidden');

        const graphDiv = document.getElementById('graph');
        graphDiv.innerHTML = `<img src="images/${problem.image}" alt="Graph">`;
    } else {
        alert(`You have completed all problems in the ${currentDifficulty} difficulty!`);
    }
}

function checkSolution() {
    const userSolution = document.getElementById('solution').value.toUpperCase().split('');
    const feedback = document.getElementById('feedback');

    if (userSolution.length !== currentProblem.vertices.length) {
        feedback.textContent = "Incorrect. Path must visit each vertex exactly once.";
        return;
    }

    const uniqueVertices = new Set(userSolution);
    if (uniqueVertices.size !== currentProblem.vertices.length) {
        feedback.textContent = "Incorrect. Each vertex must be visited exactly once.";
        return;
    }

    let isValid = true;
    for (let i = 0; i < userSolution.length - 1; i++) {
        const edge = [userSolution[i], userSolution[i + 1]];
        const edgeExists = currentProblem.edges.some(([v1, v2]) =>
            (v1 === edge[0] && v2 === edge[1]) || (v1 === edge[1] && v2 === edge[0])
        );
        if (!edgeExists) {
            isValid = false;
            break;
        }
    }

    if (isValid) {
        feedback.textContent = `Correct! You found a valid Hamiltonian path! : ${userSolution.join('')}`;
        document.getElementById('tryAnother').classList.remove('hidden');
        currentIndex++;
    } else {
        feedback.textContent = "Incorrect. The path must follow existing edges.";
    }
}

document.getElementById('getProblem').addEventListener('click', () => {
    const difficultySelect = document.getElementById('difficulty');
    currentDifficulty = difficultySelect.value;
    currentIndex = 0;
    getProblem();
});

document.getElementById('submitSolution').addEventListener('click', checkSolution);
document.getElementById('tryAnother').addEventListener('click', getProblem);

// Initialize the first problem
getProblem();
