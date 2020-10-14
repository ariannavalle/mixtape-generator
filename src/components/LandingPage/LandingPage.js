import React from 'react'
import { Link } from 'react-router-dom';
import './LandingPage.css'

export default function LandingPage() {
    return (
        <div>
            <h1>The ultimate
                <br />mixtape generator</h1>
            <h2>Discover new music and create curated playlists.<br />
                <Link to={'/generator'}>
                    <div class="box-2">
                        <div class="btn btn">
                            <span>START</span>
                        </div>
                    </div>
                </Link>
            </h2>
        </div>
    )
}
