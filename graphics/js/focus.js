nodecg.Replicant('title').on('change', (newValue, oldValue) => {
    title.innerText = newValue;
});

const timerReplicant = nodecg.Replicant('timer');


// Page index -> runner index
let runnerLookup = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4
}

nodecg.listenFor('video.switch', (index) => {
    switch (index) {
        case 2:
            runnerLookup = {
                0: 1,
                1: 0,
                2: 2,
                3: 3,
                4: 4
            }
            break;
        case 3:
            runnerLookup = {
                0: 2,
                1: 0,
                2: 1,
                3: 3,
                4: 4
            }
            break;
        case 4:
            runnerLookup = {
                0: 3,
                1: 0,
                2: 1,
                3: 2,
                4: 4
            }
            break;
        case 5:
            runnerLookup = {
                0: 4,
                1: 0,
                2: 1,
                3: 2,
                4: 3
            }
            break;
        case 1:
        default:
            runnerLookup = {
                0: 0,
                1: 1,
                2: 2,
                3: 3,
                4: 4
            }
            break;
    }
    updateRunners();
});

NodeCG.waitForReplicants(timerReplicant).then(() => {
    setInterval(() => {
        if (timerReplicant.value.state == 'new') {
            timer.innerText = '';

        } else {
            let end = Date.now();
            if (timerReplicant.value.state == 'stopped') {
                end = timerReplicant.value.end;
            }
            let elapsed = end - timerReplicant.value.start;
            let diff = new Date(elapsed);
            timer.innerText = ("0" + diff.getUTCHours()).slice(-2) + ":" + ("0" + diff.getMinutes()).slice(-2) + ':' + ("0" + diff.getSeconds()).slice(-2); 
        }
    }, 100)
});
const runnersReplicant = nodecg.Replicant('runners');

let runners = {};

runnersReplicant.on('change', (newValue, oldValue) => {
    runners = newValue;
    updateRunners();
});

function updateRunners()
{
    document.querySelectorAll('div[data-index]').forEach((element) => {
        const index = parseInt(element.getAttribute('data-index'));
        const name = element.querySelector('[data-type=name]');
        const time = element.querySelector('[data-type=time]');

        let runnerIndex = runnerLookup[index];

        if (!runners[runnerIndex]) {
            runners[runnerIndex] = {
                name: '',
                start: null,
                end: null
            }
        }

        name.innerText = runners[runnerIndex].name;
        if (runners[runnerIndex].start && runners[runnerIndex].end) {
            let diff = new Date(runners[runnerIndex].end - runners[runnerIndex].start);
            time.innerText = ("0" + diff.getUTCHours()).slice(-2) + ":" + ("0" + diff.getMinutes()).slice(-2) + ':' + ("0" + diff.getSeconds()).slice(-2); 
            time.style.display = 'block';
        } else {
            time.style.display = 'none';
            time.innerText = '';
        }
    });
}