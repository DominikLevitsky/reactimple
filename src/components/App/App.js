import React, { Component, PropTypes } from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';
import style from './App.scss';
import Header from '../Header';
import Footer from '../Footer';

class App extends Component {

	static propTypes = {
		context: PropTypes.shape({
			insertCss: PropTypes.func,
			setTitle: PropTypes.func,
			setMeta: PropTypes.func,
		}),
		children: PropTypes.element.isRequired,
		error: PropTypes.object,
	};

	static childContextTypes = {
		insertCss: PropTypes.func.isRequired,
		setTitle: PropTypes.func.isRequired,
		setMeta: PropTypes.func.isRequired,
	};

	getChildContext() {
		const context = this.props.context;
		return {
			insertCss: context.insertCss || emptyFunction,
			setTitle: context.setTitle || emptyFunction,
			setMeta: context.setMeta || emptyFunction,
		};
	}

	componentWillMount() {
		const { insertCss } = this.props.context;
		this.removeCss = insertCss(style);
	}

	componentWillUnmount() {
		this.removeCss();
	}

	render() {
		return !this.props.error ? (
			<div className="wrapper">
				<Header />

				<div className={style.content}>
					{this.props.children}
				</div>

				<Footer />
			</div>
		) : this.props.children;
	}

}

export default App;
