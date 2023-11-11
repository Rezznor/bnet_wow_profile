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
    const characterMythicPlusURL = `https://${region}.api.blizzard.com/profile/wow/character/${realm}/${characterName}/mythic-keystone-profile?namespace=profile-us&locale=en_US&access_token=${process.env.access_token}`;
    const characterRaidProgURL = `https://${region}.api.blizzard.com/profile/wow/character/${realm}/${characterName}/encounters/raids?namespace=profile-us&locale=en_US&access_token=${process.env.access_token}`;

    const response = await Promise.all([fetch(characterInfoURL), fetch(characterEquipmentURL), fetch(characterMediaURL), fetch(characterMythicPlusURL), fetch(characterRaidProgURL)]);
    
    const characterInfoData = await response[0].json();
    const characterEquipmentData = await response[1].json();
    const characterMediaData = await response[2].json();
    const characterMythicPlusData = await response[3].json();
    const characterRaidProgData = await response[4].json();
    
    profileData.characterID = characterInfoData.id;
    profileData.characterName = characterInfoData.name;
    profileData.characterRealm = characterInfoData.realm.name;
    profileData.characterFaction = characterInfoData.faction.name;
    profileData.characterClass = characterInfoData.character_class.name;
    profileData.characterSpec = characterInfoData.active_spec.name;
    profileData.characterGuild = characterInfoData.guild ? characterInfoData.guild.name : '';
    profileData.characterLevel = characterInfoData.level;
    profileData.characterItemLevel = characterInfoData.equipped_item_level;
    profileData.characterGear = [];
    profileData.characterPortrait = characterMediaData.assets[0].value;
    profileData.characterMPlusScore = characterMythicPlusData.current_mythic_rating ? characterMythicPlusData.current_mythic_rating.rating : "0";
    profileData.characterRaidProg = [];
    
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
    
    characterRaidProgData.expansions.forEach((xpac) => {
        if(xpac.expansion.name === "Dragonflight") {
            xpac.instances.forEach((raid) => {
        
                var raidProgAllDiffs = [];
                var raidShort = '';
                
                if(raid.instance.name === 'Vault of the Incarnates') {
                    raidShort = 'VOTI';
                } else if(raid.instance.name === 'Aberrus, the Shadowed Crucible') {
                    raidShort = 'ATSB'
                }
                
                raid.modes.forEach((raidDiff) => {
                    raidProgAllDiffs.push({
                        'difficulty': raidDiff.difficulty.type,
                        'diff_prog': raidDiff.progress.completed_count,
                        'raid_boss_count': raidDiff.progress.total_count
                    })
                    //console.log(raid.instance.name + " " + raidDiff.difficulty.type + " " + raidDiff.progress.completed_count);
                })

                profileData.characterRaidProg.push({
                    'raid_name': raid.instance.name,
                    'raid_short': raidShort,
                    'raid_prog': raidProgAllDiffs,
                })
            })
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
                <div className='font-bold text-2xl text-gear-epic text-center'>{singleCharacter.characterItemLevel}</div>
                
                <div className='px-6 text-center mt-2 font-light text-md'>
                    
                    <p>Level {singleCharacter.characterLevel + ' ' + singleCharacter.characterSpec + ' ' + singleCharacter.characterClass}</p>
                    
                </div>
                
                <hr className='my-4'></hr>
                
                <ul key={singleCharacter.characterID} className="flex justify-center space-x-1">
                    
                    {singleCharacter.characterGear.map((item, index) => (
                        
                        <li key={index} className="">
                            <Link href={`https://wowhead.com/item=${item.id}`} data-wowhead={`gems=${item.gems.join(':')}&ench=${item.enchants.toString()}&bonus=${item.bonus_list.join(':')}&pcs=${item.set_pcs.join(':')}&ilvl=${item.item_level}`}>
                                <Image src={`/images/${item.iconMediaName}`} width={36} height={36} alt='Item' />
                            </Link>
                            <div className={`bg-gear-${item.quality} text-center mt-1 text-white text-sm font-bold rounded`}>{item.item_level}</div>
                        </li>
                        
                    ))}
                </ul>
                
                <hr className='my-4'></hr>
                
                <div className='flex p-4'>
                    
                    <div className='w-1/2'>
                        
                        <h2 className='font-bold text-2xl text-center mb-4'>Raid Prog</h2>
                        <div className='flex space-x-8'>
                            {singleCharacter.characterRaidProg.map((raid, index) => (
                                <div key={index} className=''>
                                    <h3 className='font-bold text-md'>{raid.raid_short}</h3>
                                    <ul>
                                        {raid.raid_prog.map((instance, index) => (
                                            <li key={index} className=''><span className={`font-bold text-raid_${instance.difficulty}`}>{instance.difficulty}</span>{": " + instance.diff_prog + "/" + instance.raid_boss_count}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        
                    </div>
                    
                    <div className='w-0 border border-gray-300'></div>
                    
                    <div className='w-1/2 text-center'>
                        
                        <h2 className='font-bold text-2xl text-center mb-4'>Current Season M+ Score</h2>
                        <h3 className='font-bold text-xl'>{Math.round(singleCharacter.characterMPlusScore)}</h3>
                        
                    </div>
                    
                </div>
                
            </div>
                 
        </div>
    )
}
export default CharacterPage