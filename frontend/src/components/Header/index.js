import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { increaseNumFriends, setFriend } from '~/store/slices';
import ReactLoading from 'react-loading';
import axios from 'axios';

const cx = classNames.bind(styles);

function Header() {
	const uid = window.sessionStorage.getItem('userId');
	const name = window.sessionStorage.getItem('name');

	const text = useRef();
	const input = useRef();
	const exit = useRef();
	const loading = useRef();
	const notFound = useRef();
	const found = useRef();

	const [phone, setPhone] = useState('');
	const [user, setUser] = useState({});

	const addFriend = () => {
		text.current.style.display = 'none';
		input.current.style.display = 'block';
		exit.current.style.display = 'block';
		input.current.focus();
	};

	const closeAdd = () => {
		text.current.style.display = 'block';
		input.current.style.display = 'none';
		exit.current.style.display = 'none';
		notFound.current.style.display = 'none';
		found.current.style.display = 'none';
		setPhone('');
	};

	const searchNewFriend = (e) => {
		if (e.key != 'Enter') return;
		loading.current.style.display = 'block';
		axios({
			url: 'https://chatweb99.herokuapp.com/user',
			method: 'POST',
			data: {
				phone,
			},
		}).then((res) => {
			loading.current.style.display = 'none';
			if (res.data.rs == 0) {
				notFound.current.style.display = 'block';
				return;
			}
			// console.log(res.data.phone, res.data.name);
			found.current.style.display = 'block';
			setUser((preState) => {
				return {
					uid: res.data.uid,
					name: '+ ' + res.data.name,
				};
			});
		});
	};

	const dispatch = useDispatch();
	const addToList = () => {
		closeAdd();
		// console.log(user.name.slice(user.name.indexOf(' ')));
		axios({
			url: 'https://chatweb99.herokuapp.com/user/addFriends',
			method: 'POST',
			data: {
				uid1: uid.toString(),
				name1: name,
				uid2: user.uid.toString(),
				name2: user.name.slice(user.name.indexOf(' ')),
			},
		});

		dispatch(increaseNumFriends());
		dispatch(
			setFriend({
				name: user.name.slice(user.name.indexOf(' ')),
				uid: user.uid,
			})
		);
	};

	return (
		<div className={cx('wrap')}>
			<div className={cx('add_friend')}>
				<div className={cx('wrap_icon')} onClick={addFriend}>
					<FontAwesomeIcon className={cx('icon_plus')} icon={faPlus} />
				</div>
				<div className={cx('search_phone')}>
					<h1 ref={text}>New Friend</h1>

					<input
						ref={input}
						placeholder="Search Phone"
						value={phone}
						onKeyDown={(e) => searchNewFriend(e)}
						onChange={(e) => {
							setPhone(e.target.value);
							found.current.style.display = 'none';
							notFound.current.style.display = 'none';
						}}
					/>
					<p ref={notFound}>no user found!</p>
					<div ref={found} className={cx('new_friend')} onClick={addToList}>
						<pre>{user.name}</pre>
					</div>

					<div ref={loading} className={cx('loading')}>
						<ReactLoading
							type="spinningBubbles"
							color="red"
							height="2"
							width="2"
						/>
					</div>
					<span ref={exit} onClick={closeAdd}>
						x
					</span>
				</div>
			</div>

			<div className={cx('main_content')}>
				<div className={cx('logo')}>
					<h1>Chat</h1>
				</div>
				<div className={cx('action')}>
					<FontAwesomeIcon className={cx('icon_menu')} icon={faEllipsisH} />
				</div>
			</div>

			<div className={cx('search')}>
				<input type="search" placeholder="Search Name" />
				<button>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
						<path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
					</svg>
				</button>
			</div>
		</div>
	);
}

export default Header;
