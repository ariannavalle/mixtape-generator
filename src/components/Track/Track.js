import React, { Component } from 'react'
import { MdPlayCircleFilled, MdPauseCircleOutline, MdErrorOutline, MdAddCircleOutline } from "react-icons/md";
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
        const { audio, id } = this.props;

        return (<div>
            <audio id="my-audio" >
                <source src={audio} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>

            {audio ?
                this.state.currentlyPlaying ?
                    <MdPauseCircleOutline class="md-icon" id={id} style={{ color: "#5a0a6f" }} onClick={this.playAudio} />
                    : <MdPlayCircleFilled class="md-icon" id={id} style={{ color: "#5a0a6f" }} onClick={this.playAudio} />
                :
                <div class="tooltip">
                    <MdErrorOutline class="md-icon" style={{ color: "#ccc" }} />
                    <div class="top">Preview unavailable</div>
                </div>
            }

            <MdAddCircleOutline class="md-icon add" />

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
