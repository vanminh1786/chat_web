import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import ReactLoading from 'react-loading';

const cx = classNames.bind(styles);

function Login() {
	const [phone, setPhone] = useState('');
	const [pw, setPw] = useState('');
	const warning = useRef();
	const loading = useRef();
	const [tmp, setTmp] = useState(0);

	useEffect(() => {
		loading.current.style.display = 'block';
		axios({
			url: 'http://localhost:3001/login',
			method: 'POST',
			data: {
				phone,
				pw,
			},
		}).then((res) => {
			if (res.data.user) saveData(res.data.user);
			const err = checkValid(res.data.success);
			if (err == 1) redirect();
		});
		loading.current.style.display = 'none';
	}, [tmp]);

	// const dispatch = useDispatch();
	const saveData = (user) => {
		window.sessionStorage.setItem('name', user.name);
		window.sessionStorage.setItem('userId', user.userId);
		window.sessionStorage.setItem('id', user.id);
		window.sessionStorage.setItem('phone', user.phone);
		window.sessionStorage.setItem('friend', JSON.stringify(user.friend));
	};

	const checkValid = (data) => {
		if (phone == '') return 0;

		if (!data) {
			warning.current.style.display = 'block';
			return 0;
		}

		return 1;
	};

	const navigate = useNavigate();
	const redirect = () => {
		navigate('/home', { replace: true });
	};

	const handleClick = (e) => {
		e.preventDefault();
		setTmp((preState) => preState + 1);
	};

	return (
		<div className={cx('wrap')}>
			<div className={cx('top')}>
				<Link to="/">
					<svg
						height="48"
						aria-hidden="true"
						viewBox="0 0 16 16"
						version="1.1"
						width="48"
						data-view-component="true"
						className="octicon octicon-mark-github"
					>
						<path
							fillRule="evenodd"
							d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
						></path>
					</svg>
				</Link>
				<p>Sign in to your Motel</p>
			</div>

			<div ref={loading} className={cx('loading')}>
				<ReactLoading
					type="spinningBubbles"
					color="pink"
					height="5"
					width="5"
				/>
			</div>

			<form className={cx('content')}>
				<p>Phone number</p>
				<input
					type="text"
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
				/>
				<p>
					Password <Link to="/">Forgot password?</Link>
				</p>
				<input
					type="password"
					value={pw}
					onChange={(e) => setPw(e.target.value)}
				/>

				<div className={cx('sign_in')}>
					<h5 ref={warning}>Phone number or password is incorrect!</h5>
					<button type="submit" onClick={handleClick}>
						Sign in
					</button>
				</div>
			</form>

			<div className={cx('sign_up')}>
				<p>
					New into Motel? <Link to="/signup">Create a account</Link>
				</p>
			</div>
		</div>
	);
}

export default Login;
