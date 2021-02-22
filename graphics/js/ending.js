nodecg.Replicant('title').on('change', (newValue, oldValue) => {
    title.innerText = newValue;
});

nodecg.Replicant('ending').on('change', (newValue, oldValue) => {
    ending.innerText = newValue;
});

runners = [];

nodecg.Replicant('runners').on('change', (newValue, oldValue) => {
    runners = [];
    newValue.forEach((runner) => {
        runners.push(runner);
    });
});

setInterval(() => {
    console.log(runners);
    let filtered = runners.filter((runner, index) => {
        return runner.name && runner.start && runner.end;
    });

    console.log(filtered);
    
    filtered.sort((alpha, bravo) => {
        return alpha.end - bravo.end;
    });

    const scoreContainer = document.querySelector('#runners');
    scoreContainer.setAttribute('data-runners', filtered.length);
    
    document.querySelectorAll('div[data-index]').forEach((element) => {
        const index = parseInt(element.getAttribute('data-index'));

        let name = element.querySelector("div[data-type=name]");
        let timer = element.querySelector("div[data-type=timer]");

        if (!filtered[index]) {
            element.style.display = 'none';
            name.innerText = '';
            timer.innerText = '';
            return;
        }
        
        name.innerText = filtered[index].name;

        let diff = new Date(filtered[index].end - filtered[index].start);
        timer.innerText = ("0" + diff.getUTCHours()).slice(-2) + ":" + ("0" + diff.getMinutes()).slice(-2) + ':' + ("0" + diff.getSeconds()).slice(-2); 
        
        element.style.display = 'block';
    });
}, 100);