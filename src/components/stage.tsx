import { GridLayout, ParticipantTile, TrackContext, useTracks } from "@livekit/components-react";
import { Track } from 'livekit-client';

export default function Stage() {
    const cameraTracks = useTracks([Track.Source.Camera]);
    const screenShareTrack = useTracks([Track.Source.ScreenShare])[0];

    return (
        <>
            {screenShareTrack && <ParticipantTile {...screenShareTrack} />}
            <GridLayout tracks={cameraTracks}>
                <TrackContext.Consumer>{(track) => <ParticipantTile {...track} />}</TrackContext.Consumer>
            </GridLayout>
        </>
    );
}