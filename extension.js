const {OBSUtility} = require('nodecg-utility-obs');

module.exports = nodecg => {
    const obs = new OBSUtility(nodecg);

    obsSourcesReplicant = nodecg.Replicant('obs.sources', 'ff7remake');
    obsScenesReplicant = nodecg.Replicant('obs.scenes', 'ff7remake');
    obsConfigReplicant = nodecg.Replicant('obsconfig', 'ff7remake', {
        defaultValue: {
            audio: [],
            video: []
        },
    });

    function updateOBSSources() {
        nodecg.log.info('Updating sources from OBS');
        obs.send('GetSourcesList').then((data) => {
            obsSourcesReplicant.value = data.sources
        });
    }

    function updateOBSScenes() {
        nodecg.log.info('Updating scenes from OBS');
        obs.send('GetSceneList').then((data) => {
            obsScenesReplicant.value = data.scenes;
        });
    }

    nodecg.listenFor('audio.switch', (data) => {
        for (let i = 0; i < obsConfigReplicant.value.audio.length; i++) {
            if (!obsConfigReplicant.value.audio[i]) {
                continue;
            }
            let mute = true;
            if (i == data) {
                mute = false;
                nodecg.log.info('Switching audio to ' + obsConfigReplicant.value.audio[i]);
            }
            obs.send('SetMute', {
                source: obsConfigReplicant.value.audio[i],
                mute: mute
            });
        }
    });
    

    nodecg.listenFor('video.switch', (data) => {
        if (obsConfigReplicant.value.video[data]) {
            let scene = obsConfigReplicant.value.video[data];
            nodecg.log.info('Switching scene to ' + scene);
            obs.send('SetCurrentScene', {
                'scene-name': scene, 
            });
        }
    })


    // Bind to our OBS events
    obs.on('SourceCreated', updateOBSSources);
    obs.on('SourceDestroyed', updateOBSSources);
    obs.on('SourceRenamed', updateOBSSources);
    obs.on('ScenesChanged', () => {
        updateOBSSources();
        updateOBSScenes();
    });

    nodecg.Replicant('obs:websocket').on('change', (newValue, oldValue) => {
        if (oldValue && oldValue.status == newValue.status) {
            return;
        }
        if (newValue.status == 'connected') {
            updateOBSSources();
            updateOBSScenes();
        }
    })
}