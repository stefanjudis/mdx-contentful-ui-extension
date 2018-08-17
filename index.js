import React, {Component} from 'react';
import { render } from 'react-dom';
import mdx from '@mdx-js/mdx';
import { MDXTag } from '@mdx-js/tag';

import {
  BrowserPreview,
  SandpackProvider
} from 'react-smooshpack/es/components';

class App extends Component {
  constructor(props) {
    super(props);
    const {mdxContent} = props;

    const deps = this.props.deps.split(',').reduce((acc, key) => {
      acc[key] = 'latest';
      return acc;
    }, {
      'react': 'latest',
      'react-dom': 'latest',
      '@mdx-js/tag': 'latest'
    });

    this.state = {
      mdxContent: mdxContent,
      files: {
        '/main.js': {
          code: `
          import React from 'react';
          import { MDXTag } from '@mdx-js/tag';

          ${this.getJSXStringFromMDX(mdxContent)}
          `
        },
        '/index.js': {
          code: `
      import React from 'react';
      import { render } from 'react-dom';
      import Main from './main.js';

      render(<Main />, document.getElementById('root'));
          `,
          'index.html': '<div id="root"></div>'
        },
      },
      dependencies: deps
    }
  }

  getJSXStringFromMDX (content) {
    return mdx.sync(content).toString();
  }

  updatePreview (event) {
    this.props.updateValue(event.target.value);
    const mdxContent = event.target.value;

    this.setState({
      mdxContent,
      files: Object.assign({}, this.state.files, {
        '/main.js' : {
          code : `
        import React from 'react';
        import { MDXTag } from '@mdx-js/tag';

        ${this.getJSXStringFromMDX(mdxContent)}
        `
        }
      })
    })
  }

  render () {
    const {files, dependencies, mdxContent} = this.state;
    return (
      <SandpackProvider files={files} dependencies={dependencies} entry="/index.js">
        <p>Loaded deps (in theory at least): {this.props.deps}</p>
        <div style={{ display: 'flex' }}>
          <textarea onChange={this.updatePreview.bind(this)} style={{flex: 1}} defaultValue={mdxContent}></textarea>
          <BrowserPreview style={{ flex: 1 }} />
        </div>
      </SandpackProvider>
    );
  }
}

window.contentfulExtension.init(({ field, window, parameters }) => {
  const {instance} = parameters;
  const {dependencies: deps} = instance;

  window.startAutoResizer();
  render(<App mdxContent={field.getValue()} deps={deps} updateValue={field.setValue.bind(field)}/>, document.getElementById('root'));
});