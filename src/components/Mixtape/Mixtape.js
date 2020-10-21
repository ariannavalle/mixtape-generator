import React, { Component } from 'react'
import './Mixtape.css'

export default class Mixtape extends Component {

    render() {

        return (
            <div id="mixtape">
                {this.props.tracks.map((track) => {
                    return <div>{track.title} - {track.artist}</div>
                })}
            </div>
        )
    }
}
