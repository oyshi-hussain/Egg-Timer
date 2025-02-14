const { contextBridge, ipcRenderer } = require('electron');

let bgMusic = null;

contextBridge.exposeInMainWorld('electron', {
    minimizeWindow: () => ipcRenderer.send('minimize-window'),
    closeWindow: () => ipcRenderer.send('close-window'),

    startMusic: () => {
        if (!bgMusic) {
            bgMusic = new Audio("assets/backgroundMusic.mp3");
            bgMusic.loop = true;
            bgMusic.volume = 0.2;
            bgMusic.play();
        }
    },
    stopMusic: () => {
        if (bgMusic) {
            bgMusic.pause();
            bgMusic.currentTime = 0;
            bgMusic = null;
        }
    }


});
