import bcryptjs from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from './../../../models/User';
import db from './../../../utils/db';

export default NextAuth({
	session: {
		// stick with the default feature jwt encryption
		strategy: 'jwt',
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user?._id) token._id = user._id;
			if (user?.isAdmin) token.isAdmin = user.isAdmin;
			return token;
		},
		async session({ session, token }) {
			if (token?._id) session.user._id = token._id;
			if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
			return session;
		},
	},
	// providers is for the sign in with google, facebook, email, etc
	providers: [
		// this is for the sign in with email, I have not added the sign in with google or facebook etc yet
		CredentialsProvider({
			async authorize(credentials) {
				await db.connect();
				const user = await User.findOne({
					email: credentials.email,
				});
				await db.disconnect();
				// this is to check to make sure that the credentials are correct
				if (user && bcryptjs.compareSync(credentials.password, user.password)) {
					return {
						_id: user._id,
						name: user.name,
						email: user.email,
						image: '',
						isAdmin: user.isAdmin,
					};
				}
				// if the credentials are not correct, then we return an error message
				throw new Error('Invalid email or password');
			},
		}),
	],
});
