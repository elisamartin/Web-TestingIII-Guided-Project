module.exports = {
	post: (url, payload) => {
		if (url === 'login') {
			switch (payload.username) {
				case 'Alex':
					// should succeed resolving
					return Promise.resolve({
						data: {
							token: 'the-token',
							username: 'Alex'
						}
					});

				default:
					// should fail rejecting
					return Promise.reject({
						message: 'Invalid Credentials'
					});
			}
		}
	}
};
