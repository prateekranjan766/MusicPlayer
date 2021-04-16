import React, { useState, useRef } from 'react';
import './App.css';
const App = () => {
  const songs = ['battleSymphony', "itachi'sTheme", 'rise'];

  const myAudio = useRef();

  const [songNo, setSongNo] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const playSong = () => {
    setPlaying(true);
    myAudio.current.play();
  };
  const pauseSong = () => {
    setPlaying(false);
    myAudio.current.pause();
  };

  const togglePlay = () => {
    if (playing) {
      pauseSong();
    } else {
      playSong();
    }
  };

  const prevSong = () => {
    if (songNo === 0) {
      setSongNo(songs.length - 1);
    } else {
      setSongNo(songNo - 1);
    }
    setTimeout(() => {
      playSong();
    }, 1000);
  };

  const nextSong = () => {
    if (songNo === songs.length - 1) {
      setSongNo(0);
    } else {
      setSongNo(songNo + 1);
    }
    setTimeout(() => {
      playSong();
    }, 1000);
  };

  const updateProgress = () => {
    const { duration, currentTime } = myAudio.current;
    const progressPrecent = (currentTime / duration) * 100;
    setProgress(progressPrecent);
  };

  const changeProgress = (e) => {
    const { duration } = myAudio.current;
    const width = e.target.clientWidth;
    const offsetX = e.nativeEvent.offsetX;

    myAudio.current.currentTime = (offsetX / width) * duration;
    const progressPrecent = (myAudio.current.currentTime / duration) * 100;
    setProgress(progressPrecent);
  };

  return (
    <div className='music-player'>
      <h1>Music Player</h1>
      <div className={playing ? 'music-container play' : 'music-container'}>
        <div className='music-info'>
          <div className='title'>{songs[songNo]}</div>
          <div
            className='progress-container'
            onClick={(e) => changeProgress(e)}
          >
            <div className='progress' style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <audio
          onTimeUpdate={updateProgress}
          onEnded={nextSong}
          ref={myAudio}
          src={`/audios/${songs[songNo]}.mp3`}
        ></audio>

        <div className='img-container'>
          <img src={`/images/${songs[songNo]}.jpg`} alt={songs[songNo]}></img>
        </div>

        <div className='navigation'>
          <button className='prev' onClick={prevSong}>
            <i className='fas fa-backward'></i>
          </button>
          <button className='play btn-big' onClick={togglePlay}>
            {playing ? (
              <i className='fas fa-pause'></i>
            ) : (
              <i className='fas fa-play'></i>
            )}
          </button>
          <button className='next' onClick={nextSong}>
            <i className='fas fa-forward'></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
