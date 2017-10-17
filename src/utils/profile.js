import isUrl from 'is-url';
import rp from 'request-promise-native';
import fs from 'fs';
import Path from 'path';
import {Logger} from 'nmmes-backend';
import Package from '../../package.json';
import chalk from 'chalk';

export function localProfiles() {
    let profiles = require.context('../profiles/', true, /\.json$/).keys();
    for (let idx in profiles) {
        profiles[idx] = Path.basename(profiles[idx], '.json');
    }
    return profiles;
}

export async function getProfile(profileLocation) {
    if (profileLocation === '') {
        throw new Error('No profile provided.');
    }
    if (!profileLocation || profileLocation === 'none')
        return {};


        if (~localProfiles().indexOf(profileLocation)) {
            let profile = require('../profiles/'+profileLocation+'.json');
            return profile;
        }

        if (isUrl(profileLocation))
            return await rp({uri: profileLocation, json: true});

        if (fs.existsSync(profileLocation)) {
            return fs.readFile(profileLocation, (err, data) => {
                if (err)
                    throw err;
                return JSON.parse(data);
            });
        }

        Logger.info('Availiable local profiles are:', localProfiles().join(', '));
        Logger.info(`You may activate a profile via it's local name or a url to a profile json file.`);
        Logger.info(`Examples:
\t${Package.name} --profile anime my/movies/folder
\t${Package.name} --profile https://raw.githubusercontent.com/NMMES/nmmes-cli/master/src/profiles/anime.json my/movies/folder`)
        throw new Error(`Profile ${profileLocation} not found.`);
}
