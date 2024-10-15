export default async (ctx) => {
    const names = ["Aragorn", "Legolas", "Gimli", "Frodo", "Samwise", "Gandalf"];
    const races = ["Human", "Elf", "Dwarf", "Hobbit", "Wizard"];
    const classes = ["Warrior", "Mage", "Rogue", "Paladin", "Ranger"];
  
    const name = names[Math.floor(Math.random() * names.length)];
    const race = races[Math.floor(Math.random() * races.length)];
    const classType = classes[Math.floor(Math.random() * classes.length)];
  
    const character = `👤 **Character Created!** \nName: **${name}** \nRace: **${race}** \nClass: **${classType}**`;
  
    await ctx.reply(character); // Gamitin ang ctx.reply para sa pagtugon
  };
  