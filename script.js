const problems = {
    easy: [
        {
            vertices: ['A', 'B', 'C', 'D'],
            edges: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A'], ['A', 'C']],
            solution: ['A', 'B', 'C', 'D']
        }
    ],
    medium: [
        {
            vertices: ['A', 'B', 'C', 'D', 'E'],
            edges: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'E'], ['E', 'A'], ['A', 'C'], ['C', 'E']],
            solution: ['A', 'B', 'C', 'D', 'E']
        }
    ],
    hard: [
        {
            vertices: ['A', 'B', 'C', 'D', 'E', 'F'],
            edges: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'E'], ['E', 'F'], ['F', 'A'], ['A', 'D'], ['B', 'E'], ['C', 'F']],
            solution: ['A', 'B', 'C', 'D', 'E', 'F']
        }
    ]
};

let currentProblem = null;

function getProblem() {
    const difficulty = document.getElementById('difficulty').value;
    currentProblem = problems[difficulty][Math.floor(Math.random() * problems[difficulty].length)];
    document.getElementById('problemDescription').textContent =
        `Find a Hamiltonian path in this ${difficulty} graph`;
    document.getElementById('solution').value = '';
    document.getElementById('feedback').textContent = '';
    document.getElementById('tryAnother').classList.add('hidden');

    // Load the corresponding image
    const graphDiv = document.getElementById('graph');
    graphDiv.innerHTML = `<img src="images/${difficulty}.png" alt="Graph">`; // Replace with actual image paths
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
        feedback.textContent = `Correct! You found a valid Hamiltonian path! : ${userSolution}`;
        document.getElementById('tryAnother').classList.remove('hidden');
    } else {
        feedback.textContent = "Incorrect. The path must follow existing edges.";
    }
}

document.getElementById('getProblem').addEventListener('click', getProblem);
document.getElementById('submitSolution').addEventListener('click', checkSolution);
document.getElementById('tryAnother').addEventListener('click', getProblem);

getProblem();