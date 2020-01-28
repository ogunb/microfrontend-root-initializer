const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

const packageJson = require('./package.json');
const workspaces = packageJson.workspaces;

const DOMAINS = {
    product: {
        local: '/product',
        remote: 'remote/product',
        scripts: {
            serve: 'serve:product'
        }
    },
    dashboard: {
        local: '/dashboard',
        remote: 'remote/dashboard',
        scripts: {
            serve: 'serve:dashboard'
        }
    },
    account: {
        local: '/account',
        remote: 'remote/account',
        scripts: {
            serve: 'serve:account'
        }
    },
    threejs: {
        local: '/threejs',
        remote: 'git@github.com:ogunb/threejs-exercises.git',
        scripts: {
            serve: 'serve'
        }
    },
    excel: {
        local: '/excel',
        remote: 'git@github.com:ogunb/off-thread-excel-read.git',
        scripts: {
            serve: 'serve'
        }
    }
}

let selectedDomains = process.argv.slice(2);

if (!selectedDomains.length) selectedDomains = Object.keys(DOMAINS);
if (!selectedDomains.every(domain => workspaces.includes(domain))) {
    throw new Error('You either misspelled something or forgot to add the domain to workspaces on package.json file.\nYour workspace name, domain key and local file name should be the same.')
}

selectedDomains.forEach(async domainName => {
    const domain = DOMAINS[domainName];
    if (fs.existsSync(path.join(__dirname, domain.local))) {
        console.log(`🤖  - Found ${domainName} on local...`);
        return;
    }

    console.log(`🥡  - ${domainName} not found on local. Start fetch from remote...`);

    shell.exec(`git clone ${domain.remote} ${domainName}`);

    console.log(`🍻  - ${domainName} cloned...`);
});

const scripts = selectedDomains
    .map(domain => {
        if (!DOMAINS[domain]) return '';

        return `cd .${DOMAINS[domain].local} && npm run ${DOMAINS[domain].scripts.serve}`;
    })
    .filter(Boolean)
    .join('" "');

const serveScript = `concurrently -k -p "[{name}]" -n "${selectedDomains.map(domain => domain.toUpperCase())}" "${scripts}"`;

shell.exec('yarn')
shell.exec(serveScript)
