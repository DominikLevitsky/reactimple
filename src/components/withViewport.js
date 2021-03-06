import React, { Component } from 'react';
import EventEmitter from 'eventemitter3';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

let EE;
let viewport = { width: 1366, height: 768 };
const RESIZE_EVENT = 'resize';

function handleWindowResize() {
	if (viewport.width !== window.innerWidth || viewport.height !== window.innerHeight) {
		viewport = { width: window.innerWidth, height: window.innerHeight };
		EE.emit(RESIZE_EVENT, viewport);
	}
}

function withViewport(ComposedComponent) {
	return class WithViewport extends Component {

		constructor() {
			super();

			this.state = {
				viewport: canUseDOM ? { width: window.innerWidth, height: window.innerHeight } : viewport,
			};
		}

		componentDidMount() {
			if (!EE) {
				EE = new EventEmitter();
				window.addEventListener('resize', handleWindowResize);
				window.addEventListener('orientationchange', handleWindowResize);
			}

			EE.on(RESIZE_EVENT, this.handleResize, this);
		}

		componentWillUnmount() {
			EE.removeListener(RESIZE_EVENT, this.handleResize, this);
			if (!EE.listeners(RESIZE_EVENT, true)) {
				window.removeEventListener('resize', handleWindowResize);
				window.removeEventListener('orientationchange', handleWindowResize);
				EE = null;
			}
		}

		render() {
			return <ComposedComponent {...this.props} viewport={this.state.viewport} />;
		}

		handleResize(value) {
			this.setState({ viewport: value });
		}

	};
}

export default withViewport;
