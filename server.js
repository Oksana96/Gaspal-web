const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const fs = require('fs')

// I18n
const i18next = require("i18next");
const Backend = require('i18next-node-fs-backend');
const middleware = require("i18next-express-middleware");

const fallbackLng = ['fr']; 
const availableLanguages = ['fr', 'es', 'it'];

// Load HTML in memory
const indexFilePath = path.resolve(__dirname, './build', 'index.html')
const html = fs.readFileSync(indexFilePath).toString();

i18next
    .use(middleware.LanguageDetector)
    .use(Backend).init({
    fallbackLng,
    detection: {
        lookupFromPathIndex: 0,
        order: ['path', 'session', 'cookie', 'header'],
        lookupCookie: 'i18next',
        lookupHeader: 'accept-language',
        lookupSession: 'i18next'
    },
    backend: {
        loadPath: __dirname + '/build/locales/{{lng}}/{{ns}}.json',
    },  
    whitelist: availableLanguages,
});

const sendHtml = (request, response) => {
    let result = html;

    result = result.replace(/\$LANG/g, request.language);
    result = result.replace(/\$OG_TITLE/g, request.t("meta.title"));
    result = result.replace(/\$OG_DESCRIPTION/g, request.t("meta.description"));

    response.send(result);
}

app.use(middleware.handle(i18next));

// Override index.html
app.get('/', sendHtml);

app.use(express.static(path.resolve(__dirname, './build')));

app.get('*', sendHtml);

app.listen(port, () => console.log(`Listening on port ${port}`));
