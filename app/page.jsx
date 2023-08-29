import HomeSearchForm from './components/HomeSearch';

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
            
            <HomeSearchForm realmListData={realmListData} />    

        </div>
    )
}

export default Homepage;