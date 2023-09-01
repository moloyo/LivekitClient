import NextAuth from "next-auth";
import AzureADB2CProvider from "next-auth/providers/azure-ad-b2c";

const handler = NextAuth({
    providers: [
        AzureADB2CProvider({
            tenantId: process.env.AZURE_AD_B2C_TENANT_NAME,
            clientId: process.env.AZURE_AD_B2C_CLIENT_ID || "",
            clientSecret: process.env.AZURE_AD_B2C_CLIENT_SECRET || "",
            primaryUserFlow: process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW,
            authorization: { params: { scope: `offline_access openid https://${process.env.AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/api/Api.Read https://${process.env.AZURE_AD_B2C_TENANT_NAME}.onmicrosoft.com/api/Api.Write` } },
            checks: ["pkce"],
            client: {
                token_endpoint_auth_method: "none",
            }

        }),
    ],
    // debug: true,
    secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }