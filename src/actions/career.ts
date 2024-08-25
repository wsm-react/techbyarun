import { ref, uploadBytes, getDownloadURL, getMetadata } from 'firebase/storage'
import { AppFirebaseStorage } from '@/config/firebase-config'
import { sanitizeFileName } from '@/lib/function';
import { dominName } from '@/helpers/constants';


export async function CareerFileUpload(formdata: FormData, resumeFile: File) {
    // console.log(formdata);
    const data: Record<string, any> = {};
    formdata.forEach((value, key) => {
        data[key] = value;
    });

    try {
        // console.log(resFile);
        const prefix = data.slug.replace(/[^a-zA-Z0-9.]/g, '-');

        const sanitizedFileName: string = sanitizeFileName(resumeFile, { prefix: prefix, suffix: data.phone });
        const fileRef = ref(AppFirebaseStorage, `uploads-alldata/career/${sanitizedFileName}`);

        // Upload the file and get the download URL
        const resumeUri = await uploadBytes(fileRef, resumeFile).then(async (data) => {
            const dataUri = await getDownloadURL(data.ref);
            // console.log(dataUri);
            return dataUri;
        });

        // Add the resume URI to the data object
        data.resumeUri = resumeUri;
        data.resumeType = resumeFile.type.toString();
        data.resumeName = sanitizedFileName;
        data.resumeSize = resumeFile.size.toString();

        // Send the data to your API endpoint
        const response = await fetch('/api/v1/career', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data), // Send the data as JSON
        });

        // Optional: Check if the response was successful
        if (!response.ok) {
            throw new Error('Failed to submit data');
        }

        const result = await response.json();
        console.log('Data submitted successfully:', result);

        return result;

        // Optionally, handle the response or update the UI
        // e.g., revalidatePath('/register');

    } catch (error) {
        console.error('Error submitting data:', error);
    }
}


// export async function CareerFileUpload(formdata: FormData) {
//     console.log(formdata);
//     const data: Record<string, any> = {};
//     formdata.forEach((value, key) => { data[key] = value });

//     try {
//         console.log(formdata.get("resume"));

//         const fileData = formdata.get("resume") as File;
//         const sanitizedFileName: string = sanitizeFileName(fileData);
//         const fileRef = ref(AppFirebaseStorage, `uploads-alldata/career/${sanitizedFileName}`);

//         const resumeUri = await uploadBytes(fileRef, fileData).then(async (fileData) => {
//             const dataUri = await getDownloadURL(fileData.ref);
//             console.log(dataUri);

//             return dataUri;
//         });

//         const response = await fetch('/api/v1/career', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(...data, resume: resumeUri), // Send the data as JSON
//         });

//         // if (!response.ok) {
//         //     throw new Error('Failed to submit data');
//         // }

//         // const result = await response.json();
//         // console.log('Data submitted successfully:', result);

//         // Optionally, handle the response or update the UI
//         // e.g., revalidatePath('/admin/user/');

//     } catch (error) {
//         console.error('Error submitting data:', error);
//     }
//     // Create the user in the database
//     // await appDB.user.create({ 
//     //     data: {
//     //         email: email,
//     //         password: password,
//     //         mobile: mobile,
//     //     },
//     // });

//     // revalidatePath('/register');
// } 
