import styles from './Friends.module.scss';
import className from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIndexChatting } from '~/store/slices';
// import { useSelector, useDispatch } from 'react-redux';
// import { changeStateChat } from '~/store/slices/friend';

let cx = className.bind(styles);

function Friends() {
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
	// console.log(realFriends);

	const [index, setIndex] = useState(0);
	// window.sessionStorage.setItem('index', index);

	const dispatch = useDispatch();
	const saveData = (curIndex) => {
		dispatch(setIndexChatting(curIndex));
	};

	const handleClick = (curIndex) => {
		setIndex((preState) => curIndex);
		saveData(curIndex);
	};

	return (
		<div className={cx('wrap')}>
			{realFriends.map((friend, curIndex) => {
				return (
					<div
						key={curIndex}
						className={cx('friend', curIndex == index ? 'chatting' : '')}
						onClick={() => handleClick(curIndex)}
					>
						{friend.img ? (
							<img src={friend.img} alt="" />
						) : (
							<img
								src="https://th.bing.com/th/id/R.dc2a0b7fbf8719ce21dbc279e2e4483d?rik=IzmV07o8iJSn%2bg&riu=http%3a%2f%2fthuthuattienich.com%2fwp-content%2fuploads%2f2017%2f02%2fanh-dai-dien-facebook-doc-4.jpg&ehk=%2bNvFyq6ue%2fAVi0cn0UElur6IOjVt57INtMC%2b02%2fRD2M%3d&risl=&pid=ImgRaw&r=0"
								alt=""
							/>
						)}
						<p className={cx(curIndex == index ? '' : 'unread')}>
							{friend.name}
						</p>
					</div>
				);
			})}
		</div>
	);
}

export default Friends;
