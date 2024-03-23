const players = [];
const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange']; // Add more colors as needed

function addPlayer() {
    const playerName = document.getElementById('playerName').value;
    if (playerName) {
        players.push(playerName);
        document.getElementById('playerName').value = ''; // Clear the input field
        document.getElementById('playerName').focus(); // Refocus on the input field
    } else {
        alert('Please enter a player name.');
    }
}

function startGame() {
    const raceTrack = document.getElementById('raceTrack');
    raceTrack.innerHTML = ''; // Clear previous cars

    players.forEach((player, index) => {
        const car = document.createElement('div');
        car.classList.add('car');
        car.style.backgroundColor = colors[index % colors.length];
        car.setAttribute('data-player', player);

        const playerNameDisplay = document.createElement('span');
        playerNameDisplay.textContent = player;
        playerNameDisplay.classList.add('player-name');
        car.appendChild(playerNameDisplay);

        raceTrack.appendChild(car);
    });

    let interval = setInterval(() => {
        document.querySelectorAll('.car').forEach(car => {
            let currentDistance = parseInt(car.style.left, 10) || 0;
            const moveDistance = Math.random() * 10;
            currentDistance += moveDistance;
            car.style.left = `${currentDistance}px`;

            if (currentDistance >= (raceTrack.offsetWidth - car.offsetWidth)) {
                clearInterval(interval);
                declareWinner(car.getAttribute('data-player'));
            }
        });
    }, 100);
}

function declareWinner(winnerName) {
    document.getElementById('winnerMessage').innerText = winnerName + " wins!";
}
