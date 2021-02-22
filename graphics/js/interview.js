let interviewData = [];

nodecg.Replicant('interview').on('change', (newValue, oldValue) => {
    interviewData = newValue;
    updateInterviewData();
});

function updateInterviewData()
{
    if (!interviewData) {
        return;
    }
    document.querySelectorAll('div.person').forEach((panel) => {
        let index = panel.getAttribute('data-index');
        if (interviewData[index] == undefined) {
            return;
        }

        const data = interviewData[index];

        const name = panel.querySelector('[data-type=name]');
        const twitch = panel.querySelector('[data-type=twitch]');
        const twitchcontainer = panel.querySelector('.twitch');
        const pronouns = panel.querySelector('[data-type=pronouns]');

        if (data.twitch) {
            twitchcontainer.style.display = 'block';
            twitch.innerText = data.twitch;
        } else {
            twitchcontainer.style.display = 'none';
        }
        if (data.pronouns) {
            pronouns.style.display = 'block';
            pronouns.innerText = data.pronouns;
        } else {
            pronouns.style.display = 'none';
        }
        name.innerText = data.name;
    });
}

updateInterviewData();