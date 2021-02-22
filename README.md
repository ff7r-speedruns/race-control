# FF7 Remake Speedrun Races - OBS Scenes

This repository contains the OBS scenes for the FF7 Remake Speedrun Community Races. These are provided to the community for us in speedrun events and races.

There are separate scene collections based on number of runners as well as a scene collection for the runners to use to make restreaming easier. This contains no images or complex settings, so can just be imported directly into OBS from the Scenes menu.

- [3 Runners.json](3 Runners.json) - Layout for 3 runners
- [4 Runners.json](4 Runners.json) - Layout for 4 runners
- [5 Runners.json](5 Runners.json) - Layout for 5 runners
- [Runner Layout.json](Runner Layout.json) - A layout to be used by the runners on their own streams to make it easier.

## Installation

All layouts can be imported from the Scene Collections menu in OBS. This will import all the scenes, however it won't correctly use the images, background video and music.

### Race Layouts

There are images that will need to have their filename/location set in OBS after import. The resources are all in the [resources](resources) directory.

- `img: Logo` should be `logo.png`
- `img: In-Game` should be `ingame.jpg`

There is a background video on the `source: Background` scene. This should be updated to be `background.webm`.

On the `scene: Holding`, `scene: Be Right Back` and `scene: Ending` scenes, there are music files. These have not been distributed with the scene collection due to copyright, feel free to use your own versions of these or other music.

All the main graphics overlays are generated from a custom [NodeCG application](https://github.com/ff7r-speedruns/race-control). Setup instructions are in that package. The race control application will also control timers and switch between some OBS scenes.

### Runner Layout

This is a layout the racers can use on their own streams. There is no extra installation steps required as it does not have any images.

## Usage

### Race Layouts

The scenes are split into 2 sections, scenes and sources. The layouts make heavy use of scenes as sources inside other scenes.

The scenes are prefixed with `scene: ` and are what you should switch between. There are scenes for Holding/Waiting Start, Interviews, Interviews with a Host, Be Right Back and Ending scenes. These all heavily rely on the graphics output from Race Control.

The Race and Player scenes are intended to be switched between by Race Control, you should only need to switch to `scene: Race` at the start of the race.

The main effort in setting up a race is in configuring the Player and Camera sources. There are a few approaches you can take with this:

1. Runners use the standard `Runner Layout.json` layout. This gives a 640 x 480 camera and 1280x720 game input.
2. Runners use their own normal layouts. Camera and game sizes can vary, but this is more flexible and easier for casual races.
3. Runners stream full game output and audio to their own stream, and camera/talking is brought in via Discord calls or OBS Ninja. This was used by ESA Winter 2021, it has benefits and drawbacks.

In all cases, you will want to add a new Browser source to the relevant `source: Player X` scene, this should be 1920x1080 and the URL should be `https://player.twitch.tv/?channel=CHANNELNAME&parent=twitch.tv`. When it's brought in, interact with the browser and set the quality to the highest bitrate instead of auto.

You can now crop this source (use alt + the drag handles; or the Transformation settings) to reduce it to just the camera. Once that's done, scale it up to the full-size of the scene.

Now on the relevant `source: Player X Cam` add a browser source, select the source you previously added from the list. Now crop this one to the runner's camera. The camera is intended to be a 4:3 ratio, the pink section on the right will not be shown, but their camera should fill the rest of the scene. If they don't have a camera, just put their Twitch channel logo or anything else!

The interview sources are set to the player cameras, the only special one is Player 6, if you are the host, this should be your webcam, or it can be the host's twitch stream/camera.

#### Audio

You have two options for audio. You can have all runners send their game audio, mic audio and discord audio through to their stream, and ensure they have the volume balanced; or you can use OBS Ninja or Discord for microphone/voice chat; and have only game audio on the streams.

If you choose to do audio through Discord/OBS Ninja, then you will want to put a delay on it in Advanced Audio Properties that is about the same as the stream delay.

It's more complicated to do separate audio, but does give you more control over voice and in-game audio.

### Runner Layout

The runner layout is made up of one scene for the actual layout you will stream and another 3 scenes to be used as sources.

- `[race] Stream` - This is the scene you need to Stream during the race. It has your camera, game and own-content in the right places. You don't need to modify it.
- `[race] Camera` - This is where you should add your camera. It should fully overlap the blue area and the resolution will be 640x480.
- `[race] Game` - Your game capture should be on this scene, it should be the full size of the scene.
- `Your Content` - Put anything you like here - messages for people to watch the multi-stream, or splits, or anything you like!

Once you've set up the layout, you can check it's OK on the `[race] Stream` scene.

Depending on how the organiser of the run wants to do audio, you will either need to add Discord, your Microphone and In-Game audio to OBS, and set volume levels appropriately; or just have your game audio.

## Tips and Advice

Some tips and advice for broadcasters and runners:

- Stream at 6mbps 1920x1080 with either 30 or 60 FPS.
- If you're going to use OBS Ninja/Discord for camera/audio, remember you'll need a delay!
- If using your own layout, please don't crop the game or scale it to a different ratio.

## License

The MIT License (MIT)

Copyright (c) 2021 Jessica Smith

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.