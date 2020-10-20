import React, { Component } from 'react'
import './Tracklist.css'

export default class Tracklist extends Component {
    state = {
        currentlyPlaying: false
    }

    playAudio = (e) => {
        if (e.target !== e.currentTarget) {
            console.log(e.target, e.target.previousElementSibling)

            if (this.state.currentlyPlaying) {
                e.target.src = "https://images.vexels.com/media/users/3/135547/isolated/preview/cb0c341c8b97e34abb0d20543a14eab4-button-play-icon-by-vexels.png"
                e.target.previousElementSibling.pause()

            } else {
                e.target.src = "https://images.vexels.com/media/users/3/135545/isolated/preview/d744ce91510415a8e3de69cd616b3fae-button-pause-icon-by-vexels.png"
                e.target.previousElementSibling.play();
            }
            this.setState({
                currentlyPlaying: !this.state.currentlyPlaying
            })
            e.stopPropagation()
        }
    }

    render() {
        const { recommendations } = this.props
        return (

            <div id="tracklist-container" onClick={(e) => this.playAudio(e)} >
                {recommendations.map((rec, i) => {
                    return <div key={rec.id} className="track">
                        <div className="album-art">
                            <img src={rec.album.images[0].url} className="cover" />
                        </div>
                        <div className="track-info">
                            <div className="track-title">{rec.name}</div>
                            <div className="track-artist">by {rec.artists[0].name}</div>
                        </div>

                        <audio id="my-audio">
                            <source src={rec.preview_url} type="audio/mpeg" />
                                        Your browser does not support the audio element.
                                    </audio>

                        {rec.preview_url &&
                            <img src="https://images.vexels.com/media/users/3/135547/isolated/preview/cb0c341c8b97e34abb0d20543a14eab4-button-play-icon-by-vexels.png" className="audio-icons" id={i} />
                        }
                    </div>
                })
                }
            </div>

        )
    }
}
