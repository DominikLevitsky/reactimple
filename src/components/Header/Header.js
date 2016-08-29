import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './Header.scss';

class Header extends Component {
	render() {
		return (
			<div className={style.header}>
				Header goes here
			</div>
		);
	};
}

export default withStyles(style)(Header);
