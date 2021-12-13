import typescript from 'rollup-plugin-typescript2'
import filesize from 'rollup-plugin-filesize'
import { terser } from 'rollup-plugin-terser'
import gzipPlugin from 'rollup-plugin-gzip'
import glsl from 'rollup-plugin-glsl'
import serve from 'rollup-plugin-serve'
import copy from 'rollup-plugin-copy'
import clear from 'rollup-plugin-clear'


export default {
    input: './src/main.ts',
    output: {
        file: 'build/main.js',
        format: 'iife'
    },
    plugins: [
        clear({
            targets: ['build']
        }),
        glsl({
            include: 'shaders/*',
            sourceMap: false
        }),
        typescript(),
        terser({}),
        filesize({
            showBrotliSize: true
        }),
        copy({
            targets: [
                {src: 'assets/*', dest: 'build/assets/'},
                {src: 'index.html', dest: 'build/'}
            ]
        }),
        gzipPlugin({
            filter: "/\.(js|mjs|json|css|html|png)$/",
            additionalFiles: ['build/assets/loading.png', 'build/assets/obstacle-1.png']
        }),
        serve({
            contentBase: ['build'],
            port: 3000
        })
    ]
}
