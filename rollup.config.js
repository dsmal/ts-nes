import typescript from 'rollup-plugin-typescript';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

export default {
  input: './main.ts',
  output: {
    format: 'iife',
    dir: './dist'
  },
  plugins: [
    typescript({lib: ['es5', 'es6', 'dom'], target: 'es5'}),
    serve(),
    livereload()
  ]
}
