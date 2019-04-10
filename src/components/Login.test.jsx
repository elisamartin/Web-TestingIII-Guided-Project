import React from 'react';
import * as rt from 'react-testing-library';
import Login from './Login';

afterEach(rt.cleanup);

describe('Login', () => {
	it('displays no login button if no username or no password', () => {
		const wrap = rt.render(<Login />);
		const button = wrap.queryByTestId(/loginButton/i);
		expect(button).toBeFalsy();
		expect(wrap.asFragment()).toMatchSnapshot();
	});

	// it('can change input values', () => {
	//   const wrap = rt.render(<Login />);
	//   rt.fireEvent.change(
	//     wrap.getByPlaceholderText('username'),
	//     { target: { value: 'foo' } },
	//   );

	//   rt.fireEvent.change(
	//     wrap.getByPlaceholderText('password'),
	//     { target: { value: 'bar' } },
	//   );

	//   expect(wrap.getByDisplayValue('foo'));
	//   expect(wrap.getByDisplayValue('bar'));
	// });

	it('can change input values', () => {
		const wrap = rt.render(<Login />);
		expect(wrap.asFragment()).toMatchSnapshot();

		const usernameInput = wrap.getByPlaceholderText('username');
		const passwordInput = wrap.getByPlaceholderText('password');

		const inputValue = 'name';
		const passValue = 'secretPassword';

		rt.fireEvent.change(usernameInput, { target: { value: inputValue } });
		expect(wrap.getByPlaceholderText('username').value).toBe(inputValue);

		rt.fireEvent.change(passwordInput, { target: { value: passValue } });
		expect(wrap.getByPlaceholderText('password').value).toBe(passValue);
	});

	it('displays login button if username and password', () => {
		const wrap = rt.render(<Login />);
		const usernameInput = wrap.getByLabelText('username');
		const passwordInput = wrap.getByLabelText('password');

		rt.fireEvent.change(usernameInput, { target: { value: 'A' } });

		expect(wrap.queryByTestId(/loginButton/i)).toBeFalsy();

		rt.fireEvent.change(passwordInput, { target: { value: 'B' } });

		expect(wrap.queryByTestId(/loginButton/i)).toBeTruthy();
	});

	it('can login successfully', async () => {
		// grab the component
		const wrap = rt.render(<Login />);
		// change username to Alex
		rt.fireEvent.change(wrap.getByPlaceholderText('username'), {
			target: { value: 'Alex' }
		});
		// change password to be longer than 0
		rt.fireEvent.change(wrap.getByLabelText('password'), {
			target: { value: 'secret' }
		});
		// click the button
		rt.fireEvent.click(wrap.queryByTestId(/loginButton/i));
		//await flash msg to appear
		await wrap.findByText(/welcome/i);
		// assert message
		expect(wrap.getByText(/welcome/i));
	});

	it('can fail miserably', async () => {
		// see the error render
	});
});
