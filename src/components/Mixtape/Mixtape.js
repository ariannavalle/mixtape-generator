import React, { Component } from 'react'
import './Mixtape.css'
import { MdClear } from "react-icons/md";

export default class Mixtape extends Component {

    render() {

        return (
            <div>
                <h4>Mixtape</h4>
                <span>A list containing your favorite tracks.<br/> Click record when you're ready to listen!</span>
                <div id="mixtape">
                    <div className="mixtape-heading">Side A</div>
                    {this.props.tracks.map((track, i) => {
                        return (
                            <div key={i} className="mixtape-container">
                                <div className="mixtape-track">
                                <div>{track.title.length > 22 ? track.title.substring(0, 22) + "..." : track.title}</div>
                                    <div>{track.artist.length > 18 ? track.artist.substring(0, 18) + "..." : track.artist} <MdClear className="btn-space" onClick={() => { this.props.removeTrackFromMixtape(track) }} />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                {this.props.tracks.length>1 && <div className="record" onClick={this.props.toggleBtnState}>Record Mixtape</div>}
            </div>
        )
    }
}
