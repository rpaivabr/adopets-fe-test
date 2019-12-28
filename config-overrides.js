const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { 
            '@primary-color': '#28ADD0',
            '@menu-bg': '#CE4073',
            '@layout-header-background': '#CE4073'
        },
    })
);