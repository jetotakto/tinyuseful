# Calculator browser checks

From this directory, run `npm ci` and then `npm test` with Node.js and Google Chrome installed.
The suite builds the site and opens the packaged HTML, styles and fonts in a fresh Chrome session.
It checks compound-interest results at 320, 360, 390 and 1280 pixels, including fallback fonts,
the full-size default result at 390 pixels, and line breaks between thousands groups.
It also checks cent rounding in Bill Split. Third-party requests are blocked during the tests.
