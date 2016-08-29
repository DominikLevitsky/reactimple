import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './Footer.scss';
import Link from '../Link';

function Footer() {
	return (
		<div className={style.footer}>
			Footer goes here
			<br/>
			<Link to="/">Home</Link>
		</div>
	);
}

export default withStyles(style)(Footer);
