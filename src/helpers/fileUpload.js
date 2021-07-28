export const fileUpload = async(file) =>{

    console.log(file)

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dqmvbqdop/upload';

    const formData = new FormData();

    formData.append('upload_preset', 'react-journal');
    formData.append('file', file[0]);

    try{

        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        } );

        if( resp.ok ){
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        } else {
            throw await resp.json();
        }
    } catch(err){
        throw err;
    }

    // return URL
}