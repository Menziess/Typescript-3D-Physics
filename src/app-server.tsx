declare function require(name: string);

import * as path from 'path';
import * as express from 'express';
import * as React from 'react';
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import NotFoundPage from './components/pages/NotFoundPage';
import Routes from './components/app/Routes';

// initialize the server and configure support for ejs templates
const app: express.Express = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// define the folder that will be used for public assets
app.use(express.static(path.join(__dirname, '../public')));

// universal routing and rendering
app.get('*', (req, res) => {
  match(
    req.url,
    (err, redirectLocation, renderProps) => {

      // in case of error display the error message
      if (err) {
        return res.status(500).send(
          console.log(err),
          { "err": err.message }
        );
      }

      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      // generate the React markup for the current route
      let markup;
      if (renderProps) {
        // if the current route matched we have renderProps
        markup = renderToString(<RouterContext {...renderProps} />);
      } else {
        // otherwise we can render a 404 page
        markup = renderToString(<NotFoundPage />);
        res.status(404);
      }

      // render the index template with the embedded React markup
      return res.render('index', { markup });
    }
  );
});

// start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
app.listen(port, () => {
  console.log('Server listening on http://localhost:' + port + ', Ctrl+C to stop')
});