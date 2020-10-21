import React, { Component } from 'react'
import Track from '../Track/Track'
import './Tracklist.css'

export default class Tracklist extends Component {

    render() {
        const { recommendations } = this.props
        return (
            <div id="tracklist-container"  >
                {recommendations.map((rec) => {
                    return <div key={rec.id}>
                        <Track albumCover={rec.album.images[0].url} title={rec.name} artist={rec.artists[0].name} audio={rec.preview_url} id={rec.id} />
                    </div>
                })
                }
            </div>
        )
    }
}
