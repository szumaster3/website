const basePath = window.location.pathname.includes('content') ? '../../' : './';

document.write(`
    <meta http-equiv="content-type" content="text/html; charset=iso-8859-1"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <link rel="stylesheet" type="text/css" href="${basePath}data/css/default.css" media="screen"/>
    <link rel="icon" type="image/png" href="${basePath}/favicon/favicon-32x32.png">
    <link rel="apple-touch-icon" sizes="180x180" href="${basePath}apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="${basePath}data/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="${basePath}data/favicon/favicon-16x16.png">
    <link rel="manifest" href="${basePath}site.webmanifest">
`);