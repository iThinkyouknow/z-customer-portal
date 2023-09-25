const url = 'https://reqres.in/api/users'
export const fetchAllUsers = async () => {
    try {
        const initialData = await (await fetch(url)).json() || [];
        const totalPages = initialData.total_pages;
        if (totalPages < 2) return initialData;

        let pageNums = [];
        for (let i = 2; i <= totalPages; i++) {
            pageNums.push(i);
        }
        const remainingDataUrls = pageNums.map((pageNo) => `${url}?page=${pageNo}`);

        const remainingResp = await Promise.all(
            remainingDataUrls.map(
                (url) => fetch(url)
                    .then(res => res.json())
            )
        );

        const remainingData = remainingResp.slice(1).reduce((result, curr) => {
            return result.data.concat(curr.data);
        }, remainingResp[0].data)

        return initialData?.data?.concat(remainingData);

    } catch (error) {
        console.error(error)
    }
}