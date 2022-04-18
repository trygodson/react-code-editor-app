import axios from 'axios';
import * as esbuild from 'esbuild-wasm';
import { filecache } from './unpkg-path-plugin';

export const fetchPlugin = (inputCode: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: 'jsx',
          contents: inputCode,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const cachedResult = filecache.getItem<esbuild.OnLoadResult>(args.path);

        //if it is, return immediately
        if (cachedResult) {
          return cachedResult;
        }
      });

      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);
        const escape = data.replace(/\n/g, '').replace(/"/g, '\\"').replace(/'/g, "\\'");
        const content = `
            const style = document.createElement('style');
            style.innerText = '${escape}';
            document.head.appendChild(style);
          `;

        const res: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: content,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        await filecache.setItem(args.path, res);

        return res;
      });
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);
        console.log(data, request);
        const res: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        await filecache.setItem(args.path, res);

        return res;
      });
    },
  };
};
