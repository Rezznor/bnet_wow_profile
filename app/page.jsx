import HomeSearchForm from './components/HomeSearchForm';

async function fetchFormData() {
    
    const realmList = [];
    const realmDataURL = `https://us.api.blizzard.com/data/wow/realm/index?namespace=dynamic-us&locale=en_US&access_token=${process.env.access_token}`;
    const response = await fetch(realmDataURL);
    const realmData = await response.json();
    
    if('realms' in realmData) {
        realmData.realms.forEach((realm) => {
            realmList.push({
                'id': realm.id,
                'name': realm.name,
                'slug': realm.slug
            })
        })
    }
    
    realmList.sort((a, b) => (a.slug.localeCompare(b.slug)));
    
    return realmList
}

const Homepage = async () => {

    const realmListData = await fetchFormData();
    
    return (
        <div className="container">
            
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                        Search your character
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    
                    <HomeSearchForm realmListData={realmListData} />

                </div>
            </div>
            
            <div className="px-4 py-6 sm:px-0">
                <h4 className="text-lg font-bold leading-6 text-white">Example Characters</h4>
                <span className="mt-1 text-sm leading-6 text-white sm:col-span-2 sm:mt-0">
                    {"To test the app, I've provided a couple characters of popular players below."}
                </span>
                <table className='mx-auto w-1/2 mt-12'>
                    <thead>
                        <tr>
                            <th>Realm Name</th>
                            <th>Character Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Sargeras</td>
                            <td>Dorkibear</td>
                        </tr>
                        <tr>
                            <td>Illidan</td>
                            <td>Goopswoop</td>
                        </tr>
                        <tr>
                            <td>Area 52</td>
                            <td>Ellesmere</td>
                        </tr>
                        <tr>
                            <td>Hyjal</td>
                            <td>Azunaz</td>
                        </tr>
                    </tbody>
                </table>
                
          </div>

        </div>
    )
}

export default Homepage;