import Link from "next/link";
import Image from "next/image";

async function fetchCharacterInfo(region, realm, characterName) {
    
    const profileData = {};
    const profileIconData = [];
    const profileMediaData = [];
    const profileMediaURLS = []
    
    const characterInfoURL = `https://${region}.api.blizzard.com/profile/wow/character/${realm}/${characterName}?namespace=profile-us&locale=en_US&access_token=${process.env.access_token}`;
    const characterEquipmentURL = `https://${region}.api.blizzard.com/profile/wow/character/${realm}/${characterName}/equipment?namespace=profile-us&locale=en_US&access_token=${process.env.access_token}`;
    const characterMediaURL = `https://${region}.api.blizzard.com/profile/wow/character/${realm}/${characterName}/character-media?namespace=profile-us&locale=en_US&access_token=${process.env.access_token}`;

    const response = await Promise.all([fetch(characterInfoURL), fetch(characterEquipmentURL), fetch(characterMediaURL)]);
    
    const characterInfoData = await response[0].json();
    const characterEquipmentData = await response[1].json();
    const characterMediaData = await response[2].json();
    
    profileData.characterID = characterInfoData.id;
    profileData.characterName = characterInfoData.name;
    profileData.characterRealm = characterInfoData.realm.name;
    profileData.characterFaction = characterInfoData.faction.name;
    profileData.characterRace = characterInfoData.race.name;
    profileData.characterClass = characterInfoData.character_class.name;
    profileData.characterSpec = characterInfoData.active_spec.name;
    profileData.characterGuild = characterInfoData.guild ? characterInfoData.guild.name : '';
    profileData.characterLevel = characterInfoData.level;
    profileData.characterItemLevel = characterInfoData.equipped_item_level;
    profileData.characterGear = [];
    profileData.characterPortrait = characterMediaData.assets[0].value;
    
    characterEquipmentData.equipped_items.forEach((gear) => {
        
        const itemSetPcs = [];
        const itemGems = [];
        const itemEnchant = [];
        
        if( !(gear.slot.type === "SHIRT" || gear.slot.type === "TABARD") ) {
            if('set' in gear) {
                gear.set.items.forEach((setItem) => {
                    itemSetPcs.push(setItem.item.id);
                })
            }
            
            if('enchantments' in gear) {
                itemEnchant.push(gear.enchantments[0].enchantment_id);
            }
            
            if('sockets' in gear) {
                gear.sockets.forEach((gem) => {
                    if('item' in gem) {
                        itemGems.push(gem.item.id);
                    }
                })
            }
            
            profileData.characterGear.push({
                'id'        : gear.item.id, 
                'slot_name' : gear.slot.type, 
                'item_name' : gear.name,
                'bonus_list': gear.bonus_list,
                'quality'   : gear.quality.name.toLowerCase(),
                'set_pcs'   : itemSetPcs,
                'gems'      : itemGems,
                'enchants'  : itemEnchant,
                'item_level': gear.level.value,
                'media_id'  : gear.media.id
            });
            
            profileMediaData.push(gear.media.id);
        }
    })
    
    profileMediaData.forEach((id) => {
        profileMediaURLS.push((`https://us.api.blizzard.com/data/wow/media/item/${id}?namespace=static-us&locale=en_US&access_token=${process.env.access_token}`));
    })
    //console.log(profileMediaURLS);
    const responseMedia = await Promise.all(profileMediaURLS.map(async url => {
        const resp = await fetch(url);
        return resp.json();
    }));
    
    for( var i = 0; i < responseMedia.length; i++) {
        //console.log("id: " + responseMedia[i].id + " // link: " + responseMedia[i].assets.key);
        const iconName = responseMedia[i].assets[0].value.split("/")[6] ? responseMedia[i].assets[0].value.split("/")[6] : "inv_helm_mail_raidevokerdragon_d_01.jpg";
        profileIconData.push({
            'id': responseMedia[i].id,
            'iconName': iconName,
        })
    }
    
    profileData.characterGear.forEach((item) => {
        profileIconData.forEach((icon) => {
            if(item.id === icon.id) {
                if(icon.iconName === "inv_armor_celestial_d_01_cape.jpg") {
                    icon.iconName = "inv_cloth_dragonpvp_d_01_cape.jpg";
                }
                item.iconMediaName = icon.iconName;
            }
        })
    })
   
    return profileData;  
}

