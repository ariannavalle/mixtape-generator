import React from 'react'
import { Link } from 'react-router-dom';
import './LandingPage.css'

export default function LandingPage() {
    return (
        <div className="home-body">
            <h1>The ultimate
                <br />mixtape generator</h1>
            <h2>Discover new music and create curated playlists.<br />
                <Link to={'/generator'}>
                    <div className="box-2">
                        <div className="btn btn">
                            <span>START</span>
                        </div>
                    </div>
                </Link>
            </h2>
        </div>
    )
}
