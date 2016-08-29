import 'babel-polyfill';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';
import expressGraphQL from 'express-graphql';
import jwt from 'jsonwebtoken';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Html from './components/Html';
import { ErrorPage } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.scss';
import UniversalRouter from 'universal-router';
import PrettyError from 'pretty-error';
//import passport from './core/passport';
import models from './data/models';
import schema from './data/schema';
import routes from './routes';
import assets from './assets';
import { port, auth } from './config';

const app = express();

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
// Register API middleware
// -----------------------------------------------------------------------------
app.use('/graphql', expressGraphQL(req => ({
	schema,
	graphiql: true,
	rootValue: { request: req },
	pretty: process.env.NODE_ENV !== 'production',
})));

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
	try {
		let css = new Set();
		let statusCode = 200;
		const data = { title: '', description: '', style: '', script: assets.main.js, children: '' };

		await UniversalRouter.resolve(routes, {
			path: req.path,
			query: req.query,
			context: {
				insertCss: (...styles) => {
					styles.forEach(style => css.add(style._getCss())); // eslint-disable-line no-underscore-dangle, max-len
				},
				setTitle: value => (data.title = value),
				setMeta: (key, value) => (data[key] = value),
			},
			render(component, status = 200) {
				css = new Set();
				statusCode = status;
				data.children = ReactDOM.renderToString(component);
				data.style = [...css].join('');
				return true;
			},
		});

		const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);

		res.status(statusCode);
		res.send(`<!doctype html>${html}`);
	} catch (err) {
		next(err);
	}
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
	console.log(pe.render(err)); // eslint-disable-line no-console
	const statusCode = err.status || 500;
	const html = ReactDOM.renderToStaticMarkup(
		<Html
		title="Internal Server Error"
		description={err.message}
		style={errorPageStyle._getCss()} // eslint-disable-line no-underscore-dangle
		>
		{ReactDOM.renderToString(<ErrorPage error={err} />)}
		</Html>
	);
	res.status(statusCode);
	res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
/* eslint-disable no-console */
models.sync().catch(err => console.error(err.stack)).then(() => {
	app.listen(port, () => {
		console.log(`The server is running at http://localhost:${port}/`);
	});
});
/* eslint-enable no-console */
