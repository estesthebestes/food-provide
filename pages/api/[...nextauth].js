import NextAuth from 'next-auth';
import bcrypt from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '../../models/user';
import db from '../../utils/db';

export default NextAuth({
	session: {
		strategy: 'jwt',
	},

	callbacks: {
		async jwt({ token, user }) {
			if (user?._id) token._id = user._id;
			if (user?.isAdmin) token.isAdmin = user.isAdmin;
			return token;
		},
		async session({ session, token }) {
			if (token._id) session._id = token._id;
			if (token.isAdmin) session.isAdmin = token.isAdmin;
			return session;
		},
	},
	providers: [
		CredentialsProvider({
			async authorize(credentials) {
				await db.connect();
				const user = await User.findOne({ email: credentials.email });
				await db.disconnect();
				if (user && bcrypt.compareSync(credentials.password, user.password)) {
					return {
						name: user.name,
						isAdmin: user.isAdmin,
						email: user.email,
						password: user.password,
					};
				}
				throw new Error('Invalid email or password');
			},
		}),
	],
});
