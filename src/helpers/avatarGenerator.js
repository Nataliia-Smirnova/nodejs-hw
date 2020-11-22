const avatarholder = require('avatarholder');
const path = require('path');


exports.avatarGenerator = async (email) => {
    const pictureName = email.slice(0, 5) + '.jpg';
    const pathFile = await avatarholder.generateAvatarToFile(email, path.join(__dirname, '../public/tmp/' + pictureName));
   
    return pictureName;
}
