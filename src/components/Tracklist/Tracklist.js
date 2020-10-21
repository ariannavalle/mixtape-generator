import React, { Component } from 'react'
import Track from '../Track/Track'
import './Tracklist.css'

export default class Tracklist extends Component {
    state = {
        currentlyPlaying: false,
        imgSrc : "https://images.vexels.com/media/users/3/135547/isolated/preview/cb0c341c8b97e34abb0d20543a14eab4-button-play-icon-by-vexels.png"
    }

    playAudio = (e) => {
        if (this.state.currentlyPlaying) {
            e.target.previousElementSibling.pause()
            
            this.setState({
                imgSrc: "https://images.vexels.com/media/users/3/135547/isolated/preview/cb0c341c8b97e34abb0d20543a14eab4-button-play-icon-by-vexels.png"
            })
        } else {
            e.target.previousElementSibling.play();
            this.setState({
                imgSrc: "https://images.vexels.com/media/users/3/135545/isolated/preview/d744ce91510415a8e3de69cd616b3fae-button-pause-icon-by-vexels.png"
            })
        }
        this.setState({
            currentlyPlaying: !this.state.currentlyPlaying
        })
    }

    // playAudio = (e) => {
    //     if (e.target !== e.currentTarget) {
    //         console.log(e.target, e.target.previousElementSibling)

    //         if (this.state.currentlyPlaying) {
    //             e.target.src = "https://images.vexels.com/media/users/3/135547/isolated/preview/cb0c341c8b97e34abb0d20543a14eab4-button-play-icon-by-vexels.png"
    //             e.target.previousElementSibling.pause()

    //         } else {
    //             e.target.src = "https://images.vexels.com/media/users/3/135545/isolated/preview/d744ce91510415a8e3de69cd616b3fae-button-pause-icon-by-vexels.png"
    //             e.target.previousElementSibling.play();
    //         }
    //         this.setState({
    //             currentlyPlaying: !this.state.currentlyPlaying
    //         })
    //         e.stopPropagation()
    //     }
    // }


    // onClick={(e) => this.playAudio(e)}
    render() {
        const { recommendations } = this.props
        return (

            <div id="tracklist-container"  >
                {recommendations.map((rec, i) => {
                    return <div key={rec.id}>
                        <Track albumCover={rec.album.images[0].url} title={rec.name} artist={rec.artists[0].name} audio={rec.preview_url} id={rec.id}/>
                        {/* <div className="album-art">
                            <img src={rec.album.images[0].url} className="cover" />
                        </div>
                        <div className="track-info">
                            <div className="track-title">{rec.name}</div>
                            <div className="track-artist">by {rec.artists[0].name}</div>
                        </div>

                        <audio controls id="my-audio">
                            <source src={rec.preview_url} type="audio/mpeg" />
                                        Your browser does not support the audio element.
                                    </audio>

                        {rec.preview_url &&
                            <img src="https://images.vexels.com/media/users/3/135547/isolated/preview/cb0c341c8b97e34abb0d20543a14eab4-button-play-icon-by-vexels.png" className="audio-icons" id={i} />
                        } */}
                    </div>
                })
                }
            </div>

        )
    }
}
