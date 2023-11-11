"use server";

import { redirect } from 'next/navigation';

export const getCharacterStatus = async (formData) => {
  
    const region = "us";
    const realmName = formData.get("realm");
    const characterName = formData.get("characterName");
    
    const checkCharacterStatusURL = `https://${region}.api.blizzard.com/profile/wow/character/${realmName.toLowerCase()}/${characterName.toLowerCase()}/status?namespace=profile-us&locale=en_US&access_token=${process.env.access_token}`;
    const response = await fetch(checkCharacterStatusURL);
    const characterStatusData = await response.json();
    
    if(response.ok) {
       redirect(`/characters/${region}/${realmName}/${characterName}`);
    } else {
        console.log("Character not found");
    }
}