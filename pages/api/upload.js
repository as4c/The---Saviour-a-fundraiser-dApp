export const handleFileSubmission = async (file) => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        const metadata = JSON.stringify({
            name: "File name",
        });
        formData.append("pinataMetadata", metadata);

        const options = JSON.stringify({
            cidVersion: 0,
        });
        formData.append("pinataOptions", options);

        const res = await fetch(
            "https://api.pinata.cloud/pinning/pinFileToIPFS",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
                },
                body: formData,
            }
        );
        const resData = await res.json();
        console.log(resData);
        return resData.IpfsHash; // Return the IPFS hash
    } catch (error) {
        console.log(error);
        throw new Error("Error uploading file to Pinata IPFS");
    }
};


export const handleTextSubmission = async (text) => {
    try {
        const formData = new FormData();
        // Convert text to Blob object
        const blob = new Blob([text], { type: "text/plain" });
        formData.append("file", blob, "text.txt"); // Append the Blob as a file
        const metadata = JSON.stringify({
            name: "Text file",
        });
        formData.append("pinataMetadata", metadata);

        const options = JSON.stringify({
            cidVersion: 0,
        });
        formData.append("pinataOptions", options);

        const res = await fetch(
            "https://api.pinata.cloud/pinning/pinFileToIPFS",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
                },
                body: formData,
            }
        );
        const resData = await res.json();
        console.log(resData);
        return resData.IpfsHash; // Return the IPFS hash
    } catch (error) {
        console.log(error);
        throw new Error("Error uploading text to Pinata IPFS");
    }
};
