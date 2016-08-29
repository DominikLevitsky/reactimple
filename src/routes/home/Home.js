import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './Home.scss';

const title = 'React Starter Kit';

function Home({}, context) {
	context.setTitle(title);
	return (
		<div className={style.home}>
			Home route goes here
		</div>
	);
}

Home.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(style)(Home);
