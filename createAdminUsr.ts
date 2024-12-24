const admin = require('firebase-admin');
const dotenv = require('dotenv');

const serviceAccount = require('../../../../Downloads/blog-management-8c2b8-firebase-adminsdk-g49rl-2f06d64ec7.json');

dotenv.config();

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();

const createAdminUser = async () => {
	try {
		const user = await auth.createUser({
			email: process.env.ADMIN_EMAIL,
			password: process.env.ADMIN_PASSWORD,
		});

		await auth.setCustomUserClaims(user.uid, {
			role: 'admin',
		});

		console.log(
			'Admin user created successfully:',
			user.uid
		);
	} catch (error) {
		console.error('Error creating admin user:', error);
	}
};

createAdminUser();
