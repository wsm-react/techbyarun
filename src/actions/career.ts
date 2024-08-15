export async function CareerFileUpload(formdata: FormData, id: string) {
    console.log(formdata, id);

    // Extract and process form data
    const email = formdata.get("email") as string;
    const mobile = formdata.get("mobile") as string;
    const password = formdata.get("password") as string;

    // Create the user in the database
    // await appDB.user.create({ 
    //     data: {
    //         email: email,
    //         password: password,
    //         mobile: mobile,
    //     },
    // });

    // revalidatePath('/admin/user/');
} 
