import React, { Component } from 'react'
import { MdPlayCircleFilled, MdPauseCircleOutline, MdErrorOutline, MdAddCircle } from "react-icons/md";
import './Track.css'

export default class Track extends Component {

    state = {
        currentlyPlaying: false,
    }

    playAudio = () => {
        const currentPlayBtn = document.getElementById(this.props.id)

        this.state.currentlyPlaying ? currentPlayBtn.previousElementSibling.pause() : currentPlayBtn.previousElementSibling.play();

        this.setState({
            currentlyPlaying: !this.state.currentlyPlaying
        })
    }

    renderIcons = () => {
        const { audio, id, title, artist, addTrackToMixtape } = this.props;

        return (<div>
            <audio id="my-audio" >
                <source src={audio} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>

            {audio ?
                this.state.currentlyPlaying ?
                    <MdPauseCircleOutline className="md-icon" id={id} onClick={this.playAudio} />
                    : <MdPlayCircleFilled className="md-icon" id={id} onClick={this.playAudio} />
                :
                <div className="tooltip">
                    <MdErrorOutline className="md-icon" style={{ color: "#ccc" }} />
                    <div className="top">Preview unavailable</div>
                </div>
            }

            <MdAddCircle className="md-icon add" onClick={() => addTrackToMixtape({ id, title, artist })} />

        </div>)
    }

    render() {
        const { albumCover, title, artist } = this.props;
        return (

            <div className="track">

                <div className="album-art">
                    <img src={albumCover} className="cover" />
                </div>

                <div className="track-layout">
                    <div className="track-info">
                        <div className="track-title">{title.length > 30 ? title.substring(0, 30) + "..." : title}</div>
                        <div className="track-artist">by {artist}</div>
                    </div>

                    {this.renderIcons()}

                </div>
            </div>
        )
    }
}
