import React, { Component } from 'react'
import Track from '../Track/Track'
import './Tracklist.css'

export default class Tracklist extends Component {

    state = {
        mixtapeTracks: this.props.mixtapeTracks
    }


    render() {
        const { recommendations } = this.props
        return (
            <div id="tracklist-container"  >
                {recommendations.length > 0 && (<><h4>Tracklist</h4> <span>These are some recommended songs based on your search. Preview them and add your favorites to your mixtape.</span></> )}
                {recommendations.map((rec) => {
                    return <div key={rec.id}>
                        <Track albumCover={rec.album.images[0].url} title={rec.name} artist={rec.artists[0].name} audio={rec.preview_url} id={rec.id} addTrackToMixtape={this.props.addTrackToMixtape } />
                    </div>
                })
                }
            </div>
        )
    }
}
