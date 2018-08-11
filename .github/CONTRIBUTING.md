First of all, thank you for being interested in contributing to **zircle-ui**. 🙏 

A lot of things could be improved and enriched with you collaboration no matter if you are a experienced developer or not. Below you will find just some guidelines for inspiration.

## Documentation
You can write, translate and improve the zircle’s documentation. Each page has a link to its source code, so you can easily edite and send a PR if you find a typo or something is not clear enough.

## Showcases and examples
Let the community know about you! Send me a [DM at @zircle_ui](https://twitter.com/zircle_ui) with your project link.

## Design
Glad to hear suggestions to improve the look and feel, zircle’s usability and its consistence.

## Coding
Find an open issue to tackle. New features are welcome!

### Inform an Issue
- **What issues can I inform?**

Besides informing a **bug**, you can **propose features, ideas, etc**. 

You can also open an issue if find something in the **documentation** is not clear enough. 

- **How to inform?**

Just try to explain **what happens** and **what is expected to happen** . Also, it would very useful to provide **a way to reproduce the issue** (JSFiddle, CodePen, CodeSandbox or provide a GitHub repo).

### Pull a request
Reference your PR to a related issue and provide a description of the changes proposed.

#### Guidelines

- The `master` branch is basically just a snapshot of the latest stable release. All development should be done in dedicated branches. **Do not submit PRs against the `master` branch.**

- Checkout a topic branch from the relevant branch, e.g. `dev`, and merge back against that branch.

- Work in the `src` folder and **DO NOT** checkin `dist` in the commits.

- It's OK to have multiple small commits as you work on the PR - we will let GitHub automatically squash it before merging.

- Make sure `npm test` passes. (see [development setup](https://zircleui.github.io/docs/contribute/#development-setup))

- If adding new feature:
  - Add accompanying test case.
  - Provide convincing reason to add this feature. Ideally you should open a suggestion issue first and have it greenlighted before working on it.

- If fixing a bug:
  - If you are resolving a special issue, add `(fix #xxxx[,#xxx])` (#xxxx is the issue id) in your PR title for a better release log, e.g. `update entities encoding/decoding (fix #3899)`.
  - Provide detailed description of the bug in the PR. Live demo preferred.
  - Add appropriate test coverage if applicable.

### Development Setup
You will need Node.js version 8+ installed.

Open a terminal and type:

```sh
git clone https://github.com/zircleui/zircleui.git
```
After cloning the repository, execute:

```sh
npm install
```

### Commonly used NPM scripts
```sh
# start demo app
npm run serve

# to check and fix code
npm run lint

# run jest unit tests
npm test

# build zircle-ui library
npm run build:zircle
```


### Project Structure

```sh
.
├── dist
├── node_modules
├── src
│   ├── components
│   │ 	 └── child-components
│   ├── store
│   │    └── modules
│   └── styles
│        └── sass
└── tests
	 └── unit

```

## Do you like zircle-ui?

### Spread the word
Help to promote the project with you friends, colleagues and the social media.

### Become a stargazzer
Maybe you don't have the habit to star projects on Github, I kindle ask you to do so.

### Stay in touch

- Follow **zircle-ui** on [Twitter](https://twitter.com/zircle_ui)

- Suscribe to the mailing list.

<!-- Begin MailChimp Signup Form -->
<div id="mc_embed_signup">
<form action="https://zircle.us17.list-manage.com/subscribe/post?u=91025581f3cf49d83896d0651&amp;id=8c7dd8cb4d" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
    <div id="mc_embed_signup_scroll">
  
  <input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="email address" required>
    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
    <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_91025581f3cf49d83896d0651_8c7dd8cb4d" tabindex="-1" value=""></div>
    <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
    </div>
</form>
</div>

<!--End mc_embed_signup-->