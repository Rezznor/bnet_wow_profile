import NextAuth from "next-auth/next";
import Providers from "next-auth/providers";

const options = {
	providers: [
		Providers.BattleNet({
			clientId: process.env.BATTLENET_CLIENT_ID,
			clientSecret: process.env.BATTLENET_CLIENT_SECRET,
		}),
	],
	debug: false,
};

export default (req, res) => NextAuth(req, res, options);
