Really really rough so far...

Steps for development:

- $ npm i -g contentful-cli
- $ contentful login
- $ contentful space use
- $ npm run create (after that you should have a ui-extension in your contentful space)
- go to a content model and create a field long text and choose appearance MDX and define your dependencies on npm
- when you go to an entry of this post this shouldn't work - bc right now it's only locally and is pointing to https://localhost:1234
- $ npm run dev (starts the server) -> chrome complains about certificates so you have to go to https://localhost:1234 to say it's okay to access. :)
- then you should be able to use components on npm

All off the above steps will improve...