const CharacterPage = async ({ params }) => {
    
    const singleCharacter = await fetchCharacterInfo(params.region, params.realm, params.characterName.toLowerCase());
    const characterGearOrder = ['HEAD', 'NECK', 'SHOULDER', 'BACK', 'CHEST', 'WRIST', 'HANDS', 'WAIST', 'LEGS', 'FEET', 'FINGER_1', 'FINGER_2', 'TRINKET_1', 'TRINKET_2', 'MAIN_HAND', 'OFF_HAND']
    singleCharacter.characterGear.sort((a, b) => characterGearOrder.indexOf(a.slot_name) - characterGearOrder.indexOf(b.slot_name));
    
    return (
        <div className={`w-full flex flex-row justify-center items-center text-gray-800 mt-60`}>
            
            <div className={`card w-3/4 mx-auto bg-white shadow-xl hover:shadow border-4 rounded-lg border-faction-${singleCharacter.characterFaction.toLowerCase()}`}>
                
                <Image 
                    src={singleCharacter.characterPortrait} 
                    className={`w-32 mx-auto rounded-full -mt-20 border-8 border-faction-${singleCharacter.characterFaction.toLowerCase()}`}
                    width={84} 
                    height={84} 
                    alt='Character Portrait' 
                />
                <div className='text-center mt-2 text-3xl font-medium'>{singleCharacter.characterName}</div>
                {
                    !singleCharacter.characterGuild === '' ? <div className='text-center mt-2 font-light text-sm'> {"< " + singleCharacter.characterGuild + " >"}</div> : <></>
                }
                <div className='text-center font-normal text-lg'><span className='font-bold text-gear-epic'>{singleCharacter.characterItemLevel} </span>{singleCharacter.characterSpec + ' ' + singleCharacter.characterClass}</div>
                <div className='px-6 text-center mt-2 font-light text-sm'>
                    <p>Level {singleCharacter.characterLevel + ' ' + singleCharacter.characterRace + ' ' + singleCharacter.characterClass}</p>
                </div>
                <hr className='mt-8'></hr>
                <div className='flex p-4'>
                    <div className='w-1/2 text-center'>
                        <span className='font-bold'>Current Season M+ Score</span> 2000
                    </div>
                    <div className='w-0 border border-gray-300'></div>
                    <div className='w-1/2 text-center'>
                        <span className='font-bold'></span>
                    </div>
                </div>
                
               
                <ul key={singleCharacter.characterID} className="flex justify-center space-x-1">
                    
                    {singleCharacter.characterGear.map((item, index) => (
                        
                        <li key={index} className="">
                            <Link href={`https://wowhead.com/item=${item.id}`} data-wowhead={`gems=${item.gems.join(':')}&ench=${item.enchants.toString()}&bonus=${item.bonus_list.join(':')}&pcs=${item.set_pcs.join(':')}&ilvl=${item.item_level}`}>
                                <Image src={`/images/${item.iconMediaName}`} width={36} height={36} alt='Item' />
                            </Link>
                            <div className={`bg-gear-${item.quality} text-center`}>{item.item_level}</div>
                        </li>
                        
                    ))}
                </ul>
                
            </div>
            
{/*             
            
            <ul>
                
                <li>{singleCharacter.characterRealm}</li>
                <li>{singleCharacter.characterFaction}</li>
                
            </ul>
            
            <ul key={singleCharacter.characterID} className="flex">
                {singleCharacter.characterGear.map((item, index) => (
                    
                    <li key={index} className="">
                        <Link href={`https://wowhead.com/item=${item.id}`} data-wowhead={`gems=${item.gems.join(':')}&ench=${item.enchants.toString()}&bonus=${item.bonus_list.join(':')}&pcs=${item.set_pcs.join(':')}&ilvl=${item.item_level}`}>
                            <Image src={`/images/${item.iconMediaName}`} width={48} height={48} alt='Item' />
                        </Link>
                        <div className={`bg-gear-${item.quality} text-center`}>{item.item_level}</div>
                    </li>
                ))}
            </ul> */}
                 
        </div>
    )
}
export default CharacterPage