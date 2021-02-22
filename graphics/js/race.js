const titleReplicant = nodecg.Replicant('title');
titleReplicant.on('change', (newValue, oldValue) => {
    title.innerText = newValue;
});

const timerReplicant = nodecg.Replicant('timer');
const runnersReplicant = nodecg.Replicant('runners');

let runners = [];

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

runnersReplicant.on('change', (newValue, oldValue) => {
    runners = newValue;
    updateRunners();
});

function updateRunners() {
    document.querySelectorAll('div[data-index]').forEach((element) => {
        const index = element.getAttribute('data-index');

        const name = element.querySelector('[data-type=name]');
        const audio = element.querySelector('[data-type=audio]');
        const time = element.querySelector('[data-type=time]');

        if (!runners[index]) {
            runners[index] = {
                name: '',
                start: null,
                end: null,
                audio: false,
                focus: false
            }
        }

        name.innerText = runners[index].name;
        if (runners[index].audio) {
            audio.style.display = 'inline-block';
        } else {
            audio.style.display = 'none';
        }

        if (runners[index].start && runners[index].end) {
            let diff = new Date(runners[index].end - runners[index].start);
            time.innerText = ("0" + diff.getUTCHours()).slice(-2) + ":" + ("0" + diff.getMinutes()).slice(-2) + ':' + ("0" + diff.getSeconds()).slice(-2); 
            time.style.display = 'block';
        } else {
            time.style.display = 'none';
            time.innerText = '';
        }
    });
}