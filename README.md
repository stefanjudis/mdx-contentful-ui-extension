Really really rough so far...

Steps for development:

- $ npm run create (after that you should have a ui-extension in your contentful space)
- go to a content model and create a field long text
- when you go to an entry of this post this shouldn't work - bc right now it's only locally and is pointing to https://localhost:1234
- $ npm run dev (starts the server) -> chrome complains about certificates so you have to go to https://localhost:1234 to say it's okay. :)
