import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const app = express();
const main = express();

main.use('/api/v1', app);

export const webApi = functions.https.onRequest(main);

app.get('/routes', async (request, response) => {
    try {
        const querySnapshot = await db.collection('historic_routes').get();
        const data: any = [];
        querySnapshot.forEach(element => {
            const element_data = element.data();
            data.push({
                id: element.id,
                en: element_data.en,
                de: element_data.de,
                fr: element_data.fr
            });
        });
        response.status(200).json({payload: data, success: true});    
    } catch (err) {
        response.status(500).json({payload: 'Error in api.', success: false})
    }
});

app.get('/routes/:id', async (request, response) => {
    try {
        const id = request.params.id;
        if (!id) throw new Error('Route id not given');
        const rec = await db.collection('historic_routes').doc(id).get();
        if(!rec.exists) {
            throw new Error('Route does not exits');
        }
        const data: any = rec.data();
        const sightArray: any = [];
        for(let x of data.sights) {
            const sid = x._path.segments[1];
            try {
                const srec = await db.collection('historic_sites').doc(sid).get();
                if(!srec.exists) {
                    throw new Error('Sight does not exits');
                }    
                const sdata : any = srec.data();
                sightArray.push({
                    en: sdata.en,
                    fr: sdata.fr,
                    de: sdata.de,
                    id: srec.id,
                    thumbnail: sdata.images_array.length === 0 ? null : sdata.images_array[0].downloadURL,
                    resourceName: sdata.images_array.length === 0 ? null : sdata.images_array[0].path.split('/')[1],
                    coordinate: {
                        latitude: sdata.geolocation._lat,
                        longitude: sdata.geolocation._long
                    },
                });                    
            } catch(err) {
                throw new Error(err.message)
            }
        }
        const payload = {
            id: rec.id,
            sights: sightArray,
            fr: data.fr,
            en: data.en,
            de: data.de,
            routePath: data.routePath.map((x: { _lat: any; _long: any; }) => ({latitude: x._lat, longitude: x._long})),
            googleMapLink: data.google_map_link || 'null',
            
        };
        response.status(200).json({
            payload: payload, 
            success: true
        });    
    } catch (err) {
        response.status(500).json({payload: err.message, success: false})
    }
});

app.get('/sights', async (request, response) => {
    try {
        const querySnapshot = await db.collection('historic_sites').get();
        const data: any = [];
        querySnapshot.forEach(element => {
            const element_data = element.data();
            data.push({
                id: element.id,
                en: element_data.en,
                de: element_data.de,
                fr: element_data.fr,
                thumbnail: element_data.images_array.length ? element_data.images_array[0].downloadURL : null,
                resourceName: element_data.images_array.length ? element_data.images_array[0].path.split('/')[1] : null  
            });
        });
        response.status(200).json({payload: data});    
    } catch(err) {
        response.status(500).json({payload: err.message, success: false});
    }
});

app.get('/sights/:id', async (request, response) => {
    try {
        const id = request.params.id;
        if (!id) throw new Error('Sight id not given');
        const rec = await db.collection('historic_sites').doc(id).get();
        if(!rec.exists) {
            throw new Error('Sight does not exists');
        }
        const data: any = rec.data();
        const scred: any = await db.collection('sight_categories').doc(data.sight_category.id).get();
        const scdata = scred.data();
        const resources = [
            ...data.images_array.map((x: { downloadURL: any; path: any; en: any; de: any; fr: any; }) => {
                return {
                    url: x.downloadURL, 
                    resourceName: x.path.split('/')[1], 
                    type: 'image/jpg',
                    en: !!x.en ? x.en : {description: '', title: ''},
                    de: !!x.de ? x.de : {description: '', title: ''},
                    fr: !!x.fr ? x.fr : {description: '', title: ''}
                };
                }),
            ...data.audio_array.map((x: { downloadURL: any; path: any; }) => ({url: x.downloadURL, title: x.path.split('/')[1], type: 'audio/mpeg'}))
        ];
        const payload = {
            id: rec.id,
            fr: data.fr,
            en: data.en,
            de: data.de,
            coordinate: {
                latitude: data.geolocation._lat,
                longitude: data.geolocation._long,
            },
            sight_category: {
                id: scred.id,
                en: scdata.en,
                fr: scdata.fr,
                de: scdata.de
            },
            resources: resources
        };
        response.status(200).json({
            payload, 
            success: true
        });    
    } catch (err) {
        response.status(500).json({payload: err.message, success: false})
    }
});

app.get('/sight_categories', async (request, response) => {
    try {
        const querySnapshot = await db.collection('sight_categories').get();
        const data: any = [{id: 'all', en: {name: 'All'}, de: {name: 'Alle'}, fr: {name: 'Toutes'}}];
        querySnapshot.forEach(element => {
            const element_data = element.data();
            data.push({
                id: element.id,
                en: element_data.en,
                de: element_data.de,
                fr: element_data.fr,
            });
        });
        response.status(200).json({payload: data, success: true});
    } catch (err) {
        response.status(500).json({payload: err.message, success: false});
    }
});

app.get('/sight_categories/:id', async (request, response) => {
    try {
        const id = request.params.id;
        if(id !== 'all'){
            if (!id) throw new Error('Category id not given');
            const rec = await db.collection('sight_categories').doc(id).get();
            if(!rec.exists) {
                throw new Error('Category does not exits');
            }
        }
        const querySnapshot = await db.collection('historic_sites').get();
        const data: any = [];
        querySnapshot.forEach(element => {
            const element_data = element.data();
            data.push({
                id: element.id,
                en: element_data.en,
                de: element_data.de,
                fr: element_data.fr,
                thumbnail: element_data.images_array.length ? element_data.images_array[0].downloadURL : null,
                resourceName: element_data.images_array.length ? element_data.images_array[0].path.split('/')[1] : null,
                sight_category: element_data.sight_category.id
            });
        });
        
        const payload = id === 'all' ? data : data.filter((x: any) => !!x.sight_category && x.sight_category == id)

        response.status(200).json({payload: payload, success: true});
    } catch (err) {
        response.status(500).json({payload: err.message, success: false});
    }
});

app.get('/instruction_manual', async(request, response) => {
    try {
        const querySnapshot = await db.collection('instruction_manual').get();
        let data: any = {};
        querySnapshot.forEach(element => {
            data = element.data()
        });
        response.status(200).json({payload: data, success: true });
    } catch(err) {
        response.status(500).json({payload: err.message, success: false});
    }
});