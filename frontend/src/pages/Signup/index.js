import styles from './Signup.module.scss';
import className from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';

const cx = className.bind(styles);

function Signup() {
	const term = useRef();
	const warning1 = useRef();
	const warning2 = useRef();
	const warning3 = useRef();
	const loading = useRef();

	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [pw, setPw] = useState('');
	const [rePw, setRePw] = useState('');
	const [tmp, setTmp] = useState(0);
	// let data = true;

	useEffect(() => {
		loading.current.style.display = 'block';
		axios({
			url: 'https://chatweb99.herokuapp.com/signup',
			method: 'POST',
			data: {
				name,
				phone,
				pw,
			},
		}).then((res) => {
			// data = res.data.success;
			// console.log(1, tmp, data);
			const err = checkCondition();
			if (err == 0) redirect(res.data.success);
		});
		loading.current.style.display = 'none';
	}, [tmp]);

	const navigate = useNavigate();

	const checkCondition = () => {
		if (pw !== rePw) {
			warning1.current.style.display = 'block';
			return 1;
		} else {
			warning1.current.style.display = 'none';
		}
		// console.log(term.current.checked);
		if (!term.current.checked) {
			warning2.current.style.display = 'block';
			return 1;
		} else {
			warning2.current.style.display = 'none';
		}

		return 0;
	};

	const redirect = (data) => {
		if (data == true) {
			warning3.current.style.display = 'block';
			return;
		} else {
			navigate('/', { replace: true });
		}
	};

	const handleSignup = (e) => {
		// console.log(e);
		e.preventDefault();

		const err = checkCondition();
		// console.log(err);

		if (err == 0) setTmp((preState) => preState + 1);
	};

	return (
		<form className={cx('wrap')}>
			<p>
				Hello!
				<br />
				We are glad to see you :)
			</p>
			<Link className={cx('escape')} to="/">
				X
			</Link>
			<div className={cx('info')}>
				<label htmlFor="name">Name</label>
				<input
					type="text"
					name="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>
			</div>
			<div className={cx('info')}>
				<label htmlFor="phone_number">Phone Number</label>
				<input
					type="text"
					name="phone_number"
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
					required
				/>
			</div>
			<div className={cx('info')}>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					name="password"
					value={pw}
					onChange={(e) => setPw(e.target.value)}
				/>
			</div>
			<div className={cx('info')}>
				<label htmlFor="repeat_password">Repeat Password</label>
				<input
					type="password"
					name="repeat_password"
					value={rePw}
					onChange={(e) => setRePw(e.target.value)}
				/>
			</div>
			<div ref={loading} className={cx('loading')}>
				<ReactLoading
					type="spinningBubbles"
					color="pink"
					height="5"
					width="5"
				/>
			</div>
			<h5 ref={warning1}>Repeat password is different from password!</h5>
			<h5 ref={warning2}>Please check to degree the term!</h5>
			<h5 ref={warning3}>This phone is used!</h5>
			<div className={cx('term')}>
				<input type="checkbox" ref={term} />
				<h6>
					I agree <u>Terms of Service</u> and <u>Privacy Policy</u>
				</h6>
			</div>
			<button
				type="submit"
				className={cx('sign_up')}
				onClick={(e) => handleSignup(e)}
			>
				Sign Up
			</button>
		</form>
	);
}

export default Signup;
