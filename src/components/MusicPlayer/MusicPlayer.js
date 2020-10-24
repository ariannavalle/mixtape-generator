import React, { Component } from 'react'
import './MusicPlayer.scss'
import { MdPlayArrow, MdPause, MdFastForward, MdFastRewind } from "react-icons/md";

export default class MusicPlayer extends Component {
    state = {
        index: 0,
        currentTime: '0:00',
        pause: false,
    };

    componentDidMount() {
        this.playerRef.addEventListener("timeupdate", this.timeUpdate, false);
        this.playerRef.addEventListener("ended", this.nextSong, false);
        this.timelineRef.addEventListener("click", this.changeCurrentTime, false);
        this.timelineRef.addEventListener("mousemove", this.hoverTimeLine, false);
        this.timelineRef.addEventListener("mouseout", this.resetTimeLine, false);
    }

    componentWillUnmount() {
        this.playerRef.removeEventListener("timeupdate", this.timeUpdate);
        this.playerRef.removeEventListener("ended", this.nextSong);
        this.timelineRef.removeEventListener("click", this.changeCurrentTime);
        this.timelineRef.removeEventListener("mousemove", this.hoverTimeLine);
        this.timelineRef.removeEventListener("mouseout", this.resetTimeLine);
    }

    changeCurrentTime = (e) => {
        const duration = this.playerRef.duration;

        const playheadWidth = this.timelineRef.offsetWidth;
        const offsetWidht = this.timelineRef.offsetLeft;
        const userClickWidht = e.clientX - offsetWidht;

        const userClickWidhtInPercent = (userClickWidht * 100) / playheadWidth;

        this.playheadRef.style.width = userClickWidhtInPercent + "%";
        this.playerRef.currentTime = (duration * userClickWidhtInPercent) / 100;
    }

    hoverTimeLine = (e) => {
        const duration = this.playerRef.duration;

        const playheadWidth = this.timelineRef.offsetWidth

        const offsetWidht = this.timelineRef.offsetLeft;
        const userClickWidht = e.clientX - offsetWidht;
        const userClickWidhtInPercent = (userClickWidht * 100) / playheadWidth;

        if (userClickWidhtInPercent <= 100) {
            this.hoverPlayheadRef.style.width = userClickWidhtInPercent + "%";
        }

        const time = (duration * userClickWidhtInPercent) / 100;

        if ((time >= 0) && (time <= duration)) {
            this.hoverPlayheadRef.dataset.content = this.formatTime(time);
        }
    }

    resetTimeLine = () => {
        this.hoverPlayheadRef.style.width = 0;
    }

    timeUpdate = () => {
        const duration = this.playerRef.duration;
        const timelineWidth = this.timelineRef.offsetWidth - this.playheadRef.offsetWidth;
        const playPercent = 100 * (this.playerRef.currentTime / duration);
        this.playheadRef.style.width = playPercent + "%";
        const currentTime = this.formatTime(parseInt(this.playerRef.currentTime));
        this.setState({
            currentTime
        });
    }

    formatTime = (currentTime) => {
        const minutes = Math.floor(currentTime / 60);
        let seconds = Math.floor(currentTime % 60);

        seconds = (seconds >= 10) ? seconds : "0" + seconds % 60;

        const formatTime = minutes + ":" + seconds

        return formatTime;
    }

    updatePlayer = (index) => {
        const currentSong = this.props.tracks[index];
        this.playerRef.src = currentSong.audio;

        this.setState({
            index
        });
        this.playerRef.load();
    }

    nextSong = () => {
        const { index, pause } = this.state;
        this.updatePlayer((index + 1) % this.props.tracks.length)
        if (pause) {
            this.playerRef.play();
        }
    };

    prevSong = () => {
        const { index, pause } = this.state;
        this.updatePlayer((index + this.props.tracks.length - 1) % this.props.tracks.length);
        if (pause) {
            this.playerRef.play();
        }
    };


    playOrPause = () => {
        const { index, pause } = this.state;
        const currentSong = this.props.tracks[index];
        console.log(this.playerRef, currentSong.audio);
        if (!this.state.pause) {
            this.playerRef.src = currentSong.audio;
            this.playerRef.play();
        } else {
            this.playerRef.pause();
        }
        this.setState({
            pause: !pause
        })
    }

    clickAudio = (key) => {
        const { pause } = this.state;

        this.setState({
            index: key
        });

        this.updatePlayer();
        if (pause) {
            this.playerRef.play();
        }
    }


    render() {
        const { index, currentTime, pause } = this.state;
        console.log("props", this.props, index)
        const currentSong = this.props.tracks[index];
        console.log('tracks', this.props.tracks[index])
        return <div className="card">
            <div className="current-song">
                <audio ref={ref => this.playerRef = ref}>
                    <source src={currentSong?.audio} type="audio/ogg" />
                  Your browser does not support the audio element.
              </audio>
                <div className="img-wrap">
                    <img src={currentSong?.albumCover} />
                </div>
                <div className="song-name">{currentSong?.title}</div>
                <div className="song-autor">{currentSong?.artist}</div>

                <div className="time">
                    <div className="current-time">{currentTime}</div>
                    {/* <div className="end-time">{ currentSong?.duration }</div> */}
                </div>

                <div ref={ref => this.timelineRef = ref} id="timeline">
                    <div ref={ref => this.playheadRef = ref} id="playhead"></div>
                    <div ref={ref => this.hoverPlayheadRef = ref} class="hover-playhead" data-content="0:00"></div>
                </div>

                <div className="controls">
                    <button onClick={this.prevSong} className="prev prev-next current-btn"><MdFastRewind /></button>

                    <button onClick={this.playOrPause} className="play current-btn">
                        {
                            (!pause) ? <MdPlayArrow />
                                : <MdPause />
                        }
                    </button>
                    <button onClick={this.nextSong} className="next prev-next current-btn"><MdFastForward /></button>
                </div>

            </div>
            <div className="play-list" >
                {this.props.tracks.map((music, key = 0) =>
                    <div key={key}
                        onClick={() => this.clickAudio(key)}
                        className={"track-row " +
                            (index === key && !pause ? 'current-audio' : '') +
                            (index === key && pause ? 'play-now' : '')} >

                        <img className="track-img" src={music.albumCover} />
                        <div className="track-discr" >
                            <div className="track-name" >{music.title}</div>
                            <div className="track-author" >{music.artist}</div>
                        </div>
                        {/* <div className="track-duration" >
                                 {(index === key)
                                   ?currentTime
                                   :music.duration
                                 }
                               </div> */}
                    </div>
                )}
            </div>
        </div>
    }
}
