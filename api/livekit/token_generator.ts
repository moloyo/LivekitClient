import { AccessToken } from "livekit-server-sdk";
import { VIEWER_PERMISSIONS } from "./constants";

export async function generateToken(room: string, userName: string, permissons: any = VIEWER_PERMISSIONS): Promise<TokenGeneratorResult> {
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

    at.ttl = '24h';

    permissons.room = room;
    at.addGrant(permissons);

    res.token = at.toJwt();

    return res;
}
