const postData = async <M>(url: string, body: M): Promise<boolean> => {
    try {
        const response: Response = await fetch(url,
            {
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json" },
                method: "POST",
            }
        );

        return response.ok;
    } catch (ex) {
        return false;
    }
};

export default postData;