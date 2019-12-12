import typescript from 'rollup-plugin-typescript';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import html from 'rollup-plugin-bundle-html';
import { uglify } from 'rollup-plugin-uglify';
import del from 'rollup-plugin-delete';
import scss from 'rollup-plugin-scss'

let plugins = [
  del({ targets: 'dist/*' }),
  typescript({lib: ['es5', 'es6', 'dom'], target: 'es5'}),
  scss(),
  html({
    template: 'src/template.html',
    dest: "dist",
    filename: 'index.html',
    inject: 'body'
  })
];

if (process.env.BUILD !== 'production') {
  plugins.push(
    serve({ contentBase: 'dist' }),
    livereload()
  );
} else {
  plugins.push(
    uglify()
  )
}

export default {
  input: 'src/main.ts',
  output: {
    format: 'iife',
    file: 'dist/bundle-[hash].js'
  },
  plugins
}
