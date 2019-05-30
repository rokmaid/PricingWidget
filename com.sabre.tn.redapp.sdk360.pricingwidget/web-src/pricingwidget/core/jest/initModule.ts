// do not judge me
const fs = require('fs-extra');
const path = require('path');

const pjFilename = path.join(__dirname, '../../package.json');
const pj = fs.readJsonSync(pjFilename);

const manifest = {
    "name": pj.name.replace('-src', ''),
    "version": pj.version,
    "meta": {},
    "dependencies": [],
    "submodules": [],
    "hasTemplates": false,
    "hasStyles": false
};

import cls from "../../src/code";

let initialized: boolean = false;

export function initModule(): void {
    if (!initialized) {
        initialized = true;
        (window as any).use('modules').injectModule(manifest, cls);
        console.log(new Date().toString() + ' - ' + pj.name + ' initialized');
    }
};
