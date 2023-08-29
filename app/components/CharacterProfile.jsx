import Image from 'next/image';
import Link from 'next/link';

const CharacterProfilePage = () => {
    return (
        <>
            <Image src={singleCharacter.characterPortrait} width={84} height={84} alt='Character Portrait' />
            <Image src="/images/inv_helm_mail_raidevokerdragon_d_01.jpg" width={48} height={48} alt='Item' />
            
            <ul key={singleCharacter.characterID}>
                <li>{singleCharacter.characterName}</li>
                <li>{singleCharacter.characterRealm}</li>
                <li>{singleCharacter.characterFaction}</li>
                <li>{singleCharacter.characterRace}</li>
                <li>{singleCharacter.characterClass}</li>
                <li>{singleCharacter.characterSpec}</li>
                <li>{singleCharacter.characterGuild}</li>
                <li>{singleCharacter.characterLevel}</li>
            </ul>
            
            <ul key={singleCharacter.characterID} className="flex">
                {singleCharacter.characterGear.map((item) => (
                    
                    <li key={item.id} className="">
                        <Link href={`https://wowhead.com/item=${item.id}`} data-wowhead={`gems=${item.gems.join(':')}&ench=${item.enchants.toString()}&bonus=${item.bonus_list.join(':')}&pcs=${item.set_pcs.join(':')}&ilvl=${item.item_level}`}>
                            <Image src="/images/inv_helm_mail_raidevokerdragon_d_01.jpg" width={48} height={48} alt='Item' />
                        </Link>
                        <p className=''>{item.item_level}</p>
                    </li>
                ))}
            </ul>
        </>
    )
}
export default CharacterProfilePage