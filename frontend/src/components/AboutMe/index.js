import styles from './AboutMe.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSaveConv } from '~/store/slices';

let cx = classNames.bind(styles);

function AboutMe() {
	const name = window.sessionStorage.getItem('name');
	const phone = window.sessionStorage.getItem('phone');
	const friends = JSON.parse(window.sessionStorage.getItem('friend'));

	let numFriends = useSelector((state) => state.chatting.numFriends);
	const [realFriends, setRealFriends] = useState([]);
	useEffect(() => {
		setRealFriends(friends);
	}, [numFriends]);

	let friend = useSelector((state) => state.chatting.friend);
	useEffect(() => {
		if (Object.keys(friend).length != 0)
			setRealFriends((preState) => [...preState, friend]);
	}, [friend]);

	const dispatch = useDispatch();
	const handleClick = () => {
		dispatch(setSaveConv(1));
	};

	return (
		<div className={cx('wrap')}>
			<div className={cx('escape')} onClick={handleClick}>
				X
			</div>
			<div className={cx('image')}>
				<img
					src="https://th.bing.com/th/id/R.dc2a0b7fbf8719ce21dbc279e2e4483d?rik=IzmV07o8iJSn%2bg&riu=http%3a%2f%2fthuthuattienich.com%2fwp-content%2fuploads%2f2017%2f02%2fanh-dai-dien-facebook-doc-4.jpg&ehk=%2bNvFyq6ue%2fAVi0cn0UElur6IOjVt57INtMC%2b02%2fRD2M%3d&risl=&pid=ImgRaw&r=0"
					alt=""
				/>
				<h1>{name}</h1>
			</div>

			<div className={cx('infor')}>
				<p>
					Your phone <span>{phone}</span>
				</p>
				<p>Your Friends</p>
				<div className={cx('list')}>
					{realFriends.map((friend, index) => {
						return (
							<div className={cx('friend')} key={index}>
								{friend.name}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default AboutMe;
