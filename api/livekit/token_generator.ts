import { AccessToken } from "livekit-server-sdk";

export async function generateToken(room: string, userName: string): Promise<TokenGeneratorResult> {
    const res: TokenGeneratorResult = { status: true };

    if (!room) {
        res.status = false;
        res.error = 'Missing room parameter';
        return res;
    } else if (!userName) {
        res.status = false;
        res.error = 'Missing username parameter';
        return res;
    }

    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;

    if (!apiKey || !apiSecret ) {
        res.status = false;
        res.error = 'Server misconfigured';
        return res;
    }

    const at = new AccessToken(apiKey, apiSecret, { identity: userName });

    at.addGrant({ room, roomJoin: true, canPublish: true, canSubscribe: true });

    res.token = at.toJwt();

    return res;
}
